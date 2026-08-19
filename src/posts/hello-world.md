---
title: Hello world
date: 2026-08-19
summary: A starter post explaining how this blog is put together — replace or delete it whenever the real first post is ready.
tags: [SvelteKit, Meta]
---

This site now runs on SvelteKit. Every page is prerendered to plain HTML at build
time, so the whole thing still deploys as a folder of static files — there is no
server to keep running.

## Writing a post

Each post is one Markdown file in `src/posts/`. The file name becomes the URL, so
`src/posts/hello-world.md` is served at `/blog/hello-world`. The block at the top
of the file is the frontmatter:

```yaml
---
title: Hello world
date: 2026-08-19
summary: One or two sentences used on the index and for link previews.
tags: [SvelteKit, Meta]
draft: false
---
```

`title`, `date` and `summary` are required. Posts are listed newest first, and
anything marked `draft: true` shows up while running `npm run dev` but is left out
of the production build entirely.

## What Markdown gives you

Ordinary Markdown works as expected: **bold**, _italics_, [links](/#projects),
lists, quotes and fenced code blocks with syntax highlighting.

> Because mdsvex compiles each post into a Svelte component, a post can also
> import and use a Svelte component when a piece of writing needs something
> interactive.

That is the whole system. Add a file, write, and the index page picks it up.
