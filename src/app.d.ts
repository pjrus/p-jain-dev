// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

declare module '*.css';

/** Markdown posts compiled by mdsvex: a Svelte component plus its frontmatter. */
declare module '*.md' {
  import type { Component } from 'svelte';

  export const metadata: {
    title: string;
    date: string;
    summary: string;
    tags?: string[];
    draft?: boolean;
  };

  const component: Component;
  export default component;
}

export {};
