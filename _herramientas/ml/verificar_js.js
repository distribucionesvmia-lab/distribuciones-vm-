/* Comprueba que el cálculo del navegador (clasificar() en chat.js) da lo mismo que Python (verificacion.json).
   Uso:  node _herramientas/ml/verificar_js.js */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const chat = fs.readFileSync(path.join(ROOT, 'chat.js'), 'utf8');
const norm = chat.match(/var norm = (function \(t\) \{[^\n]*\});/)[1];
const bloque = chat.slice(chat.indexOf('var MODELO = null'), chat.indexOf('function viaModelo'));
const window = {}; eval(fs.readFileSync(path.join(ROOT, 'modelo-asistente.js'), 'utf8').replace('window.', 'window.'));
const m = window.MODELO_ASISTENTE; m.pos = {}; m.vocab.forEach((g, i) => { m.pos[g] = i; });
const f = new Function('norm', 'MODELO_PRE', bloque.replace('var MODELO = null, modeloPromise = null;', 'var MODELO = MODELO_PRE, modeloPromise = null;') + '; return clasificar;');
const clasificar = f(eval('(' + norm + ')'), m);
const ver = JSON.parse(fs.readFileSync(path.join(__dirname, 'verificacion.json'), 'utf8'));
let mal = 0;
for (const v of ver) { const r = clasificar(v.q); const ok = r && r.id === v.clase && Math.abs(r.p - v.p) < 0.002; if (!ok) mal++; console.log(ok ? '✓' : '✗', v.q, '→', r && r.id, r && r.p.toFixed(4), '(Python', v.clase, v.p + ')'); }
process.exit(mal ? 1 : 0);
