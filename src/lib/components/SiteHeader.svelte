<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import IconDocument from './IconDocument.svelte';
  import IconGithub from './IconGithub.svelte';
  import IconLinkedin from './IconLinkedin.svelte';
  import IconUser from './IconUser.svelte';

  let isDark = $state(false);
  let isMenuOpen = $state(false);
  let menuEl = $state();
  let reduceMotion = $state(false);

  onMount(() => {
    // The inline script in app.html has already applied the saved theme before
    // first paint; this only syncs the toggle's state with what is on screen.
    isDark = document.documentElement.dataset.theme === 'dark';
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /** @param {KeyboardEvent} event */
    function handleThemeShortcut(event) {
      if (!event.ctrlKey || event.key.toLowerCase() !== 'd' || event.repeat) return;
      event.preventDefault();
      toggleTheme();
    }

    document.addEventListener('keydown', handleThemeShortcut);
    return () => document.removeEventListener('keydown', handleThemeShortcut);
  });

  // A tap on a menu link shouldn't leave the full-screen menu open behind the new view.
  afterNavigate(closeMenu);

  function applyTheme() {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }

  function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    applyTheme();
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  const isBlog = $derived(page.url.pathname.includes('/blog'));
  const isAbout = $derived(page.url.pathname.endsWith('/about'));

  // Locks background scroll while the full-screen menu is open.
  $effect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  });

  // Traps focus inside the open menu and closes it on Escape.
  $effect(() => {
    if (!isMenuOpen || !menuEl) return;

    const focusable = menuEl.querySelectorAll('a[href], button:not([disabled])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    /** @param {KeyboardEvent} event */
    function onKeydown(event) {
      if (event.key === 'Escape') {
        closeMenu();
        document.getElementById('menu-toggle')?.focus();
        return;
      }
      if (event.key !== 'Tab' || focusable.length === 0) return;
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  const overlayFade = $derived(reduceMotion ? { duration: 0 } : { duration: 180 });
  const overlayFly = $derived(reduceMotion ? { duration: 0, y: 0 } : { y: -16, duration: 220 });
</script>

<header class="site-header">
  <div class="shell header-inner">
    <a class="brand" href={`${base}/#top`} aria-label="Paarangat Jain, back to top">PJ<span>.</span></a>

    <nav class="primary-nav" aria-label="Main navigation">
      <a href={`${base}/about`} aria-current={isAbout ? 'page' : undefined}><IconUser /> About</a>
      <a href={`${base}/blog`} aria-current={isBlog ? 'page' : undefined}><IconDocument /> Blog</a>
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
        id="menu-toggle"
        class="menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        onclick={() => (isMenuOpen = !isMenuOpen)}
      >
        <span class="menu-icon" class:is-open={isMenuOpen} aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
      </button>
    </div>
  </div>

  {#if isMenuOpen}
    <div
      class="menu-scrim"
      transition:fade={overlayFade}
      onclick={closeMenu}
      aria-hidden="true"
    ></div>
    <div
      id="mobile-menu"
      class="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      bind:this={menuEl}
      transition:fly={overlayFly}
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
    </div>
  {/if}
</header>
