<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { encodeBrailleWord } from '$lib/braille.js';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import HeroTerminal from '$lib/components/HeroTerminal.svelte';
  import IconGithub from '$lib/components/IconGithub.svelte';
  import IconLinkedin from '$lib/components/IconLinkedin.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import WordHighlight from '$lib/components/WordHighlight.svelte';
  import { education, experience, projects } from '$lib/data/content.js';
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

  const statementSegments = [
    { text: 'Software should run reliably on your own machine and stay reachable for everyone who uses it. I build' },
    { text: 'local-first web tools,', strong: true },
    { text: 'production mobile apps', strong: true },
    { text: 'and' },
    { text: 'affordable tactile Braille hardware', strong: true },
    { text: 'for blind and low-vision users.' },
  ];

  const domainTracks = [
    {
      id: 'local-first',
      title: 'Local-first web tools',
      short: 'Offline browser storage with static export',
      stages: [
        { role: 'Surface', name: 'Browser UI', note: 'Canvas, Kanban and structured forms' },
        { role: 'Storage', name: 'IndexedDB & CRDT', note: 'Private state kept on your device' },
        { role: 'Output', name: 'LaTeX & PDF', note: 'Static client-side document rendering' },
      ],
      artefacts: ['Inkboard', 'Ressie', 'Trackie'],
      detail:
        'Inkboard, Ressie and Trackie run directly on your machine with offline storage and zero account lock-in.',
      href: '#projects',
      cta: 'Inspect shipped apps',
      projectIndex: 2,
    },
    {
      id: 'fullstack-mobile',
      title: 'Full-stack and mobile',
      short: 'Healthcare, community web and hackathon shipping',
      stages: [
        { role: 'Client', name: 'React & Next.js', note: 'Responsive web and React Native interfaces' },
        { role: 'Logic', name: 'TypeScript APIs', note: 'Validation, matching and workflow services' },
        { role: 'Data', name: 'SQL & Firebase', note: 'Relational schemas and hosted real-time state' },
      ],
      artefacts: ['PlasmIT Vector', 'Ocean Connect', 'Skilliton'],
      detail:
        'Healthcare software engineering at PlasmIT Vector, community web delivery at Ocean Connect and UniHack 2026.',
      href: '#experience',
      cta: 'Read experience log',
      projectIndex: null,
    },
    {
      id: 'tactile-hardware',
      title: 'Tactile Braille hardware',
      short: 'Low-cost refreshable displays for blind users',
      stages: [
        { role: 'Companion', name: 'React Native app', note: 'Accessible mobile control and chord input' },
        { role: 'Firmware', name: 'Arduino control', note: 'Actuator timing and serial communication' },
        { role: 'Output', name: '6-dot pin array', note: 'Refreshable Grade-1 tactile Braille cells' },
      ],
      artefacts: ['MATT Display', 'Braille Visualiser', 'School workshops'],
      detail:
        'Coordinating affordable refreshable Braille displays and school workshops with the Monash Assistive Technology Team.',
      href: '#projects',
      cta: 'Inspect Braille visualiser',
      projectIndex: 1,
    },
  ];

  let activeTrackIndex = $state(0);
  let activeTrack = $derived(domainTracks[activeTrackIndex] ?? domainTracks[0]);

  /**
   * Keyboard arrow navigation for the domain track tablist (WCAG APG).
   * @param {KeyboardEvent} event
   * @param {number} index
   */
  function handleTrackKeyDown(event, index) {
    let next = -1;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      next = (index + 1) % domainTracks.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      next = (index - 1 + domainTracks.length) % domainTracks.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = domainTracks.length - 1;
    }
    if (next !== -1) {
      event.preventDefault();
      activeTrackIndex = next;
      const nextEl = document.getElementById(`track-tab-${domainTracks[next].id}`);
      nextEl?.focus();
    }
  }

  /** @type {HTMLElement | undefined} */
  let projectsActEl = $state();
  /** @type {HTMLElement | undefined} */
  let projectRailViewportEl = $state();
  /** @type {HTMLElement | undefined} */
  let projectRailEl = $state();
  /** @type {HTMLElement | undefined} */
  let railTrackEl = $state();

  let activeProjectIndex = $state(0);
  let railProgress = $state(0);
  let railThumbRatio = $state(0.32);
  let isDraggingRail = $state(false);
  let canScrollPrev = $state(false);
  let canScrollNext = $state(true);

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
   * Returns the horizontal alignment inset of the rail inside its viewport.
   */
  function getRailInset() {
    if (!projectRailEl) return 0;
    return parseFloat(getComputedStyle(projectRailEl).paddingLeft) || 0;
  }

  /**
   * Syncs active project indicator, button states and progress bar with native horizontal scroll.
   */
  function syncRailState() {
    if (!projectRailViewportEl || !projectRailEl) return;
    const viewport = projectRailViewportEl;
    const maxScroll = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    const left = viewport.scrollLeft;

    canScrollPrev = left > 4;
    canScrollNext = maxScroll > 4 && left < maxScroll - 4;
    railProgress = maxScroll > 0 ? Math.min(1, Math.max(0, left / maxScroll)) : 0;
    railThumbRatio =
      viewport.scrollWidth > 0
        ? Math.min(1, Math.max(0.16, viewport.clientWidth / viewport.scrollWidth))
        : 0.32;

    const inset = getRailInset();
    const cards = Array.from(projectRailEl.querySelectorAll('.project-card'));
    let nearestIdx = 0;
    let nearestDist = Infinity;
    cards.forEach((card, idx) => {
      if (!(card instanceof HTMLElement)) return;
      const dist = Math.abs(card.offsetLeft - inset - left);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIdx = idx;
      }
    });
    if (nearestIdx !== activeProjectIndex) activeProjectIndex = nearestIdx;
  }

  let railRaf = 0;
  function handleRailScroll() {
    if (!railRaf) {
      railRaf = requestAnimationFrame(() => {
        railRaf = 0;
        syncRailState();
      });
    }
  }

  /**
   * Scrolls the horizontal gallery rail directly to a specific project card.
   * @param {number} index
   * @param {boolean} [scrollToSection]
   */
  function jumpToProject(index, scrollToSection = false) {
    if (!projectRailViewportEl || !projectRailEl) return;
    const clamped = Math.min(projects.length - 1, Math.max(0, index));
    const card = projectRailEl.children[clamped];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (scrollToSection && projectsActEl) {
      projectsActEl.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }

    if (card instanceof HTMLElement) {
      const targetLeft = Math.max(0, card.offsetLeft - getRailInset());
      projectRailViewportEl.scrollTo({
        left: targetLeft,
        behavior: reduced ? 'auto' : 'smooth',
      });
    }
    activeProjectIndex = clamped;
  }

  /**
   * Steps the horizontal gallery rail backward or forward by one card.
   * @param {-1 | 1} direction
   */
  function stepProjectRail(direction) {
    if (!projectRailViewportEl || !projectRailEl) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const firstCard = projectRailEl.querySelector('.project-card');
    const gap = parseFloat(getComputedStyle(projectRailEl).columnGap) || 24;
    const stepWidth = firstCard instanceof HTMLElement ? firstCard.offsetWidth + gap : 380;
    projectRailViewportEl.scrollBy({
      left: direction * stepWidth,
      behavior: reduced ? 'auto' : 'smooth',
    });
  }

  /**
   * Maps a clientX position on the bottom scrollbar track to horizontal rail scrollLeft.
   * @param {number} clientX
   */
  function scrollRailToTrackX(clientX) {
    if (!projectRailViewportEl || !railTrackEl) return;
    const rect = railTrackEl.getBoundingClientRect();
    const thumbPx = rect.width * railThumbRatio;
    const usable = Math.max(rect.width - thumbPx, 1);
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left - thumbPx / 2) / usable));
    const maxScroll = Math.max(
      projectRailViewportEl.scrollWidth - projectRailViewportEl.clientWidth,
      0
    );
    projectRailViewportEl.scrollLeft = ratio * maxScroll;
  }

  /** @param {PointerEvent} event */
  function handleScrollbarPointerDown(event) {
    if (!railTrackEl) return;
    isDraggingRail = true;
    railTrackEl.setPointerCapture(event.pointerId);
    scrollRailToTrackX(event.clientX);
  }

  /** @param {PointerEvent} event */
  function handleScrollbarPointerMove(event) {
    if (!isDraggingRail) return;
    scrollRailToTrackX(event.clientX);
  }

  /** @param {PointerEvent} event */
  function handleScrollbarPointerUp(event) {
    if (!isDraggingRail) return;
    isDraggingRail = false;
    if (railTrackEl?.hasPointerCapture(event.pointerId)) {
      railTrackEl.releasePointerCapture(event.pointerId);
    }
  }

  /** @param {KeyboardEvent} event */
  function handleScrollbarKeyDown(event) {
    if (!projectRailViewportEl) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepProjectRail(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepProjectRail(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      jumpToProject(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      const maxScroll = Math.max(
        projectRailViewportEl.scrollWidth - projectRailViewportEl.clientWidth,
        0
      );
      projectRailViewportEl.scrollTo({ left: maxScroll, behavior: 'smooth' });
    }
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
    syncRailState();
    window.addEventListener('resize', syncRailState, { passive: true });

    return () => {
      disposed = true;
      if (pollTimer) clearTimeout(pollTimer);
      if (railRaf) cancelAnimationFrame(railRaf);
      window.removeEventListener('resize', syncRailState);
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
      <HeroTerminal />
    </div>
  </div>
</section>

<!-- ACT 2: Software and tactile hardware — asymmetric interactive architecture showcase -->
<section
  class="statement band--surface"
  id="statement"
  data-sc-act="flow"
  aria-labelledby="statement-title"
>
  <div class="wrap statement-inner">
    <div class="statement-top">
      <div class="statement-lead">
        <h2 id="statement-title">Software and tactile hardware</h2>
        <p class="statement-sub">
          Select a track to inspect how each system moves from interface to output.
        </p>
      </div>
      <div class="statement-thesis">
        <WordHighlight segments={statementSegments} />
      </div>
    </div>

    <div class="domain-showcase">
      <div
        id="domain-panel"
        class="domain-panel"
        role="tabpanel"
        aria-labelledby={`track-tab-${activeTrack.id}`}
      >
        <div class="domain-panel-head">
          <div>
            <p class="meta-label">System architecture</p>
            <h3>{activeTrack.title}</h3>
          </div>
          <ul class="tag-list domain-artefacts" aria-label={`${activeTrack.title} shipped work`}>
            {#each activeTrack.artefacts as item}<li>{item}</li>{/each}
          </ul>
        </div>

        <ol class="pipeline-grid" aria-label={`${activeTrack.title} architecture stages`}>
          {#each activeTrack.stages as stage, idx}
            <li class="pipeline-stage">
              <div class="pipeline-stage-head">
                <span class="meta-label">{stage.role}</span>
                {#if idx < activeTrack.stages.length - 1}
                  <span class="pipeline-arrow" aria-hidden="true">→</span>
                {/if}
              </div>
              <p class="pipeline-name">{stage.name}</p>
              <p class="pipeline-note">{stage.note}</p>
            </li>
          {/each}
        </ol>

        <div class="domain-panel-foot">
          <p class="domain-detail">{activeTrack.detail}</p>
          {#if activeTrack.projectIndex !== null}
            <button
              type="button"
              class="btn btn--primary domain-cta"
              onclick={() => jumpToProject(activeTrack.projectIndex ?? 0, true)}
            >
              {activeTrack.cta} <ArrowIcon />
            </button>
          {:else}
            <a class="btn btn--primary domain-cta" href={activeTrack.href}>
              {activeTrack.cta} <ArrowIcon />
            </a>
          {/if}
        </div>
      </div>

      <div class="domain-index" role="tablist" aria-label="Engineering tracks">
        {#each domainTracks as track, idx (track.id)}
          {@const selected = idx === activeTrackIndex}
          <button
            id={`track-tab-${track.id}`}
            type="button"
            role="tab"
            class="track-tab"
            class:is-selected={selected}
            aria-selected={selected}
            aria-controls="domain-panel"
            tabindex={selected ? 0 : -1}
            onclick={() => (activeTrackIndex = idx)}
            onkeydown={(e) => handleTrackKeyDown(e, idx)}
          >
            <span class="track-tab-title">{track.title}</span>
            <span class="track-tab-short">{track.short}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- ACT 3 (PEAK): Inverted dark Selected Work native horizontal-scroll gallery -->
<section
  class="projects band--dark"
  id="projects"
  data-sc-act="flow"
  aria-labelledby="projects-title"
  bind:this={projectsActEl}
>
  <div class="projects-stage">
    <div class="wrap projects-head">
      <div class="projects-title-group">
        <h2 id="projects-title">Shipped software projects</h2>
        <p class="projects-lede">
          Six applications across local-first web software, 3D assistive hardware tools and AI workflows.
        </p>
      </div>

      <div class="projects-hud">
        <div class="projects-hud-top">
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

          <div class="projects-arrows" aria-label="Scroll projects horizontally">
            <button
              type="button"
              class="rail-nav-btn"
              aria-label="Previous project"
              disabled={!canScrollPrev}
              onclick={() => stepProjectRail(-1)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              class="rail-nav-btn"
              aria-label="Next project"
              disabled={!canScrollNext}
              onclick={() => stepProjectRail(1)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
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
      id="project-rail-viewport"
      class="wrap project-rail-viewport"
      role="region"
      aria-label="Shipped software projects gallery"
      bind:this={projectRailViewportEl}
      onscroll={handleRailScroll}
    >
      <div class="project-rail" bind:this={projectRailEl}>
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

    <div class="wrap projects-rail-foot">
      <div
        class="rail-scrollbar"
        class:is-dragging={isDraggingRail}
        role="scrollbar"
        aria-label="Horizontal project gallery scrollbar"
        aria-controls="project-rail-viewport"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(railProgress * 100)}
        tabindex="0"
        bind:this={railTrackEl}
        onpointerdown={handleScrollbarPointerDown}
        onpointermove={handleScrollbarPointerMove}
        onpointerup={handleScrollbarPointerUp}
        onpointercancel={handleScrollbarPointerUp}
        onkeydown={handleScrollbarKeyDown}
      >
        <span
          class="rail-scrollbar-thumb"
          style={`width: ${(railThumbRatio * 100).toFixed(2)}%; left: ${(railProgress * (1 - railThumbRatio) * 100).toFixed(2)}%`}
        ></span>
      </div>
      <p class="meta-label rail-scroll-hint">Scroll sideways or drag bar to browse all {projects.length} projects</p>
    </div>
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
