import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Blog posts are Markdown files compiled to Svelte components by mdsvex.
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })],

  kit: {
    paths: {
      // GitHub Pages serves project sites from the repository name.
      base: process.env.BASE_PATH ?? '',
    },
    // Every route is prerendered, so the build is a folder of static files that
    // any host can serve — no Node runtime required.
    adapter: adapter({
      // Serves as the 404 document for hosts that ask for one.
      fallback: '404.html',
    }),
  },
};
