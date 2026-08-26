<script>
  import { assetUrl, canonicalUrl, defaultImage, siteName } from '$lib/seo.js';

  let {
    title,
    description,
    path = '/',
    type = 'website',
    image = defaultImage,
    imageAlt = 'Paarangat Jain portfolio website',
    publishedTime = '',
    modifiedTime = '',
    tags = [],
    noindex = false,
    jsonLd = null,
  } = $props();

  const url = $derived(canonicalUrl(path));
  const imageUrl = $derived(assetUrl(image));
  // Prevent a user-controlled title or summary from closing the JSON-LD block.
  const jsonLdText = $derived(
    jsonLd ? JSON.stringify(jsonLd).replaceAll('<', '\\u003c') : '',
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content={siteName} />
  <link rel="canonical" href={url} />

  <meta property="og:locale" content="en_AU" />
  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:image:alt" content={imageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
  <meta name="twitter:image:alt" content={imageAlt} />

  {#if noindex}<meta name="robots" content="noindex, nofollow" />{/if}
  {#if type === 'article'}
    <meta property="article:published_time" content={publishedTime} />
    {#if modifiedTime}<meta property="article:modified_time" content={modifiedTime} />{/if}
    {#each tags as tag}<meta property="article:tag" content={tag} />{/each}
  {/if}

  {#if jsonLd}{@html `<script type="application/ld+json">${jsonLdText}</script>`}{/if}
</svelte:head>
