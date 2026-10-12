import { contactCta } from '../../blocks/contact-cta.mjs';
// Homepage §10: Contact Us Today + the 21-town service area (with real landmark photos per town).
export function render(ctx) { return contactCta(ctx, { id: 's-contact-cta', withTowns: true }); }
