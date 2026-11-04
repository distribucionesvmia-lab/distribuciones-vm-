# Plan técnico: cómo se monta una página de categoría

Documento de trabajo para la sección Menaje. Describe la arquitectura que ya existe, tomando `despensa.html` como plantilla. No hay cambios en páginas todavía.

Fuentes leídas: `index.html`, `despensa.html`, `despensa.css`, `despensa-products.js`, `helios-products.js`, `product-world.js`, `product-world.css`, `site-header.js`, `site-header.css`, `motion-pref.js`, `_herramientas/cabecera.py`, `.github/workflows/pages.yml`, `.htaccess`.

## 1. Archivos de una página de categoría

Cada categoría usa cuatro archivos propios y comparte el resto.

| Archivo | Quién | Para qué |
|---|---|---|
| `<cat>.html` | propio | Estructura de la página: portada, contenedor `#familias`, cierre, pie |
| `<cat>.css` | propio | Solo colores y ajustes de la categoría, bajo una clase en `<body>` |
| `<cat>-products.js` | propio | Datos: llama a `window.ProductWorld.init({...})` con las secciones |
| `assets/<cat>/` | propio | Imágenes de la categoría |
| `product-world.css` / `product-world.js` | compartido | Motor de escenas con scroll (plantillas `hero`, `range`, `editorial`, `lineup`, `story`) |
| `site-header.css` / `site-header.js` | compartido | Cabecera común y centrado del menú en móvil |
| `assets/vendor/gsap.min.js`, `ScrollTrigger.min.js` | compartido | Animación ligada al scroll |
| `motion-pref.js` | compartido | Respeta «reducir animaciones» (ver 8) |

Para Menaje: `menaje.html`, `menaje.css`, `menaje-products.js` y `assets/menaje/`.

Las páginas `pascual.html`, `vinos.html` y `agua.html` siguen el mismo patrón. Despensa añade además `helios-products.js` y `villacampo-products.js`, que aportan secciones extra (ver 4).

## 2. Estructura de `<cat>.html`

Orden del documento, tal como está en `despensa.html`:

1. `<head>`: charset, viewport (`viewport-fit=cover`), `theme-color`, `description`, `<title>`, Google Fonts (Jost 400-700), `product-world.css?v=16`, `<cat>.css?v=N`, iconos (`assets/logo.png`, `assets/apple-touch-icon.png`), `site-header.css?v=1`.
2. `<body class="pantry-world">`: la clase de categoría cuelga de aquí y es el ancla de `<cat>.css`.
3. Enlace `Saltar al contenido`: `<a class="pw-skip" href="#contenido">`.
4. `<header class="site-header" id="top">`: marca, `<nav aria-label="Principal">` y botón «Contactar». Se genera con script (ver 5).
5. `<main id="contenido">`:
   - `<section class="pw-opening">`: portada con `.pw-opening-copy` (kicker, `h1`, párrafo, `.pw-action`), `.pw-opening-art` (círculo, imagen, palabra grande, todo `aria-hidden`) y `.pw-opening-bottom`.
   - `<div id="familias" class="pw-world">`: vacío. El motor lo rellena.
   - `<section class="pw-end">`: cierre oscuro con `h2`, texto, botón a `index.html#contacto` y «Volver al catálogo».
6. `<footer class="pw-footer">`: nombre y enlace «Volver a inicio ↑».
7. Scripts, todos con `defer` y en este orden: `gsap.min.js`, `ScrollTrigger.min.js`, `product-world.js?v=13`, los `*-products.js`, `site-header.js?v=1`.

Los `?v=N` de CSS y JS son cache-busting manual: hay que subirlos al cambiar el archivo.

## 3. Clases y plantillas del motor

Prefijo `pw-`. Cada sección de datos genera un `<section class="pw-scene pw-X">` con `--scene` (fondo) y `--ink` (texto) tomados de `color` e `ink`.

| `template` | Clase | Qué muestra | Campos de datos |
|---|---|---|---|
| `hero` | `pw-a` | Un envase protagonista con anillo y palabra de fondo | `family, color, ink, eyebrow, title, description, backword, bottom, product{name,image,width,height,alt}`; opcionales `cta{label,href}`, `logo`, `dark`, `product.wide` |
| `range` | `pw-b` | Recorrido horizontal con el scroll vertical | `products[]` con `name, description, image, width, height, alt` |
| `editorial` | `pw-c` | Productos en composición asimétrica | `products[]`; opcionales `columns:3`, `product.cover:true` (foto a sangre), `cta` |
| `lineup` | `pw-e` | Una imagen de gama y lista de variedades que se activan con el scroll | `variants[{name,description,image?,width,height,alt}]`, `note`, `product` |
| `story` | `pw-d` | Secuencia con cambio de fondo | `frames[]` con `color` opcional |

Reglas del motor que importan para una página nueva:
- Texto escapado con `esc()`: se escribe texto plano, sin HTML dentro de los datos.
- Cada sección lleva `number / total` automático.
- Una variante de `lineup` sin `image` se muestra como «Imagen pendiente». Nunca se publica una imagen inventada.
- Sin GSAP, con `prefers-reduced-motion` o en móvil (≤760 px) se usa una versión estática o con aparición progresiva.
- Se puede usar `dark:true` en cualquier plantilla para fondos oscuros.

## 4. Cómo se cargan los productos

`<cat>-products.js` es un script `defer` que se ejecuta después de `product-world.js`:

```js
const D = 'assets/<cat>/';
window.ProductWorld.init({
  mount: '#familias',
  sections: [ { template:'hero', ... }, { template:'editorial', ... } ]
});
```

