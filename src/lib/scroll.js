import Lenis from 'lenis';

/** @typedef {() => void} ScrollSubscriber */

/**
 * Tuned for a noticeably slower, deliberate, silky-smooth glide on desktop wheel/trackpad
 * while leaving mobile touch momentum, native scrollbar dragging, and keyboard scrolling intact.
 */
export const SMOOTH_SCROLL_OPTIONS = {
  lerp: 0.08,
  wheelMultiplier: 0.68,
  smoothWheel: true,
  syncTouch: false,
  autoRaf: false,
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
};

/** @type {Set<ScrollSubscriber>} */
const subscribers = new Set();

/** @type {Lenis | null} */
let lenis = null;
let lenisRafId = 0;
let nativeRafId = 0;
let nativeScrollListening = false;
let nativeResizeListening = false;

/** @param {number} value */
export function clamp01(value) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function flush() {
  nativeRafId = 0;
  for (const fn of subscribers) {
    fn();
  }
}

function scheduleNative() {
  if (!nativeRafId) {
    nativeRafId = requestAnimationFrame(flush);
  }
}

function attachNativeListeners() {
  if (subscribers.size === 0) return;
  if (!lenis && !nativeScrollListening) {
    window.addEventListener('scroll', scheduleNative, { passive: true });
    nativeScrollListening = true;
  }
  if (!nativeResizeListening) {
    window.addEventListener('resize', scheduleNative, { passive: true });
    nativeResizeListening = true;
  }
}

function detachNativeScrollListener() {
  if (nativeScrollListening) {
    window.removeEventListener('scroll', scheduleNative);
    nativeScrollListening = false;
  }
}

function detachAllNativeListeners() {
  detachNativeScrollListener();
  if (nativeResizeListening) {
    window.removeEventListener('resize', scheduleNative);
    nativeResizeListening = false;
  }
  if (nativeRafId) {
    cancelAnimationFrame(nativeRafId);
    nativeRafId = 0;
  }
}

/**
 * Registers a callback on the single shared scroll/resize rAF loop.
 * When Lenis is active, callbacks run synchronously inside Lenis's rAF tick
 * so scroll-linked visuals update in the exact same animation frame with zero jitter.
 * @param {ScrollSubscriber} fn
 * @returns {() => void}
 */
export function onScrollFrame(fn) {
  subscribers.add(fn);
  attachNativeListeners();
  fn();

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      detachAllNativeListeners();
    }
  };
}

/** @returns {number} */
function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim();
  const navH = Number.parseFloat(raw);
  return Number.isFinite(navH) ? -(navH + 16) : -88;
}

/**
 * Smoothly scrolls same-page hash links through Lenis without hijacking skip-links,
 * modified clicks, or cross-page navigation.
 * @param {MouseEvent} event
 */
function handleAnchorClick(event) {
  if (!lenis || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = event.target;
  if (!(target instanceof Element)) return;
  const anchor = target.closest('a[href]');
  if (!(anchor instanceof HTMLAnchorElement)) return;
  if (anchor.classList.contains('skip-link')) return;
  if (anchor.target && anchor.target !== '_self') return;

  let url;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return;
  }

  if (url.origin !== window.location.origin) return;
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const targetPath = url.pathname.replace(/\/+$/, '') || '/';
  if (currentPath !== targetPath || !url.hash) return;

  const id = decodeURIComponent(url.hash.slice(1));
  if (!id) return;

  if (id === 'top') {
    event.preventDefault();
    lenis.scrollTo(0, { duration: 1.25 });
    history.pushState(null, '', url.hash);
    return;
  }

  const dest = document.getElementById(id);
  if (!dest) return;

  event.preventDefault();
  lenis.scrollTo(dest, { offset: getHeaderOffset(), duration: 1.25 });
  history.pushState(null, '', url.hash);
}

/**
 * Initializes Lenis smooth scrolling on desktop/pointer devices while respecting
 * `prefers-reduced-motion: reduce` (including live OS preference changes).
 * @returns {() => void} Cleanup function
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {};

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  /** @param {number} time */
  function raf(time) {
    if (!lenis) return;
    lenis.raf(time);
    lenisRafId = requestAnimationFrame(raf);
  }

  function start() {
    if (lenis || reducedMotionQuery.matches) return;

    lenis = new Lenis(SMOOTH_SCROLL_OPTIONS);
    detachNativeScrollListener();

    // Flush all onScrollFrame subscribers in the exact same rAF frame after Lenis updates scroll.
    lenis.on('scroll', flush);
    document.addEventListener('click', handleAnchorClick);
    lenisRafId = requestAnimationFrame(raf);
  }

  function destroy() {
    if (!lenis) return;

    document.removeEventListener('click', handleAnchorClick);
    if (lenisRafId) {
      cancelAnimationFrame(lenisRafId);
      lenisRafId = 0;
    }
    lenis.destroy();
    lenis = null;

    // Fall back to passive native scroll listener if any subscribers are still mounted.
    attachNativeListeners();
    flush();
  }

  function syncPreference() {
    if (reducedMotionQuery.matches) {
      destroy();
    } else {
      start();
    }
  }

  syncPreference();
  reducedMotionQuery.addEventListener('change', syncPreference);

  return () => {
    reducedMotionQuery.removeEventListener('change', syncPreference);
    destroy();
  };
}

/**
 * Keeps Lenis synchronized with SvelteKit route transitions and scroll restoration.
 */
export function syncSmoothScroll() {
  if (!lenis) return;
  lenis.resize();
  lenis.scrollTo(window.scrollY, { immediate: true, force: true });
  flush();
}

/** Pauses smooth scroll inertia (e.g. while a modal dialog is open). */
export function stopSmoothScroll() {
  lenis?.stop();
}

/** Resumes smooth scroll inertia after a modal dialog closes. */
export function startSmoothScroll() {
  lenis?.start();
}
