<script>
  import ArrowIcon from './ArrowIcon.svelte';
  import LaptopMockup from './LaptopMockup.svelte';
  import PhoneMockup from './PhoneMockup.svelte';

  let { project, index = 0 } = $props();

  // Rows 1 & 3: text left / image right. Rows 2 & 4: image left / text right.
  const textFirst = $derived(index % 2 === 0);
  const href = $derived(project.visit ?? project.github);
  const isPhone = $derived(project.device === 'phone');
</script>

<article class="project-row" class:project-row--text-first={textFirst} data-reveal>
  <div class="project-media">
    {#if isPhone}
      <div class="project-frame project-frame--phone">
        <PhoneMockup
          src={project.image}
          alt={project.alt}
          caption={project.caption}
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </div>
    {:else}
      <svelte:element
        this={href ? 'a' : 'div'}
        class="project-frame"
        href={href}
        target={href ? '_blank' : undefined}
        rel={href ? 'noreferrer' : undefined}
        aria-label={href ? `Open ${project.title}` : undefined}
      >
        <LaptopMockup
          src={project.image}
          alt={project.alt}
          url={href}
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </svelte:element>
    {/if}
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
