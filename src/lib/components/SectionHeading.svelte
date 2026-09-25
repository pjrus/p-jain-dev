<script>
  let { title, summary = '', headingLevel = 'h2', reveal = false } = $props();
</script>

<div
  class="section-heading"
  data-reveal={reveal ? 'section-heading' : undefined}
>
  <div class="section-heading-grid">
    <svelte:element this={headingLevel}>{title}</svelte:element>
    {#if summary}<p>{summary}</p>{/if}
  </div>
</div>
