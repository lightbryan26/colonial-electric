// Structured data: ONE <script type="application/ld+json"> per page holding a connected schema.org @graph.
// head.mjs calls graphFor(ctx, meta); page modules only add their own nodes to ctx.jsonld (BreadcrumbList, FAQPage,
// Service, Person). Every fact comes from src/data (site.mjs, services.mjs, towns.mjs) or verbatim page copy.
//
// Stable @ids (absolute, production origin; trailing slash on every page URL):
//   https://colonial-electric.com/#business      Electrician (the one business entity, on every page)
//   https://colonial-electric.com/#website       WebSite
//   https://colonial-electric.com/#founder       Person, Scott Hays (full profile on the about page)
//   https://colonial-electric.com/#logo, #primaryimage, #license
//   <page-url>#webpage  #breadcrumb  #service  #primaryimage  #itemlist  #faq-<n>
//   https://colonial-electric.com/service-area/<town>/#place   City (defined once per page, inside business.areaServed)
//
// Never emitted: priceRange, aggregateRating, review, SearchAction (no search endpoint), a second Electrician or
// LocalBusiness node, any em dash. assertGraph() enforces these at build time, so a bad graph fails the page.
import { site } from '../data/site.mjs';
import { towns } from '../data/towns.mjs';
import { services, outdoor, serviceCards } from '../data/services.mjs';
import { introBodies } from '../data/towns.mjs';
import { images } from './html.mjs';

const O = site.origin;
export const pageUrl = slug => `${O}/${slug}`;
export const ID = {
  business: `${O}/#business`,
  website: `${O}/#website`,
  founder: `${O}/#founder`,
  logo: `${O}/#logo`,
  primaryImage: `${O}/#primaryimage`,
  license: `${O}/#license`,
  place: townSlug => `${O}/service-area/${townSlug}/#place`,
  service: pageSlug => `${pageUrl(pageSlug)}#service`, // pageSlug with trailing slash, e.g. 'generator/'
  webpage: pageSlug => `${pageUrl(pageSlug)}#webpage`,
  breadcrumb: pageSlug => `${pageUrl(pageSlug)}#breadcrumb`,
};
const ref = id => ({ '@id': id });
// The business's Nextdoor page, linked from /leave-us-a-review/ (src/pages/leave-us-a-review.mjs). Yelp and Facebook are
// left out of sameAs until the client supplies the canonical profile URLs (the site links a review form and a search).
const NEXTDOOR = 'https://nextdoor.com/page/scott-hays-electrician-weymouth-ma/';

/** Absolute URL of the largest published rendition of an images.json key (fallback format: jpg/png). */
export function imageUrl(key, w) {
  const im = images[key];
  if (!im) throw new Error('schema: unknown image ' + key);
  const width = w ?? Math.max(...im.widths);
  return `${site.assetOrigin}/assets/img/${key}-${width}.${im.fallback}`;
}
function imageObject(id, key, caption) {
  const im = images[key];
  const width = Math.max(...im.widths);
  const height = Math.round(im.h * width / im.w);
  const url = imageUrl(key, width);
  return { '@type': 'ImageObject', '@id': id, url, contentUrl: url, width, height, ...(caption ? { caption } : {}) };
}

// ---------- sitewide nodes ----------
const STATE = { '@type': 'State', name: 'Massachusetts' };
const townUrl = t => pageUrl(`service-area/${t.slug}/`);
export const cityNode = t => ({
  '@type': 'City', '@id': ID.place(t.slug), name: `${t.name}, MA`, url: townUrl(t), containedInPlace: STATE,
  hasMap: 'https://maps.google.com/maps?q=' + encodeURIComponent(`${t.name}, MA`),
});
const serviceRefNode = s => ({ '@type': 'Service', '@id': ID.service(s.slug + '/'), name: s.h1, url: pageUrl(s.slug + '/') });

