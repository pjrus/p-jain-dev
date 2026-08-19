<script>
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import '../app.css';

  let { children } = $props();

  const year = new Date().getFullYear();
</script>

<svelte:head>
  <meta
    name="description"
    content="Paarangat Jain is a Melbourne-based developer building accessible, useful software across web, mobile and assistive technology."
  />
  <meta property="og:title" content="Paarangat Jain — Developer & accessibility advocate" />
  <meta property="og:description" content="Useful, accessible software across web, mobile and assistive technology." />
</svelte:head>

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
