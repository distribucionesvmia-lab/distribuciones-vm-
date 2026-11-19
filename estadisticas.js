/* Estadísticas propias de la web (sin cookies, sin guardar nada en el navegador, sin servicios de terceros).
   Envía un aviso muy pequeño al contador que está en el ordenador de la empresa: la página, de dónde viene, el
   tipo de pantalla y, si la visita llega por un QR, su marca (?o=furgoneta). No se envía ni se guarda ningún dato
   personal. Si el visitante lo pide (Do Not Track / Global Privacy Control), no se cuenta.
   ACTIVAR: poner abajo la dirección del contador (la que da Tailscale Funnel). Vacía = apagado. */
(function () {
  'use strict';
  var CONTADOR = ''; /* p. ej. 'https://nombre-del-pc.tailc4a490.ts.net' */
  if (!CONTADOR) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return;
  try { if (localStorage.getItem('dvm-sin-contar') === '1') return; } catch (e) { /* sin almacenamiento: se cuenta igual */ }
  var q = new URLSearchParams(location.search);
  if (q.get('estadisticas') === 'no') { try { localStorage.setItem('dvm-sin-contar', '1'); } catch (e) { /* nada */ } return; }
  if (q.get('estadisticas') === 'si') { try { localStorage.removeItem('dvm-sin-contar'); } catch (e) { /* nada */ } }

  function enviar(d) {
    d.p = location.pathname.replace(/^\/vm-[0-9a-f]{10}(?=\/|$)/, '') || '/';
    d.w = window.innerWidth || 0;
    var cuerpo = JSON.stringify(d), url = CONTADOR.replace(/\/$/, '') + '/hit';
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([cuerpo], { type: 'text/plain' }))) return;
    } catch (e) { /* se prueba con fetch */ }
    try { fetch(url, { method: 'POST', body: cuerpo, keepalive: true, mode: 'no-cors' }); } catch (e) { /* no pasa nada */ }
  }

  var origen = (q.get('o') || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 30);
  var viene = '';
  try { viene = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) { viene = ''; }
  enviar({ k: 'v', o: origen, r: viene });

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a,button');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) enviar({ k: 'e', e: 'llamar' });
    else if (h.indexOf('mailto:') === 0) enviar({ k: 'e', e: 'correo' });
    else if (a.id === 'vmc-launcher' || (a.classList && a.classList.contains('vmc-teaser-txt'))) enviar({ k: 'e', e: 'asistente' });
  }, true);

  /* formularios (portada y Menaje): se cuenta solo si pasa la validación y se prepara el correo */
  document.addEventListener('submit', function () {
    setTimeout(function () {
      var st = document.getElementById('st') || document.querySelector('.menaje-status');
      if (st && /Se abrirá/.test(st.textContent)) enviar({ k: 'e', e: 'formulario' });
    }, 80);
  });
})();
