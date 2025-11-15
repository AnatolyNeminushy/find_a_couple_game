# Find The Pair

A small matching game: a 4x4 board hides eight color pairs. Reveal two tiles per turn and try to find every color match. When all pairs are open, you win.

## Features
- Freshly shuffled deck with eight unique color pairs on each reset.
- Turn-based reveal logic with automatic flip-back for mismatched tiles.
- Move counter and completion message to track progress.
- One-click restart button.
- Styled with Tailwind CSS and tested in the latest Chrome, Safari, and Firefox.

## Tech stack
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- gh-pages (GitHub Pages deploy)

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # optional check of the production bundle
```

## Deploy to GitHub Pages

1. Set the base path for your repository (example: `/project-name/`) before building:
   ```bash
   $env:VITE_BASE_PATH="/<repo-name>/"   # PowerShell
   export VITE_BASE_PATH="/<repo-name>/" # Bash
   ```
2. Run:
   ```bash
   npm run deploy
   ```
   The script builds the app and publishes `dist` to the `gh-pages` branch.
3. Enable GitHub Pages in the repository settings and point it to that branch.

## Helpful scripts

| Command           | Purpose                          |
|-------------------|----------------------------------|
| `npm run dev`     | local development with HMR       |
| `npm run build`   | production build                 |
| `npm run preview` | preview the production bundle    |
| `npm run lint`    | run ESLint                       |
| `npm run deploy`  | push the latest build to gh-pages|

## License

Free to use for learning or demos.
