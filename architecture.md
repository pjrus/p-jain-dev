# Architecture

## Purpose

This repository contains Paarangat Jain's personal portfolio. It is a
content-led SvelteKit site that is built into a directory of static files and
can be deployed without a Node.js server or application database.

The architecture keeps the rendered site simple and portable while allowing
small client-side enhancements such as theme persistence, the mobile menu,
scroll reveals and the contact form's `mailto:` workflow.

## System overview

```text
Content and source files
        |
        v
SvelteKit + Vite + mdsvex build
        |
        v
Prerendered HTML, CSS, JavaScript and assets
        |
        v
Static hosting (GitHub Pages or another static host)
```

At runtime, the browser downloads the generated files. There is no server-side
request handling for page content, user accounts, analytics or form
submissions.

## Application structure

```text
src/
├── app.html                 Document shell and early theme initialisation
├── app.css                  Global stylesheet entry point
├── lib/
│   ├── components/          Reusable Svelte UI components and icons
│   ├── data/content.js      Projects, skills and experience data
│   ├── posts.js             Markdown discovery, filtering and date helpers
│   └── seo.js               Canonical URL and public asset URL helpers
├── posts/                   Markdown blog posts with frontmatter
└── routes/
    ├── +layout.js           Site-wide prerender and trailing-slash policy
    ├── +layout.svelte       Shared header, main landmark and footer
    ├── +page.svelte         Portfolio home page
    ├── about/+page.svelte   About page
    ├── blog/+page.svelte    Published post index
    ├── blog/[slug]/         Individual Markdown post route
    ├── robots.txt/          Generated crawler instructions
    └── sitemap.xml/         Generated static route list

static/
├── images/                  Public project and personal images
└── Paarangat-Jain-Resume.pdf
```

## Build and rendering

1. Vite starts the SvelteKit build.
2. `mdsvex` compiles Markdown files in `src/posts/` into Svelte components.
3. `src/lib/posts.js` eagerly imports post frontmatter to create the blog
   index. Draft posts are included in development and excluded from production.
4. The blog detail route dynamically imports the selected post body. Its
   `entries()` function provides every published slug to the static adapter.
5. SvelteKit prerenders the routes and the static adapter writes the result to
   `build/`, including `404.html` as the fallback document.

The build is controlled by two configuration values:

- `BASE_PATH` sets SvelteKit's base path when the site is hosted below the
  domain root, such as a GitHub Pages project site.
- `siteOrigin` in `src/lib/seo.js` defines the public origin used for canonical
  links, Open Graph URLs, JSON-LD and the sitemap.

When the deployment location changes, update both values or the relevant
deployment configuration so internal links and absolute metadata continue to
match the public site.

## Route and content flow

### Portfolio pages

The home page reads `projects`, `stack` and `experience` from
`src/lib/data/content.js`. `ProjectCard` and other components render that data,
while the page owns the interactive project expansion, contact form and reveal
behaviour.

The about page is mostly editorial content and references public assets through
`$app/paths` so it also works when a base path is configured.

### Blog

```text
src/posts/*.md
       |
       v
posts.js: frontmatter glob -> normalised summaries -> newest-first list
       |
       +--> /blog              index cards and metadata
       |
       +--> /blog/[slug]       selected Markdown body and article metadata
       |
       +--> sitemap.xml        published URLs only
```

Each post requires `title`, `date` and `summary` frontmatter. `tags` and
`draft` are optional. A filename becomes the URL slug, for example
`src/posts/hello-world.md` becomes `/blog/hello-world`.

Drafts remain available for local content work, but production builds do not
list, prerender or expose them through the sitemap. The detail route returns a
404 when a slug is not in the filtered post list.

## SEO and discovery

`SeoHead.svelte` is the shared metadata boundary for page titles, descriptions,
canonical links, Open Graph, Twitter cards and article metadata. Each page
passes its own description and, where useful, JSON-LD structured data.

The prerendered `robots.txt` points crawlers to `sitemap.xml`. The sitemap
contains the static pages and published blog post routes. Both use the URL
helpers in `src/lib/seo.js`, so generated links include the configured base
path.

## Client-side behaviour

Client JavaScript is progressive enhancement layered over the prerendered HTML:

- `SiteHeader.svelte` provides the persistent light/dark theme, responsive
  navigation, focus management and reduced-motion-aware menu transitions.
- The home page adds scroll-triggered reveals and expands the project list.
- The contact form validates required fields in the browser and opens the
  visitor's email client with a pre-filled message.
- CSS custom properties in `src/styles/tokens.css` provide shared colours,
  spacing, typography and layout values for the flat visual system.

The site remains usable as a collection of documents if JavaScript does not
run; enhanced interactions such as the project toggle and theme persistence are
the exception.

## Deployment

Run `npm run build` to create the `build/` directory, then upload that
directory to a static host. For GitHub Pages, configure `BASE_PATH` to the
repository path before building.

## Extension guide

- Add or edit project, technology or experience entries in
  `src/lib/data/content.js`.
- Add public images to `static/images/` and reference them with a path beginning
  with `/images/` through `base`-aware helpers where needed.
- Add a blog post to `src/posts/` with the required frontmatter.
- Add a new page under `src/routes/` and give it a page-specific `SeoHead`
  instance with a canonical `path`.
- Keep reusable visual behaviour in `src/lib/components/` and shared styling in
  `src/styles/` rather than duplicating route markup.

## Local verification

```bash
npm run check   # Svelte and JavaScript diagnostics
npm run build   # Static production build
npm run preview # Inspect the generated build locally
```
