# Recursos pendientes — Distribuciones Valentín

Estado de la web: rediseño fotográfico (sin 3D artificial). La versión anterior con almacén 3D está en `_version-3d/` y la primera en `_version-anterior/`.

## Marcas y productos verificados (aparecen en la web actual del cliente)
Café Mocay · Grupo Leche Pascual · Bodega Palacio de Bornos · Campofrío · Conservas Calvo · Pedras Salgadas y Pedras Limón (imagen en su web).
Categorías: café, lácteos, vinos, aguas, salsas/conservas/AOVE, refrigerados, congelados, menaje.

Comprobado en fuentes públicas: Mocay es una marca de Calidad Pascual (catálogo profesional 2023 en pascualprofesional.com, con gama de café, máquinas, Mocay Academy y complementos).

## Pendiente de conseguir o autorizar
| Recurso | Estado | Qué hacer |
| --- | --- | --- |
| Logotipos oficiales (SVG/PNG) de Mocay, Pascual, Palacio de Bornos, Campofrío, Calvo, Pedras | No hay condiciones de uso públicas localizadas | Pedirlos a cada marca o a su comercial. Hasta entonces la web muestra el nombre en texto, nunca un logotipo alterado |
| Fotografías oficiales de envases (café Mocay y resto) | Solo existe el catálogo Mocay 2023 en PDF, sin licencia de reutilización visible | Solicitar autorización o pack de prensa. Al recibirlo: `assets/productos/` y añadir al catálogo |
| Cervezas | La web actual no cita ninguna marca de cerveza | Confirmar marcas con el cliente. La sección `#cerveza` está preparada y oculta (`hidden`) |
| Vídeo publicitario de cerveza sirviéndose | No hay material autorizado de calidad | Material oficial de la marca o grabación propia. No se sustituye por simulación |
| Fotografía/vídeo del almacén y de los vehículos | El cliente no ha aportado material | La sección `#almacen` está preparada y oculta. Basta añadir `assets/almacen/` y quitar `hidden` |
| Imagen de Pascual (Bio Frutas) | La de su web es una captura de TV de 1997, de baja calidad | No se usa. Pedir foto actual |
| Foto de limones de su web, vídeo de cabecera de YouTube | Son del cliente pero no representan producto | No se usan |
| Teléfono, correo, dirección, horario | Ausentes en la web actual | Rellenar en el pie y poner el correo en `EMAIL` de `main.js` para activar el formulario |
| Aviso legal y política de privacidad | Enlaces sin destino | Enlazar sus páginas |

## Recursos que sí se usan
- Del cliente (web actual): logotipo, foto de Pedras, foto de Mocay Academy.
- Licencia abierta (créditos en el pie): Castillo de la Mota (Garijo, CC BY-SA 3.0), Plaza Mayor (Zarateman, CC0), granos de café en cuchara (Jameswasswa, CC BY-SA 4.0), grano de café aislado para la lluvia (Robert Knapp, CC BY-SA 3.0, recortado con `_herramientas/recorte-grano.html`).

## Por confirmar
- Cifras (40+ años, 500+ clientes, 2000+ productos): tomadas de la web actual.
- Distancias del selector «¿Llegamos a tu pueblo?»: aproximadas; confirmar poblaciones realmente atendidas.
- Fotos de Pedras y Mocay Academy: confirmar que el cliente tiene permiso para usarlas.

## Imágenes de producto de las marcas (añadidas, pendientes de autorización)
Descargadas de las webs oficiales de cada marca para uso **temporal en local**. No publicar en producción sin confirmar por escrito con cada marca (o con su kit de prensa/comercial) que el distribuidor puede usarlas.

| Marca | Archivos en `assets/marcas/` | Origen |
| --- | --- | --- |
| Palacio de Bornos | `bornos-verdejo.png`, `bornos-sauvignon-2025.png`, `bornos-fermentado.png` | palaciodebornos.com (fichas de producto) |
| Estrella Galicia | `estrella-galicia.png`, `estrella-galicia-bodega.webp`, `estrella-galicia-00.webp` | estrellagalicia.es (fichas de producto) |
| Conservas Calvo | `calvo-atun-oliva.png` (y natural, girasol) | calvo.es (fichas de producto) |
| Campofrío | `campofrio-chorizo.png`, `-salchichon.png`, `-jamon-cocido.png` | campofrio.es (fichas de producto) |
| Mocay (Calidad Pascual) | `mocay-cafe-arabica.jpg` | pascualprofesional.com |
| Pascual | `pascual-leche-extra-creme.jpg` | pascualprofesional.com |

Alternativa libre: `assets/estrella-galicia-beer.jpg` y `assets/estrellagaliciaespecial.jpg` (fotos CC0 de Wikimedia Commons, con fondo, no recortadas).
Sin imagen de marca: Congelados y Menaje (no hay marca confirmada). La cerveza se muestra como Estrella Galicia por indicación del cliente; confirmar que la distribuyen.

