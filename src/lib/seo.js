import { base } from '$app/paths';

// Keep the public origin in one place so canonical links and feeds agree.
// BASE_PATH is supplied by the GitHub Pages deployment workflow.
export const siteUrl = `https://pjrus.github.io${base}`;
export const siteName = 'Paarangat Jain';

/**
 * Builds a canonical URL for a root-relative route or public asset, e.g. `/blog`.
 * @param {string} path
 */
export function canonicalUrl(path = '/') {
  return `${siteUrl}${path === '/' ? '' : path}`;
}
