# Herramientas del proyecto

Se ejecutan desde la raíz del repositorio, con `python3 -I _herramientas/<script>.py`.

| Script | Para qué sirve |
| --- | --- |
| `cabecera.py` | Regenera la cabecera común y el botón fijo «Llamar» en todas las páginas. |
| `seo.py` | Regenera canonical, Open Graph, Twitter, datos de empresa local (portada), `sitemap.xml` y `robots.txt`. La dirección pública está en `BASE`. |
| `versionar.py` | Pone en cada CSS/JS un `?v=` calculado a partir del contenido del archivo. |
| `zip_ionos.py` | Crea `web-ionos.zip` listo para subir por FTP a IONOS. |
| `congelados/build.py` | Regenera la sección de Congelados desde las fotos del catálogo. |

**Antes de publicar:** `cabecera.py`, `seo.py` y por último `versionar.py`.
**Para IONOS:** cambia `BASE` en `seo.py` al dominio real, vuelve a ejecutar los tres scripts y luego `zip_ionos.py`.
