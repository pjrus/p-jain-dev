declare module '*.css';

/** Markdown posts compiled by mdsvex; frontmatter is typed in `$lib/posts.js`. */
declare module '*.md' {
  import type { Component } from 'svelte';

  const component: Component;
  export default component;
}

export {};
