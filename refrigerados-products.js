window.ProductWorld.init({
  mount:'#familias',
  sections:[
    {
      template:'hero', family:'Reny Picot', color:'#dbeae4', ink:'#153b3c',
      eyebrow:'01 · Quesos y untables', title:'Frescura que suma posibilidades.',
      description:'Quesos frescos, rallados y cremas para cocina y sala. Formatos de uso diario y opciones profesionales para preparar más.',
      backword:'FRESCO', bottom:'Imagen: queso crema Reny Picot de 2 kg',
      product:{name:'Queso crema natural · 2 kg',image:'assets/refrigerados/reny-crema-2kg.webp',width:1000,height:1000,alt:'Cubo de queso crema natural Reny Picot de 2 kg'},
      cta:{label:'Ver las referencias',href:'#referencias'}
    },
    {
      template:'range', family:'Pascual', color:'#edece3', ink:'#2b3d45',
      eyebrow:'02 · Mantequilla y nata', title:'Dos básicos, muchos servicios.',
      description:'Porciones, bloques y briks para dar respuesta a desayunos, cocina y repostería.',
      products:[
        {name:'Mantequilla 5 kg',description:'Bloque Pascual para una cocina de mayor volumen.',image:'assets/refrigerados/pascual-mantequilla-5kg.webp',width:240,height:168,alt:'Envase de mantequilla Pascual en bloque de 5 kg'},
        {name:'Nata para montar 1 l',description:'Brik Pascual de nata líquida al 38 % de materia grasa.',image:'assets/refrigerados/pascual-nata-38.webp',width:225,height:225,alt:'Brik de nata Pascual para montar de 1 litro al 38 por ciento'}
      ]
    },
    {
      template:'story', family:'Charcutería', color:'#e7dcd5', ink:'#432c2a',
      eyebrow:'03 · Fiambres y embutidos', title:'Listos para formar parte de tu carta.',
      frames:[
        {name:'Jamón cocido',description:'Una de las referencias de Campofrío para sándwiches, bocadillos y platos preparados.',image:'assets/marcas/campofrio-jamon-cocido.webp',width:624,height:414,alt:'Envase de jamón cocido Campofrío',color:'#e7dcd5'},
        {name:'Chorizo',description:'Embutidos para raciones, tablas y elaboraciones de cocina.',image:'assets/marcas/campofrio-chorizo.webp',width:600,height:384,alt:'Envase de chorizo Campofrío',color:'#e3e4d6'},
        {name:'Salchichón',description:'Otra opción para completar la selección de fiambres y embutidos.',image:'assets/marcas/campofrio-salchichon.webp',width:600,height:384,alt:'Envase de salchichón Campofrío',color:'#e9e0d9'}
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
    {group:'Preparados',brand:'Rogusa',name:'Callos a la madrileña · 2,5 kg',desc:'Callos cocinados y envasados en formato profesional.',url:'https://www.aecoctrade.es/es/producto/fvfK8VleZxmABCimApEReM',source:'Ficha exacta',image:'assets/refrigerados/rogusa-callos.webp',imageAlt:'Envase Rogusa de callos preparados de 2,5 kg',imageCaption:'Fotografía del envase de 2,5 kg'},
    {group:'Preparados',brand:'Coenyco',name:'Oreja de cerdo cocida · 1 kg',image:'assets/refrigerados/extra/coenyco_oreja-de-cerdo-cocida-1kg.webp',width:720,height:720,desc:'Oreja cocida y troceada, envasada al vacío.',url:coe,source:'Catálogo de gama'},
    {group:'Preparados',brand:'Coenyco',name:'Oreja de cerdo cocida · 500 g',image:'assets/refrigerados/extra/coenyco_oreja-de-cerdo-cocida-500g.webp',width:720,height:720,desc:'Formato de medio kilo para cocina y raciones.',url:'https://soysuper.com/p/orejas-de-cerdo-cocidas-envase-500-gr-coenyco-envase-500-gr',source:'Ficha de producto'},
    {group:'Preparados',brand:'Coenyco',name:'Morro de cerdo cocido · 500 g',image:'assets/refrigerados/extra/coenyco_morro-de-cerdo-cocido-500g.webp',width:703,height:703,desc:'Morro cocido y troceado, envasado al vacío.',url:'https://soysuper.com/p/morros-de-cerdo-cocidos-envase-500-gr-coenyco-envase-500-gr',source:'Ficha de producto'},
    {group:'Preparados',brand:'Coenyco',name:'Rabo de cerdo cocido · 500 g',image:'assets/refrigerados/extra/coenyco_rabo-de-cerdo-cocido-500g.webp',width:687,height:687,desc:'Referencia de casquería cocida. Confirma el formato al pedirla.',url:coe,source:'Catálogo de gama'},
    {group:'Preparados',brand:'Alvalle',name:'Gazpacho Original · 1 l',image:'assets/refrigerados/extra/alvalle_gazpacho-original-1l.webp',width:720,height:720,desc:'Sopa fría lista para servir.',url:'https://www.alvalle.com/',source:'Web de marca'},
    {group:'Preparados',brand:'Alvalle',name:'Salmorejo Original · 1 l',image:'assets/refrigerados/extra/alvalle_salmorejo-original-1l.webp',width:720,height:720,desc:'Salmorejo listo para incorporar a la carta.',url:'https://www.alvalle.com/',source:'Web de marca'},
    {group:'Preparados',brand:'Buitoni',name:'Empanadillas y masa gruesa',image:'assets/refrigerados/extra/buitoni_empanadillas-y-masa-gruesa.webp',width:720,height:720,desc:'Referencias de 160 g y 350 g facilitadas para consulta; formatos por confirmar.',url:'https://www.buitoni.es/',source:'Web de marca'},
    {group:'Preparados',brand:'Campofrío',name:'Tortilla de patata con cebolla · 500 g',desc:'Tortilla preparada; confirma presentación y disponibilidad.',url:'https://www.campofrio.es/marcas/campofrio',source:'Catálogo de marca'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla · microtarrinas de 10 g',image:'assets/refrigerados/extra/pascual_mantequilla-microtarrinas-10g.webp',width:223,height:223,desc:'Caja de 280 porciones individuales para desayunos y servicio.',url:pas+'L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables/c/MantequillayUntable',source:'Gama',note:'La página enlazada no identifica este envase.'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla · bloque de 5 kg',desc:'Formato para cocina y hostelería. Conservar refrigerada.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables//p/30000371-8410128000554',source:'Ficha exacta',image:'assets/refrigerados/pascual-mantequilla-5kg.webp',imageAlt:'Mantequilla Pascual en bloque de 5 kg',imageCaption:'Fotografía del bloque de 5 kg'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla · pastilla de 500 g',image:'assets/refrigerados/extra/pascual_mantequilla-pastilla-500g.webp',width:402,height:402,desc:'Mantequilla natural en formato pastilla.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables//p/30000378-8410128000547',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla · pastilla de 250 g',image:'assets/refrigerados/extra/pascual_mantequilla-pastilla-250g.webp',width:451,height:451,desc:'Formato compacto de mantequilla natural.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables//p/30013663-8410128000875',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Mantequilla Original · tarrina de 250 g',image:'assets/refrigerados/extra/pascual_mantequilla-original-tarrina-250g.webp',width:471,height:471,desc:'Tarrina para untar o cocinar.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Mantequilla-y-Untables/MANTEQ-PASC-TARR-250g-C12/p/30013627-8410128000578',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Nata montada en spray · 250 g',image:'assets/refrigerados/extra/pascual_nata-montada-en-spray-250g.webp',width:720,height:720,desc:'Aerosol para decorar postres y bebidas.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata//p/30012845-8410128050269',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Nata en spray · 500 g',image:'assets/refrigerados/extra/pascual_nata-en-spray-500g.webp',width:503,height:503,desc:'La ficha lo presenta como bote de 500 g, aunque el dato de cantidad indica 4 × 125 g. Confirma la presentación al pedirla.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata//p/30010726-8410128050191',source:'Ficha con datos distintos'},
    {group:'Pascual',brand:'Pascual',name:'Nata ligera 18 % · 500 ml',image:'assets/refrigerados/extra/pascual_nata-ligera-18-500ml.webp',width:720,height:720,desc:'Para cocinar salsas y cremas.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata/NATA-PASC-EDGE-500ML-18%25-MG-LIGERA-ND-C6/p/30014293-8410128055394',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Nata para montar · 1 l',desc:'Incluye referencias de nata líquida y 38 % M.G.; confirma la variante al pedir.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata/c/nata',source:'Gama',image:'assets/refrigerados/pascual-nata-38.webp',imageAlt:'Nata Pascual de un litro al 38 por ciento',imageCaption:'Fotografía de la variante 38 % M.G.'},
    {group:'Pascual',brand:'Pascual',name:'Nata para montar · 500 ml',image:'assets/refrigerados/extra/pascual_nata-para-montar-500ml.webp',width:720,height:720,desc:'Nata líquida con 35 % de materia grasa.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata//p/30013558-8410128055318',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Nata ligera para cocinar · 1 l',image:'assets/refrigerados/extra/pascual_nata-ligera-para-cocinar-1l.webp',width:720,height:720,desc:'Para salsas, cremas y otras elaboraciones.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata/c/nata',source:'Gama'},
    {group:'Pascual',brand:'Pascual',name:'Nata ligera para cocinar · 200 ml',image:'assets/refrigerados/extra/pascual_nata-ligera-para-cocinar-200ml.webp',width:720,height:720,desc:'Formato pequeño para preparaciones de cocina.',url:pas+'calidadpascual/es/L%C3%A1cteos-y-Bebidas-Vegetales/Nata/NATA-PASC-PR200-ML-18%25-MG-LIGERA-C18/p/30013881-8410128055356',source:'Ficha exacta'},
    {group:'Pascual',brand:'Pascual',name:'Huevo cocido · cubo de 70 unidades',image:'assets/refrigerados/extra/pascual_huevo-cocido-cubo-70unidades.webp',width:517,height:517,desc:'Huevos cocidos listos para consumir o incorporar a recetas.',url:pas+'calidadpascual/es/4%C2%AA-Gama%2C-Ingredientes-y-Conservas/Huevo/c/huevo',source:'Gama'},
    {group:'Pascual',brand:'Pascual',name:'Clara líquida pasteurizada',image:'assets/refrigerados/extra/pascual_clara-liquida-pasteurizada.webp',width:477,height:477,desc:'Referencias de 1 kg y 10 kg; la ficha enlazada corresponde a 1 kg.',url:pas+'calidadpascual/es/4%C2%AA-Gama%2C-Ingredientes-y-Conservas/Huevo/L%C3%ADquido/Clara-L%C3%ADquida-Pasteurizada-Pascual-1-Kg/p/30015689-8410128712020',source:'Ficha de 1 kg'},
    {group:'Pascual',brand:'Pascual',name:'Huevo líquido · 1 kg',image:'assets/refrigerados/extra/pascual_huevo-liquido-1kg.webp',width:477,height:477,desc:'Huevo pasteurizado líquido para cocina profesional.',url:pas+'calidadpascual/es/4%C2%AA-Gama%2C-Ingredientes-y-Conservas/Huevo/L%C3%ADquido/c/huevoLiquido',source:'Gama'},
    {group:'Pascual',brand:'Pascual',name:'Yema líquida',image:'assets/refrigerados/extra/pascual_yema-liquida.webp',width:477,height:477,desc:'Referencia facilitada de 1 l; formato por confirmar.',url:pas+'calidadpascual/es/4%C2%AA-Gama%2C-Ingredientes-y-Conservas/Huevo/L%C3%ADquido/c/huevoLiquido',source:'Gama'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Queso fresco de Burgos',desc:'Referencias de 4 × 62,5 g y brik de 1 kg. La fotografía muestra un envase de 500 g.',url:ren+'producto/queso-burgos-500g/',source:'Ficha de 500 g',image:'assets/refrigerados/reny-burgos-500.webp',imageAlt:'Queso fresco de Burgos Reny Picot, envase de 500 g',imageCaption:'Fotografía de un formato de 500 g'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Mozzarella · 150 g',image:'assets/refrigerados/extra/reny-picot_mozzarella-150g.webp',width:720,height:720,desc:'Queso mozzarella para pizzas y otras preparaciones.',url:ren+'queso-mozzarella-reny-picot-pizza/',source:'Referencia de gama'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Quesos rallados',image:'assets/refrigerados/extra/reny-picot_quesos-rallados.webp',width:720,height:720,desc:'Emmental, polvo, hilo y fundido; formatos de 60 g, 100 g y 1 kg para consulta.',url:ren+'lista-actualizada-productos-sin-gluten/',source:'Relación de gama'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Queso crema para untar',desc:'Formatos profesionales de 2 kg y 5 kg.',url:ren+'producto/queso-crema-natural-2kg/',source:'Ficha de 2 kg',image:'assets/refrigerados/reny-crema-2kg.webp',imageAlt:'Cubo de queso crema Reny Picot de 2 kg',imageCaption:'Fotografía del cubo de 2 kg'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Mantequilla',image:'assets/refrigerados/extra/reny-picot_mantequilla.webp',width:720,height:720,desc:'Bloque de 1 kg y porciones; confirma el formato de 10,4 g.',url:ren,source:'Web de marca'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Nata para montar · 200 ml',image:'assets/refrigerados/extra/reny-picot_nata-para-montar-200ml.webp',width:720,height:720,desc:'Referencia de nata líquida; presentación por confirmar.',url:ren,source:'Web de marca'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Queso de oveja Eminencia',image:'assets/refrigerados/extra/reny-picot_queso-de-oveja-eminencia.webp',width:720,height:720,desc:'Referencia de media pieza; ficha individual pendiente de confirmar.',url:ren,source:'Web de marca'},
    {group:'Reny Picot',brand:'Reny Picot',name:'Queso en lonchas',image:'assets/refrigerados/extra/reny-picot_queso-en-lonchas.webp',width:720,height:720,desc:'Referencia de 8 unidades; formato por confirmar.',url:ren,source:'Web de marca'},
    {group:'Charcutería',brand:'ElPozo',name:'Bacon, paleta, taquitos y salchichas',image:'assets/refrigerados/extra/elpozo_bacon-paleta-taquitos-y-salchichas.webp',width:720,height:720,desc:'Gama refrigerada en distintos formatos de cocina y servicio.',url:'https://www.elpozo.com/',source:'Web de marca'},
    {group:'Charcutería',brand:'Navidul',name:'Jamones, chorizos, salchichones y lotes',image:'assets/refrigerados/extra/navidul_jamones-chorizos-salchichones-y-lotes.webp',width:720,height:720,desc:'Familia de curados; referencias y formatos a concretar.',url:'https://www.campofrio.es/',source:'Web corporativa'},
    {group:'Charcutería',brand:'Campofrío',name:'Fiambres, bacon, pavo, quesos y ensaladilla',desc:'Gama refrigerada para bocadillos, raciones y cocina.',url:'https://www.campofrio.es/marcas/campofrio',source:'Catálogo de marca',image:'assets/marcas/campofrio-jamon-cocido.webp',imageAlt:'Envase de jamón cocido Campofrío',imageCaption:'Fotografía de jamón cocido'},
    {group:'Charcutería',brand:'Revilla',name:'Salchichón, chorizo, torreznos y salami',image:'assets/refrigerados/extra/revilla_salchichon-chorizo-torreznos-y-salami.webp',width:720,height:720,desc:'Embutidos y aperitivos cárnicos; formatos por confirmar.',url:'https://www.campofrio.es/',source:'Web corporativa'},
    {group:'Charcutería',brand:'Oscar Mayer',name:'Salchichas Jumbo y bacon en lonchas',image:'assets/refrigerados/extra/oscar-mayer_salchichas-jumbo-y-bacon-en-lonchas.webp',width:720,height:720,desc:'Referencias refrigeradas de salchichas y bacon.',url:'https://www.campofrio.es/',source:'Web corporativa'},
    {group:'Otros',brand:'Holland',name:'Margarina vegetal · 1 kg',image:'assets/refrigerados/extra/holland_margarina-vegetal-1kg.webp',width:716,height:716,desc:'Referencia facilitada para consulta; ficha e imagen pendientes de verificar.',source:'Consultar'},
    {group:'Otros',brand:'Sin marca confirmada',name:'Queso fundido en lonchas · 131 g',image:'assets/refrigerados/extra/sin-marca-confirmada_queso-fundido-en-lonchas-131g.webp',width:720,height:720,desc:'Referencia de siete lonchas; marca por confirmar.',source:'Consultar'}
  ];

  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const groups = ['Todos','Preparados','Pascual','Reny Picot','Charcutería','Otros'];
  const filters = document.querySelector('.cold-filters');
  const search = document.querySelector('#cold-search');
  const grid = document.querySelector('#cold-grid');
  const count = document.querySelector('#cold-count');
  let active = 'Todos';

  filters.innerHTML = groups.map(g => `<button type="button" data-group="${esc(g)}" aria-pressed="${g==='Todos'}">${esc(g)}</button>`).join('');
  const fmtPrice = n => Number(n).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const price = p => { const e = window.PRECIOS && window.PRECIOS[`refrigerados|${p.group}|${p.name}`]; return e ? `<p class="cold-price"><b>${fmtPrice(e.p)} €</b> <small>${esc(e.u || 'ud.')}</small></p>` : ''; };
  const card = p => `<article class="cold-item"><div class="cold-item-head"><span class="cold-brand">${esc(p.brand)}</span><span class="cold-category">${esc(p.group)}</span></div>${p.image ? `<div class="cold-item-image"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy"></div><p class="cold-image-caption">${esc(p.imageCaption)}</p>` : ''}<h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>${p.note ? `<p>${esc(p.note)}</p>` : ''}${price(p)}<div class="cold-item-footer">${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Ver ${p.source.toLowerCase()} ↗</a>` : '<span>Consultar disponibilidad</span>'}<span>${['Ficha exacta','Ficha de producto','Ficha de 2 kg'].includes(p.source)?'Formato documentado':'Formato por confirmar'}</span></div></article>`;
  function render(){
    const q=search.value.trim().toLocaleLowerCase('es');
    const matches=products.filter(p=>(active==='Todos'||p.group===active)&&(!q||`${p.brand} ${p.name} ${p.desc}`.toLocaleLowerCase('es').includes(q)));
    grid.innerHTML=matches.map(card).join('')||'<p>No hay referencias con ese filtro. Prueba otra búsqueda.</p>';
    if (!document.querySelector('.cold-price-note') && grid.querySelector('.cold-price')) grid.insertAdjacentHTML('afterend', '<p class="cold-price-note">Precios de tarifa por formato de venta. Pide tu tarifa personalizada, sin compromiso.</p>');
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
