/* Menaje: datos de las escenas. De momento vacío; el motor (product-world.js) no pinta nada si no hay secciones.
   Familias previstas, en este orden (una escena por familia, ver MENAJE-PLAN.md, secciones 3 y 10):
     1. Vajilla
     2. Cubertería
     3. Cristalería
     4. Mantelería y textil
     5. Menaje auxiliar de cocina y sala
   Reglas: sin marcas, precios, plazos, mínimos ni cifras no confirmados ([POR CONFIRMAR], ver MENAJE-PENDIENTES.md).
   Cada producto necesita image, width, height y alt; las imágenes van en assets/menaje/ con licencia comprobada
   y anotadas en assets/credits.json. Una variante de «lineup» sin imagen se muestra como «Imagen pendiente».
   Cada familia usa «lineup» con `cta` (opción del motor añadida en product-world.js): la lista da 3 ideas útiles y el enlace lleva a consulta.
   Sin foto todavía: el hueco aparece como «Imagen pendiente». Al tener foto, añadir `product:{image,width,height,alt}` a la escena. */
const D = 'assets/menaje/';
const CONTACTO = 'index.html#contacto';
window.ProductWorld.init({
  mount: '#familias',
  sections: [
    {
      template: 'lineup', family: 'Vajilla', color: '#eceff0', ink: '#1c2830',
      eyebrow: 'Mesa de tu local', title: 'Vajilla para restaurantes.',
      variants: [
        {name:'Piensa en tu carta', description:'Un menú del día, unas tapas o una carta de platos piden piezas distintas. Dinos qué sirves y te asesoramos.'},
        {name:'Platos, bols y tazas', description:'Piezas para el servicio de cada día en bares, restaurantes y hoteles.'},
        {name:'En el mismo pedido', description:'Añade la vajilla al reparto que ya recibes, sin otro proveedor ni otra entrega.'}
      ],
      cta: {label: 'Consultar vajilla', href: CONTACTO}
    },
    {
      template: 'lineup', family: 'Cubertería', color: '#e1e8ec', ink: '#1c2830',
      eyebrow: 'Servicio de sala', title: 'Cubertería para hostelería.',
      variants: [
        {name:'Para cada servicio', description:'Tenedores, cuchillos y cucharas para el servicio de sala, según el tipo de local.'},
        {name:'Postre y café', description:'Cucharillas y cubiertos de postre para completar el servicio.'},
        {name:'Cuántos necesitas', description:'Dinos tu aforo y el tipo de servicio y te asesoramos sobre cuántos juegos pedir.'}
      ],
      cta: {label: 'Consultar cubertería', href: CONTACTO}
    },
    {
      template: 'lineup', family: 'Cristalería', color: '#f1ebe4', ink: '#1c2830',
      eyebrow: 'Barra y sala', title: 'Cristalería para hostelería.',
      variants: [
        {name:'Vasos y copas', description:'Para cada bebida de tu carta, en la barra y en la sala.'},
        {name:'Según lo que sirves', description:'Agua, vino, cerveza o refrescos piden vasos y copas distintos. Cuéntanos tu carta.'},
        {name:'Tu local, tu pedido', description:'Dinos cuántas mesas tienes y qué bebidas sirves, y te asesoramos.'}
      ],
      cta: {label: 'Consultar cristalería', href: CONTACTO}
    },
    {
      template: 'lineup', family: 'Mantelería y textil', color: '#dbe3e8', ink: '#1c2830',
      eyebrow: 'Mesa vestida', title: 'Mantelería para hostelería.',
      variants: [
        {name:'Manteles y servilletas', description:'Para vestir las mesas de tu local en el servicio de cada día.'},
        {name:'Textil de sala', description:'Consúltanos qué textil necesita tu sala y lo revisamos contigo.'},
        {name:'Medidas y ambiente', description:'Dinos qué medidas de mesa usas y qué ambiente buscas en tu local.'}
      ],
      cta: {label: 'Consultar mantelería', href: CONTACTO}
    },
    {
      template: 'lineup', family: 'Menaje auxiliar de cocina y sala', color: '#e9e6e0', ink: '#1c2830',
      eyebrow: 'Lo que completa el servicio', title: 'Menaje auxiliar de cocina y sala.',
      variants: [
        {name:'Cocina y sala', description:'Lo que no es vajilla ni cristalería, pero tu servicio necesita cada día.'},
        {name:'Cuéntanos qué te falta', description:'Dinos qué echas en falta en la cocina o en la sala y lo consultamos.'},
        {name:'Un solo reparto', description:'Pídelo junto con el resto de tu pedido, desde Medina del Campo y hasta 90 km.'}
      ],
      cta: {label: 'Consultar menaje auxiliar', href: CONTACTO}
    }
  ]
});
