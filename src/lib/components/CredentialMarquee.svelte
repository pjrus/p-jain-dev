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

<style>
  .credential-marquee {
    border-block: 1px solid var(--line);
    background: var(--background);
  }

  .marquee-window {
    display: flex;
    min-width: 0;
    min-height: 3.75rem;
    overflow: hidden;
    align-items: center;
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee-scroll 38s linear infinite;
    will-change: transform;
  }

  .marquee-list {
    display: flex;
    flex: none;
    align-items: center;
    gap: clamp(1.25rem, 2.5vw, 2.5rem);
    padding-right: clamp(1.25rem, 2.5vw, 2.5rem);
  }

  .marquee-list li {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .marquee-label {
    color: var(--primary);
    font-family: var(--font-display);
    font-size: clamp(0.88rem, 1.1vw, 1rem);
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  @keyframes marquee-scroll {
    to {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 700px) {
    .marquee-window {
      min-height: 3.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-window {
      overflow-x: auto;
    }

    .marquee-track {
      animation: none;
      will-change: auto;
    }

    .marquee-track .marquee-list[aria-hidden='true'] {
      display: none;
    }
  }
</style>
