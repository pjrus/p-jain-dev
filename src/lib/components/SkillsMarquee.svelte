<script>
  /**
   * @type {{
   *   items: string[],
   *   label?: string,
   *   secondsPerItem?: number,
   *   direction?: 'left' | 'right',
   * }}
   */
  let { items, label = 'Core skills', secondsPerItem = 3.5, direction = 'left' } = $props();

  let duration = $derived(`${(items.length * secondsPerItem).toFixed(1)}s`);
</script>

{#snippet track(/** @type {boolean} */ hidden)}
  <ul class="marquee-track" aria-hidden={hidden ? 'true' : undefined}>
    {#each items as item (item)}
      <li class="marquee-pill">{item}</li>
    {/each}
  </ul>
{/snippet}

<section class="skills-marquee" aria-label={label}>
  <div
    class="wrap marquee-viewport"
    class:marquee-viewport--reverse={direction === 'right'}
    style={`--marquee-duration: ${duration}`}
  >
    <div class="marquee-rail">
      {@render track(false)}
      {@render track(true)}
    </div>
  </div>
</section>
