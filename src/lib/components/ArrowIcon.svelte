<script>
  /** @type {{ direction?: 'right' | 'down' | 'left' | 'up' }} */
  let { direction = 'right' } = $props();
</script>

<svg
  class:arrow-down={direction === 'down'}
  class:arrow-left={direction === 'left'}
  class:arrow-up={direction === 'up'}
  viewBox="0 0 20 20"
  width="20"
  height="20"
  fill="none"
  aria-hidden="true"
>
  <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="square" />
</svg>

<style>
  .arrow-down {
    transform: rotate(90deg);
  }

  .arrow-left {
    transform: rotate(180deg);
  }

  .arrow-up {
    transform: rotate(-90deg);
  }
</style>
