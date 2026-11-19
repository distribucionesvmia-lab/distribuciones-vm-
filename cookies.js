/* Aviso de cookies: sale al entrar y pide elegir «Aceptar» o «Rechazar» (los dos botones iguales).
   Esta web no usa cookies de publicidad ni de seguimiento. Lo único que se guarda en el navegador es esta elección
   (almacenamiento técnico necesario). Con «Aceptar», además, se cuentan las visitas con un contador propio, anónimo y
   sin cookies (estadisticas.js); con «Rechazar» no se cuenta nada. La elección dura 12 meses y se puede cambiar en el
   enlace «Cookies» del pie de cada página. El aviso no bloquea la web: se puede seguir navegando sin elegir. */
(function () {
  'use strict';
  var CLAVE = 'dvm-cookies', DIAS = 365, memoria = null, caja = null;

  function leer() {
    if (memoria) return memoria;
    try {
      var r = JSON.parse(localStorage.getItem(CLAVE) || 'null');
      if (r && (r.v === 'si' || r.v === 'no') && Date.now() - r.t < DIAS * 864e5) return r.v;
    } catch (e) { /* sin almacenamiento: se pregunta en cada página */ }
    return null;
  }
  function guardar(v) {
    memoria = v;
    try { localStorage.setItem(CLAVE, JSON.stringify({ v: v, t: Date.now() })); } catch (e) { /* nada */ }
    document.dispatchEvent(new CustomEvent('dvm-cookies', { detail: v }));
  }
  window.DVM_COOKIES = { estado: leer, abrir: function () { mostrar(); } };

  function cerrar() {
    if (!caja) return;
    caja.classList.remove('is-in');
    var c = caja; caja = null;
    setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 350);
  }
  function elegir(v) { guardar(v); cerrar(); }

  function mostrar() {
    if (caja) return;
    caja = document.createElement('div');
    caja.className = 'dvm-cookies';
    caja.setAttribute('role', 'region');
    caja.setAttribute('aria-label', 'Aviso de cookies');
    caja.innerHTML =
      '<p class="dvm-cookies-t"><b>Cookies y estadísticas</b></p>' +
      '<p>Esta web no usa cookies de publicidad ni de seguimiento. Con tu permiso, contamos las visitas con un contador propio, anónimo y sin cookies, para mejorar la web. Puedes cambiarlo cuando quieras en «Cookies», al final de la página. <a href="privacidad.html">Más información</a></p>' +
      '<div class="dvm-cookies-b"><button type="button" data-c="no">Rechazar</button><button type="button" data-c="si">Aceptar</button></div>';
    caja.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-c]');
      if (b) elegir(b.getAttribute('data-c'));
    });
    document.body.appendChild(caja);
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (caja) caja.classList.add('is-in'); }); });
  }

  /* enlace «Cookies» en el pie, para cambiar la elección */
  function enlacePie() {
    var pie = document.querySelector('footer');
    if (!pie || pie.querySelector('[data-cookies]')) return;
    var ref = pie.querySelector('a[href="privacidad.html"]') || pie.querySelector('a[href="aviso-legal.html"]');
    if (!ref) return;
    var a = document.createElement('a');
    a.href = '#cookies'; a.setAttribute('data-cookies', '');
    a.textContent = 'Cookies';
    a.addEventListener('click', function (e) { e.preventDefault(); mostrar(); });
    var sep = ref.parentNode && ref.parentNode.tagName === 'P' ? ' · ' : '';
    if (sep) ref.parentNode.insertBefore(document.createTextNode(sep), ref.nextSibling);
    ref.parentNode.insertBefore(a, sep ? ref.nextSibling.nextSibling : ref.nextSibling);
  }

  function iniciar() {
    enlacePie();
    if (leer() === null) setTimeout(mostrar, 500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
