import { base } from '$app/paths';

// Homepage shows only `featured: true` projects. Move the flag to swap one in.
export const projects = [
  {
    id: 'skilliton',
    featured: true,
    title: 'Skilliton',
    kind: 'UniHack 2026 web app',
    description:
      'A peer-to-peer skill exchange built at UniHack 2026, created mainly with Antigravity and hosted via AI Studio. Students sign in with Google, share what they can teach and what they want to learn, and get matched with partners for skill swaps. A Genkit and Gemini assistant suggests personalised matches and chats in real time, running on a Next.js and Firebase stack.',
    image: `${base}/images/skill-issue.png`,
    alt: 'Skilliton peer skill exchange web interface showing skill matching inputs and recommended student profiles',
    tags: ['Antigravity', 'Next.js', 'Firebase', 'TypeScript', 'Genkit', 'Gemini'],
    github: 'https://github.com/pjrus/unihack-2026-final',
    visit: 'https://skilliton.ai.studio',
  },
  {
    id: 'inkboard',
    featured: true,
    title: 'Inkboard',
    kind: 'Local-first canvas app',
    description:
      'A local-first infinite canvas for handwriting, typed notes and PDF annotation. Boards live in IndexedDB on a Yjs CRDT model, so edits merge cleanly and nothing leaves your device. A built-in MCP server lets AI assistants read, preview and export boards, and an opt-in, token-authenticated loopback bridge streams their edits live and reversibly.',
    image: `${base}/images/inkboard.png`,
    alt: 'Inkboard infinite canvas workspace displaying handwritten sketches, typed notes and PDF export controls',
    tags: ['TypeScript', 'Vite', 'IndexedDB', 'CRDT', 'MCP', 'Local-first'],
    github: 'https://github.com/pjrus/inkboard',
    visit: 'https://pjrus.github.io/inkboard/',
  },
  {
    id: 'braille-visualiser',
    featured: true,
    title: 'Braille Keyboard Visualiser',
    kind: '3D assistive hardware tool',
    description:
      'A 3D visualiser for exploring Hable-inspired braille keyboard layouts in the browser. Switch between five layouts, from Triangular to Chameleon, and tune key indent, incline angle and key diameter live. Type with Perkins-style chords on clickable 3D dots, remap shortcuts, and save PNG screenshots from preset camera angles, all rendered in Three.js.',
    image: `${base}/images/visualiser.png`,
    alt: 'Braille Keyboard Visualiser 3D model with six tactile key dots and layout geometry sliders',
    tags: ['Next.js', 'React', 'Three.js', 'TypeScript', 'WebGL'],
    github: 'https://github.com/pjrus/braille-keyboard-visualizer',
    visit: 'https://pjrus.github.io/braille-keyboard-visualizer/',
  },
  {
    id: 'ressie',
    featured: true,
    title: 'Ressie',
    kind: 'Local-first LaTeX tool',
    description:
      'A local-first resume builder that turns simple form fields into polished LaTeX, with no LaTeX knowledge needed. A WebAssembly TeX engine compiles in the browser as you type, giving a live PDF preview across four templates including Jake\'s Resume and Awesome-CV. Reorder sections by drag and drop, tag and duplicate resumes, and export .tex or PDF.',
    image: `${base}/images/ressie.png`,
    alt: 'Ressie split-pane resume editor with structured form inputs beside a live rendered LaTeX document preview',
    tags: ['React', 'Vite', 'JavaScript', 'LaTeX', 'WebAssembly', 'Local-first'],
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
    id: 'pomo-app',
    featured: true,
    device: 'phone',
    title: 'Pomo App',
    kind: 'Expo mobile app',
    description:
      'A cross-platform Pomodoro focus timer built with Expo, React Native and TypeScript for structured study and work sessions. Switch smoothly between focus, short break and long break intervals with clear session tracking, tactile controls and persistent local preferences in an intuitive mobile interface.',
    image: `${base}/images/pomo-app.svg`,
    alt: 'Pomo App mobile Pomodoro timer showing Focus mode active, a 25:00 circular progress ring for Session 1 of 4, current task label, and Start, Reset and Skip controls',
    tags: ['Expo', 'React Native', 'TypeScript', 'Mobile UI', 'Local storage'],
    github: 'https://github.com/pjrus/pomo-app',
  },
  {
    id: 'portfolio',
    featured: true,
    title: 'Portfolio website',
    kind: 'SvelteKit static site',
    description:
      'The site you\'re on: a fully prerendered SvelteKit portfolio, deployed to GitHub Pages through GitHub Actions with no server at runtime. Projects, experience and a Markdown blog compiled with mdsvex share one design system, with light and dark themes and scroll-driven reveals and parallax that all respect reduced-motion settings and keyboard navigation.',
    image: `${base}/images/portfolio.png`,
    alt: 'Paarangat Jain personal portfolio homepage showing projects and engineering experience',
    tags: ['SvelteKit', 'JavaScript', 'CSS', 'mdsvex', 'GitHub Actions', 'Accessibility'],
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
      'Volunteer web developer leading a visual redesign and rebuild of Ocean Connect’s website. Designed and presented multiple layout concepts to stakeholders, iterated on feedback, and remade the frontend design and structure to make community programmes and citizen science initiatives clearer and more accessible.',
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
    { label: 'Work rights', value: 'Australian citizen' },
    { label: 'Now', value: 'Project Coordinator', note: 'Monash Assistive Technology Team' },
    { label: 'Focus', value: 'Meaningful impact', note: 'through work that makes a real difference' },
    { label: 'Based', value: 'Melbourne', note: 'Victoria, Australia' },
  ],
};

/** @type {Array<{ label: string, value: string, note?: string, open?: boolean }>} */
export const heroFacts = [
  ...status.rows.filter(
    (row) => row.label === 'Availability' || row.label === 'Work rights' || row.label === 'Focus'
  ),
  { label: 'Scope', value: 'Web, mobile, AI tools' },
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
