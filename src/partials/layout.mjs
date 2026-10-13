import { head } from './head.mjs';
import { header } from './header.mjs';
import { footer } from './footer.mjs';
import { callbar } from './callbar.mjs';
import { site } from '../data/site.mjs';

// GTM's <noscript> fallback, immediately after <body> as Google specifies (Search Console's Tag Manager verification
// reads it there). A static tag cannot check the hostname, so it is only emitted by the production build: the cut-over
// switch site.assetOrigin === site.origin (README). Pitch builds never carry it.
const gtmNoscript = () => site.gtm && site.assetOrigin === site.origin
  ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${site.gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n`
  : '';

export function layout(ctx, main) {
  return `<!doctype html>
<html lang="en">
<head>
${head(ctx)}
</head>
<body class="tpl-${ctx.page.template}">
${gtmNoscript()}<a class="skip-link" href="#main">Skip to content</a>
${header(ctx)}
<main id="main" tabindex="-1">
${main}
</main>
${footer(ctx)}
${callbar(ctx)}
<script src="${ctx.asset('site.js')}?v=${ctx.version}" defer></script>
</body>
</html>
`;
}
