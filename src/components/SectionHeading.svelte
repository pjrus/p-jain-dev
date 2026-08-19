<script>
  let { label, title, summary = '' } = $props();
</script>

<div class="section-heading">
  <p class="eyebrow">{label}</p>
  <div class="section-heading-grid">
    <h2>{title}</h2>
    {#if summary}<p>{summary}</p>{/if}
  </div>
</div>
