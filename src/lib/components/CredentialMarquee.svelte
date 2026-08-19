<script>
  /** @type {string[]} */
  export let items = [];
</script>

<section class="credential-marquee" aria-label="Skills and experience highlights">
  <div class="marquee-window">
    <div class="marquee-track">
      {#each [0, 1] as copy}
        <ul class="marquee-list" aria-hidden={copy === 1 ? 'true' : undefined}>
          {#each items as item}
            <li>
              <span class="marquee-label">{item}</span>
            </li>
          {/each}
        </ul>
      {/each}
    </div>
  </div>
</section>
