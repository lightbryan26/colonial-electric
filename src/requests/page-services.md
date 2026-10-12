# Request from page-services

File: src/data/pages.mjs (line with `P('services/', 'Services', 'Services', 'services-index')`)
Change: change the template from `'services-index'` to `'services'`, i.e.
  P('services/', 'Services', 'Services', 'services'),
(Alternative with identical effect: replace the body of src/pages/services-index.mjs with `export { render } from './services.mjs';`.)
Why: the full /services/ page (brief §7) now lives in src/pages/services.mjs (owned by page-services). Until this lands, /services/ still renders the old stub in src/pages/services-index.mjs.
