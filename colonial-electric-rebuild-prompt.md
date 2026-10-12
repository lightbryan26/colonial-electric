# Colonial Electric: Rebuild Brief (HARD CONSTRAINTS)

Every builder and critic agent follows this file. Where it says "verbatim", copy the text exactly; the only allowed edits are the typo fixes listed here. Scraped sources are in `/Users/johnbryanliwanag/colonial-electric/source/pages/*.md`, with the slug as the filename, `/` replaced by `__`, and `home.md` = `/`. Raw homepage HTML is `source/home.html`, WP JSON is `source/pages.json`, and image URLs are in `source/images.txt`. When this brief abbreviates copy with "…", take the full text from the matching `pages/*.md` file. Do not paraphrase it. **Exception: the "…" rule never applies in price-stripped passages** (the `/we-offer-financing/` disclaimer and the `/recessed-lighting/` FAQ 1). Those passages are written out in full in this brief, with no ellipsis; use exactly that text and never refill them from source, because the source carries the removed dollar and APR figures.

---

## 1. Project & constraints

- **Client:** Colonial Electric, a licensed and insured electrician on the South Shore of Massachusetts, based in Weymouth MA. Founder: Scott Hays.
  - Main phone: **781-287-8729**, linked as `tel:+17812878729`.
  - **MA Lic# 8720-A1**.
  - SMS help line, used in consent text only: +1 (781) 630-5360.
- **Nature:** a pitch build. A modern, premium rebuild of colonial-electric.com, intended to win the client.
- **Stack:** static, multi-page HTML/CSS/vanilla JS. No framework is required, and a tiny build script that generates pages from data is fine. Output is plain files: one folder per slug with an `index.html` inside.
- **Repo:** `lightbryan26/colonial-electric`.
- **Hosting:** GitHub Pages at `https://lightbryan26.github.io/colonial-electric/`, and also Vercel at the domain root.
  - Every internal link, asset, CSS and JS path must work under the `/colonial-electric/` subpath and at `/`. **Use relative URLs only**: `../`, `./`, `../../`.
  - Never use root-absolute `/foo/` hrefs.
  - Directory links must end in `/` or `index.html`.
  - Include a `.nojekyll` file.
  - Include a `404.html` that also uses relative assets. GitHub serves 404.html from any depth, so use a small base-path-detecting script or absolute-to-repo asset paths there only.
- **Quality bar:** beat the Dribbble shot https://dribbble.com/shots/27120544-Electrical-Services-Website-Design.
  - Do it **in Colonial's brand** (section 3).
  - **Do not copy its layout, composition, illustrations, photos, icons or any asset.**
  - Critics compare our page against it at the same viewport, blind, with labels stripped.
- **Brand authority:** Colonial's own logo, colors and Instagram (instagram.com/colonialhomeservices).
- **Content authority:** the live site, through the scraped `pages/*.md` files. Never invent copy, stats, reviews, awards, years in business or counts.

---

## 2. Site structure (45 pages, exact live slugs)

Templates:

| Template | Pages |
|---|---|
| **home** | 1 |
| **service** | 12, plus the `permanent-outdoor-lighting` variant |
| **town** | 21 |
| **index** | 2 (`services`, `service-area`) |
| **standard** | 6 |
| **legal** | 2 |

`<title>` and H1 are separate fields; the table gives both exactly, and critics judge each against its own column. Rules:
- `<title>` pattern: `{Title} | Colonial Electric`, where {Title} is the live WP title (pages.json `title.rendered`) **except these deliberate, declared changes**: "Terms" → "Terms & Conditions" and "Privacy" → "Privacy Policy" (the live footer labels); "We offer financing" → "We Offer Financing" and "Permanent Outdoor lighting" → "Permanent Outdoor Lighting" (casing fixes); "Hingham Ma" → "Hingham MA" (town fix). All other titles are the live WP title unchanged, including "Generator", "Electrical Inspections" and "Whole House Wiring or Rewiring".
- In the table, `\|` is only a Markdown escape; the shipped `<title>` uses a plain `|`.
- Homepage `<title>` is the live `<title>` from home.html, exactly: "Top-notch electrical services in South Shore Massachusetts."
- H1 is the live on-page heading (with the listed typo fixes), which may differ from the title: e.g. `/generator/` H1 "Generators", `/electrical-inspections/` H1 "Electrical Inspection", `/whole-house-wiring-or-rewiring/` H1 "Whole House Wiring/Rewiring".

| # | Slug | Live WP title (pages.json) | `<title>` (exact) | H1 (exact) | Template | Nav placement |
|---|---|---|---|---|---|---|
| 1 | `/` | Home | `Top-notch electrical services in South Shore Massachusetts.` | Your Trusted Local Electrician in Weymouth, MA | home | Logo + "Home" |
| 2 | `/about-colonial-electric/` | About Us | `About Us \| Colonial Electric` | About Us | standard | Main nav |
| 3 | `/services/` | Services | `Services \| Colonial Electric` | Services | index | Main nav (dropdown parent) |
| 4 | `/permanent-outdoor-lighting/` | Permanent Outdoor lighting | `Permanent Outdoor Lighting \| Colonial Electric` | Permanent Outdoor Lighting | service (variant) | Services dropdown #1 |
| 5 | `/electrical-outlets/` | Electrical Outlets | `Electrical Outlets \| Colonial Electric` | Electrical Outlets | service | Services dropdown #2 |
| 6 | `/electrical-panel-upgrade/` | Electrical Panel Upgrade | `Electrical Panel Upgrade \| Colonial Electric` | Electrical Panel Upgrade | service | Services dropdown #3 |
| 7 | `/surge-protection/` | Surge Protection | `Surge Protection \| Colonial Electric` | Surge Protection | service | Services dropdown #4 |
| 8 | `/ceiling-fan-installation/` | Ceiling Fan Installation | `Ceiling Fan Installation \| Colonial Electric` | Ceiling Fan Installation | service | Services dropdown #5 |
| 9 | `/ev-charger-installation/` | EV Charger Installation | `EV Charger Installation \| Colonial Electric` | EV Charger Installation | service | Services dropdown #6 |
| 10 | `/whole-house-wiring-or-rewiring/` | Whole House Wiring or Rewiring | `Whole House Wiring or Rewiring \| Colonial Electric` | Whole House Wiring/Rewiring | service | Services dropdown #7 |
| 11 | `/electrical-inspections/` | Electrical Inspections | `Electrical Inspections \| Colonial Electric` | Electrical Inspection | service | Services dropdown #8 |
| 12 | `/recessed-lighting/` | Recessed Lighting | `Recessed Lighting \| Colonial Electric` | Recessed Lighting | service | Services dropdown #9 |
| 13 | `/remodels/` | Remodels | `Remodels \| Colonial Electric` | Remodels | service | Services dropdown #10 |
| 14 | `/lighting-additions/` | Lighting Additions | `Lighting Additions \| Colonial Electric` | Lighting Additions | service | Services dropdown #11 |
| 15 | `/whole-home-battery-back-up/` | Whole Home Battery Back Up | `Whole Home Battery Back Up \| Colonial Electric` | Whole Home Battery Back Up | service | Services dropdown #12 |
| 16 | `/generator/` | Generator | `Generator \| Colonial Electric` | Generators | service | Services dropdown #13 (label "Generators") |
| 17 | `/service-area/` | Service Area | `Service Area \| Colonial Electric` | Colonial Electric — Your One-stop Solution For All Things Electrical! | index | Main nav (deliberate promotion; live: first item in the Services dropdown) |
| 18 | `/service-area/hanover-ma/` | Hanover MA, Electrical Services | `Hanover MA, Electrical Services \| Colonial Electric` | Hanover MA, Electrical Services | town | Town lists |
| 19 | `/service-area/milton-ma/` | Milton MA, Electrical Services | `Milton MA, Electrical Services \| Colonial Electric` | Milton MA, Electrical Services | town | Town lists |
| 20 | `/service-area/norwell-ma/` | Norwell MA, Electrical Services | `Norwell MA, Electrical Services \| Colonial Electric` | Norwell MA, Electrical Services | town | Town lists |
| 21 | `/service-area/randolph-ma/` | Randolph MA, Electrical Services | `Randolph MA, Electrical Services \| Colonial Electric` | Randolph MA, Electrical Services | town | Town lists |
| 22 | `/service-area/scituate-ma/` | Scituate MA, Electrical Services | `Scituate MA, Electrical Services \| Colonial Electric` | Scituate MA, Electrical Services | town | Town lists |
| 23 | `/service-area/whitman-ma/` | Whitman MA, Electrical Services | `Whitman MA, Electrical Services \| Colonial Electric` | Whitman MA, Electrical Services | town | Town lists |
| 24 | `/service-area/pembroke-ma/` | Pembroke MA, Electrical Services | `Pembroke MA, Electrical Services \| Colonial Electric` | Pembroke MA, Electrical Services | town | Town lists |
| 25 | `/service-area/weymouth-ma/` | Weymouth MA, Electrical Services | `Weymouth MA, Electrical Services \| Colonial Electric` | Weymouth MA, Electrical Services | town | Town lists |
| 26 | `/service-area/abington-ma/` | Abington MA, Electrical Services | `Abington MA, Electrical Services \| Colonial Electric` | Abington MA, Electrical Services | town | Town lists |
| 27 | `/service-area/braintree-ma/` | Braintree MA, Electrical Services | `Braintree MA, Electrical Services \| Colonial Electric` | Braintree MA, Electrical Services | town | Town lists |
| 28 | `/service-area/hingham-ma/` | Hingham Ma, Electrical Services | `Hingham MA, Electrical Services \| Colonial Electric` | Hingham MA, Electrical Services | town | Town lists |
| 29 | `/service-area/quincy-ma/` | Quincy MA, Electrical Services | `Quincy MA, Electrical Services \| Colonial Electric` | Quincy MA, Electrical Services | town | Town lists |
| 30 | `/service-area/rockland-ma/` | Rockland MA, Electrical Services | `Rockland MA, Electrical Services \| Colonial Electric` | Rockland MA, Electrical Services | town | Town lists |
| 31 | `/service-area/hull-ma/` | Hull MA, Electrical Services | `Hull MA, Electrical Services \| Colonial Electric` | Hull MA, Electrical Services | town | Town lists |
| 32 | `/service-area/plymouth-ma/` | Plymouth MA, Electrical Services | `Plymouth MA, Electrical Services \| Colonial Electric` | Plymouth MA, Electrical Services | town | Town lists |
| 33 | `/service-area/holbrook-ma/` | Holbrook MA, Electrical Services | `Holbrook MA, Electrical Services \| Colonial Electric` | Holbrook MA, Electrical Services | town | Town lists |
| 34 | `/service-area/marshfield-ma/` | Marshfield MA, Electrical Services | `Marshfield MA, Electrical Services \| Colonial Electric` | Marshfield MA, Electrical Services | town | Town lists |
| 35 | `/service-area/hanson-ma/` | Hanson MA, Electrical Services | `Hanson MA, Electrical Services \| Colonial Electric` | Hanson MA, Electrical Services | town | Town lists |
| 36 | `/service-area/canton-ma/` | Canton MA, Electrical Services | `Canton MA, Electrical Services \| Colonial Electric` | Canton MA, Electrical Services | town | Town lists |
| 37 | `/service-area/carver-ma/` | Carver MA, Electrical Services | `Carver MA, Electrical Services \| Colonial Electric` | Carver MA, Electrical Services | town | Town lists |
| 38 | `/service-area/cohasset-ma/` | Cohasset MA, Electrical Services | `Cohasset MA, Electrical Services \| Colonial Electric` | Cohasset MA, Electrical Services | town | Town lists |
| 39 | `/contact-us/` | Contact Us | `Contact Us \| Colonial Electric` | Contact Us | standard | Main nav (+ CTA) |
| 40 | `/premium-membership/` | Flash Pass Membership | `Flash Pass Membership \| Colonial Electric` | Flash Pass Membership | standard | Header button (live) + footer |
| 41 | `/we-offer-financing/` | We offer financing | `We Offer Financing \| Colonial Electric` | We Offer Financing | standard | Top financing bar + footer |
| 42 | `/leave-us-a-review/` | Leave Us a Review | `Leave Us a Review \| Colonial Electric` | Leave Us a Review | standard | Footer |
| 43 | `/calendar/` | Calendar | `Calendar \| Colonial Electric` | Calendar | standard | Not in nav (linked from contact/booking CTAs only if useful) |
| 44 | `/terms/` | Terms | `Terms & Conditions \| Colonial Electric` | Terms & Conditions | legal | Footer legal row |
| 45 | `/privacy/` | Privacy | `Privacy Policy \| Colonial Electric` | Privacy Policy | legal | Footer legal row |

