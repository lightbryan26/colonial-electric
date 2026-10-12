import { hero } from '../../data/home.mjs';
import { site } from '../../data/site.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc, picture } from '../../lib/html.mjs';

// Homepage hero (brief §4.2). Copy verbatim; photo = real owner + wrapped van.
// Motifs: van-wrap diagonal sweep (red → white → photo), red "ELECTRIC"-style banner, tone-on-tone star field.
// Logo: the full rider lockup (brief §3 hero/footer/about) signs the founder caption card, in true colour on its white ground.
export function render(ctx) {
  const [contact, services] = hero.ctas;
  return `<section id="s-hero" class="hero on-dark" aria-labelledby="s-hero-h">
  <div class="hero__field" aria-hidden="true"></div>
  <div class="hero__grid">
    <div class="hero__head">
      <p class="hero__eyebrow"><span class="hero__stars" aria-hidden="true">${icon('star', { size: 14 }).repeat(5)}</span><span>${esc(hero.eyebrow)}</span></p>
      <h1 class="hero__title" id="s-hero-h">
        <span class="hero__line" style="--i:0"><span>Your Trusted</span></span>
        <span class="hero__line" style="--i:1"><span>Local Electrician</span></span>
        <span class="hero__line hero__line--last" style="--i:2"><span>in <span class="hero__banner"><span>Weymouth, MA</span></span></span></span>
      </h1>
    </div>

    <figure class="hero__media">
      <span class="hero__sweep hero__sweep--red" aria-hidden="true"></span>
      <span class="hero__sweep hero__sweep--white" aria-hidden="true"></span>
      <div class="hero__photo">
        ${picture(ctx, 'owner-van', { alt: 'Founder Scott Hays standing in front of the red, white and blue Colonial Electric van', sizes: '(min-width: 2100px) 95rem, (min-width: 1860px) 128rem, (min-width: 1200px) 95rem, 100vw', priority: true, imgCls: 'hero__img' })}
      </div>
      <figcaption class="hero__cap">
        ${picture(ctx, 'logo-lockup', { cls: 'hero__cap-mark', alt: '', sizes: '(min-width: 1200px) 7.5rem, (min-width: 640px) 6rem, 4.75rem', loading: 'eager' })}
        <span class="hero__cap-txt"><span class="hero__cap-name">${esc(site.founder)}</span><span class="hero__cap-role">Founder, Colonial Electric</span></span>
      </figcaption>
    </figure>

    <div class="hero__copy">
      <h2 class="hero__sub">${esc(hero.h2)}</h2>
      <p class="hero__body">${esc(hero.body)}</p>
      <div class="hero__ctas">
        <a class="btn btn--red btn--lg" href="${ctx.r(contact.href)}">${esc(contact.label)}${icon('arrow-right', { size: 18 })}</a>
        <a class="btn btn--ghost btn--lg" href="${ctx.r(services.href)}">${esc(services.label)}</a>
      </div>
      <div class="hero__meta">
        <a class="hero__call" href="${site.tel}">
          <span class="hero__call-ic">${icon('phone', { size: 20 })}</span>
          <span class="hero__call-txt"><span class="hero__call-label">Call Us Today!</span><span class="hero__call-num">${site.phone}</span></span>
        </a>
        <p class="hero__lic">${icon('shield', { size: 18 })}<span>Licensed &amp; Insured<br><strong>${esc(site.license)}</strong></span></p>
      </div>
    </div>
  </div>
</section>`;
}
