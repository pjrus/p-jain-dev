<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import IconGithub from './IconGithub.svelte';
  import IconLinkedin from './IconLinkedin.svelte';
  import ThemeIcon from './ThemeIcon.svelte';

  const THEME_KEY = 'portfolio-theme';

  let isDark = $state(false);
  let isMenuOpen = $state(false);
  /** @type {HTMLDialogElement | undefined} */
  let menuEl = $state();

  /** @param {'dark' | 'light'} theme */
  function applyTheme(theme) {
    const root = document.documentElement;
    root.dataset.theme = theme;
    isDark = theme === 'dark';
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    if (bg) {
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
    }
  }

  onMount(() => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  });

  afterNavigate(closeMenu);

  function toggleTheme() {
    const theme = isDark ? 'light' : 'dark';
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => applyTheme(theme));
    } else {
      applyTheme(theme);
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Storage unavailable: preference still holds for this session.
    }
  }

  function openMenu() {
    isMenuOpen = true;
    menuEl?.showModal();
  }

  function closeMenu() {
    isMenuOpen = false;
    menuEl?.close();
  }

  const pathname = $derived(page.url.pathname.replace(/\/+$/, '') || '/');
  const isBlog = $derived(
    pathname === `${base}/blog` || pathname.startsWith(`${base}/blog/`),
  );
  const isAbout = $derived(pathname === `${base}/about`);
</script>

<header class="site-header">
  <div class="wrap header-inner">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <a class="brand" href={`${base}/#top`} aria-label="Home">
      <img
        class="brand-avatar"
        src={`${base}/images/paarangat-jain.webp`}
        alt="Paarangat Jain"
        width="28"
        height="28"
      />
    </a>

    <nav class="primary-nav" aria-label="Main navigation">
      <a href={`${base}/about`} aria-current={isAbout ? 'page' : undefined}>About</a>
      <a href={`${base}/blog`} aria-current={isBlog ? 'page' : undefined}>Blog</a>
    </nav>

    <div class="header-actions">
      <a
        class="header-icon-btn header-social-btn"
        href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <IconLinkedin size={17} />
      </a>

      <a
        class="header-icon-btn header-social-btn"
        href="https://github.com/pjrus"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <IconGithub size={18} />
      </a>

      <button
        id="menu-toggle"
        class="header-icon-btn menu-toggle"
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

      <button
        class="header-icon-btn theme-toggle"
        type="button"
        aria-pressed={isDark}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        onclick={toggleTheme}
      >
        <ThemeIcon dark={isDark} />
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
      if (event.target === menuEl) closeMenu();
    }}
  >
    <div class="mobile-menu-head">
      <a class="brand" href={`${base}/#top`} onclick={closeMenu} aria-label="Home">
        <img
          class="brand-avatar"
          src={`${base}/images/paarangat-jain.webp`}
          alt="Paarangat Jain"
          width="28"
          height="28"
        />
      </a>
      <button
        class="header-icon-btn"
        type="button"
        aria-label="Close menu"
        onclick={closeMenu}
      >
        <span class="menu-icon is-open" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
      </button>
    </div>

    <nav class="mobile-menu-nav" aria-label="Mobile navigation">
      <a href={`${base}/about`} aria-current={isAbout ? 'page' : undefined} onclick={closeMenu}>About</a>
      <a href={`${base}/blog`} aria-current={isBlog ? 'page' : undefined} onclick={closeMenu}>Blog</a>
    </nav>

    <div class="mobile-menu-foot">
      <div class="mobile-menu-socials">
        <a
          class="btn btn--secondary"
          href="https://www.linkedin.com/in/paarangat-jain-6aa1321ba/"
          target="_blank"
          rel="noreferrer"
          onclick={closeMenu}
        >
          <IconLinkedin size={16} /> LinkedIn
        </a>
        <a
          class="btn btn--secondary"
          href="https://github.com/pjrus"
          target="_blank"
          rel="noreferrer"
          onclick={closeMenu}
        >
          <IconGithub size={16} /> GitHub
        </a>
      </div>
      <a class="btn btn--primary" href={`${base}/#contact`} onclick={closeMenu}>
        Contact me
      </a>
      <a
        class="btn btn--secondary"
        href={`${base}/Paarangat-Jain-Resume.pdf`}
        target="_blank"
        rel="noreferrer"
        onclick={closeMenu}
      >
        Read résumé
      </a>
    </div>
  </dialog>
</header>
