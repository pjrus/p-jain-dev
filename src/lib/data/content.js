import { base } from '$app/paths';

export const projects = [
  {
    title: 'Skilliton',
    description:
      'An AI-assisted peer skill exchange built at UniHack 2026, matching students and helping them organise sessions.',
    problem:
      'Students often have useful skills to share but lack a simple way to find a compatible exchange partner and organise a session.',
    architecture:
      'A Next.js and TypeScript application uses Firebase for authentication and data, with Genkit and Gemini powering personalised matching and conversational recommendations.',
    outcome:
      'Combined skill discovery, AI guidance, real-time chat, Google Meet booking and downloadable calendar events in one workflow.',
    image: `${base}/images/skill-issue.png`,
    alt: 'Skilliton peer skill exchange platform',
    tags: ['Next.js', 'Firebase', 'TypeScript', 'Genkit', 'Gemini'],
    github: 'https://github.com/pjrus/unihack-2026-final',
    visit: 'https://studio--studio-818276670-ce8c7.us-central1.hosted.app',
  },
  {
    title: 'Trackie',
    description:
      'A private, local-first workspace for tracking job applications from first save through to offer.',
    problem:
      'Job searches scatter application details, deadlines and follow-ups across spreadsheets, calendars and browser tabs.',
    architecture:
      'A Next.js and TypeScript application stores data in the browser, with React Hook Form and Zod for validated workflows and dnd-kit powering an accessible Kanban board.',
    outcome:
      'A focused application pipeline with table and board views, import and export tools, and no account, API or database required.',
    image: `${base}/images/trackie.png`,
    alt: 'Trackie job application Kanban board',
    tags: ['Next.js', 'React', 'TypeScript', 'Local-first', 'dnd-kit'],
    github: 'https://github.com/pjrus/trackie',
    visit: 'https://pjrus.github.io/trackie/kanban/',
  },
  {
    title: 'Ressie',
    description:
      'A local-first resume builder that turns structured form data into polished LaTeX, with live PDF preview and multiple templates.',
    problem:
      'LaTeX produces excellent resumes, but its syntax and compilation workflow make it difficult for many people to use confidently.',
    architecture:
      'A React and Vite interface stores structured resume data locally, while a Node.js and Express service uses Tectonic to compile selected LaTeX templates into a live PDF preview.',
    outcome:
      'Private, local-first editing with automatic PDF previews, reusable templates and a dashboard for organising multiple resumes.',
    image: `${base}/images/ressie.png`,
    alt: 'Ressie resume builder dashboard',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Tectonic'],
    github: 'https://github.com/pjrus/ressie',
    visit: 'https://ressie.onrender.com/',
  },
  {
    title: 'Portfolio website',
    description:
      'A responsive personal portfolio showcasing shipped software, accessibility work and experience across web, mobile and hardware.',
    problem:
      'A portfolio needs to make real projects, technical range and accessibility experience easy to assess at a glance.',
    architecture:
      'A prerendered SvelteKit site uses JavaScript, modern CSS and mdsvex for structured project, experience and blog content.',
    outcome:
      'A fast, accessible home for project evidence, technical skills, experience, writing and contact details.',
    image: `${base}/images/portfolio.png`,
    alt: 'Personal portfolio website homepage',
    tags: ['SvelteKit', 'JavaScript', 'CSS', 'Accessibility'],
    github: 'https://github.com/pjrus/p-jain-dev',
  },
  {
    title: 'Pomodoro timer',
    description:
      'A focused iOS timer that keeps the essential work-and-rest rhythm simple and pleasant to use.',
    problem:
      'Many focus timers are either visually distracting or too rigid to support different work routines and sensory preferences.',
    architecture:
      'A modular React Native application uses Expo Router for file-based navigation, persistent local storage for preferences, and native audio and haptic feedback.',
    outcome:
      'A customisable focus routine with ambient sound, haptic cues, persistent settings and a clear mobile-first timer.',
    image: `${base}/images/pomo-app.jpeg`,
    imagePosition: 'center 20%',
    alt: 'Pomodoro timer mobile app',
    tags: ['React Native', 'Expo', 'TypeScript', 'Local storage'],
    github: 'https://github.com/pjrus/pomo-app',
  },
  {
    title: 'Puzzie',
    description:
      'A local-first puzzle platform with daily challenges across word, number, logic and grid-based formats.',
    problem:
      'Quick puzzle experiences are often split across separate apps, making it difficult to explore different formats while keeping a single sense of progress.',
    architecture:
      'A Next.js and TypeScript application uses a strongly typed puzzle catalogue, reusable generators and renderers, with browser storage preserving scores, streaks and completed challenges.',
    outcome:
      'Brought 14 puzzle formats into one responsive experience with daily challenges, difficulty-aware scoring, hints and locally stored statistics.',
    image: `${base}/images/puzzie.png`,
    alt: 'Puzzie puzzle platform homepage with a featured daily challenge',
    tags: ['Next.js', 'React', 'TypeScript', 'Local-first', 'Tailwind CSS'],
    github: 'https://github.com/pjrus/puzzie',
    visit: 'https://pjrus.github.io/puzzie/',
  },
  {
    title: 'Mazzie',
    description:
      'A daily equation puzzle where every guess must be mathematically valid and balance correctly.',
    problem:
      'Most Wordle-style puzzle games validate letter patterns, but do not need to enforce that each player attempt is logically or mathematically sound.',
    architecture:
      'A SvelteKit and TypeScript application uses a seeded equation generator, parser and validator to create consistent daily challenges, with local storage for progress, streaks and settings.',
    outcome:
      'A responsive puzzle experience with daily and practice modes, difficulty variants, shareable results and reliable equation validation.',
    image: `${base}/images/mazzie.png`,
    alt: 'Mazzie daily equation puzzle interface',
    tags: ['SvelteKit', 'Svelte 5', 'TypeScript', 'Vitest', 'Local-first'],
    github: 'https://github.com/pjrus/mazzie',
    visit: 'https://pjrus.github.io/mazzie/',
  },
  {
    title: 'Braille Character Quiz Game',
    description:
      'An interactive learning game for practising Braille letters, numbers and symbols through timed challenges.',
    problem:
      'Braille learning tools need to make repeated practice approachable while supporting different experience levels and accessible ways of interacting.',
    architecture:
      'A statically exported Next.js and TypeScript application uses React state and typed local-storage helpers to manage questions, game sessions, preferences and persistent statistics.',
    outcome:
      'A responsive, keyboard-accessible quiz with configurable sessions, instant feedback, streak tracking, reference material and deployable static hosting.',
    image: `${base}/images/braille-quiz-app.png`,
    alt: 'Braille Character Quiz Game interface',
    tags: ['Next.js', 'React', 'TypeScript', 'Accessibility', 'Local-first'],
    github: 'https://github.com/pjrus/braille-quiz-game',
    visit: 'https://pjrus.github.io/braille-quiz-game/',
  },
  {
    title: 'Inkboard',
    description:
      'A local-first infinite canvas for handwriting, typed notes and PDF annotation.',
    problem:
      'Digital note-taking tools often require an account or server round-trip, and rarely combine freehand drawing, typed text and PDF annotation in one offline-first canvas.',
    architecture:
      'A TypeScript and Vite application stores boards in IndexedDB behind a CRDT, with focal-point zoom, pressure-aware drawing and offline font and PDF export.',
    outcome:
      'An infinite, multi-board canvas with pen and text tools, object eraser, CRDT-aware undo/redo and autosave, requiring no account or server.',
    image: `${base}/images/inkboard.png`,
    alt: 'Inkboard infinite canvas application',
    tags: ['TypeScript', 'Vite', 'IndexedDB', 'CRDT', 'Local-first'],
    github: 'https://github.com/pjrus/inkboard',
  },
];

