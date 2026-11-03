/* Sustituye image, width, height y alt al recibir fotografías originales. Textos tomados del material aportado por el cliente. */
const D = 'assets/despensa/';
window.ProductWorld.init({
  mount: '#familias',
  order: ['Carbonell','Helios','Calvo','Villa Campo','Luengo','Prima','Borges','Carmencita','La Ballena'],
  sections: [
    {
      template: 'hero', family: 'Calvo', color: '#fff3c4', ink: '#1f5a3a',
      eyebrow: 'Edición limitada de Navidad', title: '85 años. En una lata.',
      description: 'Coincidiendo con el 85 aniversario de la compañía, Calvo lanza una Edición Limitada de Navidad que rinde homenaje a su historia, recuperando la esencia de aquella primera lata de conserva creada en Galicia.',
      backword: 'CALVO', bottom: '01 — Edición vintage',
      product: {name:'Lata Recetas Gourmet · Edición limitada', image:D+'calvo-lata-85.webp', width:287, height:723, alt:'Lata vintage de Calvo, edición limitada por el 85 aniversario'}
    },
    {
      template: 'editorial', family: 'Calvo', color: '#fbf6e8', ink: '#1f5a3a', columns: 3,
      eyebrow: 'La colección en la mesa', title: 'Conservas con receta.',
      description: 'Las referencias de la edición limitada, presentadas junto a platos pensados para cada una.',
      products: [
        {name:'Sardinillas con cebolla pochada', description:'Sardinillas en salsa con cebolla pochada.', image:D+'calvo-receta-sardinillas-cebolla.webp', width:482, height:361, cover:true, alt:'Lata Calvo de sardinillas en salsa con cebolla pochada junto a un plato servido'},
        {name:'Sardinillas con tomate seco', description:'Sardinillas en salsa con tomate seco.', image:D+'calvo-receta-sardinillas-tomate.webp', width:483, height:361, cover:true, alt:'Lata Calvo de sardinillas en salsa con tomate seco junto a un plato servido'},
        {name:'Mejillones al albariño', description:'Mejillones en salsa de vino albariño.', image:D+'calvo-receta-mejillones-albarino.webp', width:481, height:361, cover:true, alt:'Lata Calvo de mejillones en salsa de vino albariño junto a un plato servido'},
        {name:'Ventresca escabechada', description:'Ventresca de atún claro escabechada.', image:D+'calvo-receta-ventresca.webp', width:482, height:440, cover:true, alt:'Lata Calvo de ventresca de atún claro escabechada junto a un plato servido'},
        {name:'Mejillones en salsa gallega', description:'Mejillones en salsa gallega, listos para una mesa navideña.', image:D+'calvo-receta-mejillones-gallega.webp', width:483, height:440, cover:true, alt:'Latas Calvo de mejillones en salsa gallega y aperitivo servido'},
        {name:'La colección completa', description:'Latas de la edición limitada junto a la lata Recetas Gourmet.', image:D+'calvo-coleccion.webp', width:685, height:444, cover:true, alt:'Colección de latas Calvo de edición limitada sobre una mesa'}
      ]
    },
    {
      template: 'range', family: 'Calvo · Formatos', color: '#dce8f2', ink: '#143a5e',
      eyebrow: 'Del plato a la barra', title: 'Formatos para cocina profesional.',
      description: 'Bolsas y lata de gran formato de la gama Calvo y de las marcas Razo y Eureka.',
      products: [
        {name:'Atún en aceite vegetal', description:'Calvo, atún en trozos en aceite vegetal.', image:D+'calvo-hosteleria-atun-vegetal.webp', width:170, height:240, alt:'Bolsa Calvo de atún en trozos en aceite vegetal'},
        {name:'Atún Razo', description:'Atún en trozos en aceite de girasol.', image:D+'calvo-hosteleria-razo.webp', width:168, height:240, alt:'Bolsa Razo de atún en trozos en aceite de girasol'},
        {name:'Atún Eureka', description:'Atún en trozos en aceite de girasol.', image:D+'calvo-hosteleria-eureka.webp', width:170, height:236, alt:'Bolsa Eureka de atún en trozos en aceite de girasol'},
        {name:'Chipirones en tinta', description:'Calvo, chipirones en tinta en formato bolsa.', image:D+'calvo-hosteleria-chipirones.webp', width:169, height:237, alt:'Bolsa Calvo de chipirones en tinta'},
        {name:'Calamares en tinta', description:'Calvo, calamares en tinta en formato bolsa.', image:D+'calvo-hosteleria-calamares-tinta.webp', width:168, height:232, alt:'Bolsa Calvo de calamares en tinta'},
        {name:'Calamares en salsa americana', description:'Calvo, calamares en salsa americana en formato bolsa.', image:D+'calvo-hosteleria-calamares-americana.webp', width:168, height:232, alt:'Bolsa Calvo de calamares en salsa americana'},
        {name:'Lata de atún Calvo', description:'Lata de gran formato de atún Calvo.', image:D+'calvo-hosteleria-atun-lata-1kg.webp', width:186, height:122, alt:'Lata de gran formato de atún Calvo'}
      ]
    },
    {
      template: 'editorial', family: 'Helios', color: '#c7c9b3', ink: '#1b3d25', columns: 3,
      eyebrow: 'Helios', title: 'El sabor del origen.',
      description: 'Porque, para Helios, origen es sinónimo de calidad. Por eso seleccionan solo las mejores materias primas procedentes de cultivo local.',
      products: [
        {name:'Mermeladas y confituras', description:'Gama de mermeladas y confituras Helios.', image:D+'helios-mermeladas.webp', width:421, height:302, cover:true, alt:'Tarro de mermelada de fresa Helios'},
        {name:'Tomate frito y salsas pasta', description:'Tomate frito mediterráneo y salsas para pasta.', image:D+'helios-tomate-frito.webp', width:425, height:302, cover:true, alt:'Tarro de tomate frito mediterráneo Helios'},
        {name:'Vegetales', description:'Gama de vegetales Helios.', image:D+'helios-vegetales.webp', width:423, height:302, cover:true, alt:'Tarro de Torti-Ya de Helios'}
      ]
    },
    ...(window.HELIOS_SECTIONS || []),
    ...(window.VILLACAMPO_SECTIONS || []),
    {
      template: 'hero', family: 'Prima', color: '#cf0122', ink: '#ffffff', dark: true,
      eyebrow: 'Salsas Prima', title: 'Salseo del bueno.',
      description: 'Una amplia variedad de deliciosas salsas elaboradas de forma responsable con tu salud, con ingredientes de aquí y la experiencia de más de 40 años a tu lado, acompañando tus platos y trabajando para mejorar cada día.',
      bottom: '05 — Gama de salsas',
      logo: {image:D+'prima-logo.webp', width:430, height:280, alt:'Prima'},
      product: {name:'Gama de salsas Prima', image:D+'prima-gama.webp', width:1425, height:330, wide:true, alt:'Gama de salsas Prima: mayonesas, kétchup, mostazas y otras salsas'}
    },
    {
      template: 'range', family: 'Carbonell · Koipe', color: '#fff8e6', ink: '#1f6b43',
      eyebrow: 'Aceites', title: 'Carbonell, el sabor del hogar.',
      description: 'Considerado un tesoro nacional, Carbonell ha sido un elemento básico en las cocinas españolas durante un siglo y medio. Creado en Andalucía en 1866, es considerado un embajador mundial de la dieta mediterránea.',
      products: [
        {name:'Virgen Extra · 5 L', description:'Carbonell, aceite de oliva virgen extra en formato ahorro.', image:D+'carbonell-virgen-extra-5l.webp', width:233, height:613, alt:'Garrafa Carbonell Virgen Extra de 5 litros'},
        {name:'Carbonell Profesional', description:'Aceite de la gama profesional Carbonell.', image:D+'carbonell-carbonell-profesional.webp', width:110, height:286, alt:'Garrafa Carbonell Profesional'},
        {name:'Koipe Profesional', description:'Aceite de la gama profesional Koipe.', image:D+'carbonell-koipe-profesional.webp', width:103, height:289, alt:'Garrafa Koipe Profesional'},
        {name:'Koipe Sol', description:'Aceite de girasol Koipe Sol.', image:D+'carbonell-koipe-sol.webp', width:103, height:287, alt:'Garrafa Koipe Sol'}
      ]
    },
    {
      template: 'lineup', family: 'Carmencita', color: '#f7e7d2', ink: '#5a2410',
      eyebrow: 'Especias y hierbas', title: 'Carmencita, para sazonar cada plato.',
      note: 'Imagen ilustrativa de la especia · no es el envase',
      variants: [
        {name:'Orégano · 95 g', description:'Orégano seco para dar aroma y sabor a pizzas, pastas, ensaladas y otros platos.', image:D+'carmencita-oregano.webp', width:640, height:640, alt:'Orégano, imagen ilustrativa de Carmencita'},
        {name:'Ajo en polvo · 625 g', description:'Ajo deshidratado y molido, práctico para sazonar carnes, verduras, salsas y guisos.', image:D+'carmencita-ajo.webp', width:640, height:640, alt:'Ajo, imagen ilustrativa de Carmencita'},
        {name:'Guindilla cayena · 160 g', description:'Guindilla cayena para aportar un toque picante a guisos, salsas y otros platos.', image:D+'carmencita-cayena.webp', width:640, height:640, alt:'Guindilla cayena, imagen ilustrativa de Carmencita'},
        {name:'Pimienta negra molida · 510 g', description:'Pimienta negra molida para condimentar carnes, pescados, verduras y salsas.', image:D+'carmencita-pimienta-negra.webp', width:640, height:640, alt:'Pimienta negra, imagen ilustrativa de Carmencita'},
        {name:'Perejil · 110 g', description:'Perejil seco para añadir sabor y aroma a guisos, sopas, pescados y salsas.', image:D+'carmencita-perejil.webp', width:640, height:640, alt:'Perejil, imagen ilustrativa de Carmencita'},
        {name:'Pimentón dulce · 490 g', description:'Pimentón dulce para dar color y sabor a arroces, guisos, carnes y verduras.', image:D+'carmencita-pimenton.webp', width:640, height:640, alt:'Pimentón, imagen ilustrativa de Carmencita'},
        {name:'Pimienta blanca molida · 510 g', description:'Pimienta blanca molida, adecuada para sazonar salsas, cremas, pescados y otros platos.', image:D+'carmencita-pimienta-blanca.webp', width:640, height:640, alt:'Pimienta blanca, imagen ilustrativa de Carmencita'},
        {name:'Colorante alimentario · 625 g', description:'Colorante alimentario para aportar un tono dorado a arroces y otros platos.', image:D+'carmencita-colorante.webp', width:640, height:640, alt:'Colorante alimentario, imagen ilustrativa de Carmencita'},
        {name:'Laurel en hojas · 40 g', description:'Hojas de laurel para aromatizar guisos, caldos, legumbres y estofados.', image:D+'carmencita-laurel.webp', width:640, height:640, alt:'Laurel, imagen ilustrativa de Carmencita'},
        {name:'Comino en grano · 390 g', description:'Comino entero para condimentar guisos, salsas, escabeches y recetas tradicionales.', image:D+'carmencita-comino.webp', width:640, height:640, alt:'Comino, imagen ilustrativa de Carmencita'},
        {name:'Comino molido · 440 g', description:'Comino molido para incorporar fácilmente a guisos, salsas y otros platos.', image:D+'carmencita-comino.webp', width:640, height:640, alt:'Comino, imagen ilustrativa de Carmencita'},
        {name:'Pimienta negra en grano · 500 g', description:'Granos de pimienta negra para moler o añadir a caldos, guisos y marinados.', image:D+'carmencita-pimienta-negra.webp', width:640, height:640, alt:'Pimienta negra, imagen ilustrativa de Carmencita'},
        {name:'Bicarbonato · 1 kg', description:'Bicarbonato sódico para usos culinarios, como repostería y preparación de masas.', image:'assets/despensa/extra/carmencita_bicarbonato-1kg.webp', width:381, height:381, alt:'Carmencita Bicarbonato 1 kg'},
        {name:'Clavo en grano · 550 g', description:'Clavos enteros para aromatizar platos dulces, guisos, caldos y marinados.', image:D+'carmencita-clavo.webp', width:640, height:640, alt:'Clavo, imagen ilustrativa de Carmencita'},
        {name:'Canela en rama · 170 g', description:'Canela en rama para aromatizar postres, bebidas y preparaciones de cocina.', image:D+'carmencita-canela.webp', width:640, height:640, alt:'Canela, imagen ilustrativa de Carmencita'},
        {name:'Canela molida · 410 g', description:'Canela molida para repostería, postres, bebidas y otras recetas.', image:D+'carmencita-canela.webp', width:640, height:640, alt:'Canela, imagen ilustrativa de Carmencita'}
      ]
    },
    {
      template: 'lineup', family: 'La Ballena', color: '#e2edf8', ink: '#12365e',
      eyebrow: 'Sal marina · 1 kg', title: 'La Ballena, sal para cada uso.',
      note: 'Imagen de la gama · sal marina fina yodada',
      product: {name:'Sal marina fina yodada La Ballena · 1 kg', image:D+'ballena-sal.webp', width:201, height:307, alt:'Caja de sal marina fina yodada La Ballena de 1 kg'},
      variants: [
        {name:'Sal marina gruesa · 1 kg', description:'Sal marina de grano grueso para cocinar y sazonar alimentos.'},
        {name:'Sal marina fina · 1 kg', description:'Sal marina de grano fino para sazonar alimentos y utilizar en la cocina diaria.'},
        {name:'Sal marina fina yodada · 1 kg', description:'Sal marina fina con yodo añadido, para sazonar alimentos.'},
        {name:'Sal marina gruesa yodada · 1 kg', description:'Sal marina de grano grueso con yodo añadido, para cocinar y sazonar.'}
      ]
    },
    {
      template: 'lineup', family: 'Luengo', color: '#f3ead7', ink: '#4a3416',
      eyebrow: 'Legumbres secas y cocidas', title: 'Luengo, legumbres de cuchara.',
      note: 'Imagen de la ficha del producto · puede diferir del formato',
      variants: [
        {name:'Alubia blanca · 5 kg', description:'Alubia blanca seca, de grano alargado, en formato de 5 kg.', image:D+'luengo-alubia-blanca-5kg.webp', width:458, height:458, alt:'Alubia blanca larga Luengo de 5 kg'},
        {name:'Alubia blanca cocida · frasco de 570 g', description:'Alubias blancas cocidas en conserva, listas para consumir.', image:D+'luengo-alubia-blanca-cocida.webp', width:600, height:600, alt:'Frasco de alubia blanca cocida Luengo'},
        {name:'Alubia de granja cocida · frasco de 570 g', description:'Alubias de granja cocidas en conserva.', image:'assets/despensa/extra/luengo_alubia-de-granja-cocida-frasco-570g.webp', width:720, height:720, alt:'Luengo Alubia de granja cocida frasco 570 g'},
        {name:'Alubia roja cocida · frasco de 570 g', description:'Alubias rojas cocidas en conserva.', image:'assets/despensa/extra/luengo_alubia-roja-cocida-frasco-570g.webp', width:720, height:720, alt:'Luengo Alubia roja cocida frasco 570 g'},
        {name:'Alubia blanca cocida · lata de 3 kg', description:'Alubias blancas cocidas en formato de hostelería.', image:'assets/despensa/extra/luengo_alubia-blanca-cocida-lata-3kg.webp', width:720, height:720, alt:'Luengo Alubia blanca cocida lata 3 kg'},
        {name:'Garbanzo castellano · 5 kg', description:'Garbanzo seco en formato de 5 kg.', image:'assets/despensa/extra/luengo_garbanzo-castellano-5kg.webp', width:720, height:720, alt:'Luengo Garbanzo castellano 5 kg'},
        {name:'Garbanzo pedrosillano · 5 kg', description:'Garbanzo pedrosillano seco en formato de 5 kg.', image:'assets/despensa/extra/luengo_garbanzo-pedrosillano-5kg.webp', width:720, height:720, alt:'Luengo Garbanzo pedrosillano 5 kg'},
        {name:'Garbanzos cocidos · frasco de 570 g', description:'Garbanzos cocidos en conserva, listos para añadir a guisos o ensaladas.', image:D+'luengo-garbanzo-cocido.webp', width:600, height:600, alt:'Frasco de garbanzos cocidos Luengo'},
        {name:'Garbanzos cocidos · lata de 3 kg', description:'Garbanzos cocidos en formato de hostelería.', image:'assets/despensa/extra/luengo_garbanzos-cocidos-lata-3kg.webp', width:719, height:719, alt:'Luengo Garbanzos cocidos lata 3 kg'},
        {name:'Lenteja castellana · 5 kg', description:'Lenteja castellana seca, de grano grande, en formato de 5 kg.', image:'assets/despensa/extra/luengo_lenteja-castellana-5kg.webp', width:720, height:720, alt:'Luengo Lenteja castellana 5 kg'},
        {name:'Lenteja pardina · 5 kg', description:'Lenteja pardina seca, de grano pequeño y piel fina, en formato de 5 kg.', image:D+'luengo-lenteja-pardina.webp', width:600, height:600, alt:'Lentejas pardina Luengo'},
        {name:'Lentejas cocidas · frasco de 570 g', description:'Lentejas cocidas en conserva, listas para consumir.', image:'assets/despensa/extra/luengo_lentejas-cocidas-frasco-570g.webp', width:636, height:636, alt:'Luengo Lentejas cocidas frasco 570 g'}
      ]
    },
    {
      template: 'lineup', family: 'Borges · Hostelería', color: '#f4e4d0', ink: '#6a1d12',
      eyebrow: 'Frutos secos y aperitivos', title: 'Borges, para la barra y la cocina.',
      note: 'Imagen de la gama en formato comercial · puede diferir del formato de hostelería',
      variants: [
        {name:'Cóctel barbacoa · 1 kg', description:'Mezcla de frutos secos con sabor barbacoa, en formato de 1 kg.', image:'assets/despensa/extra/borges_coctel-barbacoa-1kg.webp', width:540, height:540, alt:'Borges Cóctel barbacoa 1 kg'},
        {name:'Mix frito · cubo de 2 kg', description:'Mezcla de frutos secos fritos para servir como aperitivo, en cubo de 2 kg.', image:D+'borges-mezcla.webp', width:316, height:396, alt:'Bolsa Borges Selección de mezcla de frutos secos, imagen de la gama'},
        {name:'Cacahuetes · cubo de 2,5 kg', description:'Cacahuetes en formato grande para hostelería y servicio de aperitivos.', image:D+'borges-cacahuetes.webp', width:319, height:400, alt:'Bolsa Borges Selección de cacahuetes fritos y salados, imagen de la gama'},
        {name:'Mix barbacoa · cubo de 1,75 kg', description:'Mezcla de aperitivo con sabor barbacoa, en cubo de 1,75 kg.', image:'assets/despensa/extra/borges_mix-barbacoa-cubo-1-75kg.webp', width:717, height:717, alt:'Borges Mix barbacoa cubo 1,75 kg'},
        {name:'Almendra tostada · 1 kg', description:'Almendras tostadas en formato de 1 kg para cocina y hostelería.', image:'assets/despensa/extra/borges_almendra-tostada-1kg.webp', width:540, height:540, alt:'Borges Almendra tostada 1 kg'},
        {name:'Cacahuete frito · 1 kg', description:'Cacahuetes fritos en formato de 1 kg para aperitivos y hostelería.', image:D+'borges-cacahuetes.webp', width:319, height:400, alt:'Bolsa Borges Selección de cacahuetes fritos y salados, imagen de la gama'},
        {name:'Nuez en grano · 1 kg', description:'Nueces sin cáscara en formato de 1 kg, listas para utilizar en cocina y repostería.', image:D+'borges-nueces.webp', width:309, height:395, alt:'Bolsa Borges Selección de nueces de California en grano, imagen de la gama'},
        {name:'Pasas sultanas · 1 kg', description:'Pasas sultanas en formato de 1 kg, apropiadas para recetas, ensaladas y repostería.', image:'assets/despensa/extra/borges_pasas-sultanas-1kg.webp', width:540, height:540, alt:'Borges Pasas sultanas 1 kg'},
        {name:'Cóctel para ensaladas · 1 kg', description:'Mezcla de frutos secos para añadir a ensaladas, en formato de 1 kg.', image:'assets/despensa/extra/borges_coctel-para-ensaladas-1kg.webp', width:540, height:540, alt:'Borges Cóctel para ensaladas 1 kg'},
      ]
    },
    {
      template: 'lineup', family: 'Borges · Siropes', color: '#fbf6ee', ink: '#5b341a',
      eyebrow: 'Siropes Exquizito · 1 kg', title: 'El toque final del postre.',
      note: 'Sirope de la gama Exquizito de Borges',
      variants: [
        {name:'Sirope de caramelo · 1 kg', description:'Sirope de caramelo para acompañar y decorar postres, helados y otras elaboraciones.', image:D+'borges-sirope-caramelo.webp', width:178, height:510, alt:'Botella de sirope de caramelo Borges Exquizito'},
        {name:'Sirope de chocolate · 1 kg', description:'Sirope de chocolate para acompañar y decorar postres y helados.', image:D+'borges-sirope-chocolate.webp', width:178, height:510, alt:'Botella de sirope de chocolate Borges Exquizito'},
        {name:'Sirope de frutos rojos · 1 kg', description:'Sirope de frutos rojos para dar sabor y decorar postres y helados.', image:D+'borges-sirope-frutos-rojos.webp', width:179, height:510, alt:'Botella de sirope de frutos rojos Borges Exquizito'},
        {name:'Sirope de moka · 1 kg', description:'Sirope de moka para acompañar y decorar postres, helados y bebidas.', image:D+'borges-sirope-moka.webp', width:178, height:510, alt:'Botella de sirope de moka Borges Exquizito'},
        {name:'Sirope de galleta caramelizada · 1 kg', description:'Sirope de galleta caramelizada, también conocido como sabor speculoos, para postres y helados.', image:'assets/despensa/extra/borges_sirope-de-galleta-caramelizada-1kg.webp', width:720, height:720, alt:'Borges Sirope de galleta caramelizada 1 kg'},
        {name:'Sirope de caramelo y mantequilla salada · 1 kg', description:'Sirope de caramelo con mantequilla salada para decorar postres y helados.', image:D+'borges-sirope-caramelo-mantequilla.webp', width:178, height:510, alt:'Botella de sirope de caramelo y mantequilla salada Borges Exquizito'}
      ]
    }
  ]
});