function businessNode() {
  return {
    '@type': 'Electrician',
    '@id': ID.business,
    name: site.name,
    alternateName: site.gbp.name,
    description: site.aboutBlurb, // verbatim footer blurb, visible on every page
    url: O + '/',
    logo: ref(ID.logo),
    image: ref(ID.primaryImage),
    telephone: site.phoneSchema,
    email: site.email,
    address: { '@type': 'PostalAddress', postOfficeBoxNumber: site.address.po, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.zip, addressCountry: site.address.country },
    geo: { '@type': 'GeoCoordinates', latitude: site.gbp.lat, longitude: site.gbp.lng },
    hasMap: site.gbp.link,
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: site.openHours.dayOfWeek, opens: site.openHours.opens, closes: site.openHours.closes }],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', telephone: site.phoneSchema, email: site.email },
    areaServed: towns.map(cityNode),
    founder: ref(ID.founder),
    hasCredential: {
      // The license line is visible sitewide ("Licensed & Insured Massachusetts Electrician ... (MA Lic# 8720-A1)").
      // recognizedBy (the issuing board) is left out until the Mass.gov license lookup confirms it.
      '@type': 'EducationalOccupationalCredential', '@id': ID.license, credentialCategory: 'license',
      name: `Massachusetts electrician license, ${site.license}`, identifier: site.license.replace(/^MA Lic# /, ''), validIn: STATE,
    },
    knowsAbout: services.map(s => s.nav),
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Electrical Services',
      itemListElement: services.map(s => ({ '@type': 'Offer', itemOffered: serviceRefNode(s) })),
    },
    sameAs: [site.instagram, site.gbp.link, NEXTDOOR],
  };
}

function sitewide() {
  return [
    businessNode(),
    { '@type': 'WebSite', '@id': ID.website, url: O + '/', name: site.name, alternateName: site.gbp.name, publisher: ref(ID.business), inLanguage: 'en-US' },
    imageObject(ID.logo, 'logo-lockup', site.name),
    imageObject(ID.primaryImage, 'owner-van', 'Founder Scott Hays standing beside the Colonial Electric van'),
    { '@type': 'Person', '@id': ID.founder, name: site.founder, url: pageUrl('about-colonial-electric/'), jobTitle: 'Founder', worksFor: ref(ID.business) },
  ];
}

// ---------- page nodes (called by page modules) ----------
const firstPara = blocks => (blocks || []).find(b => typeof b === 'string');

/** Service node for a service page (s = entry of services.mjs). description = first verbatim body paragraph. */
export function serviceNode(s) {
  const slug = s.slug + '/';
  const photo = images['services/' + s.slug] ? 'services/' + s.slug : null;
  return {
    ...serviceRefNode(s),
    serviceType: s.h1,
    description: s.outdoor ? outdoor.lead : firstPara(s.a?.body) || firstPara(s.b?.body) || s.heroLine,
    image: photo ? imageObject(pageUrl(slug) + '#primaryimage', photo, s.heroAlt) : ref(ID.primaryImage),
    provider: ref(ID.business),
    areaServed: towns.map(t => ref(ID.place(t.slug))),
  };
}

/** Service node for a town page: "Electrical services in {Town}, MA", offered in that City. Replaces the old per-town Electrician. */
export function townServiceNode(t) {
  const slug = `service-area/${t.slug}/`;
  const bySlug = new Map(services.map(s => [s.slug + '/', s]));
  return {
    '@type': 'Service',
    '@id': ID.service(slug),
    name: `Electrical services in ${t.name}, MA`,
    serviceType: 'Electrical services',
    url: pageUrl(slug),
    description: introBodies[t.introVariant](t.name), // verbatim intro paragraph of the town page
    provider: ref(ID.business),
    areaServed: ref(ID.place(t.slug)),
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: `Electrical services in ${t.name}, MA`,
      // the service cards linked on the page (services grid), by @id
      itemListElement: serviceCards.filter(c => bySlug.has(c.href)).map(c => ({ '@type': 'Offer', itemOffered: ref(ID.service(c.href)) })),
    },
  };
}

