# Request from page-about-colonial-electric

File: src/data/pages.mjs (line 10)
Change: `P('about-colonial-electric/', 'About Us', 'About Us', 'about'),` → `P('about-colonial-electric/', 'About Us', 'About Us', 'about-colonial-electric'),`
Why: the full About Us page (brief §7) is built in src/pages/about-colonial-electric.mjs; the slug still routes to the round-1 stub src/pages/about.mjs. After the switch, src/pages/about.mjs is unused and can be deleted by its owner. Styles are already in src/css/page-about-colonial-electric.css (all .ab-* scoped, so they are inert until the route changes). Body class becomes tpl-about-colonial-electric.
