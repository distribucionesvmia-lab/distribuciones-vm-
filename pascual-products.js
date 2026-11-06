/* Sustituye image, width, height y alt al recibir fotografías originales. */
window.ProductWorld.init({
  mount: '#familias',
  order: ['Leche','Bebidas Pascual','Vivesoy','Bifrutas','Yogikids','Yogures','Postres','Natillas'],
  sections: [
    {
      template: 'hero', family: 'Leche Pascual', color: '#efe3d6', ink: '#3a2418',
      eyebrow: 'Pascual Profesional', title: 'Classic. Para la barra y el café.',
      description: 'Leche semidesnatada Classic, más ajustada en precio e ideal para la barra y el café. Leche de Bienestar Animal para hostelería, de sabor suave y con la cremosidad de la leche. Tiene las mismas cualidades de emulsión que la variedad entera por su contenido en proteína.',
      backword: 'CLASSIC', bottom: '01 — Leche semidesnatada · más ajustada en precio',
      product: {name:'Leche Pascual Classic semidesnatada · caja de 10 L', image:'assets/pascual/classic-10l.webp', width:333, height:434, alt:'Caja de 10 litros de leche Pascual Profesional Classic, ideal para café'}
    },
    {
      template: 'editorial', family: 'Leche Classic', color: '#f1e6da', ink: '#3a2418',
      eyebrow: 'Nuevo formato para hostelería', title: 'Bag in box de 10 litros.',
      description: 'Leche Classic en caja de 10 litros, para llenar el enfriador de leche con una sola acción.',
      products: [
        {name:'Bag in box · 10 L', description:'La caja de 10 L de Leche Classic junto al enfriador de leche, la taza y la jarra Classic.', image:'assets/pascual/classic-bag-in-box.webp', width:1400, height:787, cover:true, alt:'Nuevo formato para hostelería: caja bag in box de Leche Classic de 10 L, enfriador de leche, taza y jarra roja'},
        {name:'Enfriador de leche', description:'Con una sola acción llenas tu enfriador con 10 L de nuestra mejor leche.', image:'assets/pascual/classic-enfriador.webp', width:275, height:275, cover:true, alt:'Enfriador de leche Pascual'}
      ]
    },
    {
      template: 'hero', family: 'Leche Classic', color: '#f1e6da', ink: '#3a2418',
      eyebrow: 'Botella de 1,5 litros', title: 'Classic, también en botella.',
      description: 'Leche Classic semidesnatada en botella de 1,5 litros, con un precio más ajustado e ideal para la cafetería.',
      backword: 'CLASSIC', bottom: 'Leche Classic · 1,5 L · precio más ajustado, ideal para la cafetería',
      product: {name:'Leche Pascual Classic · 1,5 L', image:'assets/pascual/classic-botella-1-5l.webp', width:168, height:512, alt:'Botella de Leche Pascual Profesional Classic de 1,5 litros'}
    },
    {
      template: 'story', family: 'Leche Classic', color: '#3a2418', ink: '#f5ead9', dark: true,
      eyebrow: 'Ventajas del formato', title: 'Por qué el bag in box.',
      frames: [
        {name:'Menos residuos, más sostenible', description:'Los números no engañan: 49 % menos de residuos y 7 % menos de CO2 por litro movido (vs. botella de 1,5 L).', image:'assets/pascual/ventaja-residuos.webp', width:270, height:270, alt:'Icono de reciclaje', color:'#3a2418'},
        {name:'Mayor rentabilidad', description:'Mejor precio, como la emulsión de la leche es mejor, tu rentabilidad puede aumentar hasta un 33 % (comprobado por nuestros maestros baristas).', image:'assets/pascual/ventaja-rentabilidad.webp', width:213, height:237, alt:'Icono del euro', color:'#4a2e20'},
        {name:'Almacenamiento más eficiente', description:'Hemos pensado que una forma cúbica sería la mejor y más óptima manera de poder almacenar nuestra leche.', image:'assets/pascual/ventaja-almacenamiento.webp', width:273, height:273, alt:'Icono de estantería con cajas', color:'#3a2418'},
        {name:'Mayor rapidez en la operación', description:'Ya no tendrás que ir abriendo mil botellas una a una: a partir de ahora, con una sola acción llenarás tu enfriador con 10 L de nuestra mejor leche.', image:'assets/pascual/ventaja-rapidez.webp', width:291, height:291, alt:'Icono de reloj', color:'#4a2e20'}
      ]
    },
    {
      template: 'range', family: 'Vivesoy Barista', color: '#e9eacb', ink: '#214b32',
      eyebrow: 'Tres variedades, una misma barra', title: 'Vegetal, en movimiento.',
      description: 'Tres bebidas vegetales Vivesoy Barista para descubrir en la barra.',
      products: [
        {name:'Barista Soja', description:'Bebida de soja Vivesoy Barista.', image:'assets/pascual/vivesoy-barista-soja.webp', width:154, height:428, alt:'Envase original Vivesoy Barista Soja de 1 litro'},
        {name:'Barista Avena', description:'Bebida de avena Vivesoy Barista.', image:'assets/pascual/vivesoy-barista-avena.webp', width:154, height:428, alt:'Envase original Vivesoy Barista Avena de 1 litro'},
        {name:'Barista Almendras', description:'Bebida de almendras sin azúcar Vivesoy Barista.', image:'assets/pascual/vivesoy-barista-almendras.webp', width:151, height:422, alt:'Envase original Vivesoy Barista Almendras sin azúcar de 1 litro'}
      ]
    },
    {
      template: 'lineup', family: 'Bifrutas', color: '#ffd9b0', ink: '#6b2f0e',
      eyebrow: 'Sabor Original', title: 'Bifrutas, en cuatro sabores.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Tropical · 330 ml', description:'Bifrutas Sabor Original Tropical, con vitaminas A, C y E, en brik de 330 ml.', image:'assets/pascual/bifrutas-tropical-330ml.webp', width:216, height:508, alt:'Brik de Bifrutas Sabor Original Tropical de 330 ml'},
        {name:'Tropical · 200 ml', description:'Bifrutas Sabor Original Tropical, con vitaminas A, C y E, en brik de 200 ml.', image:'assets/pascual/bifrutas-tropical-200ml.webp', width:206, height:400, alt:'Brik pequeño de Bifrutas Sabor Original Tropical de 200 ml'},
        {name:'Tropical · 1 L', description:'Bifrutas Sabor Original Tropical, con vitaminas A, C y E, en brik de 1 litro.', image:'assets/pascual/bifrutas-tropical-brik-grande.webp', width:188, height:500, alt:'Brik de 1 litro de Bifrutas Sabor Original Tropical'},
        {name:'Paraíso · 330 ml', description:'Bifrutas Sabor Original Paraíso, con vitaminas A, C y E, en brik de 330 ml.', image:'assets/pascual/bifrutas-paraiso-330ml.webp', width:213, height:502, alt:'Brik de Bifrutas Sabor Original Paraíso de 330 ml'},
        {name:'Pacífico · 330 ml', description:'Bifrutas Sabor Original Pacífico, con vitaminas A, C y E, en brik de 330 ml.', image:'assets/pascual/bifrutas-pacifico-330ml.webp', width:215, height:510, alt:'Brik de Bifrutas Sabor Original Pacífico de 330 ml'},
        {name:'Mediterráneo · 330 ml', description:'Bifrutas Sabor Original Mediterráneo, con vitaminas A, C y E, en brik de 330 ml.', image:'assets/pascual/bifrutas-mediterraneo-330ml.webp', width:215, height:509, alt:'Brik de Bifrutas Sabor Original Mediterráneo de 330 ml'}
      ]
    },
    {
      template: 'editorial', family: 'Bebidas Pascual', color: '#ffedda', ink: '#512f1c',
      eyebrow: 'Una selección para cada momento', title: 'Color en la carta.',
      description: 'Batidos y zumos Essential de Pascual en un recorrido lleno de color.',
      products: [
        {name:'Batidos Pascual', description:'Vainilla, chocolate y fresa junto a ColaCao.', image:'assets/pascual/batidos.webp', width:430, height:385, alt:'Botellas originales de batidos Pascual y ColaCao'},
        {name:'Zumos Essential', description:'Una selección de botellas Pascual Essential.', image:'assets/pascual/essential.webp', width:680, height:480, alt:'Botellas originales de zumo Pascual Essential'}
      ]
    },
    {
      template: 'lineup', family: 'Yogikids', color: '#d9ecf7', ink: '#17405e',
      eyebrow: 'Para los más pequeños', title: 'Yogikids, en formato individual.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Yogikids de fresa · 80 g', description:'Yogur Pascual en formato individual de 80 g y sabor fresa.', image:'assets/pascual/yogikids-fresa.webp', width:336, height:545, alt:'Envase individual Yogikids de Pascual, sabor fresa'},
        {name:'Yogikids de fresa y plátano · 80 g', description:'Yogur Pascual en formato individual de 80 g, con sabor a fresa y plátano.', image:'assets/pascual/yogikids-pack-fresa-platano.webp', width:248, height:203, alt:'Pack de cuatro Yogikids de fresa y plátano de Pascual'}
      ]
    },
    {
      template: 'lineup', family: 'Yogures Pascual', color: '#fbe8e6', ink: '#7a1218',
      eyebrow: 'Pack de 4 × 120 g', title: 'Un yogur para cada sabor.',
      note: 'Packs de 4 unidades · una imagen por variedad',
      variants: [
        {name:'Yogur de fresa', description:'Yogur Pascual de fresa en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-fresa.webp', width:248, height:202, alt:'Pack de cuatro yogur de fresa de Pascual'},
        {name:'Yogur de limón', description:'Yogur Pascual con sabor a limón en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-limon.webp', width:249, height:204, alt:'Pack de cuatro yogur de limón de Pascual'},
        {name:'Yogur de plátano', description:'Yogur Pascual con sabor a plátano en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-platano.webp', width:248, height:202, alt:'Pack de cuatro yogur de plátano de Pascual'},
        {name:'Yogur de macedonia', description:'Yogur Pascual con sabor a macedonia en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-macedonia.webp', width:248, height:202, alt:'Pack de cuatro yogur de macedonia de Pascual'},
        {name:'Yogur de coco', description:'Yogur Pascual con sabor a coco en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-coco.webp', width:248, height:202, alt:'Pack de cuatro yogur de coco de Pascual'},
        {name:'Yogur de fresa y plátano', description:'Yogur Pascual con sabor a fresa y plátano en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-fresa-platano.webp', width:247, height:202, alt:'Pack de cuatro yogur de fresa y plátano de Pascual'},
        {name:'Yogur natural', description:'Yogur Pascual de sabor natural en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-natural.webp', width:248, height:203, alt:'Pack de cuatro yogur natural de Pascual'},
        {name:'Yogur natural azucarado', description:'Yogur Pascual natural con azúcar en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-natural-azucarado.webp', width:247, height:202, alt:'Pack de cuatro yogur natural azucarado de Pascual'},
        {name:'Yogur de arándanos', description:'Yogur Pascual con sabor a arándanos en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-arandanos.webp', width:248, height:202, alt:'Pack de cuatro yogur de arándanos de Pascual'},
        {name:'Yogur de vainilla', description:'Yogur Pascual con sabor a vainilla en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-vainilla.webp', width:248, height:202, alt:'Pack de cuatro yogur de vainilla de Pascual'},
        {name:'Yogur desnatado con fresa', description:'Yogur Pascual desnatado con sabor a fresa en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-desnatado-fresa.webp', width:295, height:241, alt:'Pack de cuatro yogur desnatado con fresa de Pascual'},
        {name:'Yogur desnatado con macedonia', description:'Yogur Pascual desnatado con sabor a macedonia en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-desnatado-macedonia.webp', width:295, height:242, alt:'Pack de cuatro yogur desnatado con macedonia de Pascual'},
        {name:'Yogur griego natural azucarado', description:'Yogur Pascual estilo griego, de sabor natural azucarado, en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-griego-natural-azucarado.webp', width:248, height:202, alt:'Pack de cuatro yogur griego natural azucarado de Pascual'}
      ]
    },
    {
      template: 'hero', family: 'Postres Pascual', color: '#fff0c4', ink: '#59330f',
      eyebrow: 'Flan de huevo', title: 'El postre de siempre.',
      description: 'Postre Pascual de flan de huevo, presentado en cuatro unidades individuales.',
      backword: 'FLAN', bottom: 'Pack de 4 × 100 g',
      product: {name:'Flan de huevo · pack de 4 × 100 g', image:'assets/pascual/flan-huevo.webp', width:391, height:533, alt:'Flan de huevo Pascual, imagen de la gama'}
    },
    {
      template: 'lineup', family: 'Natillas Pascual', color: '#ead9cb', ink: '#4a2a1b',
      eyebrow: 'Vaso individual de 120 g', title: 'Natillas, a cucharadas.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Natillas de vainilla · 120 g', description:'Natillas Pascual de vainilla en vaso individual.', image:'assets/pascual/natillas-vainilla.webp', width:699, height:616, alt:'Vaso de natillas de vainilla Pascual'},
        {name:'Natillas de chocolate · 120 g', description:'Natillas Pascual de chocolate en vaso individual.', image:'assets/pascual/natillas-chocolate.webp', width:700, height:615, alt:'Vaso de natillas de chocolate Pascual'}
      ]
    }
  ]
});
