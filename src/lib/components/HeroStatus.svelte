<script>
  import { status } from '$lib/data/content.js';
</script>

<section class="status-plate" aria-labelledby="status-plate-title">
  <header class="status-head">
    <h2 id="status-plate-title">Status</h2>
    <span>Updated {status.updated}</span>
  </header>
  <dl>
    {#each status.rows as row}
      <div class="status-row">
        <dt>{row.label}</dt>
        <dd>
          <span class="status-value">
            {#if row.open}<span class="status-dot" aria-hidden="true"></span>{/if}{row.value}
          </span>
          <span class="status-note">{row.note}</span>
        </dd>
      </div>
    {/each}
  </dl>
</section>

<style>
  .status-plate {
    border: 1px solid var(--line-strong);
    background: var(--surface);
    box-shadow: var(--shadow-lg);
  }

  .status-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 18px;
    border-bottom: 1px solid var(--line);
    background: var(--surface-raised);
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: var(--t-label);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .status-head h2 {
    margin: 0;
    color: var(--ink);
    font: inherit;
    font-weight: 500;
  }

  dl {
    margin: 0;
  }

  .status-row {
    display: grid;
    grid-template-columns: 7.5rem minmax(0, 1fr);
    gap: 4px 16px;
    padding: 16px 18px;
  }

  .status-row + .status-row {
    border-top: 1px solid var(--line);
  }

  dt {
    padding-top: 2px;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: var(--t-label);
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  dd {
    display: grid;
    gap: 2px;
    margin: 0;
  }

  .status-value {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--ink);
    font-weight: 500;
  }

  .status-note {
    color: var(--muted);
    font-size: var(--t-small);
  }

  .status-dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: var(--r-pill);
    background: var(--link);
    box-shadow: 0 0 0 3px var(--accent-tint);
  }

  @media (max-width: 640px) {
    .status-head,
    .status-row {
      padding-inline: 14px;
    }

    .status-row {
      grid-template-columns: 1fr;
      padding-block: 12px;
      text-align: center;
    }

    dd {
      justify-items: center;
    }
  }
</style>
