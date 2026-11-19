/* Portadas del catálogo: la foto se desplaza un poco en sentido contrario al cursor para dar sensación de relieve (solo con ratón) */
(function () {
  'use strict';
  if (!window.matchMedia || !matchMedia('(hover:hover) and (pointer:fine)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  Array.prototype.forEach.call(document.querySelectorAll('.cards .card'), function (c) {
    c.addEventListener('mousemove', function (e) {
      var r = c.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.setProperty('--px', (-x * 16).toFixed(1) + 'px');
      c.style.setProperty('--py', (-y * 16).toFixed(1) + 'px');
    });
    c.addEventListener('mouseleave', function () { c.style.removeProperty('--px'); c.style.removeProperty('--py'); });
  });
})();
