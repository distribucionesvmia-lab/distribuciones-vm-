window.ProductWorld.init({
  mount: '#familias',
  order: ['Pedras','Bezoya','S.Pellegrino','Aquarel','Perrier'],
  sections: [
    {
      template:'hero', family:'Bezoya', color:'#cceef4', ink:'#103b50',
      eyebrow:'Agua mineral natural', title:'Ligera desde el origen.',
      description:'Agua Mineral Natural de Mineralización **muy débil** procedente de los manantiales de Bezoya y Bezoya Trescasas, ubicados en Segovia.',
      backword:'BEZOYA', bottom:'01 — Agua sin gas',
      product:{name:'Bezoya · botella de vidrio', image:'assets/agua/bezoya-vidrio.png', width:299, height:975, alt:'Botella de vidrio Bezoya'},
      faq:{q:'¿En qué se diferencia Bezoya del resto de aguas minerales?', a:'Bezoya es un agua de mineralización **muy** débil con **muy** bajo residuo seco (27mg/l), lo que la diferencia de la gran mayoría de las aguas, y en especial de las de mineralización débil, cuyo residuo seco oscila entre los 50 y los 500mg/l.'},
      orbitLabel:'Formatos Bezoya',
      orbit:[
        {name:'Bezoya · 33 cl', image:'assets/agua/bezoya-330cl.png', width:420, height:420, alt:'Botella Bezoya de 33 cl'},
        {name:'Bezoya · 33 cl con tapón sport', image:'assets/agua/bezoya-330cl-sport.png', width:420, height:420, alt:'Botella Bezoya de 33 cl con tapón sport'},
        {name:'Bezoya · 50 cl', image:'assets/agua/bezoya-50cl.png', width:420, height:420, alt:'Botella Bezoya de 50 cl'},
        {name:'Bezoya · 50 cl con tapón sport', image:'assets/agua/bezoya-50cl-sport.png', width:420, height:420, alt:'Botella Bezoya de 50 cl con tapón sport'},
        {name:'Bezoya · 5 L', image:'assets/agua/bezoya-5l.png', width:420, height:420, alt:'Garrafa Bezoya de 5 litros'},
        {name:'Bezoya · bag in box de 8 L', image:'assets/agua/bezoya-bib-8l.png', width:420, height:420, alt:'Bag in box Bezoya de 8 litros'}
      ]
    },
    {
      template:'range', family:'Nestlé Aquarel', color:'#e8f3e7', ink:'#194a43',
      eyebrow:'Tres formatos para cada ocasión', title:'Reconecta con lo natural.',
      description:'Brota de Reservas de la Biosfera de la UNESCO. Un formato para compartir (1,5 L) y dos para el servicio individual (50 cl y 33 cl).',
      products:[
        {name:'1,5 litros',description:'Formato para compartir.',image:'assets/agua/aquarel-15.png',width:1200,height:1200,alt:'Botella Nestlé Aquarel de 1,5 litros'},
        {name:'50 cl',description:'Formato individual.',image:'assets/agua/aquarel-50.png',width:600,height:600,alt:'Botella Nestlé Aquarel de 50 centilitros'},
        {name:'33 cl',description:'Formato individual pequeño.',image:'assets/agua/aquarel-33.png',width:600,height:600,alt:'Botella Nestlé Aquarel de 33 centilitros'}
      ]
    },
    {
      template:'hero', family:'S.Pellegrino', color:'#69c5d7', ink:'#082d3e',
      eyebrow:'Alta restauración', title:'Lo que se trae a la mesa.',
      description:'«Lo que cuenta es lo que cada uno trae a la mesa.» Agua mineral natural con gas, en la botella de vidrio de la alta restauración: 25 cl, 50 cl y 75 cl.',
      backword:'ITALIA', bottom:'03 — S.Pellegrino · 75 cl',
      product:{name:'S.Pellegrino · 75 cl',image:'assets/agua/sanpellegrino-75cl.png',width:248,height:895,alt:'Botella de vidrio S.Pellegrino de 75 centilitros'}
    },
    {
      template:'range', family:'S.Pellegrino', color:'#d7eef3', ink:'#0c3447',
      eyebrow:'Más formatos', title:'Para cada servicio.',
      description:'Más formatos en botella de vidrio: S.Pellegrino en 25 cl, en 50 cl y en 75 cl.',
      products:[
        {name:'25 cl',description:'Botella de vidrio individual.',image:'assets/agua/sanpellegrino-25cl.png',width:186,height:560,alt:'Botella de vidrio S.Pellegrino de 25 centilitros'},
        {name:'50 cl',description:'Botella de vidrio de formato medio.',image:'assets/agua/sanpellegrino-50cl.png',width:245,height:900,alt:'Botella de vidrio S.Pellegrino de 50 centilitros'},
        {name:'75 cl',description:'Botella de vidrio de 75 cl, para compartir en la mesa.',image:'assets/agua/sanpellegrino-75cl.png',width:248,height:895,alt:'Botella de vidrio S.Pellegrino de 75 centilitros'}
      ]
    },
    {
      template:'editorial', family:'S.Pellegrino', color:'#e9f4f6', ink:'#0c3447', columns:3,
      eyebrow:'En la mesa', title:'Donde se cuida cada detalle.',
      description:'Los tres formatos de S.Pellegrino, en el servicio de la alta restauración.',
      products:[
        {name:'25 cl',description:'Formato individual, para la barra y el servicio.',image:'assets/agua/sanpellegrino-mesa-25cl.png',width:400,height:400,cover:true,alt:'Botella S.Pellegrino de 25 cl sobre una barra'},
        {name:'50 cl',description:'Formato de 50 cl, para la mesa.',image:'assets/agua/sanpellegrino-mesa-50cl.png',width:400,height:400,cover:true,alt:'Botella S.Pellegrino de 50 cl en una mesa servida'},
        {name:'75 cl',description:'Formato de 75 cl, para compartir.',image:'assets/agua/sanpellegrino-mesa-75cl.png',width:400,height:400,cover:true,alt:'Botella S.Pellegrino de 75 cl en una mesa de restaurante'}
      ]
    },
    {
      template:'story', family:'Pedras', color:'#dcead3', ink:'#173b30',
      eyebrow:'Agua con gas y sabores', title:'Un agua con gas 100 % natural.',
      frames:[
        {name:'Pedras Limón',description:'Una propuesta con limón para ampliar la carta de bebidas.',image:'assets/agua/pedras-limao-botella.png',width:126,height:408,alt:'Botella Pedras con limón',color:'#f1e9aa'},
        {name:'Frutos rojos',description:'Pedras con frutos rojos, otra expresión de la gama.',image:'assets/agua/pedras-frutos-vermelhos-botella.png',width:133,height:428,alt:'Botella Pedras de frutos rojos',color:'#e8d8d9'},
        {name:'Pedras Mandarina',description:'Pedras con mandarina, otra expresión de la gama.',image:'assets/agua/pedras-tangerina-botella.png',width:133,height:428,alt:'Botella Pedras de mandarina',color:'#f8e0bd'},
        {name:'Pedras Salgadas',description:'Pedras Salgadas, «un agua con gas 100 % natural», de origen natural. El vidrio forma parte de su propuesta para la restauración. Es el agua base de los sabores anteriores.',image:'assets/agua/pedras-75-alt.png',width:800,height:1200,alt:'Botella Pedras Salgadas de 75 centilitros',color:'#dcead3'}
      ]
    },
    {
      template:'range', family:'Perrier', color:'#d9efdc', ink:'#0d4a2a',
      eyebrow:'Agua mineral natural con gas', title:'La burbuja Perrier.',
      description:'Perrier, en su botella de vidrio verde de 33 cl y 75 cl.',
      products:[
        {name:'33 cl',description:'Botella de vidrio individual.',image:'assets/agua/perrier-33cl.png',width:328,height:900,alt:'Botella de vidrio Perrier de 33 centilitros'},
        {name:'75 cl',description:'Botella de vidrio de 75 cl.',image:'assets/agua/perrier-botella-grande.png',width:286,height:900,alt:'Botella de vidrio Perrier de 75 centilitros'}
      ]
    }
  ]
});
