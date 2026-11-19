<script>
  import ArrowIcon from './ArrowIcon.svelte';

  let { project, index = 0 } = $props();
</script>

<article class="project-card" style={`--card-index: ${index}`}>
  <div class="project-media">
    {#if project.visit || project.github}
      <a
        class="project-media-link"
        href={project.visit ?? project.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.alt}
          width="1600"
          height="1000"
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </a>
    {:else}
      <img
        src={project.image}
        alt={project.alt}
        width="1600"
        height="1000"
        loading={index < 2 ? 'eager' : 'lazy'}
        decoding="async"
      />
    {/if}
  </div>

  <div class="project-content">
    <div class="project-top">
      <p class="meta-label">{project.kind}</p>
      <h3>{project.title}</h3>
      <p class="project-description">{project.description}</p>
    </div>

    <div class="project-foot">
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
  </div>
</article>
