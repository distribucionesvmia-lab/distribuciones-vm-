/* Listado de Menaje: filtros por familia, buscador y artículos agrupados. Los datos están en menaje-articulos.js (los genera _herramientas/menaje.py). */
(function () {
  'use strict';
  var data = window.MENAJE || [];
  var box = document.getElementById('mj-groups');
  var filters = document.querySelector('.mj-filters');
  var search = document.getElementById('mj-search');
  var count = document.getElementById('mj-count');
  if (!box || !filters) return;

  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var norm = function (t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var slug = function (t) { return norm(t).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };

  var groups = [];
  data.forEach(function (d) { if (groups.indexOf(d.g) < 0) groups.push(d.g); });
  var active = 'Todos';

  filters.innerHTML = ['Todos'].concat(groups).map(function (g) {
    var n = g === 'Todos' ? data.length : data.filter(function (d) { return d.g === g; }).length;
    return '<button type="button" data-group="' + esc(g) + '" aria-pressed="' + (g === 'Todos') + '">' + esc(g) + ' <span>' + n + '</span></button>';
  }).join('');

  function render() {
    var q = norm(search.value.trim());
    var shown = 0, html = '';
    groups.forEach(function (g) {
      if (active !== 'Todos' && active !== g) return;
      var items = data.filter(function (d) { return d.g === g && (!q || norm(d.n + ' ' + d.s + ' ' + d.g).indexOf(q) >= 0); });
      if (!items.length) return;
      shown += items.length;
      var subs = [];
      items.forEach(function (d) { if (subs.indexOf(d.s) < 0) subs.push(d.s); });
      html += '<section class="mj-group" id="' + slug(g) + '" aria-labelledby="h-' + slug(g) + '"><h2 id="h-' + slug(g) + '">' + esc(g) + ' <span>' + items.length + '</span></h2>';
      subs.forEach(function (s) {
        var li = items.filter(function (d) { return d.s === s; });
        if (subs.length > 1) html += '<h3>' + esc(s) + ' <span>' + li.length + '</span></h3>';
        html += '<ul class="mj-list">' + li.map(function (d) { return '<li>' + esc(d.n) + '</li>'; }).join('') + '</ul>';
      });
      html += '</section>';
    });
    box.innerHTML = html || '<p class="mj-empty">No hay artículos con ese filtro. Prueba otra búsqueda.</p>';
    count.textContent = shown + (shown === 1 ? ' artículo' : ' artículos');
  }

  filters.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-group]');
    if (!b) return;
    active = b.getAttribute('data-group');
    Array.prototype.forEach.call(filters.querySelectorAll('button'), function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    render();
  });
  search.addEventListener('input', render);
  render();
})();
