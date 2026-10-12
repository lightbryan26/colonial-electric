# Request from block-contact-cta (optional cleanup, not blocking)
File: src/css/blocks.css
Change: delete the now-unused rules under "/* CTA band + town list */" (.block--cta .lead, .town-list*, ) and "/* trust strip */" (.trust-strip*).
Why: contact-cta/town-list/trust-strip now render with new classes (.cc, .tl, .ts) styled in src/css/block-contact-cta.css; the old selectors match nothing.

# Round 2 requests from block-contact-cta
1. File: tools/blind.py — QA reports NameError 'H' (H assigned only inside the elif branch). Change: move `H=max(A.height,B.height)+80` onto its own line after the if/elif block (same fix as shots/blind_fixed.py). Not my file, so not applied.
2. File: tools/shot.mjs (optional) — element screenshots taller than the viewport get the fixed site header composited over the middle of the section. Consider hiding `.site-header`/sticky call bar (or using fullPage clip of the element box) for element shots, or header owner: avoid position:fixed overlap when capturing. #s-contact-cta is now padding-driven (no min-height), ~1150px tall at 1440.
