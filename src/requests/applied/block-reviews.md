<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - APPLIED: deleted the whole `/* reviews */` group (.review-list, .review, .block--reviews, .review__*, .avatar, .review:nth-child(...) .avatar, .review p + p, .review > p:not(...)) from src/css/blocks.css. None of these selectors match anything in the built docs/ HTML; the block now uses .rv-*.

# Request from block-reviews

File: src/css/blocks.css (lines ~18-30, the "/* reviews */" group)
Change: delete the rules for .review-list, .review, .block--reviews, .review__top, .avatar, .review:nth-child(...) .avatar, .review__name, .review__src, .review__stars, .review p + p, .review > p:not(.review__stars).
Why: the reviews block now renders with its own .rv-* classes from src/css/block-reviews.css; these selectors match nothing anymore and are dead CSS. (No visual impact either way, so this is cleanup only.)
