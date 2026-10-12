# Requests from block-contact-form (round 2)

1. tools/shot.mjs — element screenshots of sections taller than the viewport capture the sticky
   `.site-header` and `.callbar` painted over the middle/top of the element (Playwright centres the
   element, the sticky bars stay at the viewport top/bottom). Critics read this as a layout bug.
   Exact change: before `el.screenshot(...)` add
   `await p.addStyleTag({ content: '.site-header,.callbar{visibility:hidden!important}' });`
   (only in the selector branch). Why: section crops should show the section, not the fixed chrome.

2. tools/blind.py — NameError: `H` is only defined inside the `elif` branch. Move
   `H = max(A.height, B.height) + 80` onto its own line after the if/elif (as in shots/blind_fixed.py).
