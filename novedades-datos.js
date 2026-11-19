/* NOVEDADES: aquí se anotan los artículos nuevos que llegan a la distribuidora.
   Para añadir uno, copia un bloque entre llaves, ponlo ARRIBA de la lista (el primero es el más reciente) y rellena sus campos.
   Todos los campos menos «nombre» son opcionales. Si no hay ninguno, la página muestra un aviso de «muy pronto».

   fecha:   mes de llegada, en texto, por ejemplo 'Diciembre 2026'
   marca:   marca del artículo
   nombre:  nombre del artículo (obligatorio)
   formato: formato o peso, por ejemplo '75 cl' o 'Caja de 6 uds.'
   texto:   frase corta sobre el artículo (solo datos reales)
   foto:    ruta de la foto en PNG, por ejemplo 'assets/novedades/nombre.png'
   enlace:  página de la web donde se ve, por ejemplo 'vinos.html'

   Ejemplo de artículo (cópialo fuera de este comentario para usarlo):
   {
     fecha: 'Diciembre 2026', marca: 'Marca', nombre: 'Nombre del artículo', formato: '75 cl',
     texto: 'Una frase corta.', foto: 'assets/novedades/ejemplo.png', enlace: 'vinos.html'
   },
*/
window.DVM_NOVEDADES = [
];
