<script>
  import { base } from '$app/paths';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import { formatDate, posts } from '$lib/posts.js';
  import { canonicalUrl } from '$lib/seo.js';

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog — Paarangat Jain',
    url: canonicalUrl('/blog'),
    description: 'Notes on accessible software, assistive hardware and the things I build.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Paarangat Jain',
      url: canonicalUrl('/'),
    },
  };
</script>

<SeoHead
  title="Blog — Paarangat Jain"
  description="Notes on accessible software, assistive hardware and the things I build."
  path="/blog"
  jsonLd={blogJsonLd}
/>

<section class="blog shell section page-section" id="blog">
  <SectionHeading
    title="Blog"
    summary="Notes on accessible software, assistive hardware and whatever I happen to be building."
    headingLevel="h1"
  />

  {#if posts.length > 0}
    <ul class="post-list" aria-label="Published notes">
      {#each posts as post (post.slug)}
        <li class="post-item">
          <article>
            <div class="post-aside">
              <p class="post-meta">
                <time datetime={post.date}>{formatDate(post.date)}</time>
                {#if post.draft}<span class="post-draft">Draft</span>{/if}
              </p>
              <a class="post-thumb" href={`${base}/blog/${post.slug}`} tabindex="-1" aria-hidden="true">
                {#if post.thumbnail}
                  <img src={`${base}${post.thumbnail}`} alt="" loading="lazy" />
                {:else}
                  <span class="post-thumb-placeholder">&gt;_</span>
                {/if}
              </a>
            </div>
            <h3 class="post-item-title">
              <a href={`${base}/blog/${post.slug}`}><span class="post-marker" aria-hidden="true">&gt;</span> {post.title}</a>
            </h3>
            <p class="post-summary">{post.summary}</p>
            {#if post.tags.length > 0}
              <ul class="tag-list post-tags" aria-label={`${post.title} topics`}>
                {#each post.tags as tag}<li>{tag}</li>{/each}
              </ul>
            {/if}
          </article>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="blog-empty">
      <p class="blog-title"><span class="blog-title-marker">&gt;</span> Coming soon</p>
      <p>I’m drafting my first posts. In the meantime, take a look at what I’ve shipped.</p>
      <a class="text-link" href={`${base}/#projects`}>See my work <ArrowIcon /></a>
    </div>
  {/if}
</section>
