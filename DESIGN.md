---
name: Paarangat Jain — Portfolio
description: A technical dossier for a developer and accessibility advocate — evidence-first, sharp-edged, and quietly confident.
colors:
  background: "#fafbfe"
  surface: "#ffffff"
  ink: "#182238"
  muted: "#182238"
  signal-blue: "#315ed6"
  signal-blue-strong: "#315ed6"
  primary-ink: "#ffffff"
  flare-coral: "#ed6a4b"
  flare-coral-strong: "#d13813"
  tint: "#e5edfb"
  line: "#d9e0ea"
  frame: "#182238"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "clamp(2.6rem, 4.3vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  title:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "clamp(1.3rem, 1.8vw, 1.65rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  entry-title:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "0.01em"
  body:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  body-lg:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "clamp(1.02rem, 1.3vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.6
  brand:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "1.8rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.05em"
  label-xs:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  label-sm:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  label-md:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  nav:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: "0.85rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  cta:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: "0.92rem"
    fontWeight: 600
rounded:
  base: "0px"
spacing:
  gutter: "1.5rem"
  control-pad-x: "1.25rem"
  control-h: "3.25rem"
  card-pad: "clamp(1.4rem, 2.5vw, 1.85rem)"
  card-gap: "clamp(1.25rem, 2.5vw, 1.75rem)"
  lede-gap: "1.1rem"
  summary-gap: "0.85rem"
  item-space: "clamp(2rem, 3.5vw, 3.25rem)"
  column-gap-lg: "clamp(2rem, 5vw, 4.5rem)"
  section-space: "clamp(3.5rem, 5.5vw, 5.5rem)"
  section-space-compact: "clamp(3rem, 4vw, 4rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.base}"
    padding: "0.8rem 1.25rem"
  button-light:
    backgroundColor: "{colors.primary-ink}"
    textColor: "{colors.signal-blue}"
    rounded: "{rounded.base}"
    padding: "0.8rem 1.25rem"
  project-link-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.base}"
    typography: "{typography.cta}"
    padding: "0 1rem"
    height: "3.25rem"
  project-link-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.background}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.base}"
    padding: "0.35rem 0.6rem"
---

# Design System: Paarangat Jain — Portfolio

## Overview

**Creative North Star: "The Field Report"**

The site reads as a technical dossier rather than a marketing page: numbered capability lists, monospace status labels in caps, terminal-style section markers (`>`, `□`, `◇`), and a rail of evidence — problem, architecture, outcome — behind every project. Nothing here is decorative for its own sake; every mark either orients the reader (an eyebrow, a kicker, a timestamp) or points at proof (a source link, a live link, a résumé).

The aesthetic is technical and restrained: precise, evidence-led, quietly confident. It is deliberately not a soft rounded-corner SaaS template, not a glossy gradient landing page, and not an illustration-heavy personal-brand site. Corners never soften, shadows never stack into decorative depth, and colour is spent sparingly — signal blue carries interaction, coral carries alert-grade emphasis, and everything else stays ink-on-paper.

The system is built once in light and dark, sharing every structural token (spacing, type scale, radius, layout) and diverging only in the colour role assignments needed to keep contrast and hierarchy intact on each canvas. Dark-mode primary text is pure white (`#ffffff`); secondary text remains muted so the hierarchy stays legible without dulling headings or body copy.

**Key Characteristics:**
- Zero border-radius anywhere in the system — every corner is square, without exception.
- Monospace (IBM Plex Mono) reserved for metadata: eyebrows, kickers, tags, timestamps, periods — always uppercase, always tracked wide.
- One ambient shadow token does all elevation work; there is no multi-level shadow scale.
- Two accent colours with distinct jobs: signal blue for interaction and structure, flare coral for alert-grade emphasis and status.
- A visible accent rail (2px border) marks "this is evidence" — hero facts, project detail blocks, alternating project cards. Its colour is `--accent-bar-color`: coral in light mode, signal blue in dark mode, where lifted coral turns salmon beside the cobalt button and portrait ring.

## Colors

A near-monochrome ink-on-paper base with two working accents, each colour assigned a specific job rather than a generic brand role.

### Primary
- **Signal Blue** (`#315ed6`): the system's one interactive colour — primary buttons, links, the contact panel, the experience-timeline rail and marker, emphasised words inside headings (`em`). If it's clickable or marks "you are here," it's this blue.

