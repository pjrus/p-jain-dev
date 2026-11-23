<script>
  import { onMount } from 'svelte';

  /**
   * Character-by-character left-slide text reveal with parallel row starts.
   * Splits text into non-wrapping inline-block word spans and inline-block character spans,
   * resets stagger offset at each visual line break so all rows animate in parallel from left
   * to right, and triggers once at 20% viewport intersection. Only animates on a first page
   * load with motion allowed; otherwise the text is simply shown.
   *
   * @type {{
   *   text: string,
   *   tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span',
   *   id?: string,
   *   class?: string,
   *   staggerMs?: number,
   * }}
   */
  let {
    text,
    tag = 'h1',
    id = undefined,
    class: className = '',
    staggerMs = 22,
  } = $props();

  /** @type {HTMLElement | undefined} */
  let rootEl = $state();
  // Armed = this mount will animate; chars hide until the reveal fires.
  let isArmed = $state(false);
  let isVisible = $state(false);
  /** @type {number[]} */
  let wordOffsets = $state([]);

  let words = $derived(
    text.split(' ').map((word) => ({
      chars: Array.from(word),
    }))
  );

  function measureRowOffsets() {
    if (!rootEl) return;
    const spans = Array.from(rootEl.querySelectorAll('.char-reveal-word'));
    if (spans.length === 0) return;

    let currentLineTop = spans[0].getBoundingClientRect().top;
    let rowCharOffset = 0;

    wordOffsets = spans.map((span, i) => {
      const top = span.getBoundingClientRect().top;
      if (top - currentLineTop > 8) {
        currentLineTop = top;
        rowCharOffset = 0;
      }
      const start = rowCharOffset;
      // +1 accounts for the space between words on the same visual row.
      rowCharOffset += (words[i]?.chars.length ?? 0) + 1;
      return start;
    });
  }

  onMount(() => {
    // app.html adds `m-enter` before first paint (motion allowed) and `m-enter-done` after
    // 700ms as a failsafe. If that failsafe already fired, the title is on screen
    // un-animated (slow JS, or a client-side navigation), so never hide it again.
    const html = document.documentElement;
    if (!html.classList.contains('m-enter') || html.classList.contains('m-enter-done')) return;
    if (!rootEl || !('IntersectionObserver' in window)) return;

    isArmed = true;

    /** @type {number | null} */
    let raf1 = null;
    /** @type {number | null} */
    let raf2 = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        measureRowOffsets();
        // Two frames so the measured row delays commit before the transition starts.
        raf1 = requestAnimationFrame(() => {
          raf2 = requestAnimationFrame(() => {
            isVisible = true;
          });
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(rootEl);

    return () => {
      observer.disconnect();
      if (raf1 !== null) cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
    };
  });
</script>

<svelte:element
  this={tag}
  bind:this={rootEl}
  {id}
  class={['char-reveal', isArmed && 'is-armed', isVisible && 'is-visible', className]
    .filter(Boolean)
    .join(' ')}
  aria-label={text}
>
  {#each words as word, wordIndex}<span class="char-reveal-word" aria-hidden="true">{#each word.chars as char, charIndex}<span
          class="char-reveal-char"
          aria-hidden="true"
          style:--char-delay={`${((wordOffsets[wordIndex] ?? 0) + charIndex) * staggerMs}ms`}
        >{char}</span>{/each}</span>{#if wordIndex < words.length - 1}{' '}{/if}{/each}
</svelte:element>
