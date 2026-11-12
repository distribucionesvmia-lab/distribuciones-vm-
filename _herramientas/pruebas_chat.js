/* Pruebas automáticas del asistente de la portada (chat.js).
   Uso, desde la raíz del repositorio:   node _herramientas/pruebas_chat.js
   Necesita Playwright (require('playwright')). Arranca un servidor local, abre index.html, escribe cada pregunta en el
   chat y comprueba la respuesta. Se fija la fecha en un jueves a las 10:00 (hora de Madrid) para que las respuestas
   que dependen del día sean siempre las mismas. Si algo falla, el script termina con código 1. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json' };
const servidor = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});

const JUEVES_10 = new Date('2026-11-12T09:00:00Z');   // jueves 12 nov 2026, 10:00 en Madrid
const JUEVES_17 = new Date('2026-11-12T16:00:00Z');   // el mismo día a las 17:00

/* [mensajes que se escriben en orden, comprobaciones sobre la ÚLTIMA respuesta]
   texto: expresión que debe aparecer en el texto · html: expresión sobre el HTML (enlaces) · no: no debe aparecer · extra: opciones */
const CASOS = [
  [['¿repartís en Rueda?'], { texto: /Rueda.*lunes y jueves|lunes y jueves.*Rueda/is }],
  [['¿Qué días repartís en Peñafiel?'], { texto: /viernes/i }],
  [['¿llegáis a Olmedo?'], { texto: /viernes/i }],
  [['reparto en La Seca'], { texto: /miércoles/i }],
  [['¿repartís en Alaejos?'], { texto: /semanas pares/i }],
  [['¿repartís en Peñaranda de Bracamonte?'], { texto: /martes/i }],
  [['¿repartís en Medina del Campo?'], { texto: /lunes a viernes/i }],
  [['¿Repartís en Zamora?'], { texto: /No tengo/i }],
  [['¿repartís los sábados?'], { texto: /de lunes a viernes/i }],
  [['¿Cuánto tardáis?'], { texto: /24/ }],
  [['¿hay pedido mínimo?'], { texto: /No hay pedido mínimo/i }],
  [['¿gastos de envío?'], { texto: /sin coste/i }],
  [['¿cómo me hago cliente?'], { texto: /ficha|alta/i }],
  [['¿formas de pago?'], { texto: /contado|domicili/i }],
  [['¿horario?'], { texto: /7:00 a 15:00/ }],
  [['¿tenéis whatsapp?'], { texto: /no tiene WhatsApp/i }],
  [['teléfono'], { texto: /635 09 80 44/ }],
  [['¿dónde estáis?'], { texto: /Labradores/ }],
  [['¿cuántos años lleváis?'], { texto: /44 años/ }],
  [['facebook'], { texto: /Facebook/ }],
  [['¿tenéis tarifa?'], { texto: /no publicamos precios/i }],
  [['quiero hablar con una persona'], { texto: /llama/i }],
  [['tengo un problema con un pedido'], { texto: /albarán/i }],
  [['hola'], { texto: /Hola/ }],
  [['gracias'], { texto: /A ti/ }],
  [['¿cuándo me llega?'], { texto: /De qué pueblo/i }],
  [['¿cuándo me llega si pido hoy?', 'Rueda'], { texto: /Rueda/ }],
  [['¿tenéis copas de vino?'], { texto: /Copa/i }],
  [['¿tenéis nata para montar?'], { texto: /Nata para montar/i, html: /pascual\.html#natas/ }],
  [['¿tenéis mantequilla?'], { texto: /Mantequilla/i }],
  [['leche sin lactosa'], { texto: /lactosa/i, html: /pascual\.html#sin-lactosa/ }],
  [['¿tenéis Movit?'], { texto: /Movit/i, html: /pascual\.html#movit/ }],
  [['¿tenéis colacao?'], { texto: /ColaCao/i, html: /pascual\.html#batidos-vidrio/ }],
  [['batidos en brik'], { texto: /brik/i }],
  [['¿qué leche me recomendáis para café?'], { texto: /Intense[\s\S]*Classic[\s\S]*Extra Crème[\s\S]*Barista/i }],
  [['leche del café'], { texto: /Intense/i }],
  [['¿tenéis leche sin lactosa barista?'], { texto: /Barista/i }],
  [['¿cuál es la leche más vendida?'], { texto: /Intense/i, texto2: /más vendida/i }],
  [['leche para el hogar'], { texto: /para el hogar/i }],
  [['¿tenéis yogures?'], { texto: /yogur/i }],
  [['¿tenéis agua con gas?'], { texto: /Perrier|Pellegrino|agua/i }],
  [['¿tenéis aceite?'], { texto: /aceite|despensa/i }],
  [['¿tenéis café?'], { texto: /Mocay/ }],
  [['¿tenéis cerveza?'], { texto: /tarifa/i }],
  [['¿tenéis croissants?'], { texto: /croissant|congelados/i }],
  [['apúntame nata para montar'], { texto: /Dime cuál/i }],
  [['apúntame sirope de galleta', 'ver mi lista'], { texto: /galleta/i }],
  [['apúntame zzzxyz'], { texto: /tal cual/i }],
  [['apúntame sirope de galleta', 'enviar mi lista'], { mail: /galleta/i }],
  [['apúntame sirope de galleta', 'vaciar lista', 'ver mi lista'], { texto: /vacía/i }],
  [['tengo un bar'], { texto: /anoto que tienes un bar/i }],
  [['tengo un bar', '¿qué leche me recomendáis?'], { texto: /Para tu bar/i }],
  [['¿horario?'], { acts: true, tel: /tel:\+34635098044/, correo: /^mailto:oficina@distribucionesvm\.es/, sinFuera: true }],
  [['¿horario?'], { acts: true, fuera: /móvil/i, hora: JUEVES_17 }],
  [['hola'], { sinActs: true }],
  [['¿repartís en Rueda?', '¿Cuánto tardáis?'], { mail: /Rueda/ }],
  [['¿repartís en Rueda?'], { seguimiento: true }]
];

(async () => {
  await new Promise(r => servidor.listen(0, r));
  const base = 'http://localhost:' + servidor.address().port + '/index.html';
  const navegador = await chromium.launch();
  let fallos = 0;
  for (const [mensajes, ok] of CASOS) {
    const pagina = await navegador.newPage({ viewport: { width: 1280, height: 900 } });
    try {
      await pagina.clock.setFixedTime(ok.hora || JUEVES_10);
      await pagina.goto(base);
      for (const m of mensajes) {
        const antes = await pagina.locator('#chat .chat-bot').count();
        await pagina.fill('#chat .chat-input', m);
        await pagina.press('#chat .chat-input', 'Enter');
        await pagina.waitForFunction(n => document.querySelectorAll('#chat .chat-bot').length > n, antes, { timeout: 8000 });
        await pagina.waitForTimeout(450);
      }
      const ultimo = pagina.locator('#chat .chat-bot').last();
      const texto = await ultimo.innerText();
      const html = await ultimo.innerHTML();
      const acts = pagina.locator('#chat .chat-acts').last();
      const hayActs = await pagina.locator('#chat .chat-acts').count() > 0;
      const errores = [];
      if (ok.texto && !ok.texto.test(texto)) errores.push('texto no contiene ' + ok.texto);
      if (ok.texto2 && !ok.texto2.test(texto)) errores.push('texto no contiene ' + ok.texto2);
      if (ok.html && !ok.html.test(html)) errores.push('html no contiene ' + ok.html);
      if (ok.acts && !hayActs) errores.push('faltan los botones de llamar y escribir');
      if (ok.sinActs && hayActs) errores.push('no debería tener botones');
      if (hayActs && (ok.tel || ok.correo || ok.fuera || ok.sinFuera || ok.mail || ok.seguimiento)) {
        const h = await acts.innerHTML(), t = await acts.innerText();
        if (ok.tel && !ok.tel.test(h)) errores.push('falta el enlace de llamada');
        if (ok.correo) { const href = await acts.locator('a[data-mail]').getAttribute('href'); if (!ok.correo.test(href)) errores.push('enlace de correo raro: ' + href); }
        if (ok.fuera && !ok.fuera.test(t)) errores.push('debería avisar de que está fuera de horario');
        if (ok.sinFuera && /fuera del horario/i.test(t)) errores.push('no debería avisar de fuera de horario');
        if (ok.seguimiento && (await acts.locator('.chat-follow button').count()) < 1) errores.push('faltan botones de seguimiento');
      }
      if (ok.mail) {
        const enlace = pagina.locator('#chat a[data-mail]').last();
        await enlace.evaluate(a => a.addEventListener('click', e => e.preventDefault()));
        await enlace.click();
        const href = decodeURIComponent(await enlace.getAttribute('href'));
        if (!ok.mail.test(href)) errores.push('el correo no recoge ' + ok.mail + ' → ' + href.replace(/\n/g, ' | ').slice(0, 120));
      }
      if (errores.length) { fallos++; console.log('✗', JSON.stringify(mensajes), '\n   ', errores.join('\n    '), '\n    respuesta:', texto.replace(/\s+/g, ' ').slice(0, 160)); }
      else console.log('✓', JSON.stringify(mensajes));
    } catch (e) {
      fallos++; console.log('✗', JSON.stringify(mensajes), '\n    error:', String(e.message).split('\n')[0]);
    }
    await pagina.close();
  }
  await navegador.close();
  servidor.close();
  console.log(fallos ? '\n' + fallos + ' de ' + CASOS.length + ' pruebas con fallo' : '\nTodas las pruebas pasan (' + CASOS.length + ')');
  process.exit(fallos ? 1 : 0);
})();
