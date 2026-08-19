# Paarangat Jain — Portfolio

A responsive personal portfolio showcasing my work across full-stack web, mobile and assistive technology.

## Overview

The site presents selected projects, technical skills, professional experience and contact details. It is built as a lightweight static Svelte application with no backend or analytics.

## Technology

- Svelte 5
- Vite 7
- JavaScript
- Modern CSS with custom properties
- Bricolage Grotesque, DM Sans and IBM Plex Mono

## Features

- Responsive layouts for desktop and mobile
- Persistent light and dark themes
- Project data managed from a single content module
- Home and blog routes using a small client-side router
- Accessible landmarks, keyboard navigation, focus states and skip link
- Downloadable résumé and links to live projects and source code
- Contact form that opens the visitor's email application with the message pre-filled

## Local development

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

## Available commands

```bash
npm run dev      # Start the development server
npm run check    # Run Svelte diagnostics
npm run build    # Create a production build
npm run preview  # Preview the production build locally
```

## Project structure

```text
public/
├── images/                 Project screenshots and portrait
└── Paarangat-Jain-Resume.pdf
src/
├── components/             Reusable Svelte components
├── data/content.js         Projects, experience and technology data
├── App.svelte              Application layout and page composition
├── main.js                 Application entry point
├── router.svelte.js        Lightweight client-side routing
└── styles.css              Design tokens, themes and component styles
index.html                  Vite entry document
```

## Content updates

Update project, experience and technology content in `src/data/content.js`. Place new images in `public/images/` and reference them with paths beginning with `/images/`.

## Deployment

Create the static production build:

```bash
npm run build
```

Deploy the generated `dist/` directory to any static hosting provider. Configure the host to serve `index.html` as the fallback for client-side routes such as `/blog`.

## Accessibility

The interface targets WCAG 2.2 AA, including semantic landmarks, visible keyboard focus, suitable colour contrast, reduced-motion support and appropriately sized interactive targets.

---

© 2026 Paarangat Jain
