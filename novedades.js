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
  var multis = [];
  grid.innerHTML = lista.map(function (n, idx) {
    var fs = (n.fotos && n.fotos.length) ? n.fotos : (n.foto ? [n.foto] : []);
    var multi = fs.length > 1;
    var foto = fs.length
      ? '<div class="nov-foto' + (multi ? ' nov-multi' : '') + '">' + fs.map(function (f, i) { return '<img class="nov-im' + (i === 0 ? ' is-on' : '') + '" src="' + esc(f) + '" alt="' + (i === 0 ? esc(n.nombre) : '') + '" loading="lazy" decoding="async">'; }).join('') +
        (multi ? '<div class="nov-dots" aria-hidden="true">' + fs.map(function (f, i) { return '<span' + (i === 0 ? ' class="is-on"' : '') + '></span>'; }).join('') + '</div>' : '') + '</div>'
      : '<div class="nov-foto nov-sin"><span aria-hidden="true">✦</span></div>';
    var meta = [n.marca, n.formato].filter(Boolean).map(esc).join(' · ');
    var enlace = n.enlace ? '<a class="nov-ver" href="' + esc(n.enlace) + '">Ver en el catálogo →</a>' : '<a class="nov-ver" href="index.html#contacto">Pedir información →</a>';
    var card = '<article class="nov-card' + (multi ? ' nov-wide' : '') + '"><span class="nov-nuevo">' + esc(n.etiqueta || 'Nuevo') + '</span>' + foto + '<div class="nov-txt">' +
      (n.fecha ? '<p class="nov-fecha">' + esc(n.fecha) + '</p>' : '') + '<h2>' + esc(n.nombre) + '</h2>' + (n.destacado ? '<p class="nov-dest">✦ ' + esc(n.destacado) + '</p>' : '') + (n.precio ? '<p class="nov-precio"><b>' + esc(n.precio) + '</b> <span>' + esc(n.precioNota || '') + '</span></p>' : '') +
      (meta ? '<p class="nov-meta">' + meta + '</p>' : '') + (n.texto ? '<p>' + esc(n.texto) + '</p>' : '') +
      (n.ficha && n.ficha.length ? '<dl class="nov-ficha">' + n.ficha.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>' : '') + enlace + '</div></article>';
    /* con varias fotos, la tarjeta se queda fija mientras se hace scroll y las fotos van pasando */
    return multi ? '<div class="nov-track" data-n="' + fs.length + '" style="--nf:' + fs.length + '">' + card + '</div>' : card;
  }).join('');

  /* Scroll: la foto cambia de una a otra mientras la tarjeta está fija */
  var tracks = Array.prototype.slice.call(grid.querySelectorAll('.nov-track'));
  if (!tracks.length) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ticking = false;
  function pinta() {
    ticking = false;
    var cs = getComputedStyle(document.documentElement);
    var top = parseFloat(cs.getPropertyValue('--sh-h')) || 110;
    tracks.forEach(function (t) {
      var card = t.firstElementChild, ims = t.querySelectorAll('.nov-im'), dots = t.querySelectorAll('.nov-dots span');
      var r = t.getBoundingClientRect();
      var total = Math.max(1, (r.height - card.offsetHeight - 16) * 0.55);
      var p = Math.min(1, Math.max(0, (top + 16 - r.top) / total));
      var pos = p * (ims.length - 1);
      ims.forEach(function (im, i) {
        var fl = Math.floor(pos + 1e-6), fr = pos - fl;
        var o = reduce ? (Math.round(pos) === i ? 1 : 0) : (i <= fl ? 1 : (i === fl + 1 ? Math.min(1, Math.max(0, (fr - 0.05) / 0.4)) : 0));
        im.style.opacity = o;
        im.classList.toggle('is-on', Math.round(pos) === i);
      });
      dots.forEach(function (d, i) { d.classList.toggle('is-on', Math.round(pos) === i); });
    });
  }
  function pide() { if (!ticking) { ticking = true; requestAnimationFrame(pinta); } }
  window.addEventListener('scroll', pide, { passive: true });
  window.addEventListener('resize', pide);
  window.addEventListener('load', pide);
  pinta();
})();
