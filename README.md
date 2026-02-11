# Czech Verb Practice

A web application for practising Czech verb conjugation. Built with [Svelte](https://svelte.dev/) and [Vite](https://vite.dev/).

🌐 **[Try it live](https://mbelsky.github.io/cze/)**

## Features

- Random verb exercises covering all four Czech conjugation groups
- Conjugation practice for all six pronoun forms
- Instant answer validation with correct answer feedback
- Clean, responsive UI with light/dark mode support

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run test`    | Run tests                |

## Deployment

The app is automatically deployed to GitHub Pages on every push to the `main` branch. The deployment is handled by a GitHub Actions workflow that:

1. Installs dependencies
2. Builds the app for production
3. Deploys the built artifacts to GitHub Pages

The live app is available at: https://mbelsky.github.io/cze/
