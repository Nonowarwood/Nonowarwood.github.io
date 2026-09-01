/* ═══════════════════════════════════════════════════════════════
   ÉCRAN 01 — LE BUREAU
   Sélection, désélection, et déplacement des icônes à la souris
   ou au doigt. Rien d'autre : les fenêtres viendront après.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var desktop = document.getElementById('desktop');
  var icons   = [].slice.call(document.querySelectorAll('.ic'));
  if (!desktop || !icons.length) return;

  var DRAG_THRESHOLD = 4;   // px avant qu'un clic devienne un déplacement
  var current = null;

  function select(ic) {
    icons.forEach(function (i) { i.classList.toggle('is-sel', i === ic); });
  }

  // clic dans le vide : on désélectionne
  desktop.addEventListener('pointerdown', function (e) {
    if (!e.target.closest('.ic')) select(null);
  });

  icons.forEach(function (ic) {
    ic.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      select(ic);

      var rect  = desktop.getBoundingClientRect();
      var start = { x: e.clientX, y: e.clientY };
      var moved = false;
      ic.setPointerCapture(e.pointerId);

      current = {
        move: function (ev) {
          var dx = ev.clientX - start.x, dy = ev.clientY - start.y;
          if (!moved && Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;
          if (!moved) { moved = true; ic.classList.add('is-drag'); }

          // on borne la position pour qu'une icône ne sorte jamais de l'écran
          var x = Math.min(97, Math.max(3, ((ev.clientX - rect.left) / rect.width)  * 100));
          var y = Math.min(92, Math.max(4, ((ev.clientY - rect.top)  / rect.height) * 100));
          ic.style.setProperty('--x', x.toFixed(2) + '%');
          ic.style.setProperty('--y', y.toFixed(2) + '%');
        },
        up: function () {
          ic.classList.remove('is-drag');
          current = null;
        }
      };
    });

    ic.addEventListener('pointermove', function (e) { if (current) current.move(e); });
    ic.addEventListener('pointerup',     function () { if (current) current.up(); });
    ic.addEventListener('pointercancel', function () { if (current) current.up(); });
  });
})();
