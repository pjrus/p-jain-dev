<script>
  import ArrowIcon from './components/ArrowIcon.svelte';
  import BlogPage from './components/BlogPage.svelte';
  import IconGithub from './components/IconGithub.svelte';
  import IconLinkedin from './components/IconLinkedin.svelte';
  import ProjectCard from './components/ProjectCard.svelte';
  import SectionHeading from './components/SectionHeading.svelte';
  import SiteHeader from './components/SiteHeader.svelte';
  import { experience, projects, stack } from './data/content.js';
  import { route } from './router.svelte.js';

  const year = new Date().getFullYear();

  /**
   * Opens the visitor's email client with their message ready to send.
   * This keeps the static portfolio useful without pretending to submit to a backend.
   * @param {SubmitEvent} event
   */
  function sendContactMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

    window.location.href = `mailto:paarangatj@gmail.com?subject=${subject}&body=${body}`;
  }
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
      <h1>Hi, I’m <em>Paarangat Jain.</em></h1>
      <p class="hero-role">Developer &amp; computer science student</p>
      <p class="hero-intro">
        I build practical software across full-stack web, mobile and assistive technology — from production healthcare tools to low-cost tactile displays designed with blind and low-vision users.
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
      </figure>
    </div>
  </section>

  <section class="projects section" id="projects">
    <div class="shell">
      <SectionHeading
        title="Projects"
      />

      <div class="project-grid">
        {#each projects as project}
          <ProjectCard {project} />
        {/each}
      </div>

      <a class="text-link section-link" href="https://github.com/pjrus" target="_blank" rel="noreferrer">Browse more on GitHub <ArrowIcon /></a>
    </div>
  </section>

  <section class="stack shell section" id="stack">
    <SectionHeading
      title="What I build with."
      summary="Languages, frameworks and tools I reach for most across web, mobile and hardware projects."
    />

    <div class="stack-grid">
      {#each stack as group}
        <div class="stack-card">
          <h3 class="stack-card-title">// {group.label}</h3>
          <ul class="tag-list" aria-label={group.label}>
            {#each group.items as item}<li>{item}</li>{/each}
          </ul>
        </div>
      {/each}
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

  <section class="contact section" id="contact" aria-labelledby="contact-title">
    <div class="contact-inner">
      <header class="contact-intro">
        <h2 id="contact-title">Let’s make something useful.</h2>
        <p>
          I’m always open to thoughtful opportunities, collaborations and projects — or a good conversation about accessible technology.
        </p>
      </header>

      <form class="contact-form" onsubmit={sendContactMessage}>
        <div class="form-field">
          <label for="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autocomplete="name" placeholder="Your name" required />
        </div>

        <div class="form-field">
          <label for="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required />
        </div>

        <div class="form-field">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="4" placeholder="What would you like to talk about?" required></textarea>
        </div>

        <button class="contact-submit" type="submit">
          Send message
          <ArrowIcon />
        </button>
        <p class="contact-form-note">Opens your email app with the details filled in.</p>
      </form>

      <nav class="contact-links" aria-label="Other ways to connect">
        <a href="mailto:paarangatj@gmail.com">
          <span class="contact-link-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
              <path d="M3 6.5h18v11H3zM3.5 7l8.5 7 8.5-7" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
            </svg>
          </span>
          Email
        </a>
        <a href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/" target="_blank" rel="noreferrer">
          <span class="contact-link-icon" aria-hidden="true"><IconLinkedin size={15} /></span>
          LinkedIn
        </a>
        <a href="https://github.com/pjrus" target="_blank" rel="noreferrer">
          <span class="contact-link-icon" aria-hidden="true"><IconGithub size={16} /></span>
          GitHub
        </a>
      </nav>
    </div>
  </section>

  {/if}
</main>

<footer class="site-footer">
  <div class="shell footer-inner">
    <p>© {year} Paarangat Jain</p>
  </div>
</footer>
