// Real Colonial job photos for the media plates (src/blocks/plate.mjs), keyed by plate id (a service slug, or a
// page-specific id such as 'pm-front-of-the-line'). EMPTY ON PURPOSE: brief §8 allows real Colonial photos only, and the
// live site's stock service shots carry the baked-in red/navy frame (and one is a UK socket), so every plate currently
// renders as a typographic/iconographic brand plate.
//
// To drop a real photo back in (e.g. from Colonial's Instagram):
//   1. add it to the image pipeline (src/scripts/images.mjs) so it lands in src/data/images.json, e.g. key 'jobs/panel-1';
//   2. map it here:  'electrical-panel-upgrade': { key: 'jobs/panel-1', alt: 'New 200-amp panel installed by Colonial Electric' },
//   3. rebuild. Every plate with that id (home grid, services, about, financing…) swaps to the photo; markup stays the same.
export const servicePhotos = {};

/** The photo mapped to a plate id, or null. Ignores ids whose image key is not in the manifest. */
export const photoFor = (id, images) => {
  const p = servicePhotos[id];
  return p && images[p.key] ? p : null;
};
