/* Ventana central de novedades: se abre desde la barra superior y muestra el artículo nuevo.
   Los artículos se anotan en novedades-datos.js. */
(function () {
  'use strict';
  var bar = document.querySelector('.news-bar');
  if (!bar) return;
  var lista = (window.DVM_NOVEDADES || []).filter(function (n) { return n && n.nombre; });
  /* La barra roja anuncia el primer artículo que tenga «anuncio» */
  var anun = lista.filter(function (n) { return n.anuncio; })[0];
  if (anun) { var tx = bar.querySelector('.news-txt'); if (tx) tx.textContent = anun.anuncio; var tg = bar.querySelector('.news-tag'); if (tg && anun.etiqueta) tg.textContent = anun.etiqueta; }
  var enPagina = /novedades\.html$/.test(location.pathname);
  var idx = 0, modal = null, previo = null;
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function contenido() {
    var n = lista[idx], foto, txt;
    if (!n) {
      foto = '<div class="nov-win-foto"><span class="nov-win-estrella" aria-hidden="true">✦</span></div>';
      txt = '<div class="nov-win-txt"><h2 id="nov-win-t">Muy pronto</h2><p>Aquí aparecerán los artículos nuevos que lleguen a la distribuidora.</p>' +
        '<div class="nov-win-acc"><a href="index.html#contacto">Pregúntanos por lo último</a></div></div>';
    } else {
      var meta = [n.marca, n.formato].filter(Boolean).map(esc).join(' · ');
      var fs = n.fotos && n.fotos.length ? n.fotos : (n.foto ? [n.foto] : []);
      foto = '<div class="nov-win-foto"><span class="nov-win-tag">' + esc(n.etiqueta || 'Nuevo') + '</span>' +
        (fs.length ? '<img class="nov-win-img" src="' + esc(fs[0]) + '" alt="' + esc(n.nombre) + '">' : '<span class="nov-win-estrella" aria-hidden="true">✦</span>') +
        (fs.length > 1 ? '<div class="nov-win-thumbs">' + fs.map(function (f, i) { return '<button type="button" class="nov-th' + (i === 0 ? ' is-on' : '') + '" data-src="' + esc(f) + '" aria-label="Ver foto ' + (i + 1) + '"><img src="' + esc(f) + '" alt=""></button>'; }).join('') + '</div>' : '') + '</div>';
      txt = '<div class="nov-win-txt">' + (n.fecha ? '<p class="nov-win-meta">' + esc(n.fecha) + '</p>' : '') +
        '<h2 id="nov-win-t">' + esc(n.nombre) + '</h2>' + (n.destacado ? '<p class="nov-win-dest">✦ ' + esc(n.destacado) + '</p>' : '') + (meta ? '<p class="nov-win-meta">' + meta + '</p>' : '') +
        (n.texto ? '<p>' + esc(n.texto) + '</p>' : '') +
        (n.ficha && n.ficha.length ? '<dl class="nov-ficha">' + n.ficha.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>' : '') +
        '<div class="nov-win-acc">' + (n.enlace ? '<a href="' + esc(n.enlace) + '">Ver en el catálogo</a>' : '<a href="index.html#contacto">Pedir información</a>') +
        (enPagina ? '' : '<a class="sec" href="novedades.html">Todas las novedades</a>') + '</div>' +
        (lista.length > 1 ? '<div class="nov-win-nav"><button type="button" data-d="-1" aria-label="Anterior">←</button><span>' + (idx + 1) + ' / ' + lista.length + '</span><button type="button" data-d="1" aria-label="Siguiente">→</button></div>' : '') + '</div>';
    }
    return '<button type="button" class="nov-win-cerrar" aria-label="Cerrar">×</button>' + foto + txt;
  }
  function pinta() { modal.querySelector('.nov-win').innerHTML = contenido(); var c = modal.querySelector('.nov-win-cerrar'); if (c) c.focus(); }
  function abre() {
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'nov-modal';
      modal.innerHTML = '<div class="nov-win" role="dialog" aria-modal="true" aria-labelledby="nov-win-t"></div>';
      document.body.appendChild(modal);
      modal.addEventListener('click', function (e) {
        var t = e.target;
        if (t === modal || t.closest('.nov-win-cerrar')) { cierra(); return; }
        var th = t.closest('.nov-th');
        if (th) { modal.querySelector('.nov-win-img').src = th.getAttribute('data-src'); modal.querySelectorAll('.nov-th').forEach(function (x) { x.classList.toggle('is-on', x === th); }); return; }
        var b = t.closest('.nov-win-nav button');
        if (b) { idx = (idx + Number(b.getAttribute('data-d')) + lista.length) % lista.length; pinta(); }
        else if (t.closest('.nov-win-acc a') && enPagina) { cierra(); }
      });
    }
    previo = document.activeElement; idx = 0; pinta();
    modal.classList.add('is-open'); document.documentElement.style.overflow = 'hidden';
  }
  function cierra() { if (!modal) return; modal.classList.remove('is-open'); document.documentElement.style.overflow = ''; if (previo && previo.focus) previo.focus(); }
  bar.addEventListener('click', function (e) { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return; e.preventDefault(); abre(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) cierra(); });
})();