Slug notes:
- Live homepage links `/service-area/hanover-ma` and `/service-area/norwell-ma` lack the trailing slash. Always use the trailing-slash form.
- The live footer "Home" link points to `/home`. Use the site root instead.

**Header / nav**
1. **Financing bar** at the very top: "Pay over time with monthly financing", plus the link "Check Monthly Payment Options" to `we-offer-financing/`.
2. **Main bar:**
   - Logo, linking home.
   - Home · About Us · Services (dropdown of the 13 services in the order above) · Service Area · Contact Us, plus a **Flash Pass Membership** button.
   - Persistent phone CTA: "Call Us Today!" with **(781) 287-8729** (`tel:+17812878729`).
   - **Live structure, for fidelity checks** (home.html): the live menu is Home · About Us · Services · Contact Us, where the Services dropdown is Service Area, then "Permanent Outdoor lighting", then the other 12 services ending "Generators". Beside the menu the live header has two buttons, "Call Us Today!" (tel) and "Flash Pass Membership". Flash Pass also appears in the footer Useful Links.
   - **Deliberate, declared changes (not live placement; critics must not score them as slug or structure fidelity failures):** Service Area is promoted from the first Services-dropdown item to a top-level item; Flash Pass Membership may render as a main-bar item or button (live: header button, not a menu item); the dropdown label "Permanent Outdoor lighting" is title-cased to "Permanent Outdoor Lighting" on purpose.
3. **Mobile:** hamburger with a full-screen menu. A sticky bottom "Call Now" bar on mobile is required.

**Footer** (every page)
- **About blurb (verbatim):** "At Colonial Electric, we're committed to providing top-notch electrical services throughout the South Shore. We prioritize delivering excellent service and strive to forge lasting relationships with our customers. Count on us to meet your electrical needs with the utmost quality and care."
- **License line (verbatim):** "Licensed & Insured Massachusetts Electrician – Serving Weymouth & the South Shore. (MA Lic# 8720-A1)"
- **Useful Links:** Home · About Us · Services · Contact Us · We Offer Financing · Service Area · Flash Pass Membership · Leave Us A Review.
- **Services column:** the 13 service links.
- **Service Area column:** the 21 towns.
- **Contact:** phone, email admin@colonial-electric.com, and Instagram `https://instagram.com/colonialhomeservices`. The live site has no social links; Instagram is added per the brief.
- **Legal row:** Privacy Policy · Terms & Conditions · © Colonial Electric.
- **Do not use** the duplicate Norwell-variant footer text from home.html on any page.

---

## 3. Brand system

**Colors.** Masters are sampled from the logo PNG.

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#12233E` | Primary: badge field, bolt, keyline |
| `--navy-ink` | `#081020` | Deepest navy: footer and dark grounds |
| `--blue` | `#1E4479` | Secondary: badge pinstripes |
| `--blue-bright` | `#0C3C78` | Optional action blue, from the van wrap |
| `--red` | `#BF1B2C` | Primary accent: "ELECTRIC" banner |
| `--red-flag` | `#C73136` | Hover / tint |
| `--red-deep` | `#A11C1E` | Pressed state / shadow |
| `--white` | `#FFFFFF` | |
| `--paper` | `#F6F7F9` | Neutral light ground (chosen, not sampled) |

Color rules:
- **No yellow or orange accent.** The orange and yellow on the van are its ladders, not brand colors.
- Do not carry the live theme's `#2ea3f2` link blue, `#435D7C`, Work Sans or Roboto.
- Premium comes from restraint: mostly navy and white, with red used deliberately.
- Text contrast must meet WCAG AA.

**Fonts** (Google Fonts, `display=swap`, each with a real fallback stack):
- **Headings:** Barlow Condensed 800/900. This matches the condensed athletic "COLONIAL"; Anton is acceptable for the hero display.
- **Eyebrows, labels, phone number, small all-caps tags:** Archivo, expanded width (`wdth` 125) at 700, letter-spacing 0.08–0.15em. This matches the wide "ELECTRIC".
- **Body:** Barlow 400/500, or Inter.

**Motifs.** Use them with restraint, never all at once:
1. The badge or crest shape: an octagonal crest with chamfered corners, a white inner border and a navy keyline. Use it as a frame for CTAs, stat cards and badges.
2. The Revolutionary rider mascot: Minuteman, tricorn hat, rearing white horse, US flag. **Use the real logo artwork only; do not redraw it.**
3. The lightning bolt: bullet, divider, hover glyph.
4. Tone-on-tone navy star field, as on the van wrap, as a low-contrast texture on navy sections.
5. Diagonal sweep: red, then a white swoosh, then navy, from the van. Use it as a section divider.
6. Fine horizontal pinstripe texture, from inside the badge.
7. Red/white flag-stripe accent rule.

**Logo usage**
- **Header:** the badge `2024/12/COLONIALELECTRIC_Web2_Badge.png` (250×150). A clean SVG trace of the badge is preferred for retina.
- **Hero, footer and about:** the full lockup with rider, `2024/12/COLONIALELECTRIC_LogoPackageWS_Both.png` (621×644). Keep it at 320px wide or less.
- **Favicon / apple-touch:** the minuteman emblem. home.html and images.txt only reference the `-32x32`, `-180x180`, `-192x192` and `-270x270` variants of `2024/04/cropped-Untitled-design-5.png`. Try fetching the un-suffixed `cropped-Untitled-design-5.png` (512×512; it returned 200 when checked on 2026-10-12). If it fails, fall back to the 270×270 variant for the apple-touch and 192 icons and the 32×32 variant for the favicon. **Do not upscale.**
- Never recolor, stretch or re-letter the logo.
- The Instagram avatar confirms the badge without the rider is used as a standalone mark.

**Voice:** reassuring, safety-first, neighborly, guarantee-backed, local (Weymouth / South Shore, founder Scott by name). Headlines are direct. New UI microcopy (button labels, form states, aria labels) may be written, but it must not make factual claims.

---

## 4. Homepage content (verbatim, in order)

Section order follows the live site. Builders may re-sequence or merge for a better narrative, but every section's copy must stay verbatim, and nothing outside this list may be added.

**0. Header.** See section 2.

**1. Financing bar.** "Pay over time with monthly financing" with the CTA "Check Monthly Payment Options" linking to `we-offer-financing/`.
- The live site shows a Wisetack wordmark here. Third-party logos are optional.
- No APR, $/month or "as low as".

**2. Hero**
- Eyebrow: "⭐ 5-Star Rated Electrician on Google"
- H1: **Your Trusted Local Electrician in Weymouth, MA**
- H2: **Safeguard Your Home with Premium Electrical Solutions**
- Body: "Colonial Electric understands how important safety, quality, and reliability are when it comes to your electrical needs. As your trusted partner in electrical services, our premium solutions are designed to ensure your peace of mind. With Colonial Electric, you can rely on our expertise, dedication to safety, and commitment to quality craftsmanship. Experience excellence in every connection – trust us for all your electrical service needs!"
- CTAs:
  - **Contact Us Today**, linking to `contact-us/`
  - **View Our Services**, linking to `services/`
  - Phone, linking to `tel:+17812878729`
