<script>
  import { base } from '$app/paths';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import { assetUrl, canonicalUrl } from '$lib/seo.js';

  const aboutDescription =
    'Meet Paarangat Jain, a Melbourne-based computer science student and accessibility-focused developer building practical web, mobile and assistive technology.';

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Paarangat Jain',
    url: canonicalUrl('/about'),
    description: aboutDescription,
    mainEntity: {
      '@type': 'Person',
      name: 'Paarangat Jain',
      url: canonicalUrl('/'),
      image: assetUrl('/images/paarangat-jain.webp'),
      jobTitle: 'Developer and accessibility advocate',
    },
  };
</script>

<SeoHead
  title="About — Paarangat Jain"
  description={aboutDescription}
  path="/about"
  jsonLd={aboutJsonLd}
/>

<section class="about about-page shell section page-section" aria-labelledby="about-title">
  <h1 id="about-title" class="about-title">Code, people and useful problems.</h1>

  <figure class="about-figure">
    <img
      src={`${base}/images/dharamshala.jpg`}
      alt="Dharamshala beneath the Dhauladhar mountain range in India"
    />
    <figcaption>Dharamshala, India · a favourite place</figcaption>
  </figure>

  <div class="about-copy">
    <p>
      Hi, I’m Paarangat Jain. I’m a computer science student at Monash University, developer and accessibility advocate drawn to complex problems with practical outcomes. What began as an early interest in code has grown into work across full-stack products, mobile applications and assistive technology.
    </p>
    <br>
    <p>
      As project coordinator with the Monash Assistive Technology Team, I help lead the development of affordable tactile displays for blind and low-vision users. The work connects hardware with a React Native companion application and keeps user research close to the engineering process. Away from the keyboard, I’m usually looking for somewhere new to eat, keeping up with K-dramas and Netflix, or catching the latest Marvel film.
    </p>
  </div>

</section>
