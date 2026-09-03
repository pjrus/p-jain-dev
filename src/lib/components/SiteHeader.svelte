<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import IconDocument from './IconDocument.svelte';
  import IconGithub from './IconGithub.svelte';
  import IconLinkedin from './IconLinkedin.svelte';
  import IconUser from './IconUser.svelte';
  import ThemeIcon from './ThemeIcon.svelte';

  let isDark = $state(false);
  let isMenuOpen = $state(false);
  /** @type {HTMLDialogElement | undefined} */
  let menuEl = $state();

  onMount(() => {
    // The inline script in app.html has already applied the saved theme before
    // first paint; this only syncs the toggle's state with what is on screen.
    isDark = document.documentElement.dataset.theme === 'dark';
  });

  // A tap on a menu link shouldn't leave the full-screen menu open behind the new view.
  afterNavigate(closeMenu);

  function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }

  function openMenu() {
    isMenuOpen = true;
    // showModal gives the focus trap, Escape-to-close and inert background.
    menuEl?.showModal();
  }

  function closeMenu() {
    isMenuOpen = false;
    menuEl?.close();
  }

  const isBlog = $derived(page.url.pathname.includes('/blog'));
  const isAbout = $derived(page.url.pathname.endsWith('/about'));
</script>

<header class="site-header">
  <div class="shell header-inner">
    <a class="brand" href={`${base}/#top`} aria-label="Paarangat Jain, back to top">PJ<span>.</span></a>

    <nav class="primary-nav" aria-label="Main navigation">
      <a href={`${base}/about`} aria-current={isAbout ? 'page' : undefined}><IconUser size={17} /> About</a>
      <a href={`${base}/blog`} aria-current={isBlog ? 'page' : undefined}><IconDocument size={17} /> Blog</a>
    </nav>

    <div class="header-actions">
      <a
        class="header-social"
        href="https://github.com/pjrus"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile"
      >
        <IconGithub size={20} />
      </a>
      <a
        class="header-social"
        href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn profile"
      >
        <IconLinkedin size={20} />
      </a>
      <!-- Temporarily hidden
      <button
        class="header-social theme-toggle"
        type="button"
        aria-pressed={isDark}
        aria-label={isDark ? 'Switch to the light theme' : 'Switch to the dark theme'}
        onclick={toggleTheme}
      >
        <ThemeIcon dark={isDark} />
      </button>
      -->
      <button
        id="menu-toggle"
        class="menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        onclick={() => (isMenuOpen ? closeMenu() : openMenu())}
      >
        <span class="menu-icon" class:is-open={isMenuOpen} aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
      </button>
    </div>
  </div>

  <dialog
    id="mobile-menu"
    class="mobile-menu"
    aria-label="Site navigation"
    bind:this={menuEl}
    onclose={() => (isMenuOpen = false)}
    onclick={(event) => {
      // A click landing on the dialog itself is a click on its backdrop.
      if (event.target === menuEl) closeMenu();
    }}
  >
    <nav class="mobile-menu-nav" aria-label="Mobile">
      <a href={`${base}/about`} aria-current={isAbout ? 'page' : undefined}><IconUser size={18} /> About</a>
      <a href={`${base}/blog`} aria-current={isBlog ? 'page' : undefined}><IconDocument size={18} /> Blog</a>
      <a href="https://github.com/pjrus" target="_blank" rel="noreferrer" onclick={closeMenu}>
        <IconGithub size={18} /> GitHub
      </a>
      <a href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/" target="_blank" rel="noreferrer" onclick={closeMenu}>
        <IconLinkedin size={18} /> LinkedIn
      </a>
    </nav>

    <div class="mobile-menu-foot">
      <a class="button button-primary mobile-menu-contact" href="mailto:paarangatj@gmail.com" onclick={closeMenu}>
        Let’s talk
      </a>
    </div>
  </dialog>
</header>
