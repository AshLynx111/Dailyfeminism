# Automatic Publish Workflow Specification

## 1. Purpose

This specification defines the repository-enforced workflow for automatically validating, committing, pushing, and verifying changes that a user directly requests Codex to make in `AshLynx111/Dailyfeminism`.

The workflow is intentionally fail-closed. A publish operation may proceed only when the Agent can prove the authorization, file ownership, validation, branch state, commit contents, and deployment version required by this specification.

The production branch is `main`.

## 2. Normative Terms

`MUST`, `MUST NOT`, `SHOULD`, and `MAY` are requirements for the Agent and the repository-local publish skill.

An **active user request** is the specific change the user directly asked the Agent to complete in the current conversation.

A **publish blocker** is a condition that requires the Agent to stop before the next irreversible publishing step and report the reason.

## 3. Authorization Boundary

Automatic publishing MUST remain disabled until the user explicitly enables this workflow for the repository `AshLynx111/Dailyfeminism`.

Before the first automatic publish, the Agent MUST:

1. name the repository and production branch;
2. explain that successful requested changes will be committed and pushed directly to `main`;
3. explain that local validation and file-scope checks occur before push;
4. ask the user for explicit confirmation; and
5. record the confirmed authorization in the repository-level project rules.

Authorization for another repository, a general preference, or an inferred preference is not sufficient.

After authorization is recorded, the Agent MAY publish later qualifying requests without asking again. The user retains control at all times:

- `不要提交`, `不要推送`, `do not commit`, or `do not push` disables publishing for the active request.
- `关闭自动发布`, `disable automatic publishing`, or equivalent explicit language disables the workflow until the user explicitly enables it again.
- Ambiguous language MUST NOT be interpreted as permission to publish.

The repository-level rule MUST identify the authorized repository and MUST direct the Agent to use the repository-local publish skill. Authorization changes MUST be reviewable as ordinary tracked repository changes.

## 4. Qualifying Changes

The workflow applies only to files created or modified solely to satisfy the active user request.

It does not automatically include:

- changes independently made by the user;
- changes that existed before the active request;
- exploratory edits not selected as part of the final result;
- unrelated cleanup, refactoring, or formatting;
- files discovered during implementation but not required by the request; or
- any file whose ownership cannot be proven.

The following content MUST NOT be committed unless the user explicitly requests that it be part of the result:

- temporary files;
- local logs;
- process ID files or caches;
- build output;
- screenshots;
- generated drafts;
- exploratory design documents; and
- Codex intermediate artifacts.

## 5. Required State Tracking

### 5.1 Initial Worktree State

Before editing, the Agent MUST record at minimum:

- repository identity and root;
- current branch;
- current `HEAD`;
- tracked modified, deleted, renamed, and staged files;
- untracked files; and
- relevant ignored or generated paths when they could overlap with the request.

This snapshot is the **initial worktree state**. Files already modified or untracked in that snapshot are pre-existing work and are not publishable by default.

The Agent MUST NOT overwrite, reformat, stage, delete, rename, or clean pre-existing worktree changes. It may read them when necessary to understand the project.

### 5.2 Request File Manifest

During implementation, the Agent MUST maintain a **request file manifest** containing every path it creates or modifies for the active user request.

For each manifest entry, the Agent MUST be able to establish:

- why the file is required by the request;
- whether it existed or was dirty in the initial worktree state;
- what request-specific change the Agent made; and
- that the final diff contains no unrelated or pre-existing change.

Paths MUST be added deliberately as work proceeds. A final scan of all changed files MUST be compared against both the initial worktree state and the request file manifest.

### 5.3 Hard Ownership Rule

> If the Agent cannot prove that every staged file was created or modified solely for the active user request, it must stop before commit. Uncertainty is a publish blocker.

The Agent MUST NOT guess that a file belongs to the request.

## 6. Dirty Worktree Protection

A dirty worktree does not by itself prevent work, but it narrows what can be published.

If modified or untracked files existed before the request, the Agent MUST:

1. preserve their paths and initial status;
2. avoid changing them unless the active request explicitly requires the same file;
3. exclude them from staging unless their complete request ownership can be proven; and
4. verify before commit that they remain unstaged and unaltered by the publish procedure.

If the request requires a file that already contains pre-existing changes, the Agent may edit it only when it can reliably distinguish and stage only the request-specific diff. If request changes and pre-existing changes become mixed so that the diff cannot be separated with confidence, automatic publishing MUST stop and the Agent MUST report that manual handling is required.

The Agent MUST NOT use formatting or code-generation commands that rewrite pre-existing dirty files outside the manifest.

## 7. Validation Gate

Before commit, the Agent MUST run:

```text
pnpm build
```

The Agent MUST also run any repository-provided test, lint, type-check, or targeted validation command relevant to the files in the request manifest.

Validation MUST use the final intended source state. Any required validation failure is a publish blocker.

Build output and other generated validation artifacts MUST remain untracked and unstaged unless the user explicitly requested them as source deliverables.

## 8. Branch Synchronization Gate

Publishing is allowed only from local `main`.

Immediately before final diff inspection and staging, the Agent MUST confirm the current branch is `main` and run:

```bash
git fetch origin
git rebase origin/main
```

The Agent may continue only if:

- fetch succeeds;
- rebase completes without conflict;
- no unexpected automatic merge occurs;
- the active request remains intact; and
- the rebase does not introduce worktree changes outside the request manifest, except clean upstream commits already represented by `origin/main`.

Any conflict, unexpected merge result, ambiguous ownership after rebase, or manifest-external worktree change is a publish blocker. The Agent MUST stop and report the condition without attempting an automatic conflict resolution that could alter pre-existing or unrelated work.