## Logotipos añadidos (originales, sin alterar; pendientes de autorización)
`assets/marcas/mocay-logo.svg` (calidadpascual.com), `bornos-logo.png` (palaciodebornos.com), `estrella-galicia-logo.svg` (estrellagalicia.es). Aparecen al terminar la caída del café y al terminar de servirse el vino y la cerveza.

## Sección «Del almacén a tu negocio» (furgoneta)
- `assets/furgoneta-referencia.jpg` es la fotografía que has aportado (furgoneta con publicidad de Bornos). Recortada con un contorno trazado a mano; hay pequeños bordes irregulares en rueda trasera y techo. **Pendiente:** fotografía profesional del vehículo de Distribuciones Valentín, preferiblemente ya recortada o con fondo neutro, y confirmar de quién es esta furgoneta y si se puede publicar con la publicidad de Bornos.
- El logotipo de Distribuciones Valentín sobre la caja es un **montaje provisional** (no figura en la foto original). Aprobar o quitar antes de publicar.
- Textos tomados de su web actual: gama en un solo distribuidor, reparto en Medina del Campo y comarca hasta unos 90 km, atención personalizada. Sin cifras ni plazos inventados.
- La skill `scroll-world` no está instalada en este equipo; la secuencia se ha construido con GSAP ScrollTrigger.

## Recorrido de escenas ilustradas (zoom y fundido con el scroll)
Sección `#recorrido`, entre «Un solo proveedor» y el café. Se activa sola cuando existen en `assets/escenas/` estos tres archivos:
`escena-1.jpg` (almacén), `escena-2.jpg` (café), `escena-3.jpg` (vinos). Si falta alguno, la sección queda oculta.
- **Origen:** imágenes generadas con la IA de Canva de Pablo (ids de medio `MAHZGerBJ6w`, `MAHZGaJMNx8`, `MAHZGXZ0Obw`). Hay que descargarlas en buena calidad desde Canva (formato JPG, ~1536 px de ancho o más) y guardarlas con esos nombres.
- **Pendiente:** otras tres escenas (cerveza, reparto, bar) que no se generaron por agotarse la cuota de Canva. Para añadirlas: nuevas imágenes `escena-4.jpg`…, un `<figure>` y un `<li class="reco-cap">` más en `index.html` y un punto en `.reco-dots`.
- Son ilustraciones, no fotos reales, y no muestran envases ni logos de marcas.

## Foto de portada
`assets/portada.jpg` (furgoneta con publicidad de Bornos delante del Castillo de la Mota, 1360×931) es la imagen que ha aportado Pablo. Confirmar autoría y permiso de publicación, y si la furgoneta es de Valentín (en la cabina se ve un óvalo rojo similar al logo). 1360 px de ancho es poco para pantallas grandes o retina: pedir el original en mayor resolución.

## Cerveza retirada
Por indicación de Pablo se ha quitado todo lo relacionado con la cerveza (panel Estrella Galicia, tarjeta del catálogo, sección preparada `#cerveza`) y se han borrado sus imágenes y su logo de `assets/`. Productos que figuran ahora: Café Mocay, Grupo Leche Pascual, Vinos, Aguas, Salsas/conservas/AOVE, Refrigerados, Congelados (y Menaje, de la web actual).

## Vídeo de YouTube tras la portada
Sección `#video`: vídeo `-XPwp-jmOn0` (título en YouTube: «video web cabecera», canal de Quique Martín Gallego), enlazado en la web actual del cliente. Empieza en el segundo 11 y avanza o retrocede con el scroll. Se carga con el reproductor oficial de YouTube (youtube-nocookie). Confirmar que el cliente es el titular del vídeo. Si el vídeo se vuelve privado, la sección muestra solo su miniatura.
Quitada también la sección «Vinos y aguas» (Bornos y Pedras) por indicación de Pablo; las marcas siguen en el catálogo.


## Teléfono y horario (confirmado por el responsable)
- El 635 09 80 44 **no tiene WhatsApp**: se quitó el botón flotante de WhatsApp de todas las páginas.
- Lo atiende una persona de forma habitual, de 7:00 a 15:00. A partir de las 15:00 las llamadas entrantes llegan al móvil particular de Valentín. Aparece en el contacto y el pie de la portada.


## Datos de empresa (confirmados por el responsable)
- 44 años de experiencia, desde 1982 (cifra de la portada).
- Proceso de alta de cliente y formas de pago: sección «Hazte cliente en 3 pasos» de la portada.
- Clientes que podrían dar su opinión (pendiente de pedirles permiso; no se publican nombres ni testimonios hasta tenerlo por escrito): Bar La Clave, Hotel Villa de Ferias, Restaurante La Mejillonera, Cervecería Baviera, Restaurante Los Toreros (Tordesillas) y Bar Alejandros (Tordesillas).
- Ficha de cliente (a mano): el responsable adjuntó un modelo; no se ha publicado.
