# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** recruiters and engineering hiring managers, largely Melbourne-based, evaluating Paarangat Jain for a graduate or junior full-stack role. They arrive from a LinkedIn profile or a submitted application, skim for roughly a minute, and decide whether to progress to an interview. They are comparing several candidates in one sitting, often on a phone between other tasks, and are looking for evidence that the work is real and that the person can ship.

**Secondary (confirmed, not primary):** accessibility and assistive-technology practitioners — researchers, program leads, and organisations — who may arrive via the tactile display work and are deciding whether to collaborate. The site must not read as a generic template to this audience, but hiring is the job it is optimised for.

Not a target: freelance client acquisition. The site does not need to sell services.

## Product Purpose

A personal portfolio site that gets Paarangat Jain interviewed. It exists to make a short, skeptical skim produce a clear, correct impression: a developer who builds working software across web, mobile, and hardware, with a genuine specialism in accessibility, backed by shipped and linkable artefacts rather than claims.

Success is a hiring decision-maker choosing to make contact — by email or by following a project link and finding substance behind it. Failure is a visitor who cannot tell within a minute what he actually builds, or who cannot distinguish him from any other student portfolio.

## Positioning

Accessibility is not a stated value on this site — it is the substance of the work. The record a neighbouring student portfolio cannot truthfully copy:

- Project coordinator on the Monash Assistive Technology Team, leading development of **affordable tactile displays** for blind and low-vision users, plus the React Native software that drives them — grounded in user interviews and user-centred design.
- Outreach and operations officer for the same team, building partnerships with schools.
- Shipped, linkable products, not coursework: Ressie (local-first LaTeX resume builder), Skilliton (UniHack 2026), a Braille quiz game built with RxJS streams, a Pomodoro timer.
- Paid industry experience in healthcare software (PlasmIT Vector), taking mobile work from requirements through to production delivery.

The combination — hardware-adjacent assistive technology, real production employment, and independently shipped products — is the position. The work spans software and physical hardware, which most portfolios in this category cannot show.

## Operating Context

- Visitors reach the site from LinkedIn, GitHub, or a job application; there is no organic search discovery to design for.
- The dominant visit is short and often mobile. Depth must be available but never a prerequisite for the core impression.
- Recruiters frequently want the résumé as a file. `public/Paarangat-Jain-Resume.pdf` is linked directly from the hero and must stay easy to reach.
- Outbound links to live deployments and GitHub repositories are load-bearing evidence; a broken or dead project link costs more credibility than a missing one.
- The site ships as a static build (Vite) with no backend and no analytics or CMS.

## Capabilities and Constraints

**Current implementation:** a Svelte 5 + Vite single-page site. `src/App.svelte` composes hero, about, selected work, experience log, and contact; `src/data/content.js` is the single source of truth for the `projects` and `experience` arrays; `src/styles.css` holds the full token layer and all styling. Components live in `src/components/` (`SiteHeader`, `SectionHeading`, `ProjectCard`, `ArrowIcon`).

**Content model:** each project carries `title`, `description`, `problem`, `architecture`, `outcome`, `image`, `alt`, `tags`, and optional `github` / `visit` links. The problem/architecture/outcome triad is deliberate depth — future surfaces should use it rather than reduce projects to blurbs. Each experience entry carries `period`, `role`, `organisation`, `location`, and `summary`.

**Planned:** a writing/blog section — posts on accessibility, assistive technology, and engineering. This will introduce real routes to a currently single-page app, so it needs an index, per-post routes, and a content pipeline. **Open decision:** the routing and content approach for this (client-side routing vs. adopting SvelteKit; markdown pipeline vs. otherwise) is not settled and must not be assumed.

**Explicitly not planned:** per-project case-study pages and a revived algorithm-visualiser playground were considered and are not on the roadmap. Do not build toward them.

**Legacy:** the static HTML site (`index.html` at root is now the Vite entry, but `about.html`, `portfolio.html`, `playground.html`, `template.html`, `about.html.bak`, `mobile-menu.js`, `theme-manager.js`, `styles/`, `styles.css`, `.htaccess`) is **not deployed** and is kept as reference for content and markup not yet ported. Do not treat it as design authority; do not delete it without asking.

**Voice and locale:** Australian English (`lang="en-AU"`), British spellings in existing copy ("organisation", "personalised"). First person, plain, understated — the copy claims less than the work supports and should keep doing so.

## Brand Commitments

- Name: Paarangat Jain. Site title: "Paarangat Jain — Developer & accessibility advocate".
- Contact: paarangatj@gmail.com · github.com/pjrus · linkedin.com/in/paarangat-jain-6aa1321ba
- Location: Melbourne, Victoria, Australia.
- No logo, wordmark, or externally imposed brand system exists. The favicon is a generated inline SVG placeholder, not a committed mark.
- No visual identity has been ratified by the user; the current palette, type, and layout are the incumbent implementation, not a binding commitment.

## Evidence on Hand

**Real and usable:**
- Portrait: `public/images/paarangat-jain.webp`
- Project screenshots: `public/images/` — `ressie.png`, `skill-issue.png`, `braille-quiz-app.png`, `tactile-display-project.png`, `pomo-app.jpeg`
- Résumé PDF: `public/Paarangat-Jain-Resume.pdf`
- Live deployments: Ressie (ressie.onrender.com), Skilliton (Firebase-hosted), Braille quiz game (pjrus.github.io)
- Public source on GitHub for Ressie, Skilliton, the Braille quiz game, and the Pomodoro timer
- Verifiable affiliations: PlasmIT Vector, Ocean Connect, Monash Assistive Technology Team; UniHack 2026 participation

**Absent — must never be fabricated:** testimonials, references, quotes from colleagues or supervisors, client logos, press coverage, awards, user counts, download numbers, performance benchmarks, GitHub stars, or any metric of project usage. The tactile display project has no live link and no public repository — it must not be given one.

## Product Principles

1. **Evidence over adjectives.** Every claim on this site should be checkable within one click. Where no evidence exists, say less rather than inflating.
2. **The one-minute skim is the design target.** A hiring visitor must leave with the right impression without scrolling to the end. Depth rewards the interested; it is never the price of the basics.
3. **Accessibility is the proof, not the pitch.** The site is the first artefact of his accessibility work a visitor encounters. If it fails its own standard, the positioning collapses.
4. **Specific beats impressive.** Named projects, real stacks, actual roles and dates. The tactile display work and healthcare employment are the differentiators — surface them, don't bury them in a uniform grid.
5. **Content is data.** `src/data/content.js` stays the single source of truth. New surfaces consume the content model; they do not hard-code copy that belongs in it.

## Accessibility & Inclusion

**WCAG 2.2 AA is a non-negotiable requirement, not an aspiration.** Binding on every surface and every future change:

- Colour contrast meeting AA for text, and for UI components and focus indicators (1.4.11).
- Visible, unobscured focus indication on all interactive elements (2.4.11, 2.4.13); no `outline: none` without an equally clear replacement.
- Full keyboard operability with no traps, and a logical focus order. The existing skip link to `#main-content` must survive.
- Semantic structure: one `h1`, no skipped heading levels, real landmarks, meaningful `alt` on every content image, decorative SVG marked `aria-hidden`.
- `prefers-reduced-motion` honoured by any animation added.
- Target sizes meeting 2.5.8, and no interaction dependent on hover or pointer alone.

Automated checks are the floor, not the bar. When a change is ambiguous, resolve it toward the more accessible option.
