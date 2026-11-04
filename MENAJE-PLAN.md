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

## 10. Referencias

Búsqueda web hecha solo para ver **cómo se estructura y se describe** el menaje de hostelería. No se ha copiado ningún texto, imagen ni dato de producto, y nada de esto se puede presentar como propio.

Limitaciones:
- La sesión no puede abrir webs de distribuidores (`bunzlspain.com` no resuelve: el dominio está fuera de los permitidos). Lo que sigue sale de resultados de búsqueda y catálogos en PDF, no de navegar las tiendas. Faltaría ver las fichas de producto reales.
- Ninguna fuente da precios vigentes y no se usan.
- Las afirmaciones de producto de las fuentes (apilable, apto para lavavajillas, etc.) pertenecen a esos fabricantes y series. Solo podrían usarse para las marcas que distribuya la empresa, y eso está [POR CONFIRMAR] (ver `MENAJE-PENDIENTES.md`).

### Fuentes consultadas

| Tipo | Fuente | Qué aporta a la estructura |
|---|---|---|
| Distribuidor Horeca | [Bunzl Spain, catálogo de cubertería Cartuja (PDF)](https://www.bunzlspain.com/media/bunzl-pdf/Catalogo_Cartuja_Cuberteria_web.pdf) | Se presenta como distribuidor del sector con menaje de cocina, vajilla, cristalería y cubertería |
| Mayorista | [ADI Foodservice 2025 (PDF)](https://catalogos.adiberia.com/adi_foodservice_2025/datos/media/descargable.pdf) | Mayorista de menaje de hostelería con marcas propias de porcelana profesional |
| Directorio | [Proveedores.com, menaje para hostelería](https://www.proveedores.com/fabricantes_t/menaje-para-hosteleria/) | Cómo se agrupa el sector: menaje, vajilla, cubertería y cristalería como categorías separadas, buscadas por provincia |
| Fabricante vajilla | [Porvasal, catálogo 2024 sin precios (PDF)](https://storage.googleapis.com/d_images/ServiceAttachment/6688/534/PORVASAL_2024_WebNoPrecios.pdf) | Fichas por serie con iconos de uso (lavavajillas, horno, microondas) y opción de personalizar |
| Fabricante vajilla | [Summa, catálogo (Issuu)](https://issuu.com/owlpinegroup/docs/summa_catalogue_aw2023-s) | Colecciones por serie con aclaración de usos y limitaciones por variante |
| Distribuidor de vajilla | [Pioli, ficha de porcelana (Hostelería10)](https://hosteleria10.com/recursos/pdfs/pioli-vajilla-porcelana-plano.pdf) | Ficha técnica corta: formato, apilable, apto para lavavajillas |
| Fabricante textil | [Karme, catálogo Nature 22-23 (PDF)](https://karme.es/Documents/Catalogue/2022/Cat%C3%82%C2%A0logo%20Karme%20Nature%2022-23%20Baja%20Resoluci%C3%82%C2%A2n.pdf) | Separa tela, airlaid, manteles de papel y servilletas de papel |
| Fabricante textil | [Iberosa, catálogo textil de hostelería (PDF)](https://infohoreca.com/media/uploads/directorio/documentos/iberosa-catalogo-textil-hosteleria-2401esp.pdf) | Textil de hostelería agrupado por uso |
| Blog de proveedor | [García de Pou, qué mantelería elegir](https://blog.garciadepou.com/en/which-professional-table-linen-to-choose/) | Criterios de elección de mantelería profesional |
| Guía de compra | [Bone and White, cómo elegir la vajilla de un restaurante](https://en.boneandwhite.com/blogs/bone-and-white-blog/como-elegir-la-vajilla-para-un-restaurante) | Elegir según concepto del local, tipo de servicio y coste a largo plazo |
| Guía de compra | [Qooqer, comprar menaje para tu restaurante](https://qooqer.com/blog/comprar-menaje-para-tu-restaurante) | Tratar el menaje como inventario y planificarlo antes de comprar |
| Feria sectorial | [IFEMA, sector menaje](https://www.ifema.es/guext/sectores/menaje) | Clasificación del sector: cocción y preparación, vajilla, cristalería, cubertería y accesorios de barra |
| Catálogo técnico | [Hostelería10, cubetas Gastronorm (PDF)](https://hosteleria10.com/recursos/catalogos/catalogo-cubetas-gastronorm-hosteleria10.pdf) | Cubetas por formato modular, con tapas y accesorios |
| Catálogo | [A.M.C. (Issuu)](https://issuu.com/masbarservitel/docs/men_amc_ok) | Auxiliar de sala en plástico (jarras, vasos, bandejas) como bloque aparte |
| Catálogo | [García de Pou, productos durables (Issuu)](https://issuu.com/catalogosgarciadepou/docs/cat-hos-durable-es) | Capítulo de menaje auxiliar separado del resto |

### Patrones que se repiten

1. **Cuatro familias base más una de auxiliares.** Vajilla, cristalería y cubertería casi siempre van separadas; el textil y el auxiliar de cocina y sala aparecen como bloques propios. Coincide con las 5 familias del encargo.
2. **Los catálogos organizan por serie o colección, no por pieza.** Un bloque por familia con una serie representativa funciona mejor que una lista plana.
3. **Fichas cortas y comparables.** Formato, material, usos admitidos (lavavajillas, horno) y personalización. Es lo que el cliente profesional busca para decidir.
4. **Cada fuente delimita bien lo que no hace.** Las aclaraciones por variante (por ejemplo, un uso no apto en una serie concreta) dan confianza. Conviene hacer lo mismo: no prometer usos que la marca no confirme.
5. **Las guías de compra empiezan por el local, no por el producto:** concepto, tipo de servicio, resistencia, limpieza y coste a largo plazo.
6. **Consulta antes que carrito.** Las fuentes de catálogo sirven como punto de partida para pedir tarifa o muestras. Encaja con el modelo de la web (contactar, no vender en línea).

### Aplicación a las 5 familias

Todo lo de esta tabla es **estructura y enfoque**. Los textos concretos, marcas y datos de producto se redactan solo cuando haya datos confirmados.

| Familia | Cómo estructurarla | Qué debe decir la ficha (solo si se confirma) | Evitar |
|---|---|---|---|
| **Vajilla** | Por tipo de pieza (platos, bol, tazas) y, si hay marcas confirmadas, por serie | Material, formatos, usos admitidos, posibilidad de reposición | Prometer «apilable» o «apta para lavavajillas» sin ficha de la marca |
| **Cubertería** | Por juego de servicio (mesa, postre, cuchillería) | Material y acabado, formatos disponibles | Cifras de calidad del acero sin fuente de la marca |
| **Cristalería** | Por uso (agua, vino, cerveza, coctelería) | Tipos de copa y vaso, capacidades que estén en la ficha | Fijar cantidades por silla como regla propia: es una opinión de un blog, no un dato de la empresa |
| **Mantelería y textil** | Separar tela, desechable (airlaid, papel) y a medida si la empresa lo ofrece | Tejido, medidas habituales, lavable o desechable | Gramajes y composiciones sin confirmar; las fuentes consultadas no aportan rangos fiables |
| **Menaje auxiliar de cocina y sala** | Sala (bandejas, jarras, utensilios de servicio) y cocina (recipientes Gastronorm, utensilios) por separado | Formatos modulares y compatibilidad (Gastronorm 1/1, 1/2…) si se distribuyen | Mezclar sala y cocina en una sola lista larga |

### Decisiones para las siguientes tareas

- La estructura de `menaje.html` sigue el orden de las 5 familias, con una escena por familia. La plantilla `editorial` o `lineup` del motor encaja con «bloque por serie» y con listas de variedades.
- Mientras las marcas sean [POR CONFIRMAR], los textos hablan de tipos de producto y de cómo elegir, sin nombrar fabricantes ni atributos técnicos.
- El bloque «Equipa tu local» puede basarse en el patrón 5 (empezar por el tipo de local), sin cifras de stock ni descuentos.
- Pendiente de ver con acceso a los dominios: ver fichas reales de distribuidores. Queda anotado en `MENAJE-PENDIENTES.md`.

## 11. Palabras clave

### Qué se pudo y qué no se pudo medir

- **Volumen de búsqueda: sin datos.** Esta sesión no tiene acceso a Google Keyword Planner, Search Console, Semrush ni similares. **No se da ninguna cifra de volumen** y las prioridades de abajo se basan en intención, ajuste al negocio y lo que muestran los resultados de búsqueda.
- **Competencia: valoración cualitativa**, a partir de 4 búsquedas web hechas para esta tarea. Es orientativa: la herramienta de búsqueda no equivale a la página de resultados de Google de un usuario en Medina del Campo.
- Lo que mostraron esas búsquedas:
  - «menaje hostelería Medina del Campo» devolvió sobre todo páginas de turismo y alojamiento. No apareció ninguna página de empresa claramente optimizada para esa búsqueda. Un directorio citaba un negocio de suministros para hostelería en Medina del Campo y otro en Tordesillas.
  - «vajilla para restaurantes Valladolid» devolvió catálogos de fabricantes, directorios y tiendas de otros países. Solo apareció una empresa de Valladolid que menciona vajilla entre otros productos.
  - «distribuidor menaje hostelería Castilla y León» mostró distribuidores en León, Burgos, Salamanca y Ponferrada, todos vía directorios.
  - «cristalería / mantelería hostelería Valladolid» devolvió casi solo directorios (proveedores.com) y distribuidores nacionales; ninguna web local clara que ofrezca ambas cosas.
- Todos los nombres de empresa salen de directorios y no están verificados. No se citan en la web. Solo sirven para saber que existe competencia local pequeña y dispersa.
- Cómo obtener datos reales (queda en `MENAJE-PENDIENTES.md`): Planificador de palabras clave de Google (gratuito con cuenta de Ads), y, una vez publicada la página, Search Console.

### Candidatas evaluadas

Intención comercial local: quien busca quiere comprar o pedir presupuesto en su zona. Competencia: **baja / media / alta** según lo observado; «sin datos» si no se vio.

| Palabra clave | Zona | Familia | Intención | Competencia estimada | Comentario |
|---|---|---|---|---|---|
| menaje hostelería Medina del Campo | Local | Todas | Compra local | Baja | Sin página específica visible; ajuste exacto con la dirección y el reparto |
| menaje para hostelería Valladolid | Provincia | Todas | Compra local | Media | Más área, más competencia de directorios |
| distribuidor menaje hostelería Valladolid | Provincia | Todas | Proveedor B2B | Media | Intención clara de distribuidor, no de tienda |
| distribuidor menaje hostelería Castilla y León | Región | Todas | Proveedor B2B | Media | Dominada por directorios; amplía el alcance |
| vajilla para restaurantes Valladolid | Provincia | Vajilla | Compra local | Media | Resultados de fabricantes y de otros países; poca competencia local clara |
| vajilla hostelería | Nacional | Vajilla | Compra | Alta | Demasiado genérica para esta página |
| cristalería para hostelería Valladolid | Provincia | Cristalería | Compra local | Baja-media | Pocos resultados locales claros |
| cristalería hostelería | Nacional | Cristalería | Compra | Alta | Genérica; competidores nacionales |
| mantelería para hostelería | Nacional | Mantelería | Compra | Media-alta | Fabricantes y distribuidores nacionales; sin ficha local |
| mantelería hostelería Valladolid | Provincia | Mantelería | Compra local | Baja | Casi solo directorios |
| cubertería para hostelería Valladolid | Provincia | Cubertería | Compra local | Sin datos | No se buscó por separado |
| suministros hostelería Medina del Campo | Local | Todas | Compra local | Baja-media | Existe al menos un negocio local con ese perfil según un directorio |
| comprar menaje hostelería al por mayor | Nacional | Todas | Mayorista | Alta | Intención válida, pero sin ajuste geográfico |

Descartadas:
- Términos sin intención de compra de un profesional local («cómo elegir vajilla», «tipos de copas»): sirven para un artículo, no para esta página.
- Términos de particulares («vajilla barata», «juego de cubiertos»): público equivocado.
- Cualquier marca concreta: no se sabe qué marcas distribuye la empresa ([POR CONFIRMAR]).

### Elección

**Principal: `menaje hostelería Medina del Campo`**
- Es exactamente el negocio: distribuidor con sede y reparto desde Medina del Campo.
- Intención comercial local clara y competencia aparentemente baja: ninguna página específica en las búsquedas hechas.
- Coincide con el texto de la tarjeta actual y con la dirección, que sirve de señal local.
- Riesgo: volumen probablemente bajo (no medido). Se compensa con las secundarias, que amplían la zona.

**Secundarias (5)**
1. `distribuidor menaje hostelería Valladolid`: amplía a la provincia con intención de proveedor B2B, sin competencia local fuerte vista.
2. `distribuidor menaje hostelería Castilla y León`: amplía a la región, coherente con «hasta 90 km» y con un mapa de directorios dominado por distribuidores de otras provincias.
3. `vajilla para restaurantes Valladolid`: la familia con más escaparate visual y la que más busca un restaurante nuevo.
4. `cristalería para hostelería Valladolid`: pocos resultados locales claros; apoya la familia Cristalería.
5. `mantelería para hostelería`: sin sufijo de ciudad por su baja búsqueda local; se trabaja como h2 y texto de la familia, no como objetivo principal. Si hay datos reales, valorar `mantelería hostelería Valladolid`.

Cubertería y menaje auxiliar no llevan palabra clave propia en esta primera versión: se cubren con la principal y la variante genérica en sus h3 y alt.

### Dónde colocarlas (para la tarea de SEO on-page)

| Elemento | Palabra clave |
|---|---|
| `title` (55-60 caracteres) y `h1` | Principal |
| `meta description` | Principal + «Valladolid» + llamada a contactar; sin precios ni plazos |
| `h2` de familia | Vajilla → «vajilla para restaurantes»; Cristalería → «cristalería para hostelería»; Mantelería → «mantelería para hostelería» |
| Texto de portada y de cierre | «distribuidor» + «Valladolid» y «Castilla y León» una vez cada una |
| `alt` de imágenes | Descripción real del objeto; sin palabras clave metidas a la fuerza |
| JSON-LD | `areaServed` solo con la zona de reparto que ya consta en la web (Medina del Campo, comarca, hasta 90 km); no añadir localidades no confirmadas |
| FAQ | Preguntas reales de un hostelero, con respuestas confirmadas; ninguna sin respuesta [POR CONFIRMAR] |

Reglas: una sola palabra principal por página, lenguaje natural, sin repetir la clave en cada frase. Sin cifras, años ni plazos que no estén confirmados.

## 12. Estado del esqueleto (T04)

Creados `menaje.html`, `menaje.css` y `menaje-products.js` a partir de `despensa.*`. Comprobado en local con Playwright (1440 y 390 px): un solo `h1`, sin errores de consola, sin desbordamiento horizontal.

- **Hero:** `h1` «Todo el menaje de tu local, en el mismo reparto que tu pedido», subtítulo con reparto hasta 90 km desde Medina del Campo (ambos datos constan en `index.html`) y botón «Pedir información» a `index.html#contacto`. La portada no tiene imagen: la zona queda como círculo y palabra, con un comentario HTML que marca el hueco.
- **Escenas:** `menaje-products.js` inicia el motor con `sections: []` (no pinta nada) y deja anotadas las 5 familias y una escena de ejemplo comentada. No hay datos de producto.
- **Cierre y pie:** cierre «Equipa tu local» con enlace a contacto (sin WhatsApp, sin oferta) y pie estándar. Hueco comentado para el párrafo de créditos.
- **Colores:** paleta propia con contrastes AA calculados (ver comentario en `menaje.css`).
- **Cabecera:** el HTML de `menaje.html` ya incluye «Menaje» como último enlace, con `aria-current`. **Las demás páginas y `_herramientas/cabecera.py` no se han tocado**: añadir Menaje a `MENU` y `PAGES` y regenerar es la tarea de integración. Mientras tanto la nueva página es la única que enlaza a Menaje, y nada enlaza a ella.
- **`noindex`:** la página lleva `<meta name="robots" content="noindex">` mientras esté en construcción. Hay que quitarla al publicar.
- **`motion-pref.js` no se carga** (igual que en `despensa.html`): `product-world.js` ya respeta `prefers-reduced-motion` por su cuenta y no lee `window.VM_REDUCE`, así que el botón «Activar animaciones» no tendría efecto aquí y confundiría.
- **Meta description:** 141 caracteres; la tarea de SEO la lleva a 150-155 con la llamada a contactar. El `title` mide 60.
- Sin `canonical`, Open Graph ni JSON-LD todavía (tarea de SEO).

## 13. Bloques por familia (T05)

`menaje-products.js` define 5 escenas `lineup`, en este orden, con h2 y título de lista basados en las palabras clave de la sección 11:

| Escena | h2 | Palabra clave | Enlace de consulta |
|---|---|---|---|
| Vajilla | Vajilla para restaurantes. | secundaria 3 | «Consultar vajilla» → `index.html#contacto` |
| Cubertería | Cubertería para hostelería. | variante genérica | «Consultar cubertería» → `index.html#contacto` |
| Cristalería | Cristalería para hostelería. | secundaria 4 | «Consultar cristalería» → `index.html#contacto` |
| Mantelería y textil | Mantelería para hostelería. | secundaria 5 | «Consultar mantelería» → `index.html#contacto` |
| Menaje auxiliar de cocina y sala | Menaje auxiliar de cocina y sala. | familia | «Consultar menaje auxiliar» → `index.html#contacto` |

- Cada escena tiene 3 líneas útiles (lista numerada que se activa con el scroll) y el hueco de foto aparece como «Imagen pendiente». Al tener una foto, se añade `product:{image,width,height,alt}` a la escena.
- **Cambio en el motor:** `lineup` no tenía forma de llevar un enlace, así que se añadió el campo opcional `cta` (`product-world.js` y `product-world.css`). Es compatible con el resto de páginas, y está explicado en `PRODUCT-WORLD.md`. Solo `menaje.html` carga las versiones nuevas (`?v=14` y `?v=17`).
- **Sin marcas, cifras, precios ni plazos.** Lo único concreto es lo que ya consta en la web: reparto hasta 90 km desde Medina del Campo y «un solo pedido».
- **Textos de consulta, no de catálogo.** No se afirma qué piezas, materiales ni formatos hay en stock: cada línea invita a contar el tipo de local y la carta y ofrece asesoramiento, que la web ya promete («atención personalizada»). Hasta tener datos de producto, no se enumeran artículos concretos.
- Las ciudades (Valladolid, Castilla y León) **no** aparecen en estos textos: siguen solo como palabra clave hasta confirmar la zona de servicio (ver `MENAJE-PENDIENTES.md`).
- **Contraste AA:** las filas inactivas de la lista bajan de opacidad en el motor (.4 en escritorio, .5 en móvil con animación), por debajo de 4,5:1. `menaje.css` las sube a .72 solo en esta página (5,2:1 o más sobre los 5 fondos). Las demás páginas del sitio siguen con los valores del motor.
- Probado con Playwright a 1440 y 390 px: un solo `h1`, sin errores de consola ni desbordamiento horizontal, 5 enlaces de consulta.

## 14. Fotografías (T06)

Seis fotos (portada y una por familia) de **Wikimedia Commons**, descargadas a `assets/menaje/` en WebP. No hay material oficial de fabricante con permiso ni marcas identificables a propósito. Comprobación de licencia: los metadatos de cada archivo en la API de Commons (licencia, autoría, enlace de licencia, sin restricciones marcadas). Todas se pueden usar con atribución (CC BY, CC BY-SA) o sin ella (CC0).

| Uso | Archivo | Peso | Medidas | Autor | Licencia | Página de origen |
|---|---|---|---|---|---|---|
| Portada | `hero-mesa-restaurante.webp` | 88 KB | 1400 × 1050 | Gogerr | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Table_Setting_at_the_Elora_Mill_Hotel_restaurant.jpg) |
| Vajilla | `vajilla-platos-apilados.webp` | 142 KB | 1100 × 733 | Mussi Katz | CC0 | [Commons](https://commons.wikimedia.org/wiki/File:Hundreds_of_white_plates_and_bowls_stacked_at_a_tableware_shop_in_Chatuchak_Weekend_Market,_Bangkok.jpg) |
| Cubertería | `cuberteria-cajon-cubiertos.webp` | 89 KB | 1100 × 733 | Acabashi | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Cutlery_drawer.jpg) |
| Cristalería | `cristaleria-copas-mesa.webp` | 81 KB | 900 × 1125 | Socket0 | CC BY-SA 3.0 | [Commons](https://commons.wikimedia.org/wiki/File:Wine_glasses_on_a_table_.jpg) |
| Mantelería y textil | `manteleria-mesa-redonda.webp` | 55 KB | 1100 × 733 | Basile Morin | CC BY-SA 4.0 | [Commons](https://commons.wikimedia.org/wiki/File:Restaurant_table_at_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg) |
| Menaje auxiliar | `auxiliar-utensilios-pared.webp` | 141 KB | 960 × 640 | Shixart1985 | CC BY 2.0 | [Commons](https://commons.wikimedia.org/wiki/File:Collection_of_essential_cooking_tools_hanging_on_a_rustic_wall.jpg) |

- **Registro:** `assets/credits.json` (nuevo, mismo formato que el de `_sin-usar/assets/`, más `sourceFile` y `changes`) y párrafo `.pw-credits` en el pie de `menaje.html`, con título, autoría, licencia y enlaces. Indica que las fotos están redimensionadas, convertidas a WebP y, en dos casos, recortadas (requisito de las licencias CC).
- **Carga:** portada sin `loading="lazy"` y con `fetchpriority="high"`; las cinco de familia con `loading="lazy"`. Todas con `width`/`height` y `alt` descriptivo. Ningún enlace externo a imágenes (comprobado con Playwright: 0 peticiones externas salvo Google Fonts).
- **Cambio en el motor:** `lineup` ahora admite `product.lazy: true` (carga diferida); sin él mantiene el comportamiento anterior. Detalle en `PRODUCT-WORLD.md`.
- **Sustituir cuando se pueda:** estas fotos son de otros países (Canadá, Tailandia, Laos y otras) y de otros locales; sirven como ilustración genérica pero no representan el catálogo de la empresa. Lo ideal es cambiarlas por fotos propias o material oficial del fabricante con permiso, cuando se confirmen las marcas ([POR CONFIRMAR]).
- Las fotos de cristalería (copas sobre mantel) y de menaje auxiliar (utensilios en pared) son las más débiles como imagen comercial.

## 15. «Por qué pedirlo con nosotros» y «Equipa tu local» (T07)

Dos secciones de texto en `menaje.html`, entre las escenas por familia y el cierre. Son HTML estático con estilos propios en `menaje.css` (no usan el motor, porque no llevan imagen): `#por-que` (fondo claro, 4 puntos) y `#equipa-tu-local` (fondo de acento, dos casos y botón «Pedir presupuesto» a `index.html#contacto`). El cierre pasa a «Hablemos de tu pedido», que ya existe en la portada, para no repetir el título «Equipa tu local».

**Qué se afirma y de dónde sale en el repo (`index.html`)**

| Texto de la página | Respaldo en el repo |
|---|---|
| Un solo proveedor: café, bebidas, lácteos, conservas, embutidos, congelados y menaje en el mismo distribuidor | «Un solo proveedor para toda tu carta» y «todo en un solo distribuidor» |
| Un solo pedido, el menaje se reparte junto con lo demás | «Reunimos en un solo pedido café, bebidas, lácteos, conservas, embutidos, congelados y menaje» |
| Repartimos desde Medina del Campo, hasta unos 90 km a la redonda | «Reparto en Medina del Campo y comarca, hasta unos 90 km a la redonda» |
| Trato cercano y un equipo con experiencia para asesorarte | «Trato cercano y atención personalizada, con un equipo con experiencia para asesorarte» |
| Te respondemos lo antes posible | «Cuéntanos qué necesita tu negocio y te respondemos lo antes posible» |

**Qué se dejó fuera** (todo en `MENAJE-PENDIENTES.md`)
- **Reposición:** no aparece en ninguna parte del repo. No se menciona.
- **Cifras** (años de experiencia, clientes, número de productos): existen en la portada, pero no son de menaje y los contadores animados muestran valores distintos a los finales mientras cuentan. No se reutilizan.
- **«Primeras marcas»:** no se aplica a menaje, porque las marcas de menaje están [POR CONFIRMAR].
- Cualquier promesa de gratuidad, plazo de presupuesto, visita al local o descuento de apertura.

**Texto de «Equipa tu local»:** invita a contar el tipo de local, las mesas o la carta y a pedir presupuesto. Usa la promesa general de asesoramiento de la web; no afirma un servicio específico de equipamiento llave en mano.

**Accesibilidad:** un solo `h1`; las nuevas secciones son `h2` con `h3` en los puntos. Contraste de todos los textos de las secciones nuevas y del cierre comprobado con Playwright (todos 4,5:1 o más). Foco visible propio en enlaces (azul/rojo en fondo claro y blanco en fondo oscuro). Sin animaciones nuevas; el botón respeta `prefers-reduced-motion`. Sin desbordamiento a 1440 ni a 390 px.
