// Crawler-facing files written by src/build.mjs: robots.txt, sitemap.xml (with image entries), llms.txt, llms-full.txt.
// Everything here is generated from src/data (and the verbatim page data), never typed by hand, so these files can
// never state a fact the site does not show. Absolute https://colonial-electric.com URLs only (site.origin).
import { site } from '../data/site.mjs';
import { services, outdoor, serviceCards } from '../data/services.mjs';
import { towns } from '../data/towns.mjs';
import { about } from '../data/home.mjs';
import { trustItems, guarantee } from '../data/shared.mjs';
import { benefits } from '../pages/premium-membership.mjs';

const O = site.origin;
const url = slug => `${O}/${slug}`;

/** Fails the build on anything these files must never contain (brief: no em dashes, no prices, no 24/7 promotion). */
function guard(name, text) {
  const bad = [['—', 'em dash'], ['$', 'price'], ['24/7', '24/7'], ['24-7', '24/7']].filter(([s]) => text.includes(s));
  if (bad.length) throw new Error(`${name}: contains ${bad.map(b => b[1]).join(', ')}`);
  return text;
}

// ---------------------------------------------------------------- robots.txt
// Allow-all, written out per crawler so the client's choice is on record and an accidental block is easy to spot.
// A crawler that finds its own group ignores the '*' group: any future Disallow must be repeated in every group.
export function robotsTxt() {
  return guard('robots.txt', `# robots.txt for ${O}/
# Every search engine and AI answer engine is welcome to crawl the whole site.
# Plain-text summary for language models: ${O}/llms.txt (full text: ${O}/llms-full.txt)

User-agent: *
Allow: /

# Search engines
User-agent: Googlebot
User-agent: Bingbot
User-agent: Applebot
User-agent: DuckDuckBot
Allow: /

# AI search and answer assistants (these decide whether the site can be cited in ChatGPT, Perplexity, Claude and others)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: DuckAssistBot
Allow: /

# AI model training (allowed by choice; change to "Disallow: /" in this group to opt out)
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /

Sitemap: ${O}/sitemap.xml
`);
}

