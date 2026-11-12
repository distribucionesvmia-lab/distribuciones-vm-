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

/* Formas distintas de preguntar lo mismo: sin signos de interrogación, sin tildes, con abreviaturas y con erratas.
   [mensaje, expresión que debe aparecer en la respuesta] */
const VARIANTES = [
  // productos y categorías
  ['q leches teneis', /hostelería|Intense/i], ['que leches teneis', /hostelería|Intense/i], ['leches', /hostelería|Intense/i], ['leche', /hostelería|Intense/i],
  ['teneis leche', /hostelería|Intense/i], ['tenéis leche?', /hostelería|Intense/i], ['que tipos de leche hay', /hostelería|Intense/i], ['venden leche', /hostelería|Intense/i],
  ['hay leche sin lactosa', /lactosa/i], ['sin lactosa', /lactosa/i], ['leche para intolerantes a la lactosa', /lactosa/i],
  ['vendeis nata', /nata/i], ['nata para montar', /Nata para montar/i], ['teneis nata de cocinar', /Nata para cocinar/i], ['nata', /nata/i],
  ['mantequilla', /Mantequilla/i], ['teneis mantequilla sin sal', /sin sal/i], ['batidos', /Batido/i], ['batido de chocolate', /chocolate/i], ['colacao', /ColaCao/i], ['cola cao', /ColaCao/i],
  ['yogures', /yogur/i], ['yogur de fresa', /fresa/i], ['copas', /menaje|Copa/i], ['copas de vino', /Copa/i], ['vasos', /menaje|Vaso/i], ['platos', /menaje|Plato/i],
  ['vino', /vinos/i], ['teneis vino blanco', /vinos|Bornos|Verdejo/i], ['agua', /agua/i], ['aguas con gas', /gas|Pellegrino|Perrier|agua/i], ['teneis agua sin gas', /agua|Bezoya|Aquarel/i],
  ['cafe', /Mocay/i], ['teneis cafe en grano', /Mocay/i], ['infusiones', /infusion|Mocay/i], ['cervezas', /tarifa/i], ['refrescos', /tarifa|Pascual/i], ['teneis cocacola', /tarifa|bebidas/i],
  ['que marcas teneis', /Pascual/i], ['que productos teneis', /Pascual/i], ['que vendeis', /Pascual/i], ['catalogo', /Pascual/i], ['que ofreceis', /Pascual/i], ['gama de productos', /Pascual/i],
  ['aceite', /aceite|despensa/i], ['teneis atun', /Atún|despensa/i], ['legumbres', /Luengo|legumbre|Lenteja|Garbanzo/i], ['lentejas', /Lenteja/i], ['salsas', /salsa|despensa/i],
  ['congelados', /congelado/i], ['pan congelado', /pan|congelado/i], ['croissant', /Croissant/i], ['quesos', /queso|refrigerado/i], ['huevos', /huevo|refrigerado/i], ['jamon', /jamón|charcuter|refrigerado/i],
  // reparto
  ['repartis en rueda', /lunes y jueves/i], ['llegais a tordesillas', /lunes y jueves/i], ['q dias pasais por olmedo', /viernes/i], ['dias de reparto', /Medina del Campo/i], ['que dias repartis', /Medina del Campo/i],
  ['cuando pasais por mojados', /miércoles/i], ['a donde repartis', /90 km/i], ['zona de reparto', /90 km/i], ['hasta donde llegais', /90 km/i], ['llevais a peñafiel', /viernes/i],
  ['repartis a domicilio', /reparto|repartimos|90 km/i], ['haceis envios', /sin coste|repartimos|90 km/i], ['donde vendeis', /90 km/i], ['reparto en cantalapiedra', /miércoles/i],
  // plazos y horario
  ['cuanto tardais en entregar', /24/], ['cuanto tarda un pedido', /24/], ['en cuanto tiempo llega', /24/], ['plazo de entrega', /24/], ['entregais el mismo dia', /mismo día/i], ['es urgente', /24|mismo día/i], ['tiempo de entrega', /24/],
  ['a que hora abris', /7:00 a 15:00/], ['hasta que hora estais', /15:00/], ['horario de atencion', /7:00 a 15:00/], ['estais abiertos', /7:00 a 15:00|atendiendo|fuera/i], ['horarios', /7:00 a 15:00/], ['abris por la tarde', /7:00 a 15:00/],
  // pago, cliente, condiciones
  ['como se paga', /contado|domicili/i], ['se puede pagar con tarjeta', /tarjeta/i], ['aceptais efectivo', /efectivo/i], ['pagos', /contado|domicili/i], ['puedo pagar a 30 dias', /30 días/i], ['domiciliacion bancaria', /domicili/i], ['teneis datafono', /tarjeta|contado/i],
  ['quiero ser cliente', /ficha|alta/i], ['como me doy de alta', /ficha|alta/i], ['como empiezo a comprar', /ficha|alta/i], ['que necesito para ser cliente', /ficha|alta/i], ['hacerme cliente', /ficha|alta/i], ['abrir una cuenta', /ficha|alta/i],
  ['minimo de pedido', /No hay pedido mínimo/i], ['pedido minimo', /No hay pedido mínimo/i], ['cual es el pedido minimo', /No hay pedido mínimo/i], ['hay minimo', /No hay pedido mínimo/i],
  ['cobrais el transporte', /sin coste/i], ['tiene coste el envio', /sin coste/i], ['el envio es gratis', /sin coste/i], ['gastos de envio', /sin coste/i], ['portes', /sin coste/i],
  ['precios', /no publicamos precios/i], ['cuanto cuesta la leche', /no publicamos precios/i], ['tarifa', /no publicamos precios/i], ['me pasais precios', /no publicamos precios/i], ['quiero presupuesto', /no publicamos precios|tarifa/i], ['cuanto vale', /no publicamos precios/i],
  ['como hago un pedido', /7:00 a 15:00/], ['quiero hacer un pedido', /7:00 a 15:00/], ['como pido', /7:00 a 15:00/], ['encargar mercancia', /7:00 a 15:00/],
  // contacto y empresa
  ['telefono', /635 09 80 44/], ['cual es vuestro telefono', /635 09 80 44/], ['numero de telefono', /635 09 80 44/], ['email', /oficina@distribucionesvm\.es/], ['correo', /oficina@distribucionesvm\.es/],
  ['direccion', /Labradores/], ['donde estais', /Labradores/], ['donde os encuentro', /Labradores/], ['whatsapp', /no tiene WhatsApp/i], ['teneis wasap', /no tiene WhatsApp/i], ['como contacto con vosotros', /635 09 80 44/],
  ['quiero hablar con alguien', /llama/i], ['pasame con una persona', /llama/i], ['me puede llamar alguien', /llama|635/i], ['atencion al cliente', /llama|635/i], ['hablar con un comercial', /comercial|llama/i],
  ['desde cuando existis', /1982|44 años/], ['cuantos años llevais', /44 años/], ['quienes sois', /Distribuciones Valentín Martín/], ['historia de la empresa', /1982|44 años/], ['instagram', /Instagram/],
  // incidencias y cortesía
  ['me ha llegado roto', /albarán/i], ['me falta un producto', /albarán/i], ['tengo una queja', /albarán|Lamentamos/i], ['no me ha llegado el pedido', /albarán|Lamentamos/i], ['devolucion', /albarán|Lamentamos/i],
  ['buenas', /Hola/], ['buenos dias', /Hola/], ['buenas tardes', /Hola/], ['hey', /Hola/], ['muchas gracias', /A ti/], ['ok gracias', /A ti/], ['adios', /Hasta pronto/], ['hasta luego', /Hasta pronto/], ['vale', /A ti/],
  // leche para café
  ['q leche pongo en el cafe', /Intense/], ['leche para cafeteria', /Intense/], ['leche para espumar', /Intense|Barista/], ['mejor leche para capuccino', /Intense|Barista/], ['leche barista', /Barista/], ['cual es la leche mas vendida', /Intense/], ['q leche me recomiendas', /Intense/],
  ['leche para hosteleria', /Intense|Classic/], ['leche profesional', /Intense|Classic/], ['leche para bares', /Intense|Classic/], ['leche mas barata', /Classic/],
  // abreviaturas y erratas
  ['q dias reparten x medina', /lunes a viernes/i], ['xq no llega mi pedido', /albarán|Lamentamos|llama/i], ['tb teneis aceite', /aceite|despensa/i], ['tenies leche', /hostelería|Intense/i], ['repartis en ruedaa', /lunes y jueves/i],
  ['hola, q leches teneis', /hostelería|Intense/i], ['buenos dias, queria saber si repartis en rueda', /lunes y jueves/i], ['perdona, ¿hasta que hora abris? gracias', /15:00/], ['oye q hora abris', /7:00 a 15:00/],
  ['una pregunta: aceptais tarjeta', /tarjeta/i], ['q tal', /Hola/], ['disculpa podrias decirme cuanto tardais', /24/], ['hola buenas tardes teneis nata para montar por favor', /Nata para montar/i],
  ['buenas, me gustaria saber el horario', /7:00 a 15:00/], ['quisiera saber que dias reparten en mojados', /miércoles/i], ['hola q marcas de leche teneis', /Pascual|Intense|hostelería/i],
  ['REPARTIS EN RUEDA', /lunes y jueves/i], ['  repartis   en   rueda  ', /lunes y jueves/i], ['cuanto tardais??', /24/], ['¿¿horario??', /7:00 a 15:00/]
];
for (const [m, rx] of VARIANTES) CASOS.push([[m], { texto: rx }]);

