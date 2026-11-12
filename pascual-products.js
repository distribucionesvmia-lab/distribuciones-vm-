/* Sustituye image, width, height y alt al recibir fotografías originales. */
window.ProductWorld.init({
  mount: '#familias',
  order: ['Leche','Batidos','Natas','Mantequillas','Bebidas Pascual','Vivesoy','Bifrutas','Yogikids','Yogures','Postres','Natillas'],
  sections: [
    {
      template: 'hero', id: 'leche-intense', family: 'Leche Intense', color: '#e8e0d6', ink: '#2b2a3a',
      eyebrow: 'Pascual Profesional · Botella de 1,5 litros', title: 'Intense. Sabor intenso, para hostelería.',
      description: 'Leche Intense en botella de 1,5 litros. Pascual Profesional la presenta con «sabor intenso» y «la mejor relación calidad/precio», para hostelería.',
      backword: 'INTENSE', bottom: '01 — Leche Intense · 1,5 L · para hostelería',
      product: {name:'Leche Pascual Intense · 1,5 L', image:'assets/pascual/intense-cutout.webp', width:240, height:688, alt:'Botella de Leche Pascual Profesional Intense de 1,5 litros'}
    },
    {
      template: 'hero', id: 'leche-classic-10l', family: 'Leche Pascual', color: '#efe3d6', ink: '#3a2418',
      eyebrow: 'Pascual Profesional', title: 'Classic. Para la barra y el café.',
      description: 'Leche semidesnatada Classic, más ajustada en precio e ideal para la barra y el café. Leche de Bienestar Animal para hostelería, de sabor suave y con la cremosidad de la leche. Tiene las mismas cualidades de emulsión que la variedad entera por su contenido en proteína.',
      backword: 'CLASSIC', bottom: '02 — Leche Classic semidesnatada · caja de 10 L para tu enfriador',
      product: {name:'Leche Pascual Classic semidesnatada · caja de 10 L', image:'assets/pascual/classic-10l.webp', width:333, height:434, alt:'Caja de 10 litros de leche Pascual Profesional Classic, ideal para café'}
    },
    {
      template: 'editorial', id: 'bag-in-box-10l', family: 'Leche Classic', color: '#f1e6da', ink: '#3a2418',
      eyebrow: 'Nuevo formato para hostelería', title: 'Bag in box de 10 litros.',
      description: 'Leche Classic en caja de 10 litros, para llenar el enfriador de leche con una sola acción.',
      products: [
        {name:'Bag in box · 10 L', description:'La caja de 10 L de Leche Classic junto al enfriador de leche, la taza y la jarra Classic.', image:'assets/pascual/classic-bag-in-box.webp', width:1400, height:787, cover:true, alt:'Nuevo formato para hostelería: caja bag in box de Leche Classic de 10 L, enfriador de leche, taza y jarra roja'},
        {name:'Enfriador de leche', description:'Con una sola acción llenas tu enfriador con 10 L de nuestra mejor leche.', image:'assets/pascual/classic-enfriador.webp', width:640, height:640, cover:true, alt:'Enfriador de leche Pascual'}
      ]
    },
    {
      template: 'story', id: 'ventajas-bag-in-box', family: 'Leche Classic', color: '#3a2418', ink: '#f5ead9', dark: true,
      eyebrow: 'Ventajas del formato · según Pascual Profesional', title: 'Por qué el bag in box.',
      frames: [
        {name:'Menos residuos, más sostenible', description:'Los números no engañan: 49 % menos de residuos y 7 % menos de CO2 por litro movido (vs. botella de 1,5 L).', image:'assets/pascual/ventaja-residuos.webp', width:270, height:270, alt:'Icono de reciclaje', color:'#3a2418'},
        {name:'Mayor rentabilidad', description:'Mejor precio, como la emulsión de la leche es mejor, tu rentabilidad puede aumentar hasta un 33 % (comprobado por nuestros maestros baristas).', image:'assets/pascual/ventaja-rentabilidad.webp', width:213, height:237, alt:'Icono del euro', color:'#4a2e20'},
        {name:'Almacenamiento más eficiente', description:'Hemos pensado que una forma cúbica sería la mejor y más óptima manera de poder almacenar nuestra leche.', image:'assets/pascual/ventaja-almacenamiento.webp', width:273, height:273, alt:'Icono de estantería con cajas', color:'#3a2418'},
        {name:'Mayor rapidez en la operación', description:'Ya no tendrás que ir abriendo mil botellas una a una: a partir de ahora, con una sola acción llenarás tu enfriador con 10 L de nuestra mejor leche.', image:'assets/pascual/ventaja-rapidez.webp', width:291, height:291, alt:'Icono de reloj', color:'#4a2e20'}
      ]
    },
    {
      template: 'hero', id: 'leche-classic-botella', family: 'Leche Classic', color: '#f1e6da', ink: '#3a2418',
      eyebrow: 'Botella de 1,5 litros', title: 'Classic, también en botella.',
      description: 'Leche Classic semidesnatada en botella de 1,5 litros, con un precio más ajustado. Pensada para hostelería.',
      backword: 'CLASSIC', bottom: 'Leche Classic · 1,5 L · semidesnatada · precio más ajustado',
      product: {name:'Leche Pascual Classic · 1,5 L', image:'assets/pascual/classic-botella-1-5l.webp', width:168, height:512, alt:'Botella de Leche Pascual Profesional Classic de 1,5 litros'}
    },
    {
      template: 'hero', id: 'leche-extra-creme', family: 'Leche Extra Crème', color: '#efe3d6', ink: '#2e1c14',
      eyebrow: 'Pascual Profesional · Botella de 1,5 litros', title: 'Extra Crème. «La mejor leche para el mejor café.»',
      description: 'Leche Extra Crème en botella de 1,5 litros, especial hostelería. Lleva más proteína láctea, y por eso emulsiona mejor.',
      backword: 'EXTRA', bottom: 'Leche Extra Crème · 1,5 L · más proteína láctea · especial hostelería',
      product: {name:'Leche Pascual Extra Crème · 1,5 L', image:'assets/pascual/extra-creme-botella-1-5l.webp', width:130, height:416, alt:'Botella de Leche Pascual Profesional Extra Crème de 1,5 litros'}
    },
    {
      template: 'lineup', id: 'leche-hogar', family: 'Leche Alimentación', color: '#e4ecf6', ink: '#12305a',
      eyebrow: 'Botella de 1,5 litros · para el hogar', title: 'Leche Pascual para el hogar.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Leche entera · botella de 1,5 L', description:'Leche entera Pascual en botella de 1,5 litros, para el consumo en el hogar.', image:'assets/pascual/hogar-botella-entera.webp', width:249, height:786, alt:'Botella de leche entera Pascual de 1,5 litros'},
        {name:'Leche semidesnatada · botella de 1,5 L', description:'Leche semidesnatada Pascual en botella de 1,5 litros, para el consumo en el hogar.', image:'assets/pascual/hogar-botella-semidesnatada.webp', width:249, height:787, alt:'Botella de leche semidesnatada Pascual de 1,5 litros'},
        {name:'Leche desnatada · botella de 1,5 L', description:'Leche desnatada Pascual en botella de 1,5 litros, para el consumo en el hogar.', image:'assets/pascual/hogar-botella-desnatada.webp', width:249, height:787, alt:'Botella de leche desnatada Pascual de 1,5 litros'}
      ]
    },
    {
      template: 'lineup', id: 'leche-brik', family: 'Leche en brik', color: '#dde8f5', ink: '#12305a',
      eyebrow: 'Brik · alimentación y hogar', title: 'Leche en brik, para el día a día.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Leche entera · brik de 1 L', description:'Leche entera Pascual en brik de 1 litro, para el hogar.', image:'assets/pascual/brik-entera-1l.webp', width:188, height:513, alt:'Brik de leche entera Pascual de 1 litro'},
        {name:'Leche semidesnatada · brik de 1 L', description:'Leche semidesnatada Pascual en brik de 1 litro, para el hogar.', image:'assets/pascual/brik-semidesnatada-1l.webp', width:181, height:510, alt:'Brik de leche semidesnatada Pascual de 1 litro'},
        {name:'Leche desnatada · brik de 1 L', description:'Leche desnatada Pascual en brik de 1 litro, para el hogar.', image:'assets/pascual/brik-desnatada-1l.webp', width:186, height:506, alt:'Brik de leche desnatada Pascual de 1 litro'},
        {name:'Leche entera · brik de 200 ml', description:'Formato pequeño de 200 ml, pensado para los niños.', image:'assets/pascual/brik-entera-200ml-ninos.webp', width:226, height:447, alt:'Brik de leche entera Pascual de 200 ml, formato para niños'}
      ]
    },
    {
      template: 'hero', id: 'sin-lactosa-barista', family: 'Leche Sin Lactosa Barista', color: '#efe5d8', ink: '#2f3a2a',
      eyebrow: 'Pascual Profesional · Sin lactosa', title: 'Sin lactosa Barista. Para tu barra.',
      description: 'Leche sin lactosa semidesnatada Barista, para hostelería. Emulsiona mejor en el vaporizador de la cafetera que la leche sin lactosa normal.',
      backword: 'BARISTA', bottom: 'Leche sin lactosa Barista · semidesnatada · para cafeterías y bares',
      product: {name:'Leche Pascual Profesional Sin Lactosa Barista · semidesnatada', image:'assets/pascual/sinlactosa-barista.webp', width:100, height:256, alt:'Brik de leche Pascual Profesional Sin Lactosa Barista, semidesnatada'}
    },
    {
      template: 'lineup', id: 'sin-lactosa', family: 'Leche Sin Lactosa', color: '#ebe2f1', ink: '#44245e',
      eyebrow: 'Brik · sin lactosa para el hogar', title: 'Leche sin lactosa, en brik.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Sin lactosa entera · brik de 1 L', description:'Leche entera sin lactosa Pascual en brik de 1 litro, para el hogar.', image:'assets/pascual/sinlactosa-entera-1l.webp', width:180, height:507, alt:'Brik de leche entera sin lactosa Pascual de 1 litro'},
        {name:'Sin lactosa semidesnatada · brik de 1 L', description:'Leche semidesnatada sin lactosa Pascual en brik de 1 litro, para el hogar.', image:'assets/pascual/sinlactosa-semidesnatada-1l.webp', width:190, height:506, alt:'Brik de leche semidesnatada sin lactosa Pascual de 1 litro'},
        {name:'Sin lactosa desnatada · brik de 1 L', description:'Leche desnatada sin lactosa Pascual en brik de 1 litro, para el hogar.', image:'assets/pascual/sinlactosa-desnatada-1l.webp', width:184, height:506, alt:'Brik de leche desnatada sin lactosa Pascual de 1 litro'},
        {name:'Sin lactosa semidesnatada · brik de 200 ml', description:'Formato pequeño de 200 ml de leche semidesnatada sin lactosa.', image:'assets/pascual/sinlactosa-semidesnatada-200ml.webp', width:255, height:502, alt:'Brik de leche semidesnatada sin lactosa Pascual de 200 ml'}
      ]
    },
    {
      template: 'lineup', id: 'movit', family: 'Leche Movit', color: '#f3dfe6', ink: '#6b1e3d',
      eyebrow: 'Con calcio · consumo en el hogar', title: 'Movit. «Mucho más que una leche con calcio.»',
      note: 'Según la marca, nutrientes para la movilidad integral. Es leche de alimentación o desayuno, no de barra. Una imagen por variedad',
      variants: [
        {name:'Movit semidesnatada · brik de 1 L', description:'Leche semidesnatada Movit con calcio, para el consumo en el hogar.', image:'assets/pascual/movit-semidesnatada.webp', width:177, height:504, alt:'Brik de leche Movit semidesnatada con calcio de 1 litro'},
        {name:'Movit desnatada · brik de 1 L', description:'Leche desnatada Movit con calcio, para el consumo en el hogar.', image:'assets/pascual/movit-desnatada.webp', width:183, height:505, alt:'Brik de leche Movit desnatada con calcio de 1 litro'}
      ]
    },
    {
      template: 'lineup', id: 'batidos-vidrio', family: 'Batidos Pascual', color: '#fbd9e4', ink: '#7a1d3c',
      eyebrow: 'Batidos para hostelería · vidrio', title: 'Batidos Pascual, un formato único para el canal Horeca.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Batido de vainilla · vidrio de 200 ml', description:'Batido Pascual Intense de vainilla en botella de vidrio, para hostelería.', image:'assets/pascual/batido-vidrio-vainilla.webp', width:211, height:729, alt:'Botella de vidrio de batido Pascual Intense de vainilla'},
        {name:'Batido de chocolate · vidrio de 200 ml', description:'Batido Pascual Intense de chocolate en botella de vidrio. Con la fórmula mejorada, elaborado con leche semidesnatada: textura más cremosa y sabor más intenso.', image:'assets/pascual/batido-vidrio-chocolate.webp', width:211, height:729, alt:'Botella de vidrio de batido Pascual Intense de chocolate'},
        {name:'Batido de fresa · vidrio de 200 ml', description:'Batido Pascual Intense de fresa en botella de vidrio, para hostelería.', image:'assets/pascual/batido-vidrio-fresa.webp', width:212, height:730, alt:'Botella de vidrio de batido Pascual Intense de fresa'},
        {name:'ColaCao · vidrio de 195 cc', description:'Batido ColaCao en botella de vidrio, para hostelería. La marca lo resume en «Eso tan tuyo».', image:'assets/pascual/batido-vidrio-colacao.webp', width:221, height:730, alt:'Botella de vidrio de batido ColaCao'}
      ]
    },
    {
      template: 'lineup', id: 'batidos-brik', family: 'Batidos en brik', color: '#f6e4d8', ink: '#5a2e1b',
      eyebrow: 'Brik de 200 ml · alimentación', title: 'Batidos en brik, para llevar.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Batido de chocolate · brik de 200 ml', description:'Batido Pascual de chocolate en brik de 200 ml.', image:'assets/pascual/batido-brik-chocolate-200ml.webp', width:225, height:440, alt:'Brik de batido Pascual de chocolate de 200 ml'}
      ]
    },
    {
      template: 'lineup', id: 'natas', family: 'Natas Pascual', color: '#e6eef7', ink: '#17305a',
      eyebrow: 'Para cocinar y para montar', title: 'Natas, para cocinar y para montar.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Nata para cocinar · 200 ml', description:'Nata Pascual para cocinar, con un 18 % de materia grasa, en formato de 200 ml.', image:'assets/pascual/nata-cocinar-200ml.webp', width:173, height:338, alt:'Brik de nata Pascual para cocinar de 200 ml'},
        {name:'Nata para cocinar · 500 ml', description:'Nata Pascual para cocinar, con un 18 % de materia grasa, en formato de 500 ml.', image:'assets/pascual/nata-cocinar-500ml.webp', width:198, height:328, alt:'Brik de nata Pascual para cocinar de 500 ml'},
        {name:'Nata para cocinar · 1 L', description:'Nata Pascual para cocinar, con un 18 % de materia grasa, en formato de 1 litro.', image:'assets/pascual/nata-cocinar-1l.webp', width:175, height:503, alt:'Brik de nata Pascual para cocinar de 1 litro'},
        {name:'Nata para montar · 500 ml', description:'Nata Pascual para montar, con un 35 % de materia grasa, en formato de 500 ml.', image:'assets/pascual/nata-montar-500ml.webp', width:198, height:328, alt:'Brik de nata Pascual para montar de 500 ml'},
        {name:'Nata para montar · 1 L', description:'Nata Pascual para montar, con un 35 % de materia grasa, en formato de 1 litro.', image:'assets/pascual/nata-montar-1l.webp', width:173, height:504, alt:'Brik de nata Pascual para montar de 1 litro'},
        {name:'Nata montada · spray', description:'Nata montada azucarada Pascual en spray, lista para usar.', image:'assets/pascual/nata-montada-spray.webp', width:123, height:496, alt:'Spray de nata montada azucarada Pascual'}
      ]
    },
    {
      template: 'lineup', id: 'mantequillas', family: 'Mantequillas Pascual', color: '#f7ecc4', ink: '#5a4310',
      eyebrow: 'Pastilla y tarrina', title: 'Mantequilla, en pastilla y en tarrina.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Mantequilla en pastilla · 250 g', description:'Mantequilla Pascual en pastilla de 250 g.', image:'assets/pascual/mantequilla-pastilla-250g.webp', width:232, height:131, alt:'Pastilla de mantequilla Pascual de 250 g'},
        {name:'Mantequilla en pastilla · 500 g', description:'Mantequilla Pascual en pastilla de 500 g.', image:'assets/pascual/mantequilla-pastilla-500g.webp', width:237, height:153, alt:'Pastilla de mantequilla Pascual de 500 g'},
        {name:'Mantequilla en tarrina · con sal', description:'Mantequilla Pascual en tarrina, con sal.', image:'assets/pascual/mantequilla-tarrina-con-sal.webp', width:234, height:127, alt:'Tarrina de mantequilla Pascual con sal'},
        {name:'Mantequilla en tarrina · sin sal', description:'Mantequilla Pascual en tarrina, sin sal.', image:'assets/pascual/mantequilla-tarrina-sin-sal.webp', width:235, height:127, alt:'Tarrina de mantequilla Pascual sin sal'}
      ]
    },
    {
      template: 'range', id: 'vivesoy', family: 'Vivesoy Barista', color: '#e9eacb', ink: '#214b32',
      eyebrow: 'Tres variedades, una misma barra', title: 'Vivesoy Barista. «Más cerca. Sabe mejor.»',
      description: 'Como dice Vivesoy: «Más cerca. Sabe mejor.» Tres bebidas 100 % de cultivo en España, pensadas para el café: soja, avena y almendras.',
      products: [
        {name:'Barista Soja', description:'Bebida de soja Vivesoy Barista.', image:'assets/pascual/vivesoy-barista-soja.webp', width:154, height:428, alt:'Envase original Vivesoy Barista Soja de 1 litro'},
        {name:'Barista Avena', description:'Bebida de avena Vivesoy Barista.', image:'assets/pascual/vivesoy-barista-avena.webp', width:154, height:428, alt:'Envase original Vivesoy Barista Avena de 1 litro'},
        {name:'Barista Almendras', description:'Bebida de almendras sin azúcar Vivesoy Barista.', image:'assets/pascual/vivesoy-barista-almendras.webp', width:151, height:422, alt:'Envase original Vivesoy Barista Almendras sin azúcar de 1 litro'}
      ]
    },
    {
      template: 'lineup', id: 'bifrutas', family: 'Bifrutas', color: '#ffd9b0', ink: '#6b2f0e',
      eyebrow: 'Sabor Original', title: 'Bifrutas. «El de siempre.»',
      note: 'Como dice Bifrutas: «mezclando lo mejor de la fruta y lo mejor de la leche», en Tropical, Paraíso, Pacífico y Mediterráneo. Una imagen por variedad',
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
      template: 'editorial', id: 'zumos', family: 'Bebidas Pascual', color: '#ffedda', ink: '#512f1c',
      eyebrow: 'Una selección para cada momento', title: 'Essential. Zumos para el bar de siempre.',
      description: 'Zumos Pascual Essential, «sin azúcar añadido», pensados —en palabras de la marca— para «cuando bajas a desayunar a tu bar de siempre», en formatos de hostelería (vidrio y bag in box). Sabores: [POR CONFIRMAR].',
      products: [
        {name:'Zumos Essential', description:'Una selección de botellas Pascual Essential.', image:'assets/pascual/essential.webp', width:680, height:480, alt:'Botellas originales de zumo Pascual Essential'}
      ]
    },
    {
      template: 'lineup', id: 'yogures', family: 'Yogures Pascual', color: '#fbe8e6', ink: '#7a1218',
      eyebrow: 'Packs de 4 × 120 g y Yogikids de 80 g', title: 'Un yogur para cada sabor.',
      note: 'Sobre Yogikids, la ficha de Pascual dice: «La merienda, si es con yogur + fruta mejor.» Una imagen por variedad',
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
        {name:'Yogur griego natural azucarado', description:'Yogur Pascual estilo griego, de sabor natural azucarado, en pack de cuatro unidades.', image:'assets/pascual/yogur-pack-griego-natural-azucarado.webp', width:248, height:202, alt:'Pack de cuatro yogur griego natural azucarado de Pascual'},
        {name:'Yogikids de fresa · 80 g', description:'Yogikids de fresa, formato individual de 80 g.', image:'assets/pascual/yogikids-fresa.webp', width:430, height:695, alt:'Envase individual Yogikids de Pascual, sabor fresa'},
        {name:'Yogikids de fresa y plátano · 80 g', description:'Yogikids de fresa y plátano, formato individual de 80 g.', image:'assets/pascual/yogikids-fresa-platano.webp', width:431, height:697, alt:'Envase individual Yogikids de Pascual, sabor fresa y plátano'}
      ]
    },
    {
      template: 'hero', id: 'flan', family: 'Postres Pascual', color: '#fff0c4', ink: '#59330f',
      eyebrow: 'Flan de huevo', title: 'El postre de siempre.',
      description: 'Postre Pascual de flan de huevo, presentado en cuatro unidades individuales.',
      backword: 'FLAN', bottom: 'Pack de 4 × 100 g',
      product: {name:'Flan de huevo · pack de 4 × 100 g', image:'assets/pascual/flan-huevo.webp', width:391, height:533, alt:'Flan de huevo Pascual, imagen de la gama'}
    },
    {
      template: 'lineup', id: 'natillas', family: 'Natillas Pascual', color: '#ead9cb', ink: '#4a2a1b',
      eyebrow: 'Vaso individual de 120 g', title: 'Natillas, a cucharadas.',
      note: 'Una imagen por variedad',
      variants: [
        {name:'Natillas de vainilla · 120 g', description:'Natillas Pascual de vainilla en vaso individual.', image:'assets/pascual/natillas-vainilla.webp', width:699, height:616, alt:'Vaso de natillas de vainilla Pascual'},
        {name:'Natillas de chocolate · 120 g', description:'Natillas Pascual de chocolate en vaso individual.', image:'assets/pascual/natillas-chocolate.webp', width:700, height:615, alt:'Vaso de natillas de chocolate Pascual'}
      ]
    }
  ]
});