// ---------------------------------------------------------------- sitemap.xml
const xmlEsc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** entries: [{ slug, lastmod: 'YYYY-MM-DD', images: ['assets/img/...'] }] */
export function sitemapXml(entries) {
  const body = entries.map(e => `  <url>
    <loc>${xmlEsc(url(e.slug))}</loc>
    <lastmod>${e.lastmod}</lastmod>${(e.images || []).map(src => `
    <image:image><image:loc>${xmlEsc(`${O}/${src}`)}</image:loc></image:image>`).join('')}
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`;
}

/**
 * The real photos a page shows in <main>, in page order (largest fallback file, as the <img src> carries it), for the
 * image sitemap. Logos, the emblem and favicons are not photos. Capped: the first few are the page's primary images.
 */
export function pagePhotos(mainHtml, max = 5) {
  const out = [];
  for (const m of mainHtml.matchAll(/<img\b[^>]*?\ssrc="(?:\.\.\/|\.\/)*(assets\/img\/[^"?#]+)"/g)) {
    const src = m[1];
    if (/\/(logo-|emblem|favicon)/.test(src) || !/\.(jpe?g|png|webp)$/.test(src)) continue;
    if (!out.includes(src)) out.push(src);
    if (out.length === max) break;
  }
  return out;
}

// ---------------------------------------------------------------- llms.txt (https://llmstxt.org)
const firstSentence = s => (s.match(/^.+?[.!?](?=\s|$)/) || [s])[0];
const tidy = s => String(s).replace(/\s+/g, ' ').trim();
const serviceLine = s => {
  const card = serviceCards.find(c => c.href === s.slug + '/');
  if (card) return card.blurb;
  if (s.outdoor) return firstSentence(outdoor.lead);
  return s.heroLine;
};
const hours = `${site.hours.replace(/\s*–\s*/, ' to ')}, Monday to Friday`;

function header() {
  return [
    `# ${site.name}`,
    '',
    `> ${site.name} is a licensed and insured Massachusetts electrician in ${site.address.city}, ${site.address.region}, serving Weymouth and the South Shore with residential and commercial electrical services. Founder: ${site.founder}. ${site.license}. Phone: ${site.phone}.`,
    '',
    `Website: ${O}/. Everything below is taken from the pages on this site; follow a link for the full page.`,
  ];
}

function aboutSection(full) {
  return [
    '## About',
    '',
    `- [About Us](${url('about-colonial-electric/')}): ${site.aboutBlurb}`,
    `- Founder: ${site.founder}. ${full ? about.paras.join(' ') : firstSentence(about.paras[0])}`,
    `- ${trustItems.join('. ')}.`,
    `- ${guarantee.h2}.`,
    `- License: ${site.license}. ${site.licenseLine.replace(/\s*–\s*/, ': ')}`,
  ];
}

function contactSection() {
  return [
    '## Contact',
    '',
    `- Business name: ${site.name}`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Mailing address: ${site.address.po}, ${site.address.city}, ${site.address.region} ${site.address.zip}`,
    `- Hours: ${hours}`,
    `- License: ${site.license}`,
    `- Service area: Weymouth and the South Shore of Massachusetts (towns listed above)`,
    `- Google Business Profile: ${site.gbp.link}`,
    `- Instagram: ${site.instagram}`,
    `- [Contact Us](${url('contact-us/')})`,
  ];
}

function policiesSection() {
  return [
    '## Policies',
    '',
    `- Prices: this website does not publish prices or rates. Call ${site.phone} to discuss a job.`,
    `- Contact form: on [Contact Us](${url('contact-us/')}). Phone: ${site.phone}.`,
    `- [We Offer Financing](${url('we-offer-financing/')}): We’ve partnered with Wisetack to offer our customers flexible financing options, so you can pay over time rather than all at once. All financing is subject to credit approval.`,
    `- [Flash Pass Membership](${url('premium-membership/')}): ${benefits.map(b => b.t).join(', ')}.`,
    `- [Privacy Policy](${url('privacy/')})`,
    `- [Terms & Conditions](${url('terms/')})`,
  ];
}

function areaSection() {
  return [
    '## Service area',
    '',
    `- [Service Area](${url('service-area/')}): every town ${site.name} serves`,
    ...towns.map(t => `- [${t.name}, MA](${url(`service-area/${t.slug}/`)}): ${t.callBoxLine}`),
  ];
}

export function llmsTxt() {
  const L = [
    ...header(), '',
    ...aboutSection(false), '',
    '## Services', '',
    `- [All services](${url('services/')})`,
    ...services.map(s => `- [${s.title}](${url(s.slug + '/')}): ${tidy(serviceLine(s))}`), '',
    ...areaSection(), '',
    ...contactSection(), '',
    ...policiesSection(), '',
    '## Optional', '',
    `- [Full text of every service page, with FAQs](${O}/llms-full.txt)`,
    `- [Leave Us a Review](${url('leave-us-a-review/')})`,
    `- [Calendar](${url('calendar/')})`,
  ];
  return guard('llms.txt', L.join('\n') + '\n');
}

// ---------------------------------------------------------------- llms-full.txt
const blocks = arr => (arr || []).flatMap(b => typeof b === 'string'
  ? [tidy(b), '']
  : b && b.list ? [...b.list.map(i => typeof i === 'string' ? `- ${tidy(i)}` : `- ${tidy(i.term)}: ${tidy(i.text)}`), ''] : []);

function serviceFull(s) {
  const L = [`## ${s.title}`, '', `URL: ${url(s.slug + '/')}`, '', tidy(s.heroLine), ''];
  if (s.outdoor) {
    L.push(tidy(outdoor.lead), '');
    for (const p of outdoor.panels) {
      L.push(`### ${p.title}`, '', tidy(p.lead), '');
      for (const g of p.groups || []) L.push(`${tidy(g.h)}:`, ...g.items.map(i => `- ${tidy(i.term)}: ${tidy(i.text)}`), '');
      if (p.close) L.push(tidy(p.close), '');
    }
    if (outdoor.features?.length) L.push('### Features', '', ...outdoor.features.map(f => `- ${tidy(f.title)}: ${tidy(f.body)}`), '');
  }
  for (const part of [s.a, s.b]) {
    if (!part) continue;
    if (part.eyebrow) L.push(`${tidy(part.eyebrow)}`, '');
    L.push(`### ${tidy(part.h2)}`, '', ...blocks(part.body));
  }
  if (s.products?.length) L.push('### Products', '', ...s.products.map(p => `- ${tidy(p.title)}: ${tidy(p.body)}`), '');
  if (s.faqs?.length) {
    L.push(`### ${s.title} FAQs`, '');
    for (const f of s.faqs) L.push(`Q: ${tidy(f.q)}`, '', ...blocks(f.a).map((x, i) => i === 0 && x ? `A: ${x}` : x));
  }
  return L;
}

export function llmsFullTxt() {
  const L = [
    ...header(), '',
    ...aboutSection(true), '',
    '# Services', '',
    ...services.flatMap(serviceFull),
    ...areaSection(), '',
    ...contactSection(), '',
    ...policiesSection(), '',
  ];
  return guard('llms-full.txt', L.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
}
