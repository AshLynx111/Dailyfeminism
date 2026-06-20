# Source-Specific Reflection Prompts

## Goal

Replace the single generic three-question reflection form with four
source-specific three-question sets. Each set should help users connect the
current source to a concrete lived or public situation without supplying an
answer for them.

Dragging thought-ring nodes is explicitly out of scope. The existing ring
interaction remains unchanged.

## Shared Behavior

- Every source type still asks exactly three required questions.
- Each question includes a short, visible helper line beginning with `提示：`.
- Helpers offer domains and angles to consider, not selectable or prewritten
  answers.
- The saved data model remains unchanged: answers still occupy the same three
  ordered fields, so existing records remain compatible.
- English equivalents follow the same meaning and specificity.

## Theory Prompt Set

1. `这个流派的哪一个观点，让你想到生活中的某个具体场景？`
   - `提示：可以从工作、家庭、教育、亲密关系、身体、安全感或网络经历中选择一件事。`
2. `如果用这个流派的视角重新看这件事，你会注意到什么？`
   - `提示：例如规则由谁制定、机会如何分配、谁承担代价，或哪些感受曾被当成个人问题。`
3. `这个视角解释了什么，又有哪些地方无法完全解释你的经验？`
   - `提示：可以写认同、犹豫、抵触或仍未解决的问题。`

## Quiz Prompt Set

1. `测试结果中，哪一部分最像你？哪一部分不像你？`
   - `提示：用一个真实选择、经历或长期关注的问题来说明。`
2. `当这些倾向放进同一件现实问题中，它们会如何影响你的判断？`
   - `提示：可以选择职场公平、照护劳动、身体自主、贫富差距、身份差异等具体问题。`
3. `这份结果让你接下来更想观察自己的什么变化？`
   - `提示：例如判断问题的角度、情绪反应、与他人的讨论方式或实际选择。`

## Lineage Prompt Set

1. `这一历史阶段的核心问题，在今天以什么形式出现在你的生活或周围？`
   - `提示：可以联系家庭分工、工作制度、社会新闻、公共政策或身边人的经历。`
2. `对照当时与现在，你认为哪些事情改变了，哪些结构仍然存在？`
   - `提示：可以比较法律、观念、资源分配、表达空间或日常习惯。`
3. `知道这段历史后，你会怎样重新理解自己或他人的某段经验？`
   - `提示：写下一个发生变化的判断，也可以记录仍然无法回答的疑问。`

## Reading Prompt Set

1. `这份阅读档案中的哪个观点，挑战或补充了你原来的理解？`
   - `提示：不需要总结全书，只需选择一句话、一个概念或一处让你停顿的内容。`
2. `你会用这个观点重新看待哪一件现实中的事情？`
   - `提示：可以是个人经历、社会事件、影视内容、网络讨论或一段关系。`
3. `带着这个观点回到生活后，你想继续观察或追问什么？`
   - `提示：可以关注自己的反应、他人的处境、制度规则，或这个理论解释不到的部分。`

## Implementation

Define the localized prompt sets by `ReflectionSourceType` near the reflection
form. The active source selects one set. Render each helper between its question
label and textarea using subdued styling that remains legible on mobile.

Do not change persistence, validation, thought cards, visualization, source
buttons, or existing records.

## Verification

- Open the form from theory, quiz, lineage, and reading contexts and confirm the
  correct localized question set and helpers appear.
- Confirm the reading question uses `重新看待`, not `重新阅读`.
- Confirm all three answers remain required and save into the existing record
  format.
- Confirm old records still open correctly.
- Confirm helper copy wraps without horizontal overflow on mobile.
- Run the production build.