The workflow MUST NOT use destructive Git operations, including:

- `git reset --hard`;
- `git clean -fd` or broader clean variants;
- checkout or restore commands that discard user work;
- force push or `--force-with-lease`; or
- history rewriting after a commit has been pushed.

## 9. Final Diff and Staging Gate

After branch synchronization, the Agent MUST:

1. recapture worktree status;
2. compare it with the initial worktree state;
3. inspect the complete diff for every manifest file;
4. confirm no non-manifest file was changed by the request or synchronization procedure;
5. confirm every intended change is represented in the manifest; and
6. stage only explicit manifest paths or explicitly selected request-owned hunks.

The following commands are prohibited:

```bash
git add -A
git add .
```

An equivalent unrestricted staging command is also prohibited.

After staging, the Agent MUST inspect the staged name list and staged diff. Every staged path and every staged hunk MUST satisfy the hard ownership rule in Section 5.3. Non-manifest staged content MUST be removed from the index without modifying the worktree, then treated as a publish blocker until its origin is understood.

## 10. Commit and Push Gate

The Agent may create a commit only after authorization, validation, synchronization, manifest, ownership, and staged-diff checks all succeed.

The commit MUST:

- contain only request-owned staged content;
- use a concise message describing the active request; and
- leave all pre-existing unrelated worktree changes untouched.

After commit, the Agent MUST verify the commit file list and patch once more. If the commit contains anything outside the proven request scope, the Agent MUST stop before push and report it.

Only then may the Agent run a normal push of local `main` to `origin/main`. Force push is prohibited.

## 11. Deployment Version Artifact

The Vite production build MUST generate:

```text
dist/deployment-version.json
```

with this schema:

```json
{
  "commit": "full-git-sha"
}
```

The `commit` value MUST be a full Git SHA.

SHA resolution MUST prefer a deployment-provider commit environment variable when available, including the commit SHA exposed by GitHub Actions or Cloudflare Pages. A local production build MUST fall back to:

```bash
git rev-parse HEAD
```

The implementation MUST fail the build if it cannot resolve and validate a full commit SHA.

`dist/deployment-version.json` is a build artifact. It MUST NOT be tracked or staged as a source file.

## 12. Deployment Verification

GitHub Pages deploys pushes to `main` through `.github/workflows/deploy-pages.yml`. Cloudflare Pages is expected to be connected to the same repository and branch through the Cloudflare dashboard.

After push, the Agent MUST poll:

- GitHub Pages: `https://ashlynx111.github.io/Dailyfeminism/deployment-version.json`
- Cloudflare Pages: `https://dailyfeminism.pages.dev/deployment-version.json`

Every request SHOULD include a cache-busting query parameter. For each attempt, the Agent MUST retain:

- provider name;
- observation time;
- HTTP status code; and
- observed commit SHA, when valid JSON is returned.

A provider is verified only when its endpoint returns HTTP 200, valid JSON, and the exact full SHA pushed by the Agent. A successful HTTP response containing an older SHA is not a successful deployment.

Verification MUST use a bounded timeout and retry interval. Both providers MUST report the pushed full SHA for the overall publish workflow to be reported as fully deployed.

## 13. Failure Boundaries and Reporting

### 13.1 Before Push

Failure of any of the following MUST prevent push:

- authorization check;
- initial state capture;
- request manifest validation;
- file ownership proof;
- dirty worktree protection;
- required local validation;
- branch check;
- fetch or rebase;
- final diff inspection;
- staged diff inspection; or
- commit creation and post-commit inspection.

The Agent MUST report the blocking condition and the last completed gate. It MUST leave unrelated user work untouched.

### 13.2 After Push

After a commit reaches `origin/main`, deployment failure MUST NOT trigger an automatic revert or another production commit.

If either deployment does not reach the pushed SHA within the timeout, the Agent MUST report:

- pushed full SHA;
- GitHub Pages result;
- Cloudflare Pages result;
- the last observed HTTP status code for each provider;
- the last observed SHA for each provider, when available; and
- whether each provider succeeded, failed, or timed out.

The report MUST distinguish a successful push from a successful deployment.

## 14. Repository Components

The implementation will contain:

1. a repository-level `AGENTS.md` authorization and trigger rule;
2. a repository-local publish skill implementing the gates in this specification;
3. Vite build integration that generates `dist/deployment-version.json`; and
4. the existing GitHub Pages workflow, adjusted only if necessary to expose a reliable deployment commit SHA.

The skill is invoked by the active Agent after a qualifying request. It is not a filesystem watcher, background loop, or general-purpose auto-commit process.

## 15. Acceptance Criteria

The implementation is complete only when all of the following are demonstrated:

1. A repository-specific first-authorization rule exists and prevents automatic publishing before explicit user confirmation.
2. Temporary and long-term user opt-out instructions are enforced.
3. The Agent records the initial worktree state before editing.
4. Manifest-based staging exists, and unrestricted `git add -A` or `git add .` staging is prohibited.
5. Pre-existing modified and untracked files remain untouched and are not accidentally committed.
6. Mixed request and pre-existing changes in the same file stop automatic publishing when they cannot be reliably separated.
7. `git fetch origin` and conflict-free `git rebase origin/main` are required before commit.
8. Destructive Git commands and force pushes are prohibited.
9. A production build generates an untracked `dist/deployment-version.json` containing a valid full Git SHA.
10. GitHub Pages and Cloudflare Pages version endpoints both return the pushed full SHA.
11. Pre-push failures prevent push, and post-push deployment failures do not trigger an automatic revert.
12. Deployment failure reports include the pushed SHA and the last observed HTTP status code or SHA for both providers.
13. If the Agent cannot prove file ownership, it stops publishing instead of guessing or committing.
