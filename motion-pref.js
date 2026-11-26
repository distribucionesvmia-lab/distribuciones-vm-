/* Preferencia de movimiento: respeta «reducir animaciones» del dispositivo, pero deja activarlas con un botón. */
(function () {
  'use strict';
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var forced = false;
  try { forced = localStorage.getItem('vm-motion') === 'on'; } catch (e) {}
  var reduced = mq.matches && !forced;
  window.VM_REDUCE = { matches: reduced, addEventListener: function () {} };
  if (!mq.matches) return;
  document.addEventListener('DOMContentLoaded', function () {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'vm-motion-btn';
    b.textContent = forced ? 'Reducir animaciones' : 'Activar animaciones';
    b.setAttribute('aria-label', forced ? 'Reducir las animaciones de la página' : 'Activar las animaciones de la página, que tu dispositivo tiene reducidas');
    b.addEventListener('click', function () {
      try { localStorage.setItem('vm-motion', forced ? 'off' : 'on'); } catch (e) {}
      location.reload();
    });
    var st = document.createElement('style');
    st.textContent = '.vm-motion-btn{position:fixed;z-index:60;left:16px;bottom:16px;padding:11px 18px;border:0;border-radius:999px;background:#c61819;color:#fff;font:500 .9rem/1 Jost,Arial,sans-serif;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25)}.vm-motion-btn:hover{background:#951112}';
    document.head.appendChild(st);
    document.body.appendChild(b);
  });
})();
