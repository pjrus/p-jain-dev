<script>
  import ArrowIcon from './ArrowIcon.svelte';

  let { project, reveal = false, revealDelay = 0, revealOnScroll = false } = $props();
</script>

<article
  class="project-card"
  class:project-card--revealed={reveal}
  data-reveal={revealOnScroll ? 'project-card' : undefined}
  style={`--reveal-delay: ${revealDelay}ms`}
>
  <div class="project-summary">
    <div class="project-image-wrap">
      <img
        src={project.image}
        alt={project.alt}
        style:object-position={project.imagePosition ?? null}
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="project-body">
      <div>
        <h3>{project.title}</h3>
        <p class="project-description">{project.description}</p>
      </div>
    </div>
  </div>

  <div class="project-details">
    <section class="project-stack">
      <h4>Tech stack</h4>
      <ul class="tag-list" aria-label={`${project.title} technologies`}>
        {#each project.tags as tag}<li>{tag}</li>{/each}
      </ul>
    </section>

    <div class="project-links">
      {#if project.github}
        <a class="project-link project-link-secondary" href={project.github} target="_blank" rel="noreferrer">Source <ArrowIcon /></a>
      {/if}
      {#if project.visit}
        <a class="project-link project-link-primary" href={project.visit} target="_blank" rel="noreferrer">View <ArrowIcon /></a>
      {/if}
    </div>
  </div>
</article>
