/* Pasa preguntas por el asistente real y apunta qué tema contesta (atributo data-intent).
   Uso:  node _herramientas/ml/etiquetar.js entrada.json salida.json   (entrada: {tema: [preguntas]}) */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.resolve(__dirname, '..', '..');
const T = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]).replace(/\/$/, '/index.html')); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
(async () => {
  const entrada = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const clave = Object.keys(entrada)[0]; const datos = entrada[clave];
  await new Promise(r => srv.listen(0, r)); const base = 'http://localhost:' + srv.address().port + '/index.html';
  const nav = await chromium.launch(); const salida = [];
  for (const tema of Object.keys(datos)) for (const q of datos[tema]) {
    const p = await nav.newPage();
    try {
      await p.clock.setFixedTime(new Date('2026-11-12T09:00:00Z'));
      await p.goto(base); await p.click('#vmc-launcher'); await p.waitForSelector('#chat:not([hidden])');
      const n = await p.locator('#chat .chat-bot').count();
      await p.fill('#chat .chat-input', q); await p.press('#chat .chat-input', 'Enter');
      await p.waitForFunction(n => document.querySelectorAll('#chat .chat-bot').length > n, n, { timeout: 8000 }); await p.waitForTimeout(350);
      const ultimo = p.locator('#chat .chat-bot').last();
      salida.push({ q, tema, rules: (await ultimo.getAttribute('data-intent')) || '', texto: (await ultimo.innerText()).slice(0, 80) });
    } catch (e) { salida.push({ q, tema, rules: 'error', texto: String(e).slice(0, 80) }); }
    await p.close();
  }
  fs.writeFileSync(process.argv[3], JSON.stringify(salida, null, 1)); await nav.close(); srv.close();
})();
