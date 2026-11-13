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
   Cada escena lleva su foto en `product:{name,image,width,height,alt,lazy:true}` (`lazy:true` carga la imagen diferida, opción del motor para la imagen única de «lineup»).
   Autoría y licencias de las fotos: assets/credits.json y pie de menaje.html. */
const D = 'assets/menaje/';
const CONTACTO = '#contacto';
window.ProductWorld.init({
  mount: '#familias',
  sections: [
    {
      template: 'lineup', family: 'Vajilla', color: '#eceff0', ink: '#1c2830',
      eyebrow: 'Mesa de tu local', title: 'Vajilla para el servicio de cada día.',
      product: {name:'Vajilla blanca de aspecto rústico: platos llanos, hondos y una fuente alargada sobre un camino de mesa marrón', image:D+'vajilla-mesa-servida.webp', width:1000, height:1381, lazy:true, alt:'Vista cenital de platos llanos, hondos y una fuente alargada de vajilla blanca de aspecto rústico sobre un camino de mesa marrón'},
      variants: [
        {name:'Piensa en tu carta', description:'Piezas para el menú del día, las tapas o la carta. Si abres o reformas, te asesoramos con las medidas y el estilo de tu sala.'},
        {name:'Platos, bols y tazas', description:'Piezas para el servicio de cada día en bares, restaurantes y hoteles.'},
        {name:'En el mismo pedido', description:'Añade la vajilla al reparto que ya recibes, sin otro proveedor ni otra entrega.'}
      ],
      cta: {label: 'Consultar vajilla', href: CONTACTO}
    },
    {
      template: 'lineup', family: 'Cubertería', color: '#e1e8ec', ink: '#1c2830',
      eyebrow: 'Servicio de sala', title: 'Cubertería que aguanta el trote de la sala.',
      product: {name:'Cajón con cuchillos, tenedores y cucharas de acero inoxidable', image:D+'cuberteria-cajon-cubiertos.webp', width:1100, height:733, lazy:true, alt:'Cajón con cuchillos, tenedores y cucharas de acero inoxidable'},
      variants: [
        {name:'Para cada servicio', description:'Colecciones de Comas y Jay —esta última, «sencilla, alternativa, moderna» en su línea Hotel—, en acero inoxidable para el servicio diario. Jay forma parte del grupo de Lacor desde 2024.'},
        {name:'Postre y café', description:'Cucharillas y cubiertos de postre para completar el servicio.'},
        {name:'Cuántos necesitas', description:'Dinos tu aforo y el tipo de servicio y te asesoramos sobre cuántos juegos pedir.'}
      ],
      cta: {label: 'Consultar cubertería', href: CONTACTO}
    },
    {
      template: 'lineup', family: 'Cristalería', color: '#f1ebe4', ink: '#1c2830',
      eyebrow: 'Barra y sala', title: 'Cristalería a prueba de cada servicio.',
      product: {name:'Copa de pie alto con una bebida y espuma sobre una barra, mientras un barman ralla especias encima', image:D+'cristaleria-copas-talladas.webp', width:1000, height:1381, lazy:true, alt:'Barman rallando especias sobre una copa de pie alto con una bebida ámbar y espuma en una barra'},
      variants: [
        {name:'Vasos y copas', description:'Copas y vasos de Arcoroc y Vicrila, pensados para barra y sala. Arcoroc lo llama «Everyday Proof»; Vicrila habla de durabilidad, diseño y eficiencia operativa.'},
        {name:'Según lo que sirves', description:'Agua, vino, cerveza o refrescos piden vasos y copas distintos. Cuéntanos tu carta.'},
        {name:'Tu local, tu pedido', description:'Dinos cuántas mesas tienes y qué bebidas sirves, y te asesoramos.'}
      ],
      cta: {label: 'Consultar cristalería', href: CONTACTO}
    },
    {
      template: 'lineup', family: 'Mantelería y textil', color: '#dbe3e8', ink: '#1c2830',
      eyebrow: 'Mesa vestida', title: 'Una mesa bien vestida, sin complicar el servicio.',
      product: {name:'Mesa redonda con mantel blanco y sillas de mimbre en un comedor luminoso', image:D+'manteleria-mesa-redonda.webp', width:1100, height:733, lazy:true, alt:'Mesa redonda con mantel blanco y sillas de mimbre en un comedor luminoso'},
      variants: [
        {name:'Manteles y servilletas', description:'Manteles y caminos Newtex: imagen tipo tela, resistentes y prácticos en servicios de mucho volumen.'},
        {name:'Textil de sala', description:'Consúltanos qué textil necesita tu sala y lo revisamos contigo.'},
        {name:'Medidas y ambiente', description:'Dinos qué medidas de mesa usas y qué ambiente buscas en tu local.'}
      ],
      cta: {label: 'Consultar mantelería', href: CONTACTO}
    },
    {
      template: 'lineup', family: 'Menaje auxiliar de cocina y sala', color: '#e9e6e0', ink: '#1c2830',
      eyebrow: 'Lo que completa el servicio', title: 'Lo que la cocina profesional necesita cada día.',
      product: {name:'Vajilla de aspecto artesanal turquesa con servilleta y cubiertos negros sobre una mesa de madera', image:D+'auxiliar-cocina-sartenes.webp', width:940, height:1412, lazy:true, alt:'Platos y cuenco de aspecto artesanal turquesa con vasos y cubiertos negros sobre una servilleta, en una mesa de madera'},
      variants: [
        {name:'Cocina y sala', description:'De Lacor, Araven, Arcos, Vaello o Java: baterías, herméticos gastronorm, cuchillería y paelleras. Pídelo con el resto del pedido.'},
        {name:'Cuéntanos qué te falta', description:'Dinos qué echas en falta en la cocina o en la sala y lo consultamos.'},
        {name:'Un solo reparto', description:'Pídelo junto con el resto de tu pedido, desde Medina del Campo y hasta 90 km.'}
      ],
      cta: {label: 'Consultar menaje auxiliar', href: CONTACTO}
    }
  ]
});
