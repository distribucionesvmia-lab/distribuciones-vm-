# Sección Menaje: resumen final

Rama: `claude/charming-faraday-9sfdfo`. Sin pull request. Detalle técnico en `MENAJE-PLAN.md`; todo lo que falta por confirmar, con borradores, en `MENAJE-PENDIENTES.md`.

## Estado en una frase

La nueva `menaje.html` **sustituye a la anterior en la rama publicada** (`claude/sweet-bohr-lergl3`, la que despliega GitHub Pages). Se retiró el listado antiguo de 761 artículos del Excel (con su buscador y su generador `_herramientas/menaje.py`) a petición del cliente; sigue en el historial de Git (commit `3d6288d`) por si se quiere recuperar. Siguen pendientes los datos [POR CONFIRMAR] de abajo y las fotos propias.

## Cómo se publicó

Mi rama de trabajo (`claude/charming-faraday-9sfdfo`) partía de una versión del repositorio anterior al 3 de noviembre y chocaba con la rama publicada en 16 archivos. En lugar de fusionarlas, se partió de la rama publicada y se añadió la página nueva encima, adaptándola a sus herramientas:

- **Cabecera y botón «Llamar» de móvil:** los genera `_herramientas/cabecera.py` (el botón flotante `.call-float` es común a todas las páginas). Se quitó la barra «Llamar» propia de Menaje para no duplicarlo.
- **SEO:** canonical, Open Graph y Twitter los genera `_herramientas/seo.py` con la dirección pública de la web (`https://distribucionesvmia-lab.github.io/distribuciones-vm-/`). Se le añadió la imagen para compartir de Menaje y el JSON-LD de migas y preguntas frecuentes (las preguntas se leen de la propia página). El JSON-LD de empresa sigue solo en la portada. `sitemap.xml` y `robots.txt` también salen de `seo.py`; los de mi rama y `_herramientas/dominio.py` no se usan.
- **`noindex`:** quitado. La página es indexable como las demás.
- **Versiones de CSS y JS:** `_herramientas/versionar.py`.
- **Motor:** se conservaron los cambios de la rama publicada (precios, orden de escenas) y se añadieron mis dos opciones de `lineup` (`cta` y `product.lazy`) y el estilo `.pw-more`.
- **Enlaces cruzados:** cierre de Vinos, Aguas, Despensa, Refrigerados y Congelados. El menú, la tarjeta y el pie de la portada ya enlazaban a Menaje en la rama publicada.

Para la próxima vez: `python3 -I _herramientas/cabecera.py`, luego `seo.py` y por último `versionar.py`. Para pasar a un dominio propio (IONOS) hay que cambiar `BASE` en `seo.py` y repetir los tres.

## 1. Qué se hizo

| Commit | Qué incluye |
|---|---|
| `ed6555b` | `MENAJE-PLAN.md` (cómo se monta una página de categoría) y `MENAJE-PENDIENTES.md` |
| `f92a4a8` | Referencias: 15 fuentes y patrones aplicables a las 5 familias |
| `ebeae9a` | Palabras clave: 1 principal y 5 secundarias, sin cifras de volumen (no había datos) |
| `7ab71f4` | Esqueleto de `menaje.html`, `menaje.css`, `menaje-products.js`: cabecera, salto al contenido, hero con un solo `h1`, cierre y pie |
| `18c2054` | Motor: `lineup` admite un enlace opcional (`cta`) |
| `ea6e1b2` | 5 bloques por familia (Vajilla, Cubertería, Cristalería, Mantelería y textil, Menaje auxiliar) con enlace a consulta |
| `3ee4d26` | Motor: `lineup` admite imagen única con carga diferida (`product.lazy`) |
| `7afaf58` | 6 fotos de Commons en WebP (portada y una por familia), `assets/credits.json` y créditos en el pie |
| `57c7cd8` | «Por qué pedirlo con nosotros» y «Equipa tu local» solo con datos que constan en el repo |
| `0ddcb21` | FAQ (4 preguntas con respuesta confirmada) y cierre de contacto con formulario |
| `4f607a6` | `title` (60 caracteres), `meta description` (150), canonical, Open Graph, Twitter Card e imagen para compartir |
| `0ca8e31` | JSON-LD (`LocalBusiness`, `BreadcrumbList`, `FAQPage`), `sitemap.xml`, `robots.txt` y `_herramientas/dominio.py` |
| `354611f` | Botón «Llamar» activo en móvil; WhatsApp preparado y desactivado tras un flag |
| `a691765` | Menaje enlazado desde la tarjeta de la portada, el menú de las 9 páginas, el pie de la portada y el cierre de 5 categorías |
| `8669607` | Correcciones de accesibilidad: foco visible explícito, objetivos táctiles de 24 px, `main` enfocable |
| `4405c4d` | Revisión con Playwright: script, 24 capturas y resultados |

