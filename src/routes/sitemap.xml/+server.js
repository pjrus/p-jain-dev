import { posts } from '$lib/posts.js';
import { canonicalUrl } from '$lib/seo.js';

export const prerender = true;

const staticRoutes = ['/', '/about', '/blog'];

/** @param {string} value */
function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const routes = [
    ...staticRoutes,
    ...posts.filter((post) => !post.draft).map((post) => `/blog/${post.slug}`),
  ];
  const urls = routes
    .map((route) => `  <url><loc>${escapeXml(canonicalUrl(route))}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
