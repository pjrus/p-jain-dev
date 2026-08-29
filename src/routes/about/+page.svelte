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

  <div>
    <p>
      Hi, I’m Paarangat Jain. I’m a computer science student at Monash University, developer and accessibility advocate drawn to complex problems with practical outcomes. What began as an early interest in code has grown into work across full-stack products, mobile applications and assistive technology.
    </p>
    <br>
    <p>
      As project coordinator with the Monash Assistive Technology Team, I help lead the development of affordable tactile displays for blind and low-vision users. The work connects hardware with a React Native companion application and keeps user research close to the engineering process. Away from the keyboard, I’m usually looking for somewhere new to eat, keeping up with K-dramas and Netflix, or catching the latest Marvel film.
    </p>
  </div>

  <section class="about-timeline" aria-labelledby="timeline-title">
    <div class="about-timeline-intro">
      <h2 id="timeline-title">How the work changed me.</h2>
      <p>
        From school projects to accessible products, each stage has made the work more practical, collaborative and grounded in the people it is for.
      </p>
    </div>

    <ol class="about-timeline-list">
      <li>
        <p class="about-timeline-period"><time datetime="2026">2026</time></p>
        <div>
          <h3>The work moved into the real world.</h3>
          <p>
            Alongside coordinating assistive-technology work, I began supporting operations at MATT and helping maintain Ocean Connect’s website for marine conservation and community education. I also rebuilt my VCE appointment booking system with Next.js and MongoDB.
          </p>
        </div>
      </li>
      <li>
        <p class="about-timeline-period"><time datetime="2025">2025</time></p>
        <div>
          <h3>Accessibility gave the work a purpose.</h3>
          <p>
            Becoming a project coordinator at MATT connected software, hardware and user needs. I built a React Native tactile-display app, a reactive Braille quiz game and an iOS Pomodoro timer, while adding Google IT and responsive web design certifications.
          </p>
        </div>
      </li>
      <li>
        <p class="about-timeline-period"><time datetime="2024">2024</time></p>
        <div>
          <h3>Study became practice.</h3>
          <p>
            I began a Bachelor of Computer Science at Monash University and tutored high-school mathematics, learning to adapt how I explained difficult ideas while managing multiple commitments.
          </p>
        </div>
      </li>
      <li>
        <p class="about-timeline-period"><time datetime="2023">2023</time></p>
        <div>
          <h3>I built my first end-to-end system.</h3>
          <p>
            I completed VCE with an appointment booking system built in PHP and MySQL. It showed me how a single project could bring problem-solving, interface design and backend logic together.
          </p>
        </div>
      </li>
      <li>
        <p class="about-timeline-period"><time datetime="2022">2022</time></p>
        <div>
          <h3>I started designing for real scenarios.</h3>
          <p>
            While building my programming foundations through VCE, I designed a prototype emergency evacuation system — an early lesson in turning an abstract brief into a useful technical response.
          </p>
        </div>
      </li>
      <li>
        <p class="about-timeline-period"><time datetime="2021">2021</time></p>
        <div>
          <h3>I built the foundation for solving problems.</h3>
          <p>
            I began VCE at Viewbank College with a focus on analytical subjects, developing the structured thinking that now underpins how I approach technical problems.
          </p>
        </div>
      </li>
    </ol>
  </section>
</section>
