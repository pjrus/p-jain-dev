<script>
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import '../app.css';

  let { children } = $props();

  const year = new Date().getFullYear();
</script>

<a class="skip-link" href="#main-content">Skip to content</a>
<SiteHeader />

<main id="main-content" class="content-scale">
  {@render children()}
</main>

<footer class="site-footer content-scale">
  <div class="shell footer-inner">
    <p>© {year} Paarangat Jain</p>
  </div>
</footer>
