/* WhatsApp de menaje: DESACTIVADO hasta confirmar que el 635 09 80 44 tiene WhatsApp ([POR CONFIRMAR], ver MENAJE-PENDIENTES.md).
   Mientras WHATSAPP esté vacío este archivo no añade nada a la página: ni el botón «Pedir por WhatsApp» ni los «Consultar por WhatsApp» de cada familia.
   Para activarlo: poner el número en formato internacional, sin «+» ni espacios (España: 34 y las 9 cifras), por ejemplo
       const WHATSAPP = '34635098044';
   y subir la versión de este script en menaje.html. El botón «Llamar» de móvil NO depende de este archivo: es el botón fijo común de la web (.call-float, lo genera cabecera.py). */
(function () {
  'use strict';
  const WHATSAPP = '';
  if (!/^\d{11,15}$/.test(WHATSAPP)) return;

  const link = text => 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);

  /* «Consultar por WhatsApp» en cada familia, con el nombre de la familia en el mensaje */
  document.querySelectorAll('#familias .pw-scene').forEach(scene => {
    const cta = scene.querySelector('.pw-e-cta');
    const label = scene.querySelector('.pw-scene-label span:last-child');
    if (!cta || !label) return;
    const familia = label.textContent.trim();
    const a = document.createElement('a');
    a.className = 'pw-link menaje-wa-link';
    a.href = link('Hola, quiero consultar por ' + familia.toLowerCase() + ' para mi local.');
    a.rel = 'noopener';
    a.textContent = 'Consultar por WhatsApp';
    a.setAttribute('aria-label', 'Consultar por WhatsApp sobre ' + familia.toLowerCase());
    cta.appendChild(a);
  });

  /* «Pedir por WhatsApp»: botón flotante; en móvil queda encima del botón fijo «Llamar» */
  const a = document.createElement('a');
  a.className = 'menaje-wa-float';
  a.href = link('Hola, quiero hacer un pedido de menaje para mi local.');
  a.rel = 'noopener';
  a.textContent = 'Pedir por WhatsApp';
  document.body.appendChild(a);
})();