/** Full founder profile (about page). Facts are the verbatim bio only. Merges into the sitewide #founder stub. */
export function founderNode({ description } = {}) {
  return {
    '@type': 'Person', '@id': ID.founder, name: site.founder, url: pageUrl('about-colonial-electric/'),
    image: imageUrl('scott-portrait', 1200),
    jobTitle: 'Founder',
    hasOccupation: { '@type': 'Occupation', name: 'Master Electrician' },
    ...(description ? { description } : {}),
    knowsAbout: ['Residential installations', 'Commercial projects', 'Electrical substations'],
    worksFor: ref(ID.business),
  };
}

// ---------- the page graph ----------
const PAGE_TYPE = {
  'about-colonial-electric': 'AboutPage',
  'contact-us': 'ContactPage',
  services: 'CollectionPage',
  'service-area': 'CollectionPage',
};
const typesOf = n => [].concat(n['@type'] || []);
const isType = (n, t) => typesOf(n).includes(t);

/** Hero image of the page as an ImageObject node or reference. */
function pagePrimaryImage(ctx, slug, nodes) {
  const svc = nodes.find(n => isType(n, 'Service') && n.image && n.image['@type'] === 'ImageObject');
  if (svc) return ref(svc.image['@id']);
  const key = ctx.preloadImage;
  if (key && key !== 'owner-van' && images[key]) return imageObject(pageUrl(slug) + '#primaryimage', key);
  return ref(ID.primaryImage);
}

/**
 * ctx.jsonld: nodes the page modules pushed (legacy objects may still carry @context). meta: { title, description, url }.
 * Returns { '@context', '@graph' }.
 */
export function graphFor(ctx, meta) {
  const { page } = ctx;
  const slug = page.slug;
  const nodes = (ctx.jsonld || []).map(({ '@context': _, ...n }) => n);
  const graph = sitewide();
  if (page.template === '404') return finish(graph);

  const url = pageUrl(slug);
  const crumbs = nodes.filter(n => isType(n, 'BreadcrumbList'));
  const faqs = nodes.filter(n => isType(n, 'FAQPage'));
  const others = nodes.filter(n => !crumbs.includes(n) && !faqs.includes(n));
  if (crumbs.length > 1) throw new Error(`schema /${slug}: ${crumbs.length} BreadcrumbLists`);
  const crumb = crumbs[0] && { '@type': 'BreadcrumbList', '@id': ID.breadcrumb(slug), ...crumbs[0] };
  const questions = faqs.flatMap(f => f.mainEntity).map((q, i) => ({ '@id': `${url}#faq-${i + 1}`, ...q }));

  const service = others.find(n => isType(n, 'Service') && n['@id'] === ID.service(slug));
  const town = page.town;
  const webpage = {
    '@type': questions.length ? [PAGE_TYPE[page.template] || 'WebPage', 'FAQPage'] : PAGE_TYPE[page.template] || 'WebPage',
    '@id': ID.webpage(slug),
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: ref(ID.website),
    about: town ? [ref(ID.place(town.slug)), ref(ID.business)] : service ? ref(service['@id']) : ref(ID.business),
    primaryImageOfPage: pagePrimaryImage(ctx, slug, others),
    ...(crumb ? { breadcrumb: ref(crumb['@id']) } : {}),
    inLanguage: 'en-US',
    ...(ctx.dateModified ? { dateModified: ctx.dateModified } : {}),
  };
  // mainEntity: the FAQs where the page renders them (FAQPage), else what the page is about.
  if (questions.length) webpage.mainEntity = questions;
  else if (service) webpage.mainEntity = ref(service['@id']);
  else if (page.template === 'about-colonial-electric') webpage.mainEntity = ref(ID.founder);
  else if (page.template === 'contact-us') webpage.mainEntity = ref(ID.business);
  else if (page.template === 'service-area') {
    webpage.mainEntity = ref(url + '#itemlist');
    others.push({
      '@type': 'ItemList', '@id': url + '#itemlist', name: 'Service Area', numberOfItems: towns.length,
      itemListElement: towns.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: `${t.name}, MA`, url: townUrl(t) })),
    });
  }
  return finish([...graph, webpage, ...others, ...(crumb ? [crumb] : [])]);
}

