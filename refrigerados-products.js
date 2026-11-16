window.ProductWorld.init({
  mount:'#familias',
  sections:[
    {
      template:'hero', family:'Navidul', color:'#eadfd4', ink:'#432c2a',
      eyebrow:'01 · Navidul · Jamones y embutidos curados', title:'Navidul, el jamón en tu carta.',
      description:'Navidul, marca de jamones y embutidos curados. En la foto, jamón curado loncheado, curado en bodegas de Trujillo (Extremadura), según figura en el envase. Referencias y formatos a concretar al pedir.',
      backword:'NAVIDUL', bottom:'Imagen: jamón curado loncheado Navidul',
      product:{name:'Jamón curado loncheado',image:'assets/refrigerados/extra/navidul_jamones-chorizos-salchichones-y-lotes.webp',width:720,height:720,alt:'Envase de jamón curado loncheado Navidul'},
      cta:{label:'Ver las referencias',href:'#bloque-navidul'}
    },
    {
      template:'story', family:'Campofrío', color:'#e7dcd5', ink:'#432c2a',
      eyebrow:'02 · Campofrío · Fiambres y embutidos', title:'Para tu carta, con el sabor de siempre.',
      frames:[
        {name:'Chorizo',description:'Embutidos para raciones, tablas y elaboraciones de cocina.',image:'assets/marcas/campofrio-chorizo.webp',width:600,height:384,alt:'Envase de chorizo Campofrío',color:'#e3e4d6'},
        {name:'Salchichón',description:'Otra opción para completar la selección de fiambres y embutidos.',image:'assets/marcas/campofrio-salchichon.webp',width:600,height:384,alt:'Envase de salchichón Campofrío',color:'#e9e0d9'}
      ]
    },
    {
      template:'hero', family:'Reny Picot', color:'#dbeae4', ink:'#153b3c',
      eyebrow:'03 · Reny Picot · Quesos y untables', title:'Grandes formatos, para una cocina que no para.',
      description:'Reny Picot habla de «grandes formatos para grandes clientes que necesitan calidad y excelencia.» Quesos frescos, rallados y cremas para cocina y sala. Formatos de uso diario y opciones profesionales para preparar más.',
      backword:'FRESCO', bottom:'Imagen: queso crema Reny Picot de 2 kg',
      product:{name:'Queso crema natural · 2 kg',image:'assets/refrigerados/reny-crema-2kg.webp',width:1000,height:1000,alt:'Cubo de queso crema natural Reny Picot de 2 kg'},
      cta:{label:'Ver las referencias',href:'#bloque-reny-picot'}
    },
    {
      template:'range', family:'Pascual', color:'#edece3', ink:'#2b3d45',
      eyebrow:'04 · Pascual · Grasas y mantequillas', title:'Mantequilla y nata, para cada servicio.',
      description:'Mantequilla y nata de Pascual Profesional, como ingredientes de cocina y desayuno. Porciones, bloques y briks para el ritmo del servicio.',
      products:[
        {name:'Mantequilla 5 kg',description:'Bloque Pascual para una cocina de mayor volumen.',image:'assets/refrigerados/pascual-mantequilla-5kg.webp',width:385,height:268,alt:'Envase de mantequilla Pascual en bloque de 5 kg'},
        {name:'Nata para montar 1 l',description:'Brik Pascual de nata líquida al 38 % de materia grasa.',image:'assets/refrigerados/pascual-nata-38.webp',width:225,height:225,alt:'Brik de nata Pascual para montar de 1 litro al 38 por ciento'}
      ]
    }
  ]
});