**The Two-Blue Rule.** Signal blue has two roles: `--primary` for fills and graphics (button backgrounds, markers, rails, the portrait ring, selection) and `--primary-strong` for blue text (links, hover labels, stack titles, organisations, code keywords). In light mode both are `#315ed6`. In dark mode they split, because lightening the cobalt enough to read as text on black drains it into periwinkle: the fill keeps the light-mode cobalt `#315ed6` unchanged (white labels 5.7:1, thin rails and markers above 3:1 against the canvas) while thin rails and markers keep 3:1 against the canvas, and the text blue is `#5397fc`, lifted only as far as AA needs and turned slightly toward azure to keep its chroma (6.1:1 on cards). Never set blue text with `--primary`.

### Secondary
- **Flare Coral** (`#ed6a4b`) and its text-safe deepening **Flare Coral Strong** (`#d13813`): an alert/status accent, never used for primary actions. Plain coral appears only in graphics-scale contexts (the hero status dot) where its lighter, warmer value doesn't carry a text-contrast obligation; Flare Coral Strong is the version used for small text and focus rings, because it clears 4.5:1 on both the canvas and white surfaces. **The Two-Coral Rule.** Never use plain `--accent` for text or a focus ring — use `--accent-strong` there; plain `--accent` is reserved for shapes large enough to not need the extra contrast margin.

