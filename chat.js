/* Asistente de Distribuciones VM: icono flotante abajo a la izquierda en todas las páginas, aviso breve («Hola, soy Pablo…») y panel de chat.
   Funciona en el navegador, sin servidor ni servicios externos, y no envía ni guarda en ningún servidor lo que se escribe
   (solo recuerda en la pestaña, hasta que se cierra, el pueblo, el negocio y la lista de interés).
   - Entiende conjugaciones y erratas (compara por raíces y tolera una letra de diferencia).
   - Recuerda el pueblo del cliente durante la conversación y calcula su próximo reparto con la fecha real.
   - Busca productos concretos en el catálogo de la web (carga los datos de las páginas la primera vez que hace falta).
   - Si la pregunta tiene dos partes, contesta las dos. Si no sabe algo, no se inventa nada: remite al teléfono y al correo.
   Para cambiar o añadir respuestas, edita INTENTS y ZONAS. */
(function () {
  'use strict';
  var root = document.getElementById('chat');
  if (!root) {
    var holder = document.createElement('div');
    holder.innerHTML =
      '<button type="button" id="vmc-launcher" class="vmc-launcher" aria-label="Abrir el asistente de Distribuciones VM" aria-expanded="false" aria-controls="chat">' +
        '<img src="assets/asistente-pablo.webp" width="64" height="64" alt="" decoding="async">' +
        '<span class="vmc-badge" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M12 3C6.9 3 3 6.4 3 10.6c0 2.2 1 4.1 2.7 5.5-.1 1.2-.5 2.3-1.3 3.3a.5.5 0 0 0 .5.8c1.9-.2 3.4-.9 4.5-1.6.8.2 1.6.3 2.6.3 5.1 0 9-3.4 9-7.6S17.100 3 12 3Z"/></svg></span></button>' +
      '<div class="vmc-teaser" id="vmc-teaser" hidden><button type="button" class="vmc-teaser-txt">Hola, soy <b>Pablo</b>, el asistente. ¿Te ayudo?</button><button type="button" class="vmc-teaser-x" aria-label="Cerrar el aviso">×</button></div>' +
      '<section class="chat vmc" id="chat" role="dialog" aria-modal="false" aria-labelledby="chat-title" tabindex="-1" hidden>' +
        '<header class="vmc-head"><span class="vmc-avatar" aria-hidden="true"><img src="assets/asistente-pablo.webp" width="44" height="44" alt="" decoding="async"></span><div><h3 id="chat-title">Pablo · Asistente virtual</h3><p class="chat-note">Distribuciones VM · respuestas automáticas. No guardamos lo que escribes.</p></div><button type="button" class="vmc-close" aria-label="Cerrar el asistente">×</button></header>' +
        '<div class="chat-log" role="log" aria-live="polite" aria-label="Conversación"></div>' +
        '<div class="chat-chips" role="group" aria-label="Preguntas frecuentes">' +
          ['¿A dónde repartís?', '¿Qué días repartís?', '¿Cuánto tardáis?', '¿Cuándo me llega?', '¿Qué leche me recomendáis?', '¿Hay pedido mínimo?', '¿Cómo me hago cliente?', '¿Formas de pago?', '¿Horario?'].map(function (q) { return '<button type="button" data-q="' + q + '">' + q + '</button>'; }).join('') + '</div>' +
        '<form class="chat-form" autocomplete="off"><label class="sr" for="chat-input">Escribe tu pregunta</label><input id="chat-input" class="chat-input" type="text" placeholder="Escribe tu pregunta" maxlength="200"><button class="chat-send" type="submit">Enviar</button></form>' +
      '</section>';
    while (holder.firstChild) document.body.appendChild(holder.firstChild);
    root = document.getElementById('chat');
  }
  var launcher = document.getElementById('vmc-launcher'), teaser = document.getElementById('vmc-teaser');
  var log = root.querySelector('.chat-log');
  var form = root.querySelector('.chat-form');
  var input = root.querySelector('.chat-input');
  var chips = root.querySelector('.chat-chips');
  var reduce = window.VM_REDUCE ? window.VM_REDUCE.matches : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var TEL = '<a href="tel:+34635098044">635 09 80 44</a>';
  var MAIL = '<a href="mailto:oficina@distribucionesvm.es">oficina@distribucionesvm.es</a>';
  var PERSONA = 'Si prefieres hablar con una persona, llama al ' + TEL + ' de 7:00 a 15:00 o escribe a ' + MAIL + '.';
  var PLAZO = 'El plazo de entrega es de menos de 24 h en Medina del Campo y de 24 a 48 h en el resto de la zona, en días laborables de lunes a viernes.';

  /* ---------- utilidades de texto ---------- */
  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var norm = function (t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim(); };
  var SLUG = function (t) { return String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48); };
  var cap = function (t) { return t.replace(/\b\w/g, function (c) { return c.toUpperCase(); }); };
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 1) return 2;
    var p = [], i, j;
    for (j = 0; j <= b.length; j++) p[j] = j;
    for (i = 1; i <= a.length; i++) {
      var prev = p[0]; p[0] = i;
      for (j = 1; j <= b.length; j++) { var t = p[j]; p[j] = Math.min(p[j] + 1, p[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = t; }
    }
    return p[b.length];
  }
  /* ¿alguna palabra del mensaje empieza por la raíz? (con una errata de tolerancia si la raíz tiene 8 letras o más) */
  function hasStem(tokens, stem) {
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t.indexOf(stem) === 0) return true;
      if (stem.length >= 8 && t.length >= stem.length - 1 && lev(t.slice(0, stem.length), stem) <= 1) return true;
    }
    return false;
  }

  /* ---------- fechas (hora de Madrid) ---------- */
  function madrid() {
    var p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, weekday: 'short' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, h: (+p.hour) % 24, min: +p.minute, wd: { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 }[p.weekday] };
  }
  function isoWeek(dt) {
    var d = new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    return Math.ceil(((d - new Date(Date.UTC(d.getUTCFullYear(), 0, 1))) / 86400000 + 1) / 7);
  }
  var fechaTxt = function (dt) { return new Intl.DateTimeFormat('es-ES', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' }).format(dt); };

  /* ---------- reparto por localidad (datos facilitados por el cliente) ---------- */
  var L = [1, 2, 3, 4, 5];
  var ZONAS = [
    { n: ['medina del campo', 'medina'], nombre: 'Medina del Campo', dias: L, medina: true, txt: 'todos los días, de lunes a viernes' },
    { n: ['rueda'], nombre: 'Rueda', dias: [1, 4], txt: 'todos los lunes y jueves' },
    { n: ['tordesillas'], nombre: 'Tordesillas', dias: [1, 4], txt: 'todos los lunes y jueves' },
    { n: ['penafiel'], nombre: 'Peñafiel (y alrededores)', dias: [5], txt: 'todos los viernes' },
    { n: ['olmedo'], nombre: 'Olmedo', dias: [5], txt: 'todos los viernes' },
    { n: ['iscar'], nombre: 'Íscar', dias: [5], txt: 'todos los viernes' },
    { n: ['la seca'], nombre: 'La Seca', dias: [3], txt: 'todos los miércoles' },
    { n: ['serrada'], nombre: 'Serrada', dias: [3], txt: 'todos los miércoles' },
    { n: ['valdestillas'], nombre: 'Valdestillas', dias: [3], txt: 'todos los miércoles' },
    { n: ['viana de cega', 'viana'], nombre: 'Viana de Cega', dias: [3], txt: 'todos los miércoles' },
    { n: ['mojados'], nombre: 'Mojados', dias: [3], txt: 'todos los miércoles' },
    { n: ['matapozuelos'], nombre: 'Matapozuelos', dias: [3], txt: 'todos los miércoles' },
    { n: ['cantalapiedra'], nombre: 'Cantalapiedra', dias: [3], par: 'par', txt: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['alaejos'], nombre: 'Alaejos', dias: [3], par: 'par', txt: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['nava del rey'], nombre: 'Nava del Rey', dias: [3], par: 'par', txt: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['villaverde de medina'], nombre: 'Villaverde de Medina', dias: [3], par: 'par', txt: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['arrabal de portillo', 'arrabal'], nombre: 'Arrabal de Portillo', dias: [3], par: 'par', txt: 'un miércoles de cada dos, en las semanas pares' },
    { n: ['penaranda de bracamonte', 'penaranda'], nombre: 'Peñaranda de Bracamonte', dias: [2], par: 'impar', txt: 'un martes de cada dos, en las semanas impares' }
  ];
  function findZone(t) {
    var best = null;
    ZONAS.forEach(function (z) {
      z.n.forEach(function (n) {
        var hit = (' ' + t + ' ').indexOf(' ' + n + ' ') >= 0 || (n.length > 6 && t.indexOf(n) >= 0);
        if (hit && (!best || n.length > best.len)) best = { z: z, len: n.length };
      });
    });
    if (!best) {
      var ws = t.split(' ').filter(Boolean);
      ZONAS.forEach(function (z) {
        z.n.forEach(function (n) {
          if (n.length < 5) return;
          var k = n.split(' ').length;
          for (var i = 0; i + k <= ws.length; i++) {
            var w = ws.slice(i, i + k).join(' ');
            if (w.length >= 5 && lev(w, n) <= 1 && (!best || n.length > best.len)) best = { z: z, len: n.length };
          }
        });
      });
    }
    return best && best.z;
  }
  /* próximo reparto en una localidad, a partir de ahora */
  function proxima(z) {
    var now = madrid(), base = new Date(Date.UTC(now.y, now.m - 1, now.d)), i, dt;
    if (z.medina) {
      if (now.wd >= 1 && now.wd <= 5 && now.h < 10) return 'Si haces el pedido <b>ahora</b>, antes de las 10:00, lo recibes <b>hoy mismo</b> en Medina del Campo.';
      for (i = 1; i < 8; i++) { dt = new Date(base.getTime() + i * 86400000); if (dt.getUTCDay() >= 1 && dt.getUTCDay() <= 5) break; }
      return 'Si haces el pedido ahora, te llegaría <b>' + fechaTxt(dt) + '</b> (en Medina del Campo, menos de 24 h; si pides antes de las 10:00 de un día laborable, lo recibes ese mismo día).';
    }
    for (i = 1; i < 60; i++) {
      dt = new Date(base.getTime() + i * 86400000);
      if (z.dias.indexOf(dt.getUTCDay()) < 0) continue;
      var w = isoWeek(dt);
      if (z.par && (w % 2 === 0 ? 'par' : 'impar') !== z.par) continue;
      return 'El próximo reparto en <b>' + esc(z.nombre) + '</b> es el <b>' + fechaTxt(dt) + '</b>' + (z.par ? ' (semana n.º ' + w + ', ' + z.par + ')' : '') + '. Para recibirlo ese día, haz tu pedido con 24 a 48 h de antelación, de 7:00 a 15:00. Confírmalo al pedir.';
    }
    return null;
  }
  function zonaTxt(z) {
    return 'Sí, llegamos a <b>' + esc(z.nombre) + '</b>: ' + z.txt + '. ' + (z.medina ? 'Si pides antes de las 10:00, lo recibes el mismo día.' : PLAZO);
  }

  /* ---------- intenciones (cada grupo de raíces debe aparecer COMPLETO en el mensaje) ---------- */
  var INTENTS = {
    saludo: { k: [['que', 'tal'], ['hola'], ['buenas'], ['buenos', 'dias'], ['saludos'], ['hey']], solo: true, a: function () { return '¡Hola! Pregúntame lo que necesites sobre reparto, plazos, formas de pago o cómo hacerte cliente.'; } },
    gracias: { k: [['agradec'], ['ok'], ['gracias'], ['perfecto'], ['genial'], ['estupendo'], ['vale']], solo: true, a: function () { return '¡A ti! Si necesitas algo más, aquí estoy.'; } },
    adios: { k: [['ciao'], ['hasta', 'pronto'], ['nos', 'vemos'], ['adios'], ['hasta', 'luego'], ['chao']], solo: true, a: function () { return '¡Hasta pronto!'; } },
    zona: { k: [['reparti'], ['llegai'], ['llegan'], ['cobertur'], ['provinci'], ['kilometr'], ['zona'], ['llevai'], ['enviai'], ['envian'], ['mandai'], ['traei'], ['servis'], ['servimos'], ['servir'], ['donde', 'vend'], ['domicilio']],
      a: function (c) { return c.zone ? zonaTxt(c.zone) : 'Repartimos en <b>Medina del Campo y comarca, hasta 90 km a la redonda</b>, y en las provincias vecinas de Valladolid, Salamanca, Ávila y Segovia. Dime tu pueblo y te digo qué día pasamos. Por ejemplo: «¿Repartís en Rueda?».'; } },
    dias: { k: [['dias', 'pasai'], ['pasai', 'por'], ['pasan', 'por'], ['dia', 'pasa'], ['cuando', 'pasan'], ['dias', 'pasan'], ['dias', 'entrega'], ['dia', 'repart'], ['que', 'dias'], ['cuando', 'pasai'], ['cuando', 'llegai'], ['calendario'], ['quincenal'], ['semana', 'par'], ['semana', 'impar'], ['lunes'], ['martes'], ['miercoles'], ['jueves'], ['viernes'], ['sabado'], ['domingo'], ['finde'], ['fin', 'semana']],
      a: function (c) {
        if (c.zone) return zonaTxt(c.zone);
        if (c.has(['sabado']) || c.has(['domingo']) || c.has(['finde']) || c.has(['fin', 'semana'])) return 'Repartimos <b>de lunes a viernes</b>. Los fines de semana no hay reparto.';
        return 'Estos son los <b>días de reparto</b>:<ul><li>Medina del Campo: de lunes a viernes.</li><li>Rueda y Tordesillas: lunes y jueves.</li><li>Peñafiel y alrededores, Olmedo e Íscar: viernes.</li><li>La Seca, Serrada, Valdestillas, Viana de Cega, Mojados y Matapozuelos: miércoles.</li><li>Cantalapiedra, Alaejos, Nava del Rey, Villaverde de Medina y Arrabal de Portillo: miércoles cada 15 días, en semanas pares.</li><li>Peñaranda de Bracamonte: martes cada 15 días, en semanas impares.</li></ul>Dime tu pueblo y te lo confirmo.';
      } },
    plazo: { k: [['hora', 'pedir'], ['hora', 'pido'], ['llegue', 'hoy'], ['cuanto', 'tiempo'], ['cuanto', 'tarda'], ['tiempo', 'entrega'], ['cuando', 'entregai'], ['plazo'], ['tarda'], ['entrega'], ['mismo', 'dia'], ['dia', 'siguiente'], ['rapid'], ['urgent'], ['24', 'hora'], ['48', 'hora']],
      a: function (c) { return c.zone ? (c.zone.medina ? 'En <b>Medina del Campo</b>, menos de 24 h; si pides antes de las 10:00, lo recibes el mismo día.' : 'A <b>' + esc(c.zone.nombre) + '</b> la entrega es de <b>24 a 48 h</b>, en días de reparto (' + c.zone.txt + ').') : 'En <b>Medina del Campo</b>, menos de 24 h; si pides antes de las 10:00, lo recibes el mismo día. En el resto de la zona, <b>entre 24 y 48 h</b>, en días laborables de lunes a viernes.'; } },
    proxima: { k: [['cuando', 'trae'], ['hoy', 'pedido'], ['cuando', 'mandai'], ['cuando', 'entregai'], ['cuando', 'llega'], ['cuando', 'recib'], ['proxim', 'repart'], ['proxim', 'entreg'], ['pido', 'hoy'], ['pido', 'manana'], ['si', 'pido'], ['cuando', 'toca'], ['cuando', 'pasa']], needsZone: true,
      a: function (c) { return proxima(c.zone) || 'Llámanos al ' + TEL + ' y te confirmamos tu próximo reparto.'; } },
    minimo: { k: [['minimo']], a: function () { return '<b>No hay pedido mínimo.</b>'; } },
    envio: { k: [['coste'], ['costo'], ['cobran'], ['cobro'], ['gasto', 'envio'], ['envio'], ['porte'], ['gratis'], ['cobrai'], ['coste', 'envio'], ['transporte']], a: function () { return 'El reparto es <b>sin coste para el cliente</b>: no hay gastos de envío.'; } },
    ahora: { k: [['abierto', 'ahora'], ['abris', 'ahora'], ['atendeis', 'ahora'], ['estais', 'ahora'], ['ahora', 'atend']], peso: 4,
      a: function () {
        var n = madrid();
        if (n.wd >= 1 && n.wd <= 5 && n.h >= 7 && n.h < 15) return 'Sí, <b>ahora mismo estamos atendiendo</b> (7:00 a 15:00). Llámanos al ' + TEL + '.';
        return 'Ahora estamos <b>fuera del horario de atención</b> (7:00 a 15:00). Si llamas al ' + TEL + ', te atiende Valentín en su móvil.';
      } },
    horario: { k: [['por', 'la', 'tarde'], ['tarde'], ['por', 'la', 'manana'], ['horario'], ['hora'], ['abri'], ['abiert'], ['atencion'], ['cerrai'], ['hasta', 'hora']],
      a: function () { return 'Atendemos y gestionamos pedidos <b>de 7:00 a 15:00</b>. Pasadas las 15:00, las llamadas entrantes las atiende Valentín en su móvil. Teléfono: ' + TEL + '.'; } },
    cliente: { k: [['alta'], ['abrir', 'cuenta'], ['nueva', 'cuenta'], ['cliente'], ['registr'], ['empez'], ['como', 'compr'], ['primer', 'pedido'], ['ficha'], ['document'], ['nif'], ['papeles'], ['hacerme'], ['hacerse'], ['darme', 'alta'], ['dar', 'alta']],
      a: function () { return 'Hacerse cliente es muy sencillo:<ol><li><b>Nos conocemos:</b> te visitamos o hablamos contigo, te presentamos la empresa y el porfolio.</li><li><b>Te damos de alta:</b> rellenamos tu ficha de cliente con tus datos fiscales y acordamos la forma de pago (si es domiciliación, se firma el formato SEPA).</li><li><b>Primer pedido:</b> lo anotamos y te lo servimos el día acordado, entre 24 y 48 h desde tu primera llamada. Te asignamos un día de visita del comercial, semanal o quincenal.</li></ol>' + PERSONA; } },
    pedido: { k: [['como', 'pedir'], ['hacer', 'pedido'], ['hago', 'pedido'], ['realizar', 'pedido'], ['encargar'], ['como', 'pido'], ['quiero', 'pedir']],
      a: function () { return 'Los pedidos se gestionan <b>de 7:00 a 15:00</b>. Si ya eres cliente, llama al ' + TEL + ' o díselo a tu comercial en su día de visita. Si aún no lo eres, te damos de alta en 3 pasos (pregúntame «¿cómo me hago cliente?»).'; } },
    pago: { k: [['paga'], ['datafono'], ['bizum'], ['cheque'], ['pagare'], ['pago'], ['pagar'], ['pagai'], ['factura'], ['domicili'], ['tarjeta'], ['efectivo'], ['contado'], ['credito'], ['transferencia'], ['recibo'], ['sepa']],
      a: function () { return 'La forma de pago se <b>acuerda contigo</b>, según tu negocio y tu volumen de compra:<ul><li>Al contado en cada reparto, en efectivo o con tarjeta, con factura directa.</li><li>Albarán en cada reparto y factura resumen mensual, que se suele domiciliar en tu cuenta el día acordado: del 1 al 3 del mes, a los 15 días o a los 30 días.</li></ul>'; } },
    tarifa: { k: [['cuanto', 'sale'], ['lista', 'precios'], ['cuanto', 'es'], ['tarifa'], ['precio'], ['cuanto', 'cuesta'], ['cuanto', 'vale'], ['cuanto', 'cobrai'], ['cuesta'], ['oferta'], ['presupuesto']],
      a: function () { return 'En la web no publicamos precios. Si lo pides, te enviamos una <b>tarifa personalizada, sin compromiso</b>: suele estar en 24 h (antes si es solo de una parte de los artículos). Pídela en el ' + TEL + ' o en ' + MAIL + '.'; } },
    whatsapp: { k: [['whatsapp'], ['wasap'], ['guasap']], peso: 4, a: function () { return 'El ' + TEL + ' <b>no tiene WhatsApp</b>. Puedes llamarnos de 7:00 a 15:00 o escribir a ' + MAIL + '.'; } },
    contacto: { k: [['llamo'], ['llamada'], ['encuentr'], ['encontr'], ['contact'], ['como', 'os', 'contacto'], ['contacto'], ['telefono'], ['llamar'], ['correo'], ['email'], ['mail'], ['direccion'], ['donde', 'estai'], ['ubicacion'], ['oficina'], ['almacen'], ['como', 'llegar']],
      a: function () { return 'Puedes contactarnos así:<ul><li>Teléfono: ' + TEL + ' (7:00 a 15:00).</li><li>Correo: ' + MAIL + '</li><li>Dirección: Cl Labradores, n.º 45, parcela 24B · 47400 Medina del Campo, Valladolid.</li></ul>'; } },
    incidencia: { k: [['no','llega'], ['incomplet'], ['pedido', 'mal'], ['mal', 'pedido'], ['traido', 'mal'], ['trajeron', 'mal'], ['llegado', 'mal'], ['no', 'coincide'], ['no', 'llegad'], ['llego', 'mal'], ['mal', 'estado'], ['problema'], ['reclam'], ['queja'], ['devol'], ['equivoc'], ['falta'], ['roto'], ['defect'], ['no', 'llego'], ['error']],
      a: function () { return 'Lamentamos el problema. Para una incidencia con un pedido, llámanos al ' + TEL + ' de 7:00 a 15:00 o escribe a ' + MAIL + ', indicando el nombre de tu negocio y el albarán, y lo revisamos.'; } },
    empresa: { k: [['antigued'], ['trayectoria'], ['empezasteis'], ['cuantos', 'anos'], ['anos', 'llevai'], ['historia'], ['desde', 'cuando'], ['quienes', 'sois'], ['empresa'], ['fundad'], ['experiencia']],
      a: function () { return 'Somos <b>Distribuciones Valentín Martín</b>, de Medina del Campo. Llevamos <b>44 años</b> de experiencia, desde 1982, distribuyendo a hostelería.'; } },
    redes: { k: [['facebook'], ['instagram'], ['redes']], a: function () { return 'Síguenos en <a href="https://www.facebook.com/share/1LfPCX2kSw/" target="_blank" rel="noopener">Facebook</a> e <a href="https://www.instagram.com/distrvalentinmartin/" target="_blank" rel="noopener">Instagram</a>.'; } },
    persona: { k: [['persona'], ['humano'], ['comercial'], ['visita'], ['agente'], ['hablar', 'con']], a: function () { return 'Claro. ' + PERSONA + ' Si eres cliente, tu comercial pasa el día de visita que se te asignó (semanal o quincenal).'; } },
    productos: { k: [['que', 'marcas'], ['que', 'gamas'], ['que', 'vendei'], ['que', 'tenei'], ['producto'], ['marca'], ['catalogo'], ['gama'], ['surtido'], ['distribui'], ['ofrecei']],
      a: function () { return 'Distribuimos para hostelería, entre otras gamas: <a href="pascual.html">Pascual</a> (leche, bebidas, yogures y postres), <a href="agua.html">aguas</a>, <a href="vinos.html">vinos</a>, <a href="despensa.html">despensa</a>, <a href="cafe-mocay.html">Café Mocay</a> e infusiones, <a href="menaje.html">menaje</a>, <a href="refrigerados.html">refrigerados</a> y <a href="congelados.html">congelados</a>. Dime qué buscas y lo miro.'; } },
    bebidas: { k: [['cocacola'], ['coca'], ['fanta'], ['pepsi'], ['sprite'], ['tonica'], ['gaseosa'], ['sidra'], ['whisky'], ['ron'], ['ginebra'], ['vodka'], ['anis'], ['cerveza'], ['refresco'], ['licor'], ['cola'], ['alcohol'], ['bebida']], cat: true,
      a: function () { return 'También distribuimos bebidas. En la web tienes <a href="agua.html">aguas</a>, <a href="vinos.html">vinos</a> y las bebidas de <a href="pascual.html">Pascual</a>. Para cerveza, refrescos y licores, pídenos la tarifa en el ' + TEL + ' o en ' + MAIL + '.'; } },
    cafe: { k: [['cafe'], ['mocay'], ['infusion'], ['te', 'negro']], cat: true, a: function () { return 'Trabajamos <a href="cafe-mocay.html">Café Mocay</a>: café en grano, descafeinados, cápsulas, infusiones en pirámide y clásicas en bolsita, y complementos.'; } },
    pascual: { k: [['zumo'], ['leche'], ['pascual'], ['yogur'], ['natilla'], ['batido'], ['bifruta'], ['vivesoy'], ['movit'], ['brik'], ['colacao'], ['nata'], ['mantequilla']], cat: true, a: function () { return 'En <a href="pascual.html">Pascual</a> tienes:<ul><li><b>Leche para hostelería:</b> <a href="pascual.html#leche-intense">Intense</a> (la más vendida), <a href="pascual.html#bag-in-box-10l">Classic en caja de 10 L</a>, <a href="pascual.html#leche-classic-botella">Classic en botella</a>, <a href="pascual.html#leche-extra-creme">Extra Crème</a> y <a href="pascual.html#sin-lactosa-barista">sin lactosa Barista</a>.</li><li><b>Leche para el hogar:</b> <a href="pascual.html#leche-hogar">botella de 1,5 L</a>, <a href="pascual.html#leche-brik">brik</a>, <a href="pascual.html#sin-lactosa">sin lactosa</a> y <a href="pascual.html#movit">Movit con calcio</a>.</li><li><a href="pascual.html#batidos-vidrio">Batidos en vidrio</a> y <a href="pascual.html#batidos-brik">en brik</a>, <a href="pascual.html#natas">natas</a> y <a href="pascual.html#mantequillas">mantequillas</a>.</li><li><a href="pascual.html#vivesoy">Vivesoy</a>, <a href="pascual.html#bifrutas">Bifrutas</a>, <a href="pascual.html#zumos">zumos</a>, <a href="pascual.html#yogures">yogures</a> y <a href="pascual.html#natillas">postres</a>.</li></ul>'; } },
    lechecafe: { k: [['leche', 'profesional'], ['leche', 'bares'], ['leche', 'restaurante'], ['leche', 'cafe'], ['leche', 'cafeteria'], ['leche', 'barista'], ['leche', 'vaporiz'], ['leche', 'espum'], ['leche', 'capuchin'], ['leche', 'cortado'], ['leche', 'hosteleria'], ['leche', 'recomend'], ['mejor', 'leche'], ['leche', 'mas', 'vendid'], ['leche', 'barra'], ['leche', 'emulsion'], ['emulsion']], peso: 1.3,
      a: function () { var n = state.negocio ? 'Para tu <b>' + esc(state.negocio) + '</b>, ' : 'Para <b>hostelería y café</b> '; return n + 'tenemos leche Pascual Profesional:<ul><li><a href="pascual.html#leche-intense">Intense 1,5 L</a>: la <b>más vendida</b>.</li><li><a href="pascual.html#leche-classic-10l">Classic semidesnatada</a>: la de precio más ajustado, en <a href="pascual.html#leche-classic-botella">botella de 1,5 L</a> o en <a href="pascual.html#bag-in-box-10l">caja de 10 L</a> para llenar el enfriador.</li><li><a href="pascual.html#leche-extra-creme">Extra Crème 1,5 L</a>: lleva más proteína láctea y <b>emulsiona mejor</b>.</li><li><a href="pascual.html#sin-lactosa-barista">Sin lactosa Barista</a>: semidesnatada, emulsiona mejor en el vaporizador de la cafetera que la sin lactosa normal.</li></ul>Para tarifa o pedido: ' + TEL + '.'; } },
    lactosa: { k: [['lactosa'], ['intoleran']], a: function () { return 'Tenemos leche <b>sin lactosa</b>: para el hogar, en <a href="pascual.html#sin-lactosa">brik de 1 L</a> (entera, semidesnatada y desnatada) y semidesnatada de 200 ml. Para hostelería, <a href="pascual.html#sin-lactosa-barista">sin lactosa Barista</a>, que emulsiona mejor en el vaporizador de la cafetera.'; } },
    vinos: { k: [['vino'], ['bornos'], ['verdejo'], ['ribera'], ['espumoso'], ['lleiroso'], ['pinna']], cat: true, a: function () { return 'Mira nuestra selección de <a href="vinos.html">vinos</a>: Palacio de Bornos (blancos, frizzantes, tintos de Ribera y espumosos), Pazos de Baró, Pinna Fidelis y más.'; } },
    aguas: { k: [['agua'], ['bezoya'], ['pellegrino'], ['perrier'], ['pedras'], ['aquarel']], cat: true, a: function () { return 'En <a href="agua.html">aguas</a> tienes Bezoya, Aquarel, Pedras, S.Pellegrino y Perrier.'; } },
    menaje: { k: [['menaje'], ['copa'], ['vaso'], ['plato'], ['cuberteria'], ['vajilla'], ['cristaleria'], ['taza'], ['servilleta']], cat: true, a: function () { return 'Tenemos un listado de <a href="menaje.html">menaje</a>: cocina, cristalería, consumibles, cubertería, complementos de mesa, cuchillería, platos y tazas.'; } },
    congelados: { k: [['congelado'], ['bolleria'], ['croissant'], ['panamar']], cat: true, a: function () { return 'En <a href="congelados.html">congelados</a> tienes pan, bollería, croissants y salados de Panamar.'; } },
    refrigerados: { k: [['refrigerado'], ['queso'], ['mantequilla'], ['nata'], ['huevo'], ['charcuteria'], ['fiambre'], ['embutido']], cat: true, a: function () { return 'En <a href="refrigerados.html">refrigerados</a> encontrarás lácteos, quesos, huevos, preparados y charcutería. Las <a href="pascual.html#natas">natas</a> y <a href="pascual.html#mantequillas">mantequillas</a> Pascual están en su página.'; } },
    despensa: { k: [['despensa'], ['conserva'], ['aceite'], ['especia'], ['salsa'], ['mermelada'], ['legumbre'], ['helios'], ['calvo'], ['prima'], ['borges']], cat: true, a: function () { return 'En <a href="despensa.html">despensa</a> hay conservas (Calvo, Villa Campo), Helios, salsas Prima, aceites, especias, legumbres Luengo y frutos secos Borges, entre otros.'; } }
  };

  /* ---------- catálogo de productos (se carga la primera vez que se pregunta por uno) ---------- */
  var CAT = null, catPromise = null, SECS = [];
  var PAGINAS = { pascual: 'Pascual', agua: 'Aguas', vinos: 'Vinos', despensa: 'Despensa', congelados: 'Congelados', refrigerados: 'Refrigerados', menaje: 'Menaje' };
  function cargarCatalogo() {
    if (catPromise) return catPromise;
    var items = [];
    SECS = [];
    var fuentes = [['helios-products.js', null], ['villacampo-products.js', null], ['pascual-products.js', 'pascual'], ['agua-products.js', 'agua'], ['vinos-products.js', 'vinos'], ['despensa-products.js', 'despensa'], ['congelados-products.js', 'congelados'], ['menaje-articulos.js', 'menaje']];
    var viejo = window.ProductWorld;
    var actual = null;
    window.ProductWorld = { init: function (cfg) {
      (cfg.sections || []).forEach(function (s) {
        var anc = s.id || SLUG((s.family || '') + ' ' + (s.title || ''));
        SECS.push({ p: actual, a: anc, ctx: s.title || s.family || '', text: [s.eyebrow, s.description, s.note, s.bottom].filter(Boolean).join('. ') });
        [].concat(s.products || [], s.variants || [], s.frames || [], s.product ? [s.product] : []).forEach(function (p) { if (p && p.name) items.push({ n: p.name, p: actual, f: s.family || '', a: anc, d: p.description || '', sec: s.title || '' }); });
      });
    } };
    var cargar = function (src, pag) {
      actual = pag;
      return fetch(src).then(function (r) { return r.ok ? r.text() : ''; }).then(function (t) { if (t) (new Function(t))(); }).catch(function () {});
    };
    var refri = fetch('refrigerados-products.js').then(function (r) { return r.text(); }).then(function (t) {
      var re = /\{group:'([^']*)',brand:'([^']*)',name:'((?:[^'\\]|\\.)*)'/g, m;
      while ((m = re.exec(t))) items.push({ n: m[3].split("\\'").join("'"), p: 'refrigerados', f: m[2], a: 'referencias' });
    }).catch(function () {});
    catPromise = fuentes.reduce(function (pr, f) { return pr.then(function () { return cargar(f[0], f[1]); }); }, Promise.resolve()).then(function () { return refri; }).then(function () {
      window.ProductWorld = viejo;
      (window.MENAJE || []).forEach(function (m) { items.push({ n: m.n, p: 'menaje', f: m.g, a: 'referencias' }); });
      CAT = items.map(function (it) { return { n: it.n, p: it.p, f: it.f, a: it.a, d: it.d || '', sec: it.sec || '', t: norm(it.n + ' ' + it.f).split(' ') }; });
    });
    return catPromise;
  }
  /* ---------- buscador de todo el contenido de la web ----------
     Se construye la primera vez que hace falta: lee el texto de las 9 páginas (títulos, párrafos, listas, preguntas frecuentes)
     y las descripciones de todos los productos y escenas. Contesta citando la propia web y enlazando a la sección, nunca inventa. */
  var PAGINAS_WEB = ['index', 'pascual', 'agua', 'vinos', 'despensa', 'cafe-mocay', 'menaje', 'refrigerados', 'congelados'];
  var NOMBRES = { index: 'Inicio', pascual: 'Pascual', agua: 'Aguas', vinos: 'Vinos', despensa: 'Despensa', 'cafe-mocay': 'Café Mocay', menaje: 'Menaje', refrigerados: 'Refrigerados', congelados: 'Congelados' };
  var STOP = /^(el|la|los|las|un|una|unos|unas|de|del|al|y|o|u|e|en|con|por|para|que|como|cual|cuales|cuanto|cuantos|cuanta|cuantas|cuando|donde|quien|quienes|es|son|soy|somos|eres|ser|estar|esta|estan|estoy|hay|tiene|tienen|teneis|tenemos|tengo|me|te|se|lo|le|les|mi|tu|su|nos|os|vosotros|ustedes|yo|muy|mas|menos|si|no|ni|pero|porque|ya|tambien|asi|esto|eso|este|ese|esa|esos|esas|aqui|ahi|hacer|hace|hacen|haceis|puedo|puede|pueden|podeis|quiero|queria|necesito|saber|dime|decir|digame|sobre|entre|desde|hasta|sus|nuestro|nuestra|vuestro|vuestra|algo|algun|alguna|todo|toda|todos|todas|otro|otra|otros|otras|bien|favor|hola|buenas|gracias|cosa|cosas|ahora|vez|dos|tres|ver|hablar|informacion|info|vale|ok|san|formato|formatos|tamano|tamanos|tipo|tipos|clases|variedades|opciones|caracteristicas|pesa|pesan|lleva|llevan|incluye|incluyen|significa|funciona|funcionan|sirve|sirven|tiene|tienen)$/;
  var IDX = null, idxPromise = null;
  var stemW = function (w) { w = w.length > 4 ? w.replace(/(es|s)$/, '') : w; return w.length >= 5 && /[aeiou]$/.test(w) ? w.slice(0, -1) : w; };
  var tokensW = function (t) { return norm(t).split(' ').filter(function (w) { return w.length >= 3 && !STOP.test(w); }); };
  function cargarIndice() {
    if (idxPromise) return idxPromise;
    idxPromise = cargarCatalogo().then(function () {
      var chunks = [], vistos = {};
      var meter = function (c) {
        var txt = String(c.text || '').replace(/\s+/g, ' ').trim();
        var ctx = String(c.ctx || '').replace(/\s+/g, ' ').trim();
        if (txt.length < 12 && !ctx) return;
        var clave = c.p + '|' + c.a + '|' + ctx + '|' + txt;
        if (vistos[clave]) return; vistos[clave] = 1;
        chunks.push({ p: c.p, a: c.a || '', ctx: ctx, text: txt, tt: tokensW(ctx), tx: tokensW(ctx + ' ' + txt + ' ' + (c.extra || '')) });
      };
      SECS.forEach(function (x) { if (x.p) meter(x); });
      CAT.forEach(function (it) { if (it.d && it.p) meter({ p: it.p, a: it.a, ctx: etiqueta(it), text: it.d, extra: it.sec }); });
      var paginas = PAGINAS_WEB.map(function (pg) {
        return fetch(pg + '.html').then(function (r) { return r.ok ? r.text() : ''; }).then(function (h) {
          if (!h) return;
          var doc = new DOMParser().parseFromString(h, 'text/html');
          [].slice.call(doc.querySelectorAll('script,style,noscript,header,footer,nav,aside,[hidden],.chat,.vmc,svg,template,.sr,.pw-scene-label,.pw-opening-bottom')).forEach(function (e) { e.remove(); });
          [].slice.call(doc.querySelectorAll('br')).forEach(function (b) { b.replaceWith(' '); });
          var ctx = '', listas = [];
          [].slice.call(doc.body.querySelectorAll('h1,h2,h3,h4,summary,p,li,figcaption,dd,td,address,blockquote')).forEach(function (el) {
            var t = el.textContent.replace(/\s+/g, ' ').trim();
            if (!t) return;
            var anc = el.closest('[id]');
            if (/^(H1|H2|H3|H4|SUMMARY)$/.test(el.tagName)) { ctx = t; if (el.tagName === 'SUMMARY') return; meter({ p: pg, a: anc ? anc.id : '', ctx: t, text: '' }); return; }
            if (el.tagName === 'LI' && el.parentElement) {
              var l = listas.filter(function (x) { return x.ul === el.parentElement; })[0];
              if (!l) listas.push(l = { ul: el.parentElement, ctx: ctx, a: anc ? anc.id : '', it: [] });
              l.it.push(t);
            }
            if (t.length < 20) return;
            meter({ p: pg, a: anc ? anc.id : '', ctx: ctx, text: t });
          });
          /* cada lista, entera: «Cafeteras · Molinos · Mantenimiento…» */
          listas.forEach(function (l) { if (l.it.length >= 2) meter({ p: pg, a: l.a, ctx: l.ctx, text: l.it.join(' · ') }); });
        }).catch(function () {});
      });
      return Promise.all(paginas).then(function () { IDX = chunks; });
    });
    return idxPromise;
  }
  function buscarWeb(tokens, opc) {
    opc = opc || {};
    var estricto = !!opc.estricto, unir = !!opc.unir, info = !!opc.info;
    if (!IDX) return [];
    var q = [], vistos = {};
    tokens.forEach(function (w) { if (w.length >= 3 && !STOP.test(w) && !RUIDO.test(w)) { var s2 = stemW(w); if (!vistos[s2]) { vistos[s2] = 1; q.push(s2); } } });
    if (!q.length) return [];
    var tiene = function (arr, st) { for (var i = 0; i < arr.length; i++) if (arr[i].indexOf(st) === 0) return true; return false; };
    var N = IDX.length;
    var idf = q.map(function (st) { var df = 0; IDX.forEach(function (c) { if (tiene(c.tx, st)) df++; }); return df ? Math.log(1 + N / (1 + df)) : 0; });
    /* las palabras que no aparecen en ninguna parte de la web no cuentan (si todas faltan, no hay nada que decir) */
    var conocidas = q.map(function (st, i) { return i; }).filter(function (i) { return idf[i] > 0; });
    if (!conocidas.length) return [];
    /* solo en preguntas de tipo «qué es / cuánto pesa / qué ventajas» se ignoran las palabras que la web no contiene */
    if (info) { q = conocidas.map(function (i) { return q[i]; }); idf = conocidas.map(function (i) { return idf[i]; }); }
    var cob = info ? 0.5 : 0.6;
    var posibles = q.filter(function (_, i) { return idf[i] > 0; }).length;
    if (!posibles || posibles < Math.ceil(q.length * cob)) return [];
    var res = [];
    IDX.forEach(function (c) {
      var sc = 0, hit = 0;
      q.forEach(function (st, i) { if (idf[i] && tiene(c.tx, st)) { hit++; sc += idf[i] * (tiene(c.tt, st) ? 1.6 : 1); } });
      if (hit < (unir ? q.length : Math.ceil(q.length * cob)) || (q.length === 1 && idf[0] < 2.2)) return;
      sc = sc * (hit / q.length) / (1 + 0.1 * Math.log(1 + c.tx.length));
      res.push({ c: c, s: sc, hit: hit });
    });
    res.sort(function (a, b) { return b.s - a.s; });
    var out = [], usados = {};
    res.forEach(function (r) { var k = r.c.p + '|' + r.c.a + '|' + r.c.ctx; if (out.length < 3 && !usados[k]) { usados[k] = 1; out.push(r); } });
    var umbral = estricto ? 2 : 1.2;
    if (out.length && out[0].s >= umbral && (!estricto || out[0].hit >= 2 || idf[0] >= 3)) return out;
    /* ninguna pieza reúne todas las palabras: se muestra la mejor pieza de cada cosa por la que pregunta (por ejemplo, «diferencia entre A y B») */
    if (unir && !out.length && posibles >= 2) {
      var ord = q.map(function (st, i) { return { st: st, i: i }; }).filter(function (x) { return idf[x.i] > 0; }).sort(function (x, y) { return idf[y.i] - idf[x.i]; }).slice(0, 3);
      var picks = [], vi = {};
      ord.forEach(function (x) {
        var best = null;
        IDX.forEach(function (c) {
          if (!tiene(c.tx, x.st)) return;
          var sc = idf[x.i] * (tiene(c.tt, x.st) ? 1.6 : 1) / (1 + 0.1 * Math.log(1 + c.tx.length));
          if (!best || sc > best.s) best = { c: c, s: sc, hit: 1 };
        });
        if (best && best.s >= 1.2) { var k = best.c.p + '|' + best.c.a + '|' + best.c.ctx; if (!vi[k]) { vi[k] = 1; picks.push(best); } }
      });
      if (picks.length >= 2) { picks.union = true; return picks; }
    }
    return [];
  }
  function recorte(t, n) { t = String(t); if (t.length <= n) return t; var c = t.slice(0, n); return c.slice(0, Math.max(c.lastIndexOf(' '), n - 30)) + '…'; }
  function respuestaWeb(res) {
    return (res.union ? 'No encuentro una respuesta exacta, pero esto es lo que hay en la web de cada cosa que preguntas:' : 'Esto es lo que encuentro en la web sobre eso:') + '<ul>' + res.map(function (r) {
      var c = r.c;
      return '<li><a href="' + c.p + '.html' + (c.a ? '#' + c.a : '') + '"><b>' + esc(c.ctx || NOMBRES[c.p]) + '</b></a> <small>(' + NOMBRES[c.p] + ')</small>' + (c.text ? '<br>' + esc(recorte(c.text, 170)) : '') + '</li>';
    }).join('') + '</ul>Si necesitas más detalle, llámanos al ' + TEL + '.';
  }
  var RUIDO_RAIZ = /^(tenies|teneys|ofrecen|ofreceis|manejais|comercializais|disponeis|teneis|tenemos|tienen|tienes|tiene|vendeis|venden|vendemos|trabajais|trabajan|distribuis|distribuyen|busco|buscamos|necesito|necesitamos|quiero|queremos|quisiera|podeis|pueden|servis|sirven|disponible|disponibles|referencia|referencias|vuestro|vuestra|vuestros|vuestras|nuestro|nuestra)$/;
  var RUIDO_EXACTO = /^(hay|ver|mirar|algun|alguna|alguno|algo|todo|toda|una|unos|unas|los|las|del|con|sin|para|por|que|como|cual|cuales|cuanto|cuesta|vale|precio|esta|este|ese|esa|mas|muy|bien|favor|hola|buenas|gracias|tambien|ademas|tipo|marca|producto|productos|gama|stock|ref|bebida|bebidas|marcas|tipos|gamas|clases|variedades|cosas|cosa|articulo|articulos|material|materiales)$/;
  var RUIDO = { test: function (w) { return RUIDO_EXACTO.test(w) || RUIDO_RAIZ.test(w); } };
  function etiqueta(it) {
    var fam = String(it.f || '').split(' · ')[0];
    if (it.p === 'menaje' || !fam || norm(it.n).indexOf(norm(fam)) >= 0) return it.n;
    return fam + ' · ' + it.n;
  }
  function buscar(tokens) {
    var q = tokens.filter(function (t) { return t.length >= 3 && !RUIDO.test(t); });
    if (!q.length || !CAT) return [];
    var stem = function (w) { return w.length > 4 ? w.replace(/(es|s)$/, '') : w; };
    var res = [];
    CAT.forEach(function (it) {
      var ok = q.every(function (w) { var s = stem(w); return it.t.some(function (x) { return x.indexOf(s) === 0; }); });
      if (ok) res.push(it);
    });
    if (!res.length && q.length >= 2) {
      var kept = q.filter(function (w) { var s2 = stem(w); return CAT.some(function (it) { return it.t.some(function (x) { return x.indexOf(s2) === 0; }); }); });
      if (kept.length >= Math.ceil(q.length * 0.6) && kept.length < q.length) { var parc = buscar(kept); parc.parcial = true; return parc; }
    }
    res.sort(function (a, b) { return a.n.length - b.n.length; });
    return res;
  }

  /* ---------- análisis del mensaje ---------- */
  var state = { zone: null, last: null, espera: null, cur: null, negocio: null, lista: [], resultados: [], hist: [] };
  var NEEDS_ZONE = { proxima: true };
  var INFO = /\b(que es|que son|para que (sirve|sirven|es)|como (funciona|funcionan|se usa|se hace|se prepara|se toma|es|son)|que (lleva|llevan|incluye|incluyen|contiene|contienen|significa|ventaja|ventajas|beneficio|beneficios)|ventajas?|beneficios?|diferencias?|por que|de que (es|esta|estan|son|se hace)|cuanto (pesa|pesan|mide|dura|residuo|ahorra|contiene|trae)|cuanto\b.*\b(ahorra|ahorro|pesa|pesan|mide|miden|dura|contiene|trae)|ingredientes|formatos?)\b/;
  var COMP = /\b(diferencia|diferencias|comparar|comparacion|entre|mejor que|versus|vs)\b/;
  var AMPLIO = { pascual: ['leche', 'pascual'], menaje: ['menaje'], vinos: ['vino'], aguas: ['agua'], congelados: ['congelado'], refrigerados: ['refrigerado'], despensa: ['despensa'], cafe: ['cafe'], bebidas: ['bebida'] };
  var SIMPLE = { saludo: 1, gracias: 1, adios: 1 };

  /* limpia el mensaje: abreviaturas, saludos y cortesías delante o detrás de la pregunta, y alias de productos */
  var SALUDO_INI = /^((?:buenos dias|buenas tardes|buenas noches|buenas|hola|hey|oye|perdona|perdone|disculpa|disculpe|saludos)\b[ ,]*)+/;
  var CORTESIA_FIN = /[ ,]*\b(?:muchas gracias|gracias|por favor|porfavor|porfa|plis)$/;
  function limpiar(raw) {
    var t = norm(raw)
      .replace(/\b(q|k|ke)\b/g, 'que').replace(/\b(xq|pq|porq|porke)\b/g, 'porque').replace(/\b(tb|tmb|tambn)\b/g, 'tambien').replace(/\bx\b/g, 'por').replace(/\bd\b/g, 'de')
      .replace(/\b(queria|quisiera|quiero|me gustaria|necesito|os queria|queremos|querriamos) (saber|preguntar|consultar|preguntaros|averiguar)( si| que| cuanto| cuando| como| donde)?\b/g, ' ')
      .replace(/\b(podeis|puedes|podria|podrias|pueden|puede) (decirme|decirnos|informarme|indicarme|decir)\b/g, ' ')
      .replace(/\b(una|otra) (pregunta|duda|consulta)\b/g, ' ')
      .replace(/\s+/g, ' ').trim();
    var mg = t.match(SALUDO_INI);
    if (mg && t.length > mg[0].length) t = t.slice(mg[0].length);
    var mf = t.match(CORTESIA_FIN);
    if (mf && t.length > mf[0].length) t = t.slice(0, t.length - mf[0].length);
    t = t.trim() || norm(raw);
    return t.replace(/\bcola cao\b/g, 'colacao').replace(/\bbrick\b/g, 'brik').replace(/\blacteos?\b/g, 'leche').replace(/\bleche del cafe\b/g, 'leche cafe').replace(/\bsemi\b/g, 'semidesnatada');
  }

  function analizar(raw) {
    var t = limpiar(raw), tokens = t.split(' ').filter(Boolean);
    var has = function (g) { return g.every(function (s) { return hasStem(tokens, s); }); };
    var scored = [];
    Object.keys(INTENTS).forEach(function (id) {
      var it = INTENTS[id], s = 0;
      var ps = [];
      it.k.forEach(function (g) { if (has(g)) ps.push(g.length * 3 + g.join('').length / 4); });
      if (ps.length) { ps.sort(function (x, y) { return y - x; }); s = ps[0] + 0.25 * ps.slice(1).reduce(function (x, y) { return x + y; }, 0); scored.push({ id: id, s: s * (it.peso || 1) }); }
    });
    scored.sort(function (a, b) { return b.s - a.s; });
    return { t: t, tokens: tokens, has: has, scored: scored };
  }

  /* ---------- lista de interés y correo (todo en memoria: no se guarda nada) ---------- */
  var MAILTO = 'oficina@distribucionesvm.es';
  var enlaceProducto = function (it) { return it.p + '.html' + (it.a ? '#' + it.a : ''); };
  function unicos(r, max) {
    var vistos = {}, out = [];
    r.forEach(function (it) { var k = it.p + etiqueta(it); if (!vistos[k] && out.length < max) { vistos[k] = 1; out.push(it); } });
    return out;
  }
  function mailHref() {
    var L = ['Hola,', '', 'Os escribo desde la web de Distribuciones VM.'];
    if (state.zone) L.push('Mi pueblo: ' + state.zone.nombre);
    if (state.negocio) L.push('Mi negocio: ' + state.negocio);
    if (state.lista.length) { L.push('', 'Productos que me interesan:'); state.lista.forEach(function (x) { L.push('- ' + x.n); }); }
    if (state.hist.length) { L.push('', 'Lo que he preguntado al asistente:'); state.hist.slice(-6).forEach(function (q) { L.push('- ' + q); }); }
    L.push('', 'Mi nombre y mi teléfono: ');
    var body = L.join('\n');
    if (body.length > 1500) body = body.slice(0, 1500) + '…';
    return 'mailto:' + MAILTO + '?subject=' + encodeURIComponent(state.lista.length ? 'Lista de interés desde la web' : 'Consulta desde la web') + '&body=' + encodeURIComponent(body);
  }
  function anotar(nombre) {
    var n = String(nombre).replace(/\s+/g, ' ').trim().slice(0, 80);
    if (!n) return 'Dime qué producto quieres apuntar.';
    var ya = state.lista.some(function (x) { return x.n === n; });
    if (!ya) state.lista.push({ n: n });
    state.cur = 'lista';
    return (ya ? 'Ya tenías apuntado: <b>' : 'Apuntado: <b>') + esc(n) + '</b>. Llevas <b>' + state.lista.length + '</b> en tu lista de interés.';
  }
  function verLista() {
    state.cur = 'lista';
    if (!state.lista.length) return 'Tu lista está vacía. Dime qué te interesa, por ejemplo «apúntame nata para montar», o pulsa <b>Apuntar</b> en un producto.';
    return '<b>Tu lista de interés</b> (' + state.lista.length + '):<ul>' + state.lista.map(function (x, i) { return '<li>' + esc(x.n) + ' <button type="button" class="chat-mini" data-del="' + i + '">Quitar</button></li>'; }).join('') + '</ul>Cuando quieras, <a href="' + mailHref() + '" data-mail>envíala por correo</a> y te contactamos con tu tarifa personalizada, sin compromiso.';
  }
  function elegir(res) {
    state.cur = 'lista';
    return 'Dime cuál quieres apuntar:<ul>' + res.map(function (r, i) { return '<li>' + esc(r.n) + (r.pg ? ' <small>(' + r.pg + ')</small>' : '') + ' <button type="button" class="chat-mini" data-add="' + i + '">Apuntar</button></li>'; }).join('') + '</ul>';
  }
  var NO_ITEM = /\b(en|a|de|mi|la|lista|tambien|por|favor|porfa|me|los|las|el|un|una|unos|unas|esto|eso|ello|lo|al|con)\b/g;
  function comandoLista(a) {
    var t = a.t;
    if (/\b(vaciar|borrar|limpiar)\w*\b.*\blista\b|\bempezar de nuevo\b/.test(t)) { state.lista = []; state.cur = 'lista'; return 'Listo, he vaciado tu lista.'; }
    if (/\b(enviar|mandar|enviame|mandame|pasar|pasame)\w*\b.*\blista\b/.test(t)) {
      state.cur = 'lista';
      if (!state.lista.length) return 'Tu lista está vacía. Apunta primero algún producto, por ejemplo «apúntame nata para montar».';
      return '<a href="' + mailHref() + '" data-mail>Abrir el correo con mi lista</a>. Se abre en tu programa de correo con los productos y lo que me has contado ya escritos; solo tienes que añadir tu nombre y teléfono y enviarlo. Te contactamos con tu tarifa personalizada, sin compromiso.';
    }
    if (/\b(mi lista|ver lista|que llevo|lista de interes|que tengo apuntado)\b/.test(t) && !/\b(apunt|anot|anad|agreg)/.test(t)) return verLista();
    var q = t.match(/\bquit\w*\s+(.+)$/);
    if (q && state.lista.length) {
      var ws = q[1].replace(NO_ITEM, ' ').split(' ').filter(function (w) { return w.length >= 3; });
      var antes = state.lista.length;
      if (ws.length) state.lista = state.lista.filter(function (x) { var nx = norm(x.n); return !ws.every(function (w) { return nx.indexOf(w) >= 0; }); });
      if (state.lista.length < antes) { state.cur = 'lista'; return 'Quitado. Te quedan <b>' + state.lista.length + '</b> en la lista.'; }
    }
    var m = t.match(/\b(apunt\w*|anot\w*|anad\w*|agreg\w*|ponme|incluy\w*)\b\s*(.*)$/);
    if (!m) return null;
    var rest = (m[2] || '').replace(NO_ITEM, ' ').split(' ').filter(Boolean);
    if (!rest.length) {
      if (state.resultados.length === 1) return anotar(state.resultados[0].n);
      if (state.resultados.length > 1) return elegir(state.resultados);
      state.cur = 'lista';
      return 'Dime qué producto quieres apuntar, por ejemplo «apúntame nata para montar».';
    }
    return cargarCatalogo().then(function () {
      var r = unicos(buscar(rest), 6);
      if (r.length === 1) { state.resultados = [{ n: etiqueta(r[0]), href: enlaceProducto(r[0]), pg: PAGINAS[r[0].p] }]; return anotar(etiqueta(r[0])); }
      if (r.length > 1) { state.resultados = r.map(function (it) { return { n: etiqueta(it), href: enlaceProducto(it), pg: PAGINAS[it.p] }; }); return elegir(state.resultados); }
      return 'No lo encuentro en el catálogo de la web, pero lo apunto tal cual. ' + anotar(rest.join(' '));
    });
  }

  /* ---------- tipo de negocio ---------- */
  var NEGOCIO = /\b(?:tengo|tenemos|soy|somos|llevo|llevamos|trabajo|trabajamos|regento|regentamos|mi|nuestro|nuestra)\b[^.?!]{0,22}?\b(bar|restaurante|cafeteria|hotel|hostal|catering|panaderia|pasteleria|colegio|residencia|taberna|asador|cerveceria|pub|comedor)\b/;

  /* devuelve el HTML de la respuesta, o una promesa con él. state.cur indica de qué trata (para los botones de seguimiento) */

  /* ---------- consultas específicas: tipos de azúcar, cafés (arábica, descafeinado, cápsulas) y copas según la bebida ---------- */
  var DATOS = null, datosPromise = null;
  function cargarDatos() {
    if (datosPromise) return datosPromise;
    datosPromise = fetch('asistente-datos.js').then(function (r) { return r.ok ? r.text() : ''; }).then(function (t) { if (t) (new Function(t))(); DATOS = window.ASISTENTE_DATOS || { azucar: [], cafe: [] }; }).catch(function () { DATOS = { azucar: [], cafe: [] }; });
    return datosPromise;
  }
  var COPAS = [
    { k: /\b(vino|vinos|tinto|tintos|blanco|blancos|rosado|rosados|crianza|reserva|joven|verdejo|rueda|ribera|rioja)\b/, nombre: 'vino', f: /^Copa Vino/i, nota: '', vino: true, guia: 'Como regla general, los <b>tintos</b> (crianza, reserva) piden una copa grande, de unos 45 cl en adelante, para que el vino respire; los <b>blancos, rosados y jóvenes</b>, una copa algo más pequeña, de unos 25 a 35 cl, para que se mantengan frescos.' },
    { k: /\b(gin|ginebra|gintonic|gin tonic|combinado|combinados|cubata|cubatas|cocktail|coctel|cocteles|mojito|ron|vodka|calimocho)\b/, nombre: 'combinados y gin-tonic', f: /^Copa (Gin|Combinado)/i, nota: '', guia: 'Para un gin-tonic o un combinado conviene una copa grande, de unos 58 cl en adelante, que deje sitio al hielo y a la bebida sin que se caliente.' },
    { k: /\b(cava|champan|champagne|espumoso|espumosos|flauta)\b/, nombre: 'cava y espumosos', f: /Champan|Flauta/i, nota: '', guia: 'Para cava y espumosos, lo clásico es la flauta: su forma alargada mantiene la burbuja.' },
    { k: /\b(cerveza|cervezas|cana|canas|pinta|jarra|jarras)\b/, nombre: 'cerveza', f: /cerveza|\bca[nñ]a\b/i, nota: '', guia: 'Para la barra, la caña (vaso de 18 a 25 cl) sirve la cerveza fría y rápido; para cervezas de mesa o especiales, una copa o una jarra de 28 cl en adelante.' },
    { k: /\b(agua)\b/, nombre: 'agua', f: /\bagua\b/i, nota: '', guia: 'Para el agua, un vaso o una copa de 23 a 35 cl cubre bien el servicio de mesa.' },
    { k: /\b(zumo|zumos)\b/, nombre: 'zumo', f: /zumo/i, nota: '' },
    { k: /\b(helado|helados|postre|postres)\b/, nombre: 'helado y postres', f: /helado/i, nota: '' },
    { k: /\b(sidra)\b/, nombre: 'sidra', f: /sidra/i, nota: '' },
    { k: /\b(licor|licores|chupito|chupitos|orujo|pacharan)\b/, nombre: 'licores y chupitos', f: /licor|chupito/i, nota: '' },
    { k: /\b(whisky|whiskey|brandy|coñac|conac)\b/, nombre: 'whisky', f: /whisky/i, nota: '' }
  ];
  function capacidades(items) {
    var cl = [];
    items.forEach(function (it) { var m = it.n.match(/(\d+(?:[.,]\d+)?)\s*cl/i); if (m) cl.push(parseFloat(m[1].replace(',', '.'))); });
    if (!cl.length) return '';
    var mn = Math.min.apply(null, cl), mx = Math.max.apply(null, cl);
    var f = function (x) { return String(x).replace('.', ','); };
    return mn === mx ? ' (' + f(mn) + ' cl)' : ' (de ' + f(mn) + ' a ' + f(mx) + ' cl)';
  }
  function listaLinks(items, pg, max) {
    return '<ul>' + items.slice(0, max).map(function (it) { return '<li><a href="' + pg + '">' + esc(it.n) + '</a></li>'; }).join('') + '</ul>';
  }
  function especificas(a) {
    var t = a.t;
    /* tipos de azúcar y edulcorantes */
    if (/\b(azucar|azucares|azucarillo|azucarillos|azucarito|azucaritos|edulcorante|edulcorantes|sacarina)\b/.test(t) && !/sin azucar|yogur|zumo|essential|vivesoy|bebida|galleta|bolleria|pepito|nata|caña/.test(t)) {
      return cargarDatos().then(function () {
        if (!DATOS.azucar.length) return null;
        var fa = /moreno/.test(t) ? /moreno/i : /azucarillo|azucarito/.test(t) ? /Azucarillos/i : /edulcorante|sacarina/.test(t) ? /edulcorante/i : /blanco/.test(t) ? /blanco|Azucarillos blancos|Azucarera|Anagrama/i : null;
        var sel = fa ? DATOS.azucar.filter(function (x) { return fa.test(x.n) || (fa.test(x.t) && /edulcorante/.test(t)); }) : DATOS.azucar;
        if (!sel.length) sel = DATOS.azucar;
        var grupos = {}, orden = [];
        sel.forEach(function (x) { if (!grupos[x.t]) { grupos[x.t] = []; orden.push(x.t); } grupos[x.t].push(x.n); });
        var h = 'De <b>azúcar y edulcorantes</b> tenemos, para hostelería:' + orden.map(function (g) { return '<br><b>' + esc(g) + '</b><ul>' + grupos[g].map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>'; }).join('');
        state.cur = 'azucar';
        return h + 'Más detalle y tarifa: ' + TEL + ' o ' + MAIL + '. También los ves entre los <a href="cafe-mocay.html#complementos">complementos de Mocay</a>.';
      });
    }
    /* cafés: arábica, descafeinado, cápsulas y referencias */
    var hayCafe = /\b(cafe|cafes|mocay|capsula|capsulas|descafeinado|descafeinados|arabica|arabicas)\b/.test(t);
    if (hayCafe && /(arabic|robusta|mezcla|variedad)/.test(t)) {
      return cargarDatos().then(function () {
        var ar = DATOS.cafe.filter(function (x) { return x.a && /Grano/.test(x.g); }).map(function (x) { return '<li>' + esc(x.n) + '</li>'; }).join('');
        var cap = DATOS.cafe.filter(function (x) { return x.a && /Cápsulas/.test(x.g); })[0];
        state.cur = 'arabica';
        return 'Según <b>Mocay</b>, la gama <b>Maestro</b> es «100 % arábica, de los orígenes más exóticos»:<ul>' + ar + '</ul>' + (cap ? 'Y en cápsulas: <b>' + esc(cap.n) + '</b>. ' : '') + 'De la gama Barista y de los descafeinados no tengo la composición de la mezcla; pregúntanos en el ' + TEL + '. <a href="cafe-mocay.html#gamas">Ver las gamas de Café Mocay</a>.';
      });
    }
    if (hayCafe && /(descafeinad|decaf)/.test(t)) {
      return cargarDatos().then(function () { return cafeGrupo(/Descafeinado|descafeinada/, 'los descafeinados'); });
    }
    if (hayCafe && /capsula/.test(t) && !/cafetera|maquina/.test(t)) {
      return cargarDatos().then(function () { return cafeGrupo(/Cápsulas/, 'cápsulas'); });
    }
    if (hayCafe && /(grano|molido|referencia|tipos|que cafes|cuales)/.test(t) && !/leche/.test(t)) {
      return cargarDatos().then(function () { return cafeGrupo(/./, 'grano, descafeinados, cápsulas y soluble'); });
    }
    /* qué copa o vaso va con cada bebida */
    var preguntaCopa = /\b(copa|copas|vaso|vasos)\b/.test(t) && /(que|cual|cuales|adecuad|mejor|recomend|ideal|sirve|usar|para)/.test(t) && !/(tenei|vendei|hay|busco)/.test(t.replace(/que copa|que vaso/, ''));
    if (preguntaCopa || (state.copa && a.tokens.length <= 4)) {
      var d = COPAS.filter(function (x) { return x.k.test(t); })[0];
      if (!d) {
        if (!preguntaCopa) { state.copa = false; return null; }
        state.copa = true; state.cur = 'copa';
        return Promise.resolve('Depende de la bebida. Tenemos copas y vasos para <b>vino</b>, <b>cerveza</b>, <b>combinados y gin-tonic</b>, <b>cava</b>, <b>agua</b>, <b>zumo</b>, <b>sidra</b>, <b>licores</b> y <b>helados</b>. ¿Qué vas a servir? Dímelo y te enseño las referencias.');
      }
      state.copa = true;   /* sigue la conversación de copas: «¿y para el cava?» */
      return cargarCatalogo().then(function () {
        var items = (window.MENAJE || []).filter(function (m) { return m.g === 'Cristalería' && d.f.test(m.n); });
        if (!items.length) return null;
        state.cur = 'copa';
        var clde = function (it) { var m = it.n.match(/(\d+(?:[.,]\d+)?)\s*cl/i); return m ? parseFloat(m[1].replace(',', '.')) : null; };
        var recomendadas = null, tipo = '';
        if (d.vino) {
          var tinto = /tinto|crianza|reserva|ribera|rioja/.test(t), claro = /blanco|rosado|joven|verdejo|rueda|albarino/.test(t);
          if (tinto && !claro) { tipo = 'para tinto'; recomendadas = items.filter(function (it) { var c = clde(it); return c && c >= 44; }); }
          else if (claro && !tinto) { tipo = 'para blanco, rosado o joven'; recomendadas = items.filter(function (it) { var c = clde(it); return c && c >= 19 && c <= 36; }); }
        }
        if (recomendadas && recomendadas.length) {
          return (d.guia ? d.guia + '<br><br>' : '') + 'Entre las nuestras, ' + tipo + ' (' + recomendadas.length + ')' + capacidades(recomendadas) + ':' + listaLinks(recomendadas, 'menaje.html#referencias', 6) + (recomendadas.length > 6 ? 'Hay alguna más en el <a href="menaje.html#referencias">listado de menaje</a>. ' : '') + 'Dime si es para tinto, blanco o espumoso, o llámanos al ' + TEL + ' y te asesoramos según tu carta.';
        }
        if (d.vino) state.copa = true;   /* espera «tinto» o «blanco» para afinar */
        if (d.guia) return d.guia + '<br><br>Entre las nuestras tienes ' + items.length + ' referencia' + (items.length === 1 ? '' : 's') + capacidades(items) + ':' + listaLinks(items, 'menaje.html#referencias', 6) + (items.length > 6 ? 'Y alguna más en el <a href="menaje.html#referencias">listado de menaje</a>. ' : '') + (d.vino ? 'Si me dices si es para tinto o para blanco, te enseño las más adecuadas. ' : '') + 'Para afinar según tu carta: ' + TEL + ' o ' + MAIL + '.';
        return 'Para <b>' + d.nombre + '</b> tenemos ' + items.length + ' referencia' + (items.length === 1 ? '' : 's') + ' de cristalería' + capacidades(items) + (d.nota ? '. ' + d.nota : '') + ':' + listaLinks(items, 'menaje.html#referencias', 6) + (items.length > 6 ? 'Y alguna más en el <a href="menaje.html#referencias">listado de menaje</a>. ' : '') + 'Cuál te conviene depende de tu carta y de cómo sirvas; cuéntanos tu local en el ' + TEL + ' o ' + MAIL + ' y te asesoramos.';
      });
    }
    return null;
  }
  function cafeGrupo(re, titulo) {
    var it = DATOS.cafe.filter(function (x) { return re.test(x.g); });
    if (!it.length) return null;
    var grupos = {}, orden = [];
    it.forEach(function (x) { if (!grupos[x.g]) { grupos[x.g] = []; orden.push(x.g); } grupos[x.g].push(x.n); });
    state.cur = 'cafe';
    return 'Esto tenemos de <b>Café Mocay</b>:' + orden.map(function (g) { return '<br><b>' + esc(g) + '</b><ul>' + grupos[g].map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>'; }).join('') + 'Más en <a href="cafe-mocay.html#gamas">Café Mocay</a>. Pedidos y tarifa: ' + TEL + '.';
  }

  function responder(raw) {
    var a = analizar(raw);
    state.cur = null;
    if (!a.t) return null;
    var zone = /vino|verdejo|bornos|denominacion|blanco|tinto/.test(a.t) ? null : findZone(a.t);
    if (zone) state.zone = zone;
    var c = { zone: zone || null, has: a.has };
    var top = a.scored[0];
    var lista = comandoLista(a);
    if (lista) return lista;
    var esp = especificas(a);
    if (esp) return typeof esp === 'string' ? esp : esp.then(function (r) { return r || seguir(); });
    return seguir();
    function seguir() {
    var neg = a.t.match(NEGOCIO);
    if (neg) {
      state.negocio = neg[1];
      if (!top || top.s < 3) { state.cur = 'negocio'; return 'Perfecto, anoto que tienes un <b>' + esc(neg[1]) + '</b>. Cuéntame qué necesitas: si repartimos en tu pueblo, plazos, formas de pago o productos.'; }
    }
    if (/\b(sabado|domingo|finde|fin de semana|festivo)/.test(a.t) && !zone) { state.cur = 'dias'; return 'Repartimos <b>de lunes a viernes</b>. Los fines de semana no hay reparto. ' + PLAZO; }

    /* esperaba el pueblo para seguir con la pregunta anterior */
    if (state.espera) {
      var pend = state.espera; state.espera = null;
      if (zone) { state.last = pend; state.cur = pend; return INTENTS[pend].a({ zone: zone, has: a.has }); }
    }
    /* pregunta que necesita pueblo y no lo tenemos */
    if (top && NEEDS_ZONE[top.id]) {
      var zz = zone || state.zone;
      state.cur = top.id;
      if (!zz) { state.espera = top.id; return '¿De qué pueblo eres? Con eso te calculo tu próximo reparto.'; }
      state.last = top.id; return INTENTS[top.id].a({ zone: zz, has: a.has });
    }
    /* seguimiento corto: «¿y a Olmedo?», «¿y en Rueda?» */
    if (zone && a.tokens.length <= 6 && (!top || ['zona', 'dias', 'plazo'].indexOf(top.id) >= 0 || /^y /.test(a.t))) {
      var id = state.last && (state.last === 'proxima' || state.last === 'plazo') ? state.last : 'zona';
      state.last = id; state.cur = id; return INTENTS[id].a({ zone: zone, has: a.has });
    }
    /* pueblo que no tenemos en el listado */
    var m = a.t.match(/\b(?:reparti|reparto|llegai|llegan|vendei|servi|llevai|venis|entregai|repartir)s?\s+(?:en|a|hasta|por)\s+([a-z]+(?: [a-z]+){0,3})/);
    if (!zone && m && !/^(donde|mi|toda|todo|la|el|los|las|que|cuantos|cuando|domicilio|casa|hosteleria|bares|negocios|particulares|empresas)\b/.test(m[1])) {
      state.cur = 'zona';
      return 'No tengo <b>' + esc(cap(m[1])) + '</b> en el listado de días de reparto. Repartimos en Medina del Campo y comarca, hasta 90 km, y en las provincias vecinas de Valladolid, Salamanca, Ávila y Segovia. Llámanos al ' + TEL + ' o escribe a ' + MAIL + ' y te confirmamos si llegamos y qué día.';
    }
    /* búsqueda de producto concreto */
    var pareceProducto = /\b(tenei|tienen|vendei|venden|hay|busco|necesito|quiero|trabajai|distribui)/.test(a.t) || !top || INTENTS[top.id].cat;
    if (pareceProducto) {
      var cont = a.tokens.filter(function (x) { return x.length >= 3 && !RUIDO.test(x); });
      if (cont.length && !(top && SIMPLE[top.id])) {
        var catIntent = (top && INTENTS[top.id].cat) ? top.id : ((a.scored.filter(function (x) { return INTENTS[x.id].cat; })[0] || {}).id || null);
        return cargarCatalogo().then(function () {
          var r = buscar(a.tokens);
          var listaHtml = function () {
            if (r.length > 6 && catIntent && cont.length === 1 && AMPLIO[catIntent] && AMPLIO[catIntent].some(function (st) { return cont[0].indexOf(st) === 0; })) { state.cur = catIntent; return INTENTS[catIntent].a(c); }
            var lista = unicos(r, 6);
            state.resultados = lista.map(function (it) { return { n: etiqueta(it), href: enlaceProducto(it), pg: PAGINAS[it.p] }; });
            state.cur = 'producto';
            return 'Sí, esto es lo que tenemos relacionado:<ul>' + state.resultados.map(function (x, i) { return '<li><a href="' + x.href + '">' + esc(x.n) + '</a> <small>(' + x.pg + ')</small> <button type="button" class="chat-mini" data-add="' + i + '">Apuntar</button></li>'; }).join('') + '</ul>' + (r.length > lista.length ? 'Y alguno más: míralo en <a href="' + lista[0].p + '.html">' + PAGINAS[lista[0].p] + '</a>. ' : '') + 'Para pedirlo o pedir tarifa: ' + TEL + '.';
          };
          if (r.length && !r.parcial && !INFO.test(a.t)) return listaHtml();
          if (!r.length && catIntent && cont.length === 1 && INTENTS[catIntent].k.some(function (g) { return g.length === 1 && cont[0].indexOf(g[0]) === 0; })) { state.cur = catIntent; return INTENTS[catIntent].a(c); }
          var curada = top && !INTENTS[top.id].cat && top.id !== 'productos' && top.s >= 3;
          if (curada && (!r.length || r.parcial)) return fallback(a, c);
          /* sin coincidencia exacta de producto: puede ser una pregunta sobre el contenido de la web («ventajas del bag in box», «mantenimiento de cafeteras») */
          return cargarIndice().then(function () {
            var w = buscarWeb(a.tokens, { estricto: true, info: INFO.test(a.t), unir: COMP.test(a.t) });
            if (w.length) { state.cur = 'web'; return respuestaWeb(w); }
            if (r.parcial && catIntent) { state.cur = catIntent; return INTENTS[catIntent].a(c); }
            if (r.length) return listaHtml();
            if (catIntent) { state.cur = catIntent; return INTENTS[catIntent].a(c); }
            return fallback(a, c);
          }, function () { return r.length ? listaHtml() : (catIntent ? INTENTS[catIntent].a(c) : fallback(a, c)); });
        });
      }
    }
    return fallback(a, c);
    }
  }

  function fallback(a, c) {
    var sc = a.scored;
    if (sc.length && sc[0].s >= 3) {
      var partes = [sc[0]];
      if (sc[1] && sc[1].s >= 3 && sc[1].s >= sc[0].s * 0.4 && !INTENTS[sc[0].id].solo && !INTENTS[sc[1].id].solo && !INTENTS[sc[0].id].cat && !INTENTS[sc[1].id].cat) partes.push(sc[1]);
      var contenido = a.tokens.filter(function (x) { return x.length >= 3 && !RUIDO.test(x); });
      var debil = INTENTS[sc[0].id].cat && contenido.length > 1;
      if (debil && !a.sinWeb) {
        var propio = fallback;
        return cargarIndice().then(function () {
          var w = buscarWeb(a.tokens, { estricto: true, info: INFO.test(a.t), unir: COMP.test(a.t) });
          if (w.length) { state.cur = 'web'; return respuestaWeb(w); }
          a.sinWeb = true; return propio(a, c);
        }, function () { a.sinWeb = true; return fallback(a, c); });
      }
      var pz = partes.filter(function (x) { return INTENTS[x.id].needsZone; })[0];
      if (pz) {
        var zz2 = c.zone || state.zone;
        if (!zz2) { state.espera = pz.id; state.cur = pz.id; return '¿De qué pueblo eres? Con eso te calculo tu próximo reparto.'; }
        c = { zone: zz2, has: c.has };
      }
      state.last = partes[0].id; state.cur = partes[0].id;
      var textos = [];
      partes.forEach(function (p) { var h = INTENTS[p.id].a(c); if (textos.indexOf(h) < 0) textos.push(h); });
      return textos.join('<br><br>');
    }
    return cargarIndice().then(function () {
      var r = buscarWeb(a.tokens, { unir: COMP.test(a.t), info: INFO.test(a.t) });
      if (r.length) { state.cur = 'web'; return respuestaWeb(r); }
      state.cur = 'nada'; return NO_ENTIENDO;
    }, function () { state.cur = 'nada'; return NO_ENTIENDO; });
  }
  var NO_ENTIENDO = 'No estoy seguro de haberte entendido. Puedo ayudarte con el <b>reparto</b> (dime tu pueblo), los <b>plazos</b>, el <b>horario</b>, las <b>formas de pago</b>, <b>cómo hacerte cliente</b> o buscar un <b>producto</b>. ' + PERSONA;

  /* ---------- interfaz ---------- */
  function add(who, html, isHtml) {
    var d = document.createElement('div');
    d.className = 'chat-msg chat-' + who;
    if (isHtml) d.innerHTML = html; else d.textContent = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }

  /* botones de seguimiento según el tema de la última respuesta */
  var SEGUIR = {
    zona: ['¿Cuándo me llegaría un pedido?', '¿Cuánto tardáis?'],
    dias: ['¿Cuándo me llegaría un pedido?', '¿Hay pedido mínimo?'],
    plazo: ['¿Hay pedido mínimo?', '¿Cuánto cuesta el envío?'],
    proxima: ['¿Cuánto tardáis?', '¿Formas de pago?'],
    minimo: ['¿Cuánto cuesta el envío?', '¿Cómo me hago cliente?'],
    envio: ['¿Hay pedido mínimo?', '¿Formas de pago?'],
    cliente: ['¿Formas de pago?', '¿Horario?'],
    pedido: ['¿Cómo me hago cliente?', '¿Cuánto tardáis?'],
    pago: ['¿Cómo me hago cliente?', '¿Puedo pedir una tarifa?'],
    tarifa: ['¿Cómo me hago cliente?', '¿Formas de pago?'],
    horario: ['¿Estáis abiertos ahora?', '¿Cómo hago un pedido?'],
    ahora: ['¿Cómo hago un pedido?', '¿A dónde repartís?'],
    producto: ['¿A dónde repartís?', '¿Cuánto tardáis?'],
    lista: ['Ver mi lista', 'Enviar mi lista'],
    lechecafe: ['¿Tenéis leche sin lactosa?', '¿Cuánto tardáis?'],
    lactosa: ['¿Qué leche me recomendáis para café?', '¿Cuánto tardáis?'],
    pascual: ['¿Qué leche me recomendáis para café?', '¿Tenéis nata para montar?'],
    negocio: ['¿A dónde repartís?', '¿Qué leche me recomendáis?'],
    nada: ['¿A dónde repartís?', '¿Qué productos tenéis?'],
    web: ['¿Qué productos tenéis?', '¿Cuánto tardáis?'],
    _: ['¿A dónde repartís?', '¿Formas de pago?']
  };
  var SIN_ACCIONES = { saludo: 1, gracias: 1, adios: 1 };
  function fueraDeHorario() { var n = madrid(); return !(n.wd >= 1 && n.wd <= 5 && n.h >= 7 && n.h < 15); }

  function acciones(cur, preguntada) {
    if (SIN_ACCIONES[cur]) return;
    var q = (SEGUIR[cur] || SEGUIR._).slice();
    if (state.lista.length && cur !== 'lista' && q.indexOf('Ver mi lista') < 0) q.unshift('Ver mi lista');
    q = q.filter(function (x) { return norm(x) !== norm(preguntada); }).slice(0, 2);
    var d = document.createElement('div');
    d.className = 'chat-acts';
    d.innerHTML = '<div class="chat-follow">' + q.map(function (x) { return '<button type="button" data-q="' + esc(x) + '">' + esc(x) + '</button>'; }).join('') + '</div>' +
      '<div class="chat-pers"><a class="chat-act" href="tel:+34635098044">Llamar al 635 09 80 44</a><a class="chat-act" href="' + mailHref() + '" data-mail>Escribir por correo</a></div>' +
      (fueraDeHorario() ? '<p class="chat-fuera">Ahora estamos fuera del horario de atención (7:00 a 15:00, de lunes a viernes). Si llamas, te atiende Valentín en su móvil.</p>' : '');
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  }

  var mostrar = function (html, preguntada) {
    var cur = state.cur;
    if (html) { var el = add('bot', html, true); if (cur) el.setAttribute('data-intent', cur); if (state.modelo) el.setAttribute('data-via', 'modelo'); acciones(cur, preguntada); }
  };

  /* ---------- clasificador de temas (aprendizaje automático clásico, entrenado con _herramientas/ml/entrenar_asistente.py) ----------
     TF-IDF de n-gramas de caracteres + regresión logística: un archivo de pesos (modelo-asistente.js), sin servidor ni librerías.
     Solo elige entre los temas y respuestas que ya están escritos; nunca genera texto. Se usa cuando las reglas no entienden la pregunta
     o cuando está muy seguro de que las reglas se han equivocado de tema. Si no está seguro, no interviene. */
  var MODELO = null, modeloPromise = null;
  function cargarModelo() {
    if (modeloPromise) return modeloPromise;
    modeloPromise = fetch('modelo-asistente.js').then(function (r) { return r.ok ? r.text() : ''; }).then(function (t) {
      if (!t) return;
      (new Function(t))();
      var m = window.MODELO_ASISTENTE;
      if (m && m.vocab && m.w) { m.pos = {}; m.vocab.forEach(function (g, i) { m.pos[g] = i; }); MODELO = m; }
    }).catch(function () {});
    return modeloPromise;
  }
  function prepML(t) {   /* igual que prep() en entrenar_asistente.py */
    t = norm(t).replace(/\b(q|k|ke)\b/g, 'que').replace(/\b(xq|pq|porq|porke)\b/g, 'porque').replace(/\b(tb|tmb|tambn)\b/g, 'tambien').replace(/\bx\b/g, 'por').replace(/\bd\b/g, 'de');
    return t.replace(/\s+/g, ' ').trim();
  }
  function clasificar(texto) {
    var m = MODELO; if (!m) return null;
    var cuenta = {}, add1 = function (g) { cuenta[g] = (cuenta[g] || 0) + 1; };
    prepML(texto).split(' ').filter(Boolean).forEach(function (w) {
      w = ' ' + w + ' ';
      for (var n = 2; n <= 4; n++) {
        var off = 0; add1(w.substr(off, n));
        while (off + n < w.length) { off++; add1(w.substr(off, n)); }
        if (off === 0) break;
      }
    });
    var v = {}, sq = 0;
    Object.keys(cuenta).forEach(function (g) { var i = m.pos[g]; if (i !== undefined) { v[i] = cuenta[g] * m.idf[i]; sq += v[i] * v[i]; } });
    if (!sq) return null;
    var nrm = Math.sqrt(sq), lg = m.b.slice();
    Object.keys(v).forEach(function (i) { var x = v[i] / nrm; m.w[i].forEach(function (cw) { lg[cw[0]] += cw[1] * x; }); });
    var mx = Math.max.apply(null, lg), tot = 0;
    lg = lg.map(function (x) { x = Math.exp(x - mx); tot += x; return x; });
    var k = 0; for (var c = 1; c < lg.length; c++) if (lg[c] > lg[k]) k = c;
    return { id: m.clases[k], p: lg[k] / tot };
  }
  var TEMAS = { zona: 'dónde repartimos', dias: 'los días de reparto', plazo: 'el plazo de entrega', proxima: 'tu próximo reparto', minimo: 'el pedido mínimo', envio: 'el coste del envío', ahora: 'si estamos atendiendo ahora', horario: 'el horario', cliente: 'cómo hacerte cliente', pedido: 'cómo hacer un pedido', pago: 'las formas de pago', tarifa: 'los precios y la tarifa', whatsapp: 'el WhatsApp', contacto: 'cómo contactarnos', incidencia: 'un problema con un pedido', empresa: 'quiénes somos', redes: 'nuestras redes', persona: 'hablar con una persona', productos: 'nuestros productos', bebidas: 'las bebidas', cafe: 'el café', pascual: 'los productos Pascual', lechecafe: 'la leche para café', lactosa: 'la leche sin lactosa', vinos: 'los vinos', aguas: 'las aguas', menaje: 'el menaje', congelados: 'los congelados', refrigerados: 'los refrigerados', despensa: 'la despensa' };
  function viaModelo(texto, cl) {
    var a = analizar(texto); a.scored = [{ id: cl.id, s: 9 }]; a.sinWeb = true;
    var zone = findZone(a.t); if (zone) state.zone = zone;
    state.modelo = true;
    var h = fallback(a, { zone: zone || null, has: a.has });
    var pre = cl.p < 0.8 && TEMAS[cl.id] ? 'Si te he entendido bien, preguntas por <b>' + TEMAS[cl.id] + '</b>:<br>' : '';
    return pre ? (h && h.then ? h.then(function (x) { return pre + x; }) : pre + h) : h;
  }
  function refinar(texto, html) {
    var cur = state.cur;
    return cargarModelo().then(function () {
      var cl = clasificar(texto);
      if (!cl || cl.id === 'nada' || !INTENTS[cl.id] || SIMPLE[cl.id]) return html;
      if (cur === 'nada') return cl.p >= MODELO.umbral ? viaModelo(texto, cl) : html;
      /* las reglas contestaron: solo se corrige si el modelo está muy seguro, el tema es de respuesta fija y no hay pueblo de por medio */
      if (cl.id !== cur && cl.p >= 0.75 && INTENTS[cur] && !SIMPLE[cur] && !INTENTS[cur].cat && !findZone(limpiar(texto)) && !state.espera) return viaModelo(texto, cl);
      return html;
    }).then(function (r) { return r; }, function () { return html; });
  }

  function ask(text) {
    text = String(text || '').trim();
    if (!text) return;
    add('user', text, false);
    state.hist.push(text.slice(0, 80)); if (state.hist.length > 12) state.hist.shift();
    var out;
    try { out = responder(text); } catch (e) { if (window.console) console.error('chat:', e); out = 'Ahora no puedo responder. ' + PERSONA; state.cur = 'nada'; }
    var pensar = reduce ? 0 : 350;
    state.modelo = false;
    Promise.resolve(out).then(function (html) { return html; }, function () { state.cur = 'nada'; return 'Ahora no puedo responder. ' + PERSONA; }).then(function (html) { return refinar(text, html); }).then(function (html) {
      var cur = state.cur;
      var fin = function () { state.cur = cur; mostrar(html, text); };
      if (pensar) setTimeout(fin, pensar); else fin();
    });
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); input.value = ''; input.focus(); });
  chips.addEventListener('click', function (e) { var b = e.target.closest('button[data-q]'); if (b) ask(b.getAttribute('data-q')); });
  /* botones dentro de las respuestas: seguimiento, apuntar/quitar de la lista y enlace de correo con la conversación al día */
  log.addEventListener('click', function (e) {
    var q = e.target.closest('button[data-q]');
    if (q) { ask(q.getAttribute('data-q')); return; }
    var ad = e.target.closest('button[data-add]');
    if (ad) { var r = state.resultados[Number(ad.getAttribute('data-add'))]; if (r) { add('bot', anotar(r.n), true); acciones('lista', ''); } return; }
    var del = e.target.closest('button[data-del]');
    if (del) { state.lista.splice(Number(del.getAttribute('data-del')), 1); add('bot', verLista(), true); acciones('lista', ''); return; }
    var ml = e.target.closest('a[data-mail]');
    if (ml) ml.setAttribute('href', mailHref());
  });
  /* ---------- abrir y cerrar el panel ---------- */
  var html = document.documentElement;
  var movil = window.matchMedia('(max-width: 760px)');
  var avisoVisto = false;
  function marcarAviso() { avisoVisto = true; try { sessionStorage.setItem('vmc-aviso', '1'); } catch (e) {} }
  function ocultarAviso() { teaser.hidden = true; launcher.classList.remove('is-pulse'); }
  function abierto() { return !root.hidden; }
  function abrir() {
    root.hidden = false; ocultarAviso(); marcarAviso();
    launcher.setAttribute('aria-expanded', 'true'); launcher.setAttribute('aria-label', 'Cerrar el asistente de Distribuciones VM');
    html.classList.add('chat-open');
    log.scrollTop = log.scrollHeight;
    if (movil.matches) root.focus(); else input.focus();
  }
  function cerrar(devolverFoco) {
    root.hidden = true;
    launcher.setAttribute('aria-expanded', 'false'); launcher.setAttribute('aria-label', 'Abrir el asistente de Distribuciones VM');
    html.classList.remove('chat-open');
    if (devolverFoco) launcher.focus();
  }
  launcher.addEventListener('click', function () { if (abierto()) cerrar(false); else abrir(); });
  root.querySelector('.vmc-close').addEventListener('click', function () { cerrar(true); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && abierto()) cerrar(true); });
  teaser.querySelector('.vmc-teaser-txt').addEventListener('click', abrir);
  teaser.querySelector('.vmc-teaser-x').addEventListener('click', function () { ocultarAviso(); marcarAviso(); });
  /* en el móvil, al pulsar un enlace a otra parte de la misma página se cierra el panel para ver la sección */
  log.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (a && movil.matches && a.pathname === location.pathname && a.hash) cerrar(false);
  });

  /* aviso breve junto al icono: una vez por pestaña */
  try { avisoVisto = sessionStorage.getItem('vmc-aviso') === '1'; } catch (e) {}
  if (!avisoVisto) {
    setTimeout(function () {
      if (abierto()) return;
      teaser.hidden = false; launcher.classList.add('is-pulse');
      setTimeout(function () { if (!teaser.hidden) { ocultarAviso(); marcarAviso(); } }, 14000);
    }, 2500);
  }

  /* ---------- memoria de la pestaña (se borra al cerrarla; no sale del navegador) ---------- */
  function guardar() {
    try { sessionStorage.setItem('vmc', JSON.stringify({ zona: state.zone ? state.zone.nombre : null, negocio: state.negocio, lista: state.lista, hist: state.hist.slice(-12) })); } catch (e) {}
  }
  function cargarMemoria() {
    try {
      var d = JSON.parse(sessionStorage.getItem('vmc') || 'null');
      if (!d) return;
      state.negocio = typeof d.negocio === 'string' ? d.negocio : null;
      state.lista = Array.isArray(d.lista) ? d.lista.filter(function (x) { return x && typeof x.n === 'string'; }).slice(0, 30) : [];
      state.hist = Array.isArray(d.hist) ? d.hist.filter(function (x) { return typeof x === 'string'; }).slice(-12) : [];
      if (d.zona) ZONAS.forEach(function (z) { if (z.nombre === d.zona) state.zone = z; });
    } catch (e) {}
  }
  cargarMemoria();
  var mostrarOrig = mostrar;
  mostrar = function (h, q) { mostrarOrig(h, q); guardar(); };
  log.addEventListener('click', function () { setTimeout(guardar, 0); });

  add('bot', '¡Hola! Soy <b>Pablo</b>, el asistente virtual de Distribuciones VM. Te ayudo con el <b>reparto</b>, los <b>plazos</b>, el <b>horario</b>, las <b>formas de pago</b>, <b>hacerte cliente</b> o a buscar un <b>producto</b> y apuntarlo en tu lista. Prueba con: «¿repartís en Rueda?» o «¿qué leche me recomendáis para café?».' + (state.lista.length ? '<br><br>Sigo teniendo tu lista de interés (<b>' + state.lista.length + '</b>). Escribe «ver mi lista» para verla.' : ''), true);
})();
