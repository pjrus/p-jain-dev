<script>
  import { onMount } from 'svelte';
  import { createPhoneScene } from '$lib/phone3d.js';

  /**
   * Responsive iPhone 16–style mockup component:
   * - Desktop (> 860px): Interactive 3D Three.js iPhone 16 object users can drag
   *   360° around (or rotate with arrow keys), featuring the Pomo App OLED screen,
   *   dark titanium frame, side buttons, Dynamic Island, and dual-lens back camera.
   * - Mobile (<= 860px) & SSR/fallback: Crisp lightweight 2D SVG/HTML iPhone 16
   *   mockup with zero WebGL overhead and natural touch scrolling.
   *
   * @type {{
   *   src?: string,
   *   alt?: string,
   *   caption?: string,
   *   interactive?: boolean,
   *   loading?: 'lazy' | 'eager',
   *   class?: string,
   * }}
   */
  let {
    src = undefined,
    alt = '',
    caption = undefined,
    interactive = true,
    loading = 'lazy',
    class: className = '',
  } = $props();

  const uid = $props.id();

  /** @type {HTMLElement | undefined} */
  let canvasHost = $state();
  let isDesktop = $state(false);
  let webglReady = $state(false);
  let webglFailed = $state(false);
  let hasInteracted = $state(false);
  let isGrabbing = $state(false);

  /** @type {{ resetView: () => void, nudge: (dAzimuth: number, dPolar: number) => void, dispose: () => void } | null} */
  let sceneApi = null;

  const is3DActive = $derived(interactive && isDesktop && webglReady && !webglFailed);

  onMount(() => {
    if (!interactive) return;

    const desktopQuery = window.matchMedia('(min-width: 861px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let mountToken = 0;

    function destroyScene() {
      mountToken += 1;
      sceneApi?.dispose();
      sceneApi = null;
      webglReady = false;
      isGrabbing = false;
      hasInteracted = false;
    }

    function syncViewportMode() {
      isDesktop = desktopQuery.matches;

      if (!desktopQuery.matches) {
        destroyScene();
        return;
      }

      if (sceneApi || webglFailed || !canvasHost) return;

      const token = ++mountToken;
      createPhoneScene({
        container: canvasHost,
        src,
        reducedMotion: reducedMotionQuery.matches,
        onInteract: () => {
          if (token === mountToken) hasInteracted = true;
        },
        onReady: () => {
          if (token === mountToken) webglReady = true;
        },
      })
        .then((api) => {
          if (token !== mountToken) {
            api.dispose();
            return;
          }
          sceneApi = api;
        })
        .catch(() => {
          if (token === mountToken) webglFailed = true;
        });
    }

    syncViewportMode();
    desktopQuery.addEventListener('change', syncViewportMode);

    return () => {
      desktopQuery.removeEventListener('change', syncViewportMode);
      destroyScene();
    };
  });

  function handleReset() {
    sceneApi?.resetView();
    hasInteracted = false;
  }

  /** @param {KeyboardEvent} event */
  function handleKeydown(event) {
    if (!is3DActive || !sceneApi) return;
    const step = 0.22;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      sceneApi.nudge(step, 0);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      sceneApi.nudge(-step, 0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      sceneApi.nudge(0, -step);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      sceneApi.nudge(0, step);
    } else if (event.key === 'r' || event.key === 'R') {
      event.preventDefault();
      handleReset();
    }
  }
</script>

<figure
  class={[
    'phone-mockup',
    interactive && !webglFailed && 'phone-mockup--interactive',
    is3DActive && 'phone-mockup--3d',
    isGrabbing && 'phone-mockup--grabbing',
    className,
  ]
    .filter(Boolean)
    .join(' ')}
>
  <div class="phone-stage">
    <div class="phone-glow" aria-hidden="true"></div>

    <!-- Desktop Three.js WebGL mount host (unused on mobile <= 860px) -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
    <div
      class="phone-canvas-host"
      role="application"
      aria-label={alt
        ? `Interactive 3D iPhone showing ${alt}. Drag or use arrow keys to rotate, press R to reset.`
        : 'Interactive 3D iPhone mockup. Drag or use arrow keys to rotate.'}
      tabindex={is3DActive ? 0 : -1}
      bind:this={canvasHost}
      onkeydown={handleKeydown}
      onpointerdown={() => {
        if (is3DActive) isGrabbing = true;
      }}
      onpointerup={() => {
        isGrabbing = false;
      }}
      onpointercancel={() => {
        isGrabbing = false;
      }}
      onpointerleave={() => {
        isGrabbing = false;
      }}
    ></div>

    <!-- Crisp 2D iPhone 16 SVG/HTML mockup (active on mobile, SSR, and WebGL fallback) -->
    <div class="phone-2d" aria-hidden={is3DActive ? 'true' : undefined}>
      <div class="phone-2d-stage">
        <div class="phone-2d-shadow" aria-hidden="true"></div>

        <svg
          class="phone-2d-chassis"
          viewBox="0 0 440 888"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${uid}-titanium-shell`} x1="10" y1="10" x2="430" y2="878" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#4e525b" />
              <stop offset="12%" stop-color="#31343c" />
              <stop offset="48%" stop-color="#22252b" />
              <stop offset="86%" stop-color="#2e3139" />
              <stop offset="100%" stop-color="#191b20" />
            </linearGradient>

            <linearGradient id={`${uid}-chamfer`} x1="10" y1="10" x2="430" y2="878" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34" />
              <stop offset="22%" stop-color="#ffffff" stop-opacity="0.12" />
              <stop offset="52%" stop-color="#ffffff" stop-opacity="0.06" />
              <stop offset="82%" stop-color="#ffffff" stop-opacity="0.18" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08" />
            </linearGradient>

            <linearGradient id={`${uid}-side-btn-left`} x1="5" y1="0" x2="10" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#525660" />
              <stop offset="50%" stop-color="#343740" />
              <stop offset="100%" stop-color="#1e2026" />
            </linearGradient>

            <linearGradient id={`${uid}-side-btn-right`} x1="430" y1="0" x2="435" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#1e2026" />
              <stop offset="50%" stop-color="#383b44" />
              <stop offset="100%" stop-color="#555964" />
            </linearGradient>

            <linearGradient id={`${uid}-screen-rim`} x1="220" y1="28" x2="220" y2="860" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
              <stop offset="35%" stop-color="#ffffff" stop-opacity="0.06" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.14" />
            </linearGradient>
          </defs>

          <!-- Left buttons: Action + Volume Up + Volume Down -->
          <rect x="5" y="164" width="6" height="34" rx="2.5" fill={`url(#${uid}-side-btn-left)`} />
          <rect x="5" y="224" width="6" height="62" rx="2.5" fill={`url(#${uid}-side-btn-left)`} />
          <rect x="5" y="302" width="6" height="62" rx="2.5" fill={`url(#${uid}-side-btn-left)`} />

          <!-- Right button: Power -->
          <rect x="429" y="246" width="6" height="92" rx="2.5" fill={`url(#${uid}-side-btn-right)`} />

          <!-- Outer dark titanium shell -->
          <rect x="10" y="10" width="420" height="868" rx="66" fill={`url(#${uid}-titanium-shell)`} />

          <!-- Subtle antenna seams -->
          <rect x="10" y="92" width="7" height="4" fill="#131519" fill-opacity="0.55" />
          <rect x="423" y="92" width="7" height="4" fill="#131519" fill-opacity="0.55" />
          <rect x="10" y="792" width="7" height="4" fill="#131519" fill-opacity="0.55" />
          <rect x="423" y="792" width="7" height="4" fill="#131519" fill-opacity="0.55" />

          <!-- Specular chamfer -->
          <rect
            x="10.75"
            y="10.75"
            width="418.5"
            height="866.5"
            rx="65.25"
            stroke={`url(#${uid}-chamfer)`}
            stroke-width="1.5"
          />

          <!-- Slim inner matte-black bezel -->
          <rect x="17" y="17" width="406" height="854" rx="59" fill="#07080b" />
          <rect x="192" y="21.5" width="56" height="2.6" rx="1.3" fill="#16181f" />

          <!-- 19.5:9 screen cutout (384 x 832) -->
          <rect x="28" y="28" width="384" height="832" rx="48" fill="#06070b" />
          <rect
            x="27.5"
            y="27.5"
            width="385"
            height="833"
            rx="48.5"
            stroke={`url(#${uid}-screen-rim)`}
            stroke-width="1"
          />
        </svg>

        <div class="phone-2d-screen">
          {#if src}
            <img
              class="phone-2d-image"
              {src}
              {alt}
              width="384"
              height="832"
              {loading}
              decoding="async"
            />
          {/if}

          <div class="phone-2d-island" aria-hidden="true">
            <span class="phone-2d-lens"></span>
          </div>
          <div class="phone-2d-home" aria-hidden="true"></div>
          <div class="phone-2d-glass" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </div>

  {#if interactive && !webglFailed}
    <div class="phone-controls">
      <span class="phone-hint">
        <svg
          class="phone-orbit-icon"
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          aria-hidden="true"
        >
          <ellipse cx="8" cy="8" rx="6.25" ry="2.75" stroke="currentColor" stroke-width="1.25" />
          <path
            d="M11.6 6.2L13.5 7.4L11.8 8.9"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Drag to rotate 360°
      </span>

      {#if hasInteracted}
        <button class="phone-reset-btn" type="button" onclick={handleReset}>
          Reset view
        </button>
      {/if}
    </div>
  {/if}

  {#if caption}
    <figcaption class="phone-caption">{caption}</figcaption>
  {/if}
</figure>

<style>
  .phone-mockup {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: var(--phone-max-width, 360px);
    margin: 0 auto;
    isolation: isolate;
  }

  .phone-stage {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 5;
    outline: none;
    user-select: none;
  }

  .phone-mockup--3d .phone-stage {
    cursor: grab;
  }

  .phone-mockup--grabbing .phone-stage {
    cursor: grabbing;
  }

  .phone-canvas-host:focus-visible {
    outline: 2px solid var(--link, #1d4ed8);
    outline-offset: 4px;
  }

  .phone-glow {
    position: absolute;
    inset: 10% 14% 10% 14%;
    z-index: 0;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at 50% 48%,
      color-mix(in srgb, var(--accent, #1d4ed8) 18%, transparent) 0%,
      color-mix(in srgb, var(--accent, #1d4ed8) 5%, transparent) 52%,
      transparent 78%
    );
    filter: blur(28px);
    opacity: 0.55;
    pointer-events: none;
    transition: opacity var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  .phone-canvas-host {
    position: absolute;
    inset: 0;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  .phone-mockup--3d .phone-canvas-host {
    opacity: 1;
    pointer-events: auto;
  }

  .phone-canvas-host :global(.phone-canvas) {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }

  /* 2D iPhone 16 SVG/HTML mockup (active on mobile, SSR, and WebGL fallback) */
  .phone-2d {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transition: opacity var(--m-surface, 320ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  .phone-mockup--3d .phone-2d {
    opacity: 0;
  }

  .phone-2d-stage {
    position: relative;
    width: min(100%, 212px);
    aspect-ratio: 440 / 888;
    container-type: inline-size;
  }

  .phone-2d-shadow {
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: -2.2%;
    height: 4.5%;
    z-index: 0;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(9, 9, 11, 0.34) 0%,
      rgba(9, 9, 11, 0.16) 50%,
      transparent 78%
    );
    filter: blur(10px);
    pointer-events: none;
  }

  .phone-2d-chassis {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 16px 28px rgba(9, 9, 11, 0.16));
  }

  .phone-2d-screen {
    position: absolute;
    left: calc(28 / 440 * 100%);
    top: calc(28 / 888 * 100%);
    width: calc(384 / 440 * 100%);
    height: calc(832 / 888 * 100%);
    z-index: 2;
    overflow: hidden;
    border-radius: 10.9cqw;
    background: #06070b;
  }

  .phone-2d-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  .phone-2d-island {
    position: absolute;
    top: 1.55%;
    left: 50%;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 31.5%;
    height: 3.7%;
    padding-inline: 3.4%;
    border-radius: 9999px;
    background: #050507;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.06),
      0 1px 2px rgba(0, 0, 0, 0.45);
    transform: translateX(-50%);
  }

  .phone-2d-lens {
    display: block;
    width: 12%;
    aspect-ratio: 1;
    border-radius: 9999px;
    background: radial-gradient(
      circle at 38% 36%,
      rgba(147, 197, 253, 0.55) 0%,
      #14192a 42%,
      #06070c 100%
    );
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .phone-2d-home {
    position: absolute;
    left: 50%;
    bottom: 1.35%;
    z-index: 4;
    width: 35%;
    height: 0.58%;
    min-height: 3px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.72);
    transform: translateX(-50%);
  }

  .phone-2d-glass {
    position: absolute;
    inset: 0;
    z-index: 3;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    background: linear-gradient(
      128deg,
      rgba(255, 255, 255, 0.085) 0%,
      rgba(255, 255, 255, 0.028) 24%,
      rgba(255, 255, 255, 0) 44%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0.72;
  }

  /* Desktop 3D interaction bar */
  .phone-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    min-height: 28px;
  }

  .phone-hint {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--muted);
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: var(--t-label, 0.8125rem);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    user-select: none;
  }

  .phone-orbit-icon {
    color: var(--link, #1d4ed8);
    flex-shrink: 0;
  }

  .phone-reset-btn {
    padding: 4px 10px;
    border: 1px solid var(--line-strong);
    border-radius: var(--r-btn, 0px);
    background: transparent;
    color: var(--ink);
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.75rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background-color var(--m-out, 120ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1)),
      border-color var(--m-out, 120ms) var(--ease, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  @media (hover: hover) and (pointer: fine) {
    .phone-mockup--interactive:hover .phone-glow {
      opacity: 0.95;
    }

    .phone-reset-btn:hover {
      background: var(--tint);
      border-color: var(--ink);
    }
  }

  .phone-caption {
    color: var(--muted);
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: var(--t-label, 0.8125rem);
    letter-spacing: 0.02em;
    line-height: 1.4;
    text-align: center;
  }

  :global(:root[data-theme='dark']) .phone-glow {
    background: radial-gradient(
      ellipse at 50% 48%,
      color-mix(in srgb, var(--link, #5b86ff) 28%, transparent) 0%,
      color-mix(in srgb, var(--accent, #1d4ed8) 10%, transparent) 52%,
      transparent 78%
    );
  }

  :global(:root[data-theme='dark']) .phone-2d-chassis {
    filter: drop-shadow(0 18px 34px rgba(0, 0, 0, 0.65));
  }

  :global(:root[data-theme='dark']) .phone-2d-shadow {
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.82) 0%,
      rgba(0, 0, 0, 0.45) 52%,
      transparent 80%
    );
  }

  /* Mobile mode: pure 2D iPhone 16 mockup, no 3D canvas or rotation bar */
  @media (max-width: 860px) {
    .phone-mockup {
      max-width: min(72vw, 224px);
    }

    .phone-stage {
      aspect-ratio: 440 / 888;
    }

    .phone-2d-stage {
      width: 100%;
    }

    .phone-canvas-host,
    .phone-controls {
      display: none;
    }
  }
</style>
