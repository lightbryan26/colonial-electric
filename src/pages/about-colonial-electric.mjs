// /about-colonial-electric/ — About Us (brief §7). All copy verbatim from source/pages/about-colonial-electric.md
// (typo fixes only: "MISSON" → Mission, "Continous" → Continuous). Styles: src/css/page-about-colonial-electric.css (.ab-*).
import { site } from '../data/site.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { trustStrip } from '../blocks/trust-strip.mjs';
import { townList } from '../blocks/town-list.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

const intro = {
  h2: 'Colonial Electric: The Dependable Source For Premium Electrical Service',
  paras: [
    'Welcome to Colonial Electric, an electrical company that not only delivers unparalleled expertise but also prioritizes customer satisfaction above all else. Founded by Scott Hays, his journey embodies the essence of determination and community spirit.',
    'Scott’s aspirations reached beyond just mastering the craft of electrical work; he envisioned a company that would blend exceptional service with genuine connections, anchored in trust and integrity. With each electrical job he handled, his vision of Colonial Electric took shape. It wasn’t merely about fixing electrical problems but about enriching lives and empowering spaces with safety, reliability, and innovation.',
    'Here at Colonial Electric, we stand on the pillars of our founder’s vision. Our mission goes beyond providing electrical services; we aim to empower homes and businesses alike with the assurance of safety, the promise of reliability, and the touch of innovation',
  ],
};

const meet = {
  h2: 'Meet the Man Behind the Magic',
  body: 'The success of any electrical company lies in the vision and dedication of its founder, and Colonial Electric is no exception. Meet the driving force behind this thriving business, the man who embodies innovation, integrity, and excellence.',
};

const founder = {
  eyebrow: 'Founder',
  name: 'Scott Hays',
  bio: [
    'Scott, a master electrician with over a decade of experience, stands at the helm of Colonial Electric. His journey began at the tender age of 18, immersing himself in the dynamic world of electrical work. From mastering the intricacies of residential installations to tackling the challenges of commercial projects, Scott’s expertise grew exponentially. Alongside his hands-on experience, Scott also honed his skills as an educator, imparting his knowledge to eager minds at a local college.',
    'Driven by a relentless pursuit of excellence, Scott’s career trajectory led him to diverse avenues within the electrical industry. As a lineman, he braved the elements, ensuring the seamless operation of electrical substations. This breadth of experience instilled in him a deep understanding of the nuances inherent in every facet of the trade. With each project, Scott’s commitment to quality and attention to detail remained unwavering, laying the foundation for Colonial Electric’s reputation as a trusted leader in the field.',
    'At Colonial Electric, Scott’s passion for the craft is palpable in every connection made. As both a master electrician and an advocate for knowledge-sharing, he fosters a culture of innovation and expertise within the team. With Scott’s leadership, Colonial Electric continues to redefine standards of excellence, delivering unparalleled service and reliability to clients across residential, commercial, and utility sectors.',
  ],
};

// Fact strip: only the bio facts brief §7 lists (master electrician, over a decade, started at 18, lineman, local college).
// Values/labels are fragments of the verbatim bio; no new facts, no counts.
const facts = [
  { v: 'Master Electrician', l: 'At the helm of Colonial Electric' },
  { v: 'Over a Decade', l: 'Of experience' },
  { v: 'Started at 18', l: 'In the dynamic world of electrical work' },
  { v: 'Lineman & Educator', l: 'Electrical substations & a local college' },
];
// Pull quote: a verbatim sentence fragment from bio paragraph 3 (aria-hidden; the paragraph itself stays intact).
const pull = 'Scott’s passion for the craft is palpable in every connection made.';