El commit de este resumen añade `MENAJE-RESUMEN.md`.

**Resultado de la revisión (Playwright, 320 a 1440 px y movimiento reducido):** sin errores de consola, sin desbordamiento horizontal, 15 enlaces externos y los internos en 200, contraste AA correcto en todos los textos revisados, 50 elementos con foco visible, salto al contenido y FAQ operables con teclado, imágenes con `alt`, `width` y `height`. Peso sin comprimir: 532 KB de carga inicial en escritorio (613 KB en móvil) y 809 KB tras recorrer la página.

**Archivos nuevos:** `menaje.html`, `menaje.css`, `menaje-products.js`, `menaje-form.js`, `menaje-whatsapp.js`, `assets/menaje/` (7 archivos), `assets/credits.json`, `sitemap.xml`, `robots.txt`, `_herramientas/dominio.py`, `_herramientas/qa-menaje.js`, `_herramientas/capturas-menaje/` y los tres `MENAJE-*.md`.
**Modificados:** `product-world.js` y `product-world.css` (dos opciones nuevas de `lineup` y un estilo de enlace; el resto de páginas no cambia), `PRODUCT-WORLD.md`, `_herramientas/cabecera.py`, `index.html`, las 8 páginas con cabecera común y el cierre de Vinos, Aguas, Despensa, Refrigerados y Congelados.

## 2. Datos que siguen [POR CONFIRMAR]

Nada de esto está publicado. Los borradores de FAQ están en `MENAJE-PENDIENTES.md`.

**Producto y condiciones**
- Marcas de menaje que se distribuyen y artículos concretos de cada familia (por eso los textos no nombran marcas ni piezas).
- Tela o desechable, personalización y mantelería a medida; si hay menaje auxiliar de cocina además del de sala.
- Precios, pedido mínimo, plazos, días de reparto, reposición de piezas sueltas, catálogo o muestras.
- Si se hace presupuesto para equipar un local, si es gratuito y en qué plazo se responde; si hay asesoramiento específico para aperturas y reformas (la web solo promete asesoramiento general).

**Zona de servicio**
- Si se reparte fuera de los 90 km y si Valladolid y Castilla y León son zona de servicio (hoy solo aparecen como palabras clave).

**Contacto**
- WhatsApp (ver apartado 4), horario, quién atiende y plazo real de respuesta.
- Correo de destino del formulario: hoy abre el programa de correo del usuario (`mailto:`); [POR CONFIRMAR] si se prefiere un servicio de formularios.
- Textos de aviso legal y política de privacidad (los enlaces de la portada apuntan a `#`).

**Publicación y SEO**
- Dominio público (hace falta para canonical absoluta, `og:image`, `og:url`, sitemap, robots y JSON-LD).
- Cuándo quitar el `noindex`, qué páginas entran en el sitemap, si se bloquean `_version-3d`, `_version-anterior` y `_sin-usar` en `robots.txt`.
- Nombre comercial correcto («Distribuciones Valentín» o «Distribuciones Valentín Martín»).
- Horario, coordenadas, redes y tipo de negocio exacto para completar el JSON-LD.
- Volumen y competencia reales de las palabras clave (Planificador de palabras clave de Google y Search Console).

**Sitio**
- Si se enlaza Menaje ya o se espera; foto para la tarjeta de la portada; si Pascual y Café Mocay deben enlazarlo; menú de 10 enlaces.
- Cifras de la portada (40 años, 500 clientes, 2.000 productos): constan en `index.html` pero no se han usado.

**Pruebas**
- Móvil real (Safari en iPhone y Chrome en Android) y lector de pantalla; peso de la tipografía de Google Fonts y compresión en producción.

## 3. Fotos que hay que sustituir por fotos propias

