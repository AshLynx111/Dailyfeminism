# Theory-Tension Quiz Implementation

## Goal

Replace the current agreement-driven values quiz with a theory-tension quiz. Every question must distinguish between two feminist explanatory frameworks. The result should describe the user's feminist tendency in plain language, and users must be able to return to previous questions and change answers.

## Question Model

Use the 20 questions defined in `docs/feminism-values-quiz-balanced-question-bank.md`.

The questions cover seven tensions:

- Institutional reform vs structural transformation
- Gender oppression vs class oppression
- Single-root explanations vs gender and class co-constitution
- Cultural value vs labor analysis
- Universal women's experience vs differentiated experience
- Stable identity vs fluid identity
- Discursive construction vs material structure

Each question stores:

- Chinese and English text
- Tension key
- Direction
- Left-side and right-side theoretical frameworks

There are no baseline consensus questions and no feminist-identification score.

## Scoring

Convert Likert answers to a centered score:

- Strongly disagree: `-2`
- Disagree: `-1`
- Neutral: `0`
- Agree: `1`
- Strongly agree: `2`

Multiply by the question direction and average scores within each tension. Normalize each tension to a `0-100` display position, where `50` is neutral.

School affinity is calculated from proximity to a school profile across relevant tensions:

- Liberal: institutional reform
- Radical: structural transformation, gender oppression, and a stronger independent-patriarchy explanation
- Marxist: class oppression, labor analysis, material structure, and a stronger economic-root explanation
- Socialist: structural transformation and an explicit co-constitution score; it must not be calculated as the average of Radical and Marxist scores
- Cultural: cultural value, universal experience, and stable identity
- Postmodern: fluid identity and discursive construction
- Intersectional: differentiated experience combined with structural sensitivity

When an answer profile stays close to the midpoint, matching percentages should remain moderate instead of being artificially inflated.

## Result Summary

Generate one cohesive paragraph with up to three parts:

1. State the primary and secondary affinities without saying "you are X."
2. Explain the user's strongest one or two theoretical tensions.
3. Add a meaningful secondary tendency such as differentiated experience, cultural value, identity fluidity, or preferred change path.

Example:

> 你的倾向以社会主义女权主义为主，同时受到交叉性女权主义影响。你不把女性处境归结为父权制或阶级关系中的单一根源，而更关注性别权力、劳动分工和经济依赖如何相互强化。你也倾向于认为，不同身份女性的经验会改变我们对整体问题的理解。

If most axes are near the midpoint, describe the result as mixed or balanced and avoid claiming a strong theoretical identity.

The existing result structure remains:

- Primary, secondary, and influence schools
- Summary paragraph
- Core focus tags
- Views the user may share
- School compatibility chart
- Seven theory-tension coordinates

## Previous-Question Navigation

- Questions 2-20 show a Previous button.
- Question 1 does not show the button.
- Returning to a previous question restores its saved answer.
- Selecting a new value and continuing overwrites the previous answer.
- Moving backward updates the progress indicator.
- Forward navigation continues to require an answer.
- Retake clears all answers and returns to question 1.

## UI

- Preserve the current archive-room visual language.
- Place Previous and Next actions in a shared navigation row.
- Previous uses a left-arrow icon and a restrained outlined style.
- Next/Create Profile remains the primary purple action.
- The five-point scale remains responsive and restores the active state for saved answers.

## Verification

- Run a production build.
- Verify all 20 questions match the approved document.
- Test forward, backward, answer replacement, final submission, and retake.
- Test all-neutral, all-agree, all-disagree, socialist co-constitution, liberal reform, radical gender-power, Marxist material, cultural, postmodern, and intersectional answer patterns.
- Confirm all-agree and all-disagree patterns no longer automatically produce the same cluster of schools.