(() => {
  'use strict';
  const pas = 'https://clientes.pascualprofesional.com/';
  const ren = 'https://www.renypicot.es/';
  const coe = 'https://coenyco.com/file/Productos_Coenyco.pdf';
  const products = [
    {group:'Preparados',brand:'Rogusa',name:'Callos a la madrileña · 2,5 kg',plato:'callos a la madrileña con garbanzos, servidos en cazuela de barro.',image:'assets/refrigerados/extra/rogusa_plato-callos.webp',width:674,height:549,imageAlt:'Plato de callos a la madrileña',imageCaption:'Sugerencia de plato: callos a la madrileña. Imagen de Rogusa, no del envase de 2,5 kg',desc:'Callos a la madrileña Rogusa, formato profesional de 2,5 kg. La marca habla de platos tradicionales «listos para ti» y de «calentar y saborear».',url:'https://www.aecoctrade.es/es/producto/fvfK8VleZxmABCimApEReM',source:'Ficha exacta',image:'assets/refrigerados/rogusa-callos.webp',imageAlt:'Envase Rogusa de callos preparados de 2,5 kg',imageCaption:'Fotografía del envase de 2,5 kg'},
    {group:'Preparados',brand:'Coenyco',name:'Oreja de cerdo cocida · 1 kg',plato:'oreja a la plancha con pimentón, o en salsa, para raciones y tapas.',image:'assets/refrigerados/extra/coenyco_oreja-de-cerdo-cocida-1kg.webp',width:720,height:720,desc:'Oreja cocida y troceada, envasada al vacío.',url:coe,source:'Catálogo de gama'},
    {group:'Preparados',brand:'Coenyco',name:'Oreja de cerdo cocida · 500 g',plato:'oreja a la plancha con pimentón, o en salsa, para raciones y tapas.',image:'assets/refrigerados/extra/coenyco_oreja-de-cerdo-cocida-500g.webp',width:720,height:720,desc:'Formato de medio kilo para cocina y raciones.',url:'https://soysuper.com/p/orejas-de-cerdo-cocidas-envase-500-gr-coenyco-envase-500-gr',source:'Ficha de producto'},
    {group:'Preparados',brand:'Coenyco',name:'Morro de cerdo cocido · 500 g',plato:'morro en salsa, o con garbanzos, en cazuela de barro.',image:'assets/refrigerados/extra/coenyco_morro-de-cerdo-cocido-500g.webp',width:703,height:703,desc:'Morro cocido y troceado, envasado al vacío.',url:'https://soysuper.com/p/morros-de-cerdo-cocidos-envase-500-gr-coenyco-envase-500-gr',source:'Ficha de producto'},
    {group:'Preparados',brand:'Coenyco',name:'Rabo de cerdo cocido · 500 g',plato:'rabo de cerdo guisado, en cazuela de barro.',image:'assets/refrigerados/extra/coenyco_rabo-de-cerdo-cocido-500g.webp',width:687,height:687,desc:'Referencia de casquería cocida. Confirma el formato al pedirla.',url:coe,source:'Catálogo de gama'},
    {group:'Preparados',brand:'Alvalle',name:'Gazpacho Original · 1 l',plato:'gazpacho bien frío, en vaso o en cuenco, como entrante.',image:'assets/refrigerados/extra/alvalle_gazpacho-original-1l.webp',width:720,height:720,desc:'Gazpacho Alvalle. Como dice la marca: «Sólo ingredientes naturales, y nada más.» También: «con respeto sabe mejor», con hortalizas de proximidad.',url:'https://www.alvalle.com/',source:'Web de marca'},
    {group:'Preparados',brand:'Alvalle',name:'Salmorejo Original · 1 l',plato:'salmorejo con huevo cocido y taquitos de jamón.',image:'assets/refrigerados/extra/alvalle_salmorejo-original-1l.webp',width:720,height:720,desc:'Salmorejo Alvalle, listo para la carta. Como dice la marca: «Sólo ingredientes naturales, y nada más.»',url:'https://www.alvalle.com/',source:'Web de marca'},
    {group:'Preparados',brand:'Buitoni',name:'Empanadillas y masa gruesa',plato:'empanadillas fritas o al horno, como tapa o ración.',image:'assets/refrigerados/extra/buitoni_empanadillas-y-masa-gruesa.webp',width:720,height:720,desc:'Empanadillas y masa Buitoni. Como dice la marca: «¡Con Buitoni triunfarás cada día!» Formatos: [POR CONFIRMAR] (se mantienen 160 g y 350 g como consulta).',url:'https://www.buitoni.es/',source:'Web de marca'},
    {group:'Preparados',brand:'Campofrío',name:'Tortilla de patata con cebolla · 500 g',uso:'hosteleria',image:'assets/refrigerados/extra/campofrio_tortilla-patata-cebolla-500g.webp',width:720,height:731,imageAlt:'Tortilla de patata con cebolla Campofrío de 500 g en su envase',desc:'Tortilla preparada; confirma presentación y disponibilidad.',url:'https://www.campofrio.es/marcas/campofrio',source:'Catálogo de marca'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla · microtarrinas de 10 g',uso:'hosteleria',image:'assets/refrigerados/extra/pascual_mantequilla-microtarrinas-10g.webp',width:223,height:223,desc:'Caja de 280 porciones individuales para desayunos y servicio.',url:pas+'L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables/c/MantequillayUntable',source:'Gama',note:'La página enlazada no identifica este envase.'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla · bloque de 5 kg',uso:'hosteleria',desc:'Formato para cocina y hostelería. Conservar refrigerada.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables//p/30000371-8410128000554',source:'Ficha exacta',image:'assets/refrigerados/pascual-mantequilla-5kg.webp',imageAlt:'Mantequilla Pascual en bloque de 5 kg',imageCaption:'Fotografía del bloque de 5 kg'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla · pastilla de 500 g',uso:'alimentacion',image:'assets/refrigerados/extra/pascual_mantequilla-pastilla-500g.webp',width:402,height:402,desc:'Mantequilla natural en formato pastilla.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables//p/30000378-8410128000547',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla · pastilla de 250 g',uso:'alimentacion',image:'assets/refrigerados/extra/pascual_mantequilla-pastilla-250g.webp',width:451,height:451,desc:'Formato compacto de mantequilla natural.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables//p/30013663-8410128000875',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla Original · tarrina de 250 g',uso:'alimentacion',image:'assets/refrigerados/extra/pascual_mantequilla-original-tarrina-250g.webp',width:471,height:471,desc:'Tarrina para untar o cocinar.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables/MANTEQ-PASC-TARR-250g-C12/p/30013627-8410128000578',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Nata montada en spray · 250 g',uso:'alimentacion',image:'assets/refrigerados/extra/pascual_nata-montada-en-spray-250g.webp',width:720,height:720,desc:'Aerosol para decorar postres y bebidas.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata//p/30012845-8410128050269',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Nata en spray · 500 g',uso:'alimentacion',image:'assets/refrigerados/extra/pascual_nata-en-spray-500g.webp',width:503,height:503,desc:'La ficha lo presenta como bote de 500 g, aunque el dato de cantidad indica 4 × 125 g. Confirma la presentación al pedirla.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata//p/30010726-8410128050191',source:'Ficha con datos distintos'},
    {group:'Pascual',brand:'Pascual',name:'Nata ligera 18 % · 500 ml',uso:'hosteleria',image:'assets/refrigerados/extra/pascual_nata-ligera-18-500ml.webp',width:720,height:720,desc:'Para cocinar salsas y cremas.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata/NATA-PASC-EDGE-500ML-18%25-MG-LIGERA-ND-C6/p/30014293-8410128055394',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Nata para montar · 1 l',uso:'hosteleria',desc:'Incluye referencias de nata líquida y 38 % M.G.; confirma la variante al pedir.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata/c/nata',source:'Gama',image:'assets/refrigerados/pascual-nata-38.webp',imageAlt:'Nata Pascual de un litro al 38 por ciento',imageCaption:'Fotografía de la variante 38 % M.G.'},
    {group:'Pascual',brand:'Pascual',name:'Nata para montar · 500 ml',uso:'hosteleria',image:'assets/refrigerados/extra/pascual_nata-para-montar-500ml.webp',width:720,height:720,desc:'Nata líquida con 35 % de materia grasa.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata//p/30013558-8410128055318',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Nata ligera para cocinar · 1 l',uso:'hosteleria',image:'assets/refrigerados/extra/pascual_nata-ligera-para-cocinar-1l.webp',width:720,height:720,desc:'Para salsas, cremas y otras elaboraciones.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata/c/nata',source:'Gama'},
    {group:'Pascual',brand:'Pascual',name:'Nata ligera para cocinar · 200 ml',uso:'alimentacion',image:'assets/refrigerados/extra/pascual_nata-ligera-para-cocinar-200ml.webp',width:720,height:720,desc:'Formato pequeño para preparaciones de cocina.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata/NATA-PASC-PR200-ML-18%25-MG-LIGERA-C18/p/30013881-8410128055356',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Huevo cocido · cubo de 70 unidades',image:'assets/refrigerados/extra/pascual_huevo-cocido-cubo-70unidades.webp',width:517,height:517,desc:'Huevos cocidos listos para consumir o incorporar a recetas.',url:pas+'calidadpascual/es/4%C2%AA-Gama%2C-Ingredientes-y-Conservas/Huevo/c/huevo',source:'Gama'},
    {group:'Pascual',brand:'Pascual',name:'Clara líquida pasteurizada',image:'assets/refrigerados/extra/pascual_clara-liquida-pasteurizada.webp',width:477,height:477,desc:'Referencias de 1 kg y 10 kg; la ficha enlazada corresponde a 1 kg.',url:pas+'calidadpascual/es/4%C2%AA-Gama%2C-Ingredientes-y-Conservas/Huevo/L%C3%ADquido/Clara-L%C3%ADquida-Pasteurizada-Pascual-1-Kg/p/30015689-8410128712020',source:'Ficha de 1 kg'},
    {group:'Pascual',brand:'Pascual',name:'Huevo líquido · 1 kg',image:'assets/refrigerados/extra/pascual_huevo-liquido-1kg.webp',width:477,height:477,desc:'Huevo pasteurizado líquido para cocina profesional.',url:pas+'calidadpascual/es/4%C2%AA-Gama%2C-Ingredientes-y-Conservas/Huevo/L%C3%ADquido/c/huevoLiquido',source:'Gama'},
    {group:'Pascual',brand:'Pascual',name:'Yema líquida',image:'assets/refrigerados/extra/pascual_yema-liquida.webp',width:477,height:477,desc:'Referencia facilitada de 1 l; formato por confirmar.',url:pas+'calidadpascual/es/4%C2%AA-Gama%2C-Ingredientes-y-Conservas/Huevo/L%C3%ADquido/c/huevoLiquido',source:'Gama'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Queso fresco de Burgos',uso:'hosteleria',desc:'Referencias de 4 × 62,5 g y brik de 1 kg. La fotografía muestra un envase de 500 g.',url:ren+'producto/queso-burgos-500g/',source:'Ficha de 500 g',image:'assets/refrigerados/reny-burgos-500.webp',imageAlt:'Queso fresco de Burgos Reny Picot, envase de 500 g',imageCaption:'Fotografía de un formato de 500 g'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Mozzarella · 150 g',uso:'alimentacion',image:'assets/refrigerados/extra/reny-picot_mozzarella-150g.webp',width:720,height:720,desc:'Queso mozzarella para pizzas y otras preparaciones.',url:ren+'queso-mozzarella-reny-picot-pizza/',source:'Referencia de gama'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Quesos rallados',uso:'hosteleria',image:'assets/refrigerados/extra/reny-picot_quesos-rallados.webp',width:720,height:720,desc:'Emmental, polvo, hilo y fundido; formatos de 60 g, 100 g y 1 kg para consulta.',url:ren+'lista-actualizada-productos-sin-gluten/',source:'Relación de gama'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Queso crema para untar',uso:'hosteleria',desc:'Formatos profesionales de 2 kg y 5 kg.',url:ren+'producto/queso-crema-natural-2kg/',source:'Ficha de 2 kg',image:'assets/refrigerados/reny-crema-2kg.webp',imageAlt:'Cubo de queso crema Reny Picot de 2 kg',imageCaption:'Fotografía del cubo de 2 kg'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Mantequilla',uso:'hosteleria',image:'assets/refrigerados/extra/reny-picot_mantequilla.webp',width:720,height:720,desc:'Bloque de 1 kg y porciones; confirma el formato de 10,4 g.',url:ren,source:'Web de marca'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Nata para montar · 200 ml',uso:'alimentacion',image:'assets/refrigerados/extra/reny-picot_nata-para-montar-200ml.webp',width:720,height:720,desc:'Referencia de nata líquida; presentación por confirmar.',url:ren,source:'Web de marca'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Queso de oveja Eminencia',uso:'hosteleria',image:'assets/refrigerados/extra/reny-picot_queso-de-oveja-eminencia.webp',width:720,height:720,desc:'Referencia de media pieza; ficha individual pendiente de confirmar.',url:ren,source:'Web de marca'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Queso en lonchas',uso:'alimentacion',image:'assets/refrigerados/extra/reny-picot_queso-en-lonchas.webp',width:720,height:720,desc:'Referencia de 8 unidades; formato por confirmar.',url:ren,source:'Web de marca'},
    {group:'Charcutería',brand:'ElPozo',name:'Bacon, paleta, taquitos y salchichas',image:'assets/refrigerados/extra/elpozo_bacon-paleta-taquitos-y-salchichas.webp',width:720,height:720,desc:'Gama refrigerada en distintos formatos de cocina y servicio.',url:'https://www.elpozo.com/',source:'Web de marca'},
    {group:'Charcutería',brand:'Navidul',name:'Piezas de jamón enteras y formatos grandes',desc:'Piezas enteras de jamón, formatos grandes y jamón de gran rendimiento, pensados para hostelería. Referencias, pesos y formatos [POR CONFIRMAR].',uso:'hosteleria'},
    {group:'Charcutería',brand:'Navidul',name:'Jamones, chorizos, salchichones y lotes',uso:'alimentacion',image:'assets/refrigerados/extra/navidul_jamones-chorizos-salchichones-y-lotes.webp',width:720,height:720,desc:'Jamón curado loncheado, salchichón, chorizo y demás, en sobres y formatos de consumo. Referencias y formatos [POR CONFIRMAR].'},
    {group:'Charcutería',brand:'Campofrío',name:'Piezas de fiambre y paleta · formatos de 500 g y 3 kg',desc:'Piezas de fiambre y paleta en formatos de medio kilo y de 3 kg, de uso en hostelería. Referencias y formatos [POR CONFIRMAR].',uso:'hosteleria'},
    {group:'Charcutería',brand:'Campofrío',name:'Sobres de fiambre y embutido',desc:'Sobres de fiambre y embutido para el consumo en alimentación. Referencias y formatos [POR CONFIRMAR].',uso:'alimentacion'},
    {group:'Charcutería',brand:'Campofrío',name:'Fiambres, bacon, pavo, quesos y ensaladilla',uso:'hosteleria',desc:'Gama refrigerada para bocadillos, raciones y cocina.',url:'https://www.campofrio.es/marcas/campofrio',source:'Catálogo de marca'},
    {group:'Charcutería',brand:'Revilla',name:'Salchichón, chorizo, torreznos y salami',image:'assets/refrigerados/extra/revilla_salchichon-chorizo-torreznos-y-salami.webp',width:720,height:720,desc:'Embutidos y aperitivos cárnicos; formatos por confirmar.',url:'https://www.campofrio.es/',source:'Web corporativa'},
    {group:'Charcutería',brand:'Oscar Mayer',name:'Salchichas Jumbo y bacon en lonchas',image:'assets/refrigerados/extra/oscar-mayer_salchichas-jumbo-y-bacon-en-lonchas.webp',width:720,height:720,desc:'Referencias refrigeradas de salchichas y bacon.',url:'https://www.campofrio.es/',source:'Web corporativa'},
    {group:'Otros',brand:'Holland',name:'Margarina vegetal · 1 kg',uso:'hosteleria',image:'assets/refrigerados/extra/holland_margarina-vegetal-1kg.webp',width:716,height:716,desc:'Referencia facilitada para consulta; ficha e imagen pendientes de verificar.',source:'Consultar'},
    {group:'Otros',brand:'Sin marca confirmada',name:'Queso fundido en lonchas · 131 g',image:'assets/refrigerados/extra/sin-marca-confirmada_queso-fundido-en-lonchas-131g.webp',width:720,height:720,desc:'Referencia de siete lonchas; marca por confirmar.',source:'Consultar'}
  ];

  /* orden de familias del ERP: 70 Nata, 73 Mantequilla, 76 Preparados, 79 Fiambres, 81 Campofrío y afines, 85 Queso, 93 Huevos */
  const famRank = p => {
    const n = p.name.toLocaleLowerCase('es');
    if (/^nata/.test(n)) return 70;
    if (/^mantequilla|^margarina/.test(n)) return 73;
    if (/callos|oreja|morro|rabo|gazpacho|salmorejo/.test(n)) return 76;
    if (p.brand === 'ElPozo') return 79;
    if (/huevo|clara|yema/.test(n)) return 93;
    if (/^queso|mozzarella/.test(n) || p.brand === 'Reny Picot') return 85;
    return 81;
  };

  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const blocks = [
    {id:'navidul',label:'Navidul',title:'Navidul',intro:'Jamones y embutidos curados.',test:p=>p.brand==='Navidul'},
    {id:'campofrio',label:'Campofrío',title:'Campofrío',intro:'Fiambres, bacon, pavo, ensaladilla y platos preparados.',test:p=>p.brand==='Campofrío'},
    {id:'reny-picot',label:'Reny Picot',title:'Reny Picot',intro:'Quesos, mantequilla y nata.',test:p=>p.brand==='Reny Picot'},
    {id:'pascual-grasas',label:'Grasas y mantequillas',title:'Pascual · grasas y mantequillas',intro:'Mantequilla y nata de Pascual, y margarina.',test:p=>(p.brand==='Pascual'&&/^(mantequilla|nata)/i.test(p.name))||p.brand==='Holland'},
    {id:'preparados',label:'Alimentos preparados',title:'Alimentos preparados',intro:'Rogusa, Coenyco y otros platos listos para la cocina.',test:p=>['Rogusa','Coenyco','Alvalle','Buitoni'].includes(p.brand)},
    {id:'otras',label:'Más referencias',title:'Más referencias',intro:'Otras marcas y referencias de la lista.',test:()=>true}
  ];
  const blockOf = p => blocks.find(b=>b.test(p));
  const bi = p => blocks.indexOf(blocks.find(b=>b.test(p)));
  products.sort((a, b) => bi(a) - bi(b) || famRank(a) - famRank(b));
  const groups = ['Todos',...blocks.map(b=>b.label)];
  const filters = document.querySelector('.cold-filters');
  const search = document.querySelector('#cold-search');
  const grid = document.querySelector('#cold-grid');
  const count = document.querySelector('#cold-count');
  let active = 'Todos';

  filters.innerHTML = groups.map(g => `<button type="button" data-group="${esc(g)}" aria-pressed="${g==='Todos'}">${esc(g)}</button>`).join('');
  const fmtPrice = n => Number(n).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const price = p => { const e = window.PRECIOS && window.PRECIOS[`refrigerados|${p.group}|${p.name}`]; return e ? `<p class="cold-price"><b>${fmtPrice(e.p)} €</b> <small>${esc(e.u || 'ud.')}</small></p>` : ''; };
  const card = p => `<article class="cold-item"><div class="cold-item-head"><span class="cold-brand">${esc(p.brand)}</span><span class="cold-category">${esc(p.group)}</span></div>${p.image ? `<div class="cold-item-image"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy"></div><p class="cold-image-caption">${esc(p.imageCaption)}</p>` : ''}<h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>${p.plato ? `<p class="cold-plato"><b>Sugerencia de plato:</b> ${esc(p.plato)}</p>` : ''}${p.note ? `<p>${esc(p.note)}</p>` : ''}${price(p)}<div class="cold-item-footer">${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Ver ${p.source.toLowerCase()} ↗</a>` : '<span>Consultar disponibilidad</span>'}<span>${['Ficha exacta','Ficha de producto','Ficha de 2 kg'].includes(p.source)?'Formato documentado':'Formato por confirmar'}</span></div></article>`;
  const usoHTML = items => {
    const h=items.filter(p=>p.uso==='hosteleria'),a=items.filter(p=>p.uso==='alimentacion');
    if(h.length&&a.length){
      const sub=(t,l,x)=>`<div class="cold-sub"><h4>${t}<small>${l}</small></h4><div class="cold-block-grid">${x.map(card).join('')}</div></div>`;
      const r=items.filter(p=>!p.uso);
      return sub('Hostelería','Piezas, formatos grandes y uso profesional',h)+sub('Alimentación','Sobres y formatos de consumo',a)+(r.length?`<div class="cold-sub"><div class="cold-block-grid">${r.map(card).join('')}</div></div>`:'');
    }
    return `<div class="cold-block-grid">${items.map(card).join('')}</div>`;
  };
  function render(){
    const q=search.value.trim().toLocaleLowerCase('es');
    const matches=products.filter(p=>(active==='Todos'||blockOf(p).label===active)&&(!q||`${p.brand} ${p.name} ${p.desc}`.toLocaleLowerCase('es').includes(q)));
    document.querySelectorAll('.cold-price-note').forEach(n=>n.remove());
    grid.innerHTML=blocks.map(b=>{
      const items=matches.filter(p=>blockOf(p)===b);
      if(!items.length)return '';
      const note=b.id==='preparados'&&items.some(p=>p.brand==='Coenyco')?'<p class="cold-price-note cold-brand-note">Coenyco. Desde 1980, casquería cocida al vacío.</p>':'';
      return `<section class="cold-block" id="bloque-${b.id}" aria-labelledby="bloque-${b.id}-t"><header class="cold-block-head"><h3 id="bloque-${b.id}-t">${esc(b.title)}</h3><p>${esc(b.intro)}</p><span>${items.length} ${items.length===1?'referencia':'referencias'}</span></header>${usoHTML(items)}${note}</section>`;
    }).join('')||'<p>No hay referencias con ese filtro. Prueba otra búsqueda.</p>';
    if (grid.querySelector('.cold-price')) grid.insertAdjacentHTML('afterend', '<p class="cold-price-note">Precios de tarifa por formato de venta. Pide tu tarifa personalizada, sin compromiso.</p>');
    count.textContent=`${matches.length} ${matches.length===1?'referencia':'referencias'}`;
  }
  filters.addEventListener('click',event=>{
    const button=event.target.closest('button[data-group]');
    if(!button)return;
    active=button.dataset.group;
    filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    render();
  });
  search.addEventListener('input',render);
  render();
})();
