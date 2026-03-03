# Czech Verb Practice

A web application for practising Czech verb conjugation. Built with [Svelte](https://svelte.dev/) and [Vite](https://vite.dev/).

🌐 **[Try it live](https://mbelsky.github.io/cze/)**

## Features

- Random verb exercises covering all four Czech conjugation groups
- Conjugation practice for all six pronoun forms
- Instant answer validation with correct answer feedback
- Clean, responsive UI with light/dark mode support
- **Offline support** — practice without a network connection after your first visit

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

## Offline Support

The app uses a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) (PWA) to enable offline use.

| Aspect | Behaviour |
| --- | --- |
| **First visit** | Must be online — app shell and verb dictionary are cached on first load. |
| **What is cached** | App shell (HTML/JS/CSS) and the verb dictionary (`verbs.json`). |
| **App updates** | The new service worker is installed in the background and applied on the next page reload. |
| **Dictionary freshness** | Uses a *stale-while-revalidate* strategy: the cached dictionary is served immediately while a fresh copy is fetched in the background. A page reload picks up any dictionary changes. |
| **Offline error** | If the dictionary is unavailable and not yet cached, a friendly message asks you to check your network connection. |

### Deployment caveats

- The service worker scope is `/cze/`, matching both the GitHub Pages URL (`https://mbelsky.github.io/cze/`) and the custom domain path (`https://mbelsky.com/cze`).
- The verb dictionary URL pattern (`/cze/verbs.json`) must match the actual served path for runtime caching to work correctly.

## Deployment

The app is automatically deployed to GitHub Pages on every push to the `main` branch. The deployment is handled by a GitHub Actions workflow that:

1. Installs dependencies
2. Builds the app for production
3. Deploys the built artifacts to GitHub Pages

The live app is available at: https://mbelsky.github.io/cze/
