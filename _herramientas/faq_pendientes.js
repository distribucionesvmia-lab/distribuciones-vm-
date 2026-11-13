/* Genera PREGUNTAS-POR-CONFIRMAR.md a partir de asistente-faq.js: las respuestas marcadas pend:true son las que la web no dice
   y que el asistente contesta derivando a una persona. Cuando la empresa las confirme, se escribe la respuesta real en «a»,
   se quita pend:true y se vuelve a ejecutar este script.
   Uso, desde la raíz del repositorio:   node _herramientas/faq_pendientes.js */
const fs = require('fs'), path = require('path');
const raiz = path.resolve(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(raiz, 'asistente-faq.js'), 'utf8'));
const F = global.window.ASISTENTE_FAQ;
const limpio = h => h.replace(/\{TEL\}/g, '635 09 80 44').replace(/\{MAIL\}/g, 'oficina@distribucionesvm.es').replace(/\{PERSONA\}/g, '').replace(/<li>/g, '\n  - ').replace(/<[^>]+>/g, '').replace(/\n{2,}/g, '\n').trim();
const pend = F.filter(f => f.pend);
let md = '# Preguntas del asistente que la web no responde\n\n' +
  'Pablo (el asistente de la web) contesta a estas ' + pend.length + ' preguntas **derivando a una persona**, porque ni la web ni la información que tenemos dicen la respuesta concreta. ' +
  'Para que pueda contestarlas de verdad, responde a cada una (basta una frase, por ejemplo «Sí, facturamos por correo en PDF») y se incorpora a `asistente-faq.js`.\n\n' +
  'Lo que hoy contesta Pablo es solo lo que consta en la web, más la derivación al teléfono o al correo.\n\n';
pend.forEach((f, i) => {
  md += '## ' + (i + 1) + '. ' + f.q[0] + '\n\n' +
    '- Otras formas en que lo preguntarán: ' + f.q.slice(1, 4).map(x => '«' + x + '»').join(', ') + '\n' +
    '- Lo que contesta ahora Pablo: ' + limpio(f.a).replace(/\n/g, ' ') + '\n' +
    '- **Respuesta de la empresa:** _(pendiente)_\n\n';
});
fs.writeFileSync(path.join(raiz, 'PREGUNTAS-POR-CONFIRMAR.md'), md);
console.log('PREGUNTAS-POR-CONFIRMAR.md: ' + pend.length + ' preguntas pendientes de ' + F.length + ' entradas');
