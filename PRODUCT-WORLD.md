# Sistema de secciones de producto

`pascual.html` y `vinos.html` comparten `product-world.css` y `product-world.js`. Cada página define sus datos en `pascual-products.js` o `vinos-products.js`. Para añadir otra marca, duplica una de las páginas y crea un archivo de datos con `window.ProductWorld.init({ mount: '#familias', sections: [...] })`.

## Plantillas disponibles

- `hero`: un envase protagonista, con entrada, escala y profundidad vinculadas al scroll.
- `range`: varias referencias en un recorrido horizontal controlado por el scroll vertical.
- `editorial`: productos e información en una composición asimétrica.
- `story`: secuencia de productos con cambio de fondo y transición reversible.

Cada sección acepta `family`, `color`, `ink`, `eyebrow`, `title` y sus datos de producto. Cada producto utiliza `name`, `description`, `image`, `width`, `height` y `alt`. La plantilla `story` acepta `frames`, cada uno con un `color` opcional. Las imágenes se sustituyen cambiando únicamente la ruta y sus dimensiones en el archivo de datos.

El motor usa GSAP ScrollTrigger ya presente en el proyecto. Si no carga, muestra una versión estática. En móvil las escenas se apilan y se evita el desplazamiento horizontal fijado. Con `prefers-reduced-motion` se muestran todas las referencias sin animación.

## Imágenes y publicación

Las botellas de Bornos de `assets/marcas/` ya estaban en el proyecto. Las imágenes nuevas de `assets/pascual/` y `assets/vinos/` son recortes fieles de las capturas aportadas por el usuario. El recorte de Leche Pascual Intense tiene el fondo retirado mediante selección de píxeles; el envase y la etiqueta no se han redibujado. Algunas capturas tienen resolución limitada, especialmente Pinna Fidelis, Vivesoy y los envases de Bifrutas. Conviene sustituirlas por fotografías originales antes de una publicación definitiva.

Las condiciones de uso de imágenes y marcas siguen pendientes en `RECURSOS-PENDIENTES.md`. Estas páginas quedan preparadas y probadas **en local**; no publicar los nuevos recursos en un repositorio público o en producción sin confirmar sus derechos de uso.

## Despensa (Calvo, Helios, Prima, Carbonell/Koipe)

`despensa.html` + `despensa-products.js` + `despensa.css`, con imágenes en `assets/despensa/` (recortes de las capturas aportadas por el cliente; textos tomados de ese mismo material).

Opciones nuevas del motor, compatibles con las páginas anteriores:

- `columns: 3` (editorial): tres columnas escalonadas.
- `cover: true` en un producto (editorial): fotografía a sangre con su proporción real (`width`/`height`), para fotos de plato o de ambiente.
- `dark: true` (cualquier plantilla): tema oscuro, para fondos de marca como el rojo de Prima.
- `logo: {image,width,height,alt}` (hero): logotipo de la marca junto al titular.
- `product.wide: true` (hero): gama panorámica de varios envases en una sola imagen.
- La altura del recorrido horizontal (`range`) crece con el número de productos.

Resolución limitada: las bolsas de hostelería de Calvo (~170 px de ancho), los aceites Koipe/Carbonell profesional (~105 px) y Helios (~420 px) salen de capturas pequeñas; conviene sustituirlas por fotografías originales. Las bolsas conservan restos de borde de la captura. Derechos de uso de imágenes y marcas: pendiente (ver `RECURSOS-PENDIENTES.md`).

## Plantilla `lineup` (gama con variedades)

Un envase de la gama a la izquierda y la lista de variedades a la derecha; el scroll va activando cada variedad y desplegando su descripción (reversible). Sirve cuando hay muchas referencias y una sola imagen de gama. Campos: `family`, `color`, `ink`, `eyebrow`, `title`, `note` (pie de la imagen), `product` (imagen de la gama) y `variants: [{name, description}]`. Con más de 8 variedades se compacta sola. En móvil, con `prefers-reduced-motion` y sin GSAP se muestra la lista completa con todas las descripciones.

Se usa en `pascual.html` para Yogikids, Yogures (13 variedades) y Natillas; el flan usa `hero`.