- Hero image: `source/images/owner-van.jpg` (owner with the wrapped van). The live hero has no photo.

**3. Safety & Satisfaction Guaranteed**
- Eyebrow: "Safety & Satisfaction Guaranteed"
- H2: **For a Job Done Right, Call Colonial!**
- Paragraphs:
  1. "When it comes to electrical systems, having someone you can trust is essential. At Colonial Electric, we prioritize your safety and satisfaction above all else. With our team of experienced electricians, you can rest assured that your electrical systems are in capable hands."
  2. "We understand the importance of having a reliable electrical system, whether it's in your home or business. That's why we go above and beyond to provide top-notch service and expertise in every project we undertake."
  3. "From routine maintenance and repairs to complex installations and upgrades, Colonial Electric is equipped to handle it all. We stay up-to-date on the latest industry standards and best practices to ensure that your electrical systems are not only functional but also safe and efficient."
  4. "When you choose Colonial Electric, you're not only choosing peace of mind but also choosing a long-term partner dedicated to your electrical needs."
- Call box: "Prompt Electrical Service You Can Count On" / **(781) 287-8729** / **Get an Immediate Call Back!**

**4. Services grid**
- H2: **Your One-stop Solution For All Things Electrical**
- Intro: "If you're looking for a premium electrical service that offers everything you need, then you're in the right place. From quality installations to expert repairs, we pride ourselves on delivering top-notch electrical services tailored to meet your specific requirements."
- 12 cards, each linking to its page. This set of card blurbs is reused on the services index, the service-area index, every town page and `/generator/`.

| # | Card title | Link | Blurb (verbatim) |
|---|---|---|---|
| 1 | Electrical Outlets | electrical-outlets/ | No more messy cords or limited access to power sources! Our electrical outlet services ensure that you have convenient access to electricity wherever you need it. Whether it's for your home or business! |
| 2 | Electrical Panel Upgrades | electrical-panel-upgrade/ | Our team specializes in upgrading outdated panels to meet current safety standards and accommodate increased electrical loads. Enjoy safe, and energy-efficient power! |
| 3 | Generators | generator/ | Never be left in the dark again! Our generator services provide reliable backup power for your home or business, ensuring uninterrupted electricity during outages. Stay powered up and worry-free. |
| 4 | Whole-home Battery Backup | whole-home-battery-back-up/ | Embrace reliability with our whole-home battery backup services. Keep your place running smoothly, even during power outages, while reducing your carbon footprint. |
| 5 | Surge Protection | surge-protection/ | Shield your valuable electronics from harmful power surges with our surge protection services. Safeguard your appliances and devices against voltage spikes, ensuring their longevity and reliability. |
| 6 | Ceiling Fan Installation | ceiling-fan-installation/ | Enhance comfort and energy efficiency in any room with our professional ceiling fan installation services. Enjoy improved air circulation, reduced energy costs, and added aesthetic appeal. |
| 7 | Lighting | lighting-additions/ | Brighten up your surroundings with our lighting services. From elegant chandeliers to practical under-cabinet lighting, we offer custom solutions tailored to your needs! |
| 8 | EV Charger Installation | ev-charger-installation/ | Join the revolution with our E.V. charger installation services. Experience the convenience of charging your electric vehicle at home, ensuring you're always ready to hit the road. |
| 9 | Whole-house Wiring | whole-house-wiring-or-rewiring/ | Upgrade your property's electrical system with our whole-house wiring or rewiring services. From outdated systems to new construction projects, our team can handle it. |
| 10 | Remodels | remodels/ | Transform your home or business with professional electrical remodeling. Whether you're updating a single room or renovating your entire property, you can trust our expert electricians. |
| 11 | Electrical Inspection | electrical-inspections/ | Ensure the safety and reliability of your electrical system with our comprehensive electrical inspection services. Our team will meticulously assess wiring, outlets, panels, and more! |
| 12 | Recessed Lighting | recessed-lighting/ | Illuminate your space with style and sophistication using recessed lighting services. Achieve a sleek and modern look while maximizing light distribution and energy efficiency. |

Permanent Outdoor Lighting has no card on the live homepage, but it may appear as a 13th card or a feature link because it is a real service page.

**5. About / founder**
- H2: **An Electrical Company Built On Purpose, Commitment, & Excellence**
- Paragraphs:
  1. "Founder, Scott Hays learned the value of hard work and the power of lending a helping hand at such an early age. He honed his skills through apprenticeships and hands-on experience in various electrical projects, but he found himself yearning for something more than just a career. He wanted to build an electrical company that delivers excellence and quality to the community."
  2. "What makes Colonial Electric the best in South Shore and surrounding areas, is its unwavering dedication to offering premium quality service while fostering long-lasting genuine customer relationships. We believe in meticulous attention to detail and craftsmanship for every project, regardless of how big or small it may be."
  3. "In an industry often characterized by transactional interactions, We go above and beyond to understand the unique needs and goals of each customer. By prioritizing open communication and transparency, we ensure that every customer feels valued and respected throughout the entire process. At Colonial Electric, we don't just wire homes; we wire trust and reliability into every connection we make!"
- Image: the logo lockup, or the owner portrait `DSC_6221-Ev-scaled.jpg`.

**6. Why Choose Us?**
- H2: **Why Choose Us?**
- Intro: "We're proud to say that we're a premier electrical service provider with a commitment to excellence and customer satisfaction. Here are just a few reasons why choosing Colonial Electric is the right decision for all your electrical needs:"
- Pillars:
  1. **Transparent Pricing**: "We stand out for our unwavering commitment to transparency. From estimates to the final invoice, we ensure every aspect of our service is clear and understandable. We never keep customers in the dark!"
  2. **Local & Reliable Service**: "We genuinely care for our customers, and we always strive to build long-lasting relationships based on trust and satisfaction. We want nothing but the best for our customers, and that's reflected in everything we do."
  3. **Professional Workmanship**: "Our dedication to quality is beyond compare. We hold ourselves to the highest standards, from the materials we use to the expertise of our technicians, we spare no effort in delivering premium results."
  4. **Clean, Safe Installations**: "When you choose us, you choose reliability. We know the importance of dependable electrical systems for your home or business, and we can guarantee to provide solutions that you can count on."

**7. Reviews.** The shared block, see "Shared blocks" at the end of this section.

**8. Process**
- Steps: Step 1 **Give Us a Call** · Step 2 **Share Your Concerns** · Step 3 **Schedule An Appointment** · Step 4 **Sit Back & Relax**. These titles have no body copy on the homepage; the service-template step bodies, also verbatim, may be used.
- Quote: "We're committed to taking care of your family, just like ours… Our focus is on building long-lasting connections with our clients And providing premium service that exceeds expectations."

**9. Lifetime Craftsmanship Guarantee.** The shared block.

**10. Contact CTA + service area**
- H2: **Contact Us Today**
- Body: "Electrical tasks often come with challenges, but they don't need to be burdensome. Get in touch with us today and discover a top-notch electrical service that sets a new standard. Whether it's for residential or commercial needs, trust us to provide comprehensive solutions."
- Button: **Call Now** (tel).
- Town list: all 21 towns in live order, linked.

**11. Membership teaser**
- Eyebrow: "An Experience Like Never Before"
- H2: **The Exclusive Access Pass**
- Body: "Ready to elevate your electrical journey to new heights? Join us for an unparalleled experience with Colonial Electric's Exclusive Access Pass. Gain access to platinum privileges designed to enrich your life, offering exceptional value and unforgettable experiences along the way"
- CTA: **Learn More**, linking to `premium-membership/`

**12. Contact form.** The shared block.

**13. FAQs**
- H2: **FAQs**, as an accordion.
- The questions, verbatim from `pages/home.md`, with full answers:
  1. Can You Handle Residential And Commercial Electrician Needs?
  2. What's the benefit of hiring an electrician in Weymouth, MA? (Safety Assurance / Code Compliance / Quality Workmanship)
  3. Are your electricians licensed and insured?
  4. What safety protocols do you follow?
  5. Do You Provide A Warranty?
  6. How much does it cost to hire an electrician? This one has no figures, so keep it verbatim.
  7. What Should I Do In Case Of An Electrical Emergency? (intro, 6 steps, closing)
  8. Does My Project Need An Electrical Permit?
- "We provide 24/7 service" appears only inside FAQ 7. **Do not promote 24/7 anywhere else.**

**14. Footer.** See section 2.

### Shared blocks (used across templates, verbatim)

**Reviews**
- H2: **Customers Love Us, & It's For a Reason!**
- Intro: "The proof of our success is evident in the satisfaction of our customers. Rather than solely relying on our assurance, hear directly from our valued customers about their experiences. Explore the reasons our customers choose us and learn how our services have positively impacted their lives."
- Eight Google reviews, each "Posted on Google", 5 stars. Text is verbatim:
  1. **Joseph Smith**: "Scott is super responsive and professional, did great work quickly at a fair price. Highly recommend. I wanted to add in the EXCEPTIONAL customer service that Scott provided in the middle of a Nor'easter to make sure my generator was up and running smoothly. Response was immediate and he weathered the storm (literally) to make sure we had power. Best in class."
  2. **Melanie Stoller**: "I highly recommend! I called during a snow storm because my heat kept going off and got a call back within 30 minutes. The next day i got a call checking to see if my heat was working yet. Its a very reliable company!"
  3. **Charlie Robinson**: "Scott has helped out with several projects around my house. He's professional, friendly, reliable, and does great work!"
  4. **Christopher Angers**: "Very professional, excellent customer service!"
  5. **Tim Clinton**: "The service from Colonial Electric was outstanding! I called to have them come out to look at everything and they were there within a week and scheduled the work for a few days later. Scott walked me through the different options and what each one would cost and explained the difference between the work that he would do for each option. Once everything was done he showed me all of the work and made sure everything was working before leaving. I will definitely call them again if I ever need any electrical work done"
  6. **Dottie Martin**: "Scott, thank you so much for your prompt response and quick repair. I really appreciated it and will be in contact for any future needs. Thanks again for the timely rescue!"
  7. **Ellen Kinnealey**: "Microwave installation". Optional to omit.
  8. **Frank Wixted**: "Scott installed a surge protector for us recently, and he is a pleasure to work with. Scott is very conscientious and efficient. He does great work at a fair price; we will definitely call Scott again."
