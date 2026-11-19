<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import WordHighlight from '$lib/components/WordHighlight.svelte';
  import { profileDossier } from '$lib/data/content.js';
  import { clamp01, onScrollFrame } from '$lib/scroll.js';

  const { skills, statement, bio } = profileDossier;

  /** @type {HTMLElement | undefined} */
  let sectionEl = $state();
  let progress = $state(0);
  let litCount = $state(-1); // -1 keeps all skills crisp during SSR / no-JS

  onMount(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mqReduce.matches) {
      progress = 1;
      litCount = skills.length;
      return;
    }

    const mqPhone = window.matchMedia('(max-width: 640px)');

    return onScrollFrame(() => {
      if (!sectionEl || mqPhone.matches) return;

      const vh = window.innerHeight || 900;
      const rect = sectionEl.getBoundingClientRect();

      // Sync with WordHighlight sweep as the section rises into reading position
      const startY = vh * 0.84;
      const endY = vh * 0.24;
      const rawP = (startY - rect.top) / Math.max(1, startY - endY);
      const atBottom = vh + window.scrollY >= document.documentElement.scrollHeight - 4;
      const p = atBottom ? 1 : clamp01(rawP);

      progress = p;
      litCount = Math.round(p * skills.length);
    });
  });
</script>

<section
  class="profile section"
  id="about-me"
  aria-labelledby="profile-title"
  style:--profile-p={progress.toFixed(4)}
  bind:this={sectionEl}
>
  <div class="wrap profile-grid">
    <!-- Left column: Equal-height Portrait + Scroll-Illuminated Skills Dossier -->
    <aside class="profile-rail" aria-label="Paarangat Jain profile and skills">
      <div class="dossier-plate">
        <header class="dossier-head">
          <span class="dossier-kicker">Field profile</span>
          <span class="dossier-location">Melbourne, AU</span>
          <span class="dossier-progress" aria-hidden="true">
            <span class="dossier-progress-fill"></span>
          </span>
        </header>

        <div class="dossier-identity">
          <figure class="dossier-portrait">
            <img
              src={`${base}/images/paarangat-jain.webp`}
              alt="Portrait of Paarangat Jain"
              width="300"
              height="300"
              loading="lazy"
            />
          </figure>

          <div class="dossier-meta">
            <p class="dossier-name">Paarangat Jain</p>
            <p class="dossier-sub">Monash CS (Maths minor)</p>
            <p class="dossier-role">Full-stack &amp; assistive tech</p>
          </div>
        </div>

        <div class="dossier-skills" aria-label="Technical skills">
          <div class="dossier-skills-head">
            <span class="meta-label">Skills</span>
            <span class="dossier-skills-count">{skills.length} tools</span>
          </div>

          <ul class="dossier-skill-list">
            {#each skills as skill, i (skill)}
              {@const lit = litCount < 0 || i < litCount}
              <li class="dossier-skill" class:is-lit={lit}>
                {skill}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </aside>

    <!-- Right column: Concise Scroll-Driven Summary (matches LHS height) -->
    <div class="profile-story">
      <header class="profile-intro-head">
        <p class="meta-label profile-eyebrow">About · How I build</p>
        <h2 id="profile-title">Code, people and useful problems.</h2>
      </header>

      <div class="profile-statement">
        <WordHighlight segments={statement} />
      </div>

      <p class="profile-bio">{bio}</p>

      <div class="profile-footer-actions">
        <a class="btn btn--secondary" href={`${base}/about`}>
          More about me <ArrowIcon />
        </a>
        <a class="text-link" href="#projects">
          Explore shipped work <ArrowIcon direction="down" />
        </a>
      </div>
    </div>
  </div>
</section>
