# Herramientas del proyecto

Se ejecutan desde la raíz del repositorio, con `python3 -I _herramientas/<script>.py`.

| Script | Para qué sirve |
| --- | --- |
| `cabecera.py` | Regenera la cabecera común y el botón fijo «Llamar» en todas las páginas. |
| `seo.py` | Regenera canonical, Open Graph, Twitter, datos de empresa local (portada), `sitemap.xml` y `robots.txt`. La dirección pública está en `BASE`. |
| `versionar.py` | Pone en cada CSS/JS un `?v=` calculado a partir del contenido del archivo. |
| `zip_ionos.py` | Crea `web-ionos.zip` listo para subir por FTP a IONOS. |
| `precios.py` | Genera `precios.js` a partir del Excel de artículos del ERP: `python3 -I _herramientas/precios.py ARTICULOS.xlsx` (necesita `openpyxl`). Usa `precios-mapa.json` (producto de la web → código de artículo). Avisa de los códigos que ya no están en el Excel. |
| `qa-menaje.js` | Revisión de calidad de `menaje.html` con Playwright (capturas en `capturas-menaje/`; Playwright solo hace falta para esto). Uso en la cabecera del script. |
| `menaje.py` | Genera `menaje-articulos.js` (listado de Menaje) desde el Excel de artículos del ERP, sin precios: `python3 -I _herramientas/menaje.py ARTICULOS.xlsx` (necesita `openpyxl`). |
| `congelados/build.py` | Regenera la sección de Congelados desde las fotos del catálogo. |

**Antes de publicar:** `cabecera.py`, `seo.py` y por último `versionar.py`.
**Dominio propio:** la web se publica en GitHub Pages y se sirve en `https://distribucionesvm.es/` (archivo `CNAME`, `BASE` en `seo.py`). El DNS del dominio apunta a GitHub; el correo sigue en IONOS. El ZIP de `zip_ionos.py` solo sirve si algún día se contrata un hosting con FTP.

**Precios:** se muestran donde el producto esté en `precios-mapa.json`. Para actualizar tarifas: nuevo Excel → `precios.py` → `versionar.py`. Para quitar todos los precios: vaciar el mapa (o borrar `precios.js`) y volver a ejecutar `precios.py`.

**Estado de los precios:** retirados de la web a petición del cliente (`precios.js` vacío). El mapa que se usó está guardado en `precios-mapa-guardado.json`; para volver a mostrarlos, cópialo sobre `precios-mapa.json`, ejecuta `precios.py` con el Excel y luego `versionar.py`.

**Menaje:** `menaje.html` combina escenas con foto (`menaje-products.js`) y el listado de artículos con buscador (`menaje-articulos.js`, que genera `menaje.py` desde el Excel, y `menaje-listado.js`). Para actualizar el listado: `python3 -I _herramientas/menaje.py ARTICULOS.xlsx` y luego `versionar.py`.

**Asistente de contacto (`chat.js`, `chat.css`):** responde preguntas frecuentes en la sección de contacto de la portada, sin servidor, sin IA externa y sin guardar nada (todo vive en la memoria de la página mientras está abierta). Motor por reglas: reconoce intenciones por raíces de palabras (tolera una errata), responde a varias preguntas a la vez, recuerda el pueblo y el tipo de negocio, calcula la próxima fecha de reparto y busca productos en los catálogos (carga perezosa). Cada respuesta lleva botones de seguimiento y de «Llamar» / «Escribir por correo» (el correo se abre con la conversación y la lista ya escritas; fuera de horario avisa de que atiende Valentín en su móvil). Las respuestas están en `INTENTS` y los días de reparto en `ZONAS`. Los resultados de producto enlazan a la sección exacta (`pagina.html#id`): cada escena de `product-world.js` tiene un `id` (el campo `id` de la sección en `*-products.js`, o familia + título si falta). El cliente puede apuntar productos en una lista («apúntame nata para montar», «ver mi lista», «enviar mi lista»). Si cambias títulos de escenas sin `id`, cambian sus enlaces: ponles `id` fijo.

**Pruebas del asistente (`pruebas_chat.js`):** 292 preguntas (57 típicas y 235 formas distintas de preguntar lo mismo: sin interrogaciones, sin tildes, con abreviaturas como «q», «tb», «xq», con erratas, con saludos delante y con frases largas) con su respuesta esperada. Ejecútalas antes de publicar cambios en el asistente: `node _herramientas/pruebas_chat.js` (necesita Playwright). Si una respuesta cambia a propósito, actualiza la comprobación en el propio archivo. Para enseñar al asistente una forma nueva de preguntar, añade palabras a las listas `k` de `INTENTS` (cada grupo `['a','b']` exige que aparezcan las dos raíces) y una prueba en `VARIANTES`. La tolerancia a erratas solo actúa en raíces de 7 letras o más.
