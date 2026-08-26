<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import IconGithub from '$lib/components/IconGithub.svelte';
  import IconLinkedin from '$lib/components/IconLinkedin.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import { experience, projects, stack } from '$lib/data/content.js';
  import { assetUrl, canonicalUrl } from '$lib/seo.js';

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paarangat Jain',
    url: canonicalUrl('/'),
    image: assetUrl('/images/paarangat-jain.webp'),
    jobTitle: 'Developer and accessibility advocate',
    description:
      'Melbourne-based developer building accessible, useful software across web, mobile and assistive technology.',
    email: 'mailto:paarangatj@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'Victoria',
      addressCountry: 'AU',
    },
    sameAs: [
      'https://github.com/pjrus',
      'https://www.linkedin.com/in/paarangat-jain-6aa1321ba/',
    ],
    knowsAbout: [
      'Accessible web development',
      'Mobile application development',
      'Assistive technology',
      'Full-stack software development',
    ],
  };

  const initiallyVisibleProjects = 3;
  let showAllProjects = $state(false);
  let visibleProjects = $derived(
    showAllProjects ? projects : projects.slice(0, initiallyVisibleProjects),
  );

  onMount(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const revealTargets = [...document.querySelectorAll('[data-reveal]')];
    if (revealTargets.length === 0) return;

    document.documentElement.classList.add('motion-reveals-ready');

    const pendingTargets = new Set(revealTargets);

    function revealVisibleTargets() {
      const triggerLine = window.innerHeight * 0.88;

      for (const target of pendingTargets) {
        const bounds = target.getBoundingClientRect();
        if (bounds.top > triggerLine || bounds.bottom < 0) continue;
        target.classList.add('is-visible');
        pendingTargets.delete(target);
      }

      if (pendingTargets.size === 0) {
        window.removeEventListener('scroll', revealVisibleTargets);
        window.removeEventListener('resize', revealVisibleTargets);
      }
    }

    const revealFrame = requestAnimationFrame(() => {
      revealVisibleTargets();
      window.addEventListener('scroll', revealVisibleTargets, { passive: true });
      window.addEventListener('resize', revealVisibleTargets);
    });

    return () => {
      cancelAnimationFrame(revealFrame);
      window.removeEventListener('scroll', revealVisibleTargets);
      window.removeEventListener('resize', revealVisibleTargets);
      document.documentElement.classList.remove('motion-reveals-ready');
    };
  });

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

<SeoHead
  title="Paarangat Jain — Developer & accessibility advocate"
  description="Paarangat Jain is a Melbourne-based developer building accessible, useful software across web, mobile and assistive technology."
  jsonLd={homeJsonLd}
/>

<section class="hero shell" id="top">
  <div class="hero-copy">
    <h1><em>Paarangat Jain</em></h1>
    <p class="hero-role">Developer &amp; computer science student</p>
    <p class="hero-intro">
      I build practical software across full-stack web, mobile and assistive technology — from production healthcare tools to low-cost tactile displays designed with blind and low-vision users.
    </p>
    <div class="hero-actions">
      <a class="button button-primary" href="#projects">See my work <ArrowIcon direction="down" /></a>
      <a class="text-link" href={`${base}/Paarangat-Jain-Resume.pdf`} target="_blank">Read my résumé <ArrowIcon /></a>
    </div>
    <dl class="hero-facts">
      <div><dt>Focus</dt><dd>Accessible products</dd></div>
      <div><dt>Stack</dt><dd>Web · mobile · hardware</dd></div>
    </dl>
  </div>

  <div class="hero-visual" aria-label="Portrait and current work">
    <figure class="portrait-card">
      <img src={`${base}/images/paarangat-jain.webp`} alt="Paarangat Jain smiling in formal attire" />
    </figure>
  </div>
</section>

<section class="projects section" id="projects">
  <div class="shell">
    <SectionHeading
      title="Projects"
      reveal
    />

    <div class="project-grid" id="project-grid">
      {#each visibleProjects as project, index}
        <ProjectCard
          {project}
          reveal={showAllProjects && index >= initiallyVisibleProjects}
          revealDelay={showAllProjects && index >= initiallyVisibleProjects
            ? Math.min(index - initiallyVisibleProjects, 2) * 65
            : Math.min(index, 2) * 65}
          revealOnScroll={index < initiallyVisibleProjects}
        />
      {/each}
    </div>

    <div class="project-actions">
      {#if projects.length > initiallyVisibleProjects}
        <button
          class="project-toggle"
          type="button"
          aria-controls="project-grid"
          aria-expanded={showAllProjects}
          onclick={() => (showAllProjects = !showAllProjects)}
        >
          {showAllProjects ? 'Show less' : 'Show more'}
          <ArrowIcon direction="down" />
        </button>
      {/if}
    </div>
  </div>
</section>

<section class="stack shell section" id="stack">
  <SectionHeading
    title="What I build with."
    summary="Languages, frameworks and tools I reach for most across web, mobile and hardware projects."
    reveal
  />

  <div class="stack-grid">
    {#each stack as group, index}
      <div class="stack-card" data-reveal="stack-card" style={`--reveal-delay: ${index * 90}ms`}>
        <h3 class="stack-card-title">// {group.label}</h3>
        <ul class="tag-list" aria-label={group.label}>
          {#each group.items as item}<li>{item}</li>{/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<section class="experience shell section" id="experience">
  <div class="experience-heading" data-reveal="section-heading">
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

  <div class="experience-list" data-reveal="experience-rail">
    {#each experience as item, index}
      <article
        class="experience-item"
        data-reveal="experience-item"
        style={`--reveal-delay: ${Math.min(index, 4) * 70}ms`}
      >
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
    <header class="contact-intro" data-reveal="contact-intro">
      <h2 id="contact-title">Let’s make something useful.</h2>
      <p>
        I’m always open to thoughtful opportunities, collaborations and projects — or a good conversation about accessible technology.
      </p>
    </header>

    <form
      class="contact-form"
      data-reveal="contact-form"
      style="--reveal-delay: 90ms"
      onsubmit={sendContactMessage}
    >
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

    <nav
      class="contact-links"
      data-reveal="contact-links"
      style="--reveal-delay: 180ms"
      aria-label="Other ways to connect"
    >
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
