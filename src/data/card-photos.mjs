// Real Colonial job photos for the service CARDS (homepage #s-services grid and the /services/ catalogue), keyed by
// service slug. Source: Colonial's own WordPress media library (client-approved; brief §8 real photos only). Files are
// renamed by service (no customer names or addresses in keys, alt text or captions).
// Rule: a library photo shot for that service first, else that service's hero photo. A service with no truthful photo
// is left out and its card renders as a typographic tile instead (never a stand-in picture).
// pos = object-position for the 16:10 card frame · posM = object-position for the 4:3 phone thumbnail.
export const cardPhotos = {
  'electrical-panel-upgrade': {
    key: 'photos/panel-branch-circuits',
    alt: 'New breaker panel with branch circuits landed and the cover off, on a diamond-plate backboard',
    pos: '50% 50%', posM: '44% 50%',
  },
  generator: {
    key: 'photos/generator-transfer-switch-panels',
    alt: 'Generac transfer switch beside two breaker panels on a diamond-plate backboard',
    pos: '50% 55%', posM: '52% 55%',
  },
  'whole-home-battery-back-up': { // hero photo (no library shot for this service)
    key: 'services/whole-home-battery-back-up',
    alt: 'Tesla backup gateway and SPAN smart panel installed side by side by Colonial Electric',
    pos: '50% 48%', posM: '50% 50%',
  },
  'surge-protection': {
    key: 'photos/panel-surge-protector',
    alt: 'Breaker panel with a plug-in surge protective device at the top of the breaker column',
    pos: '50% 40%', posM: '45% 40%',
  },
  'lighting-additions': {
    key: 'photos/deck-railing-post-lights',
    alt: 'Lit post-cap and post-side lights on a white deck railing at dusk',
    pos: '50% 50%', posM: '72% 50%',
  },
  remodels: {
    key: 'photos/kitchen-backsplash-outlets',
    alt: 'Remodeled kitchen with a tiled backsplash, outlets and a switch beside the window over the sink',
    pos: '50% 50%', posM: '42% 50%',
  },
  'recessed-lighting': { // hero photo (no library shot for this service)
    key: 'services/recessed-lighting',
    alt: 'Recessed ceiling lights evenly spaced across a remodeled kitchen, a Colonial Electric job',
    pos: '50% 22%', posM: '50% 24%',
  },
};

/** The card photo for a service slug (or an href like 'generator/'), or null when none is in the image manifest. */
export const cardPhotoFor = (slugOrHref, images) => {
  const p = cardPhotos[String(slugOrHref).replace(/\/$/, '')];
  return p && images[p.key] ? p : null;
};
