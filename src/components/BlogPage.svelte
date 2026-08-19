<script>
  import ArrowIcon from './ArrowIcon.svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { navigateTo } from '../router.svelte.js';
</script>

<section class="blog shell section" id="blog">
  <SectionHeading
    label="Blog"
    title="Writing, when there's something worth saying."
    summary="Notes on the products I'm building and the problems behind them. Nothing published yet — check back soon."
  />

  <div class="blog-empty">
    <p class="blog-title"><span class="blog-title-marker">&gt;</span> Coming soon</p>
    <p>I’m drafting my first posts. In the meantime, take a look at what I’ve shipped.</p>
    <a class="text-link" href="/#projects" onclick={(event) => navigateTo('/#projects', event)}>
      See my work <ArrowIcon />
    </a>
  </div>
</section>
