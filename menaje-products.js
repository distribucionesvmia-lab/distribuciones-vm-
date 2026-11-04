/* Menaje: datos de las escenas. De momento vacío; el motor (product-world.js) no pinta nada si no hay secciones.
   Familias previstas, en este orden (una escena por familia, ver MENAJE-PLAN.md, secciones 3 y 10):
     1. Vajilla
     2. Cubertería
     3. Cristalería
     4. Mantelería y textil
     5. Menaje auxiliar de cocina y sala
   Reglas: sin marcas, precios, plazos, mínimos ni cifras no confirmados ([POR CONFIRMAR], ver MENAJE-PENDIENTES.md).
   Cada producto necesita image, width, height y alt; las imágenes van en assets/menaje/ con licencia comprobada
   y anotadas en assets/credits.json. Una variante de «lineup» sin imagen se muestra como «Imagen pendiente». */
const D = 'assets/menaje/';
window.ProductWorld.init({
  mount: '#familias',
  sections: [
    /* Ejemplo de hueco (descomentar y completar cuando haya texto y foto confirmados):
    {
      template: 'editorial', family: 'Vajilla', color: '#eceff0', ink: '#1c2830',
      eyebrow: '[POR CONFIRMAR]', title: 'Vajilla.',
      description: '[POR CONFIRMAR]',
      products: [
        {name:'[POR CONFIRMAR]', description:'[POR CONFIRMAR]', image:D+'…', width:0, height:0, alt:'[POR CONFIRMAR]'}
      ]
    }
    */
  ]
});
