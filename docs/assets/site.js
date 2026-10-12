/* ===== base.js ===== */
/* Colonial Electric — base behaviour (header, menus, forms). No dependencies. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;

  /* ---------- Sticky mobile call bar: tucked away while the page hero is on screen ----------
     Markup starts with .is-hidden (no flash over hero/intro copy on first paint); header.css shows it when scripting is off. */
  var callbar = doc.querySelector('[data-callbar]');
  if (callbar) {
    var hero = doc.querySelector('main > section');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { callbar.classList.toggle('is-hidden', entries[entries.length - 1].isIntersecting); }).observe(hero);
    } else {
      callbar.classList.remove('is-hidden');
    }
  }

  /* ---------- Below-the-fold images: native lazy for the first paint, then warm the rest ----------
     Markup keeps loading="lazy" (brief: lazy below the fold). Once the page has loaded and gone idle, the remaining
     lazy images are switched to eager so nothing below the fold is ever a blank frame (fast scroll, full-page
     capture, print). Without JS the browser's own lazy loading still applies. */
  var warmed = false;
  var warm = function () {
    if (warmed) return; warmed = true;
    doc.querySelectorAll('img[loading="lazy"]').forEach(function (img) { img.loading = 'eager'; });
  };
  window.addEventListener('beforeprint', warm);
  var afterLoad = function () { if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 1200 }); else setTimeout(warm, 200); };
  if (doc.readyState === 'complete') afterLoad(); else window.addEventListener('load', afterLoad);

  /* ---------- Header scrolled state ---------- */
  var header = doc.querySelector('[data-header]');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { header.classList.toggle('is-scrolled', window.scrollY > 24); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* ---------- Services dropdown (hover intent + button toggle + Esc) ---------- */
  doc.querySelectorAll('[data-drop]').forEach(function (item) {
    var btn = item.querySelector('.nav__caret'), timer;
    var set = function (open) { item.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    var canHover = window.matchMedia('(hover: hover)').matches;
    if (canHover) {
      item.addEventListener('mouseenter', function () { clearTimeout(timer); set(true); });
      item.addEventListener('mouseleave', function () { clearTimeout(timer); timer = setTimeout(function () { set(false); }, 180); });
    }
    btn.addEventListener('click', function () { set(!item.classList.contains('is-open')); });
    item.addEventListener('keydown', function (e) { if (e.key === 'Escape' && item.classList.contains('is-open')) { set(false); btn.focus(); } });
    item.addEventListener('focusout', function (e) { if (!item.contains(e.relatedTarget)) set(false); });
    doc.addEventListener('click', function (e) { if (!item.contains(e.target)) set(false); });
  });

  /* ---------- Mobile menu ---------- */
  var menu = doc.querySelector('[data-menu]'), opener = doc.querySelector('[data-menu-open]');
  if (menu && opener) {
    var closer = menu.querySelector('[data-menu-close]');
    var focusables = function () { return Array.prototype.slice.call(menu.querySelectorAll('a[href], button:not([disabled])')).filter(function (el) { return el.offsetParent !== null; }); };
    var open = function () {
      menu.hidden = false; menu.classList.add('is-open'); root.classList.add('menu-open');
      opener.setAttribute('aria-expanded', 'true'); closer.focus();
    };
    var close = function () {
      menu.classList.remove('is-open'); menu.hidden = true; root.classList.remove('menu-open');
      opener.setAttribute('aria-expanded', 'false'); opener.focus();
    };
    opener.addEventListener('click', open);
    closer.addEventListener('click', close);
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    menu.querySelectorAll('.mnav__toggle').forEach(function (t) {
      t.addEventListener('click', function () {
        var sub = doc.getElementById(t.getAttribute('aria-controls')), on = t.getAttribute('aria-expanded') !== 'true';
        t.setAttribute('aria-expanded', String(on)); sub.hidden = !on;
      });
    });
    window.matchMedia('(min-width: 1180px)').addEventListener('change', function (m) { if (m.matches && !menu.hidden) close(); });
  }

  /* ---------- Contact forms: validation + 180 counter. NEVER submits (preview build). ---------- */
  doc.querySelectorAll('[data-cform]').forEach(function (form) {
    var msg = form.querySelector('textarea'), count = form.querySelector('[data-count]'), status = form.querySelector('[data-cform-status]');
    if (msg && count) msg.addEventListener('input', function () { count.textContent = msg.value.length + ' / 180'; });
    var rules = {
      name: function (v) { return v.trim() ? '' : 'Please enter your name.'; },
      email: function (v) { return !v.trim() ? 'Please enter your email.' : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'); },
      phone: function (v) { return !v.trim() ? 'Please enter your phone number.' : (v.replace(/\D/g, '').length >= 10 ? '' : 'Please enter a valid phone number.'); },
      subject: function (v) { return v.trim() ? '' : 'Please enter a subject.'; },
      message: function (v) { return v.trim() ? '' : 'Please enter a message.'; },
    };
    var check = function (el) {
      var err = doc.getElementById(el.id + '-err'), m = el.type === 'checkbox' ? (el.checked ? '' : 'Please check the consent box to continue.') : (rules[el.name] ? rules[el.name](el.value) : '');
      if (err) err.textContent = m;
      el.setAttribute('aria-invalid', m ? 'true' : 'false');
      return !m;
    };
    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value || el.type === 'checkbox') check(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      form.querySelectorAll('input, textarea').forEach(function (el) { if (!check(el) && !firstBad) firstBad = el; });
      if (firstBad) { status.hidden = true; firstBad.focus(); return; }
      status.hidden = false; status.focus();
    });
  });
})();
