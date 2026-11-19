<script>
  import { decodeBrailleDots, encodeBrailleWord, dotsToUnicode } from '$lib/braille.js';
  import ArrowIcon from './ArrowIcon.svelte';

  const PRESETS = ['MATT', 'ACCESS', 'CODE', 'BRAILLE'];
  const KEY_TO_DOT = /** @type {Record<string, number>} */ ({
    f: 1,
    d: 2,
    s: 3,
    j: 4,
    k: 5,
    l: 6,
  });

  // 2x3 visual pin layout: left column [1, 2, 3], right column [4, 5, 6]
  const PINS = [
    { dot: 1, key: 'F', row: 1, col: 1 },
    { dot: 4, key: 'J', row: 1, col: 2 },
    { dot: 2, key: 'D', row: 2, col: 1 },
    { dot: 5, key: 'K', row: 2, col: 2 },
    { dot: 3, key: 'S', row: 3, col: 1 },
    { dot: 6, key: 'L', row: 3, col: 2 },
  ];

  /** @type {HTMLElement | undefined} */
  let benchEl = $state();
  let activeDots = $state([1, 2, 3, 4]); // Starts on 'P' (Paarangat)
  let typedWord = $state('MATT');
  let activePreset = $state('MATT');
  /** @type {Set<number>} */
  let heldChord = new Set();
  /** @type {Set<number>} */
  let chordSnapshot = new Set();

  let decodedLetter = $derived(decodeBrailleDots(activeDots));
  let readoutCells = $derived(encodeBrailleWord(typedWord || ' '));

  /** @param {number} dot */
  function toggleDot(dot) {
    if (activeDots.includes(dot)) {
      activeDots = activeDots.filter((d) => d !== dot);
    } else {
      activeDots = [...activeDots, dot].sort((a, b) => a - b);
    }
  }

  function commitCurrentDots() {
    const letter = decodeBrailleDots(activeDots);
    if (!letter) return;
    activePreset = '';
    typedWord = (typedWord + letter).slice(-10);
  }

  function clearReadout() {
    activePreset = '';
    typedWord = '';
    activeDots = [];
  }

  /** @param {string} word */
  function loadPreset(word) {
    activePreset = word;
    typedWord = word;
    const first = encodeBrailleWord(word)[0];
    activeDots = first ? [...first.dots] : [];
  }

  function isBenchFocused() {
    if (!benchEl) return false;
    const active = document.activeElement;
    if (!active || active.matches('input, textarea, select')) return false;
    return benchEl.contains(active);
  }

  /** @param {KeyboardEvent} event */
  function handleWindowKeyDown(event) {
    if (!isBenchFocused()) return;
    const k = event.key.toLowerCase();
    if (k === 'backspace') {
      event.preventDefault();
      activePreset = '';
      typedWord = typedWord.slice(0, -1);
      return;
    }
    const dot = KEY_TO_DOT[k];
    if (!dot || event.metaKey || event.ctrlKey || event.altKey) return;
    event.preventDefault();
    heldChord.add(dot);
    chordSnapshot.add(dot);
    activeDots = [...chordSnapshot].sort((a, b) => a - b);
  }

  /** @param {KeyboardEvent} event */
  function handleWindowKeyUp(event) {
    const k = event.key.toLowerCase();
    const dot = KEY_TO_DOT[k];
    if (!dot || !heldChord.has(dot)) return;
    heldChord.delete(dot);
    if (heldChord.size === 0 && chordSnapshot.size > 0) {
      const letter = decodeBrailleDots([...chordSnapshot]);
      if (letter) {
        activePreset = '';
        typedWord = (typedWord + letter).slice(-10);
      }
      chordSnapshot.clear();
    }
  }
</script>

<svelte:window onkeydown={handleWindowKeyDown} onkeyup={handleWindowKeyUp} />

<div
  class="braille-bench"
  role="region"
  aria-label="Interactive Grade-1 Braille chord workbench"
  bind:this={benchEl}
>
  <div class="bench-head">
    <div>
      <p class="meta-label">Grade-1 tactile pin array</p>
      <h3 class="bench-title">Test a Perkins Braille chord</h3>
    </div>
    <div class="bench-glyph" aria-live="polite">
      <span class="bench-unicode" aria-hidden="true">{dotsToUnicode(activeDots)}</span>
      <span class="bench-decoded">
        {#if decodedLetter}
          Letter {decodedLetter}
        {:else if activeDots.length === 0}
          No pins raised
        {:else}
          Unassigned chord
        {/if}
      </span>
    </div>
  </div>

  <div class="bench-body">
    <div class="pin-matrix" role="group" aria-label="Six tactile Braille dots">
      {#each PINS as pin}
        {@const raised = activeDots.includes(pin.dot)}
        <button
          type="button"
          class="pin-btn"
          class:is-raised={raised}
          aria-pressed={raised}
          aria-label={`Dot ${pin.dot}, keyboard shortcut ${pin.key}`}
          onclick={() => toggleDot(pin.dot)}
        >
          <span class="pin-cap" aria-hidden="true"></span>
          <span class="pin-meta">
            <span>Dot {pin.dot}</span>
            <kbd>{pin.key}</kbd>
          </span>
        </button>
      {/each}
    </div>

    <div class="bench-readout">
      <div class="readout-strip" aria-live="polite" aria-label={`Refreshable readout: ${typedWord || 'empty'}`}>
        {#each readoutCells as cell, idx (idx)}
          <div class="readout-cell">
            <span class="mini-cell" aria-hidden="true">
              {#each [1, 4, 2, 5, 3, 6] as dot}
                <span class="mini-dot" class:is-up={cell.dots.includes(dot)}></span>
              {/each}
            </span>
            <span class="readout-char">{cell.char}</span>
          </div>
        {/each}
      </div>

      <div class="bench-presets" role="group" aria-label="Preset tactile words">
        {#each PRESETS as word}
          <button
            type="button"
            class="preset-btn"
            class:is-active={activePreset === word}
            onclick={() => loadPreset(word)}
          >
            {word}
          </button>
        {/each}
      </div>

      <div class="bench-actions">
        <button
          type="button"
          class="btn btn--primary bench-commit"
          disabled={!decodedLetter}
          onclick={commitCurrentDots}
        >
          Add letter {decodedLetter ?? ''}
        </button>
        <button type="button" class="btn btn--secondary" onclick={clearReadout}>
          Clear strip
        </button>
      </div>
    </div>
  </div>

  <div class="bench-foot">
    <p class="meta-label">Select any dot button and hold F, D, S + J, K, L to chord on a keyboard.</p>
    <a
      class="text-link"
      href="https://pjrus.github.io/braille-keyboard-visualizer/"
      target="_blank"
      rel="noreferrer"
    >
      Open 3D visualiser <ArrowIcon />
    </a>
  </div>
</div>
