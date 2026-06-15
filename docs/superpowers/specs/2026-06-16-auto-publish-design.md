# Automatic Publish Workflow Design

## Goal

After Codex completes a code or content change directly requested by the user, it should automatically:

1. validate the change locally;
2. commit only files belonging to that request;
3. push the commit directly to `main`;
4. wait for GitHub Pages and Cloudflare Pages to redeploy; and
5. verify that both public sites serve the exact pushed commit.

The workflow must not publish unrelated, temporary, generated, or pre-existing worktree changes.

## Scope

This automation applies only to changes explicitly requested by the user in the active Codex conversation. It does not apply to:

- exploratory edits that have not become part of the requested result;
- changes made independently by the user;
- pre-existing modified or untracked files;
- design documents created during a gated design process unless the user has approved publishing them;
- requests where the user explicitly says not to commit or push.

The target repository is `AshLynx111/Dailyfeminism`, and the deployment branch is `main`.

## Architecture

### Project Agent Rule

A repository-level `AGENTS.md` will define the trigger and permission boundary. It will instruct Codex to invoke the project publish skill after completing a directly requested change unless the user opts out.

The rule will also state that publishing is allowed without an additional approval prompt when all required validation succeeds.

### Project Publish Skill

A repository-local skill will implement the repeatable workflow. It will:

1. record the initial worktree state before editing;
2. identify the files changed for the current request;
3. run the required local checks;
4. inspect the final diff;
5. stage only the identified files;
6. create a concise commit;
7. push `main` to `origin`;
8. poll both deployment URLs; and
9. report the commit and deployment results.

The skill is procedural guidance for the active Agent. It is not a background process and does not monitor arbitrary filesystem changes.

### Deployment Version Marker

The Vite build will emit a small JSON artifact such as:

```json
{
  "commit": "full-git-sha"
}
```

The SHA will be resolved from the deployment provider's commit environment variable, with `git rev-parse HEAD` as a fallback. The artifact will be generated in the build output without modifying tracked source files.

This marker allows the Agent to distinguish a successful redeployment of the new commit from an older deployment that merely returns HTTP 200.

## Workflow

### Before Editing

The Agent captures:

- current branch and HEAD;
- tracked modifications;
- untracked files; and
- the expected files for the request as they become known.

Existing unrelated changes remain untouched.

### Validation

For the current Vite application, the minimum required validation is:

```text
pnpm build
```

Any more specific test, lint, or type-check command added to the project later must also run when relevant. A failed required check prevents commit and push.

### Commit and Push

The Agent must be on `main` and synchronized with `origin/main` before publishing. It stages explicit paths rather than using an unrestricted `git add -A`.

If remote `main` moved, the Agent fetches and integrates it only when doing so is conflict-free and preserves both the user's work and the completed request. Conflicts stop automatic publication and are reported.

After a successful commit, the Agent pushes directly to `origin/main`. No pull request or additional approval is required under the permission granted for this workflow.

### Deployment Verification

The Agent polls these endpoints:

- GitHub Pages: `https://ashlynx111.github.io/Dailyfeminism/deployment-version.json`
- Cloudflare Pages: `https://dailyfeminism.pages.dev/deployment-version.json`

Each request uses a cache-busting query parameter. Success requires both endpoints to:

- return HTTP 200;
- contain valid JSON; and
- report the exact full SHA that was pushed.

Polling uses a bounded timeout and moderate retry interval so normal provider build latency does not cause an immediate false failure.

## Existing Deployment Integration

GitHub Pages already deploys on pushes to `main` through `.github/workflows/deploy-pages.yml`.

Cloudflare Pages is expected to remain connected to the same GitHub repository and `main` branch through the Cloudflare dashboard. The first implementation run will verify this assumption by pushing the workflow changes and observing whether the Cloudflare version marker advances to the pushed SHA.

No Cloudflare API token is required for routine verification because the deployed version artifact is authoritative for the public site. If Cloudflare does not redeploy from the test push, dashboard integration becomes a documented external blocker rather than being silently treated as success.

## Failure Handling

### Before Push

If build, diff inspection, branch synchronization, or commit creation fails, the Agent does not push and reports the failure.

### After Push

Once a commit has reached `main`, the Agent cannot truthfully describe the operation as uncommitted. If either deployment does not reach the expected SHA before timeout, it reports:

- the pushed commit SHA;
- which deployment succeeded;
- which deployment failed or timed out; and
- the last observed status or SHA.

The Agent does not automatically revert `main`. A deployment failure may be transient or provider-specific, and an automatic revert would create another production change without diagnosis.

## Security and Safety

- No credentials are stored in the repository.
- No Cloudflare API token is needed for the default flow.
- Existing unrelated changes are never staged implicitly.
- Generated logs, process IDs, build output, and local artifacts are excluded unless explicitly requested.
- Destructive Git commands are not part of the workflow.
- The user can disable automatic publication for any request by saying so explicitly.

## Acceptance Criteria

The implementation is complete when:

1. the repository contains the Agent trigger rule and project publish skill;
2. a production build emits `deployment-version.json`;
3. a directly requested test change can pass local validation and be committed to `main`;
4. the commit is pushed without staging unrelated worktree files;
5. both deployment endpoints eventually report the pushed full SHA; and
6. failures stop at the correct boundary and produce a clear report.
