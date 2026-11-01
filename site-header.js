/* Cabecera común: centra el menú en la sección actual cuando no cabe entero (móvil y tablet). */
(function () {
  'use strict';
  function centerNav() {
    var nav = document.querySelector('.site-header nav');
    var cur = nav && nav.querySelector('[aria-current]');
    if (!cur || nav.scrollWidth <= nav.clientWidth) return;
    var offset = cur.getBoundingClientRect().left - nav.getBoundingClientRect().left + nav.scrollLeft;
    nav.scrollLeft = offset - (nav.clientWidth - cur.offsetWidth) / 2;
  }
  centerNav();
  window.addEventListener('load', centerNav);
  window.addEventListener('resize', centerNav);
})();

/* Índice de marcas: en las páginas de producto con muchas escenas, un botón abre la lista de marcas y salta a cada una. */
(function () {
  'use strict';
  var scenes = Array.prototype.slice.call(document.querySelectorAll('.pw-scene'));
  if (scenes.length < 8) return;
  var groups = [], seen = {};
  scenes.forEach(function (sc, i) {
    var lab = sc.querySelector('.pw-scene-label span:last-child');
    var name = lab ? lab.textContent.trim().split(' · ')[0] : '';
    if (!name) return;
    if (!sc.id) sc.id = 'escena-' + (i + 1);
    if (!seen[name]) { seen[name] = true; groups.push({ name: name, id: sc.id }); }
  });
  if (groups.length < 4) return;

  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'idx-btn'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'idx-panel');
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg><span>Marcas</span>';
  var panel = document.createElement('nav');
  panel.id = 'idx-panel'; panel.className = 'idx-panel'; panel.setAttribute('aria-label', 'Índice de marcas'); panel.hidden = true;
  panel.innerHTML = '<p class="idx-title">Ir a una marca</p><ul>' + groups.map(function (g) {
    return '<li><a href="#' + g.id + '">' + g.name.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</a></li>';
  }).join('') + '</ul>';

  function close() { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', function () {
    var open = panel.hidden;
    panel.hidden = !open; btn.setAttribute('aria-expanded', String(open));
    if (open) { var a = panel.querySelector('a'); if (a) a.focus(); }
  });
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { close(); btn.focus(); } });
  document.addEventListener('click', function (e) { if (!panel.hidden && !e.target.closest('.idx-panel') && !e.target.closest('.idx-btn')) close(); });
  document.body.appendChild(btn); document.body.appendChild(panel);
})();