/* Segundo grupo, redactado con frases más naturales y sin ajustar el asistente a ellas una a una */
const VARIANTES2 = [
  ['oye y vosotros llegais a mi pueblo que es nava del rey', /miércoles/i], ['sabeis si pasais por viana de cega', /miércoles/i], ['mi bar esta en olmedo, cuando me traeis la mercancia', /viernes/i],
  ['si hago el pedido hoy cuando me lo traen', /pueblo/i], ['a que hora hay que pedir para que llegue hoy', /10:00/], ['trabajais los festivos', /lunes a viernes/i],
  ['teneis algo de cafe descafeinado', /Mocay/i], ['busco servilletas', /Servilleta/i], ['necesito cubiertos', /Cubier|cubertería|menaje/i], ['teneis tenedores', /Tenedor/i],
  ['que vinos teneis', /vinos/i], ['teneis verdejo', /Verdejo/i], ['teneis cava', /cava|espumoso|vinos|tarifa|635/i], ['agua mineral', /agua/i], ['teneis pepsi', /tarifa|bebidas/i],
  ['yogures de sabores', /yogur/i], ['flan', /flan|postre|Pascual/i], ['natillas de chocolate', /Natillas/i], ['leche entera', /entera/i], ['leche semidesnatada para el hogar', /semidesnatada/i],
  ['leche desnatada', /desnatada/i], ['leche de avena', /avena|Vivesoy/i], ['bebida de soja', /soja|Vivesoy/i], ['zumos', /zumo|Essential|Pascual/i], ['bifrutas', /Bifrutas/i],
  ['pan', /pan|congelado/i], ['bolleria', /bollería|congelados/i], ['napolitanas', /Napolitana/i], ['embutidos', /embutido|Chorizo|charcuter|refrigerado/i], ['queso', /queso/i],
  ['como puedo hacer un pedido si ya soy cliente', /7:00 a 15:00/], ['tengo que firmar algo para empezar', /ficha|alta|SEPA/i], ['cuanto hay que pedir como minimo', /No hay pedido mínimo/i],
  ['el reparto tiene algun coste', /sin coste/i], ['puedo pagar a final de mes', /mensual|factura|domicili/i], ['me mandais una tarifa', /tarifa/i], ['cual es vuestro horario de verano', /7:00 a 15:00/],
  ['si llamo por la tarde me cogen', /móvil|15:00/i], ['podeis llamarme', /635|llama/i], ['cual es el mail', /oficina@distribucionesvm\.es/], ['donde teneis el almacen', /Labradores/],
  ['sois de medina del campo', /Medina del Campo/], ['os sigo en redes', /Facebook|Instagram/], ['me ha llegado el pedido incompleto', /albarán|Lamentamos/i], ['me han traido mal el pedido', /albarán|Lamentamos/i],
  ['quiero reclamar', /albarán|Lamentamos/i], ['ahora estais atendiendo', /atendiendo|fuera/i], ['haceis repartos a restaurantes pequeños', /repartimos|90 km|reparto/i], ['envios a toda españa', /90 km|repart|No tengo/i],
  ['repartis en valladolid capital', /Valladolid/i], ['como se paga', /contado|domicili/i], ['que leche usan los bares', /Intense|Classic|Extra/i], ['leche para hacer cafe con leche', /Intense|Barista|Extra/i],
  ['teneis leche en polvo', /leche|Pascual|635/i], ['leche de coco', /leche|Vivesoy|Pascual|635/i]
];
for (const [m, rx] of VARIANTES2) CASOS.push([[m], { texto: rx }]);

