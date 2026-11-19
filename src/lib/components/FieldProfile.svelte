<script>
  import { base } from '$app/paths';
  import { heroFacts } from '$lib/data/content.js';
</script>

<aside class="dossier-plate" aria-label="Paarangat Jain field profile">
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

  <dl class="dossier-facts" aria-label="Availability, focus, and scope">
    {#each heroFacts as row (row.label)}
      <div class="dossier-fact">
        <dt>{row.label}</dt>
        <dd>
          {#if row.open}<span class="dossier-fact-dot" aria-hidden="true"></span>{/if}{row.value}
          {#if row.note}<span class="dossier-fact-note">{row.note}</span>{/if}
        </dd>
      </div>
    {/each}
  </dl>
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

  .dossier-facts {
    margin: 0;
  }

  .dossier-fact {
    display: grid;
    grid-template-columns: 112px minmax(0, 1fr);
    gap: 12px;
    align-items: baseline;
    padding: 14px 18px;
    border-bottom: 1px solid var(--line);
  }

  .dossier-fact:last-child {
    border-bottom: 0;
  }

  .dossier-fact dt {
    font-family: var(--font-mono);
    font-size: var(--t-label);
    font-weight: 500;
    color: var(--muted);
  }

  .dossier-fact dd {
    margin: 0;
    font-size: var(--t-small);
    font-weight: 500;
    line-height: 1.4;
    color: var(--ink);
  }

  .dossier-fact-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: var(--r-pill);
    background: var(--link);
    box-shadow: 0 0 0 3px var(--accent-tint);
    vertical-align: 1px;
  }

  .dossier-fact-note {
    display: block;
    margin-top: 2px;
    color: var(--muted);
    font-weight: 450;
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

    .dossier-fact {
      grid-template-columns: 100px minmax(0, 1fr);
      padding: 12px 16px;
    }
  }
</style>
