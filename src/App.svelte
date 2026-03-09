<script>
  import VerbsPractice from './routes/VerbsPractice.svelte';
  import MonthsPractice from './routes/MonthsPractice.svelte';
  import {
    MODE_VERBS,
    MODE_MONTHS,
    resolveModeFromHash,
    hashForMode,
  } from './lib/practice-modes.js';

  let mode = $state(resolveModeFromHash(typeof window === 'undefined' ? '' : window.location.hash))
  const modeOrder = [MODE_VERBS, MODE_MONTHS]
  const modeLabelByMode = {
    [MODE_VERBS]: 'Verbs',
    [MODE_MONTHS]: 'Months',
  }
  const routeComponentByMode = {
    [MODE_VERBS]: VerbsPractice,
    [MODE_MONTHS]: MonthsPractice,
  }
  let currentRouteComponent = $derived(routeComponentByMode[mode] ?? VerbsPractice)

  function hrefForMode(nextMode) {
    return `#${hashForMode(nextMode)}`
  }

  $effect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onHashChange = () => {
      mode = resolveModeFromHash(window.location.hash)
    }

    window.addEventListener('hashchange', onHashChange)
    onHashChange()
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  })

</script>

<main>
  <nav class="mode-switch" aria-label="Practice mode">
    {#each modeOrder as navMode}
      <a
        href={hrefForMode(navMode)}
        aria-current={mode === navMode ? 'page' : undefined}
        class:active={mode === navMode}
        onclick={() => mode = navMode}
      >
        {modeLabelByMode[navMode]}
      </a>
    {/each}
  </nav>

  <svelte:component this={currentRouteComponent} />
</main>

<style>
  .mode-switch {
    display: inline-flex;
    gap: 0.4em;
    margin-bottom: 1em;
  }

  .mode-switch a {
    display: inline-block;
    padding: 0.45em 0.8em;
    border-radius: 8px;
    color: inherit;
    text-decoration: none;
  }

  .mode-switch a.active {
    background: #89b4fa;
    color: #1e1e2e;
  }

  @media (prefers-color-scheme: light) {
    .mode-switch a.active {
      background: #1e66f5;
      color: #ffffff;
    }
  }
</style>
