# Daily Feminism

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)

Daily Feminism is an interactive digital archive for exploring feminist thought, history, and reading pathways. It introduces major feminist schools, key figures, theoretical debates, and recommended resources through an exhibition-like web experience.

The project responds to a common problem in public discussion: feminism is often simplified, misunderstood, or stigmatized before people have the chance to engage with the ideas themselves. Daily Feminism lowers the barrier to entry through visual storytelling, interactive quizzes, and structured archives, while still encouraging slower, deeper reading.

Live sites:

- [dailyfeminism.pages.dev](https://dailyfeminism.pages.dev/)
- [ashlynx111.github.io/Dailyfeminism](https://ashlynx111.github.io/Dailyfeminism/)

## Features

- Exhibition-style landing experience with collage-inspired visual direction.
- Feminist theory atlas covering seven major schools of feminist thought.
- Interactive Likert-scale quiz for generating a personal feminist values profile.
- Historical lineage section that presents each theory's context, limitations, and breakthroughs.
- Spectrum view for comparing relationships, tensions, and overlaps between schools.
- Reading archive and reading room that guide users toward full theoretical texts.
- Bilingual interface support for Chinese and English content.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Material UI](https://mui.com/)
- [Motion](https://motion.dev/)

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm

### Install

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

The local development server will print a URL in the terminal, usually `http://localhost:5173/`.

### Build

```bash
pnpm build
```

The production build is generated in `dist/`.

## Project Structure

```text
Dailyfeminism/
├── .github/workflows/       # GitHub Pages deployment workflow
├── docs/                    # Research notes, design docs, and supporting documentation
├── guidelines/              # Project guidelines and reference material
├── src/
│   ├── app/                 # Main application, sections, state, and i18n
│   ├── imports/             # Image and visual assets imported by the app
│   └── styles/              # Global styles, fonts, and theme variables
├── ATTRIBUTIONS.md          # Third-party asset and component attribution
├── index.html
├── package.json
└── vite.config.ts
```

## Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`. On pushes to `main`, it installs dependencies, builds the Vite app, uploads `dist/`, and deploys it to GitHub Pages.

The project is also available through Cloudflare Pages at [dailyfeminism.pages.dev](https://dailyfeminism.pages.dev/).

## Attributions

This project uses third-party UI components and visual materials. See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for source and license details.

Code in this repository is released under the MIT License. Some images, portraits, and other source materials may be governed by their own licenses or attribution requirements.

## Contributing

Issues and suggestions are welcome. If you want to make a larger change, please open an issue first so the direction can be discussed.

## License

This project is licensed under the [MIT License](LICENSE).

---

# Daily Feminism 中文说明

Daily Feminism 是一个女性主义数字档案馆，收录主流女性主义流派的发展历程、代表人物与核心观点，并通过互动测试帮助用户探索自己的女性主义价值取向。

在公共讨论中，“女性主义”常常被误解、简化，甚至污名化。这个项目希望通过整理理论、历史与思想文本，让更多人能够直接接触女性主义本身，而不是停留在围绕它的刻板印象里。

它既是一次关于记录、整理与传播的尝试，也是一种更轻、更可进入的阅读入口：通过拼贴画风格、理论图谱、李克特量表、发展历程、思想光谱和阅读室，引导用户先建立基本理解，再走向更完整、更沉浸的理论阅读。
