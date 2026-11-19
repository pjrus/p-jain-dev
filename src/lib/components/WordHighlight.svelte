<script>
  import { onMount } from 'svelte';
  import { clamp01, onScrollFrame } from '$lib/scroll.js';

  /**
   * Scroll-scrubbed statement illumination (dealt taste-skill moment: word-highlight).
   * Renders every word readable at rest, progressively inks them as the statement
   * crosses viewport centre, and stands in full ink under reduced motion or no-JS.
   *
   * @type {{ segments: Array<{ text: string; strong?: boolean }> }}
   */
  let { segments } = $props();

  /** @type {HTMLElement | undefined} */
  let rootEl = $state();
  let revealedCount = $state(-1); // -1 means JS hasn't dimmed yet (SSR & no-JS stay full ink)

  const words = $derived.by(() => {
    /** @type {Array<{ word: string; strong: boolean }>} */
    const out = [];
    for (const seg of segments) {
      const parts = seg.text.trim().split(/\s+/).filter(Boolean);
      for (const word of parts) {
        out.push({ word, strong: Boolean(seg.strong) });
      }
    }
    return out;
  });

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !rootEl) {
      revealedCount = words.length;
      return;
    }

    return onScrollFrame(() => {
      if (!rootEl) return;
      const rect = rootEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const start = vh * 0.84;
      const end = vh * 0.36;
      const raw = (start - rect.top) / Math.max(1, start - end + rect.height * 0.7);
      const t = clamp01(raw);
      const atBottom = vh + window.scrollY >= document.documentElement.scrollHeight - 4;
      revealedCount = atBottom ? words.length : Math.round(t * words.length);
    });
  });
</script>

<p class="word-highlight-text" bind:this={rootEl}>
  {#each words as item, index}
    {@const lit = revealedCount < 0 || index < revealedCount}
    {#if item.strong}
      <strong class="wh-word" class:is-lit={lit}>{item.word}</strong>
    {:else}
      <span class="wh-word" class:is-lit={lit}>{item.word}</span>
    {/if}
    {#if index < words.length - 1}{' '}{/if}
  {/each}
</p>
