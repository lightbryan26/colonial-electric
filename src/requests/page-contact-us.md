# Request from page-contact-us

File: src/data/pages.mjs (line 15)
Change: `P('contact-us/', 'Contact Us', 'Contact Us', 'contact'),` → `P('contact-us/', 'Contact Us', 'Contact Us', 'contact-us'),`
Why: the full Contact Us page (brief §7) is built in src/pages/contact-us.mjs; the slug still routes to the round-1 stub src/pages/contact.mjs. After the switch, src/pages/contact.mjs is unused and can be deleted by its owner. Styles live in src/css/page-contact-us.css (all .cu-* scoped, inert until the route changes). Body class becomes tpl-contact-us.
