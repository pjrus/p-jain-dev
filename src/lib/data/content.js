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
    title: 'Tactile display',
    description:
      'A low-cost assistive technology project bridging mobile software and hardware for blind and low-vision users.',
    problem:
      'Refreshable Braille hardware remains expensive, limiting access to tactile digital content for blind and low-vision users.',
    architecture:
      'The project combines low-cost MagnePins tactile hardware with a React Native companion application, supported by Figma prototypes and an accessible project website.',
    outcome:
      'An open, lower-cost path for controlling tactile display hardware from a familiar mobile interface.',
    image: `${base}/images/tactile-display-project.png`,
    alt: 'Prototype tactile display project',
    tags: ['React Native', 'Hardware', 'Figma', 'Assistive tech'],
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

export const highlights = stack.flatMap((group) => group.items);

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
