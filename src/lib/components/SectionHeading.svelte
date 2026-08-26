<script>
  let { title, summary = '', headingLevel = 'h2', reveal = false, revealDelay = 0 } = $props();
</script>

<div
  class="section-heading"
  data-reveal={reveal ? 'section-heading' : undefined}
  style={reveal ? `--reveal-delay: ${revealDelay}ms` : undefined}
>
  <div class="section-heading-grid">
    <svelte:element this={headingLevel}>{title}</svelte:element>
    {#if summary}<p>{summary}</p>{/if}
  </div>
</div>
