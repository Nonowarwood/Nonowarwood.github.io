/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO v2 — interactions
   Trois choses seulement : l'horloge, le sélecteur de vue,
   et les apparitions au défilement.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Horloge de la barre de menu ──────────────────────────── */
  var clock = document.getElementById('clock');
  if (clock) {
    var tick = function () {
      clock.textContent = new Date().toLocaleTimeString('fr-FR');
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ── Sélecteur de vue : grille / bureau / liste ────────────── */
  var stage   = document.getElementById('stage');
  var buttons = document.querySelectorAll('.switch button');

  if (stage && buttons.length) {
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.dataset.view;

        buttons.forEach(function (b) {
          b.setAttribute('aria-selected', String(b === btn));
        });

        stage.classList.remove('view-grid', 'view-desk', 'view-list');
        stage.classList.add('view-' + view);
      });
    });
  }

  /* ── Apparitions au défilement ─────────────────────────────── */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.section-title, .card, .bars, .note, .about__inner, .receipt');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  targets.forEach(function (el) { el.classList.add('reveal'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  targets.forEach(function (el) { observer.observe(el); });
})();
