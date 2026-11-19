<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import HeroTerminal from '$lib/components/HeroTerminal.svelte';
  import IconGithub from '$lib/components/IconGithub.svelte';
  import IconLinkedin from '$lib/components/IconLinkedin.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import { education, experience, projects, stack } from '$lib/data/content.js';
  import { canonicalUrl } from '$lib/seo.js';

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paarangat Jain',
    url: canonicalUrl('/'),
    image: canonicalUrl('/images/paarangat-jain.webp'),
    jobTitle: 'Developer & Accessibility Advocate',
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

  /** @type {HTMLElement | undefined} */
  let projectsActEl = $state();
  let showAllProjects = $state(false);
  let visibleProjects = $derived(
    showAllProjects ? projects : projects.slice(0, initiallyVisibleProjects)
  );

  // Form validation state (validated on submit, never while typing)
  let nameError = $state('');
  let emailError = $state('');
  let messageError = $state('');
  let formStatus = $state('');

  onMount(() => {
    /** @type {{ destroy: () => void; layout: () => void } | null} */
    let scInstance = null;
    let disposed = false;
    let pollTimer = 0;

    function mountEngine() {
      if (disposed) return;
      const rootEl = document.getElementById('main-content');
      const SC = /** @type {any} */ (window).ScrollCraft;
      if (rootEl && SC && typeof SC.mount === 'function') {
        scInstance = SC.mount(rootEl);
        document.documentElement.classList.add('m-enter-done');
        return;
      }
      pollTimer = window.setTimeout(mountEngine, 40);
    }

    mountEngine();

    // Scroll-triggered fade-in reveals (triggers when content enters the lower-middle viewport)
    const rootEl = document.getElementById('main-content');
    /** @type {IntersectionObserver | null} */
    let revealObserver = null;
    /** @type {(() => void) | null} */
    let onScrollBottom = null;

    if (rootEl) {
      const targets = Array.from(rootEl.querySelectorAll('[data-reveal]'));
      /** @param {Element} el */
      const revealEl = (el) => {
        if (el.classList.contains('is-visible')) return;
        el.classList.add('is-visible');
        const stagger = parseFloat(el.getAttribute('data-reveal-stagger') ?? '');
        if (!Number.isNaN(stagger)) {
          Array.from(el.children).forEach((kid, i) => {
            if (kid instanceof HTMLElement) {
              kid.style.transitionDelay = `${i * stagger}ms`;
            }
            kid.classList.add('is-visible');
          });
        }
        revealObserver?.unobserve(el);
      };

      document.documentElement.classList.add('reveal-ready');

      if ('IntersectionObserver' in window) {
        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) revealEl(entry.target);
            });
          },
          { rootMargin: '0px 0px -28% 0px', threshold: 0.05 }
        );
        targets.forEach((el) => revealObserver?.observe(el));

        // Ensure bottom-of-page sections (e.g. Contact on tall screens) always reveal at scroll end
        onScrollBottom = () => {
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
            targets.forEach((el) => revealEl(el));
          }
        };
        window.addEventListener('scroll', onScrollBottom, { passive: true });
      } else {
        targets.forEach((el) => revealEl(el));
      }
    }

    return () => {
      disposed = true;
      if (pollTimer) clearTimeout(pollTimer);
      scInstance?.destroy();
      revealObserver?.disconnect();
      if (onScrollBottom) window.removeEventListener('scroll', onScrollBottom);
      document.documentElement.classList.remove('reveal-ready');
    };
  });

  /**
   * Validates inputs and opens the visitor's email client with details populated.
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

    nameError = name ? '' : 'Write your name.';
    emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ''
      : 'Write an email address with an @ symbol.';
    messageError = message ? '' : 'Write a short note about what you would like to discuss.';

    const errors = [
      nameError && 'contact-name',
      emailError && 'contact-email',
      messageError && 'contact-message',
    ].filter(Boolean);

    if (errors.length > 0) {
      formStatus = `${errors.length} ${errors.length === 1 ? 'field needs' : 'fields need'} attention.`;
      const firstId = String(errors[0]);
      document.getElementById(firstId)?.focus();
      return;
    }

    formStatus = 'Opening your email app with your draft.';
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:paarangatj@gmail.com?subject=${subject}&body=${body}`;
  }
</script>

<SeoHead
  title="Paarangat Jain: full-stack and assistive-tech developer in Melbourne"
  description="Paarangat Jain is a Melbourne-based developer building local-first web software, mobile applications and affordable tactile Braille hardware."
  jsonLd={homeJsonLd}
/>

<!-- ACT 1: Dimensional 4-plane architectural hero -->
<section class="hero" id="top" data-sc-act="flow" data-enter aria-labelledby="hero-title">
  <div class="hero-plane hero-plane--grid" data-sc-parallax="-0.6" aria-hidden="true"></div>

  <div class="wrap hero-inner">
    <div class="hero-copy">
      <h1 id="hero-title">Paarangat Jain, developer in Melbourne.</h1>
      <p class="hero-intro">
        Computer science student at Monash University building local-first web tools, healthcare software and affordable tactile Braille displays for blind and low-vision users.
      </p>

      <div class="hero-actions">
        <a class="btn btn--primary" href="#projects">
          See my work <ArrowIcon direction="down" />
        </a>
        <a
          class="btn btn--secondary"
          href={`${base}/Paarangat-Jain-Resume.pdf`}
          target="_blank"
          rel="noreferrer"
        >
          Read my résumé <ArrowIcon />
        </a>
      </div>

      <dl class="hero-facts">
        <div>
          <dt>Location</dt>
          <dd>Melbourne, Victoria</dd>
        </div>
        <div>
          <dt>Degree</dt>
          <dd>Monash CS (2024–2027)</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>Web, mobile, hardware</dd>
        </div>
      </dl>
    </div>

    <div class="hero-stage">
      <HeroTerminal />
    </div>
  </div>
</section>

<!-- ACT 3 (PEAK): Selected Work vertical 3-column grid (matches main layout) -->
<section
  class="projects section"
  id="projects"
  data-sc-act="flow"
  aria-labelledby="projects-title"
  bind:this={projectsActEl}
>
  <div class="wrap projects-shell">
    <div class="projects-head" data-reveal>
      <div class="projects-title-group">
        <h2 id="projects-title">Shipped software projects</h2>
      </div>
    </div>

    <div class="project-grid" id="project-grid" data-reveal data-reveal-stagger="70">
      {#each visibleProjects as project, index (project.id)}
        {@const extra = index >= initiallyVisibleProjects}
        <ProjectCard
          {project}
          {index}
          {extra}
          revealDelay={Math.min(extra ? index - initiallyVisibleProjects : index, 2) * 65}
        />
      {/each}
    </div>

    {#if projects.length > initiallyVisibleProjects}
      <div class="project-actions" data-reveal>
        <button
          class="btn project-toggle"
          type="button"
          aria-controls="project-grid"
          aria-expanded={showAllProjects}
          onclick={() => (showAllProjects = !showAllProjects)}
        >
          {showAllProjects ? 'Show less' : 'Show more'}
          <ArrowIcon direction={showAllProjects ? 'up' : 'down'} />
        </button>
      </div>
    {/if}
  </div>
</section>

<!-- ACT 4: Experience & Education Ledger with scroll-drawn vertical cobalt spine -->
<section
  class="experience band--surface section"
  id="experience"
  data-sc-act="flow"
  aria-labelledby="experience-title"
>
  <div class="wrap experience-grid">
    <div class="experience-header" data-reveal>
      <h2 id="experience-title">Engineering experience and education</h2>
      <p class="experience-intro">
        Healthcare full-stack delivery, community web maintenance and leadership across assistive hardware.
      </p>

      <div class="experience-education">
        <p class="meta-label">Education</p>
        {#each education as item}
          <article class="edu-mini-card">
            <p class="meta-label">{item.period}</p>
            <h3>{item.institution}</h3>
            <p class="edu-award">{item.award}</p>
            <p class="edu-detail">{item.detail} · {item.location}</p>
          </article>
        {/each}
      </div>

      <div class="experience-stack">
        <p class="meta-label">Skills</p>
        {#each stack as group}
          <div class="stack-mini-card">
            <h3 class="stack-mini-title">// {group.label}</h3>
            <ul class="tag-list" aria-label={group.label}>
              {#each group.items as item}<li>{item}</li>{/each}
            </ul>
          </div>
        {/each}
      </div>

      <div class="experience-action">
        <a
          class="btn btn--secondary"
          href={`${base}/Paarangat-Jain-Resume.pdf`}
          target="_blank"
          rel="noreferrer"
        >
          Read my résumé <ArrowIcon />
        </a>
      </div>
    </div>

    <div class="experience-ledger">
      <div class="experience-spine" aria-hidden="true">
        <span class="experience-spine-fill"></span>
      </div>

      <div class="experience-list" data-reveal data-reveal-stagger="45">
        {#each experience as item}
          <article class="experience-item">
            <span class="experience-node" aria-hidden="true"></span>
            <div class="experience-item-top">
              <h3>{item.role}</h3>
              <p class="meta-label experience-period">{item.period}</p>
            </div>
            <p class="experience-org">
              <span>{item.organisation}</span>
              <span class="experience-loc">({item.location})</span>
            </p>
            <p class="experience-summary">{item.summary}</p>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- ACT 6: Grounded Contact & Closing Plate -->
<section class="contact section" id="contact" data-sc-act="flow" aria-labelledby="contact-title">
  <div class="wrap contact-grid">
    <div class="contact-aside" data-reveal>
      <h2 id="contact-title">Contact and portfolio links</h2>
      <p class="contact-lede">
        Open to graduate and junior full-stack engineering roles in Melbourne, as well as collaborations in assistive technology and accessible software.
      </p>

      <nav class="contact-channels" aria-label="Direct contact channels">
        <a class="channel-row" href="mailto:paarangatj@gmail.com">
          <span class="channel-label">Email</span>
          <span class="channel-value">paarangatj@gmail.com <ArrowIcon /></span>
        </a>
        <a
          class="channel-row"
          href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/"
          target="_blank"
          rel="noreferrer"
        >
          <span class="channel-label">
            <IconLinkedin size={16} /> LinkedIn
          </span>
          <span class="channel-value">paarangat-jain <ArrowIcon /></span>
        </a>
        <a class="channel-row" href="https://github.com/pjrus" target="_blank" rel="noreferrer">
          <span class="channel-label">
            <IconGithub size={16} /> GitHub
          </span>
          <span class="channel-value">github.com/pjrus <ArrowIcon /></span>
        </a>
        <a
          class="channel-row"
          href={`${base}/Paarangat-Jain-Resume.pdf`}
          target="_blank"
          rel="noreferrer"
        >
          <span class="channel-label">Résumé</span>
          <span class="channel-value">Download PDF <ArrowIcon /></span>
        </a>
      </nav>
    </div>

    <form
      class="contact-form"
      data-reveal
      action="mailto:paarangatj@gmail.com"
      method="post"
      enctype="text/plain"
      novalidate
      onsubmit={sendContactMessage}
    >
      <div class="form-row">
        <div class="form-field">
          <label for="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autocomplete="name"
            aria-invalid={nameError ? 'true' : undefined}
            aria-describedby={nameError ? 'contact-name-err' : undefined}
            required
          />
          {#if nameError}
            <p id="contact-name-err" class="field-error">{nameError}</p>
          {/if}
        </div>

        <div class="form-field">
          <label for="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autocomplete="email"
            aria-invalid={emailError ? 'true' : undefined}
            aria-describedby={emailError ? 'contact-email-err' : undefined}
            required
          />
          {#if emailError}
            <p id="contact-email-err" class="field-error">{emailError}</p>
          {/if}
        </div>
      </div>

      <div class="form-field">
        <label for="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="3"
          aria-invalid={messageError ? 'true' : undefined}
          aria-describedby={messageError ? 'contact-message-err' : undefined}
          required
        ></textarea>
        {#if messageError}
          <p id="contact-message-err" class="field-error">{messageError}</p>
        {/if}
      </div>

      <div class="form-actions">
        <button class="btn btn--primary contact-submit" type="submit">
          Send message <ArrowIcon />
        </button>
        <p class="form-note">Opens your email app with the message filled in.</p>
        <p class="form-status" role="status" aria-live="polite">{formStatus}</p>
      </div>
    </form>
  </div>
</section>