Las imágenes de `assets/pascual/yogikids-fresa.webp`, `yogur-vaso.webp`, `flan-huevo.webp` y `natillas.webp` proceden de calidadpascual.com (PNG con fondo transparente, hasta 545 px de alto, recortadas al contenido). Cada imagen muestra un único sabor y se usa como imagen de la gama; el pie lo indica. Derechos de uso pendientes de confirmar (ver `RECURSOS-PENDIENTES.md`).

## `lineup` con una imagen por variedad (Despensa)

Si una variedad lleva `image`, `width`, `height` y `alt`, la imagen se cruza con el scroll en el lateral; si no la lleva, se muestra un marcador «Imagen pendiente» claramente identificado. En móvil y sin animaciones cada variedad muestra su miniatura en la lista. Con más de 14 variedades la lista se convierte en una ventana que sigue a la variedad activa.

Datos y fuentes de imagen de Despensa:

- `helios-products.js` (96 productos, 9 escenas): fotos del catálogo público de la tienda oficial de Helios (`tienda.helios.es/products.json`). Quedan 11 productos sin imagen porque no figuran en ese catálogo (Torti-Ya sin cebolla, patata entera, maíz dulce, tomate frito 3 kg, kétchup Selección, formatos mini de kétchup, mostaza y mayonesa, miel de 28 g, confitura de ciruela de 28 g, cerezas verdes).
- `villacampo-products.js` (22 productos, 4 escenas): foto de la ficha de cada producto en vegagelconservas.com. El maíz de ½ kg no tiene ficha propia y queda pendiente.
- `despensa-products.js`: Calvo, Prima, Carbonell y Koipe (capturas aportadas), Carmencita (imágenes ilustrativas de la especia, no el envase), La Ballena (una caja), Luengo (fichas de distribuidores; la mayoría de referencias sin imagen), Borges (catálogo oficial; formato comercial, distinto del de hostelería).

Todas estas imágenes proceden de webs de marcas o distribuidores. Sus derechos de uso están pendientes de confirmar (ver `RECURSOS-PENDIENTES.md`).

## Congelados (Panamar)

`congelados.html` + `congelados-products.js` + `congelados.css`: 64 productos en 5 escenas `lineup` (panes y barras, croissants, bollería dulce, snacks salados y pastelería). Los textos son los facilitados por el cliente.

**Imágenes.** Las 64 fotografías proceden del catálogo oficial de Panamar (archivos guardados desde el navegador; la web del catálogo bloquea las descargas automáticas). Para regenerar la sección con otras imágenes: `python3 -I _herramientas/congelados/build.py <carpeta_con_las_imagenes>`. `mapa.json` indica qué archivo del catálogo corresponde a cada producto; los marcados como `aproximado` usan el producto más cercano del catálogo (Baguettina Express 120 g, Barra Verité 250 g, Croissant Art Supreme 80 g, Napolitana Decorada de Crema 118 g y Lámina de Hojaldre 60 × 40 cm).


## Leche Classic bag in box (Pascual)

En `pascual-products.js`, tras la portada, van tres escenas de Leche Classic: la caja de 10 L (hero), «Bag in box de 10 litros» (editorial, con el banner del nuevo formato y el enfriador de leche) y «Por qué el bag in box» (story, cuatro ventajas con sus iconos dorados recortados de las imágenes aportadas). Los textos de las ventajas son los facilitados por el cliente. El 33 % de rentabilidad figura con su nota original («comprobado por nuestros maestros baristas»). Las imágenes del latte art, el dispensador suelto, la jarra roja y el sello del 33 % que se pegaron en el chat no llegaron como archivos; el banner `classic-bag-in-box.webp` ya muestra enfriador, taza y jarra roja.

## Plantilla `lineup`: enlace opcional e imagen única diferida

- `cta: {label, href}` pinta un enlace bajo la lista de variedades (`.pw-e-cta`, mismo estilo `.pw-link` que `hero` y `editorial`). Sin `cta` la escena queda igual.
- En la imagen única de `lineup` (`product`), `lazy: true` carga la foto con `loading="lazy"`; sin ese campo se mantiene `loading="eager"`.
- `.pw-more`: línea secundaria opcional dentro de `.pw-end` (por ejemplo, «¿Equipas tu local? Mira el menaje»).