export const stack = [
  {
    label: 'Languages & frameworks',
    items: ['TypeScript', 'JavaScript', 'Python', 'Haskell', 'PHP', 'R', 'HTML/CSS', 'React', 'React Native', 'Next.js', 'Expo'],
  },
  {
    label: 'Tools & platforms',
    items: ['Docker', 'Git', 'MongoDB', 'MySQL', 'Arduino', 'Figma', 'VPS deployment', 'Linux (Manjaro)', 'macOS', 'Windows'],
  },
];

export const experience = [
  {
    period: 'Jun 2026 — present',
    role: 'Full-stack engineering intern',
    organisation: 'PlasmIT Vector',
    location: 'Docklands, Victoria, Australia · Remote',
    summary:
      'Assisting with the design and development of full-stack applications across frontend, backend and database components. I collaborate on implementation, testing and documentation while gaining hands-on experience across the software development lifecycle.',
  },
  {
    period: 'Mar 2026 — present',
    role: 'Web developer',
    organisation: 'Ocean Connect',
    location: 'Remote',
    summary:
      'Maintaining the Ocean Connect website so program, event and initiative information stays accurate and reachable. I reorganise content for clearer navigation and usability for volunteers and community members, and help strengthen how the organisation communicates its marine conservation work.',
  },
  {
    period: 'Mar 2026 — present',
    role: 'Outreach officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Engaging with schools that support students with disabilities to build partnerships for technology-driven empowerment. I communicate the team’s mission to stakeholders, coordinate collaborative workshops and programs, and maintain those relationships between initiatives.',
  },
  {
    period: 'Feb 2026 — present',
    role: 'Operations officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Supporting the technical operations behind the team’s accessibility-focused projects. I work with fellow officers to keep technical initiatives running smoothly and contribute to the coordination, communication and internal workflows the organisation depends on.',
  },
  {
    period: 'Aug 2025 — present',
    role: 'Project coordinator',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Working with our academic supervisor to define the goals and strategy for developing low-cost tactile and refreshable Braille displays, and coordinating the project officers building them. I run user interviews and design surveys to keep the work user-centred, and lead development of the React Native application that supports the display.',
  },
  {
    period: 'Mar 2025 — Aug 2025',
    role: 'Projects officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Collaborated with our academic supervisor and fellow officers to brainstorm accessibility solutions, and assisted in the design, development and testing of tactile display components for blind and low-vision users.',
  },
];
