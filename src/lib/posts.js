import { dev } from '$app/environment';

/**
 * @typedef {object} PostSummary
 * @property {string} slug
 * @property {string} title
 * @property {string} date ISO date, e.g. `2026-08-19`.
 * @property {string} summary
 * @property {string[]} tags
 * @property {boolean} draft
 */

/**
 * @typedef {object} Frontmatter
 * @property {string} title
 * @property {string} date
 * @property {string} summary
 * @property {string[]} [tags]
 * @property {boolean} [draft]
 */

/**
 * Keeps frontmatter dates stable whether the YAML loader returns a string or
 * a Date object, while preserving the ISO value used by the time element.
 * @param {string | Date} value
 */
function normaliseDate(value) {
  const parsed = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toISOString().slice(0, 10);
}

// Only the frontmatter is pulled in, so listing posts never bundles their bodies.
const frontmatter = /** @type {Record<string, Frontmatter>} */ (
  import.meta.glob('/src/posts/*.md', { eager: true, import: 'metadata' })
);

/**
 * Every post, newest first. Drafts are visible while running `npm run dev`
 * and dropped from the production build.
 * @type {PostSummary[]}
 */
export const posts = Object.entries(frontmatter)
  .map(([path, meta]) => ({
    slug: path.split('/').pop()?.replace(/\.md$/, '') ?? '',
    title: meta.title,
    date: normaliseDate(meta.date),
    summary: meta.summary,
    tags: meta.tags ?? [],
    draft: meta.draft ?? false,
  }))
  .filter((post) => dev || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

/**
 * Formats a post date for display, e.g. `19 August 2026`.
 * @param {string} date
 */
export function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
