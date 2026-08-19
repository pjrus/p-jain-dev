<script>
  import ArrowIcon from './components/ArrowIcon.svelte';
  import BlogPage from './components/BlogPage.svelte';
  import ProjectCard from './components/ProjectCard.svelte';
  import SectionHeading from './components/SectionHeading.svelte';
  import SiteHeader from './components/SiteHeader.svelte';
  import { experience, projects } from './data/content.js';
  import { route, navigateTo } from './router.svelte.js';

  const year = new Date().getFullYear();
</script>

<svelte:head>
  <meta property="og:title" content="Paarangat Jain — Developer & accessibility advocate" />
  <meta property="og:description" content="Useful, accessible software across web, mobile and assistive technology." />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>
<SiteHeader />

<main id="main-content">
  {#if route.path === '/blog'}
    <BlogPage />
  {:else}
  <section class="hero shell" id="top">
    <div class="hero-copy">
      <p class="eyebrow"><span class="status-dot"></span> Melbourne · Open to opportunities</p>
      <h1>I build useful software for <em>real people.</em></h1>
      <p class="hero-intro">
        I’m Paarangat Jain — a developer, computer science student and accessibility advocate who enjoys turning difficult problems into clear, practical products.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="#projects">See my work <ArrowIcon direction="down" /></a>
        <a class="text-link" href="/Paarangat-Jain-Resume.pdf" target="_blank">Read my résumé <ArrowIcon /></a>
      </div>
      <dl class="hero-facts">
        <div><dt>Focus</dt><dd>Accessible products</dd></div>
        <div><dt>Stack</dt><dd>Web · mobile · hardware</dd></div>
      </dl>
    </div>

    <div class="hero-visual" aria-label="Portrait and current work">
      <figure class="portrait-card">
        <img src="/images/paarangat-jain.webp" alt="Paarangat Jain smiling in formal attire" />
        <figcaption>Paarangat Jain / Developer</figcaption>
      </figure>
    </div>
  </section>

  <section class="projects section" id="projects">
    <div class="shell">
      <SectionHeading
        label="Selected work"
        title="Projects made to be used."
        summary="A mix of independent builds, team projects and experiments across accessibility, education and productivity."
      />

      <div class="project-grid">
        {#each projects as project}
          <ProjectCard {project} />
        {/each}
      </div>

      <a class="text-link section-link" href="https://github.com/pjrus" target="_blank" rel="noreferrer">Browse more on GitHub <ArrowIcon /></a>
    </div>
  </section>

  <section class="experience shell section" id="experience">
    <div class="experience-heading">
      <span class="experience-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8" />
          <path d="M3 12h18M9 11v2M15 11v2" stroke="currentColor" stroke-width="1.8" />
        </svg>
      </span>
      <div>
        <p class="eyebrow">Work history</p>
        <h2>Experience log</h2>
      </div>
    </div>

    <div class="experience-list">
      {#each experience as item}
        <article class="experience-item">
          <span class="experience-marker" aria-hidden="true"></span>
          <div class="experience-item-heading">
            <h3>{item.role}</h3>
            <p class="experience-period">{item.period}</p>
          </div>
          <div class="experience-meta">
            <p class="organisation">@ {item.organisation}</p>
            <p class="location">{item.location}</p>
          </div>
          <p class="experience-summary">{item.summary}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="contact shell" id="contact">
    <div>
      <p class="eyebrow">Get in touch</p>
      <h2>Have a useful problem to solve?</h2>
    </div>
    <div class="contact-action">
      <p>I’m always happy to talk about internships, collaborative projects or interesting technical problems.</p>
      <a class="button button-light" href="mailto:paarangatj@gmail.com">Send me an email <ArrowIcon /></a>
    </div>
  </section>
  {/if}
</main>

<footer class="site-footer">
  <div class="shell footer-inner">
    <p>© {year} Paarangat Jain</p>
    <div>
      <a href="https://github.com/pjrus" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/" target="_blank" rel="noreferrer">LinkedIn</a>
      <a href="/#top" onclick={(event) => navigateTo('/#top', event)}>Back to top ↑</a>
    </div>
  </div>
</footer>
