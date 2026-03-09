import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Use NetworkFirst for HTML navigations so users always get the
        // latest app shell when online, falling back to cache when offline.
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
        runtimeCaching: [
          {
            // verb dictionary: StaleWhileRevalidate so it refreshes in the
            // background when online while remaining available offline.
            urlPattern: /\/cze\/verbs\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'verb-dictionary',
            },
          },
        ],
      },
      manifest: {
        name: 'Czech Verb Practice',
        short_name: 'CzeVerbs',
        description: 'Practice Czech verb conjugation',
        theme_color: '#1e1e2e',
        background_color: '#1e1e2e',
        display: 'standalone',
        start_url: '/cze/',
        scope: '/cze/',
        icons: [],
      },
    }),
  ],
  base: '/cze/',
})
