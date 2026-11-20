<script>
  import { onMount } from 'svelte';
  import ArrowIcon from './ArrowIcon.svelte';
  import { clamp01, onScrollFrame } from '$lib/scroll.js';

  let { project, index = 0 } = $props();

  // Rows 1 & 3: text left / image right. Rows 2 & 4: image left / text right.
  const textFirst = $derived(index % 2 === 0);
  const href = $derived(project.visit ?? project.github);

  /** @type {HTMLElement | undefined} */
  let frameEl = $state();

  // Scroll-linked parallax: image drifts ±12px inside its overflow-hidden frame.
  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    return onScrollFrame(() => {
      if (!frameEl) return;
      const rect = frameEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const p = clamp01((vh - rect.top) / Math.max(1, rect.height + vh));
      frameEl.style.setProperty('--py', `${((0.5 - p) * 24).toFixed(2)}px`);
    });
  });
</script>

<article class="project-row" class:project-row--text-first={textFirst} data-reveal>
  <div class="project-media">
    <svelte:element
      this={href ? 'a' : 'div'}
      class="project-frame"
      bind:this={frameEl}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noreferrer' : undefined}
      aria-label={href ? `Open ${project.title}` : undefined}
    >
      <img
        src={project.image}
        alt={project.alt}
        width="1600"
        height="1000"
        loading={index < 2 ? 'eager' : 'lazy'}
        decoding="async"
      />
    </svelte:element>
  </div>

  <div class="project-text">
    <p class="meta-label">
      <span class="project-index">{String(index + 1).padStart(2, '0')}</span> / {project.kind}
    </p>
    <h3>{project.title}</h3>
    <p class="project-description">{project.description}</p>

    <ul class="tag-list" aria-label={`${project.title} technologies`}>
      {#each project.tags as tag}<li>{tag}</li>{/each}
    </ul>

    <div class="project-links">
      {#if project.visit}
        <a class="btn btn--primary project-btn" href={project.visit} target="_blank" rel="noreferrer">
          Open live <ArrowIcon />
        </a>
      {/if}
      {#if project.github}
        <a class="btn project-btn project-btn--source" href={project.github} target="_blank" rel="noreferrer">
          Read source <ArrowIcon />
        </a>
      {/if}
    </div>
  </div>
</article>