// Photo row: the live site's own (clean, un-framed) service photos (brief §8), linked to their service pages.
const work = [
  { key: 'inspect', max: 440, h: 275, slug: 'electrical-inspections/', t: 'Electrical Inspections', alt: 'Electrician testing a wall control during an electrical inspection' },
  { key: 'panel', max: 800, h: 500, slug: 'electrical-panel-upgrade/', t: 'Electrical Panel Upgrade', alt: 'Open residential electrical panel with breakers and wiring' },
  { key: 'fan', max: 440, h: 275, slug: 'ceiling-fan-installation/', t: 'Ceiling Fan Installation', alt: 'Electrician on a ladder installing a ceiling fan' },
  { key: 'outlets', max: 800, h: 500, slug: 'electrical-outlets/', t: 'Electrical Outlets', alt: 'Close-up of a duplex electrical outlet being wired into a wall box' },
];

const mv = [
  { h2: 'Mission', body: 'At Colonial Electric, we enrich homes and businesses with safe, reliable, and innovative electrical solutions. We exceed industry standards through exceptional service, fostering lasting relationships with clients and communities. With dedication to excellence and integrity, we’re your trusted partner for all electrical needs, ensuring peace of mind and satisfaction in every project.' },
  { h2: 'Vision', body: 'Our vision at Colonial Electric is to be the industry leader in providing straightforward, reliable electrical solutions. We aim to set the standard for quality and efficiency, ensuring that homes and businesses have safe and efficient electrical systems they can depend on. By prioritizing transparency, reliability, and customer satisfaction, we strive to make a positive impact in every community we serve.' },
];

const beyond = {
  h2: ['Going Above and Beyond Because', 'You Deserve the Best'],
  intro: 'We take pride in the quality of our electrical services. No matter the complexity of the task at hand, we approach each project with precision, expertise, and a commitment to excellence. From the moment you contact us, our dedicated team is committed to going above and beyond to ensure your complete satisfaction.',
  pillars: [
    { t: 'Personalized Service', ic: 'check', body: 'We understand that every client and every project is unique. That’s why we take the time to listen to your needs, assess your requirements, and tailor our options to meet your specific goals and budget.' },
    { t: 'Attention to Detail', ic: 'inspect', body: 'Our electricians pay meticulous attention to detail in every aspect of their work, from planning and installation to testing and inspection. We leave no stone unturned to ensure everything goes smoothly.' },
    { t: 'Timely Response', ic: 'clock', body: 'We know that electrical issues can disrupt your daily life. That’s why we prioritize timely response and swift resolution. When you choose Colonial Electric, you can count on us to be there when you need us most.' },
    { t: 'Continuous Improvement', ic: 'sparkle', body: 'In an ever-evolving industry, we are committed to staying ahead of the curve. Our team participates in ongoing training and professional development to stay ahead of the latest technologies, codes, and safety standards.' },
    { t: 'Safety First', ic: 'shield', body: 'Safety is our top priority in everything we do. We adhere to strict safety protocols and guidelines to protect our clients, our team members, and the communities we serve. You can trust us to prioritize your safety and well-being at all times.' },
  ],
};

const pad = n => String(n).padStart(2, '0');
const index = (n, label) => `<p class="ab-index"><span class="ab-index__n">${pad(n)}</span><span class="ab-index__l">${esc(label)}</span></p>`;

function hero(ctx) {
  ctx.jsonld = [...(ctx.jsonld || []), {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.origin + '/' },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: site.origin + '/' + ctx.page.slug },
    ],
  }];
  return `<section class="ab-hero on-dark stars-bg" aria-labelledby="ab-h1">
  <div class="container ab-hero__grid">
    <div class="ab-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">About Us</span></li></ol></nav>
      <p class="eyebrow ab-hero__eyebrow">${esc(site.name)}</p>
      <h1 class="ab-hero__h1" id="ab-h1">About <span>Us</span></h1>
      <p class="ab-hero__lic label-wide">${icon('bolt', { size: 14 })}${esc(site.license)}</p>
      <p class="btn-row"><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}${site.phone}</a><a class="btn btn--ghost btn--lg" href="#ab-founder">Meet Scott${icon('arrow-right', { size: 16 })}</a></p>
    </div>
    <figure class="ab-hero__media">
      ${picture(ctx, 'owner-van', { alt: 'Founder Scott Hays standing in front of the Colonial Electric service van', sizes: '(min-width: 1440px) 820px, (min-width: 960px) 58vw, 100vw', priority: true })}
      <figcaption class="ab-tag">${icon('bolt', { size: 14 })}<span>${esc(founder.name)}</span><span class="ab-tag__sep" aria-hidden="true"></span><span>${esc(founder.eyebrow)}</span></figcaption>
    </figure>
  </div>
</section>`;
}

