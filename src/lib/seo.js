import { base } from '$app/paths';

// Keep the public origin in one place so canonical links and feeds agree.
// BASE_PATH is supplied by the GitHub Pages deployment workflow.
export const siteOrigin = 'https://pjrus.github.io';
export const siteUrl = `${siteOrigin}${base}`;
export const siteName = 'Paarangat Jain';
export const defaultImage = '/images/portfolio.png';

/**
 * Builds a canonical URL for a route or public asset.
 * @param {string} path
 */
export function canonicalUrl(path = '/') {
  const normalisedPath = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return `${siteUrl}${normalisedPath}`;
}
