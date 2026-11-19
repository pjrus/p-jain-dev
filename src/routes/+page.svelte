<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { encodeBrailleWord } from '$lib/braille.js';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import BrailleWorkbench from '$lib/components/BrailleWorkbench.svelte';
  import IconGithub from '$lib/components/IconGithub.svelte';
  import IconLinkedin from '$lib/components/IconLinkedin.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import WordHighlight from '$lib/components/WordHighlight.svelte';
  import { education, experience, projects, stack, tactileWork } from '$lib/data/content.js';
  import { canonicalUrl } from '$lib/seo.js';

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paarangat Jain',
    url: canonicalUrl('/'),
    image: canonicalUrl('/images/paarangat-jain.webp'),
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

  const statementSegments = [
    { text: 'Software should run reliably on your own machine and stay reachable for everyone who uses it. I build' },
    { text: 'local-first web tools,', strong: true },
    { text: 'production mobile apps', strong: true },
    { text: 'and' },
    { text: 'affordable tactile Braille hardware', strong: true },
    { text: 'for blind and low-vision users.' },
  ];

  // Live tactile cells spelling "M A T T" in the hero schematic plate
  const heroBrailleRow = encodeBrailleWord('MATT');

  /** @type {HTMLElement | undefined} */
  let projectsActEl = $state();
  /** @type {HTMLElement | undefined} */
  let projectRailEl = $state();

  let activeProjectIndex = $state(0);

  let activeProjectCell = $derived.by(() => {
    const title = projects[activeProjectIndex]?.title ?? 'Work';
    return encodeBrailleWord(title.slice(0, 1))[0] ?? { char: 'W', dots: [2, 4, 5, 6] };
  });

  // Form validation state (validated on submit, never while typing)
  let nameError = $state('');
  let emailError = $state('');
  let messageError = $state('');
  let formStatus = $state('');

  /**
   * Scrolls the pinned horizontal gallery act to bring a specific project card into view.
   * @param {number} index
   */
  function jumpToProject(index) {
    if (!projectsActEl || !projectRailEl) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      const card = projectRailEl.children[index];
      if (card instanceof HTMLElement) {
        card.scrollIntoView({ behavior: 'auto', inline: 'start', block: 'nearest' });
      }
      activeProjectIndex = index;
      return;
    }

    const rect = projectsActEl.getBoundingClientRect();
    const actTop = rect.top + window.scrollY;
    const travel = Math.max(projectsActEl.offsetHeight - window.innerHeight, 1);
    const total = Math.max(projects.length, 1);
    const targetP = total > 1 ? index / total : 0;
    window.scrollTo({ top: Math.round(actTop + travel * targetP), behavior: 'smooth' });
  }

  /**
   * Keeps keyboard focus inside the horizontal pan rail aligned with the viewport.
   * @param {FocusEvent} event
   */
  function handleRailFocus(event) {
    if (!projectsActEl || !projectRailEl) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest('.project-card, .project-end-card');
    if (!card) return;
    const cards = Array.from(projectRailEl.children);
    const idx = cards.indexOf(card);
    if (idx === -1) return;

    const over = projectRailEl.scrollWidth - window.innerWidth;
    if (over <= 0) return;

    const cardLeft = card instanceof HTMLElement ? card.offsetLeft : 0;
    const desiredOffset = Math.max(0, Math.min(over, cardLeft - 80));
    const targetP = desiredOffset / (over * 1.06);
    const actTop = projectsActEl.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(projectsActEl.offsetHeight - window.innerHeight, 1);
    window.scrollTo({ top: Math.round(actTop + travel * Math.min(1, targetP)), behavior: 'instant' });
  }

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

    let raf = 0;
    function syncActiveProject() {
      raf = 0;
      if (!projectsActEl) return;
      const rawP = parseFloat(projectsActEl.style.getPropertyValue('--sc-p') || '0');
      if (Number.isNaN(rawP)) return;
      const idx = Math.min(projects.length - 1, Math.max(0, Math.floor(rawP * projects.length)));
      if (idx !== activeProjectIndex) activeProjectIndex = idx;
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(syncActiveProject);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    syncActiveProject();

    return () => {
      disposed = true;
      if (pollTimer) clearTimeout(pollTimer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      scInstance?.destroy();
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
      <div class="hero-plane hero-plane--plate" data-sc-parallax="-0.25">
        <div class="tactile-specimen-card">
          <div class="specimen-top">
            <img
              class="specimen-portrait"
              src={`${base}/images/paarangat-jain.webp`}
              alt="Paarangat Jain smiling in formal attire"
              width="84"
              height="84"
              fetchpriority="high"
            />
            <div class="specimen-identity">
              <p class="specimen-org">Monash Assistive Technology Team</p>
              <p class="specimen-role">Project coordinator · tactile displays &amp; React Native</p>
            </div>
          </div>

          <div class="specimen-hardware" aria-hidden="true">
            <div class="specimen-braille-strip">
              {#each heroBrailleRow as cell}
                <div class="specimen-cell">
                  <span class="specimen-dots">
                    {#each [1, 4, 2, 5, 3, 6] as dot}
                      <span class="specimen-dot" class:is-up={cell.dots.includes(dot)}></span>
                    {/each}
                  </span>
                  <span class="specimen-char">{cell.char}</span>
                </div>
              {/each}
            </div>
            <p class="specimen-coords">Refreshable 6-dot tactile module · Clayton, VIC</p>
          </div>
        </div>
      </div>

      <div class="hero-plane hero-plane--foreground" data-sc-parallax="0.22">
        <div class="hero-evidence-bar">
          <div>
            <p class="meta-label">Industry experience</p>
            <p class="evidence-value">PlasmIT Vector · Full-stack intern</p>
          </div>
          <div>
            <p class="meta-label">Shipped software</p>
            <p class="evidence-value">6 public projects with source</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ACT 2: Quiet statement beat (dealt taste-skill moment: word-highlight) -->
<section
  class="statement section"
  id="statement"
  data-sc-act="flow"
  aria-labelledby="statement-title"
>
  <div class="wrap statement-inner">
    <h2 id="statement-title">Software and tactile hardware</h2>
    <WordHighlight segments={statementSegments} />
  </div>
</section>

<!-- ACT 3 (PEAK): Inverted dark obsidian Selected Work horizontal gallery rail -->
<section
  class="projects band--dark"
  id="projects"
  data-sc-act="pan"
  data-sc-span="3.2"
  aria-labelledby="projects-title"
  bind:this={projectsActEl}
>
  <div class="projects-stage" data-sc-stage>
    <div class="wrap projects-head">
      <div class="projects-title-group">
        <h2 id="projects-title">Shipped software projects</h2>
        <p class="projects-lede">
          Six applications across local-first web software, 3D assistive hardware tools and AI workflows.
        </p>
      </div>

      <div class="projects-hud">
        <div class="braille-chapter-badge" aria-live="polite">
          <span class="mini-cell mini-cell--inv" aria-hidden="true">
            {#each [1, 4, 2, 5, 3, 6] as dot}
              <span class="mini-dot" class:is-up={activeProjectCell.dots.includes(dot)}></span>
            {/each}
          </span>
          <span class="meta-label">
            {projects[activeProjectIndex]?.title}
          </span>
        </div>

        <div class="projects-jump" role="tablist" aria-label="Jump to project">
          {#each projects as proj, idx}
            <button
              type="button"
              role="tab"
              class="jump-pill"
              class:is-current={idx === activeProjectIndex}
              aria-selected={idx === activeProjectIndex}
              onclick={() => jumpToProject(idx)}
            >
              {proj.title.split(' ')[0]}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div
      class="project-rail"
      data-sc-pan="0.06"
      bind:this={projectRailEl}
      onfocusin={handleRailFocus}
    >
      {#each projects as project, index (project.id)}
        <ProjectCard {project} {index} />
      {/each}

      <aside class="project-end-card" aria-label="More code on GitHub">
        <p class="meta-label">Public repositories</p>
        <h3>Full commit history on GitHub</h3>
        <p class="project-end-copy">
          Every live tool in this gallery links directly to its repository on GitHub, alongside coursework and hardware prototypes.
        </p>
        <a class="btn btn--primary" href="https://github.com/pjrus" target="_blank" rel="noreferrer">
          View GitHub profile <ArrowIcon />
        </a>
      </aside>
    </div>
  </div>
</section>

<!-- ACT 4: Assistive Hardware, Signature Interactive Braille Workbench & Stack -->
<section class="tactile section" id="tactile" data-sc-act="flow" aria-labelledby="tactile-title">
  <div class="wrap tactile-shell">
    <div class="tactile-grid">
      <div class="tactile-info">
        <div class="section-heading">
          <div class="section-heading-grid">
            <h2 id="tactile-title">Assistive hardware and tech stack</h2>
            <p>{tactileWork.summary}</p>
          </div>
        </div>

        <dl class="pillar-list">
          {#each tactileWork.pillars as pillar}
            <div class="pillar-row">
              <dt>{pillar.label}</dt>
              <dd>{pillar.detail}</dd>
            </div>
          {/each}
        </dl>
      </div>

      <div class="tactile-bench-wrap" data-sc-reveal="up" data-sc-reveal-at="0.04 0.28">
        <BrailleWorkbench />
      </div>
    </div>

    <div class="stack-spec">
      {#each stack as group}
        <div class="stack-group">
          <p class="meta-label">{group.label}</p>
          <ul class="tag-list" aria-label={group.label}>
            {#each group.items as item}<li>{item}</li>{/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ACT 5: Experience & Education Ledger with scroll-drawn vertical cobalt spine -->
<section
  class="experience band--surface section"
  id="experience"
  data-sc-act="flow"
  aria-labelledby="experience-title"
>
  <div class="wrap experience-grid">
    <div class="experience-header">
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

      <div class="experience-list" data-sc-in data-sc-stagger="35">
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
    <div class="contact-aside">
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
      action="mailto:paarangatj@gmail.com"
      method="post"
      enctype="text/plain"
      novalidate
      onsubmit={sendContactMessage}
    >
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

      <div class="form-field">
        <label for="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="4"
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