/* Preguntas sobre cualquier contenido de la web (textos de las páginas, descripciones de productos, preguntas frecuentes).
   El asistente las responde citando la propia web y enlazando a su sección; lo que no está en la web, no lo inventa. */
const CONTENIDO = [
  ['que ventajas tiene el bag in box', /residuos|rentabilidad|Bag in box/i, /pascual\.html#/],
  ['cuanto residuo ahorra el box', /49 %/], ['cuanto co2 se ahorra con la caja de 10 litros', /7 %/], ['que es el enfriador de leche', /enfriador/i],
  ['cuanto puede aumentar la rentabilidad con el box', /33 %/], ['por que la forma cubica de la caja', /cúbica|almacen/i], ['que batidos hay en vidrio', /vidrio|Batido/i],
  ['que lleva el batido de chocolate de vidrio', /semidesnatada|chocolate/i], ['que sabores tiene bifrutas', /Tropical|Paraíso|Pacífico|Mediterráneo/i], ['que grasa tiene la nata para montar', /35 %|materia grasa/i],
  ['cuanto pesa una natilla', /120 g/i], ['que formatos tiene la mantequilla', /250 g|500 g|tarrina/i], ['que diferencia hay entre classic e intense', /Intense[\s\S]*Classic|Classic[\s\S]*Intense/i],
  ['que formatos tiene san pellegrino', /cl\b|formatos/i, /agua\.html#/], ['que es perrier', /Perrier/i], ['que marcas de agua teneis', /Bezoya|Aquarel|Pedras|Pellegrino|Perrier/i],
  ['que es un frizzante', /Frizzante/i, /vinos\.html#/], ['que vinos de ribera teneis', /Ribera/i], ['de que bodega es pazos de baro', /Pazos|Baró/i], ['que es dominio de bornos', /Bornos/i],
  ['de que es el sirope de speculoos', /galleta|speculoos/i, /despensa\.html#/], ['que legumbres teneis de luengo', /Lenteja|Garbanzo|Alubia/i], ['tenéis sal marina fina', /Sal marina/i], ['que especias tiene carmencita', /Carmencita|Orégano|Pimentón/i],
  ['tenéis atun isabel', /Isabel/i], ['que mermeladas tiene helios', /Helios|Mermelada/i],
  ['que tipos de azucares vendeis', /moreno/i, /Anagrama|Mocay/i], ['azucar moreno', /moreno/i], ['que edulcorantes teneis', /edulcorante/i], ['teneis azucarillos', /Azucarillos/i],
  ['que referencia de cafe lleva cafe arabica', /Maestro/i, /100 % arábica/i], ['que cafes arabicas teneis', /Maestro Colombia/i], ['que cafe descafeinado teneis', /Barista 3 descafeinado/i], ['que capsulas de cafe teneis', /Cápsula/i],
  ['que copa es la mas adecuada para el vino', /tintos.*copa grande|Copa Vino/is], ['que copa es mejor para un vino tinto', /45 cl/i], ['que copa me recomiendas para vino blanco', /25 a 35 cl/i], ['que vaso es mejor para la cerveza', /caña/i], ['que copa es la mas adecuada para el gin tonic', /Combinado/i], ['que copa para el cava', /Flauta/i], ['que copa es la mejor para mi bar', /¿Qué vas a servir/i],
  ['que servicio tecnico ofrece mocay', /cafeteras|mantenimiento/i, /cafe-mocay\.html#/], ['hacéis mantenimiento de cafeteras', /Mantenimiento/i], ['que infusiones teneis en piramide', /pirámide/i], ['tenéis molinos de café', /Molinos/i],
  ['que cafes tiene mocay', /Colombia|Maestro|café/i], ['dais asesoramiento barista', /Asesoramiento barista|asesoramiento/i],
  ['que menaje distribuis', /Vajilla|cubertería|cristalería/i], ['puedo pedir el menaje junto con el resto del pedido', /un solo pedido|Sí/i], ['como consulto por el menaje de mi local', /635 09 80 44|formulario/i],
  ['que es un solo proveedor para toda la carta', /proveedor/i], ['teneis marcas reconocidas', /marcas/i], ['que es la preparacion de pedidos', /pedidos|almacén/i], ['que hago si reformo mi sala', /reform|sala/i],
  ['que ofrece la atencion personalizada', /Atendemos|atención|llama/i], ['que cobertura local teneis', /cobertura|90 km|local/i], ['que vinos de rueda teneis', /Rueda/i],
  ['cuantos pasos son para hacerse cliente', /3 pasos|tres pasos|Nos conocemos/i], ['que es el primer pedido y reparto', /Primer pedido|reparto/i], ['que formas de pago hay en la web', /contado|domicili|pago/i],
  ['que pan congelado teneis', /pan|Panamar|congelado/i], ['que bolleria hay', /bollería|Croissant|Napolitana|congelados/i], ['que quesos teneis', /queso/i], ['que embutidos hay', /embutido|Chorizo|charcut/i],
  ['teneis huevos', /huevo/i], ['hay leche de coco', /leche|Vivesoy|Pascual|635/i], ['que aguas con gas teneis', /Pellegrino|Pedras|Perrier/i],
  ['vendeis neumaticos', /No estoy seguro/i], ['alquilais maquinaria de obra', /No estoy seguro|maquinaria/i], ['quien gano el mundial', /No estoy seguro/i]
];
for (const [m, rx, h] of CONTENIDO) CASOS.push([[m], h ? { texto: rx, html: h } : { texto: rx }]);
CASOS.push([['que copa es la mejor para mi bar', 'cerveza'], { texto: /cerveza/i }]);
CASOS.push([['que copa es mejor para el vino', 'para tinto'], { texto: /45 cl/i, no: /Calamares/i }]);
CASOS.push([['que copa es mejor para el vino', 'blanco'], { texto: /25 a 35 cl/i }]);
CASOS.push([['que copa es mejor para el vino', 'para tinto', 'y para cava'], { texto: /flauta/i }]);

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
      await pagina.click('#vmc-launcher');
      await pagina.waitForSelector('#chat:not([hidden])');
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