function introSection() {
  const [lead, ...rest] = intro.paras;
  return `<section class="ab-intro" aria-labelledby="ab-intro-h">
  <div class="container">
    ${index(1, 'Our Company')}
    <h2 class="ab-intro__h" id="ab-intro-h">${esc(intro.h2).replace(':', ':<br>')}</h2>
    <div class="ab-intro__cols">
      <p class="ab-intro__lead">${esc(lead)}</p>
      <div class="ab-intro__rest">${rest.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    </div>
    <div class="ab-facts">
      <ul class="ab-facts__list" role="list" aria-label="Scott Hays at a glance">${facts.map(f => `
        <li class="ab-fact">${icon('bolt', { size: 16 })}<span class="ab-fact__v">${esc(f.v)}</span><span class="ab-fact__l">${esc(f.l)}</span></li>`).join('')}
      </ul>
    </div>
  </div>
</section>`;
}

function founderSection(ctx) {
  return `<section class="ab-founder on-dark" id="ab-founder" aria-labelledby="ab-meet-h">
  <div class="container">
    <header class="ab-meet">
      ${index(2, 'The Founder')}
      <h2 class="ab-meet__h" id="ab-meet-h">${esc(meet.h2).replace('Behind', '<br class="ab-br">Behind')}</h2>
      <p class="ab-meet__p">${esc(meet.body)}</p>
    </header>
    <div class="ab-founder__grid">
      <figure class="ab-portrait">
        <div class="ab-portrait__frame">${picture(ctx, 'scott-portrait', { alt: 'Portrait of Scott Hays, founder of Colonial Electric, in a Colonial Electric polo', sizes: '(min-width: 1440px) 520px, (min-width: 960px) 38vw, 92vw' })}</div>
        <figcaption class="ab-portrait__cap"><span class="label-wide">${esc(founder.eyebrow)}</span><span class="ab-portrait__name">${esc(founder.name)}</span></figcaption>
      </figure>
      <div class="ab-bio">
        <p class="eyebrow">${esc(founder.eyebrow)}</p>
        <h2 class="ab-bio__name">${esc(founder.name)}</h2>
        <div class="ab-bio__text">${founder.bio.map((p, i) => `<p${i === 0 ? ' class="ab-bio__first"' : ''}>${esc(p)}</p>${i === 1 ? `<p class="ab-pull" aria-hidden="true">${icon('bolt', { size: 22 })}<span>${esc(pull)}</span></p>` : ''}`).join('')}</div>
        <ul class="ab-sectors" role="list" aria-label="Sectors served">${['Residential', 'Commercial', 'Utility'].map(s => `<li>${icon('bolt', { size: 14 })}${s}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>`;
}

function mvSection(ctx) {
  return `<section class="ab-mv" aria-label="Mission and vision">
  <div class="container">
    ${index(3, 'What Drives Us')}
    <div class="ab-mv__grid">
      ${mv.map((m, i) => `<article class="ab-mv__card ab-mv__card--${i ? 'vision' : 'mission'}" aria-labelledby="ab-mv-${i}">
        ${i ? '' : `<img class="ab-mv__mark" src="${ctx.asset('img/logo-lockup-320.png')}" width="320" height="332" alt="" loading="lazy" decoding="async">`}
        <p class="ab-mv__k" aria-hidden="true">${pad(i + 1)}</p>
        <h2 class="ab-mv__h" id="ab-mv-${i}">${esc(m.h2)}</h2>
        <span class="flag-rule" aria-hidden="true"></span>
        <p class="ab-mv__p">${esc(m.body)}</p>
      </article>`).join('')}
    </div>
  </div>
</section>`;
}

function beyondSection(ctx) {
  return `<section class="ab-beyond" aria-labelledby="ab-beyond-h">
  <div class="container ab-beyond__grid">
    <div class="ab-beyond__head">
      ${index(4, 'Our Standard')}
      <h2 class="ab-beyond__h" id="ab-beyond-h">${esc(beyond.h2[0])} <em>${esc(beyond.h2[1])}</em></h2>
      <p class="ab-beyond__p">${esc(beyond.intro)}</p>
      <p class="btn-row"><a class="btn btn--navy" href="${site.tel}">${icon('phone', { size: 18 })}${site.phone}</a><a class="ab-link" href="${ctx.r('contact-us/')}">Contact Us${icon('arrow-right', { size: 16 })}</a></p>
    </div>
    <ol class="ab-pillars" role="list">
      ${beyond.pillars.map((p, i) => `<li class="ab-pillar">
        <span class="ab-pillar__n" aria-hidden="true">${pad(i + 1)}</span>
        <span class="ab-pillar__ic" aria-hidden="true">${icon(p.ic, { size: 22 })}</span>
        <div class="ab-pillar__body"><h3 class="ab-pillar__t">${esc(p.t)}</h3><p>${esc(p.body)}</p></div>
      </li>`).join('')}
    </ol>
  </div>
  <div class="container ab-work">
    <div class="ab-work__head">
      <p class="ab-work__k label-wide">${icon('bolt', { size: 14 })}Services</p>
      <a class="ab-link" href="${ctx.r('services/')}">All Services${icon('arrow-right', { size: 16 })}</a>
    </div>
    <ul class="ab-work__grid" role="list">${work.map(w => {
      const r = f => ctx.r('assets/img/home-services/' + w.key + f);
      const set = ext => w.max >= 800 ? `${r('-480.' + ext)} 480w, ${r('-800.' + ext)} 800w` : `${r('-480.' + ext)} ${w.max}w`;
      const sizes = '(min-width: 1440px) 310px, (min-width: 900px) 23vw, 46vw';
      return `
      <li><a class="ab-work__tile" href="${ctx.r(w.slug)}">
        <span class="ab-work__ph"><picture><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${r('-480.jpg')}" srcset="${set('jpg')}" sizes="${sizes}" width="${w.max}" height="${w.h}" alt="${esc(w.alt)}" loading="lazy" decoding="async"></picture></span>
        <span class="ab-work__t">${esc(w.t)}${icon('arrow-right', { size: 16 })}</span>
      </a></li>`;
    }).join('')}
    </ul>
  </div>
</section>`;
}

function townsSection(ctx) {
  return `<section class="ab-towns" aria-labelledby="ab-towns-h">
  <div class="container ab-towns__grid">
    <header class="ab-towns__head">
      ${index(5, 'Where We Work')}
      <h2 class="ab-towns__h" id="ab-towns-h">Service Area</h2>
      <p class="ab-towns__sub label-wide">${icon('pin', { size: 14 })}Towns We Serve</p>
      <a class="ab-link" href="${ctx.r('service-area/')}">View Service Area${icon('arrow-right', { size: 16 })}</a>
    </header>
    ${townList(ctx, { cls: 'ab-towns__list' })}
  </div>
</section>`;
}

export function render(ctx) {
  ctx.preloadImage = 'owner-van';
  ctx.preloadSizes = '(min-width: 1440px) 820px, (min-width: 960px) 58vw, 100vw';
  return [
    hero(ctx),
    introSection(),
    founderSection(ctx),
    mvSection(ctx),
    beyondSection(ctx),
    contactCta(ctx, { id: 'ab-cta' }),
    trustStrip(ctx),
    townsSection(ctx),
  ].join('\n');
}
