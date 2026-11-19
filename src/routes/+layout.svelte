<script>
  import { base } from '$app/paths';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import '../app.css';

  let { children } = $props();

  const year = new Date().getFullYear();
</script>

<SiteHeader />

<main id="main-content">
  {@render children()}
</main>

<footer class="site-footer closing">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-identity">
        <a class="brand" href={`${base}/#top`} aria-label="Paarangat Jain, back to top">
          <img
            class="brand-avatar"
            src={`${base}/images/paarangat-jain.webp`}
            alt=""
            width="28"
            height="28"
          />
          <span>Paarangat Jain</span>
        </a>
        <p class="footer-meta">Melbourne, Victoria, Australia</p>
      </div>

      <nav class="footer-nav" aria-label="Footer navigation">
        <a href={`${base}/#projects`}>Projects</a>
        <a href={`${base}/#tactile`}>Assistive tech</a>
        <a href={`${base}/#experience`}>Experience</a>
        <a href={`${base}/about`}>About</a>
        <a href={`${base}/blog`}>Blog</a>
        <a href={`${base}/Paarangat-Jain-Resume.pdf`} target="_blank" rel="noreferrer">Résumé</a>
        <a href="https://github.com/pjrus" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/" target="_blank" rel="noreferrer">LinkedIn</a>
      </nav>
    </div>

    <div class="footer-legal">
      <p>© {year} Paarangat Jain</p>
    </div>
  </div>
</footer>
