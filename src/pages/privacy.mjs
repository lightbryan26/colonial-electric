// /privacy/ — brief §7. Same verbatim legal layout as /terms/ (src/pages/terms.mjs); styles in src/css/page-terms.css.
import { legalPage } from './terms.mjs';
export function render(ctx) { return legalPage(ctx, 'privacy'); }
