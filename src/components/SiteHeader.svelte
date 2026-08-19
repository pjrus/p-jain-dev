<script>
  import { onMount } from 'svelte';
  import IconGithub from './IconGithub.svelte';
  import IconLinkedin from './IconLinkedin.svelte';
  import ThemeIcon from './ThemeIcon.svelte';
  import { route, navigateTo } from '../router.svelte.js';

  let isDark = false;

  onMount(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme();
  });

  function applyTheme() {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }

  function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    applyTheme();
  }
</script>

<header class="site-header">
  <div class="shell header-inner">
    <a class="brand" href="/#top" onclick={(event) => navigateTo('/#top', event)} aria-label="Paarangat Jain, back to top">PJ<span>.</span></a>

    <nav aria-label="Main navigation">
      <a href="/#projects" onclick={(event) => navigateTo('/#projects', event)}>Projects</a>
      <a href="/#experience" onclick={(event) => navigateTo('/#experience', event)}>Experience</a>
      <a href="/blog" onclick={(event) => navigateTo('/blog', event)} aria-current={route.path === '/blog' ? 'page' : undefined}>Blog</a>
    </nav>

    <div class="header-actions">
      <a
        class="header-social"
        href="https://github.com/pjrus"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile"
      >
        <IconGithub />
      </a>
      <a
        class="header-social"
        href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn profile"
      >
        <IconLinkedin />
      </a>
      <button
        class="theme-toggle"
        type="button"
        onclick={toggleTheme}
        aria-label={`Use ${isDark ? 'light' : 'dark'} theme`}
        aria-pressed={isDark}
      >
        <ThemeIcon dark={isDark} />
      </button>
      <a class="header-contact" href="mailto:paarangatj@gmail.com">Let’s talk</a>
    </div>
  </div>
</header>
