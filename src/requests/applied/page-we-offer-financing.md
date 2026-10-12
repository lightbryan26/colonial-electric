<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - ALREADY DONE: src/data/pages.mjs routes we-offer-financing/ to the we-offer-financing template.

# Request from page-we-offer-financing

File: src/data/pages.mjs (line 17)
Change: `P('we-offer-financing/', 'We Offer Financing', 'We Offer Financing', 'financing'),` → `P('we-offer-financing/', 'We Offer Financing', 'We Offer Financing', 'we-offer-financing'),`
Why: the full, price-stripped Financing page (brief §7) is built in src/pages/we-offer-financing.mjs; the slug still routes to the round-1 stub src/pages/financing.mjs. Styles are in src/css/page-we-offer-financing.css (all .fin-* scoped, inert until the route changes). After the switch src/pages/financing.mjs is unused and can be deleted by its owner.
