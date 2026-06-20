# Theory-Triggered Personal Reflection System

## Goal

Extend Daily Feminism from a theory exhibition and profile quiz into a private,
long-term reflection practice. Users should be able to connect feminist theory,
historical stages, quiz results, and recommended reading to lived experience,
then revisit how their interpretation changes over time.

The feature is not a public community, message board, free-form notebook, or
identity label. Every entry must begin from a specific piece of site content and
preserve the loop of experience, theory, and reinterpretation.

## Exhibition Placement

Add a new independent section named `我的思想年轮` / `MY THOUGHT RINGS` after
the reading archive and before the existing finale collage.

The relevant page order becomes:

1. Theory archive
2. Feminist profile quiz
3. Theory lineage
4. Theory spectrum
5. Reading archive
6. My Thought Rings
7. Existing finale collage

The new section belongs at the end of the content journey so ideas prompted by
recommended books can also become part of the user's reflection history.

## Reflection Sources

The shared reflection action appears in four bounded contexts:

- A theory detail card, bound to the selected feminist school.
- A completed quiz result, bound to a snapshot of the generated profile.
- A lineage stage detail, bound to its historical period, core question, events,
  and related theories.
- A reading archive item, bound to its title and feminist school.

Each context shows an explicit `记录此刻的理解` / `RECORD THIS THOUGHT` button.
Opening content never triggers the form automatically. The user always chooses
when to begin a reflection.

The source title and source-type label remain visible at the top of the form.
This keeps the writing anchored to what the user has just encountered. The
saved record stores a source snapshot so later copy changes do not rewrite the
meaning of an earlier entry.

## Structured Reflection Card

The action opens one shared drawer-style reflection card. It asks three fixed,
required questions:

1. `在我的生活经验中，哪里让我想起这一部分内容？`
2. `我现在更倾向如何理解这种情况？`
3. `如果这种情况持续存在，我的感受是？`

English equivalents are provided through the existing language system.

The second answer also offers optional interpretation lenses:

- Institutional structure / 制度结构
- Individual experience / 个体经验
- Relationships / 关系互动
- Emotion / 情感感受
- Labor and resources / 劳动与资源
- Identity and situated experience / 身份与处境

The lenses support visual aggregation but never replace free expression or
force the user into one category. Multiple lenses may be selected.

The user may cancel without saving. On successful submission, the interface
confirms that the entry was stored and offers a direct jump to My Thought Rings.
The same source may produce multiple entries because changing interpretations
are part of the intended record.

## Record Model

Each record contains:

- A generated unique ID and creation timestamp.
- A source type: `theory`, `quiz`, `lineage`, or `reading`.
- The source ID, localized title, and a compact source snapshot.
- One or more related feminist theory IDs.
- The three required text answers.
- Zero or more selected interpretation lenses.
- A schema version for future local migrations.

Quiz snapshots contain the primary affinities and relevant theory labels, not
the entire answer sequence. Lineage snapshots contain the period and core
question. Reading snapshots contain the book title and school. Theory snapshots
contain the school title and core idea.

## State and Persistence

An application-level `ReflectionProvider` owns the record collection and exposes
typed create and delete operations to all four source contexts and the personal
archive. This avoids coupling unrelated exhibition components to one another.

Records are stored only in versioned `localStorage`. There is no account,
backend, analytics payload, cloud synchronization, or public sharing. The
section must state clearly that entries remain in the current browser and will
be lost if its site data is cleared.

Storage reads validate the parsed structure. Missing, obsolete, or malformed
data falls back to an empty archive without breaking other rooms. A storage
write failure leaves the form open and shows an actionable local error rather
than claiming success.

## Thought-Ring Visualization

The personal section presents records as a growing ring visualization, not a
chronological list.

- Every reflection creates one node and one associated thought card.
- Records from the same period occupy the same ring layer; later periods grow
  outward. The grouping uses calendar periods derived from record timestamps,
  with deterministic placement so refreshes do not scramble the archive.
- Node color maps to feminist theory. Multi-theory and quiz sources use a
  controlled gradient derived from their related theory colors.
- Node size increases when the same source or theme is revisited.
- Texture maps to the selected interpretation lenses, using accessible SVG
  patterns such as grid, wave, and diagonal line rather than color alone.
- Fine connecting lines link records that share a theory, lineage stage, or
  interpretation lens, showing how an idea moves between contexts.
- Selecting a node opens its thought card with date, source, theory tags,
  interpretation lenses, and all three answers.

The visualization updates immediately after creation or deletion. A new entry
uses a restrained ring-growth animation and respects `prefers-reduced-motion`.
Keyboard users can reach every node and receive the same card content. Mobile
layouts keep the graphic usable without requiring precise pointer interaction.

No fabricated example records appear in the empty state. Instead, the section
points users toward the four valid source contexts for their first reflection.

## Thought Cards and Privacy

Thought cards live inside the ring interaction and are not rendered as a plain
feed. A card can be viewed or deleted. Deletion requires confirmation and
immediately recalculates the visualization. Editing is outside the first
version: preserving the original entry makes change visible through a later
reflection rather than silently rewriting history.

The feature includes no likes, comments, profiles, sharing controls, follower
relationships, or public URLs. It also includes no unbound `new note` action;
all cards retain a visible theoretical or editorial source.

## Component Boundaries

Implementation should introduce focused modules for:

- Reflection types, validation, and local storage access.
- `ReflectionProvider` and its consumer hook.
- A reusable source descriptor and reflection trigger.
- The shared structured reflection drawer.
- The thought-ring visualization.
- The thought-card detail and confirmed deletion flow.
- The new personal archive section.

Existing theory, quiz, lineage, and reading components only construct a source
descriptor and invoke the shared trigger. The visualization consumes normalized
records and does not know how individual rooms render their source content.

## Error and Edge Cases

- Empty answers cannot be submitted; errors are associated with their fields.
- Rapid repeated submission cannot create duplicate records.
- Multiple reflections from one source remain valid and independently dated.
- Invalid stored records are ignored safely while valid records remain usable.
- Local storage quota or access failures are reported without discarding the
  text currently in the form.
- Deleting the last entry returns to the genuine empty state.
- Source copy or quiz calculation changes do not alter saved source snapshots.

## Verification

- Run the production Vite build successfully.
- Create a reflection from each of the four source types and confirm the bound
  source snapshot and theory tags are correct.
- Confirm submitting a record updates My Thought Rings without a reload.
- Refresh and confirm valid records persist.
- Create multiple entries from one source and confirm all remain distinct.
- Confirm ring layers, colors, textures, node sizing, and connections respond to
  the record data rather than fixed demo values.
- Open every node by pointer and keyboard and inspect its complete thought card.
- Delete a record through confirmation and confirm the ring recalculates.
- Simulate malformed and unavailable local storage and confirm graceful fallback
  or an actionable write error.
- Verify Chinese and English copy, mobile layouts, focus behavior, and reduced
  motion behavior.
- Confirm there is no free-note entry point, public interaction, or network
  transmission of reflection data.

## Out of Scope

- Accounts and cross-device synchronization.
- Cloud storage, exports, imports, or backup recovery.
- Public profiles, community features, and social sharing.
- Automatic event recommendation or AI interpretation of personal writing.
- Full-text search, manual folders, arbitrary tags, and unbound notes.
- Editing historical reflections in place.
