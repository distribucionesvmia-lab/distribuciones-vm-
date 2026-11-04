/* Asistente de la sección de contacto: responde las preguntas frecuentes con los datos de la propia web.
   No usa servidor ni servicios externos y no guarda lo que se escribe. Para añadir o cambiar respuestas, edita FAQ y ZONAS. */
(function () {
  'use strict';
  var root = document.getElementById('chat');
  if (!root) return;
  var log = root.querySelector('.chat-log');
  var form = root.querySelector('.chat-form');
  var input = root.querySelector('.chat-input');
  var chips = root.querySelector('.chat-chips');
  var reduce = window.VM_REDUCE ? window.VM_REDUCE.matches : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var TEL = '<a href="tel:+34635098044">635 09 80 44</a>';
  var MAIL = '<a href="mailto:oficina@distribucionesvm.es">oficina@distribucionesvm.es</a>';
  var PERSONA = 'Si prefieres hablar con una persona, llama al ' + TEL + ' de 7:00 a 15:00 o escribe a ' + MAIL + '.';

  /* días de reparto por localidad (datos facilitados por el cliente) */
  var ZONAS = [
    { n: ['medina del campo', 'medina'], d: 'todos los días, de lunes a viernes. Si pides antes de las 10:00, lo recibes ese mismo día' },
    { n: ['rueda'], d: 'todos los lunes y jueves' },
    { n: ['tordesillas'], d: 'todos los lunes y jueves' },
    { n: ['penafiel'], d: 'todos los viernes (también en los alrededores de Peñafiel)' },
    { n: ['olmedo'], d: 'todos los viernes' },
    { n: ['iscar'], d: 'todos los viernes' },
    { n: ['la seca'], d: 'todos los miércoles' },
    { n: ['serrada'], d: 'todos los miércoles' },
    { n: ['valdestillas'], d: 'todos los miércoles' },
    { n: ['viana de cega', 'viana'], d: 'todos los miércoles' },
    { n: ['mojados'], d: 'todos los miércoles' },
    { n: ['matapozuelos'], d: 'todos los miércoles' },
    { n: ['cantalapiedra'], d: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['alaejos'], d: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['nava del rey'], d: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['villaverde de medina'], d: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['arrabal de portillo', 'arrabal'], d: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['penaranda de bracamonte', 'penaranda'], d: 'un martes de cada dos, en las semanas impares' }
  ];
  var NOMBRES = { penafiel: 'Peñafiel', iscar: 'Íscar', penaranda: 'Peñaranda de Bracamonte', 'penaranda de bracamonte': 'Peñaranda de Bracamonte', 'arrabal': 'Arrabal de Portillo', viana: 'Viana de Cega', medina: 'Medina del Campo' };

  var FAQ = [
    { k: ['donde vendeis', 'a donde', 'adonde', 'repartis', 'reparto', 'repartir', 'vendeis', 'zona', 'cobertura', 'provincia', 'kilometros', 'llegais', 'llegan', 'llevais', 'servis', 'servicio a domicilio', 'domicilio'],
      a: 'Repartimos en <b>Medina del Campo y comarca, hasta 90 km a la redonda</b>, y en las provincias vecinas de Valladolid, Salamanca, Ávila y Segovia. Dime tu pueblo y te digo qué día pasamos. ' + 'Por ejemplo: «¿Repartís en Rueda?».' },
    { k: ['dias de reparto', 'que dias', 'cuando pasais', 'cuando llegais', 'calendario', 'dia de reparto', 'semana par', 'semana impar', 'quincenal'],
      a: 'Estos son los <b>días de reparto</b>:<ul><li>Medina del Campo: de lunes a viernes.</li><li>Rueda y Tordesillas: lunes y jueves.</li><li>Peñafiel y alrededores, Olmedo e Íscar: viernes.</li><li>La Seca, Serrada, Valdestillas, Viana de Cega, Mojados y Matapozuelos: miércoles.</li><li>Cantalapiedra, Alaejos, Nava del Rey, Villaverde de Medina y Arrabal de Portillo: miércoles cada 15 días, en semanas pares.</li><li>Peñaranda de Bracamonte: martes cada 15 días, en semanas impares.</li></ul>Dime tu pueblo si quieres que te lo confirme.' },
    { k: ['plazo', 'tardais', 'tarda', 'tardan', 'entrega', 'entregais', 'cuanto tarda', 'mismo dia', 'al dia siguiente', 'manana', '24 horas', '48 horas', 'rapido', 'urgente', 'recibir'],
      a: 'En <b>Medina del Campo</b>, menos de 24 h; si pides antes de las 10:00, lo recibes el mismo día. En el resto de la zona, <b>entre 24 y 48 h</b>, en días laborables de lunes a viernes.' },
    { k: ['pedido minimo', 'minimo', 'importe minimo', 'minimo de compra'],
      a: '<b>No hay pedido mínimo.</b>' },
    { k: ['gastos de envio', 'envio', 'portes', 'coste de envio', 'cobrais', 'gratis', 'cuesta el envio', 'transporte'],
      a: 'El reparto es <b>sin coste para el cliente</b>: no hay gastos de envío.' },
    { k: ['horario', 'hora', 'abris', 'abierto', 'abiertos', 'atencion', 'cerrais', 'hasta que hora', 'tarde', 'fin de semana', 'sabado', 'domingo'],
      a: 'Atendemos y gestionamos pedidos <b>de 7:00 a 15:00</b>. Pasadas las 15:00, las llamadas entrantes las atiende Valentín en su móvil. Teléfono: ' + TEL + '.' },
    { k: ['hacerme cliente', 'hacerse cliente', 'me hago cliente', 'hago cliente', 'cliente nuevo', 'quiero ser', 'cliente', 'ser cliente', 'nuevo cliente', 'darme de alta', 'alta', 'registrarme', 'como empiezo', 'como compro', 'como pido', 'primer pedido', 'empezar', 'ficha de cliente', 'documentacion', 'papeles', 'nif'],
      a: 'Hacerse cliente es muy sencillo:<ol><li><b>Nos conocemos:</b> te visitamos o hablamos contigo, te presentamos la empresa y el porfolio.</li><li><b>Te damos de alta:</b> rellenamos tu ficha de cliente con tus datos fiscales y acordamos la forma de pago (si es domiciliación, se firma el formato SEPA).</li><li><b>Primer pedido:</b> lo anotamos y te lo servimos el día acordado, entre 24 y 48 h desde tu primera llamada. Te asignamos un día de visita del comercial, semanal o quincenal.</li></ol>' + PERSONA },
    { k: ['pago', 'pagar', 'pagais', 'formas de pago', 'factura', 'domicili', 'tarjeta', 'efectivo', 'contado', 'credito', 'transferencia', 'recibo', 'sepa', 'condiciones de pago'],
      a: 'La forma de pago se <b>acuerda contigo</b>, según tu negocio y tu volumen de compra:<ul><li>Al contado en cada reparto, en efectivo o con tarjeta, con factura directa.</li><li>Albarán en cada reparto y factura resumen mensual, que se suele domiciliar en tu cuenta el día acordado: del 1 al 3 del mes, a los 15 días o a los 30 días.</li></ul>' },
    { k: ['tarifa', 'precio', 'precios', 'cuanto cuesta', 'cuanto vale', 'cuesta', 'oferta', 'presupuesto', 'catalogo de precios', 'lista de precios'],
      a: 'En la web no publicamos precios. Si lo pides, te enviamos una <b>tarifa personalizada, sin compromiso</b>: suele estar en 24 h (antes si es solo de una parte de los artículos). Pídela en el ' + TEL + ' o en ' + MAIL + '.' },
    { k: ['contacto', 'telefono', 'llamar', 'llamaros', 'correo', 'email', 'mail', 'direccion', 'donde estais', 'ubicacion', 'donde esta', 'oficina', 'almacen', 'como llegar', 'whatsapp'],
      a: 'Puedes contactarnos así:<ul><li>Teléfono: ' + TEL + ' (7:00 a 15:00). Este número no tiene WhatsApp.</li><li>Correo: ' + MAIL + '</li><li>Dirección: Cl Labradores, n.º 45, parcela 24B · 47400 Medina del Campo, Valladolid.</li></ul>' },
    { k: ['cerveza', 'cervezas', 'refresco', 'refrescos', 'licor', 'licores', 'cola', 'bebidas', 'alcohol', 'copas de licor'], a: 'También distribuimos bebidas. En la web tienes <a href="agua.html">aguas</a>, <a href="vinos.html">vinos</a> y las bebidas de <a href="pascual.html">Pascual</a>. Para cerveza, refrescos y licores, pídenos la tarifa en el ' + TEL + ' o en ' + MAIL + '.' },
    { k: ['que vendeis', 'que teneis', 'productos', 'marcas', 'catalogo', 'gama', 'surtido', 'que distribuis', 'que ofrecis'],
      a: 'Distribuimos para hostelería, entre otras gamas: <a href="pascual.html">Pascual</a> (leche, bebidas, yogures y postres), <a href="agua.html">aguas</a>, <a href="vinos.html">vinos</a>, <a href="despensa.html">despensa</a>, <a href="cafe-mocay.html">Café Mocay</a> e infusiones, <a href="menaje.html">menaje</a>, <a href="refrigerados.html">refrigerados</a> y <a href="congelados.html">congelados</a>. Si buscas algo concreto, dímelo.' },
    { k: ['cafe', 'mocay', 'infusion', 'infusiones', 'te negro'], a: 'Trabajamos <a href="cafe-mocay.html">Café Mocay</a>: café en grano, descafeinados, cápsulas, infusiones en pirámide y clásicas en bolsita, y complementos.' },
    { k: ['leche', 'pascual', 'yogur', 'yogures', 'natillas', 'batido', 'bifrutas', 'vivesoy'], a: 'En <a href="pascual.html">Pascual</a> tienes leche (Classic, en caja de 10 L y en botella de 1,5 L), bebidas vegetales Vivesoy, Bifrutas, batidos, yogures y postres.' },
    { k: ['vino', 'vinos', 'bornos', 'verdejo', 'rueda', 'ribera', 'espumoso', 'lleiroso', 'pinna'], a: 'Mira nuestra selección de <a href="vinos.html">vinos</a>: Palacio de Bornos (blancos, frizzantes, tintos de Ribera y espumosos), Pazos de Baró, Pinna Fidelis y más.' },
    { k: ['agua', 'aguas', 'bezoya', 'pellegrino', 'perrier', 'pedras', 'aquarel', 'con gas'], a: 'En <a href="agua.html">aguas</a> tienes Bezoya, Aquarel, Pedras, S.Pellegrino y Perrier.' },
    { k: ['menaje', 'copas', 'vasos', 'platos', 'cuberteria', 'vajilla', 'cristaleria', 'tazas', 'servilletas'], a: 'Tenemos un listado de <a href="menaje.html">menaje</a>: cocina, cristalería, consumibles, cubertería, complementos de mesa, cuchillería, platos y tazas.' },
    { k: ['congelado', 'congelados', 'pan', 'bolleria', 'croissant', 'panamar'], a: 'En <a href="congelados.html">congelados</a> tienes pan, bollería, croissants y salados de Panamar.' },
    { k: ['refrigerado', 'refrigerados', 'queso', 'mantequilla', 'nata', 'huevo', 'huevos', 'charcuteria', 'fiambre'], a: 'En <a href="refrigerados.html">refrigerados</a> encontrarás lácteos, quesos, huevos, preparados y charcutería.' },
    { k: ['despensa', 'conservas', 'aceite', 'aceites', 'especias', 'salsas', 'mermelada', 'legumbres', 'helios', 'calvo', 'prima', 'borges'], a: 'En <a href="despensa.html">despensa</a> hay conservas (Calvo, Villa Campo), Helios, salsas Prima, aceites, especias, legumbres Luengo y frutos secos Borges, entre otros.' },
    { k: ['cuantos anos', 'anos llevais', 'historia', 'desde cuando', 'quienes sois', 'quien sois', 'empresa', 'valentin', 'fundada', 'experiencia'], a: 'Somos <b>Distribuciones Valentín Martín</b>, de Medina del Campo. Llevamos <b>44 años</b> de experiencia, desde 1982, distribuyendo a hostelería.' },
    { k: ['facebook', 'instagram', 'redes', 'redes sociales'], a: 'Síguenos en <a href="https://www.facebook.com/share/1LfPCX2kSw/" target="_blank" rel="noopener">Facebook</a> e <a href="https://www.instagram.com/distrvalentinmartin/" target="_blank" rel="noopener">Instagram</a>.' },
    { k: ['hablar con una persona', 'persona', 'humano', 'comercial', 'visita', 'visiteis', 'atienda alguien', 'agente'], a: 'Claro. ' + PERSONA + ' Si eres cliente, tu comercial pasa el día de visita que se te asignó (semanal o quincenal).' },
    { k: ['gracias', 'perfecto', 'genial', 'vale', 'ok', 'estupendo'], a: '¡A ti! Si necesitas algo más, aquí estoy.' },
    { k: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos'], a: '¡Hola! Pregúntame lo que necesites sobre el reparto, los plazos, cómo hacerte cliente o las formas de pago.' },
    { k: ['adios', 'hasta luego', 'chao'], a: '¡Hasta pronto!' }
  ];

  var norm = function (t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim(); };
  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var has = function (text, key) { return (' ' + text + ' ').indexOf(' ' + key + ' ') >= 0 || (key.length > 5 && text.indexOf(key) >= 0); };

  function zone(text) {
    var best = null;
    ZONAS.forEach(function (z) {
      z.n.forEach(function (n) { if (has(text, n) && (!best || n.length > best.len)) best = { z: z, len: n.length, n: n }; });
    });
    return best;
  }

  function answer(raw) {
    var t = norm(raw);
    if (!t) return null;
    var z = /vino|verdejo|bornos|denominacion|blanco|tinto/.test(t) ? null : zone(t);
    var asksDays = /(reparto|repartis|llegais|llegan|pasais|vais|servis|dias|dia|cuando|venis|entregais|vendeis|llevais|zona)/.test(t);
    if (z && (asksDays || t.split(' ').length <= 4)) {
      var nombre = NOMBRES[z.n] || z.n.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
      return 'Sí, llegamos a <b>' + esc(nombre) + '</b>: ' + z.z.d + '. ' + 'El plazo de entrega es de menos de 24 h en Medina del Campo y de 24 a 48 h en el resto de la zona.';
    }
    var best = null, score = 0;
    FAQ.forEach(function (f) {
      var s = 0;
      f.k.forEach(function (k) { if (has(t, k)) s += k.split(' ').length * 2 + 1; });
      if (s > score) { score = s; best = f; }
    });
    var m = t.match(/\b(?:repartis|llegais|vendeis|servis|llevais|venis|entregais|llegan|repartir)\s+(?:en|a|hasta|por)\s+([a-z]+(?: [a-z]+){0,3})/);
    var STOP = /^(donde|mi|toda|todo|la|el|los|las|que|cuantos|cuando|domicilio|casa|hosteleria|bares|negocios|particulares|empresas|toda la)\b/;
    if (!z && m && !STOP.test(m[1])) {
      return 'No tengo <b>' + esc(m[1].replace(/\b\w/g, function (c) { return c.toUpperCase(); })) + '</b> en el listado de días de reparto. Repartimos en Medina del Campo y comarca, hasta 90 km, y en las provincias vecinas de Valladolid, Salamanca, Ávila y Segovia. Llámanos al ' + TEL + ' o escribe a ' + MAIL + ' y te confirmamos si llegamos y qué día.';
    }
    if (best && score >= 2) return best.a;
    if (/^(a )?(donde|en que|que pueblos|que localidades)/.test(t) || /pueblo|localidad/.test(t)) {
      return 'No tengo ese pueblo en el listado de días de reparto. Repartimos en Medina del Campo y comarca, hasta 90 km, y en las provincias vecinas. Llámanos al ' + TEL + ' o escribe a ' + MAIL + ' y te confirmamos si llegamos y qué día.';
    }
    return 'No estoy seguro de haberte entendido. Puedo ayudarte con el <b>reparto</b>, los <b>plazos</b>, el <b>horario</b>, las <b>formas de pago</b> o <b>cómo hacerte cliente</b>. ' + PERSONA;
  }

  function add(who, html, isHtml) {
    var d = document.createElement('div');
    d.className = 'chat-msg chat-' + who;
    if (isHtml) d.innerHTML = html; else d.textContent = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }

  function ask(text) {
    text = String(text || '').trim();
    if (!text) return;
    add('user', text, false);
    var out = answer(text);
    var show = function () { add('bot', out, true); };
    if (reduce) show(); else setTimeout(show, 350);
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); input.value = ''; input.focus(); });
  chips.addEventListener('click', function (e) { var b = e.target.closest('button[data-q]'); if (b) ask(b.getAttribute('data-q')); });
  /* mientras el chat está a la vista, el botón fijo «Llamar» (móvil) se oculta para no tapar el botón Enviar */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { document.documentElement.classList.toggle('chat-open', en[0].isIntersecting); }, { threshold: 0.05 }).observe(root);
  }
  add('bot', '¡Hola! Soy el asistente de Distribuciones Valentín. Respondo a las preguntas más frecuentes: <b>dónde repartimos</b>, <b>plazos</b>, <b>horario</b>, <b>formas de pago</b> o <b>cómo hacerte cliente</b>.', true);
})();
