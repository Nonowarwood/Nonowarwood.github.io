/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO v2 — interactions
   1. Horloge   2. Moteur de défilement   3. Dossiers (filtrage)
   4. Vue grille / liste   5. Apparitions
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Horloge ────────────────────────────────────────────── */
  var clock = document.getElementById('clock');
  if (clock) {
    var tick = function () { clock.textContent = new Date().toLocaleTimeString('fr-FR'); };
    tick(); setInterval(tick, 1000);
  }

  /* ── 2. Moteur de défilement ───────────────────────────────────
     Chaque [data-stage] reçoit --p : 0 quand il entre par le bas,
     1 quand il sort par le haut. Le CSS s'en sert pour la mise en scène. */
  var stages = [].slice.call(document.querySelectorAll('[data-stage]'));
  if (stages.length && !reduced) {
    var ticking = false;
    var paint = function () {
      var h = window.innerHeight;
      stages.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var p = (h - r.top) / (r.height + h);
        el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(4));
      });
      ticking = false;
    };
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    paint();
  }

  /* ── 3. Dossiers : filtrer les travaux ─────────────────────── */
  var folders = [].slice.call(document.querySelectorAll('.folder'));
  var cards   = [].slice.call(document.querySelectorAll('.card'));
  var clearBt = document.getElementById('clear');
  var count   = document.getElementById('count');
  var range   = document.getElementById('range');
  var active  = null;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function apply(cat) {
    active = cat;
    var shown = 0;
    cards.forEach(function (c) {
      var ok = !cat || c.dataset.cat === cat;
      c.hidden = !ok;
      if (ok) shown++;
    });
    folders.forEach(function (f) {
      f.setAttribute('aria-pressed', String(f.dataset.cat === cat));
    });
    if (count) count.textContent = '(' + pad(shown) + ')';
    if (range) range.textContent = shown ? '01 — ' + pad(shown) : 'aucun';
    if (clearBt) clearBt.hidden = !cat;
  }

  folders.forEach(function (f) {
    var toggle = function () {
      apply(active === f.dataset.cat ? null : f.dataset.cat);
      var stage = document.getElementById('stage');
      if (stage && active) {
        stage.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      }
    };
    f.addEventListener('click', toggle);
    f.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  if (clearBt) clearBt.addEventListener('click', function () { apply(null); });

  /* ── 4. Vue grille / liste ─────────────────────────────────── */
  var stage   = document.getElementById('stage');
  var buttons = [].slice.call(document.querySelectorAll('.switch button'));
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.setAttribute('aria-selected', String(b === btn)); });
      stage.classList.remove('view-grid', 'view-list');
      stage.classList.add('view-' + btn.dataset.view);
    });
  });

  /* ── 5. Apparitions ────────────────────────────────────────── */
  var targets = document.querySelectorAll('.section-title, .card, .bars, .note, .about__inner, .receipt');
  if (reduced || !('IntersectionObserver' in window)) {
    [].forEach.call(targets, function (el) { el.classList.add('is-in'); });
    return;
  }
  [].forEach.call(targets, function (el) { el.classList.add('reveal'); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  [].forEach.call(targets, function (el) { io.observe(el); });
})();
