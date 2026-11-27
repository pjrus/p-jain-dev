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
      <p class="dossier-role">Full-stack &amp; mobile software</p>
    </div>
  </div>

  <dl class="dossier-facts" aria-label="Availability, work rights, focus, and scope">
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
