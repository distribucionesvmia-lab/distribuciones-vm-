/* Refrigerados: 8 bloques por marca y uso. Los artículos salen de las listas del ERP (campo cod = código de artículo). */
(() => {
  'use strict';
  const X = 'assets/refrigerados/extra/';
  const B = 'assets/refrigerados/bloques/';
  const blocks = [
    { id:'navidul', n:'01', chip:'Navidul', kicker:'Grupo Campofrío · Hostelería', title:'Navidul',
      lead:'Piezas enteras de jamón, formatos grandes y jamón de gran rendimiento, para hostelería.',
      media:[{src:B+'navidul-es-jamon.png', w:968, h:948, alt:'Navidul. All you need… es jamón', cls:'rf-m-hero'}] },
    { id:'navidul-alimentacion', n:'02', chip:'Navidul alimentación', kicker:'Grupo Campofrío · Alimentación', title:'Navidul alimentación',
      lead:'Sobres y formatos pequeños de embutido y jamón curado, para alimentación.',
      media:[{src:X+'navidul_jamones-chorizos-salchichones-y-lotes.png', w:720, h:720, alt:'Jamón curado loncheado Navidul', cls:'rf-m-hero'}] },
    { id:'campofrio', n:'03', chip:'Campofrío', kicker:'Grupo Campofrío', title:'Campofrío',
      lead:'Piezas de fiambre y paleta, y formatos de medio kilo y de 3 kg para hostelería; y sobres para alimentación.',
      media:[
        {src:B+'campofrio-embutidos.png', w:1000, h:667, alt:'Plato de embutidos y sándwiches', cls:'rf-m-big'},
        {src:B+'campofrio-ensalada.png', w:624, h:413, alt:'Ensalada de pasta con fiambre'},
        {src:B+'campofrio-tostada.png', w:624, h:413, alt:'Tostada con tomate y fiambre'},
        {src:B+'campofrio-tortilla.png', w:624, h:413, alt:'Tortilla rellena de fiambre'},
        {src:B+'campofrio-cuchara.png', w:550, h:550, alt:'Cuchara con fruta'}
      ], mosaic:true },
    { id:'revilla', n:'04', chip:'Revilla', kicker:'Grupo Campofrío', title:'Revilla',
      lead:'Chorizo y salchichón tradicionales por kilo para hostelería, y sobres de chorizo, salami y salchichón para alimentación.',
      media:[{src:X+'revilla_salchichon-chorizo-torreznos-y-salami.png', w:720, h:720, alt:'Embutidos Revilla', cls:'rf-m-hero'}] },
    { id:'smart-solutions', n:'05', chip:'Smart Solutions · preparados', kicker:'Alimentos preparados', title:'Smart Solutions',
      lead:'Platos preparados listos para la cocina: callos, ensaladilla, tortilla, fuet, casquería cocida y torrezno.',
      media:[
        {src:B+'smart-solutions-logo.png', w:700, h:700, alt:'Campofrío Smart Solutions', cls:'rf-m-logo'},
        {src:B+'smart-canapes.png', w:600, h:400, alt:'Canapés sobre pizarra', cls:'rf-m-wide'},
        {src:B+'smart-club-sandwich.png', w:370, h:277, alt:'Sándwiches club y bikini'},
        {src:B+'smart-mousse-foie.png', w:512, h:384, alt:'Mousse de foie de pato Aoste'}
      ], mosaic:true },
    { id:'salchichas', n:'06', chip:'Salchichas', kicker:'Campofrío · Oscar Mayer · El Pozo', title:'Salchichas',
      lead:'Salchichas Frankfurt, cocktail y Jumbo.',
      media:[{src:X+'oscar-mayer_salchichas-jumbo-y-bacon-en-lonchas.png', w:720, h:720, alt:'Salchichas Jumbo Oscar Mayer', cls:'rf-m-hero'}] },
    { id:'quesos', n:'07', chip:'Quesos', kicker:'Reny Picot', title:'Quesos',
      lead:'Queso para untar, queso de Burgos, mozzarella, rallados y lonchas.',
      media:[
        {src:B+'reny-picot-logo.png', w:212, h:62, alt:'Reny Picot', cls:'rf-m-brand'},
        {src:B+'reny-picot-quesos.png', w:472, h:467, alt:'Quesos Reny Picot: queso crema, queso de Burgos, rallado, lonchas y barra', cls:'rf-m-hero rf-m-cut'}
      ] },
    { id:'pozo', n:'08', chip:'El Pozo', kicker:'El Pozo', title:'El Pozo',
      lead:'Bacon, paleta, taquitos de jamón y salchichas para hostelería, y jamón en formato sobre para alimentación.',
      media:[{src:X+'elpozo_bacon-paleta-taquitos-y-salchichas.png', w:720, h:720, alt:'Productos El Pozo', cls:'rf-m-hero'}] }
  ];
  const products = [
    {group:'Navidul',brand:'Navidul',name:'Chorizo cular ibérico · kg',blk:'navidul',uso:'h',cod:'26009',peek:'assets/refrigerados/extra/navidul_chorizo-cular-iberico.png',pw:391,ph:255,peekAlt:'Chorizo cular ibérico de Navidul, pieza entera con unas lonchas cortadas'},
    {group:'Navidul',brand:'Navidul',name:'Centro gran rendimiento · kg',blk:'navidul',uso:'h',cod:'26007',peek:'assets/refrigerados/extra/navidul_centro-gran-rendimiento.png',pw:218,ph:335,peekAlt:'Centro de jamón curado Gran Rendimiento de Navidul, pieza con su etiqueta'},
    {group:'Navidul',brand:'Navidul',name:'Jamón 4 Estaciones Reserva · pieza',blk:'navidul',uso:'h',cod:'26129',peek:'assets/refrigerados/extra/navidul_jamon-4-estaciones-reserva.png',pw:192,ph:557,peekAlt:'Jamón curado Reserva Cuatro Estaciones de Navidul, pieza entera con su etiqueta'},
    {group:'Navidul',brand:'Navidul',name:'Jamón asado ahumado · kg',blk:'navidul',uso:'h',cod:'26106',peek:'assets/refrigerados/extra/navidul_jamon-asado-ahumado.png',pw:213,ph:505,peekAlt:'Jamón asado ahumado natural al horno de Navidul, pieza entera con su etiqueta'},
    {group:'Navidul',brand:'Navidul',name:'Jamón cebo ibérico · pieza de 7,5-8 kg',blk:'navidul',uso:'h',cod:'26027',peek:'assets/refrigerados/extra/navidul_jamon-cebo-iberico.png',pw:192,ph:566,peekAlt:'Jamón de cebo ibérico 50 % raza ibérica de Navidul, pieza entera con su etiqueta'},
    {group:'Navidul',brand:'Navidul',name:'Lonchas de jamón curado · 500 g',blk:'navidul',uso:'h',cod:'26008',peek:'assets/refrigerados/extra/navidul_jamon-curado-500-horeca.png',pw:604,ph:900,peekAlt:'Lonchas de jamón curado de Navidul para hostelería, envase de 500 g con 26 lonchas'},
    {group:'Navidul',brand:'Navidul',name:'Salchichón cular ibérico · kg',blk:'navidul',uso:'h',cod:'26010',peek:'assets/refrigerados/extra/navidul_salchichon-cular-iberico.png',pw:159,ph:752,peekAlt:'Salchichón cular ibérico Gran Selección de Navidul, pieza entera con su etiqueta'},
    {group:'Navidul alimentación',brand:'Navidul',name:'Chorizo ibérico · 40 g',blk:'navidul-alimentacion',uso:'a',cod:'26050',peek:'assets/refrigerados/extra/navidul_chorizo-iberico-40g.png',pw:305,ph:549,peekAlt:'Chorizo ibérico Gran Selección de Navidul en lonchas, sobre de 40 g'},
    {group:'Navidul alimentación',brand:'Navidul',name:'Lomo embuchado · 40 g',blk:'navidul-alimentacion',uso:'a',cod:'26317',peek:'assets/refrigerados/extra/navidul_lomo-embuchado-40g.png',pw:305,ph:549,peekAlt:'Caña de lomo clásico de Navidul en lonchas, sobre de 40 g'},
    {group:'Navidul alimentación',brand:'Navidul',name:'Jamón curado · 45 g',blk:'navidul-alimentacion',uso:'a',cod:'26300',peek:'assets/refrigerados/extra/navidul_jamon-curado-45g.png',pw:197,ph:388,peekAlt:'Jamón curado bodega de Navidul en lonchas, sobre de 45 g'},
    {group:'Navidul alimentación',brand:'Navidul',name:'Salchichón ibérico · 40 g',blk:'navidul-alimentacion',uso:'a',cod:'26051',peek:'assets/refrigerados/extra/navidul_salchichon-iberico-40g.png',pw:305,ph:549,peekAlt:'Salchichón ibérico Gran Selección de Navidul en lonchas, sobre de 40 g'},
    {group:'Navidul alimentación',brand:'Navidul',name:'Lonchas de queso semicurado · 100 g',blk:'navidul-alimentacion',uso:'a',cod:'26148',peek:'assets/refrigerados/extra/navidul_queso-semicurado-100.png',pw:420,ph:639,peekAlt:'Lonchas de queso semicurado Navidul, envase de 100 g'},
    {group:'Navidul alimentación',brand:'Navidul',name:'Taquitos de jamón · 100 g',blk:'navidul-alimentacion',uso:'a',cod:'26094',peek:'assets/refrigerados/extra/navidul_taquitos-jamon.png',pw:480,ph:436,peekAlt:'Taquitos de jamón curado Navidul, envase de dos barquetas'},
    {group:'Campofrío',brand:'Campofrío',name:'Jamón cocido 11×11 · pieza de 4 kg',blk:'campofrio',uso:'h',cod:'26119',peek:'assets/refrigerados/extra/campofrio_jamon-cocido-11x11-4kg.png',pw:181,ph:511,peekAlt:'Jamón cocido Todo Sabor 11×11 de Campofrío, pieza de 4 kg'},
    {group:'Campofrío',brand:'Campofrío',name:'Bacon costilla al vacío · kg',blk:'campofrio',uso:'h',cod:'26120',peek:'assets/refrigerados/extra/campofrio_bacon-costilla-kg.png',pw:749,ph:348,peekAlt:'Bacon costilla de Campofrío, pieza envasada al vacío'},
    {group:'Campofrío',brand:'Campofrío',name:'Bacon práctico · kg',blk:'campofrio',uso:'h',cod:'26095',peek:'assets/refrigerados/extra/campofrio_bacon-practico-kg.png',pw:716,ph:326,peekAlt:'Bacon práctico de Campofrío, pieza envasada al vacío'},
    {group:'Campofrío',brand:'Campofrío',name:'Fiambre de lomo adobado · kg',blk:'campofrio',uso:'h',cod:'26105',peek:'assets/refrigerados/extra/campofrio_lomo-adobado-kg.png',pw:631,ph:285,peekAlt:'Lomo adobado de Campofrío, pieza envasada al vacío'},
    {group:'Campofrío',brand:'Campofrío',name:'Fiambre de paleta · kg',blk:'campofrio',uso:'h',cod:'26109',peek:'assets/refrigerados/extra/campofrio_paleta-sandwich-kg.png',pw:203,ph:544,peekAlt:'Fiambre de paleta cocida Sandwich de Campofrío, pieza entera con su red'},
    {group:'Campofrío',brand:'Campofrío',name:'Lonchas de paleta cocida · 500 g',blk:'campofrio',uso:'h',cod:'26013',peek:'assets/refrigerados/extra/campofrio_paleta-cocida-500g.png',pw:480,ph:393,peekAlt:'Lonchas de paleta cocida de Campofrío, envase de 500 g'},
    {group:'Campofrío',brand:'Campofrío',name:'Medallón de pato · 1,2 kg',blk:'campofrio',uso:'h',cod:'26117',peek:'assets/refrigerados/extra/campofrio_medallon-pato-mousse.png',pw:226,ph:585,peekAlt:'Mousse de foie de pato Aoste, medallón envasado'},
    {group:'Campofrío',brand:'Campofrío',name:'Pechuga de pavo · kg',blk:'campofrio',uso:'h',cod:'26111',peek:'assets/refrigerados/extra/campofrio_pechuga-pavo-kg.png',pw:362,ph:398,peekAlt:'Pechuga de pavo La Original Pavofrío de Campofrío, pieza envasada, baja en grasa'},
    {group:'Campofrío',brand:'Campofrío',name:'Queso en barra para sándwich · 3,3 kg',blk:'campofrio',uso:'h',cod:'26203'},
    {group:'Campofrío',brand:'Campofrío',name:'Queso edam en lonchas · 1 kg',blk:'campofrio',uso:'h',cod:'26200',peek:'assets/refrigerados/extra/campofrio_queso-edam-lonchas-1kg.png',pw:581,ph:401,peekAlt:'Lonchas de queso edam de Campofrío, envase de 1 kg'},
    {group:'Campofrío',brand:'Campofrío',name:'Queso en lonchas para sándwich · 1 kg',blk:'campofrio',uso:'h',cod:'26201',peek:'assets/refrigerados/extra/campofrio_queso-lonchas-sandwich-1kg.png',pw:811,ph:540,peekAlt:'Lonchas de queso sandwich edam de Campofrío, envase de 1 kg'},
    {group:'Campofrío',brand:'Campofrío',name:'Chopped en lonchas · 95 g',blk:'campofrio',uso:'a',cod:'26307',peek:'assets/refrigerados/extra/campofrio_chopped-95g.png',pw:348,ph:524,peekAlt:'Chopped pork de Campofrío en lonchas, envase de 95 g'},
    {group:'Campofrío',brand:'Campofrío',name:'Jamón cocido · 75 g',blk:'campofrio',uso:'a',cod:'260541',peek:'assets/refrigerados/extra/campofrio_jamon-cocido-75g.png',pw:298,ph:413,peekAlt:'Jamón cocido de Campofrío en lonchas, envase de 75 g'},
    {group:'Campofrío',brand:'Campofrío',name:'Mortadela clásica · 95 g',blk:'campofrio',uso:'a',cod:'26055',peek:'assets/refrigerados/extra/campofrio_mortadela-clasica-95g.png',pw:348,ph:524,peekAlt:'Mortadela clásica de Campofrío en lonchas, envase de 95 g'},
    {group:'Campofrío',brand:'Campofrío',name:'Mortadela con aceitunas',blk:'campofrio',uso:'a',cod:'26056',peek:'assets/refrigerados/extra/campofrio_mortadela-aceitunas-95g.png',pw:348,ph:524,peekAlt:'Mortadela con aceitunas de Campofrío en lonchas, envase de 95 g'},
    {group:'Campofrío',brand:'Campofrío',name:'Pechuga de pavo · 70 g',blk:'campofrio',uso:'a',cod:'26309',peek:'assets/refrigerados/extra/campofrio_pechuga-pavo-70g.png',pw:345,ph:366,peekAlt:'Fiambre de pechuga de pavo de Campofrío en lonchas, envase de 70 g'},
    {group:'Revilla',brand:'Revilla',name:'Chorizo tradicional · kg',blk:'revilla',uso:'h',cod:'26023',peek:'assets/refrigerados/extra/revilla_chorizo-tradicion-extra.png',pw:141,ph:699,peekAlt:'Chorizo Tradición Extra de Revilla, pieza envuelta con su etiqueta'},
    {group:'Revilla',brand:'Revilla',name:'Salchichón Cumbre · kg',blk:'revilla',uso:'h',cod:'26022',peek:'assets/refrigerados/extra/campofrio_salchichon-cumbre-real.png',pw:146,ph:728,peekAlt:'Salchichón Cumbre Real de Los Curados de Campofrío, pieza entera con su etiqueta'},
    {group:'Revilla',brand:'Revilla',name:'Chorizo · 65 g',blk:'revilla',uso:'a',cod:'26304',peek:'assets/refrigerados/extra/revilla_chorizo-selecto-65g.png',pw:399,ph:600,peekAlt:'Chorizo selecto de Revilla en lonchas, sobre de 65 g'},
    {group:'Revilla',brand:'Revilla',name:'Chorizo Pamplona · 65 g',blk:'revilla',uso:'a',cod:'260651',peek:'assets/refrigerados/extra/revilla_chorizo-pamplona-65g.png',pw:399,ph:600,peekAlt:'Chorizo Pamplona de Revilla en lonchas, sobre de 65 g'},
    {group:'Revilla',brand:'Revilla',name:'Salami · 65 g',blk:'revilla',uso:'a',cod:'263051',peek:'assets/refrigerados/extra/revilla_salami-65g.png',pw:399,ph:600,peekAlt:'Salami extra de Revilla en lonchas, sobre de 65 g'},
    {group:'Revilla',brand:'Revilla',name:'Salchichón · 65 g',blk:'revilla',uso:'a',cod:'26303',peek:'assets/refrigerados/extra/revilla_salchichon-65g.png',pw:348,ph:479,peekAlt:'Salchichón extra de Revilla en lonchas, sobre de 65 g'},
    {group:'Smart Solutions',brand:'Rogusa',name:'Callos a la madrileña · 2,5 kg',blk:'smart-solutions',uso:'',cod:'14001',plato:'callos a la madrileña con garbanzos, servidos en cazuela de barro.',image:'assets/refrigerados/extra/rogusa_plato-callos.png',w:674,h:549,alt:'Plato de callos a la madrileña',cap:'Sugerencia de plato. Imagen de Rogusa, no del envase de 2,5 kg',peek:'assets/refrigerados/extra/rogusa_callos-2-5kg.png',pw:816,ph:863,peekAlt:'Callos de ternera preparados de Rogusa, envase de 2,5 kg'},
    {group:'Smart Solutions',brand:'Campofrío',name:'Ensaladilla rusa · 2 kg',blk:'smart-solutions',uso:'',cod:'26118',peek:'assets/refrigerados/extra/campofrio_ensaladilla-rusa-2kg.png',pw:645,ph:518,peekAlt:'Ensaladilla rusa de Campofrío Smart Solutions, bandeja de 2 kg'},
    {group:'Smart Solutions',brand:'Campofrío',name:'Fuet en lonchas · 500 g',blk:'smart-solutions',uso:'',cod:'26122',peek:'assets/refrigerados/extra/campofrio_fuet-lonchas-500g.png',pw:618,ph:372,peekAlt:'Fuet extra en lonchas de Campofrío, bandeja de 500 g'},
    {group:'Smart Solutions',brand:'Campofrío',name:'Tortilla de patata con cebolla · 500 g',blk:'smart-solutions',uso:'',cod:'261181',image:'assets/refrigerados/extra/campofrio_tortilla-patata-cebolla-500g.png',w:720,h:731,alt:'Tortilla de patata con cebolla Campofrío'},
    {group:'Smart Solutions',brand:'Coenyco',name:'Morros cocidos · 500 g',blk:'smart-solutions',uso:'',cod:'5003',plato:'morro en salsa, o con garbanzos, en cazuela de barro.',image:'assets/refrigerados/extra/coenyco_morro-de-cerdo-cocido-500g.png',w:703,h:703,alt:'Morro de cerdo cocido Coenyco'},
    {group:'Smart Solutions',brand:'Coenyco',name:'Orejas cocidas · 1 kg',blk:'smart-solutions',uso:'',cod:'5001',plato:'oreja a la plancha con pimentón, o en salsa, para raciones y tapas.',image:'assets/refrigerados/extra/coenyco_oreja-de-cerdo-cocida-1kg.png',w:720,h:720,alt:'Oreja de cerdo cocida Coenyco, 1 kg'},
    {group:'Smart Solutions',brand:'Coenyco',name:'Orejas cocidas · 500 g',blk:'smart-solutions',uso:'',cod:'5002',plato:'oreja a la plancha con pimentón, o en salsa, para raciones y tapas.',image:'assets/refrigerados/extra/coenyco_oreja-de-cerdo-cocida-500g.png',w:720,h:720,alt:'Oreja de cerdo cocida Coenyco, 500 g'},
    {group:'Smart Solutions',brand:'Coenyco',name:'Rabo de cerdo · 500 g',blk:'smart-solutions',uso:'',cod:'5011',plato:'rabo de cerdo guisado, en cazuela de barro.',image:'assets/refrigerados/extra/coenyco_rabo-de-cerdo-cocido-500g.png',w:687,h:687,alt:'Rabo de cerdo cocido Coenyco'},
    {group:'Smart Solutions',brand:'Revilla',name:'Torrezno de Soria · bandeja de 1,3 kg',blk:'smart-solutions',uso:'',cod:'260235',peek:'assets/refrigerados/extra/revilla_torrezno-de-soria-1-3kg.png',pw:528,ph:725,peekAlt:'Bandeja de 1,3 kg de Torrezno de Soria precocinado de Revilla'},
    {group:'Salchichas',brand:'Campofrío',name:'Salchichas Frankfurt · pack de 4 × 140 g',blk:'salchichas',uso:'',cod:'26084',image:'assets/refrigerados/extra/campofrio_salchichas-frankfurt-4x140g.png',w:720,h:720,alt:'Salchichas Frankfurt La Original de Campofrío, pack de 4 sobres de 140 g'},
    {group:'Salchichas',brand:'El Pozo',name:'Salchichas cocktail · 1 kg',blk:'salchichas,pozo',uso:'h',cod:'20120',image:'assets/refrigerados/extra/elpozo_salchichas-cocktail-1kg.png',w:720,h:720,alt:'Salchichas cocktail de ElPozo, bolsa de 1 kg (100 unidades)'},
    {group:'Salchichas',brand:'Oscar Mayer',name:'Salchichas Jumbo · 350 g',blk:'salchichas',uso:'',cod:'26121',image:'assets/refrigerados/extra/oscar-mayer_salchichas-jumbo-y-bacon-en-lonchas.png',w:720,h:720,alt:'Salchichas Jumbo Oscar Mayer'},
    {group:'Quesos',brand:'Reny Picot',name:'Queso de Burgos · brik de 1 kg',blk:'quesos',uso:'',cod:'17050'},
    {group:'Quesos',brand:'Reny Picot',name:'Queso de Burgos · 4 × 62,5 g',blk:'quesos',uso:'',cod:'17002'},
    {group:'Quesos',brand:'Reny Picot',name:'Queso en lonchas · 8 unidades',blk:'quesos',uso:'',cod:'17080',image:'assets/refrigerados/extra/reny-picot_queso-en-lonchas.png',w:720,h:720,alt:'Queso en lonchas Reny Picot'},
    {group:'Quesos',brand:'Reny Picot',name:'Emmental rallado · 60 g',blk:'quesos',uso:'',cod:'17005',image:'assets/refrigerados/extra/reny-picot_quesos-rallados.png',w:720,h:720,alt:'Quesos rallados Reny Picot'},
    {group:'Quesos',brand:'Reny Picot',name:'Queso rallado en polvo · 100 g',blk:'quesos',uso:'',cod:'17006',image:'assets/refrigerados/extra/reny-picot_quesos-rallados.png',w:720,h:720,alt:'Quesos rallados Reny Picot'},
    {group:'Quesos',brand:'Reny Picot',name:'Queso rallado hilo fundido · 1 kg',blk:'quesos',uso:'',cod:'17011',image:'assets/refrigerados/extra/reny-picot_quesos-rallados.png',w:720,h:720,alt:'Quesos rallados Reny Picot'},
    {group:'Quesos',brand:'Reny Picot',name:'Mozzarella · 150 g',blk:'quesos',uso:'',cod:'17004',image:'assets/refrigerados/extra/reny-picot_mozzarella-150g.png',w:720,h:720,alt:'Mozzarella Reny Picot, 150 g'},
    {group:'Quesos',brand:'Reny Picot',name:'Queso para untar · 2 kg',blk:'quesos',uso:'',cod:'17020',image:'assets/refrigerados/reny-crema-2kg.png',w:1000,h:1000,alt:'Cubo de queso crema natural Reny Picot de 2 kg'},
    {group:'Quesos',brand:'Reny Picot',name:'Queso para untar · cubo de 5 kg',blk:'quesos',uso:'',cod:'17018',image:X+'reny-picot_queso-crema-5kg.png',w:404,h:386,alt:'Cubo de queso crema para untar Reny Picot de 5 kg'},
    {group:'Quesos',brand:'Tranchetes',name:'Tranchetes · 7 lonchas, 131 g',blk:'quesos',uso:'',cod:'30000',image:'assets/refrigerados/extra/sin-marca-confirmada_queso-fundido-en-lonchas-131g.png',w:720,h:720,alt:'Queso fundido en lonchas, 131 g'},
    {group:'El Pozo',brand:'El Pozo',name:'Barqueta de bacon · 1 kg',blk:'pozo',uso:'h',cod:'20001',peek:'assets/refrigerados/extra/elpozo_bacon-1kg.png',pw:771,ph:1000,peekAlt:'Bacon frito sándwich de ElPozo, barqueta de 1 kg'},
    {group:'El Pozo',brand:'El Pozo',name:'Fiambre de paleta para sándwich · 4 kg',blk:'pozo',uso:'h',cod:'20004',peek:'assets/refrigerados/extra/elpozo_paleta-sandwich-4kg.png',pw:650,ph:1000,peekAlt:'Fiambre de paleta para sándwich de ElPozo, pieza de 4 kg'},
    {group:'El Pozo',brand:'El Pozo',name:'Taquitos de jamón · 500 g',blk:'pozo',uso:'h',cod:'20014',peek:'assets/refrigerados/extra/elpozo_taquitos-jamon-500g.png',pw:756,ph:1000,peekAlt:'Taquitos de jamón curado de ElPozo, bandeja de 500 g'},
    {group:'El Pozo',brand:'El Pozo',name:'Salchichas hot dog · 1 kg (20 salchichas)',blk:'pozo',uso:'h',cod:'20033',peek:'assets/refrigerados/extra/elpozo_salchichas-hot-dog-1kg.png',pw:1000,ph:805,peekAlt:'Salchichas hot dog de ElPozo, paquete de 1 kg'},
    {group:'El Pozo',brand:'El Pozo',name:'Taquitos de jamón',blk:'pozo',uso:'a',cod:'20028'},
    {group:'El Pozo',brand:'El Pozo',name:'Jamón curado · 80 g',blk:'pozo',uso:'a',cod:'20025'},
    {group:'El Pozo',brand:'El Pozo',name:'Jamón cocido «1954» · 150 g',blk:'pozo',uso:'a',cod:'20024'}
  ];

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmtPrice = n => Number(n).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const price = p => { const e = window.PRECIOS && window.PRECIOS[`refrigerados|${p.group}|${p.name}`]; return e ? `<p class="rf-price"><b>${fmtPrice(e.p)} €</b> <small>${esc(e.u || 'ud.')}</small></p>` : ''; };
  const inBlock = (p, b) => p.blk.split(',').includes(b.id);
  const nav = document.querySelector('#rf-nav');
  const search = document.querySelector('#rf-search');
  const mount = document.querySelector('#rf-blocks');
  const count = document.querySelector('#rf-count');

  nav.innerHTML = blocks.map(b => `<a href="#bloque-${b.id}">${esc(b.chip)}</a>`).join('');

  const card = (p, showBrand) => {
    const i = p.name.indexOf(' · ');
    const title = i < 0 ? p.name : p.name.slice(0, i);
    const fmt = i < 0 ? '' : p.name.slice(i + 3);
    return `<li class="rf-card${p.image ? ' has-img' : ''}${p.plato ? ' has-plato' : ''}${p.peek ? ' has-peek' : ''}"${p.peek ? ' tabindex="0"' : ''}>${p.image ? `<figure class="rf-thumb"><img src="${esc(p.image)}" alt="${esc(p.alt || p.name)}" width="${p.w || 600}" height="${p.h || 600}" loading="lazy" decoding="async">${p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : ''}</figure>` : ''}<div class="rf-card-body">${showBrand ? `<span class="rf-brand">${esc(p.brand)}</span>` : ''}<h4>${esc(title)}</h4>${fmt ? `<p class="rf-fmt">${esc(fmt)}</p>` : ''}${p.plato ? `<p class="rf-plato"><b>Sugerencia de plato:</b> ${esc(p.plato)}</p>` : ''}${price(p)}</div>${p.peek ? `<figure class="rf-peek" aria-hidden="true" style="--pa:${p.pw || 1}/${p.ph || 3}"><img src="${esc(p.peek)}" alt="${esc(p.peekAlt || p.name)}" width="${p.pw || 200}" height="${p.ph || 600}" loading="lazy" decoding="async"></figure>` : ''}</li>`;
  };
  const list = (items, showBrand) => `<ul class="rf-grid">${items.map(p => card(p, showBrand)).join('')}</ul>`;
  const media = b => `<div class="rf-media${b.mosaic ? ' is-mosaic' : ''}">${b.media.map(m => `<img class="${esc(m.cls || '')}" src="${esc(m.src)}" alt="${esc(m.alt)}" width="${m.w}" height="${m.h}" loading="lazy" decoding="async">`).join('')}</div>`;

  function render() {
    const q = search.value.trim().toLocaleLowerCase('es');
    let total = 0;
    mount.innerHTML = blocks.map(b => {
      const items = products.filter(p => inBlock(p, b) && (!q || `${p.brand} ${p.name} ${p.group} ${p.plato || ''}`.toLocaleLowerCase('es').includes(q)));
      if (!items.length) return '';
      total += items.length;
      const brands = new Set(items.map(p => p.brand));
      const showBrand = brands.size > 1;
      const h = items.filter(p => p.uso === 'h'), a = items.filter(p => p.uso === 'a'), r = items.filter(p => p.uso !== 'h' && p.uso !== 'a');
      const body = (h.length && a.length)
        ? `<div class="rf-sub"><h3>Hostelería<small>Piezas, formatos grandes y uso profesional</small></h3>${list(h, showBrand)}</div><div class="rf-sub"><h3>Alimentación<small>Sobres y formatos de consumo</small></h3>${list(a, showBrand)}</div>${r.length ? list(r, showBrand) : ''}`
        : list(items, showBrand);
      return `<section class="rf-block" id="bloque-${b.id}" aria-labelledby="bloque-${b.id}-t"><div class="rf-head"><div class="rf-head-copy"><p class="rf-num">${b.n} <span>${esc(b.kicker)}</span></p><h2 id="bloque-${b.id}-t">${esc(b.title)}</h2><p class="rf-lead">${esc(b.lead)}</p><p class="rf-count-b">${items.length} ${items.length === 1 ? 'referencia' : 'referencias'}</p></div>${media(b)}</div>${body}</section>`;
    }).join('') || '<p class="rf-empty">No hay referencias con esa búsqueda. Prueba con otra palabra.</p>';
    count.textContent = `${total} ${total === 1 ? 'referencia' : 'referencias'}`;
  }
  search.addEventListener('input', render);
  render();
  if (location.hash.length > 1) setTimeout(() => { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); }, 120);
})();

/* La foto escondida sale al lado de la tarjeta: a la derecha si cabe y, si no, a la izquierda */
(function () {
  function place(e) {
    var c = e.target && e.target.closest && e.target.closest('.rf-card.has-peek');
    if (!c) return;
    var pk = c.querySelector('.rf-peek');
    if (!pk) return;
    var r = c.getBoundingClientRect(), w = pk.offsetWidth + 20, vw = document.documentElement.clientWidth;
    var right = vw - r.right, left = r.left;
    if (right >= w || right >= left) delete c.dataset.peek; else c.dataset.peek = 'left';
  }
  document.addEventListener('mouseover', place);
  document.addEventListener('focusin', place);
})();