- Avatars: use initials in brand-colored circles. Do not hotlink googleusercontent avatars.
- **No aggregate rating or review-count badge.** None exists on the live site; do not invent "4.9 / 120 reviews".

**Lifetime Craftsmanship Guarantee**
- H2: **Find Peace of Mind With Our Lifetime Craftsmanship Guarantee**
- Paragraphs:
  1. "The Craftsmanship Guarantee offered by Colonial Electric serves as a fundamental pillar of our company's values and unwavering dedication to superior service. Understanding the significance of peace of mind to our customers, we stand firmly behind our workmanship, upholding the highest standards in every project we undertake."
  2. "Our Craftsmanship Guarantee ensures that every task we complete is done with precision, expertise, and attention to detail. From simple electrical repairs to complex installations, we take pride in delivering results that exceed expectations."
  3. "Colonial Electric's commitment to excellence extends beyond the completion of the job. In the rare event that any issues arise post-installation, our dedicated customer service team is readily available to address concerns and provide timely solutions. We believe in fostering long-term relationships with our clients, built on trust, reliability, and unparalleled craftsmanship."

**Contact form** (front end only)
- Fields: Name\*, Email\*, Phone\*, Subject\*, Message\* (180-character max with a live "0 / 180" counter), Consent\* checkbox.
- Consent text (verbatim, A2P compliance): "I Consent to Receive SMS Notifications & Occasional Marketing Communication from Colonial Electric. Message frequency varies. Message & data rates may apply. Text HELP to +1 (781) 630-5360 for assistance. You can reply STOP to unsubscribe at any time."
- Button: **Send Message**
- **Decision: option (b), custom front-end form with no network submit.** This is a pitch preview on GitHub Pages; it must not push leads into the client's live CRM. (The live form is the GoHighLevel widget `https://link.colonial-electric.com/widget/form/wVkjdlLGFrTr6qBocTaL` via `form_embed.js`; swapping it in is a production cut-over task, flagged to the client, not part of this build.)
- Behavior: client-side validation, then an inline post-validation state that says plainly the message was **not** sent. Required wording, in substance: "This is a preview site, so this form does not send messages. Please call us at (781) 287-8729." with the number as a `tel:+17812878729` link.
- **Never** show a success state that implies the message was delivered. Do not use "we'll be in touch", "message sent", "thank you for contacting us" or similar.

**Contact Us Today CTA.** The block from homepage section 10, with the **Call Now** button.

**Trust strip:** Locally Owned · Licensed, Bonded & Insured · Transparent & Upfront Pricing · Family-run Business.

**Town list:** the 21 towns, always in this order: Hanover, Milton, Norwell, Randolph, Scituate, Whitman, Pembroke, Weymouth, Abington, Braintree, Hingham, Quincy, Rockland, Hull, Plymouth, Holbrook, Marshfield, Hanson, Canton, Carver, Cohasset. Each links to `service-area/{town}-ma/`.

---

## 5. Service template (12 pages) + per-service content

### Shared section order

| # | Section | Varies per page? |
|---|---|---|
| 1 | Hero | Varies |
| 2 | Intro | Shared |
| 3 | Block A | Varies |
| 4 | Block B | Varies |
| 5 | Trust strip | Shared |
| 6 | Craftsmanship Guarantee | Shared |
| 7 | Why Choose Colonial Electric? | Shared |
| 8 | Contact Us Today CTA | Shared |
| 9 | Booking process | Shared |
| 10 | Reviews | Shared |
| 11 | Quote + service-area band | Shared |
| 12 | Contact form | Shared |
| 13 | FAQs | Varies |

1. **Hero.** Breadcrumb Home › Services › {H1}, then the H1, then the hero line. Phone and contact CTAs.
2. **Intro (verbatim):** "Whether you need it for your home, or business, Colonial Electric is your trusted partner for all your electrical service needs in Weymouth and the surrounding areas. Our team of experienced electricians is dedicated to providing top-notch residential and commercial electrical services tailored to meet your specific requirements. From simple repairs and installations to complex electrical projects, we handle it all with precision and expertise. Our commitment to quality and customer satisfaction sets us apart in the industry. When you choose Colonial Electric, you can rest assured that your electrical needs are in capable hands."
3. **Block A:** the "what / why a pro" H2 with body, bullets and image 1.
4. **Block B:** the "Colonial does it" H2 with body and image 2.
5. **Trust strip** (shared).
6. **Craftsmanship Guarantee** (shared).
7. **Why Choose Colonial Electric?**
   - Intro: the same paragraph as homepage section 6.
   - Three cards:
     - **Transparent**: "We stand out for our unwavering commitment to transparency. From project estimates to the final invoice, we ensure every aspect of our service is clear and understandable. We never keep customers in the dark!"
     - **Premium service** (live typo "serivce" fixed): "Our dedication to quality is beyond compare. We hold ourselves to the highest standards, from the materials we use to the expertise of our technician, we spare no effort in delivering premium results."
     - **Commitment to quality**: "When you choose us, you choose reliability. We know the importance of dependable electrical systems for your home or business, and we can guarantee to provide the solution that you can count on."
   - On `/generator/` this section is replaced by the 12-card services grid.
8. **Contact Us Today CTA.** The button reads **Call Now** everywhere; on `/electrical-panel-upgrade/` the live label is "Click Here", and either is acceptable.
9. **Booking process.** H2 **A Booking Process That Feels Like a Breeze**. Render the four steps once (the scrape duplicates them because of a carousel):
   - **Call**: "Connect with us effortlessly by giving us a call, Our friendly and knowledgeable staff are ready to assist you with whatever concerns or questions you may have."
   - **Share**: "Communicate your particular concerns to our staff. This ensures that we grasp the full scope of your requirements and can provide customized services."
   - **Schedule**: "Once we've discussed your concerns, take control of your time by scheduling a convenient appointment that fits seamlessly into your busy schedule."
   - **Relax**: "When your appointment is set, sit back and relax as our team takes care of the rest. Enjoy the ease of our service as we work diligently to meet your expectations"
10. **Reviews** (shared).
11. **Quote + service-area band.** The process quote and the 21 town links.
12. **Contact form** (shared).
13. **FAQs.** H2 "FAQs", four accordion items. Answers are verbatim from the page's md file.

The template also emits `Service` JSON-LD with provider = the LocalBusiness and areaServed = the 21 towns, and a `FAQPage` JSON-LD from the visible FAQs.

### Per-service content

Full body text for blocks A and B is in `pages/{slug}.md`. Use it verbatim, apart from the listed fixes.

