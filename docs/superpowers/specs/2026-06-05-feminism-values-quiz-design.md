# Feminism Values Quiz Redesign

## Goal

Refactor the "Feminist Theory Quiz" into a values-based profile test. Users should be able to answer without knowing feminist theory terms, and the result should feel like a recognizable personal profile rather than a single-school label.

## Scope

- Update the active quiz experience in `src/app/components/QuizRoom.tsx`.
- Replace single-choice theory questions with 5-point Likert statements.
- Score answers through value dimensions before mapping to feminist schools.
- Replace the single-result page with a mixed feminist profile.
- Keep the existing exhibition room identity, archive paper texture, language toggle support, and retake flow.
- Do not redesign unrelated rooms or navigation.

## Experience Direction

- Tone: balanced. Questions are plain and life-based; results keep enough theoretical precision to be useful.
- Users answer statements from "strongly disagree" to "strongly agree".
- The quiz should avoid terms such as patriarchy, capitalism, intersectionality, radical, socialist, and postmodern in questions.
- Results should say "Your Feminist Profile" / "你的女权主义画像", not "You are X".
- Results should support multiple affinities: primary, secondary, and influence schools.

## Value Dimensions

Use five normalized dimensions, each scored from 0 to 100:

- Change path: institutional reform to structural transformation.
- Inequality source: individual opportunity gaps to social structure.
- Economy and labor: personal development to labor and class analysis.
- Identity and experience: broad shared womanhood to multiple situated experiences.
- Gender view: relatively stable gender difference to socially shaped gender categories.

Each quiz statement contributes to one or more dimensions with positive or negative weights. Neutral answers contribute the midpoint and should not sharply pull a profile.

## Question Bank

Create around 18 to 20 statements. Each statement should:

- Use concrete social situations or values.
- Avoid forcing a choice between mutually compatible views.
- Include Chinese and English text.
- Cover work, family care, law, education, safety, body autonomy, income, media, identity, and everyday expectations.

Example style:

- "Even when laws say women and men are equal, women still face many hidden limits in daily life."
- "Care work at home should receive more public recognition and support."
- "Women from different class, ethnic, regional, or cultural backgrounds may face very different problems."

## School Mapping

Map the five dimension scores to seven school affinities:

- Liberal feminism: higher institutional reform, opportunity equality, legal access.
- Radical feminism: higher structural transformation and social structure analysis, especially around safety, body, and gender hierarchy.
- Marxist feminism: higher labor and class analysis, with emphasis on material conditions.
- Socialist feminism: combines structural transformation, social structure, and labor analysis.
- Cultural feminism: values care, relational ethics, and relatively stable gendered experience.
- Postmodern feminism: high social construction view of gender and category questioning.
- Intersectional feminism: high multiple identity and situated experience score.

Affinities should be normalized to percentages. Percentages do not need to sum to 100 if the UI presents them as independent match strength; if they are grouped as primary/secondary/influence, ranking should be based on normalized match strength.

## Result Generation

Generate the result page from the computed ranking and dimension scores:

- One-sentence summary that combines the top one or two schools and the strongest dimensions.
- Primary school: top match.
- Secondary school: second match when meaningfully close or above a threshold.
- Influence school: third match when above a lower threshold.
- Core focus tags selected from high-scoring dimensions and top schools.
- Three to five "views you may agree with" statements selected from the same signals.
- A theory coordinate chart with all seven school percentages, using progress bars and optionally the existing radar chart.

Avoid absolute identity claims. Use language such as "you tend to", "you may care about", and "your profile leans toward".

## UI Design

- Preserve the current archival room style: purple ink, paper panels, grain, photocopy borders, and the background image treatment.
- Replace option cards with a stable 5-point scale control for each statement.
- On mobile, the scale should wrap cleanly or stack without text overflow.
- Show progress as question count and percent.
- The result page should have a stronger report structure: title, summary, affinity tiers, tags, viewpoint list, and chart.
- Keep the retake button and animation patterns.

## Data Structure

Use explicit TypeScript types for:

- `DimensionKey`
- `SchoolKey`
- `LikertQuestion`
- `QuestionImpact`
- `DimensionScores`
- `SchoolScores`
- `ProfileResult`

Keep question data and mapping constants close to `QuizRoom.tsx` for this iteration, unless the component becomes too large during implementation.

## Verification

- Run `pnpm build`.
- Start the Vite dev server and inspect the quiz on desktop and mobile widths.
- Manually test at least three answer patterns:
  - mostly reform/opportunity answers,
  - mostly structure/labor answers,
  - mostly identity/gender-construction answers.
- Confirm no question text contains the banned theory terms.
