import { base } from '$app/paths';

export const projects = [
  {
    title: 'Skilliton',
    description:
      'An AI-assisted peer skill exchange built at UniHack 2026, matching students and helping them organise sessions.',
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
    image: `${base}/images/portfolio.png`,
    alt: 'Personal portfolio website homepage',
    tags: ['SvelteKit', 'JavaScript', 'CSS', 'Accessibility'],
    github: 'https://github.com/pjrus/p-jain-dev',
  },
  {
    title: 'Pomodoro timer',
    description:
      'A focused iOS timer that keeps the essential work-and-rest rhythm simple and pleasant to use.',
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
    image: `${base}/images/braille-quiz-app.png`,
    alt: 'Braille Character Quiz Game interface',
    tags: ['Next.js', 'React', 'TypeScript', 'Accessibility', 'Local-first'],
    github: 'https://github.com/pjrus/braille-quiz-game',
    visit: 'https://pjrus.github.io/braille-quiz-game/',
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
