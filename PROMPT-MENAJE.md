# Prompt: rediseño de la sección Menaje (Distribuciones Valentín Martín)

Copia el texto de abajo en una sesión nueva de Claude Code abierta en este repositorio.

---

Actúa como especialista en diseño web, SEO local y marketing para distribución B2B de hostelería. Trabaja en el repo `distribuciones-vm-` (web estática en HTML/CSS/JS, publicada con GitHub Pages) y crea desde cero la sección **Menaje**, que hoy no existe: en `index.html` (línea ~150) la tarjeta «Menaje» solo enlaza a `#contacto`.

## Contexto del negocio
- Distribuciones Valentín Martín, Medina del Campo (Valladolid). Reparto a hostelería hasta 90 km.
- Cliente objetivo: bares, restaurantes, hoteles, cafeterías y catering de la comarca.
- Contacto: 635 09 80 44 · oficina@distribucionesvm.es · Cl Labradores, n.º 45, parcela 24B, 47400 Medina del Campo.
- Tarjeta actual: «Vajilla, cubertería, cristalería, mantelería y auxiliar».
- Tono: cercano, profesional, directo, en español de España. Sin frases de relleno.

## Reglas que no se pueden saltar
1. No inventes marcas, precios, plazos, pedidos mínimos, años ni cifras. Todo dato que no esté en el repo o no lo confirme el responsable va como `[POR CONFIRMAR]` y no se publica.
2. Fotos: nunca copies imágenes de Google sin licencia. Usa por este orden: (a) material oficial del fabricante o de prensa con permiso, (b) bancos con licencia libre (Wikimedia Commons, Unsplash, Pexels) con la licencia comprobada. Descarga a `assets/menaje/`, nunca enlaces externos. Anota autor, fuente, URL y licencia de cada imagen en `assets/credits.json` y en el pie de la página, como hace el resto de la web.
3. Mantén la arquitectura y el estilo actuales: usa `despensa.html`, `despensa.css` y `despensa-products.js` como plantilla, con `product-world.css`, `product-world.js`, `site-header.css` y `site-header.js`. No introduzcas frameworks ni dependencias nuevas.
4. Respeta `motion-pref.js` (reducción de movimiento) y la accesibilidad: contraste AA, `alt` descriptivos, foco visible, enlace «Saltar al contenido».
5. Trabaja en la rama de la sesión. No hagas PR salvo que te lo pidan.

## Tareas

### 1. Investigación (antes de escribir código)
- Lee `index.html`, `despensa.html`, `despensa-products.js`, `product-world.js` y `site-header.js` para entender cómo se montan las páginas de categoría.
- Pregunta al usuario qué marcas de menaje distribuye la empresa. Si no lo sabe, deja la lista por confirmar y haz la estructura con categorías, sin marcas.
- Busca en la web cómo presentan menaje de hostelería los distribuidores y fabricantes (categorías, fichas, textos). Úsalo solo como referencia de estructura, no copies textos ni imágenes.
- Haz una lista de palabras clave con intención comercial local y revisa su volumen y competencia con las herramientas disponibles: «menaje hostelería Medina del Campo», «vajilla para restaurantes Valladolid», «cristalería hostelería», «mantelería hostelería», «distribuidor menaje hostelería Castilla y León», etc. Elige una principal y 4 o 5 secundarias.

### 2. Estructura de la página `menaje.html`
- Cabecera hero con titular con propuesta de valor (por ejemplo «Todo el menaje de tu local, en el mismo reparto que tu pedido»), subtítulo con la zona de reparto y botón de contacto.
- Bloques por familia: Vajilla, Cubertería, Cristalería, Mantelería y textil, Menaje auxiliar de cocina y sala. Cada bloque con foto, 2 o 3 líneas de texto útil para el hostelero y enlace a consulta.
- Sección «Por qué pedirlo con nosotros»: un solo reparto, reposición rápida, asesoramiento para equipar un local nuevo. Solo lo que sea cierto.
- Sección «Equipa tu local»: pensada para aperturas y reformas, con una llamada a pedir presupuesto.
- Preguntas frecuentes (4 o 5) sobre pedido, reposición y reparto, solo con respuestas confirmadas.
- Cierre con contacto: WhatsApp, llamada y formulario.

### 3. SEO on-page
- `<title>` de unos 55–60 caracteres con la palabra clave principal y la marca.
- `meta description` de unos 150–155 caracteres con llamada a la acción.
- Un solo `h1`, jerarquía `h2`/`h3` con las palabras secundarias de forma natural.
- URL limpia (`menaje.html`), `canonical`, `og:title`, `og:description`, `og:image` y `twitter:card`.
- Datos estructurados JSON-LD: `LocalBusiness` (o `Organization`) con dirección, teléfono y zona de servicio, `BreadcrumbList` y `FAQPage` si hay preguntas frecuentes.
- Imágenes: `alt` descriptivo, `width` y `height`, `loading="lazy"` salvo la primera, formato WebP y peso reducido.
- Enlazado interno: desde la portada, el menú y las demás categorías, con textos de enlace descriptivos.
- Añade `menaje.html` a `sitemap.xml` (créalo si no existe, con `robots.txt` que lo apunte).

### 4. Marketing y conversión
- Botón flotante «Pedir por WhatsApp» y botón «Llamar» en móvil, solo si el responsable confirma que el 635 09 80 44 tiene WhatsApp.
- En cada familia, un enlace «Consultar por WhatsApp» que incluya el nombre de la familia en el mensaje.
- Un bloque de prueba social solo si hay testimonios reales y autorizados.
- Una oferta de entrada clara, como «Pide tu tarifa de menaje sin compromiso», solo si la empresa la ofrece.

### 5. Integración en la web
- En `index.html`, cambia la tarjeta «Menaje» para que enlace a `menaje.html`.
- Añade «Menaje» al menú de `site-header.js` y a los menús de todas las páginas.
- Actualiza el pie de cada página con los créditos de las imágenes nuevas.

### 6. Calidad
- Comprueba la página en móvil y escritorio con Playwright (ya está instalado) y haz capturas.
- Revisa enlaces rotos, consola sin errores, accesibilidad básica y peso total de la página.
- Antes de terminar, haz un resumen: qué se hizo, qué datos quedan `[POR CONFIRMAR]` y qué fotos hay que sustituir por fotos propias de la empresa.

## Entregables
`menaje.html`, `menaje.css`, `menaje-products.js`, imágenes en `assets/menaje/`, `sitemap.xml` y `robots.txt` actualizados, `assets/credits.json` actualizado y los cambios de enlaces en el resto de páginas. Haz commits pequeños con mensajes claros y no incluyas nada sin confirmar.
