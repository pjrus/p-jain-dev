import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts.js';

/**
 * Loads one Markdown post as a Svelte component. The glob-derived list is the
 * source of truth for what is publishable, so drafts 404 in production exactly
 * as they are hidden from the index.
 * @type {import('./$types').PageLoad}
 */
export async function load({ params }) {
  const post = posts.find((entry) => entry.slug === params.slug);

  if (!post) {
    error(404, `No post called “${params.slug}”.`);
  }

  const { default: content } = await import(`../../../posts/${params.slug}.md`);

  return { post, content };
}

/** Ensure every published post is emitted by the static adapter. */
export function entries() {
  return posts.filter((post) => !post.draft).map((post) => ({ slug: post.slug }));
}
