<script>
  import ArrowIcon from '$lib/components/ArrowIcon.svelte';
  import { formatDate } from '$lib/posts.js';

  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();

  const Content = $derived(data.content);
</script>

<svelte:head>
  <title>{data.post.title} — Paarangat Jain</title>
  <meta name="description" content={data.post.summary} />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.summary} />
  <meta property="og:type" content="article" />
</svelte:head>

<article class="post shell section">
  <header class="post-header">
    <a class="text-link post-back" href="/blog"><ArrowIcon direction="left" /> All posts</a>
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
