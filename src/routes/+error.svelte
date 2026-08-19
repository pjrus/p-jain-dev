<script>
  import { page } from '$app/state';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
</script>

<svelte:head>
  <title>{page.status} — Paarangat Jain</title>
</svelte:head>

<section class="blog shell section">
  <div class="blog-empty">
    <p class="blog-title"><span class="blog-title-marker">&gt;</span> {page.status}</p>
    <p>{page.error?.message ?? 'That page could not be found.'}</p>
    <a class="text-link" href="/">Back to the home page <ArrowIcon /></a>
  </div>
</section>
