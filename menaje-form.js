/* Formulario de menaje: valida y abre el programa de correo con el mensaje preparado (mailto), igual que el de la portada.
   No hay servidor: no se envía nada hasta que la persona pulsa «Enviar» en su programa de correo. */
(function () {
  'use strict';
  var EMAIL = 'oficina@distribucionesvm.es';
  var f = document.getElementById('menaje-form'), st = document.getElementById('mf-status');
  if (!f || !st) return;
  function setError(el, bad) { if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); }
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var nombre = f.elements.nombre, contacto = f.elements.contacto, ok = f.elements.ok;
    var faltan = [];
    if (!nombre.value.trim()) faltan.push([nombre, 'tu nombre']);
    if (!contacto.value.trim()) faltan.push([contacto, 'un teléfono o correo']);
    if (!ok.checked) faltan.push([ok, 'la aceptación del tratamiento de datos']);
    [nombre, contacto, ok].forEach(function (el) { setError(el, faltan.some(function (x) { return x[0] === el; })); });
    st.className = 'menaje-status';
    if (faltan.length) {
      st.className = 'menaje-status is-error';
      st.textContent = 'Falta ' + faltan.map(function (x) { return x[1]; }).join(', ') + '.';
      faltan[0][0].focus();
      return;
    }
    var body = 'Nombre: ' + nombre.value.trim() + '\nContacto: ' + contacto.value.trim() + '\n\n' + f.elements.mensaje.value.trim();
    st.textContent = 'Se abrirá tu programa de correo con el mensaje preparado. Si no se abre, escríbenos a ' + EMAIL + '.';
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Consulta de menaje desde la web') + '&body=' + encodeURIComponent(body);
  });
})();