**/electrical-outlets/**
- H1: Electrical Outlets
- Hero line: "Residential & Commercial Electrical Outlet Installation & Repair in Weymouth"
- A: "Importance of Professional Electrical Outlet Installation & Repair". Body plus "Dangers of DIY Electrical Work:" (Electrical Hazards / Code Violations / Voided Warranties) and the closing line.
- B: "Colonial Electric – The Trusted Provider For Electrical Outlet Services"
- FAQs:
  1. Why is it important to repair or replace malfunctioning electrical outlets?
  2. How do I know if my electrical outlet needs repair or replacement?
  3. Can I attempt to repair or replace the electrical outlets myself?
  4. What can I expect during the electrical outlet repair or installation process?

**/electrical-panel-upgrade/**
- H1: Electrical Panel Upgrade
- Hero line: "Residential & Commercial Electrical Panel Upgrade in Weymouth"
- A: "Is It Worth Upgrading Electrical Panel?" Body plus reasons: Increased Demand, Safety Concerns, Home Renovations, Code Compliance.
- B: "Electrical Panel Upgrade Made Easier For You". Six steps: Initial Consultation, Customized Solution, Transparent Pricing (no figures; keep it), Scheduling and Planning, Professional Installation, Testing and Inspection. Then the closing line.
- FAQs:
  1. What is involved in an electrical panel upgrade?
  2. Do you need an electrician to upgrade electrical panel?
  3. How long do electrical panels last?
  4. Should I replace or upgrade my panel?

**/surge-protection/**
- H1: Surge Protection
- Hero line: "Residential & Commercial Surge Protection in Weymouth"
- A: "What is Surge Protection & How Does It Work?"
- B: "Protect Your Home With Colonial Electric"
- FAQs:
  1. Is surge protection necessary?
  2. What devices should be surge protected?
  3. Do refrigerators need a surge protector?
  4. What happens if you don't use a surge protector?

**/ceiling-fan-installation/**
- H1: Ceiling Fan Installation
- Hero line: "Residential & Commercial Ceiling Fan Installation in Weymouth"
- A: "Dangers of DIY Ceiling Fan Installation"
  - Body plus five bullets: Improper Mounting, Incorrect Electrical Connections, Unbalanced Fans, Inadequate Clearance, Lack of Knowledge of Building Codes.
  - Then "With this in mind, hiring a professional is the best way to go."
  - **Remove the leftover AI line "Certainly, here are the dangers… in bullet form".**
- B: "Colonial Electric – Making Ceiling Fan Installation Safer and Smarter"
- FAQs:
  1. Can I install a ceiling fan myself?
  2. How much does it cost to install a ceiling fan? (no figures; keep)
  3. Are ceiling fans cheaper than AC?
  4. Are 3 or 4 blade fans better?

**/ev-charger-installation/**
- H1: EV Charger Installation
- Hero line: "Residential & Commercial EV Charger Installation in Weymouth"
- A: "EV Chargers – And Why You Should Install One"
- B: eyebrow "Recommended By Top Brands", H2 "Your Trusted EV Charger Installer"
  - **Decision: keep the truncated opening fragment verbatim**, because it is the only support for the eyebrow: "EV chargers across residential and commercial properties, earning a reputation as a trusted installer recommended by top brands in the electric vehicle industry." Then continue with the rest of the block verbatim. Do not drop it, and do not invent the missing words at its start.
  - Do not add brand logos.
- FAQs:
  1. Should I add an EV charger to my home?
  2. Do you need an electrician to charge an EV?
  3. What is a standard EV charger installation?
  4. How long does EV charger installation take?

**/whole-house-wiring-or-rewiring/**
- H1: Whole House Wiring/Rewiring
- Hero line: "Whole House Wiring/Rewiring in Weymouth". This page has no "Residential & Commercial".
- A: "The Need For Whole House Wiring/Rewiring". NFPA line, four warning-sign bullets, then the closing line.
- B: "Premium Whole House Wiring & Rewiring at Your Fingertips"
- FAQs:
  1. What constitutes hazardous wiring? (Aluminum / Knob & Tube)
  2. What is structured wiring?
  3. What is included in a full rewire?
  4. How long does whole house rewiring take?

**/electrical-inspections/**
- H1: Electrical Inspection
- Hero line: "Residential & Commercial Electrical Inspection in Weymouth"
- A: "What Is an Electrical Home Inspection?"
- B: "Comprehensive Electrical Inspection to Ensure Building Safety & Compliance"
- FAQs:
  1. What are the different categories of electrical testing?
  2. What standards govern electrical safety testing?
  3. What is the difference between inspection and testing in electrical?
  4. Why do we need electrical safety testing?

**/recessed-lighting/**
- H1: Recessed Lighting
- Hero line: "Residential & Commercial Recessed Lighting in Weymouth"
- A: "What Is Recessed Lighting & Why Should I Have One?" (live typo "Reccessed" fixed). Body plus Benefits: Space-Saving Design, Versatility, Enhanced Ambiance, Energy Efficiency.
- B: "Trust the Experts For Recessed Lighting Installation"
- FAQs:
  1. **"How much should I expect to pay for recessed lighting?" Either drop the whole Q&A, or use exactly this answer and nothing else (price-stripped; do not refill from source):** "The cost of recessed lighting can vary depending on several factors, including the type and quality of fixtures, the complexity of the installation, and any additional features or customization. It's advisable to consult with our professional electrician to get a more accurate estimate tailored to your individual needs and budget." **The "between $100 to $500" sentence and the "However, this price range can fluctuate…" sentence MUST NOT appear.**
  2. What is the purpose of recessed lighting?
  3. Is recessed lighting efficient?
  4. What are the benefits of LED recessed lighting?

**/remodels/**
- H1: Remodels
- Hero line: "Residential & Commercial Remodels in Weymouth"
- A: "Electrical Remodels & What It Involves". Rewiring; Adding Outlets and Fixtures; Upgrading Electrical Panels; Safety Inspections and Code Compliance.
- B: "Trust Colonial Electric For Your Electrical Remodeling Needs". The four-stage process: consultation, plan, implementation, completion and inspection.
- FAQs:
  1. When is electrical remodeling necessary?
  2. Can I do DIY electrical remodeling?
  3. Which electrical components should I consider remodeling?
  4. Why should I hire a professional electrician for remodeling?

**/lighting-additions/**
- H1: Lighting Additions
- Hero line: "Residential & Commercial Lighting Additions in Weymouth"
- A: "Lighting & How It Enhances Your Space". **The live body under this heading is the ceiling-fan DIY copy pasted by mistake. Do not reproduce it, and do not write a replacement.** Merge the heading with block B, or drop block A.
- B: "Colonial Electric – Illuminating Spaces & Elevating Experiences"
- FAQs:
  1. How can I add better lighting?
  2. How much does it cost to add lighting? (no figures; keep)
  3. What are the 3 purposes of lighting?
  4. What are 4 types of lighting?

**/whole-home-battery-back-up/**
- H1: Whole Home Battery Back Up
- Hero line: "Residential & Commercial Whole Home Battery Back Up in Weymouth"
- A: "Whole Home Battery VS Generators"
- B: "Whole Home Battery Back Up – Installation, Maintenance & Fixes"
- FAQs:
  1. How long will whole house battery backup last?
  2. Do battery backups use a lot of electricity?
  3. Are home battery backups worth it?
  4. How many batteries does it take to run a whole house?

**/generator/**
- H1: Generators
- Hero line: "Residential & Commercial Generator Services in Weymouth"
- A: "Why Hiring a Professional For Generators Is a Must". Opening plus six points: Expert Installation, Compliance with Codes, Troubleshooting and Repairs, Routine Maintenance, Warranty Protection, Safety and Peace of Mind.
- B: "Colonial Electric: For All Your Generator Needs (Installation, Repair, & Maintenance)". Generator Installations / Repairs / Maintenance.
- Extra product cards:
  - **Whole Home Generators**: "Our Whole Home Generators offer seamless backup power for your entire house during outages. With different sizes and capacities, they integrate directly into your electrical system for automatic operation, ensuring everything runs smoothly when needed."
  - **Portable Generators**: "Our Portable Generators are compact and versatile, perfect for outdoor events, job sites, and emergencies. Featuring easy-start engines, multiple outlets, and built-in safety features, they offer convenient backup power wherever you go."
- The middle section is the 12-card services grid, replacing Why Choose.
- **FAQs:** the live page shows the ceiling-fan FAQs by mistake. Omit the FAQ section on this page. Do not write generator FAQs.

### /permanent-outdoor-lighting/ (template variant)
- **No** intro paragraph, trust strip, guarantee, form or FAQs.
- **Kept:** Why Choose, Contact CTA, booking steps, reviews, quote and towns.
- H1: **Permanent Outdoor Lighting**
- Subhead: **Advanced LED Lighting Control for Outdoor Spaces**
- Lead: "Create the perfect ambiance for your outdoor space with our versatile and intelligent outdoor lighting system. Enjoy personalized lighting schedules, adjustable brightness, and the freedom to control your lights from anywhere."
- Four tabs or panels. Fix "Colonial Electrics" to "Colonial Electric". Body text is verbatim from `pages/permanent-outdoor-lighting.md`.
  - **Holiday Lighting**
    - Lead: "Tired of tangled lights and precarious ladders?…"
    - Customize Your Glow: Seasonal or Permanent / Expert Installation
    - Services: Christmas, Halloween, Hanukkah, Fourth of July, Valentine's Day, Ramadan, Diwali
    - Close: "Don't see your favorite holiday?…"
  - **Landscape Lighting**
    - Lead: "Let your landscape shine, day and night!"
    - Beyond the Ordinary: Custom Design & Installation / Expertly Crafted Solutions / A Wide Range of Options / Worry-Free Experience
    - Services: Garden Lights, Pathway Lighting, Accent Lights, Up and Down Lighting, Spotlights, Floodlights
    - "free consultation" CTA
  - **Permanent Lighting**
    - Lead: "Say goodbye to holiday hassles and hello to year-round brilliance!"
    - Beyond Temporary Twinkles: Expert Design & Installation / Invisible Elegance / Versatile Illumination / Smart Technology & Efficiency
    - Services: Roofline Lighting, Patio & Deck Lighting, Gazebo & Pergola Lighting, Walkway & Pathway Lighting, Pool & Lanai Lighting, Boat Dock Lighting
  - **Event Lighting**
    - Lead: "Make your events unforgettable!"
    - Beyond Ordinary Illumination: Expert Design & Installation / A Symphony of Light / Unparalleled Versatility / Indoor & Outdoor Expertise
    - Services: Entryway & Welcome Area Lighting, Dance Floor Lighting, Dining Area Lighting, Stage Lighting, Custom Gobo Projections, Marquee Lighting, Bistro Lighting
- **Eight-item feature grid.** Use the live copy with these declared fixes only: "custmoize" to "customize"; sentence-case starts in bodies; "Led" → "LED" and title-case headings (live "Led Lights" → "LED Lights", live "The most colors" → "The Most Colors"); "ip65" → "IP65" in the body.
  - Cloud Control
  - Timer & Schedules
  - Custom Animations
  - True Warm White
  - LED Lights
  - The Most Colors. The live sentence is garbled; keep only "Our unique pixel lights have the technical capability of 1.6m colors!"
  - Water Resistance (heading stays exactly this; do not append "(IP65)". IP65 stays in the verbatim body: "Our unique pixel lights and track system have an IP65 rating…")
  - Permanent Install

---

## 6. Town template (21 pages) + per-town content

All 21 town pages use one data-driven template. **Decision: option (b), per-town verbatim intro fields.** The live town intros come in several variants; the template renders each town's own live copy from data and never imposes one town's phrasing on another. Each town's data is `{name, slug, introH2, introBody, callBoxLine, servicesH2, topSites[4]}`, filled from the "Per-town intro data" table below. Sections, in order:

1. **Hero**
   - H1: **{Town} MA, Electrical Services**
   - H2: **Electrician in {Town} MA** (live Norwell "Nowell" fixed)
   - Breadcrumb Home › Service Area › {Town}
2. **Intro**
   - H2: the town's `introH2`, verbatim. When it is "(none)", render no intro H2 (the hero H2 alone heads the body).
   - Body: the town's `introBody` variant, verbatim (L, R or W below).
3. **Safety & Satisfaction**
   - Eyebrow: "Safety & Satisfaction Guaranteed"
   - H2: **For a Job Done Right, Call Colonial!**
   - Paragraphs:
     1. "When it comes to electrical systems, having someone you can trust is essential. At Colonial Electric, we prioritize your safety and satisfaction above all else. With our team of experienced electricians, you can rest assured that your electrical systems are in capable hands."
     2. "We understand the importance of having a reliable electrical system, whether it's in your home or business in {Town}, MA. That's why we go above and beyond to provide top-notch service and expertise in every project we undertake."
     3. "From routine maintenance and repairs to complex installations and upgrades, Colonial Electric is equipped to handle it all. We stay up-to-date on the latest industry standards and best practices to ensure that your electrical systems are not only functional but also safe and efficient."
     4. "Whether you're in {Town}, MA. or the surrounding areas, Colonial Electric is your trusted partner for all your electrical needs."
     5. "When you choose Colonial Electric, you're not only choosing peace of mind, but also choosing a long-term partner dedicated to your electrical needs."
4. **Call box + form**
   - "Prompt Electrical Service You Can Count On" / (781) 287-8729 / then the town's `callBoxLine` if it has one ("Colonial Electric is your Electrician in {Town} MA.") / **Get an Immediate Call Back!**
   - The shared contact form.
5. **Services**
   - H2: the town's `servicesH2`, verbatim.
   - The shared services intro paragraph and the 12 linked service cards.
6. **Town list:** the 21 towns, with the current town marked `aria-current`.
7. **Reviews** (shared).
8. **About {Town}, MA**
   - H2 "About {Town}, MA" (normalized; see Town fixes), then H3 "Top Sites and Things to Do".
   - The 4 attraction names with their 4 real landmark photos (`{Town}-MA-{Landmark}` from the 2024/11 and 2024/12 uploads).
   - **Names only.** The source has no descriptions, addresses or map data, so do not invent any.
9. **Contact Us Today CTA** (Call Now).

JSON-LD: `Electrician` with `areaServed` = {Town}, MA, plus `BreadcrumbList`.

### Per-town intro data (verbatim from each live page, with the Town fixes applied)

Intro body variants ({Town} = the town name):
- **L** (14 towns): "If you are looking for a reliable, licensed Electrician in {Town} MA, keeping the lights on is just one of many things on your plate. That's where Colonial Electric comes in. Our expert electricians are ready to tackle any electrical challenge, from routine maintenance to complex upgrades."
- **R** (Hanover, Milton, Norwell, Pembroke, Randolph, Scituate): "Electrician in {Town} MA residents can count on Colonial Electric. Our expert team is ready to tackle any local residential or commercial electrical challenge."
- **W** (Whitman only): "Colonial Electric is your Electrician in Whitman MA. Our expert team is ready to tackle any local residential or commercial electrical challenge."

Note that on Canton, Carver, Cohasset, Hanson, Holbrook and Plymouth the live page swaps the two headings: the intro H2 is the "Go-To" line and the services H2 is the plain "One-stop" line. Norwell and Randolph have no comma before "MA." in the intro H2. Keep each exactly as listed.

| Slug | introH2 | introBody | callBoxLine | servicesH2 |
|---|---|---|---|---|
| hanover-ma | (none) | R | Colonial Electric is your Electrician in Hanover MA. | Your Go-To Electrician in Hanover MA for All Things Electrical |
| milton-ma | (none) | R | Colonial Electric is your Electrician in Milton MA. | Your Go-To Electrician in Milton MA for All Things Electrical |
| norwell-ma | Your One-stop Solution For All Things Electrical in Norwell MA. | R | Colonial Electric is your Electrician in Norwell MA. | Your Go-To Electrician in Norwell MA for All Things Electrical |
| randolph-ma | Your One-stop Solution For All Things Electrical in Randolph MA. | R | Colonial Electric is your Electrician in Randolph MA. | Your Go-To Electrician in Randolph MA for All Things Electrical |
| scituate-ma | Your One-stop Solution For All Things Electrical in Scituate, MA. | R | Colonial Electric is your Electrician in Scituate MA. | Your Go-To Electrician in Scituate MA for All Things Electrical |
| whitman-ma | (none) | W | (none) | Your Go-To Electrician in Whitman MA for All Things Electrical |
| pembroke-ma | Your One-stop Solution For All Things Electrical in Pembroke, MA. | R | Colonial Electric is your Electrician in Pembroke MA. | Your Go-To Electrician in Pembroke MA for All Things Electrical |
| weymouth-ma | Your One-stop Solution For All Things Electrical in Weymouth, MA. | L | (none) | Your Go-To Electrician in Weymouth MA for All Things Electrical |
| abington-ma | Your One-stop Solution For All Things Electrical in Abington, MA. | L | (none) | Your Go-To Electrician in Abington MA for All Things Electrical |
| braintree-ma | Your One-stop Solution For All Things Electrical in Braintree, MA. | L | (none) | Your Go-To Electrician in Braintree MA for All Things Electrical |
| hingham-ma | Your One-stop Solution For All Things Electrical in Hingham, MA. | L | (none) | Your Go-To Electrician in Hingham MA for All Things Electrical |
| quincy-ma | Your One-stop Solution For All Things Electrical in Quincy, MA. | L | (none) | Your Go-To Electrician in Quincy MA for All Things Electrical |
| rockland-ma | Your One-stop Solution For All Things Electrical in Rockland, MA. | L | (none) | Your Go-To Electrician in Rockland MA for All Things Electrical |
| hull-ma | Your One-stop Solution For All Things Electrical in Hull, MA. | L | (none) | Your Go-To Electrician in Hull MA for All Things Electrical |
| plymouth-ma | Your Go-To Electrician in Plymouth MA for All Things Electrical | L | (none) | Your One-stop Solution For All Things Electrical |
| holbrook-ma | Your Go-To Electrician in Holbrook MA for All Things Electrical | L | (none) | Your One-stop Solution For All Things Electrical |
| marshfield-ma | (none) | L | (none) | Your Go-To Electrician in Marshfield MA for All Things Electrical |
| hanson-ma | Your Go-To Electrician in Hanson MA for All Things Electrical | L | (none) | Your One-stop Solution For All Things Electrical |
| canton-ma | Your Go-To Electrician in Canton MA for All Things Electrical | L | (none) | Your One-stop Solution For All Things Electrical |
| carver-ma | Your Go-To Electrician in Carver MA for All Things Electrical | L | (none) | Your One-stop Solution For All Things Electrical |
| cohasset-ma | Your Go-To Electrician in Cohasset MA for All Things Electrical | L | (none) | Your One-stop Solution For All Things Electrical |

### Per-town Top Sites (verbatim, in order)

| Slug | Top Sites and Things to Do |
|---|---|
| hanover-ma | Starland Sportsplex & Fun Park · Ryan Family Amusements · Forge Pond Park · Crazy Axes |
| milton-ma | Milton Public Library · Houghton's Pond · Blue Hills Reservation · Eustis Estate Museum and Study Center |
| norwell-ma | Norris Reservation · Hornstra Farms · Donovan Wildcat Trails Parking · Stonehouse Antique Shop |
| randolph-ma | Central Rock Gym · Bloom Thai Massage · Lindwood Memorial Park · Belcher Park |
| scituate-ma | Scituate Lighthouse · Lawson Tower · Humarock Beach · Cole Pkwy |
| whitman-ma | bikebarn · On Stage School of Performing Arts · Whitman Town Park · Hobart Pond |
| pembroke-ma | Dairy Twist · Town Landing Playground · Hidden Hollow Farm · Herring Run Historical Park |
| weymouth-ma | Cameo Theater · Union Point Sports Complex · Osprey Overlook Park · Webb Memorial Park |
| abington-ma | Roslyn Park · Bud's Goods & Provisions – South Shore Dispensary · Ames Nowell State Park · Strawberry Valley Golf Course |
| braintree-ma | X1 Boston · Space Zero · South Shore Plaza · Braintree Farmers Market |
| hingham-ma | World's End · Wompatuck State Park · Beach House at Hingham Bathing Beach · Bathing Beach |
| quincy-ma | United States Naval Shipbuilding Museum & USS Salem · The Old House at Peacefield – Adams National Historical Park · Quincy Quarries Reservation · Quincy Historical Society & Museum |
| rockland-ma | Harmon Golf & Fitness Club · Rockland Town Forest and Conservation Land · Rockland Golf Course · Magoo's Ice Cream |
| hull-ma | Bumpkin Island · Fort Andrews · Fort Revere Park · Hull Lifesaving Museum |
| plymouth-ma | Pilgrim Hall Museum · Brewster Gardens · Plimoth Patuxet Museums · Plymouth Rock |
| holbrook-ma | The Connection Cafe · Solea Ageless Beauty · Nihtila Farm · Holbrook Town Forest |
| marshfield-ma | Marshfield Kids at Play Park · Donna Green Studio · Fieldston Beach Parking · The Daniel Webster Estate & Heritage Center |
| hanson-ma | Heidi's Hollow Farm · Channell Homestead Family Farm · The Blueberry Farm · Burrage Pond Wildlife Management Area |
| canton-ma | Trillium – Canton · Blue Hills Ski Area · Canton Equestrian Center · Canton Ice House |
| carver-ma | Edaville Family Theme Park · Myles Standish State Forest · Off the Wall Kidz · Mamma Mia's Restaurants |
| cohasset-ma | South Shore Art Center · Blue Heron Fine Art · Holly Hill Farm · Cohasset Sports Complex |

Town fixes:
- "Haonver" becomes Hanover, in the Hanover services H2 (live "Your Go-To Electrician in Haonver MA for All Things Electrical").
- "Nowell" becomes Norwell, in the Norwell hero H2 (live "Electrician in Nowell MA").
- Normalize About headings to "About {Town}, MA" (live: Milton and Plymouth lack the comma, "About Milton MA" / "About Plymouth MA"; Canton, Carver and Cohasset are upper-case, "About CANTON, MA" / "About CARVER, MA" / "About COHASSET, MA").
- "Hingham Ma" becomes "Hingham MA".
- Trim the double space before "Osprey".
- Drop Pembroke's stray trailing line.

### Service-area index (`/service-area/`)
1. **Hero**
   - Eyebrow: SERVICE AREA
   - H1: **Colonial Electric — Your One-stop Solution For All Things Electrical!**
   - Lead: "Don't let electrical issues disrupt your life. We provide fast, reliable electrical services to keep your home or business running smoothly. From troubleshooting electrical problems to installing new fixtures, we're your one-stop shop for all your electrical needs."
2. **Town grid:** 21 towns in live order, linked. A stylized South Shore map is allowed if it adds no invented facts.
3. **Services:** the shared H2, intro and 12 linked cards.
4. **Reviews** (shared).
5. **Contact Us Today CTA** (Call Now).

---

## 7. Other pages

### /about-colonial-electric/ (standard)
Full verbatim text is in `pages/about-colonial-electric.md`.
1. **Hero:** H1 **About Us**.
2. **Intro:** H2 "Colonial Electric: The Dependable Source For Premium Electrical Service" with its 3 paragraphs. It opens "Welcome to Colonial Electric, an electrical company that not only delivers unparalleled expertise…".
3. **Meet the Man Behind the Magic:** H2 "Meet the Man Behind the Magic" with its intro paragraph.
4. **Founder:** eyebrow "Founder", H2 **Scott Hays**, the 3-paragraph bio verbatim, and the owner portrait (`DSC_6221-Ev-scaled.jpg`).
   - Facts in the bio: master electrician, over a decade of experience, started at 18, taught at a local college, worked as a lineman, serves residential, commercial and utility clients. **Do not add facts.**
5. **Mission and Vision:** H2 **Mission** (live typo "MISSON" fixed) and H2 **Vision**, both verbatim.
6. **Going Above and Beyond:** H2 "Going Above and Beyond Because You Deserve the Best" with its intro and 5 pillars: Personalized Service, Attention to Detail, Timely Response, Continuous Improvement (live typo "Continous" fixed), Safety First.
7. **Closing blocks, in live order:** Contact Us Today CTA (Call Now), then trust strip, then town list.

### /services/ (index)
Full verbatim text is in `pages/services.md`.
1. **Hero:** H1 **Services**, then H2 "For a Job Done Right, Call Colonial!" with its paragraph ("No more spending countless hours searching the web for an electrician…").
2. **Residential services:** H2 "Premium Residential Electrical Services Made Simple" with 2 paragraphs and 4 checks: Comprehensive Safety Solutions, Customized Offers, Top-of-the-line Materials, Guaranteed Satisfaction.
3. **Three category blocks.** Link the service names they mention:
   - **Electrical Repairs** links electrical-inspections/.
   - **Electrical Installation** links ev-charger-installation/, ceiling-fan-installation/ and electrical-outlets/.
   - **Electrical Upgrades** links electrical-panel-upgrade/, whole-house-wiring-or-rewiring/ and lighting-additions/.
4. **Shared blocks:** trust strip, then Craftsmanship Guarantee.
5. **Services grid:** the 12-card grid, plus Permanent Outdoor Lighting as an extra link.
6. **Contact Us Today CTA.**
7. **Booking process** (4 steps).
8. **Reviews and quote:** reviews, then the quote.
9. **Town list.**
10. **Contact form.**
11. **FAQs**, verbatim from services.md:
    - Should you hire an electrician for home repairs?
    - How do you know if you need an electrician? (5 bullets)
    - What are the 3 most common causes of electrical problems? (Faulty Wiring, Overloaded Circuits, Electrical Surges)

### /contact-us/ (standard)
1. **Hero:** H1 **Contact Us**.
2. **Intro:** H2 "Let Us Take the Weight Off Your Shoulders!" with 2 verbatim paragraphs.
3. **Info cards:**
   - **Location:** Colonial Electric, P.O. Box 403, Weymouth MA 02188
   - **Email:** admin@colonial-electric.com (as text, with a mailto beside it)
   - **Phone:** (781) 287-8729
   - **Operating Hours:** 8:00 AM – 4:00 PM
4. **Contact form** (shared, front end; its post-validation state says the preview does not send messages and to call, per section 4).
5. **Map (optional):** a static map image or a link to the Google Maps place "Colonial Electric inc". No iframe is required.

### /premium-membership/ (standard)
Full verbatim text is in `pages/premium-membership.md`.
1. **Hero:** H1 **Flash Pass Membership**.
2. **Intro:** H2 "Experience Platinum Privileges That's Unlike Any Other" with 3 paragraphs.
3. **Benefits:** eyebrow "Colonial Electric", H2 "“Where Quality Comes Standard”", and the line "Hover over the BOLT to see the benefits that await you!" Rebuild this as an interactive bolt with 4 benefits, which must also work on tap and keyboard.
   - Card titles are **verified live copy**: they are not in the scraped text, but they are the captions baked into the live perk images, read on 2026-10-12 from `2024/04/Front-Of-The-Line-Pass-17.png` … `-20.png` (all-caps on the image; title-cased here):
     - **Front-of-the-Line Pass** (image 17: "FRONT-OF-THE -LINE PASS"; the paragraph spells it "Front of the Line Pass"; either is fine)
     - **After-Hours Emergency Assistance** (image 18: "AFTER-HOURS EMERGENCY ASSISTANCE")
     - **Waived Diagnostic & Service Fees** (image 19: "WAIVED DIAGNOSTIC& SERVICE FEES"; missing space fixed)
     - **Annual Whole Home Electrical Safety Inspections** (image 20: "ANNUAL WHOLE HOME ELECTRICAL SAFETY INSPECTIONS")
     - `2024/05/Front-Of-The-Line-Pass-26.png` and `-28.png` are untitled stock family photos in circles; they carry no text.
   - Each benefit uses its verbatim live paragraph, in the same order. Fix the typos "all-acess", "electriciann" and "We've got your covered".
4. **Shared blocks:** Craftsmanship Guarantee, reviews, trust strip, Contact Us Today CTA, town list.
5. **Save Big:** H2 "Save Big… And Enjoy BIGGER" with its paragraph. Remove the duplicated phrase "Our exclusive access pass isn't just about…".
6. **NO membership price anywhere.** Do not reuse the `Front-Of-The-Line-Pass-*.png` images; rebuild the perk cards in HTML.

### /we-offer-financing/ (standard), price-stripped
1. **Hero:** H1 **We Offer Financing**.
2. **Intro:** "We've partnered with Wisetack to offer our customers flexible financing options, so you can pay over time rather than all at once. The application takes about a minute to complete, and checking your options does not impact your credit score."
3. **Bullets:**
   - "No hidden fees or compounding interest"
   - "Terms from 3 to 120 months*"
4. **Removed content:**
   - **Drop** "Finance projects up to $25,000*" and "APRs from 0 to 35.9%*".
   - **Drop** the worked dollar example in the disclaimer.
5. **Prequalify:** "Prequalify today with no impact to your credit and contact us to learn about financing your next project!" with a **Prequalify Now** button.
   - **Prequalify Now** links to `https://wisetack.us/#/t8ixrfe/prequalify` with `target="_blank" rel="noopener"` (captured live href, `source/pages.json`).
6. **Disclaimer** (price-stripped; use exactly this text, no ellipsis, never refill from source): "*All financing is subject to credit approval. Your terms may vary. Payment options through Wisetack are provided by our lending partners. State interest rate caps may apply. No other financing charges or participation fees. See additional terms at https://wisetack.com/faqs."
   - The live "$1,200 … $104.89 … 8.9% APR … $400 … 0% APR" example and "Offers range from 0-35.9% APR based on creditworthiness." are removed and must not appear.
7. **Town list.**

### /leave-us-a-review/ (standard)
1. **Hero:** H1 **Leave Us a Review**, with the sub "Your feedback helps our team continue delivering the reliable electrical service our community depends on."
2. **Intro paragraphs:** the 2 verbatim paragraphs.
3. **Platforms:** H2 "Choose Your Preferred Platform", with 4 cards rendered once:
   - **Google:** "Leave a Google Review" → `https://g.page/r/CTOOPMS8J1jqEBM/review` (captured live href).
   - **Facebook:** "Leave a Facebook Review". The live href is a duplicate of the Google link (a live defect); link to a Facebook search for "Colonial Electric Weymouth MA" (`https://www.facebook.com/search/top?q=Colonial%20Electric%20Weymouth%20MA`) and flag it to the client. **Do not reuse the Google URL on the Facebook card.**
   - **Nextdoor:** "Recommend Us on Nextdoor" → `https://nextdoor.com/page/scott-hays-electrician-weymouth-ma/` (captured live href).
   - **Yelp:** "Leave a Yelp Review" → `https://www.yelp.com/writeareview/biz/nWomuLCv0oADHJr8aMAcag` (captured live href, tracking query dropped).
   - Each card uses its verbatim blurb.
   - External links open in a new tab with `rel="noopener"`.
   - Hard-code these URLs. Do not construct links from the place ID or substitute platform searches for Google, Yelp or Nextdoor.
4. **Town list.**

### /calendar/ (standard)
- H1 **Calendar**, H2 "Scheduling Calendar".
- Embed the live GoHighLevel booking widget (captured in `source/pages.json`): `<iframe src="https://link.colonial-electric.com/widget/booking/vm1WWPnUuFiEePldaora" style="width:100%;border:none;overflow:hidden;" scrolling="no" title="Book an appointment with Colonial Electric">` plus `<script src="https://link.colonial-electric.com/js/form_embed.js"></script>`.
- The booking card with **Call Now** (`tel:+17812878729`) and a link to `contact-us/` is only a fallback: put it in `<noscript>` and show it if the iframe fails to load. It is not the primary content.
- Do not invent a calendar UI.

### /terms/ and /privacy/ (legal)
- Carry the full text from `pages/terms.md` and `pages/privacy.md` **verbatim**, with numbered headings, a readable measure (about 70ch) and a sticky table of contents on desktop.
- Keep these as they are and flag them to the client (section 11); do not fix them:
  - the placeholder "[e.g., promotional offers, appointment reminders, shipping updates, customer support]" in Terms §2
  - "2-5 messages per month" in Terms §5
  - the scott@ email
  - the "12 Bell Rd, Weymouth Massachusetts 02188" address in Privacy §14

### 404.html
Use the brand styling, a Call Now button and a link home. Asset paths must work from any depth.

---

## 8. Image inventory & usage

**Policy (user decision 2026-10-12: REAL PHOTOS ONLY — no AI image generation, $0 image spend)**
- Use only real Colonial photos, the live site's own images, and Colonial logo artwork. **Do not generate images with any AI model.**
- **No CSS gradients, blobs or patterns standing in for photos.** Where a section has no suitable real photo, design it as a strong typographic / iconographic block (brand motifs, inline SVG icons, real copy) instead of faking a picture.
- The live site's stock service photos may be used only if a clean (un-framed) original exists; do not reuse versions with the red/navy tilted frame baked in.
- Self-host every image under `assets/img/`. Never hotlink colonial-electric.com or googleusercontent.
- Serve images as WebP/AVIF with a JPEG fallback, using `srcset`/`sizes`, `loading="lazy"` below the fold, explicit width and height, and descriptive alt text.

**Real assets.** Download from `https://colonial-electric.com/wp-content/uploads/…`.

| Asset | Source | Use |
|---|---|---|
| Owner + wrapped van | `/Users/johnbryanliwanag/colonial-electric/source/images/owner-van.jpg` | **Homepage hero** (primary), about page, OG image |
| Owner portrait | `2025/12/DSC_6221-Ev-scaled.jpg` (1831×2560; original `DSC_6221-Ev.jpg` is 5270×7367) | About › Founder, homepage founder block, trust blocks |
| Full logo lockup (rider + badge) | `2024/12/COLONIALELECTRIC_LogoPackageWS_Both.png` (621×644) | Hero, footer, about; 320px or smaller |
| Badge logo | `2024/12/COLONIALELECTRIC_Web2_Badge.png` (250×150) | Header; an SVG trace is preferred |
| Minuteman emblem | `2024/04/cropped-Untitled-design-5.png` (512×512; not in home.html/images.txt, try fetching it; else use `-270x270` for apple-touch/192 and `-32x32` for favicon, never upscale) | Favicon / apple-touch-icon / watermark |
| Town landmark photos (84) | `2024/11/` and `2024/12/` `{Town}-MA-{Landmark}.*` (filenames include "Braintre" and "Cohassett" spellings) | Town page "Top Sites" cards, recompressed to WebP |
| Permanent-lighting tiles | `2024/11/{Holiday-Lighting-1,Landscape-Lighting,Permanent-Lighting-1,Event-Lighting-}.png` | Frame is baked in; use only if a clean original exists; otherwise a typographic tile |

**Icons:** do not reuse the live mixed `ICON-COLONIAL-ELECTRIC-*.svg` files. Use one consistent inline SVG set (Lucide or Phosphor style, or custom) in navy and red.

**Rebuild in HTML/CSS instead of images:** step numerals, the "OR" divider, arrow bullets, the Flash Pass perk cards and the license badge.

---

## 9. Requirements

- **Responsive:** must look intentional at **375, 768 and 1440 px**, with no horizontal scroll and a 16px minimum side gutter.
- **Performance (Lighthouse-minded):**
  - Target 90+ for Performance, Accessibility, Best Practices and SEO on mobile.
  - Preload the hero image and fonts; self-host or `preconnect` Google Fonts.
  - Use minimal JS, with no blocking scripts and no layout shift.
  - Keep total homepage weight around 1.5 MB or less.
- **Accessible:**
  - semantic landmarks and a single H1 per page
  - a skip link and visible focus states
  - keyboard-operable nav, dropdown, accordion, tabs and bolt
  - `prefers-reduced-motion` honored
  - form labels and errors announced
  - AA contrast
- **Click-to-call everywhere:**
  - header, hero, every CTA band and the mobile sticky bar
  - format: `tel:+17812878729`, displayed as (781) 287-8729
- **Structured data:**
  - Sitewide `Electrician` (LocalBusiness) JSON-LD:
    - name "Colonial Electric", telephone "+1-781-287-8729", email admin@colonial-electric.com
    - address Weymouth, MA 02188, US (P.O. Box 403 per the contact page)
    - areaServed: the 21 towns
    - founder: Scott Hays
    - sameAs: Instagram
    - `openingHoursSpecification`: **Mo–Fr 08:00–16:00**, matching the visible copy (contact-us "Operating Hours: 8:00 AM – 4:00 PM" and premium-membership "Our regular business hours is from 8:00 AM to 4:00 PM"). Do not use the live schema's 09:00–21:00; it goes in the client flag list only.
    - **no `priceRange`**
    - no aggregateRating
  - Add `FAQPage` and `BreadcrumbList` where relevant.
- **Meta:**
  - Per-page `<title>` from the live page title (section 2).
  - Homepage meta description (live, verbatim): "Colonial Electric - Top-notch electrical services in South Shore Massachusetts. Count on us to meet your electrical needs with the utmost quality and care."
  - Other pages have no captured meta description. Use the page's own first verbatim sentence, trimmed to 160 characters or less.
  - OG and Twitter tags with the owner-van image, and a canonical URL pointing to `https://colonial-electric.com/{slug}`.
- **Forms:** front-end only, with validation, the 180-character counter and an inline "preview does not send messages; call (781) 287-8729" state (section 4). No backend and no third-party POST. No state may imply a message was delivered.
- **SEO files:** `sitemap.xml` listing all 45 URLs, and `robots.txt` pointing to the sitemap.
- **Zero broken links:**
  - Every internal href must resolve on the GitHub Pages subpath and at root.
  - Every asset must load.
  - No `href="#"` dead ends.
  - Run a crawler/link-checker against the deployed `lightbryan26.github.io/colonial-electric/` and fix every failure before calling it done.
- **Consistency:** the header, footer, phone, license and town order are identical on all 45 pages. Generate them from shared data or partials, not by hand.

---

## 10. DON'Ts

- **No invented content.** No new claims, stats, years in business, job counts, awards, certifications, team members, testimonials, town facts or FAQ answers. New UI microcopy only, with no factual claims.
- **No prices.** Banned: currency amounts (any `$` figure), percentages/APRs, per-month payment amounts or "as low as" offers, membership prices, and `priceRange` in the schema. The recessed-lighting "$100 to $500" and the financing dollar/APR figures must be gone.
  - **Allowed** (verbatim live copy, non-numeric cost words, not price claims): "free consultation" (permanent-outdoor-lighting), "Waived Diagnostic & Service Fees" / "waived diagnostic fees" and "a complimentary service for our valued members" (premium-membership), "Transparent Pricing" (homepage pillar, panel-upgrade step) and "Terms from 3 to 120 months*" (financing; a loan term length, not a price). Critics must not fail these.
- **No changed slugs.** All 45 live slugs stay exact, with trailing slashes.
- **No copying the Dribbble shot.** Not its layout, grid, hero composition, illustrations, photos, icons or color scheme. Beat it; don't clone it.
- **No stock-looking gradients or CSS fakes in place of images.** No reuse of the framed live stock images.
- **No lorem ipsum** and no placeholder text in shipped pages, except the Terms §2 bracketed placeholder "[e.g., promotional offers, appointment reminders, shipping updates, customer support]", which is carried verbatim (section 7) and listed in the client flag list.
- **No fake reviews.** Use only the 8 real Google reviews, verbatim, with the real names. No invented aggregate rating or review count.
- **No changed phone or license.** Phone 781-287-8729 and MA Lic# 8720-A1 exactly. The SMS line 781-630-5360 appears only in consent text.
- **No 24/7 promotion** beyond the verbatim FAQ mention.
- **Do not reproduce live-site defects:**
  - the ceiling-fan copy on `/lighting-additions/` block A
  - the ceiling-fan FAQs on `/generator/`
  - the leftover "Certainly, here are…" AI line
  - the listed typos
  - the duplicated carousel steps
- **Do not redraw or recolor the logo or mascot.** Do not counterfeit the van wrap or uniforms. No AI-generated images at all.
- **No root-absolute internal URLs.** Everything is relative so it works under `/colonial-electric/`.

---

## 11. Client flag list

These are live-site issues that the build deliberately carries or works around. Raise them with the client; critics must not fail a build for following them.

1. Terms §2 bracketed placeholder "[e.g., promotional offers, appointment reminders, shipping updates, customer support]", carried verbatim.
2. Terms §5 "2-5 messages per month", carried verbatim.
3. The scott@ email in the legal pages, carried verbatim.
4. Privacy §14 address "12 Bell Rd, Weymouth Massachusetts 02188", which conflicts with the contact page's P.O. Box 403.
5. The live LocalBusiness schema's openingHours Mo–Fr 09:00–21:00 conflicts with the visible 8:00 AM–4:00 PM. The rebuild uses 08:00–16:00.
6. The live "Leave a Facebook Review" button points to the Google review link. The rebuild links to a Facebook search instead.
7. The live contact form is the GoHighLevel widget `wVkjdlLGFrTr6qBocTaL`. The preview form does not submit; swapping the widget in is a production cut-over step.
8. Live-site content defects that are not reproduced: the ceiling-fan copy under `/lighting-additions/` block A, the ceiling-fan FAQs on `/generator/`, and the price figures removed from `/we-offer-financing/` and `/recessed-lighting/`.
