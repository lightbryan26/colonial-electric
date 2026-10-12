# Request from block-contact-cta (optional cleanup, not blocking)
File: src/css/blocks.css
Change: delete the now-unused rules under "/* CTA band + town list */" (.block--cta .lead, .town-list*, ) and "/* trust strip */" (.trust-strip*).
Why: contact-cta/town-list/trust-strip now render with new classes (.cc, .tl, .ts) styled in src/css/block-contact-cta.css; the old selectors match nothing.