### Neutral
- **Ink** (`#182238`): primary text and the portrait plinth (`--frame`).
- **Muted** (`#182238` in light mode): secondary text uses the same ink colour as primary copy, with hierarchy carried by size, weight and spacing rather than grey. Dark mode retains a softer secondary value for legibility against the near-black canvas.
- **Background** (`#fafbfe`): the page canvas, a soft near-white rather than pure white.
- **Surface** (`#ffffff`): cards and raised panels, distinguished from the canvas by being genuinely whiter.
- **Tint** (`#e5edfb`; dark `#232b3a`): a pale blue wash for small filled chips (capability numbers' backdrop is not this, but the experience-icon plate and nav-hover state are).
- **Line** (`#d9e0ea`): hairline dividers and card borders — the resting border colour everywhere except the header cluster, whose boxes sit at full `--ink`.

### Named Rules
**The One-Shadow Rule.** There is exactly one shadow token (`--shadow`), reused verbatim on the header, cards, buttons, the portrait frame and the contact panel. It is never varied in blur or spread to imply multiple elevation levels — depth is binary (flat vs. this one lift), not graduated.

## Typography

**Display Font:** Bricolage Grotesque (with sans-serif fallback)
**Body Font:** DM Sans (with sans-serif fallback)
**Label/Mono Font:** IBM Plex Mono (with monospace fallback)

**Character:** A confident, slightly condensed grotesque for anything that needs to announce itself (headings), paired with a plain, highly legible humanist sans for reading (body copy), and a monospace held in reserve exclusively for metadata — the pairing reads as "headline / prose / data" rather than a two-font system.

### Hierarchy
Every size below is a custom property in `src/styles/tokens.css`; components reference the token, never the literal.

- **Display** (700, `--h1-size`, line-height 1.06): the `h1` only — one per page, capped at a 14-character measure so it wraps deliberately rather than by accident. Under 700px the token steps down to its own mobile clamp (`clamp(2.4rem, 11vw, 3.2rem)`) rather than continuing the desktop curve.
- **Headline** (600, `--h2-size`, line-height 1.06): section titles (`h2`).
- **Title** (600, `--h3-size`, line-height 1.06): card titles (`h3`) — project names.
- **Entry title** (mono 700, `--text-entry-title`, uppercase): blog post titles on the index and the empty-state stand-in that mirrors them.
- **Brand** (700, 1.8rem, letter-spacing -0.05em): the header wordmark only ("PJ.") — its own fixed size, never reused elsewhere.
- **Body** (400, 1rem, line-height 1.65): running copy, capped at a 38rem (`--measure`) or 62rem (`--measure-lg`) measure depending on context.
- **Description** (400, `--text-desc`, line-height `--leading-desc` 1.6): hero intro, section summaries, project and experience summaries, the contact intro, post ledes. Long-form article bodies use the same size at `--leading-prose` (1.7). Project card descriptions step down to `--text-desc-sm` to suit the narrower card column.
- **Label scale** (mono 600, uppercase, `--tracking-label` 0.08em, `--leading-label` 1.4): **XS** `--text-label` 0.7rem (hero facts, captions, post meta, form labels), **SM** `--text-label-sm` 0.75rem (experience periods, contact links), **MD** `--text-label-md` 0.8rem (stack card titles, back links). The experience organisation and location lines scale with `--text-desc` so they stay in proportion to the role summary. Project cards keep their own tuned sizes: tech-stack heading 0.78rem, tag chips 0.74rem.
- **Nav / CTA** (mono 600): header nav boxes at 0.85rem and project-link CTAs at 0.92rem — control text rather than metadata, so they sit just above the label scale.

Display headings share `--tracking-display` (-0.04em).

### Named Rules
**The Mono-Is-Metadata Rule.** IBM Plex Mono never appears in a sentence a visitor reads start to finish. It marks status, category, or position — eyebrows, kickers, periods, tags — and nowhere else.
**The Snap-To-Step Rule.** Metadata and description sizes snap to their token; a new in-between size needs a reason strong enough to become a token of its own. One-off literals are reserved for geometry (icons, hairlines, optical nudges) and single-use display pieces like the brand.

## Layout

A single centred shell (`--shell-max` 69rem, 1.5rem gutter) holds every section; two-column splits (hero, about, contact) use a shared `minmax(0, 1.1fr) minmax(20rem, 0.8fr)` ratio so the wider content column and the narrower visual/action column repeat as one grammar rather than three different layouts. All two-column splits collapse to a single column together at 900px, and the header drops from floating-pill to a static, full-width bar with the nav wrapping to a second row at 700px.

Vertical rhythm runs on one clamp-based interval (`--section-space`, 3.5–5.5rem) applied as symmetric `padding-block`, so the visible gap between two sections is always double that value. The card-grid home sections (projects, stack) use the tighter `--section-space-compact`; the hero keeps its own top padding but ends on `--section-space`. Non-home pages start `--page-top-space` below the fixed header. Inside sections, a small set of semantic gaps carries the recurring relationships: `--page-heading-gap` (title to content), `--lede-gap` (heading to its lede), `--summary-gap` (item title to summary), `--item-space` (between list entries), `--column-gap-lg` (meta column to content), plus `--card-pad` and `--card-gap` for surfaces.

Project cards use their own internal two-part grid: a summary row (fixed-width media + flexible body) over a details row (two-column problem/architecture vs. outcome/stack), both sharing the same horizontal card padding so the card reads as one consistent frame rather than stacked panels.

## Elevation & Depth

Flat by default, with a single ambient lift used consistently rather than a graduated shadow scale. `--shadow` (light: `0 14px 30px rgba(24, 34, 56, 0.09)`; dark: `0 20px 45px rgba(0, 0, 0, 0.65)`) is the only shadow value in the system, applied identically to the header, project cards, the portrait frame, buttons, the capabilities panel, and the contact panel. Nothing gets a bigger or smaller shadow to signal more or less importance — elevation is binary, not a ladder.

Alternating project cards additionally carry an inset accent border (`inset 0.35rem 0 0 var(--primary)`) stacked with the ambient shadow — a rail, not a second elevation level — so every other card in the list reads as flagged without introducing a new depth cue.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The one shadow token marks "this is a raised object" — a card, a button, a panel — and never varies to suggest degrees of raised-ness.

## Shapes

Every corner in the system is square — there is no `border-radius` anywhere in the stylesheet, on buttons, cards, chips, inputs, the portrait frame, or the header pill. Borders are 1px hairlines in `--line` for dividers and `--line-strong` for interactive-control boundaries (the two share a value in light mode and diverge in dark mode, where controls need a stronger edge against the near-black canvas). The recurring accent-bar motif (`--accent-bar`, 2px) is the system's one non-rectangular flourish: a left border used to mark "supporting evidence" text next to hero facts and project detail blocks.

### Named Rules
**The No-Radius Rule.** Nothing in this system gets a rounded corner, ever — not a button, not a chip, not an image frame. Squareness is load-bearing for the "field report / dossier" read; a single rounded element would break the world.

## Components

Every control is a precise, static object: sharp corners, a defined edge, and state changes that are strictly colour/border, never scale or shadow-lift. Nothing bounces, grows, or floats on hover.

### Buttons
- **Shape:** square corners (`0px`), 1px border (transparent at rest for filled variants).
- **Primary:** `--primary` background, `--primary-ink` text, `--shadow`, min-height `--control-h` (3.25rem), padding `0.8rem 1.25rem`. Used for the single most important action per context (hero "See my work," contact "Send me an email" uses the inverted `button-light` variant instead since it sits on the blue contact panel).
- **Light (on-panel):** inverts to `--panel-ink` background / `--panel` text — used only inside the blue contact panel, where a blue-on-blue primary button would disappear.
- **Text link:** no fill or border; an underline rendered as a `currentColor` rule sitting under the label (not flush to the baseline), colour shifts to `--primary` on hover. Height-matched to `.button` so the two sit level in a row.

### Chips
- **Tag list** (tech-stack tags): transparent background, 1px `--line` border, `--muted` text, monospace, uppercase-free but tracked. No selected/unselected state — purely informational.
- **Experience period:** filled `--tint` background, `--ink` text, no border — a soft badge rather than an outlined chip, distinguishing "when" metadata from "what" tags.

### Cards / Containers
- **Corner style:** square, always.
- **Background:** `--surface` (white / near-black), distinct from the `--background` canvas behind it.
- **Shadow strategy:** the one ambient `--shadow` token (see Elevation & Depth); alternating project cards add the inset accent rail.
- **Border:** none at rest on project/capability cards; a top hairline (`--line`) separates the summary and details halves of a project card.
- **Internal padding:** `--card-pad` (clamp 1.5–2.25rem), or `--card-pad-lg` (clamp 2.5–5rem) for the contact panel specifically.

### Navigation
- **Style:** a floating pill header (border + blurred `--header-surface` background at 85% opacity, `backdrop-filter: blur(14px)`) fixed to the viewport top.
- **Layout:** a three-column grid — brand hard left, nav boxes centred in the header regardless of how wide the shell gets, icon squares hard right. The desktop header carries no contact CTA of its own — that emphasis lives in the contact panel at the foot of the page and in the mobile overlay's footer.
- **Link boxes:** every nav item is an outlined box at `--control-h-sm` (2.95rem) carrying a leading 17px lucide icon and a mono uppercase label (0.85rem, `0.08em` tracking — sized up from the base Label step to fill the nav box's larger footprint). Borders sit at full `--ink` strength at rest — the header is the one place the system uses a hard edge rather than `--line-strong`, so the cluster reads as a row of equal, deliberate objects.
- **Link states:** because the edge is already at full strength, hover fills with `--tint` instead of darkening the border. The current page inverts (`--ink` fill, `--background` text) rather than shifting colour, so "you are here" survives at a glance.
- **Icon controls** (GitHub, LinkedIn, theme toggle): identical square footprint (`--control-h-sm`) and the same `--ink` border, so icon-only and labelled boxes sit in one unbroken row; hover fills with `--tint` to match the nav boxes.
- **Mobile (≤900px):** the whole cluster collapses to a single hamburger square; nav moves into a dismissible overlay panel (scrim + focus trap + Escape) whose links keep the same icons at 18px, set in the display face at 1.35rem.

### Experience Timeline (signature component)
A vertical rail (`border-left`) running from a heading icon down through each entry, with a small filled square marker (`--exp-marker`, not a circle — consistent with the no-radius rule) positioned on the rail at each item's title baseline. Role titles are set in monospace/uppercase rather than the display font, which is the one place the system deliberately breaks its own "mono is metadata only" rule — the intent is for the timeline to read like a log rather than a résumé list.

## Do's and Don'ts

### Do:
- **Do** keep every corner square (`border-radius: 0`) on any new component — this is the system's most load-bearing rule.
- **Do** reuse the single `--shadow` token verbatim rather than authoring a new blur/spread value for a "more important" surface.
- **Do** reserve `--font-mono` for metadata (labels, timestamps, tags, kickers) and keep it uppercase and letter-spaced when it is.
- **Do** use `--accent-strong` rather than `--accent` for any text or focus-ring use of coral; reserve plain `--accent` for graphics-scale marks like the status dot.
- **Do** keep hover/focus states to colour and border changes only — no scale, translate, or added shadow on interactive elements (the theme-toggle icon's rotate/scale transition is the one deliberate exception, reserved for that single control).

### Don't:
- **Don't** introduce a second shadow value or a multi-level elevation scale — depth in this system is binary, not graduated.
- **Don't** round any corner, on any component, for any reason — a single rounded element breaks the dossier/field-report read that the rest of the system is built on.
- **Don't** set body copy or multi-sentence content in the monospace font — it is reserved for short, tracked, uppercase metadata only.
- **Don't** add decorative motion (bounce, float, parallax, gradient shimmer) — the system's only motion budget is functional: colour/border transitions on hover, and the theme-toggle's icon swap.
