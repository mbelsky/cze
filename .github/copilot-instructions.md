## Project Overview

This is a web application for practising Czech verb conjugation. It is deployed to GitHub Pages at https://mbelsky.github.io/cze/.

## Tech Stack

- **Framework**: Svelte 5
- **Bundler**: Vite 7
- **Testing**: Vitest 4
- **Language**: JavaScript (ESM modules, no TypeScript)
- **Node.js**: v24.x

## Architecture

- `src/App.svelte` — Main application component
- `src/lib/verbs.js` — Czech verb data organized by conjugation groups
- `src/lib/exercise.js` — Exercise generation and answer validation logic
- `src/lib/exercise.test.js` — Tests for exercise logic
- `src/app.css` — Global styles with light/dark mode support via CSS custom properties
- `src/main.js` — App entry point

## Domain Context

The app covers Czech verb conjugation across 4 conjugation groups.
Conjugation is practised for all 6 Czech pronoun forms.

## Development

```bash
npm ci           # Install dependencies
npm run dev      # Start dev server
npm run build    # Production build
npm run test     # Run tests
npm run preview  # Preview production build
```
