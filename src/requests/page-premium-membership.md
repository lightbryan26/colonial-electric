# Request from page-premium-membership

File: src/data/pages.mjs (line with `P('premium-membership/', 'Flash Pass Membership', 'Flash Pass Membership', 'membership')`)
Change: change the template from `'membership'` to `'premium-membership'`, i.e.
  P('premium-membership/', 'Flash Pass Membership', 'Flash Pass Membership', 'premium-membership'),
(Alternative with identical effect: replace the body of src/pages/membership.mjs with `export { render } from './premium-membership.mjs';` — keeps body class tpl-membership; my CSS is scoped to .pm-* classes so either works.)
Why: the full Flash Pass Membership page (brief §7: hero, intro, interactive bolt with 4 benefits, shared blocks, Save Big; no price) lives in src/pages/premium-membership.mjs (owned by page-premium-membership). Until this lands, /premium-membership/ still renders the round-1 stub in src/pages/membership.mjs.
