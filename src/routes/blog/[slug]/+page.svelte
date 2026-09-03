<script>
  import { base } from '$app/paths';
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import { formatDate } from '$lib/posts.js';
  import { canonicalUrl } from '$lib/seo.js';

  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();

  const Content = $derived(data.content);
  const postUrl = $derived(canonicalUrl(`/blog/${data.post.slug}`));
  const postJsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.post.title,
    description: data.post.summary,
    datePublished: data.post.date,
    dateModified: data.post.date,
    url: postUrl,
    image: canonicalUrl('/images/portfolio.png'),
    author: {
      '@type': 'Person',
      name: 'Paarangat Jain',
      url: canonicalUrl('/'),
    },
    publisher: {
      '@type': 'Person',
      name: 'Paarangat Jain',
      url: canonicalUrl('/'),
    },
    keywords: data.post.tags,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  });
</script>

<SeoHead
  title={`${data.post.title} — Paarangat Jain`}
  description={data.post.summary}
  path={`/blog/${data.post.slug}`}
  type="article"
  publishedTime={data.post.date}
  modifiedTime={data.post.date}
  tags={data.post.tags}
  noindex={data.post.draft}
  jsonLd={postJsonLd}
/>

<article class="post shell section page-section">
  <header class="post-header">
    <a class="text-link post-back" href={`${base}/blog`}><ArrowIcon direction="left" /> All posts</a>
    <p class="post-meta">
      <time datetime={data.post.date}>{formatDate(data.post.date)}</time>
      {#if data.post.draft}<span class="post-draft">Draft</span>{/if}
    </p>
    <h1 class="post-title">{data.post.title}</h1>
    <p class="post-lede">{data.post.summary}</p>
    {#if data.post.tags.length > 0}
      <ul class="tag-list" aria-label="Topics">
        {#each data.post.tags as tag}<li>{tag}</li>{/each}
      </ul>
    {/if}
  </header>

  <div class="prose">
    <Content />
  </div>
</article>
