export const route = $state({ path: window.location.pathname });

window.addEventListener('popstate', () => {
  route.path = window.location.pathname;
});

/**
 * Resolves an internal `/path` or `/path#hash` link. Same-page hash links are
 * left to the browser's native anchor scrolling; cross-page links push new
 * history state and scroll afterwards, since the target section only exists
 * once Svelte has rendered it.
 * @param {string} href
 * @param {MouseEvent} [event]
 */
export function navigateTo(href, event) {
  const [path, hash] = href.split('#');
  const targetPath = path || '/';

  if (targetPath === route.path) return;

  event?.preventDefault();
  window.history.pushState({}, '', href);
  route.path = targetPath;

  if (hash) {
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView();
    });
  } else {
    window.scrollTo(0, 0);
  }
}
