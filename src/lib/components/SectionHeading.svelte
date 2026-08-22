<script>
  let { title, summary = '', reveal = false, revealDelay = 0 } = $props();
</script>

<div
  class="section-heading"
  data-reveal={reveal ? 'section-heading' : undefined}
  style={reveal ? `--reveal-delay: ${revealDelay}ms` : undefined}
>
  <div class="section-heading-grid">
    <h2>{title}</h2>
    {#if summary}<p>{summary}</p>{/if}
  </div>
</div>
