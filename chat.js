/* Asistente de Distribuciones VM (sección de contacto).
   Funciona en el navegador, sin servidor ni servicios externos, y no guarda lo que se escribe.
   - Entiende conjugaciones y erratas (compara por raíces y tolera una letra de diferencia).
   - Recuerda el pueblo del cliente durante la conversación y calcula su próximo reparto con la fecha real.
   - Busca productos concretos en el catálogo de la web (carga los datos de las páginas la primera vez que hace falta).
   - Si la pregunta tiene dos partes, contesta las dos. Si no sabe algo, no se inventa nada: remite al teléfono y al correo.
   Para cambiar o añadir respuestas, edita INTENTS y ZONAS. */
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
  /* ¿alguna palabra del mensaje empieza por la raíz? (con una errata de tolerancia si la raíz tiene 5 letras o más) */
  function hasStem(tokens, stem) {
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t.indexOf(stem) === 0) return true;
      if (stem.length >= 5 && t.length >= stem.length - 1 && lev(t.slice(0, stem.length), stem) <= 1) return true;
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
    saludo: { k: [['hola'], ['buenas'], ['buenos', 'dias'], ['saludos'], ['hey']], solo: true, a: function () { return '¡Hola! Pregúntame lo que necesites sobre reparto, plazos, formas de pago o cómo hacerte cliente.'; } },
    gracias: { k: [['gracias'], ['perfecto'], ['genial'], ['estupendo'], ['vale']], solo: true, a: function () { return '¡A ti! Si necesitas algo más, aquí estoy.'; } },
    adios: { k: [['adios'], ['hasta', 'luego'], ['chao']], solo: true, a: function () { return '¡Hasta pronto!'; } },
    zona: { k: [['reparti'], ['llegai'], ['llegan'], ['vendei'], ['cobertur'], ['provinci'], ['kilometr'], ['zona'], ['llevai'], ['enviai'], ['envian'], ['mandai'], ['traei'], ['servi'], ['donde', 'vend'], ['domicilio']],
      a: function (c) { return c.zone ? zonaTxt(c.zone) : 'Repartimos en <b>Medina del Campo y comarca, hasta 90 km a la redonda</b>, y en las provincias vecinas de Valladolid, Salamanca, Ávila y Segovia. Dime tu pueblo y te digo qué día pasamos. Por ejemplo: «¿Repartís en Rueda?».'; } },
    dias: { k: [['dia', 'repart'], ['que', 'dias'], ['cuando', 'pasai'], ['cuando', 'llegai'], ['calendario'], ['quincenal'], ['semana', 'par'], ['semana', 'impar'], ['lunes'], ['martes'], ['miercoles'], ['jueves'], ['viernes'], ['sabado'], ['domingo'], ['finde'], ['fin', 'semana']],
      a: function (c) {
        if (c.zone) return zonaTxt(c.zone);
        if (c.has(['sabado']) || c.has(['domingo']) || c.has(['finde']) || c.has(['fin', 'semana'])) return 'Repartimos <b>de lunes a viernes</b>. Los fines de semana no hay reparto.';
        return 'Estos son los <b>días de reparto</b>:<ul><li>Medina del Campo: de lunes a viernes.</li><li>Rueda y Tordesillas: lunes y jueves.</li><li>Peñafiel y alrededores, Olmedo e Íscar: viernes.</li><li>La Seca, Serrada, Valdestillas, Viana de Cega, Mojados y Matapozuelos: miércoles.</li><li>Cantalapiedra, Alaejos, Nava del Rey, Villaverde de Medina y Arrabal de Portillo: miércoles cada 15 días, en semanas pares.</li><li>Peñaranda de Bracamonte: martes cada 15 días, en semanas impares.</li></ul>Dime tu pueblo y te lo confirmo.';
      } },
    plazo: { k: [['plazo'], ['tard'], ['entrega'], ['mismo', 'dia'], ['dia', 'siguiente'], ['rapid'], ['urgent'], ['24', 'hora'], ['48', 'hora']],
      a: function (c) { return c.zone ? (c.zone.medina ? 'En <b>Medina del Campo</b>, menos de 24 h; si pides antes de las 10:00, lo recibes el mismo día.' : 'A <b>' + esc(c.zone.nombre) + '</b> la entrega es de <b>24 a 48 h</b>, en días de reparto (' + c.zone.txt + ').') : 'En <b>Medina del Campo</b>, menos de 24 h; si pides antes de las 10:00, lo recibes el mismo día. En el resto de la zona, <b>entre 24 y 48 h</b>, en días laborables de lunes a viernes.'; } },
    proxima: { k: [['cuando', 'llega'], ['cuando', 'recib'], ['proxim', 'repart'], ['proxim', 'entreg'], ['pido', 'hoy'], ['pido', 'manana'], ['si', 'pido'], ['cuando', 'toca'], ['cuando', 'pasa']], needsZone: true,
      a: function (c) { return proxima(c.zone) || 'Llámanos al ' + TEL + ' y te confirmamos tu próximo reparto.'; } },
    minimo: { k: [['minimo']], a: function () { return '<b>No hay pedido mínimo.</b>'; } },
    envio: { k: [['gasto', 'envio'], ['envio'], ['porte'], ['gratis'], ['cobrai'], ['coste', 'envio'], ['transporte']], a: function () { return 'El reparto es <b>sin coste para el cliente</b>: no hay gastos de envío.'; } },
    ahora: { k: [['abierto', 'ahora'], ['abris', 'ahora'], ['atendeis', 'ahora'], ['estais', 'ahora'], ['ahora', 'atend']], peso: 4,
      a: function () {
        var n = madrid();
        if (n.wd >= 1 && n.wd <= 5 && n.h >= 7 && n.h < 15) return 'Sí, <b>ahora mismo estamos atendiendo</b> (7:00 a 15:00). Llámanos al ' + TEL + '.';
        return 'Ahora estamos <b>fuera del horario de atención</b> (7:00 a 15:00). Si llamas al ' + TEL + ', te atiende Valentín en su móvil.';
      } },
    horario: { k: [['horario'], ['hora'], ['abri'], ['abiert'], ['atencion'], ['cerrai'], ['hasta', 'hora']],
      a: function () { return 'Atendemos y gestionamos pedidos <b>de 7:00 a 15:00</b>. Pasadas las 15:00, las llamadas entrantes las atiende Valentín en su móvil. Teléfono: ' + TEL + '.'; } },
    cliente: { k: [['cliente'], ['registr'], ['empez'], ['como', 'compr'], ['primer', 'pedido'], ['ficha'], ['document'], ['nif'], ['papeles'], ['hacerme'], ['hacerse'], ['darme', 'alta'], ['dar', 'alta']],
      a: function () { return 'Hacerse cliente es muy sencillo:<ol><li><b>Nos conocemos:</b> te visitamos o hablamos contigo, te presentamos la empresa y el porfolio.</li><li><b>Te damos de alta:</b> rellenamos tu ficha de cliente con tus datos fiscales y acordamos la forma de pago (si es domiciliación, se firma el formato SEPA).</li><li><b>Primer pedido:</b> lo anotamos y te lo servimos el día acordado, entre 24 y 48 h desde tu primera llamada. Te asignamos un día de visita del comercial, semanal o quincenal.</li></ol>' + PERSONA; } },
    pedido: { k: [['como', 'pedir'], ['hacer', 'pedido'], ['hago', 'pedido'], ['realizar', 'pedido'], ['encargar'], ['como', 'pido'], ['quiero', 'pedir']],
      a: function () { return 'Los pedidos se gestionan <b>de 7:00 a 15:00</b>. Si ya eres cliente, llama al ' + TEL + ' o díselo a tu comercial en su día de visita. Si aún no lo eres, te damos de alta en 3 pasos (pregúntame «¿cómo me hago cliente?»).'; } },
    pago: { k: [['pago'], ['pagar'], ['pagai'], ['factura'], ['domicili'], ['tarjeta'], ['efectivo'], ['contado'], ['credito'], ['transferencia'], ['recibo'], ['sepa']],
      a: function () { return 'La forma de pago se <b>acuerda contigo</b>, según tu negocio y tu volumen de compra:<ul><li>Al contado en cada reparto, en efectivo o con tarjeta, con factura directa.</li><li>Albarán en cada reparto y factura resumen mensual, que se suele domiciliar en tu cuenta el día acordado: del 1 al 3 del mes, a los 15 días o a los 30 días.</li></ul>'; } },
    tarifa: { k: [['tarifa'], ['precio'], ['cuanto', 'cuesta'], ['cuanto', 'vale'], ['cuanto', 'cobrai'], ['cuesta'], ['oferta'], ['presupuesto']],
      a: function () { return 'En la web no publicamos precios. Si lo pides, te enviamos una <b>tarifa personalizada, sin compromiso</b>: suele estar en 24 h (antes si es solo de una parte de los artículos). Pídela en el ' + TEL + ' o en ' + MAIL + '.'; } },
    whatsapp: { k: [['whatsapp'], ['wasap'], ['guasap']], peso: 4, a: function () { return 'El ' + TEL + ' <b>no tiene WhatsApp</b>. Puedes llamarnos de 7:00 a 15:00 o escribir a ' + MAIL + '.'; } },
    contacto: { k: [['contacto'], ['telefono'], ['llamar'], ['correo'], ['email'], ['mail'], ['direccion'], ['donde', 'estai'], ['ubicacion'], ['oficina'], ['almacen'], ['como', 'llegar']],
      a: function () { return 'Puedes contactarnos así:<ul><li>Teléfono: ' + TEL + ' (7:00 a 15:00).</li><li>Correo: ' + MAIL + '</li><li>Dirección: Cl Labradores, n.º 45, parcela 24B · 47400 Medina del Campo, Valladolid.</li></ul>'; } },
    incidencia: { k: [['problema'], ['reclam'], ['queja'], ['devol'], ['equivoc'], ['falta'], ['roto'], ['defect'], ['no', 'llego'], ['error']],
      a: function () { return 'Lamentamos el problema. Para una incidencia con un pedido, llámanos al ' + TEL + ' de 7:00 a 15:00 o escribe a ' + MAIL + ', indicando el nombre de tu negocio y el albarán, y lo revisamos.'; } },
    empresa: { k: [['cuantos', 'anos'], ['anos', 'llevai'], ['historia'], ['desde', 'cuando'], ['quienes', 'sois'], ['empresa'], ['fundad'], ['experiencia']],
      a: function () { return 'Somos <b>Distribuciones Valentín Martín</b>, de Medina del Campo. Llevamos <b>44 años</b> de experiencia, desde 1982, distribuyendo a hostelería.'; } },
    redes: { k: [['facebook'], ['instagram'], ['redes']], a: function () { return 'Síguenos en <a href="https://www.facebook.com/share/1LfPCX2kSw/" target="_blank" rel="noopener">Facebook</a> e <a href="https://www.instagram.com/distrvalentinmartin/" target="_blank" rel="noopener">Instagram</a>.'; } },
    persona: { k: [['persona'], ['humano'], ['comercial'], ['visita'], ['agente'], ['hablar', 'con']], a: function () { return 'Claro. ' + PERSONA + ' Si eres cliente, tu comercial pasa el día de visita que se te asignó (semanal o quincenal).'; } },
    productos: { k: [['que', 'vendei'], ['que', 'tenei'], ['producto'], ['marca'], ['catalogo'], ['gama'], ['surtido'], ['distribui'], ['ofrecei']],
      a: function () { return 'Distribuimos para hostelería, entre otras gamas: <a href="pascual.html">Pascual</a> (leche, bebidas, yogures y postres), <a href="agua.html">aguas</a>, <a href="vinos.html">vinos</a>, <a href="despensa.html">despensa</a>, <a href="cafe-mocay.html">Café Mocay</a> e infusiones, <a href="menaje.html">menaje</a>, <a href="refrigerados.html">refrigerados</a> y <a href="congelados.html">congelados</a>. Dime qué buscas y lo miro.'; } },
    bebidas: { k: [['cerveza'], ['refresco'], ['licor'], ['cola'], ['alcohol'], ['bebida']], cat: true,
      a: function () { return 'También distribuimos bebidas. En la web tienes <a href="agua.html">aguas</a>, <a href="vinos.html">vinos</a> y las bebidas de <a href="pascual.html">Pascual</a>. Para cerveza, refrescos y licores, pídenos la tarifa en el ' + TEL + ' o en ' + MAIL + '.'; } },
    cafe: { k: [['cafe'], ['mocay'], ['infusion'], ['te', 'negro']], cat: true, a: function () { return 'Trabajamos <a href="cafe-mocay.html">Café Mocay</a>: café en grano, descafeinados, cápsulas, infusiones en pirámide y clásicas en bolsita, y complementos.'; } },
    pascual: { k: [['leche'], ['pascual'], ['yogur'], ['natilla'], ['batido'], ['bifruta'], ['vivesoy'], ['movit'], ['brik'], ['colacao'], ['nata'], ['mantequilla']], cat: true, a: function () { return 'En <a href="pascual.html">Pascual</a> tienes:<ul><li><b>Leche para hostelería:</b> <a href="pascual.html#leche-intense">Intense</a> (la más vendida), <a href="pascual.html#bag-in-box-10l">Classic en caja de 10 L</a>, <a href="pascual.html#leche-classic-botella">Classic en botella</a>, <a href="pascual.html#leche-extra-creme">Extra Crème</a> y <a href="pascual.html#sin-lactosa-barista">sin lactosa Barista</a>.</li><li><b>Leche para el hogar:</b> <a href="pascual.html#leche-hogar">botella de 1,5 L</a>, <a href="pascual.html#leche-brik">brik</a>, <a href="pascual.html#sin-lactosa">sin lactosa</a> y <a href="pascual.html#movit">Movit con calcio</a>.</li><li><a href="pascual.html#batidos-vidrio">Batidos en vidrio</a> y <a href="pascual.html#batidos-brik">en brik</a>, <a href="pascual.html#natas">natas</a> y <a href="pascual.html#mantequillas">mantequillas</a>.</li><li><a href="pascual.html#vivesoy">Vivesoy</a>, <a href="pascual.html#bifrutas">Bifrutas</a>, <a href="pascual.html#yogures">yogures</a> y <a href="pascual.html#natillas">postres</a>.</li></ul>'; } },
    lechecafe: { k: [['leche', 'cafe'], ['leche', 'cafeteria'], ['leche', 'barista'], ['leche', 'vaporiz'], ['leche', 'espum'], ['leche', 'capuchin'], ['leche', 'cortado'], ['leche', 'hosteleria'], ['leche', 'recomend'], ['mejor', 'leche'], ['que', 'leche'], ['leche', 'mas', 'vendid'], ['leche', 'barra'], ['leche', 'emulsion'], ['emulsion']], peso: 1.3,
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
  var CAT = null, catPromise = null;
  var PAGINAS = { pascual: 'Pascual', agua: 'Aguas', vinos: 'Vinos', despensa: 'Despensa', congelados: 'Congelados', refrigerados: 'Refrigerados', menaje: 'Menaje' };
  function cargarCatalogo() {
    if (catPromise) return catPromise;
    var items = [];
    var fuentes = [['helios-products.js', null], ['villacampo-products.js', null], ['pascual-products.js', 'pascual'], ['agua-products.js', 'agua'], ['vinos-products.js', 'vinos'], ['despensa-products.js', 'despensa'], ['congelados-products.js', 'congelados'], ['menaje-articulos.js', 'menaje']];
    var viejo = window.ProductWorld;
    var actual = null;
    window.ProductWorld = { init: function (cfg) {
      (cfg.sections || []).forEach(function (s) {
        [].concat(s.products || [], s.variants || [], s.frames || [], s.product ? [s.product] : []).forEach(function (p) { if (p && p.name) items.push({ n: p.name, p: actual, f: s.family || '', a: s.id || SLUG((s.family || '') + ' ' + (s.title || '')) }); });
      });
    } };
    var cargar = function (src, pag) {
      return new Promise(function (ok) {
        var s = document.createElement('script');
        actual = pag;
        s.src = src; s.onload = s.onerror = function () { ok(); };
        document.head.appendChild(s);
      });
    };
    var refri = fetch('refrigerados-products.js').then(function (r) { return r.text(); }).then(function (t) {
      var re = /\{group:'([^']*)',brand:'([^']*)',name:'((?:[^'\\]|\\.)*)'/g, m;
      while ((m = re.exec(t))) items.push({ n: m[3].split("\\'").join("'"), p: 'refrigerados', f: m[2], a: 'referencias' });
    }).catch(function () {});
    catPromise = fuentes.reduce(function (pr, f) { return pr.then(function () { return cargar(f[0], f[1]); }); }, Promise.resolve()).then(function () { return refri; }).then(function () {
      window.ProductWorld = viejo;
      (window.MENAJE || []).forEach(function (m) { items.push({ n: m.n, p: 'menaje', f: m.g, a: 'referencias' }); });
      CAT = items.map(function (it) { return { n: it.n, p: it.p, f: it.f, a: it.a, t: norm(it.n + ' ' + it.f).split(' ') }; });
    });
    return catPromise;
  }
  var RUIDO_RAIZ = /^(teneis|tenemos|tienen|tienes|tiene|vendeis|venden|vendemos|trabajais|trabajan|distribuis|distribuyen|busco|buscamos|necesito|necesitamos|quiero|queremos|quisiera|podeis|pueden|servis|sirven|disponible|disponibles|referencia|referencias|vuestro|vuestra|vuestros|vuestras|nuestro|nuestra)$/;
  var RUIDO_EXACTO = /^(hay|ver|mirar|algun|alguna|alguno|algo|todo|toda|una|unos|unas|los|las|del|con|sin|para|por|que|como|cual|cuales|cuanto|cuesta|vale|precio|esta|este|ese|esa|mas|muy|bien|favor|hola|buenas|gracias|tambien|ademas|tipo|marca|producto|productos|gama|stock|ref|cosas|cosa|articulo|articulos|material|materiales)$/;
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
    res.sort(function (a, b) { return a.n.length - b.n.length; });
    return res;
  }

  /* ---------- análisis del mensaje ---------- */
  var state = { zone: null, last: null, espera: null, cur: null, negocio: null, lista: [], resultados: [], hist: [] };
  var NEEDS_ZONE = { proxima: true };
  var SIMPLE = { saludo: 1, gracias: 1, adios: 1 };

  function analizar(raw) {
    var t = norm(raw).replace(/\bcola cao\b/g, 'colacao').replace(/\bbrick\b/g, 'brik').replace(/\blacteos?\b/g, 'leche').replace(/\bleche del cafe\b/g, 'leche cafe').replace(/\bsemi\b/g, 'semidesnatada'), tokens = t.split(' ').filter(Boolean);
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
        var catIntent = top && INTENTS[top.id].cat ? top.id : null;
        return cargarCatalogo().then(function () {
          var r = buscar(a.tokens);
          if (r.length) {
            if (r.length > 6 && catIntent && cont.length === 1) { state.cur = catIntent; return INTENTS[catIntent].a(c); }
            var lista = unicos(r, 6);
            state.resultados = lista.map(function (it) { return { n: etiqueta(it), href: enlaceProducto(it), pg: PAGINAS[it.p] }; });
            state.cur = 'producto';
            return 'Sí, esto es lo que tenemos relacionado:<ul>' + state.resultados.map(function (x, i) { return '<li><a href="' + x.href + '">' + esc(x.n) + '</a> <small>(' + x.pg + ')</small> <button type="button" class="chat-mini" data-add="' + i + '">Apuntar</button></li>'; }).join('') + '</ul>' + (r.length > lista.length ? 'Y alguno más: míralo en <a href="' + lista[0].p + '.html">' + PAGINAS[lista[0].p] + '</a>. ' : '') + 'Para pedirlo o pedir tarifa: ' + TEL + '.';
          }
          if (catIntent) { state.cur = catIntent; return INTENTS[catIntent].a(c); }
          return fallback(a, c);
        });
      }
    }
    return fallback(a, c);
  }

  function fallback(a, c) {
    var sc = a.scored;
    if (sc.length && sc[0].s >= 3) {
      var partes = [sc[0]];
      if (sc[1] && sc[1].s >= 3 && sc[1].s >= sc[0].s * 0.4 && !INTENTS[sc[0].id].solo && !INTENTS[sc[1].id].solo && !INTENTS[sc[0].id].cat && !INTENTS[sc[1].id].cat) partes.push(sc[1]);
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
    state.cur = 'nada';
    return 'No estoy seguro de haberte entendido. Puedo ayudarte con el <b>reparto</b> (dime tu pueblo), los <b>plazos</b>, el <b>horario</b>, las <b>formas de pago</b>, <b>cómo hacerte cliente</b> o buscar un <b>producto</b>. ' + PERSONA;
  }

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

  function mostrar(html, preguntada) {
    var cur = state.cur;
    if (html) { add('bot', html, true); acciones(cur, preguntada); }
  }
  function ask(text) {
    text = String(text || '').trim();
    if (!text) return;
    add('user', text, false);
    state.hist.push(text.slice(0, 80)); if (state.hist.length > 12) state.hist.shift();
    var out;
    try { out = responder(text); } catch (e) { if (window.console) console.error('chat:', e); out = 'Ahora no puedo responder. ' + PERSONA; state.cur = 'nada'; }
    var pensar = reduce ? 0 : 350;
    Promise.resolve(out).then(function (html) { return html; }, function () { state.cur = 'nada'; return 'Ahora no puedo responder. ' + PERSONA; }).then(function (html) {
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
  /* mientras el chat está a la vista, el botón fijo «Llamar» (móvil) se oculta para no tapar el botón Enviar */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { document.documentElement.classList.toggle('chat-open', en[0].isIntersecting); }, { threshold: 0.05 }).observe(root);
  }
  add('bot', '¡Hola! Soy el <b>Asistente de Distribuciones VM</b>. Puedo decirte <b>dónde repartimos y qué día</b>, <b>cuándo te llegaría un pedido</b>, los <b>plazos</b>, el <b>horario</b>, las <b>formas de pago</b>, <b>cómo hacerte cliente</b> o buscar un <b>producto</b> y apuntarlo en tu lista. Prueba con: «¿repartís en Rueda?» o «¿qué leche me recomendáis para café?».', true);
})();
