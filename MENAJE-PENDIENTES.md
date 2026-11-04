# Menaje: datos pendientes de confirmar

Regla fija: ningún dato de esta lista se publica en la web hasta que lo confirme el responsable. En las páginas, los huecos se dejan vacíos o ocultos, nunca rellenos con suposiciones.

Cómo usar este archivo: el responsable contesta debajo de cada punto («Respuesta:») y, con la respuesta, se actualiza la página.

## Pendientes de la tarea actual

| # | Dato | Estado | Dónde se usaría | Respuesta |
|---|---|---|---|---|
| 1 | Marcas de menaje que distribuye la empresa | [POR CONFIRMAR] | Portada y bloques por familia de `menaje.html`, `menaje-products.js`, textos SEO | |
| 2 | ¿El 635 09 80 44 tiene WhatsApp? | [POR CONFIRMAR] | Botón flotante de WhatsApp, «Consultar por WhatsApp» en cada familia, cierre de la página | |
| 3 | Testimonios de clientes autorizados (texto, nombre o negocio y permiso por escrito) | [POR CONFIRMAR] | Bloque de prueba social | |
| 4 | Oferta de entrada para clientes nuevos (si existe) | [POR CONFIRMAR] | Bloque «Equipa tu local» | |

## Qué pasa mientras no se confirmen

- **Marcas:** no se nombra ninguna marca de menaje. La página habla solo de familias (vajilla, cubertería, cristalería, mantelería y textil, menaje auxiliar de cocina y sala), que es lo que ya figura en la tarjeta actual de `index.html`.
- **WhatsApp:** no se añaden el botón flotante ni los enlaces `wa.me`. Se mantiene teléfono y correo, que sí constan en la web.
- **Testimonios:** el bloque de prueba social no se crea.
- **Oferta de entrada:** no se muestra ninguna oferta, descuento ni condición.

## Otros datos que la sección necesitará (no pedidos todavía, también [POR CONFIRMAR])

Se anotan para no inventarlos cuando llegue su tarea. Ninguno consta en el repo.

- Precios, tarifas y pedido mínimo: [POR CONFIRMAR].
- Plazos de entrega y días de reparto: [POR CONFIRMAR].
- Años de experiencia, número de clientes o de referencias específicas de menaje: [POR CONFIRMAR]. La portada actual muestra 40+, 500+ y 2.000+ como cifras generales de la empresa, no de menaje.
- Preguntas frecuentes y sus respuestas (4-5): [POR CONFIRMAR].
- Fotografías de menaje con derechos de uso. No hay ninguna en el repo (`assets/menaje/` no existe). Origen aceptable por orden: material oficial del fabricante con permiso, o banco con licencia libre comprobada (Wikimedia Commons, Unsplash, Pexels), con autor, fuente, URL y licencia anotados en `assets/credits.json`.
- Imagen para compartir en redes (`og:image`): [POR CONFIRMAR], depende de las fotos anteriores.
- URL pública definitiva del dominio, necesaria para `canonical`, `sitemap.xml` y JSON-LD: [POR CONFIRMAR]. El repo no la fija; el workflow de Pages no despliega esta rama.
- Horario de atención, si se quiere en el JSON-LD: [POR CONFIRMAR].

## Datos que sí constan en el repo (se pueden usar tal cual)

- Teléfono 635 09 80 44, correo oficina@distribucionesvm.es y dirección Cl Labradores, n.º 45, parcela 24B, 47400 Medina del Campo (Valladolid), todos en `index.html`.
- Reparto en Medina del Campo y comarca, hasta unos 90 km.
- Descripción de la tarjeta actual: «Vajilla, cubertería, cristalería, mantelería y auxiliar».

## Añadido en la tarea de referencias

- Dominios de distribuidores de menaje (por ejemplo `bunzlspain.com`) no están permitidos en la red de la sesión, así que las fichas reales de producto no se han podido revisar. Si se quiere ese análisis, hay que permitirlos en la configuración de red del entorno: [POR CONFIRMAR].
- Los usos técnicos de las series de otros fabricantes (apilable, apta para lavavajillas, etc.) no se pueden aplicar a ningún producto de la empresa hasta saber qué marcas distribuye: [POR CONFIRMAR].
- Si la empresa ofrece mantelería a medida o con personalización: [POR CONFIRMAR].
- Si distribuye menaje auxiliar de cocina (recipientes Gastronorm, utensilios) además del de sala: [POR CONFIRMAR].

## Añadido en la tarea de palabras clave

- Datos reales de volumen y competencia de las palabras clave: no se tienen. Hace falta que alguien con acceso consulte el Planificador de palabras clave de Google, y que después de publicar se mire Search Console: [POR CONFIRMAR] quién lo hace.
- Si la empresa quiere posicionarse solo en Medina del Campo y comarca o también en Valladolid y Castilla y León. La elección actual asume reparto hasta 90 km, que consta en la web; ampliar a Castilla y León como zona de servicio no consta: [POR CONFIRMAR]. Mientras tanto, esa región solo aparece en palabras clave y no se afirma como zona de reparto.
- Si la empresa vende a clientes de fuera de la comarca (Valladolid capital u otras provincias): [POR CONFIRMAR].

## Añadido en la tarea de bloques por familia

