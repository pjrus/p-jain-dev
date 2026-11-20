<script>
  import { onMount } from 'svelte';

  /**
   * Character-by-character left-slide text reveal with parallel row starts.
   * Splits text into non-wrapping inline-block word spans and inline-block character spans,
   * resets stagger offset at each visual line break so all rows animate in parallel from left
   * to right, and triggers once at 20% viewport intersection while respecting reduced motion.
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
  let isVisible = $state(false);
  let reducedMotion = $state(false);
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
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = mq.matches;

    /** @param {MediaQueryListEvent} event */
    const onMotionChange = (event) => {
      reducedMotion = event.matches;
      if (event.matches) {
        isVisible = true;
      }
    };
    mq.addEventListener('change', onMotionChange);

    if (reducedMotion) {
      isVisible = true;
      return () => mq.removeEventListener('change', onMotionChange);
    }

    /** @type {number | null} */
    let raf1 = null;
    /** @type {number | null} */
    let raf2 = null;

    const reveal = () => {
      measureRowOffsets();
      // Wait two animation frames so measured row delays and initial hidden styles commit before transitioning.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          isVisible = true;
        });
      });
    };

    /** @type {IntersectionObserver | null} */
    let observer = null;

    if (rootEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal();
              observer?.disconnect();
              observer = null;
              break;
            }
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(rootEl);
    } else {
      reveal();
    }

    return () => {
      mq.removeEventListener('change', onMotionChange);
      observer?.disconnect();
      if (raf1 !== null) cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
    };
  });
</script>

<svelte:element
  this={tag}
  bind:this={rootEl}
  {id}
  class={['char-reveal', isVisible && 'is-visible', reducedMotion && 'is-reduced', className]
    .filter(Boolean)
    .join(' ')}
  aria-label={text}
>
  {#each words as word, wordIndex}<span class="char-reveal-word" aria-hidden="true">{#each word.chars as char, charIndex}<span
          class="char-reveal-char"
          aria-hidden="true"
          style:--char-delay={reducedMotion
            ? '0ms'
            : `${((wordOffsets[wordIndex] ?? 0) + charIndex) * staggerMs}ms`}
        >{char}</span>{/each}</span>{#if wordIndex < words.length - 1}{' '}{/if}{/each}
</svelte:element>
