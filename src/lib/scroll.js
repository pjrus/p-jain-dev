/** @typedef {() => void} ScrollSubscriber */

/** @type {Set<ScrollSubscriber>} */
const subscribers = new Set();
let rafId = 0;

/** @param {number} value */
export function clamp01(value) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function flush() {
  rafId = 0;
  for (const fn of subscribers) {
    fn();
  }
}

function schedule() {
  if (!rafId) {
    rafId = requestAnimationFrame(flush);
  }
}

/**
 * Registers a callback on a single shared scroll/resize rAF loop.
 * @param {ScrollSubscriber} fn
 * @returns {() => void}
 */
export function onScrollFrame(fn) {
  if (subscribers.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
  }
  subscribers.add(fn);
  fn();

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }
  };
}
