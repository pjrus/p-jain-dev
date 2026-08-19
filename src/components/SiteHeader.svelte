<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import IconBriefcase from './IconBriefcase.svelte';
  import IconDocument from './IconDocument.svelte';
  import IconGithub from './IconGithub.svelte';
  import IconLayers from './IconLayers.svelte';
  import IconLinkedin from './IconLinkedin.svelte';
  import ThemeIcon from './ThemeIcon.svelte';
  import { route, navigateTo } from '../router.svelte.js';

  let isDark = $state(false);
  let isMenuOpen = $state(false);
  let menuEl = $state();
  let reduceMotion = $state(false);

  onMount(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme();
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

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

  /**
   * Navigates and dismisses the mobile menu, so a tap doesn't leave it open behind the new view.
   * @param {string} href
   * @param {MouseEvent} [event]
   */
  function go(href, event) {
    closeMenu();
    navigateTo(href, event);
  }

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
    <a class="brand" href="/#top" onclick={(event) => go('/#top', event)} aria-label="Paarangat Jain, back to top">PJ<span>.</span></a>

    <nav class="primary-nav" aria-label="Main navigation">
      <a href="/#projects" onclick={(event) => navigateTo('/#projects', event)}><IconLayers /> Projects</a>
      <a href="/#experience" onclick={(event) => navigateTo('/#experience', event)}><IconBriefcase /> Experience</a>
      <a href="/blog" onclick={(event) => navigateTo('/blog', event)} aria-current={route.path === '/blog' ? 'page' : undefined}><IconDocument /> Blog</a>
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
        <a href="/#projects" onclick={(event) => go('/#projects', event)}><IconLayers size={18} /> Projects</a>
        <a href="/#experience" onclick={(event) => go('/#experience', event)}><IconBriefcase size={18} /> Experience</a>
        <a href="/blog" onclick={(event) => go('/blog', event)} aria-current={route.path === '/blog' ? 'page' : undefined}><IconDocument size={18} /> Blog</a>
      </nav>

      <div class="mobile-menu-foot">
        <div class="mobile-menu-social">
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
          <button
            class="theme-toggle"
            type="button"
            onclick={toggleTheme}
            aria-label={`Use ${isDark ? 'light' : 'dark'} theme`}
            aria-pressed={isDark}
          >
            <ThemeIcon dark={isDark} />
          </button>
        </div>

        <a class="button button-primary mobile-menu-contact" href="mailto:paarangatj@gmail.com" onclick={closeMenu}>
          Let’s talk
        </a>
      </div>
    </div>
  {/if}
</header>
