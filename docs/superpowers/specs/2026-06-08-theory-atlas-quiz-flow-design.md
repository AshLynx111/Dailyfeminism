# Theory Atlas and Quiz Flow Design

## Goal

Reorder the Daily Feminism single-page experience so the theory atlas introduces
the quiz, the quiz produces a profile automatically, and the existing lineage
room follows naturally.

The entrance section must remain unchanged in structure, copy, and visual design.

## Page Order

The page order will be:

1. Entrance
2. Theory atlas
3. Feminist profile quiz
4. Global lineage room
5. Spectrum
6. Reading archive
7. Existing finale

The desktop and mobile exhibition navigation will use the same order and updated
section numbering.

## Theory Atlas

The theory atlas remains the second section. Its envelope-opening interaction,
seven theory cards, card detail modals, and existing visual treatment remain
intact.

The quiz call to action is hidden while the envelope is sealed. Once the envelope
is opened, it appears after the seven-card stage so it does not interrupt card
browsing.

Chinese copy:

> 还不知道自己更接近哪一种女权主义传统吗？
> 完成一组价值判断，生成你的女权主义画像。

Button: `生成我的画像`

English copy:

> Not sure which feminist tradition resonates with you?
> Answer a set of value-based statements and generate your feminist profile.

Button: `Generate My Profile`

The button smoothly scrolls to the quiz section on the same page. It does not
navigate to another URL.

## Quiz Behavior

The quiz remains a full page section immediately after the theory atlas.

Questions before the last one continue to use the existing next and previous
controls. On the final question, selecting a value immediately records the answer
and displays the generated feminist profile. No separate submit or generate
button is shown for the final question.

The existing profile content and retake control remain available.

## Result Continuation

The result is not a terminal page or route. The global lineage room follows the
quiz directly in document order, allowing the user to continue by scrolling
downward naturally.

No dedicated "Continue to Rings of Time" button is required because the approved
interaction is ordinary page scrolling.

## Implementation Scope

Expected changes are limited to:

- `src/app/App.tsx` for section order
- `src/app/components/ExhibitionNav.tsx` for navigation order and numbering
- `src/app/components/FeministAtlas.tsx` for the post-card quiz call to action
- `src/app/components/QuizRoom.tsx` for automatic final-answer submission

The entrance component and its content will not be edited.

## Verification

- Build the Vite application successfully.
- Confirm the entrance source has no changes.
- Confirm the call to action is absent before the envelope opens.
- Confirm the call to action appears after the seven-card area once opened.
- Confirm the call to action scrolls to `#quiz`.
- Confirm selecting the final answer immediately shows the profile.
- Confirm the next section after the quiz is `#lineage`.
- Confirm desktop and mobile navigation use the revised order.
