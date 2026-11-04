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
**Para IONOS:** cambia `BASE` en `seo.py` al dominio real, vuelve a ejecutar los tres scripts y luego `zip_ionos.py`.

**Precios:** se muestran donde el producto esté en `precios-mapa.json`. Para actualizar tarifas: nuevo Excel → `precios.py` → `versionar.py`. Para quitar todos los precios: vaciar el mapa (o borrar `precios.js`) y volver a ejecutar `precios.py`.

**Estado de los precios:** retirados de la web a petición del cliente (`precios.js` vacío). El mapa que se usó está guardado en `precios-mapa-guardado.json`; para volver a mostrarlos, cópialo sobre `precios-mapa.json`, ejecuta `precios.py` con el Excel y luego `versionar.py`.

**Menaje:** `menaje.html` combina escenas con foto (`menaje-products.js`) y el listado de artículos con buscador (`menaje-articulos.js`, que genera `menaje.py` desde el Excel, y `menaje-listado.js`). Para actualizar el listado: `python3 -I _herramientas/menaje.py ARTICULOS.xlsx` y luego `versionar.py`.

**Asistente de contacto (`chat.js`, `chat.css`):** responde preguntas frecuentes en la sección de contacto de la portada, sin servidor, sin IA externa y sin guardar nada. Motor por reglas: reconoce intenciones por raíces de palabras (tolera una errata), puede responder a varias preguntas a la vez, recuerda el pueblo durante la conversación y calcula la próxima fecha de reparto (hora de Madrid, semanas pares/impares). También busca productos en los catálogos de la web (carga perezosa). Las respuestas están en `INTENTS` y los días de reparto por localidad en `ZONAS`, dentro de `chat.js`. Para cambiar una respuesta (por ejemplo, un horario), se edita ahí y se ejecuta `versionar.py`.