Las seis son de Wikimedia Commons, de otros países y otros locales. Ilustran la familia, no el catálogo real, y tres exigen atribución con licencia de compartir igual.

| Uso | Archivo | Autor y licencia | Por qué cambiarla |
|---|---|---|---|
| Portada y base de la imagen para redes | `hero-mesa-restaurante.webp`, `og-menaje.jpg` | Gogerr, CC BY-SA 4.0 | Restaurante de Canadá, local oscuro; no representa a los clientes |
| Vajilla | `vajilla-platos-apilados.webp` | Mussi Katz, CC0 | Puesto de vajilla en un mercado de Tailandia |
| Cubertería | `cuberteria-cajon-cubiertos.webp` | Acabashi, CC BY-SA 4.0 | Cajón doméstico, cubiertos desemparejados |
| Cristalería | `cristaleria-copas-mesa.webp` | Socket0, CC BY-SA 3.0 | Foto floja (enfoque y encuadre); de las más débiles |
| Mantelería y textil | `manteleria-mesa-redonda.webp` | Basile Morin, CC BY-SA 4.0 | Hotel de lujo en Laos |
| Menaje auxiliar | `auxiliar-utensilios-pared.webp` | Shixart1985, CC BY 2.0 | Utensilios en una pared; de las más débiles |

**Cómo sustituirlas:** copiar la foto nueva a `assets/menaje/` (WebP, menos de 150 KB), cambiar `image`, `width`, `height` y `alt` en `menaje-products.js` (la portada, en `menaje.html`), regenerar `og-menaje.jpg` a 1200 × 630, actualizar `assets/credits.json` y el párrafo de créditos del pie (si la foto es propia, basta «Fotografía: Distribuciones Valentín»). Si la foto es del fabricante, dejar constancia del permiso. Si se mantiene alguna de Commons, hay que conservar su atribución, y las CC BY-SA exigen compartir bajo la misma licencia las versiones modificadas.

## 4. Qué haría falta para activar WhatsApp, prueba social y oferta

**WhatsApp** (preparado, desactivado)
1. Confirmar que el 635 09 80 44 tiene WhatsApp, quién lo atiende y en qué horario (la barra no debe prometer respuesta inmediata).
2. Aprobar los mensajes prefijados: «Hola, quiero hacer un pedido de menaje para mi local.» y «Hola, quiero consultar por [familia] para mi local.»
3. En `menaje-whatsapp.js` poner `const WHATSAPP = '34635098044';` y subir la versión del script en `menaje.html`. Eso activa «Pedir por WhatsApp» (barra de móvil y botón flotante en escritorio) y «Consultar por WhatsApp» en cada familia. «Llamar» ya está activo en móvil y no depende de esto.
4. Repetir `_herramientas/qa-menaje.js` para comprobar el resultado.

**Prueba social** (no añadida)
1. Por cada testimonio: texto, nombre o negocio y permiso por escrito del cliente. Sin permiso o sin texto real no se publica nada.
2. Se crearía una sección de texto entre «Por qué pedirlo con nosotros» y «Equipa tu local», con el mismo estilo que las otras.
3. No añadir valoraciones agregadas ni estrellas al JSON-LD salvo que sean reales y estén visibles en la página.

**Oferta de entrada** (no añadida)
1. Confirmar si existe, en qué consiste, condiciones y vigencia, y quién la aprueba.
2. Iría en «Equipa tu local», con el texto exacto de la condición y sin cifras que no se confirmen; no se añade ningún `Offer` al JSON-LD sin esos datos.

## 5. Qué queda por hacer tras la publicación

1. Sustituir las fotos de Commons por fotos propias (apartado 3).
2. Responder los datos [POR CONFIRMAR] (apartado 2).
3. Textos legales: los enlaces «Aviso legal» y «Política de privacidad» de la portada siguen apuntando a `#`.
4. Si la web pasa a dominio propio: `BASE` en `seo.py`, repetir `cabecera.py`, `seo.py` y `versionar.py`.
5. Probar en móvil real y con lector de pantalla.
6. Datos que la rama publicada ya tiene y que antes estaban pendientes (horario de lunes a viernes de 7:00 a 15:00, redes sociales, zona de servicio con Valladolid, Salamanca, Ávila y Segovia, año de fundación): están en el JSON-LD de la portada. No se han copiado a Menaje porque no hacía falta; si se quieren en la página, hay que decidir el texto.
