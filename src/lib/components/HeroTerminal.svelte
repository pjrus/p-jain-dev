<script>
  import { onMount } from 'svelte';

  const COMMAND = [
    { type: 'cmd', text: 'cat' },
    { type: 'str', text: ' paarangat.txt' },
  ];

  const LINES = [
    { kind: 'name', key: '', text: 'Paarangat Jain' },
    { kind: 'sub', key: '', text: 'Computer Science @ Monash University · Melbourne, VIC' },
    {
      kind: 'bio',
      key: '',
      text: 'Developer and accessibility advocate building full-stack products, mobile apps and affordable tactile Braille displays with the Monash Assistive Technology Team.',
    },
    { kind: 'kv', key: 'role', text: 'Full-Stack Engineering Intern @ PlasmIT Vector' },
    { kind: 'kv', key: 'focus', text: 'Local-first web · React Native · assistive hardware' },
    { kind: 'kv', key: 'off-duty', text: 'Melbourne food spots · K-dramas & Netflix · Marvel films' },
  ];

  const CMD_TOTAL = COMMAND.reduce((n, t) => n + t.text.length, 0);
  const LINE_LENGTHS = LINES.map((l) => l.text.length);
  const ALL_TOTAL = CMD_TOTAL + LINE_LENGTHS.reduce((a, b) => a + b, 0);

  /**
   * Slices syntax-highlighted command tokens to the first `count` characters.
   * @param {number} count
   */
  function sliceCommand(count) {
    let rem = Math.max(0, count);
    const out = [];
    for (const tok of COMMAND) {
      if (rem <= 0) break;
      const take = Math.min(tok.text.length, rem);
      out.push({ type: tok.type, text: tok.text.slice(0, take) });
      rem -= take;
    }
    return out;
  }

  let typedCount = $state(ALL_TOTAL);
  let reducedMotion = $state(false);
  let runId = 0;

  let cmdTyped = $derived(sliceCommand(Math.min(typedCount, CMD_TOTAL)));
  let isTypingCmd = $derived(typedCount < CMD_TOTAL);
  let isDone = $derived(typedCount >= ALL_TOTAL);

  let renderedLines = $derived.by(() => {
    let offset = CMD_TOTAL;
    return LINES.map((line, i) => {
      const len = LINE_LENGTHS[i];
      const shown = Math.min(len, Math.max(0, typedCount - offset));
      const active = typedCount >= offset && typedCount < offset + len;
      offset += len;
      if (shown === 0 && !active) return null;
      return { kind: line.kind, key: line.key, text: line.text.slice(0, shown), active };
    }).filter((item) => item !== null);
  });

  function startTyping() {
    runId += 1;
    const currentRun = runId;
    if (reducedMotion) {
      typedCount = ALL_TOTAL;
      return;
    }
    typedCount = 0;

    function tick() {
      if (currentRun !== runId) return;
      if (typedCount >= ALL_TOTAL) return;
      // Snappy keystroke rhythm on command, rapid terminal stream on bio output (~1.5s total)
      const step = typedCount < CMD_TOTAL ? 1 : 5;
      const delay = typedCount < CMD_TOTAL ? 24 : 14;
      typedCount = Math.min(ALL_TOTAL, typedCount + step);
      window.setTimeout(tick, delay);
    }

    window.setTimeout(tick, 80);
  }

  onMount(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = mq.matches;
    const onChange = () => {
      reducedMotion = mq.matches;
      if (reducedMotion) typedCount = ALL_TOTAL;
    };
    mq.addEventListener('change', onChange);

    startTyping();

    return () => {
      runId += 1;
      mq.removeEventListener('change', onChange);
    };
  });
</script>

<div class="terminal-frame" aria-label="Personal terminal bio for Paarangat Jain">
  <div class="terminal-chrome">
    <div class="terminal-identity">
      <span class="terminal-mark" aria-hidden="true">›_</span>
      <span class="terminal-host">paarangat@melbourne:~</span>
    </div>

    <div class="terminal-chrome-right">
      <span class="terminal-status-pill">
        <span class="terminal-status-dot" aria-hidden="true"></span>
        <span>{isDone ? 'ready' : 'typing'}</span>
      </span>
      <button
        type="button"
        class="terminal-replay"
        aria-label="Replay terminal introduction"
        onclick={startTyping}
      >
        Replay
      </button>
    </div>
  </div>

  <div class="terminal-body">
    <div class="term-cmd-line">
      <span class="term-prompt" aria-hidden="true">$</span>
      <span class="term-cmd-text">
        {#each cmdTyped as tok}<span class={`tok-${tok.type}`}>{tok.text}</span>{/each}
        {#if isTypingCmd}
          <span class="term-cursor" aria-hidden="true"></span>
        {/if}
      </span>
    </div>

    {#if renderedLines.length > 0}
      <div class="term-output">
        {#each renderedLines as line}
          {#if line.kind === 'name'}
            <p class="term-name">
              {line.text}{#if line.active}<span class="term-cursor" aria-hidden="true"></span>{/if}
            </p>
          {:else if line.kind === 'sub'}
            <p class="term-sub">
              {line.text}{#if line.active}<span class="term-cursor" aria-hidden="true"></span>{/if}
            </p>
          {:else if line.kind === 'bio'}
            <p class="term-bio">
              {line.text}{#if line.active}<span class="term-cursor" aria-hidden="true"></span>{/if}
            </p>
          {:else if line.kind === 'kv'}
            <div class="term-kv">
              <span class="term-kv-key">{line.key}</span>
              <span class="term-kv-val">
                {line.text}{#if line.active}<span class="term-cursor" aria-hidden="true"></span>{/if}
              </span>
            </div>
          {/if}
        {/each}
      </div>
    {/if}

    {#if isDone}
      <div class="term-cmd-line term-cmd-line--idle">
        <span class="term-prompt" aria-hidden="true">$</span>
        <span class="term-cursor" aria-hidden="true"></span>
      </div>
    {/if}
  </div>
</div>
