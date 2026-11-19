<script>
  import { base } from '$app/paths';
  import { skills } from '$lib/data/content.js';
</script>

<aside class="dossier-plate" aria-label="Paarangat Jain field profile and skills">
  <header class="dossier-head">
    <span class="dossier-kicker">Field profile</span>
    <span class="dossier-location">Melbourne, AU</span>
  </header>

  <div class="dossier-identity">
    <figure class="dossier-portrait">
      <img
        src={`${base}/images/paarangat-jain.webp`}
        alt="Portrait of Paarangat Jain"
        width="300"
        height="300"
        loading="eager"
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
      {#each skills as skill (skill)}
        <li class="dossier-skill">{skill}</li>
      {/each}
    </ul>
  </div>
</aside>

<style>
  .dossier-plate {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--line-strong);
    border-radius: var(--r-md);
    background: var(--surface);
    box-shadow: var(--shadow-lg);
  }

  .dossier-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 18px;
    border-bottom: 2px solid var(--action);
    background: var(--surface-raised);
    font-family: var(--font-mono);
    font-size: var(--t-label);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .dossier-kicker {
    color: var(--ink);
    font-weight: 500;
  }

  .dossier-location {
    color: var(--muted);
    font-weight: 500;
  }

  .dossier-identity {
    display: grid;
    grid-template-columns: 104px minmax(0, 1fr);
    gap: 18px;
    align-items: center;
    padding: 18px;
    border-bottom: 1px solid var(--line);
  }

  .dossier-portrait {
    width: 104px;
    height: 104px;
    padding: 3px;
    border: 1px solid var(--line-strong);
    background: var(--surface-raised);
    overflow: hidden;
  }

  .dossier-portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
  }

  .dossier-meta {
    display: grid;
    gap: 4px;
    min-width: 0;
  }

  .dossier-name {
    color: var(--ink);
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .dossier-sub {
    color: var(--muted);
    font-size: var(--t-small);
    line-height: 1.35;
  }

  .dossier-role {
    margin-top: 4px;
    padding-top: 8px;
    border-top: 1px solid var(--line);
    color: var(--link);
    font-family: var(--font-mono);
    font-size: var(--t-label);
    font-weight: 500;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .dossier-skills {
    display: grid;
    gap: 12px;
    padding: 18px;
  }

  .dossier-skills-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  .dossier-skills-count {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.03em;
    font-variant-numeric: tabular-nums;
  }

  .dossier-skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .dossier-skill {
    padding: 5px 9px;
    border: 1px solid var(--line-strong);
    background: var(--surface-raised);
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: 0.78125rem;
    font-weight: 500;
    line-height: 1.25;
  }

  @media (max-width: 920px) {
    .dossier-identity {
      grid-template-columns: 84px minmax(0, 1fr);
      gap: 16px;
      padding: 16px;
    }

    .dossier-portrait {
      width: 84px;
      height: 84px;
    }

    .dossier-skills {
      padding: 16px;
    }
  }
</style>
