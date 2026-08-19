<script>
  import { onMount } from 'svelte';

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
    <a class="brand" href="#top" aria-label="Paarangat Jain, back to top">PJ<span>.</span></a>

    <nav aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#experience">Experience</a>
    </nav>

    <div class="header-actions">
      <button class="theme-toggle" type="button" onclick={toggleTheme} aria-label={`Use ${isDark ? 'light' : 'dark'} theme`}>
        {isDark ? 'Light' : 'Dark'}
      </button>
      <a class="header-contact" href="mailto:paarangatj@gmail.com">Let’s talk</a>
    </div>
  </div>
</header>