// ---------- normalise + assert ----------
const isRef = o => o && typeof o === 'object' && !Array.isArray(o) && Object.keys(o).length === 1 && '@id' in o;

/**
 * One definition per @id: a node defined more than once (e.g. the #founder stub and the about page's full Person, or
 * a Service listed in the business OfferCatalog and defined on its own page) is merged into the top-level definition
 * (or the first one) and every other occurrence becomes a bare {"@id"} reference. Conflicting values throw.
 */
function dedupe(graph) {
  const defs = new Map(); // id -> [{ node, top }]
  const walk = (v, top) => {
    if (Array.isArray(v)) return v.forEach(x => walk(x, false));
    if (!v || typeof v !== 'object') return;
    if (v['@id'] && !isRef(v)) { if (!defs.has(v['@id'])) defs.set(v['@id'], []); defs.get(v['@id']).push({ node: v, top }); }
    for (const [k, x] of Object.entries(v)) if (k !== '@id') walk(x, false);
  };
  graph.forEach(n => walk(n, true));
  const replace = new Map(); // node object -> ref
  for (const [id, list] of defs) {
    if (list.length < 2) continue;
    const primary = (list.find(d => d.top) || list[0]).node;
    for (const { node } of list) {
      if (node === primary) continue;
      for (const [k, x] of Object.entries(node)) {
        if (!(k in primary)) primary[k] = x;
        else if (JSON.stringify(primary[k]) !== JSON.stringify(x)) throw new Error(`schema: conflicting "${k}" for ${id}`);
      }
      replace.set(node, ref(id));
    }
  }
  const swap = v => Array.isArray(v) ? v.map(swap)
    : v && typeof v === 'object' ? (replace.has(v) ? replace.get(v) : Object.fromEntries(Object.entries(v).map(([k, x]) => [k, swap(x)])))
    : v;
  return graph.filter(n => !replace.has(n)).map(swap);
}

const BANNED_KEYS = ['priceRange', 'aggregateRating', 'review', 'reviews', 'potentialAction'];
const BUSINESS_TYPES = ['Electrician', 'LocalBusiness', 'HomeAndConstructionBusiness', 'ProfessionalService', 'Organization', 'Corporation'];

/** Throws if the graph breaks a rule. Also run by /tmp/claude-0/seo/schema/check.mjs against the built pages. */
export function assertGraph(doc, label = '') {
  const fail = m => { throw new Error(`schema ${label}: ${m}`); };
  const text = JSON.stringify(doc);
  if (text.includes(String.fromCharCode(0x2014))) fail('em dash');
  const ids = new Map(), refs = [], businesses = [];
  const walk = (v, path) => {
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`));
    if (!v || typeof v !== 'object') return;
    for (const k of BANNED_KEYS) if (k in v) fail(`banned property ${k} at ${path}`);
    if (typesOf(v).includes('SearchAction')) fail('SearchAction');
    if (typesOf(v).some(t => BUSINESS_TYPES.includes(t))) businesses.push(v['@id']);
    if (isRef(v)) refs.push([v['@id'], path]);
    else if (v['@id']) { if (ids.has(v['@id'])) fail(`duplicate @id ${v['@id']}`); ids.set(v['@id'], v); }
    if ('telephone' in v && v.telephone !== site.phoneSchema) fail(`telephone ${v.telephone} at ${path}`);
    for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
  };
  walk(doc['@graph'], '@graph');
  for (const [id, path] of refs) if (!ids.has(id)) fail(`unresolved @id ${id} at ${path}`);
  if (businesses.length !== 1 || businesses[0] !== ID.business) fail(`business nodes: ${JSON.stringify(businesses)}`);
  return { ids, refs };
}

function finish(graph) {
  const doc = { '@context': 'https://schema.org', '@graph': dedupe(graph) };
  assertGraph(doc);
  return doc;
}
