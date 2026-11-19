<script>
  import { base } from '$app/paths';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import { education } from '$lib/data/content.js';
  import { canonicalUrl } from '$lib/seo.js';

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
      image: canonicalUrl('/images/paarangat-jain.webp'),
      jobTitle: 'Developer & Accessibility Advocate',
    },
  };
</script>

<SeoHead
  title="About: Paarangat Jain"
  description={aboutDescription}
  path="/about"
  jsonLd={aboutJsonLd}
/>

<section class="about about-page wrap page-section" aria-labelledby="about-title">
  <h1 id="about-title">Code, people and useful problems.</h1>

  <div class="about-layout">
    <div class="about-copy">
      <p>
        Hi, I’m Paarangat Jain. I’m a computer science student at Monash University, developer and accessibility advocate drawn to complex problems with practical outcomes. What began as an early interest in code has grown into work across full-stack products, mobile applications and assistive technology.
      </p>
      <p>
        As Project Coordinator with the Monash Assistive Technology Team, I help lead the development of affordable tactile displays for blind and low-vision users. The work connects hardware with a React Native companion application and keeps user research close to the engineering process. Away from the keyboard, I’m usually looking for somewhere new to eat in Melbourne, keeping up with K-dramas and Netflix, or catching the latest Marvel film.
      </p>
      <div>
        <a class="btn btn--primary" href={`${base}/Paarangat-Jain-Resume.pdf`} target="_blank" rel="noreferrer">
          Read résumé
        </a>
      </div>
    </div>

    <figure class="about-figure">
      <img
        src={`${base}/images/dharamshala.jpg`}
        alt="Dharamshala beneath the Dhauladhar mountain range in India"
        width="1200"
        height="900"
        loading="lazy"
      />
    </figure>
  </div>

  <div class="about-education">
    <h2>Education</h2>
    <div class="education-grid">
      {#each education as item}
        <article class="education-card">
          <p class="meta-label">{item.period}</p>
          <h3>{item.institution}</h3>
          <p class="education-award">{item.award}</p>
          <p class="education-detail">{item.detail}</p>
          <p class="education-location">{item.location}</p>
        </article>
      {/each}
    </div>
  </div>
</section>
