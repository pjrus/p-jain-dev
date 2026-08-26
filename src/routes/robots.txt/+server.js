import { canonicalUrl } from '$lib/seo.js';

export const prerender = true;

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${canonicalUrl('/sitemap.xml')}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
