import { base } from '$app/paths';

export const projects = [
  {
    id: 'skilliton',
    title: 'Skilliton',
    kind: 'UniHack 2026 web app',
    description:
      'An AI-assisted peer skill exchange built at UniHack 2026 — created primarily utilising Antigravity to match students and help them organise sessions.',
    image: `${base}/images/skill-issue.png`,
    alt: 'Skilliton peer skill exchange web interface showing skill matching inputs and recommended student profiles',
    tags: ['Antigravity', 'Next.js', 'Firebase', 'TypeScript', 'Genkit', 'Gemini'],
    github: 'https://github.com/pjrus/unihack-2026-final',
    visit: 'https://studio--studio-818276670-ce8c7.us-central1.hosted.app',
  },
  {
    id: 'braille-visualiser',
    title: 'Braille Keyboard Visualiser',
    kind: '3D assistive hardware tool',
    description:
      'A 3D interactive visualiser for exploring Hable-inspired braille keyboard layouts, Perkins-style chord typing and custom key mappings.',
    image: `${base}/images/visualiser.png`,
    alt: 'Braille Keyboard Visualiser 3D model with six tactile key dots and layout geometry sliders',
    tags: ['Next.js', 'React', 'Three.js', 'TypeScript', 'WebGL'],
    github: 'https://github.com/pjrus/braille-keyboard-visualizer',
    visit: 'https://pjrus.github.io/braille-keyboard-visualizer/',
  },
  {
    id: 'inkboard',
    title: 'Inkboard',
    kind: 'Local-first canvas app',
    description:
      'A local-first infinite canvas for handwriting, typed notes and PDF annotation, with an MCP server over a token-authenticated loopback WebSocket bridge and offline archive backend for undoable CRDT edits.',
    image: `${base}/images/inkboard.png`,
    alt: 'Inkboard infinite canvas workspace displaying handwritten sketches, typed notes and PDF export controls',
    tags: ['TypeScript', 'Vite', 'IndexedDB', 'CRDT', 'MCP', 'Local-first'],
    github: 'https://github.com/pjrus/inkboard',
    visit: 'https://pjrus.github.io/inkboard/',
  },
  {
    id: 'ressie',
    title: 'Ressie',
    kind: 'Local-first LaTeX tool',
    description:
      'A local-first resume builder that turns structured form data into polished LaTeX, rendered statically in JavaScript with live preview and multiple templates.',
    image: `${base}/images/ressie.png`,
    alt: 'Ressie split-pane resume editor with structured form inputs beside a live rendered LaTeX document preview',
    tags: ['React', 'Vite', 'JavaScript', 'LaTeX', 'Local-first'],
    github: 'https://github.com/pjrus/ressie',
    visit: 'https://pjrus.github.io/ressie/',
  },
  {
    id: 'trackie',
    title: 'Trackie',
    kind: 'Local-first workspace',
    description:
      'A private, local-first workspace for tracking job applications from first save through to offer.',
    image: `${base}/images/trackie.png`,
    alt: 'Trackie local-first job application Kanban board with search, filter and pipeline tracking views',
    tags: ['Next.js', 'React', 'TypeScript', 'Local-first', 'dnd-kit'],
    github: 'https://github.com/pjrus/trackie',
    visit: 'https://pjrus.github.io/trackie/kanban/',
  },
  {
    id: 'portfolio',
    title: 'Portfolio website',
    kind: 'SvelteKit static site',
    description:
      'A responsive personal portfolio showcasing shipped software, accessibility work and experience across web, mobile and hardware.',
    image: `${base}/images/portfolio.png`,
    alt: 'Paarangat Jain personal portfolio homepage showing projects and engineering experience',
    tags: ['SvelteKit', 'JavaScript', 'CSS', 'Accessibility'],
    github: 'https://github.com/pjrus/p-jain-dev',
  },
];

export const education = [
  {
    period: 'Jan 2024 – Jun 2027',
    institution: 'Monash University',
    location: 'Clayton, Victoria',
    award: 'Bachelor of Computer Science',
    detail: 'Mathematics minor · WAM 73.8 · GPA 3.000',
  },
  {
    period: 'Jan 2019 – Dec 2023',
    institution: 'Viewbank College',
    location: 'Rosanna, Victoria',
    award: 'Victorian Certificate of Education (VCE)',
    detail: 'ATAR 90.15',
  },
];

export const experience = [
  {
    period: 'Jun 2026 – Sep 2026',
    role: 'Full-Stack Engineering Intern',
    organisation: 'PlasmIT Vector',
    location: 'Docklands, Victoria, Australia · Remote',
    summary:
      'Built both mobile and Next.js full-stack applications across frontend, backend and database components. Collaborated with the team on implementation, testing, documentation and cross-stack issue resolution following agreed development practices.',
  },
  {
    period: 'Aug 2025 – present',
    role: 'Project Coordinator',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Lead collaboration with the academic supervisor to define goals and strategy for low-cost tactile and refreshable Braille displays, guiding project officers in developing accessibility technology. Design surveys for user-centred development, lead the supporting React Native mobile app, and received over 90% positive team feedback for leadership and communication.',
  },
  {
    period: 'Mar 2026 – present',
    role: 'Web Developer',
    organisation: 'Ocean Connect',
    location: 'Remote',
    summary:
      'Support the development, management and maintenance of Ocean Connect’s website so programme, event and community initiative details stay clear, accessible and up to date. Improve site structure and content for volunteers engaging with environmental education and citizen science initiatives around marine biodiversity and coastal conservation.',
  },
  {
    period: 'Feb 2026 – present',
    role: 'Operations Officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Assist with MATT’s technical operations to support delivery of accessibility-focused projects. Collaborate with peers on technical initiatives and internal processes while contributing to team coordination, communication and operational workflows.',
  },
  {
    period: 'Mar 2026 – Jul 2026',
    role: 'Outreach Officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Aided in building partnerships with schools supporting students with disabilities to promote technology-driven empowerment. Helped communicate MATT’s mission to stakeholders, coordinate collaborative workshops and programs, and maintain ongoing relationships with school contacts between initiatives.',
  },
  {
    period: 'Mar 2025 – Aug 2025',
    role: 'Projects Officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Collaborated with the academic supervisor and fellow officers to brainstorm accessibility solutions, and assisted in the design, development and testing of tactile display components for blind and low-vision users.',
  },
];

// Hero status plate (desktop) and extra hero facts (phones). Bump `updated` when editing.
export const status = {
  updated: 'Nov 2026',
  rows: [
    { label: 'Availability', value: 'Open to graduate roles', note: 'from July 2027', open: true },
    { label: 'Now', value: 'Project Coordinator', note: 'Monash Assistive Technology Team' },
    { label: 'Focus', value: 'Rebuilding my portfolio', note: 'and gaining experience through certifications' },
    { label: 'Based', value: 'Melbourne', note: 'Victoria, Australia' },
  ],
};

/** @type {Array<{ label: string, value: string, note?: string, open?: boolean }>} */
export const heroFacts = [
  ...status.rows.filter((row) => row.label === 'Availability' || row.label === 'Focus'),
  { label: 'Scope', value: 'Web, mobile, hardware' },
];

export const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'SvelteKit',
  'React Native',
  'Expo',
  'IndexedDB & CRDTs',
  'SQL & MongoDB',
  'Three.js',
  'Arduino',
  'Python',
  'Haskell',
  'Gemini & Genkit',
  'Docker & Linux VPS',
  'WCAG & Accessibility',
  'User Research',
];