- `mount` apunta al contenedor vacío de la página.
- Cada producto necesita `image`, `width`, `height` y `alt`. Para sustituir una foto basta cambiar la ruta y las dimensiones.
- Despensa reparte los datos en varios archivos: `helios-products.js` y `villacampo-products.js` definen `window.HELIOS_SECTIONS` y `window.VILLACAMPO_SECTIONS`, y `despensa-products.js` los incorpora con `...(window.HELIOS_SECTIONS || [])`. Por eso esos dos scripts van antes en el HTML.
- Los textos de producto proceden del material que aportó el cliente; no se redactan datos técnicos propios.

## 5. Cabecera

- El HTML de la cabecera es idéntico en todas las páginas y **se genera**, no se edita a mano: `python3 -I _herramientas/cabecera.py` desde la raíz.
- El script tiene `MENU` (texto y destino de cada enlace) y `PAGES` (página → elemento activo y si la cabecera va fija sobre la portada). Solo `index.html` y `cafe-mocay.html` usan `is-fixed`.
- Para añadir Menaje: una entrada en `MENU` y otra en `PAGES` (`'menaje.html': ('Menaje', False)`), y volver a ejecutar el script. Reescribe la cabecera de todas las páginas listadas en `PAGES` y añade `site-header.css`/`.js` si faltan.
- En la página activa el enlace pasa a `href="#contenido"` con `aria-current="page"`.
- `site-header.js` solo centra el elemento activo del menú cuando no cabe entero (móvil y tablet). Con menos de 1350 px el menú pasa a segunda fila y `product-world`/`site-header.css` fijan `top:111px` para las escenas fijadas.
- Con 10 enlaces el menú ya se corta en móvil; añadir Menaje lo agrava. Se anota como riesgo, sin tocar nada ahora.

## 6. Pie y créditos

- Las páginas de categoría tienen un pie mínimo (`.pw-footer`): «Distribuciones Valentín · Medina del Campo» y «Volver a inicio ↑». No incluyen créditos de imágenes.
- Los créditos viven solo en `index.html` (`<p class="wrap credits">`), con autor, licencia y enlace de cada foto con licencia, y una frase para las imágenes de marca «pendientes de autorización».
- **No existe `assets/credits.json`.** El único `credits.json` está en `_sin-usar/assets/` (formato: `file, media, ref, title, creator, creatorUrl, license, licenseUrl, creditRequired, page, via`). Habrá que crear `assets/credits.json` con ese formato cuando entren imágenes de Menaje, y añadir un `<p class="credits">` en el pie de `menaje.html`, que es nuevo respecto a las demás categorías.
- `RECURSOS-PENDIENTES.md` ya dice que los derechos de uso de imágenes y marcas están sin confirmar; Menaje debe seguir esa regla.

## 7. Enlaces, SEO y publicación (estado actual)

- `index.html` línea ~150: la tarjeta «Menaje» es `<a class="card" href="#contacto">` y no tiene imagen. Es el único sitio donde hay que cambiar el destino.
- Las páginas de categoría solo tienen `title` y `meta description`. No hay `canonical`, Open Graph, Twitter Card, JSON-LD, `sitemap.xml` ni `robots.txt` en el repo. Todo eso sería nuevo.
- Despliegue: `.github/workflows/pages.yml` publica por push en `claude/sweet-bohr-lergl3` y `claude/funny-shannon-8m2ip8`; la rama actual (`claude/charming-faraday-9sfdfo`) **no** despliega. El paso `rsync` excluye `*.md`, `_herramientas` y `.git*`, de modo que estos documentos no se publican. `.htaccess` es de IONOS (Apache), con compresión y tipos MIME.

## 8. Movimiento y accesibilidad ya resueltos

- `motion-pref.js` crea `window.VM_REDUCE` y, si el dispositivo pide menos movimiento, añade un botón fijo «Activar animaciones». El estado se guarda en `localStorage` (`vm-motion`). **Ninguna de las páginas de categoría lo carga hoy** (`despensa.html` no lo incluye; solo `index.html`). Para Menaje habrá que decidir si se añade el `<script>`; `product-world.js` ya respeta `prefers-reduced-motion` por su cuenta.
- Enlace «Saltar al contenido» (`.pw-skip`), un solo `h1`, `aria-labelledby` en cada sección, `aria-current="page"` en el menú y elementos decorativos con `aria-hidden`.
- Foco visible: `site-header.css` define `outline` para los enlaces de la cabecera; el resto depende de `product-world.css`.
- Contraste AA: cada categoría fija sus colores en `<cat>.css`. Para Menaje habrá que comprobar el contraste de cada pareja `color`/`ink` y de `--red` sobre el fondo.

## 9. Lista de comprobación para crear `menaje.html`

1. Copiar `despensa.html` → `menaje.html`; cambiar `body class`, `title`, `description`, `theme-color`, textos de portada y cierre, `aria-current` y los scripts a cargar.
2. Crear `menaje.css` con su clase de `<body>` (sobre la base de `despensa.css`, que son 20 reglas).
3. Crear `menaje-products.js` con `const D = 'assets/menaje/'` y `ProductWorld.init`.
4. Añadir `Menaje` a `MENU` y `PAGES` en `_herramientas/cabecera.py` y ejecutarlo.
5. Apuntar la tarjeta de `index.html` a `menaje.html`.
6. Crear `assets/credits.json` y el párrafo de créditos del pie.
7. Datos sin confirmar: ver `MENAJE-PENDIENTES.md`. No se publican.
