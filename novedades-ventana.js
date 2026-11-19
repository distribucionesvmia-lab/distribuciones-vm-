/* Ventana central de novedades: se abre desde la barra superior y muestra el artículo nuevo.
   Los artículos se anotan en novedades-datos.js. */
(function () {
  'use strict';
  var bar = document.querySelector('.news-bar');
  if (!bar) return;
  var lista = (window.DVM_NOVEDADES || []).filter(function (n) { return n && n.nombre; });
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
      foto = '<div class="nov-win-foto"><span class="nov-win-tag">Nuevo</span>' +
        (n.foto ? '<img src="' + esc(n.foto) + '" alt="' + esc(n.nombre) + '">' : '<span class="nov-win-estrella" aria-hidden="true">✦</span>') + '</div>';
      txt = '<div class="nov-win-txt">' + (n.fecha ? '<p class="nov-win-meta">' + esc(n.fecha) + '</p>' : '') +
        '<h2 id="nov-win-t">' + esc(n.nombre) + '</h2>' + (meta ? '<p class="nov-win-meta">' + meta + '</p>' : '') +
        (n.texto ? '<p>' + esc(n.texto) + '</p>' : '') +
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

  /* La cabecera fija de la portada y de Café Mocay se coloca debajo de la barra mientras esta se ve */
  var fija = document.querySelector('.site-header.is-fixed');
  if (fija) {
    var pos = function () { fija.style.top = Math.max(0, bar.getBoundingClientRect().bottom) + 'px'; };
    pos(); window.addEventListener('scroll', pos, { passive: true }); window.addEventListener('resize', pos);
  }
})();
