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
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <circle cx="8" cy="6" r="2.2" fill="var(--action-ink)" />
              <circle cx="16" cy="6" r="2.2" fill="var(--action-ink)" />
              <circle cx="8" cy="12" r="2.2" fill="var(--action-ink)" />
              <circle cx="8" cy="18" r="2.2" fill="var(--action-ink)" />
              <circle cx="16" cy="12" r="1.3" fill="var(--action-ink)" opacity="0.35" />
              <circle cx="16" cy="18" r="1.3" fill="var(--action-ink)" opacity="0.35" />
            </svg>
          </span>
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
