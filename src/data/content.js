export const projects = [
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
    image: '/images/ressie.png',
    alt: 'Ressie resume builder dashboard',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Tectonic'],
    github: 'https://github.com/pjrus/ressie',
    visit: 'https://ressie.onrender.com/',
  },
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
    image: '/images/skill-issue.png',
    alt: 'Skilliton peer skill exchange platform',
    tags: ['Next.js', 'Firebase', 'TypeScript', 'Genkit', 'Gemini'],
    github: 'https://github.com/pjrus/unihack-2026-final',
    visit: 'https://studio--studio-818276670-ce8c7.us-central1.hosted.app',
  },
  {
    title: 'Braille quiz game',
    description:
      'A reactive learning experience for practising Braille characters, designed with accessible interaction at its core.',
    problem:
      'Learning Braille requires frequent practice and immediate feedback, but many digital exercises provide little sense of progress.',
    architecture:
      'A React and TypeScript client models quiz state as RxJS streams, keeping the timer, score, streak and answer feedback synchronised throughout each session.',
    outcome:
      'Responsive, zero-install practice with timed challenges, live scoring, streak tracking and immediate answer feedback.',
    image: '/images/braille-quiz-app.png',
    alt: 'Braille character quiz game interface',
    tags: ['React', 'TypeScript', 'RxJS', 'Accessibility'],
    github: 'https://github.com/pjrus/braille-quiz-game',
    visit: 'https://pjrus.github.io/braille-quiz-game',
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
    image: '/images/tactile-display-project.png',
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
    image: '/images/pomo-app.jpeg',
    alt: 'Pomodoro timer mobile app',
    tags: ['React Native', 'Expo', 'TypeScript', 'Local storage'],
    github: 'https://github.com/pjrus/pomo-app',
  },
];

export const experience = [
  {
    period: 'Jun 2026 — present',
    role: 'Associate full-stack engineer',
    organisation: 'PlasmIT Vector',
    location: 'Docklands, Victoria, Australia',
    summary:
      'Managing configuration across the SaaS platform and building frontend, full-stack and mobile features for clinician-centred healthcare workflows. I take mobile work from requirements and user flows through implementation, testing and production-ready delivery.',
  },
  {
    period: 'Mar 2026 — Jun 2026',
    role: 'Full-stack engineering intern',
    organisation: 'PlasmIT Vector',
    location: 'Docklands, Victoria, Australia',
    summary:
      'Supported full-stack development for healthcare technology initiatives, contributing to web experiences and product-facing platforms centred around connected digital care.',
  },
  {
    period: 'Mar 2026 — present',
    role: 'Web developer',
    organisation: 'Ocean Connect',
    location: 'Remote',
    summary:
      'Maintaining an accessible digital presence for marine conservation programs, events and community initiatives.',
  },
  {
    period: 'Feb 2026 — present',
    role: 'Outreach & operations officer',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Supporting technical operations and building partnerships with schools to expand the reach of accessibility-focused programs and workshops.',
  },
  {
    period: 'Aug 2025 — present',
    role: 'Project coordinator',
    organisation: 'Monash Assistive Technology Team',
    location: 'Clayton, Victoria, Australia',
    summary:
      'Leading collaborative development of affordable tactile displays and the React Native software that supports them, grounded in user interviews and user-centred design.',
  },
];
