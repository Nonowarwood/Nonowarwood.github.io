/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO v2
   1 Défilement mis en scène   2 Tiroir → classeur (filtre)
   3 Classeur → fenêtre (détail)   4 Apparitions
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* ── 1. Moteur de défilement ───────────────────────────────────
     Chaque [data-stage] reçoit --p : 0 à l'entrée, 1 à la sortie. */
  var stages = $$('[data-stage]');
  if (stages.length && !reduced) {
    var pending = false;
    var paint = function () {
      var h = innerHeight;
      stages.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var p = (h - r.top) / (r.height + h);
        el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(4));
      });
      pending = false;
    };
    var onScroll = function () {
      if (pending) return;
      pending = true; requestAnimationFrame(paint);
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    paint();
  }

  /* ── 3. La fenêtre : afficher un projet ────────────────────── */
  var rows  = $$('.row');
  var media = $('#w-media');

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function open(row) {
    if (!row) return;
    var d = row.dataset;
    rows.forEach(function (r) { r.classList.toggle('is-active', r === row); });

    $('#w-title').textContent = d.title;
    $('#w-desc').textContent  = d.desc;
    $('#w-year').textContent  = d.year;
    $('#w-type').textContent  = d.type;
    $('#s-type').textContent  = d.type;
    $('#s-tool').textContent  = d.tool;
    $('#s-year').textContent  = d.year;
    $('#s-cat').textContent   = d.cat;
    $('#w-num').textContent   = $('.row__n', row).textContent;

    var link = $('#w-link');
    link.hidden = !d.link;
    if (d.link) link.href = d.link;

    // une image si le projet en a une, sinon le cadre vide
    if (media) {
      media.innerHTML = d.img
        ? '<img src="' + d.img + '" alt="' + d.title + '">'
        : '<span>IMG</span>';
    }
  }

  rows.forEach(function (row) {
    row.addEventListener('click', function () { open(row); });
  });

  /* ── 2. Le tiroir filtre le classeur ───────────────────────── */
  var folders = $$('.folder');
  var count   = $('#count');
  var empty   = $('#empty');
  var active  = null;

  function filter(cat) {
    active = cat;
    var shown = [];
    rows.forEach(function (r) {
      var ok = !cat || r.dataset.cat === cat;
      r.parentNode.hidden = !ok;
      if (ok) shown.push(r);
    });
    folders.forEach(function (f) {
      f.setAttribute('aria-pressed', String(f.dataset.cat === cat));
    });
    if (count) count.textContent = shown.length + ' projet' + (shown.length > 1 ? 's' : '');
    if (empty) empty.hidden = shown.length > 0;
    // ouvrir le premier du dossier, pour ne jamais laisser la fenêtre orpheline
    if (shown.length && shown.indexOf($('.row.is-active')) === -1) open(shown[0]);
  }

  folders.forEach(function (f) {
    var toggle = function () {
      filter(active === f.dataset.cat ? null : f.dataset.cat);
      var sc = $('#classeur');
      if (sc && active) sc.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    };
    f.addEventListener('click', toggle);
    f.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  open($('.row.is-active') || rows[0]);
  if (count) count.textContent = rows.length + ' projets';

  /* ── 4. Apparitions ────────────────────────────────────────── */
  var targets = $$('.section-title, .binder, .window, .bars, .note, .about__inner, .receipt');
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  targets.forEach(function (el) { el.classList.add('reveal'); });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in'); io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: .06 });
  targets.forEach(function (el) { io.observe(el); });
})();