- Fotografías de cada familia (5 huecos «Imagen pendiente»): [POR CONFIRMAR] origen y licencia. Ver reglas de fotos en el encargo: material oficial con permiso o banco con licencia libre comprobada, descargado a `assets/menaje/` y anotado en `assets/credits.json`.
- Lista concreta de artículos de cada familia que sí se distribuyen (por ejemplo, qué incluye el menaje auxiliar de cocina y sala, qué textil, qué medidas): [POR CONFIRMAR]. Hasta entonces los textos no enumeran artículos.
- Si hay opciones como tela o desechable, personalización o mantelería a medida: [POR CONFIRMAR].
- Los enlaces «Consultar…» van a `index.html#contacto` (el formulario de la portada). Ese formulario hoy no envía mensajes porque `EMAIL` está vacío en `main.js`. Hasta que se corrija, las consultas no llegan: [POR CONFIRMAR] correo de destino o servicio de formularios.
- Si más adelante se confirma WhatsApp, añadir «Consultar por WhatsApp» en cada familia (no se ha añadido).

## Añadido en la tarea de fotografías

- Las 6 fotos actuales son de Wikimedia Commons con licencia CC BY, CC BY-SA o CC0, y están registradas en `assets/credits.json`. Para sustituirlas por fotos propias o material oficial del fabricante con permiso: [POR CONFIRMAR] quién las aporta y con qué autorización.
- Las licencias CC BY-SA exigen atribuir y compartir bajo la misma licencia las versiones modificadas (redimensionadas, recortadas) de esas fotos. Si la empresa no quiere esa condición, hay que cambiarlas: [POR CONFIRMAR].
- Imagen para compartir en redes (`og:image`): puede salir de la foto de portada si se confirma que sirve; queda para la tarea de SEO.
- No se ha podido consultar Unsplash ni Pexels desde esta sesión (Pexels devolvió 403 y Unsplash redirige); todo viene de Commons.

## Añadido en la tarea «Por qué pedirlo» y «Equipa tu local»

No publicados hasta confirmar:
- **Reposición de menaje** (reponer piezas rotas o agotadas, plazos, mínimos): [POR CONFIRMAR] si se ofrece. No consta en el repo.
- **Asesoramiento específico para equipar un local** en aperturas y reformas (visita, listado de piezas, cálculo de cantidades): [POR CONFIRMAR]. La web solo promete asesoramiento general («equipo con experiencia para asesorarte»).
- **Presupuesto:** si se hace presupuesto para equipar un local, si es gratuito y en qué plazo se responde: [POR CONFIRMAR]. El botón «Pedir presupuesto» solo lleva al formulario y no promete nada más.
- **Condiciones para aperturas** (descuentos, pedido mínimo, financiación, entrega por fases): [POR CONFIRMAR]. No se menciona nada de eso.
- **Cifras de la empresa** (años, clientes, productos): constan en `index.html` pero no se han usado; [POR CONFIRMAR] que son correctas y si se quieren usar en esta página. Los contadores de la portada pasan por valores intermedios (36+, 444+, 1777+) antes de llegar a 40, 500 y 2.000.
- **Zona de reparto** fuera de Medina del Campo y comarca: sin cambios, ver pendientes anteriores.

## Añadido en la tarea de FAQ y contacto

### Preguntas frecuentes sin respuesta confirmada (borradores, NO publicados)

Rellenar los huecos y mover a `#preguntas` en `menaje.html` (y al `FAQPage` JSON-LD cuando exista). Los `[POR CONFIRMAR]` son datos que faltan; no se han inventado.

1. **¿Puedo reponer piezas sueltas (platos, copas, cubiertos)?**
   Borrador: «[POR CONFIRMAR: sí/no]. Puedes pedir piezas sueltas de reposición junto con el resto de tu pedido. [POR CONFIRMAR: si hay mínimo por referencia o plazo].»
2. **¿Hay pedido mínimo?**
   Borrador: «[POR CONFIRMAR: sí/no]. El pedido mínimo es de [POR CONFIRMAR]. [POR CONFIRMAR: si cambia por zona].»
3. **¿Qué días repartís y cuánto tarda en llegar el pedido?**
   Borrador: «Repartimos [POR CONFIRMAR: días] en Medina del Campo y comarca. Los pedidos hechos antes de [POR CONFIRMAR: hora] llegan en [POR CONFIRMAR: plazo].»
4. **¿Puedo ver el catálogo o pedir muestras antes de comprar?**
   Borrador: «[POR CONFIRMAR: si hay catálogo de menaje consultable y si se dan muestras].»
5. **¿Hacéis presupuesto para equipar un local nuevo?**
   Borrador: «[POR CONFIRMAR: sí/no]. Cuéntanos tu local y [POR CONFIRMAR: qué ofrecéis y plazo de respuesta].»

### WhatsApp
- ¿El 635 09 80 44 tiene WhatsApp? [POR CONFIRMAR]. El enlace está comentado en `menaje.html` y no se publica; el botón flotante y los «Consultar por WhatsApp» por familia tampoco se han añadido.
- Texto prefijado del enlace: «Hola, quiero consultar por el menaje para mi local»: [POR CONFIRMAR] que gusta.

### Formulario
- `menaje-form.js` prepara un correo con `mailto:` a oficina@distribucionesvm.es; no hay envío desde servidor. [POR CONFIRMAR] si se prefiere un servicio de formularios (requeriría decidir proveedor y revisar protección de datos).
- El formulario de la portada sigue sin enviar (`EMAIL` vacío en `main.js`). No se ha tocado por quedar fuera de esta tarea. Usar el mismo correo sería una línea; [POR CONFIRMAR] que se quiere.
- Texto de consentimiento y política de privacidad: se copió el de la portada. Los enlaces «Aviso legal» y «Política de privacidad» de la portada apuntan a `#`: [POR CONFIRMAR] textos legales.
- Persona que lee `oficina@distribucionesvm.es`, horario de atención y plazo de respuesta: [POR CONFIRMAR] (la web solo dice «lo antes posible»).
