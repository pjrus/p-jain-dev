# Contributing

Thanks for taking an interest in the project.

## Getting started

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

The project uses SvelteKit, JavaScript, mdsvex and custom CSS. Keep content
changes close to the existing structure: project and experience data belongs
in `src/lib/data/content.js`, and blog posts belong in `src/posts/`.

## Before opening a pull request

Run the checks and production build locally:

```bash
npm run check
npm run build
```

Pull requests should explain what changed, include relevant screenshots for
visual changes, and note any accessibility or responsive behaviour that was
checked. Keep changes focused and avoid committing generated build output or
local environment files.

## Commit and code style

Use clear, present-tense commit messages. Follow the existing naming and
structure conventions, prefer reusable components, and add short comments only
where they clarify non-obvious behaviour.
