<script>
  // Names the destination, matching the button's accessible label: the sun
  // shows while the dark theme is active, because pressing it returns to light.
  let { dark = false } = $props();
</script>

<span class="theme-icon" class:is-dark={dark} aria-hidden="true">
  <!-- lucide `sun` -->
  <svg
    class="sun"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <g class="rays">
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </g>
  </svg>

  <!-- lucide `moon` -->
  <svg
    class="moon"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
</span>

<style>
  .theme-icon {
    display: grid;
    width: 18px;
    height: 18px;
    place-items: center;
  }

  /* Both discs occupy one cell, so the swap happens in place. */
  .theme-icon svg {
    grid-area: 1 / 1;
    transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
  }

  /* Outgoing and incoming both turn clockwise, so the pair reads as one wheel
     rather than as two icons crossing. */
  .sun {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
  }

  .moon {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .is-dark .sun {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .is-dark .moon {
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
  }

  /* The rays collapse into the disc and spring back out a beat behind it, so
     the sun arrives rather than simply appearing. */
  .rays {
    transform-box: view-box;
    transform-origin: 12px 12px;
    transform: scale(0.35);
    opacity: 0;
    transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 160ms ease;
  }

  .is-dark .rays {
    transform: scale(1);
    opacity: 1;
    transition-delay: 110ms;
  }
</style>
