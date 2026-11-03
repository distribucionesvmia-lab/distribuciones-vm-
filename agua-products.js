window.ProductWorld.init({
  mount: '#familias',
  order: ['Bezoya','Pedras','Aquarel','S.Pellegrino','Perrier'],
  sections: [
    {
      template:'hero', family:'Bezoya', color:'#cceef4', ink:'#103b50',
      eyebrow:'Agua mineral natural', title:'Ligera desde el origen.',
      description:'Bezoya procede de manantiales de Segovia. Su mineralización muy débil acompaña el día a día en distintos formatos.',
      backword:'BEZOYA', bottom:'01 — Agua sin gas',
      product:{name:'Bezoya · 1,5 L', image:'assets/agua/bezoya-cutout.webp', width:1254, height:1254, alt:'Botella Bezoya de 1,5 litros'}
    },
    {
      template:'range', family:'Nestlé Aquarel', color:'#e8f3e7', ink:'#194a43',
      eyebrow:'Dos formatos para cada ocasión', title:'Aquarel, a tu medida.',
      description:'Una botella para compartir y otra para llevar. Elige el formato que encaja con cada servicio.',
      products:[
        {name:'1,5 litros',description:'Formato para compartir.',image:'assets/agua/aquarel-15.webp',width:1200,height:1200,alt:'Botella Nestlé Aquarel de 1,5 litros'},
        {name:'50 cl',description:'Formato individual.',image:'assets/agua/aquarel-50.webp',width:600,height:600,alt:'Botella Nestlé Aquarel de 50 centilitros'}
      ]
    },
    {
      template:'hero', family:'S.Pellegrino', color:'#69c5d7', ink:'#082d3e',
      eyebrow:'Alta restauración', title:'El agua con gas más internacional.',
      description:'S.Pellegrino es el agua con gas más internacional y de más categoría, presente en la alta restauración. Botella de vidrio en tres formatos: 25 cl, 50 cl y 75 cl.',
      backword:'ITALIA', bottom:'03 — S.Pellegrino · 75 cl',
      product:{name:'S.Pellegrino · 75 cl',image:'assets/agua/sanpellegrino-75cl.webp',width:248,height:895,alt:'Botella de vidrio S.Pellegrino de 75 centilitros'}
    },
    {
      template:'range', family:'S.Pellegrino', color:'#d7eef3', ink:'#0c3447',
      eyebrow:'Más formatos', title:'Para cada servicio.',
      description:'Además del 75 cl, S.Pellegrino en botella de vidrio de 25 cl y de 50 cl.',
      products:[
        {name:'25 cl',description:'Botella de vidrio individual.',image:'assets/agua/sanpellegrino-25cl.webp',width:186,height:560,alt:'Botella de vidrio S.Pellegrino de 25 centilitros'},
        {name:'50 cl',description:'Botella de vidrio de formato medio.',image:'assets/agua/sanpellegrino-50cl.webp',width:245,height:900,alt:'Botella de vidrio S.Pellegrino de 50 centilitros'}
      ]
    },
    {
      template:'editorial', family:'S.Pellegrino', color:'#e9f4f6', ink:'#0c3447', columns:3,
      eyebrow:'En la mesa', title:'Donde se cuida cada detalle.',
      description:'Los tres formatos de S.Pellegrino, en el servicio de la alta restauración.',
      products:[
        {name:'25 cl',description:'Formato individual, para la barra y el servicio.',image:'assets/agua/sanpellegrino-mesa-25cl.webp',width:400,height:400,cover:true,alt:'Botella S.Pellegrino de 25 cl sobre una barra'},
        {name:'50 cl',description:'Formato de 50 cl, para la mesa.',image:'assets/agua/sanpellegrino-mesa-50cl.webp',width:400,height:400,cover:true,alt:'Botella S.Pellegrino de 50 cl en una mesa servida'},
        {name:'75 cl',description:'Formato de 75 cl, para compartir.',image:'assets/agua/sanpellegrino-mesa-75cl.webp',width:400,height:400,cover:true,alt:'Botella S.Pellegrino de 75 cl en una mesa de restaurante'}
      ]
    },
    {
      template:'story', family:'Pedras', color:'#dcead3', ink:'#173b30',
      eyebrow:'Agua con gas y sabores', title:'Una forma distinta de brindar.',
      frames:[
        {name:'Pedras Salgadas',description:'Agua mineral con gas de origen natural, presentada en botella de vidrio.',image:'assets/agua/pedras-75-alt.webp',width:800,height:1200,alt:'Botella Pedras Salgadas de 75 centilitros',color:'#dcead3'},
        {name:'Pedras Limão',description:'Una propuesta con limón para ampliar la carta de bebidas.',image:'assets/agua/pedras-limao-botella.webp',width:126,height:408,alt:'Botella Pedras con limón',color:'#f1e9aa'},
        {name:'Frutos vermelhos',description:'Pedras con frutos rojos, otra expresión de la gama.',image:'assets/agua/pedras-frutos-vermelhos-botella.webp',width:133,height:428,alt:'Botella Pedras Frutos Vermelhos con frutos rojos',color:'#e8d8d9'},
        {name:'Pedras Tangerina',description:'Pedras con mandarina, otra expresión de la gama.',image:'assets/agua/pedras-tangerina-botella.webp',width:133,height:428,alt:'Botella Pedras Tangerina con mandarina',color:'#f8e0bd'}
      ]
    },
    {
      template:'range', family:'Perrier', color:'#d9efdc', ink:'#0d4a2a',
      eyebrow:'Agua mineral natural con gas', title:'La burbuja Perrier.',
      description:'Perrier en botella de vidrio, en dos formatos.',
      products:[
        {name:'33 cl',description:'Botella de vidrio individual.',image:'assets/agua/perrier-33cl.webp',width:328,height:900,alt:'Botella de vidrio Perrier de 33 centilitros'},
        {name:'75 cl',description:'Botella de vidrio de 75 cl.',image:'assets/agua/perrier-botella-grande.webp',width:286,height:900,alt:'Botella de vidrio Perrier de 75 centilitros'}
      ]
    }
  ]
});
