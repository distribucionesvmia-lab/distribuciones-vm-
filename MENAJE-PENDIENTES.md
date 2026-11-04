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
