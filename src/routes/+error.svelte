<script>
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
</script>

<SeoHead
  title={`${page.status} — Paarangat Jain`}
  description="The requested page could not be found."
  path={page.url.pathname.startsWith(base) ? page.url.pathname.slice(base.length) || '/' : page.url.pathname}
  noindex
/>

<section class="blog shell section page-section">
  <div class="blog-empty">
    <p class="blog-title"><span class="blog-title-marker">&gt;</span> {page.status}</p>
    <p>{page.error?.message ?? 'That page could not be found.'}</p>
    <a class="text-link" href={`${base}/`}>Back to the home page <ArrowIcon /></a>
  </div>
</section>
