<script>
  import ArrowIcon from './ArrowIcon.svelte';

  let { project } = $props();
</script>

<article class="project-card">
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
        <p class="project-kicker">Selected project</p>
        <h3><span aria-hidden="true">&gt;</span> {project.title}</h3>
        <p class="project-description">{project.description}</p>
      </div>
      <div class="project-links">
        {#if project.github}
          <a class="project-link project-link-secondary" href={project.github} target="_blank" rel="noreferrer">Source <ArrowIcon /></a>
        {/if}
        {#if project.visit}
          <a class="project-link project-link-primary" href={project.visit} target="_blank" rel="noreferrer">View project <ArrowIcon /></a>
        {/if}
      </div>
    </div>
  </div>

  <div class="project-details">
    <div class="project-notes">
      <section class="project-detail-block">
        <h4><span aria-hidden="true">□</span> Problem statement</h4>
        <p>{project.problem}</p>
      </section>
      <section class="project-detail-block">
        <h4><span aria-hidden="true">◇</span> Architecture</h4>
        <p>{project.architecture}</p>
      </section>
    </div>

    <div class="project-results">
      <section>
        <h4>Key outcome</h4>
        <p class="outcome-card"><span aria-hidden="true">&gt;</span> {project.outcome}</p>
      </section>
      <section>
        <h4>Tech stack</h4>
        <ul class="tag-list" aria-label={`${project.title} technologies`}>
          {#each project.tags as tag}<li>{tag}</li>{/each}
        </ul>
      </section>
    </div>
  </div>
</article>
