# Herramientas del proyecto

Se ejecutan desde la raíz del repositorio, con `python3 -I _herramientas/<script>.py`.

| Script | Para qué sirve |
| --- | --- |
| `cabecera.py` | Regenera la cabecera común y el botón fijo «Llamar» en todas las páginas. |
| `seo.py` | Regenera canonical, Open Graph, Twitter, datos de empresa local (portada), `sitemap.xml` y `robots.txt`. La dirección pública está en `BASE`. |
| `versionar.py` | Pone en cada CSS/JS un `?v=` calculado a partir del contenido del archivo. |
| `zip_ionos.py` | Crea `web-ionos.zip` listo para subir por FTP a IONOS. |
| `precios.py` | Genera `precios.js` a partir del Excel de artículos del ERP: `python3 -I _herramientas/precios.py ARTICULOS.xlsx` (necesita `openpyxl`). Usa `precios-mapa.json` (producto de la web → código de artículo). Avisa de los códigos que ya no están en el Excel. |
| `congelados/build.py` | Regenera la sección de Congelados desde las fotos del catálogo. |

**Antes de publicar:** `cabecera.py`, `seo.py` y por último `versionar.py`.
**Para IONOS:** cambia `BASE` en `seo.py` al dominio real, vuelve a ejecutar los tres scripts y luego `zip_ionos.py`.

**Precios:** se muestran donde el producto esté en `precios-mapa.json`. Para actualizar tarifas: nuevo Excel → `precios.py` → `versionar.py`. Para quitar todos los precios: vaciar el mapa (o borrar `precios.js`) y volver a ejecutar `precios.py`.

**Estado de los precios:** retirados de la web a petición del cliente (`precios.js` vacío). El mapa que se usó está guardado en `precios-mapa-guardado.json`; para volver a mostrarlos, cópialo sobre `precios-mapa.json`, ejecuta `precios.py` con el Excel y luego `versionar.py`.
