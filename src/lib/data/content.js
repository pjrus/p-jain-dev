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
      'A local-first infinite canvas for handwriting, typed notes and PDF annotation.',
    image: `${base}/images/inkboard.png`,
    alt: 'Inkboard infinite canvas workspace displaying handwritten sketches, typed notes and PDF export controls',
    tags: ['TypeScript', 'Vite', 'IndexedDB', 'CRDT', 'Local-first'],
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
      'Assisted with the design and development of full-stack applications across frontend, backend and database components. Collaborated on implementation, testing and documentation while gaining hands-on experience across the software development lifecycle.',
  },
  {
    period: 'Mar 2026 – present',
    role: 'Web Developer',
    organisation: 'Ocean Connect',
    location: 'Remote',
    summary:
      'Maintaining the Ocean Connect website so program, event and initiative information stays accurate and reachable. I reorganise content for clearer navigation and usability for volunteers and community members, and help strengthen how the organisation communicates its marine conservation work.',
  },
  {
    period: 'Feb 2026 – present',
    role: 'Operations Officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Supporting the technical operations behind the team’s accessibility-focused projects. I work with fellow officers to keep technical initiatives running smoothly and contribute to the coordination, communication and internal workflows the organisation depends on.',
  },
  {
    period: 'Aug 2025 – present',
    role: 'Project Coordinator',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Working with our academic supervisor to define the goals and strategy for developing low-cost tactile and refreshable Braille displays, and coordinating the project officers building them. I run user interviews and design surveys to keep the work user-centred, and lead development of the React Native application that supports the display.',
  },
  {
    period: 'Mar 2026 – Jul 2026',
    role: 'Outreach Officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Engaged with schools that support students with disabilities to build partnerships for technology-driven empowerment. Communicated the team’s mission to stakeholders, coordinated collaborative workshops and programs, and maintained those relationships between initiatives.',
  },
  {
    period: 'Mar 2025 – Aug 2025',
    role: 'Projects Officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Collaborated with our academic supervisor and fellow officers to brainstorm accessibility solutions, and assisted in the design, development and testing of tactile display components for blind and low-vision users.',
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
