/* Pinta las tarjetas de novedades a partir de novedades-datos.js */
(function () {
  'use strict';
  var grid = document.getElementById('nov-grid');
  if (!grid) return;
  var lista = (window.DVM_NOVEDADES || []).filter(function (n) { return n && n.nombre; });
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  if (!lista.length) {
    grid.innerHTML = '<div class="nov-vacio"><span class="nov-estrella" aria-hidden="true">✦</span><h2>Muy pronto</h2><p>Aquí aparecerán los artículos nuevos que lleguen a la distribuidora.</p><a class="nov-btn" href="index.html#contacto">Pregúntanos por lo último</a></div>';
    return;
  }
  grid.innerHTML = lista.map(function (n) {
    var f0 = (n.fotos && n.fotos.length) ? n.fotos[0] : n.foto;
    var foto = f0 ? '<div class="nov-foto"><img src="' + esc(f0) + '" alt="' + esc(n.nombre) + '" loading="lazy" decoding="async"></div>' : '<div class="nov-foto nov-sin"><span aria-hidden="true">✦</span></div>';
    var meta = [n.marca, n.formato].filter(Boolean).map(esc).join(' · ');
    var enlace = n.enlace ? '<a class="nov-ver" href="' + esc(n.enlace) + '">Ver en el catálogo →</a>' : '<a class="nov-ver" href="index.html#contacto">Pedir información →</a>';
    return '<article class="nov-card"><span class="nov-nuevo">' + esc(n.etiqueta || 'Nuevo') + '</span>' + foto + '<div class="nov-txt">' +
      (n.fecha ? '<p class="nov-fecha">' + esc(n.fecha) + '</p>' : '') + '<h2>' + esc(n.nombre) + '</h2>' + (n.destacado ? '<p class="nov-dest">✦ ' + esc(n.destacado) + '</p>' : '') +
      (meta ? '<p class="nov-meta">' + meta + '</p>' : '') + (n.texto ? '<p>' + esc(n.texto) + '</p>' : '') +
      (n.ficha && n.ficha.length ? '<dl class="nov-ficha">' + n.ficha.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>' : '') + enlace + '</div></article>';
  }).join('');
})();
