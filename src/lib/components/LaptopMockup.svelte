<script>
  /**
   * Reusable, responsive 14-inch MacBook Pro–inspired SVG laptop mockup frame.
   * Wraps a project screenshot in a strict 16:10 screen viewport with an optional
   * minimal dark-mode browser top bar and restrained hover interaction.
   *
   * @type {{
   *   src: string,
   *   alt: string,
   *   url?: string,
   *   interactive?: boolean,
   *   loading?: 'lazy' | 'eager',
   *   class?: string,
   * }}
   */
  let {
    src,
    alt,
    url = undefined,
    interactive = true,
    loading = 'lazy',
    class: className = '',
  } = $props();

  const uid = $props.id();

  const displayUrl = $derived(
    url
      ? url
          .trim()
          .replace(/^https?:\/\//i, '')
          .replace(/\/+$/, '')
      : ''
  );
</script>

<div
  class={['laptop-mockup', interactive && 'laptop-mockup--interactive', className]
    .filter(Boolean)
    .join(' ')}
>
  {#if interactive}
    <div class="laptop-glow" aria-hidden="true"></div>
  {/if}

  <div class="laptop-stage">
    <div class="laptop-shadow" aria-hidden="true"></div>

    <!-- Pure inline SVG laptop chassis: anodized lid, bezel, webcam dot, hinge & metallic base -->
    <svg
      class="laptop-chassis"
      viewBox="0 0 1180 712"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <!-- Outer anodized space-grey lid shell -->
        <linearGradient id={`${uid}-lid-shell`} x1="590" y1="6" x2="590" y2="662" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#484b52" />
          <stop offset="4%" stop-color="#2e3036" />
          <stop offset="50%" stop-color="#23252a" />
          <stop offset="100%" stop-color="#1a1c20" />
        </linearGradient>

        <!-- Subtle top-edge specular chamfer highlight -->
        <linearGradient id={`${uid}-top-edge`} x1="86" y1="6" x2="1094" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.04" />
          <stop offset="18%" stop-color="#ffffff" stop-opacity="0.28" />
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.36" />
          <stop offset="82%" stop-color="#ffffff" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04" />
        </linearGradient>

        <!-- Metallic anodized aluminium base deck (horizontal directional sheen) -->
        <linearGradient id={`${uid}-base-deck`} x1="0" y1="670" x2="1180" y2="670" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1b1d21" />
          <stop offset="3%" stop-color="#3c3f47" />
          <stop offset="10%" stop-color="#2b2d33" />
          <stop offset="50%" stop-color="#34373e" />
          <stop offset="90%" stop-color="#2b2d33" />
          <stop offset="97%" stop-color="#3c3f47" />
          <stop offset="100%" stop-color="#1b1d21" />
        </linearGradient>

        <!-- Tapered underside curve gradient -->
        <linearGradient id={`${uid}-base-under`} x1="590" y1="676" x2="590" y2="696" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#23252b" />
          <stop offset="55%" stop-color="#17191d" />
          <stop offset="100%" stop-color="#0d0e11" />
        </linearGradient>

        <!-- Thumb-scoop notch recess -->
        <linearGradient id={`${uid}-notch`} x1="516" y1="666" x2="664" y2="666" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#15171b" />
          <stop offset="15%" stop-color="#22242a" />
          <stop offset="50%" stop-color="#282b31" />
          <stop offset="85%" stop-color="#22242a" />
          <stop offset="100%" stop-color="#15171b" />
        </linearGradient>

        <!-- Hinge barrel gradient -->
        <linearGradient id={`${uid}-hinge`} x1="160" y1="662" x2="1020" y2="662" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0a0b0d" />
          <stop offset="8%" stop-color="#1d1f24" />
          <stop offset="50%" stop-color="#25282e" />
          <stop offset="92%" stop-color="#1d1f24" />
          <stop offset="100%" stop-color="#0a0b0d" />
        </linearGradient>

        <!-- Faint inner screen border glow -->
        <linearGradient id={`${uid}-screen-rim`} x1="590" y1="34" x2="590" y2="634" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16" />
          <stop offset="40%" stop-color="#ffffff" stop-opacity="0.07" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.12" />
        </linearGradient>
      </defs>

      <!-- Lid outer anodized aluminium shell -->
      <path
        d="M110 6H1070C1083.25 6 1094 16.7452 1094 30V658C1094 660.209 1092.21 662 1090 662H90C87.7909 662 86 660.209 86 658V30C86 16.7452 96.7452 6 110 6Z"
        fill={`url(#${uid}-lid-shell)`}
      />

      <!-- Top-edge metallic highlight -->
      <path
        d="M110 6.75H1070C1082.84 6.75 1093.25 17.1594 1093.25 30"
        stroke={`url(#${uid}-top-edge)`}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M86.75 30C86.75 17.1594 97.1594 6.75 110 6.75"
        stroke={`url(#${uid}-top-edge)`}
        stroke-width="1.5"
        stroke-linecap="round"
      />

      <!-- Inner matte black glass bezel -->
      <path
        d="M110 10H1070C1081.05 10 1090 18.9543 1090 30V658H90V30C90 18.9543 98.9543 10 110 10Z"
        fill="#0b0c0e"
      />

      <!-- Subtle webcam dot centered in top bezel -->
      <circle cx="590" cy="22" r="4.2" fill="#17191e" />
      <circle cx="590" cy="22" r="2.5" fill="#060709" />
      <circle cx="589.1" cy="21.1" r="0.85" fill="#93c5fd" fill-opacity="0.4" />

      <!-- 16:10 Screen recess + faint inner border glow (960 x 600) -->
      <rect x="110" y="34" width="960" height="600" rx="8" fill="#050608" />
      <rect
        x="109.5"
        y="33.5"
        width="961"
        height="601"
        rx="8.5"
        stroke={`url(#${uid}-screen-rim)`}
        stroke-width="1"
      />

      <!-- Recessed hinge bar -->
      <rect x="160" y="658" width="860" height="5" rx="1.5" fill={`url(#${uid}-hinge)`} />

      <!-- Lower rubber feet -->
      <rect x="84" y="694" width="64" height="6" rx="3" fill="#0a0b0d" />
      <rect x="1032" y="694" width="64" height="6" rx="3" fill="#0a0b0d" />

      <!-- Base underside tapered curve -->
      <path
        d="M0 676H1180V678C1180 688.5 1164 696 1138 696H42C16 696 0 688.5 0 678V676Z"
        fill={`url(#${uid}-base-under)`}
      />

      <!-- Metallic anodized base deck -->
      <path
        d="M3 662H1177C1178.66 662 1180 663.343 1180 665V677C1180 677.552 1179.55 678 1179 678H1C0.447715 678 0 677.552 0 677V665C0 663.343 1.34315 662 3 662Z"
        fill={`url(#${uid}-base-deck)`}
      />

      <!-- Crisp top-edge highlight on the base deck -->
      <line
        x1="4"
        y1="662.75"
        x2="1176"
        y2="662.75"
        stroke="#ffffff"
        stroke-opacity="0.22"
        stroke-width="1"
      />

      <!-- Subtle bottom lip crease -->
      <line
        x1="12"
        y1="678"
        x2="1168"
        y2="678"
        stroke="#000000"
        stroke-opacity="0.45"
        stroke-width="1"
      />

      <!-- Centered thumb-scoop notch -->
      <path
        d="M516 662H664V665C664 668.314 661.314 671 658 671H522C518.686 671 516 668.314 516 665V662Z"
        fill={`url(#${uid}-notch)`}
      />
      <path
        d="M517 662.5V665C517 667.761 519.239 670 522 670H658C660.761 670 663 667.761 663 665V662.5"
        stroke="#ffffff"
        stroke-opacity="0.1"
        stroke-width="0.8"
      />
    </svg>

    <!-- Strict 16:10 Screen Viewport aligned to the exact SVG bezel cutout (960x600 in 1180x712) -->
    <div class="laptop-screen">
      {#if displayUrl}
        <div class="laptop-browser-bar" aria-hidden="true">
          <div class="laptop-window-controls">
            <span class="laptop-dot laptop-dot--close"></span>
            <span class="laptop-dot laptop-dot--min"></span>
            <span class="laptop-dot laptop-dot--max"></span>
          </div>

          <div class="laptop-url-pill" title={url}>
            <svg
              class="laptop-lock-icon"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" stroke-width="1.1" />
              <path
                d="M4 5.5V4C4 2.89543 4.89543 2 6 2C7.10457 2 8 2.89543 8 4V5.5"
                stroke="currentColor"
                stroke-width="1.1"
              />
            </svg>
            <span class="laptop-url-text">{displayUrl}</span>
          </div>

          <div class="laptop-bar-spacer"></div>
        </div>
      {/if}

      <div class="laptop-viewport">
        <img
          class="laptop-image"
          {src}
          {alt}
          width="1600"
          height="1000"
          {loading}
          decoding="async"
        />
      </div>

      <!-- Faint inner border glow & optional diagonal glass reflection -->
      <div class="laptop-glass-overlay" aria-hidden="true"></div>
    </div>
  </div>
</div>

<style>
  .laptop-mockup {
    position: relative;
    width: 100%;
    container-type: inline-size;
    isolation: isolate;
  }

  .laptop-stage {
    position: relative;
    width: 100%;
    aspect-ratio: 1180 / 712;
    transition: transform var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  /* Soft ambient backlight glow behind the chassis (revealed on hover when interactive) */
  .laptop-glow {
    position: absolute;
    inset: 6% 9% 12% 9%;
    z-index: -1;
    border-radius: 16%;
    background: radial-gradient(
      ellipse at 50% 45%,
      color-mix(in srgb, var(--accent, #1d4ed8) 26%, transparent) 0%,
      color-mix(in srgb, var(--accent, #1d4ed8) 8%, transparent) 48%,
      transparent 76%
    );
    filter: blur(28px);
    opacity: 0;
    transform: scale(0.96);
    pointer-events: none;
    transition:
      opacity var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1)),
      transform var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  /* Soft, realistic ground drop shadow underneath the laptop base */
  .laptop-shadow {
    position: absolute;
    left: 4%;
    right: 4%;
    bottom: -1.5%;
    height: 5.5%;
    z-index: 0;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(9, 9, 11, 0.28) 0%,
      rgba(9, 9, 11, 0.14) 48%,
      transparent 76%
    );
    filter: blur(9px);
    pointer-events: none;
    transition:
      opacity var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1)),
      transform var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  .laptop-chassis {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;
  }

  /* Strict 16:10 viewport aligned to SVG screen rect (x:110, y:34, w:960, h:600 in 1180x712) */
  .laptop-screen {
    position: absolute;
    left: calc(110 / 1180 * 100%);
    top: calc(34 / 712 * 100%);
    width: calc(960 / 1180 * 100%);
    height: calc(600 / 712 * 100%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0.68cqw;
    background: #08090c;
  }

  /* Slim, minimal dark-mode browser top bar */
  .laptop-browser-bar {
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: 1fr minmax(0, auto) 1fr;
    align-items: center;
    gap: 1.2cqw;
    height: clamp(18px, 3cqw, 28px);
    padding-inline: clamp(8px, 1.4cqw, 14px);
    background: #141519;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    user-select: none;
  }

  .laptop-window-controls {
    display: flex;
    align-items: center;
    gap: clamp(4px, 0.65cqw, 6px);
  }

  .laptop-dot {
    width: clamp(5px, 0.72cqw, 8px);
    height: clamp(5px, 0.72cqw, 8px);
    border-radius: var(--r-pill, 9999px);
    background: rgba(255, 255, 255, 0.22);
    transition: background-color var(--m-in, 150ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  .laptop-url-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: clamp(4px, 0.55cqw, 6px);
    max-width: 100%;
    min-width: 0;
    height: clamp(13px, 2cqw, 19px);
    padding-inline: clamp(7px, 1.4cqw, 14px);
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.055);
    border: 1px solid rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.68);
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: clamp(8px, 1.05cqw, 11px);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.01em;
  }

  .laptop-lock-icon {
    flex: 0 0 auto;
    width: clamp(7px, 0.95cqw, 10px);
    height: clamp(7px, 0.95cqw, 10px);
    opacity: 0.62;
  }

  .laptop-url-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .laptop-bar-spacer {
    min-width: 0;
  }

  .laptop-viewport {
    position: relative;
    flex: 1 1 0;
    min-height: 0;
    width: 100%;
    overflow: hidden;
    background: #08090c;
  }

  .laptop-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  /* Faint inner screen border glow + subtle diagonal glass reflection overlay */
  .laptop-glass-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
    background: linear-gradient(
      125deg,
      rgba(255, 255, 255, 0.07) 0%,
      rgba(255, 255, 255, 0.025) 26%,
      rgba(255, 255, 255, 0) 46%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0.65;
    transition: opacity var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  /* Interactive hover state on pointer devices */
  @media (hover: hover) and (pointer: fine) {
    .laptop-mockup--interactive:hover .laptop-stage {
      transform: translateY(-4px);
    }

    .laptop-mockup--interactive:hover .laptop-glow {
      opacity: 1;
      transform: scale(1);
    }

    .laptop-mockup--interactive:hover .laptop-shadow {
      opacity: 0.82;
      transform: scaleX(0.97) translateY(3px);
    }

    .laptop-mockup--interactive:hover .laptop-glass-overlay {
      opacity: 1;
    }

    .laptop-mockup--interactive:hover .laptop-dot--close {
      background: rgba(255, 95, 87, 0.78);
    }

    .laptop-mockup--interactive:hover .laptop-dot--min {
      background: rgba(254, 188, 46, 0.78);
    }

    .laptop-mockup--interactive:hover .laptop-dot--max {
      background: rgba(40, 200, 64, 0.78);
    }
  }

  /* Dark mode adjustments: deeper contact shadow & stronger ambient backlight contrast */
  :global(:root[data-theme='dark']) .laptop-shadow {
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 78%
    );
  }

  :global(:root[data-theme='dark']) .laptop-glow {
    background: radial-gradient(
      ellipse at 50% 45%,
      color-mix(in srgb, var(--link, #5b86ff) 32%, transparent) 0%,
      color-mix(in srgb, var(--accent, #1d4ed8) 12%, transparent) 50%,
      transparent 78%
    );
  }

  /* Respect reduced-motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .laptop-stage,
    .laptop-glow,
    .laptop-shadow,
    .laptop-glass-overlay,
    .laptop-dot {
      transition: none;
    }

    .laptop-mockup--interactive:hover .laptop-stage {
      transform: none;
    }

    .laptop-mockup--interactive:hover .laptop-shadow {
      transform: none;
    }
  }
</style>
