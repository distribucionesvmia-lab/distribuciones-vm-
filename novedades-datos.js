/* NOVEDADES: aquí se anotan los artículos nuevos que llegan a la distribuidora.
   Para añadir uno, copia un bloque entre llaves, ponlo ARRIBA de la lista (el primero es el más reciente) y rellena sus campos.
   Todos los campos menos «nombre» son opcionales. Si no hay ninguno, la página muestra un aviso de «muy pronto».

   fecha:   mes de llegada, en texto, por ejemplo 'Diciembre 2026'
   marca:   marca del artículo
   nombre:  nombre del artículo (obligatorio)
   etiqueta: (opcional) sello sobre la foto; si no se pone, «Nuevo»
   precio:  (opcional) por ejemplo '59 €'; precioNota: por ejemplo 'IVA incluido'
   destacado: (opcional) línea destacada bajo el nombre, por ejemplo «Edición limitada · Ideal para Navidad»
   anuncio: (opcional) frase para la barra roja de arriba; se usa la del primer artículo que la tenga
   formato: formato o peso, por ejemplo '75 cl' o 'Caja de 6 uds.'
   texto:   frase corta sobre el artículo (solo datos reales)
   foto:    ruta de la foto en PNG, por ejemplo 'assets/novedades/nombre.png'
   ficha:   (opcional) datos en filas: [['Uva', '100 % Tempranillo'], ['Cosecha', '2018']]
   fotos:   (opcional) varias fotos: ['assets/novedades/a.png', 'assets/novedades/b.png']; la primera es la principal
   enlace:  página de la web donde se ve, por ejemplo 'vinos.html'

   Ejemplo de artículo (cópialo fuera de este comentario para usarlo):
   {
     fecha: 'Diciembre 2026', marca: 'Marca', nombre: 'Nombre del artículo', formato: '75 cl',
     texto: 'Una frase corta.', foto: 'assets/novedades/ejemplo.png', enlace: 'vinos.html'
   },
*/
window.DVM_NOVEDADES = [
  {
    etiqueta: 'Edición limitada', destacado: 'Edición limitada · Campaña de Navidad',
    marca: 'Calvo · Luis Calvo', nombre: 'Lata de colección vintage Luis Calvo', formato: 'Estuche metálico de colección',
    texto: 'El homenaje gourmet a 85 años de historia (desde 1940). Un surtido exclusivo que reúne las 5 recetas tradicionales de la conservera gallega en un estuche metálico de colección.',
    ficha: [
      ['Contenido', '5 recetas: Mejillones en salsa gallega, Mejillones al albariño, Ventresca de atún claro escabechada, Sardinillas con cebolla pochada y Sardinillas con tomate seco'],
      ['Presentación', 'Estuche metálico de colección'],
      ['Edición', 'Limitada, para la campaña de Navidad'],
      ['Aniversario', '85 años de historia, desde 1940'],
      ['Ideal para', 'Cestas navideñas, tiendas gourmet y alta rotación en el lineal']
    ],
    enlace: 'despensa.html',
    fotos: ['assets/novedades/calvo-lata-vintage-banner.png', 'assets/novedades/calvo-lata-vintage-mejillones-sardinillas.png', 'assets/novedades/calvo-lata-vintage-lata-ventresca.png']
  },
  {
    etiqueta: 'Novedad', destacado: 'Edición limitada · Ideal para estas Navidades',
    anuncio: 'Novedad: Lleiroso 25 Aniversario, edición limitada para brindar en Navidad',
    marca: 'Lleiroso · D.O. Ribera del Duero', nombre: 'Lleiroso Reserva 25 Aniversario', formato: 'Edición limitada · 75 cl · con estuche',
    texto: 'Una edición limitada, ideal para regalar y brindar en estas fechas navideñas. Conmemora 2001-2026 y nace de cuatro barricas excepcionales. Solo 1.188 botellas numeradas, elaboradas y embotelladas en Valbuena de Duero.',
    ficha: [
      ['Uva', '100 % Tempranillo'],
      ['Cosecha', '2018'],
      ['Graduación', '14,5 %'],
      ['Crianza', '15 meses en barrica de roble francés y 70 meses en botella'],
      ['Cata', 'Rojo picota profundo con ribete rubí; fruta negra madura, sotobosque, tostados y especiados'],
      ['Servir a', '16-18 ºC'],
      ['Maridaje', 'Carnes a la brasa, carnes rojas y caza, quesos curados, guisos tradicionales y postres de frutos rojos, queso o cacao']
    ],
    precio: '49,90 €', precioNota: '+ IVA',
    enlace: 'vinos.html#lleiroso',
    fotos: ['assets/novedades/lleiroso-25-aniversario.png', 'assets/novedades/lleiroso-25-aniversario-abierta.png']
  }
];
