/* Misma arquitectura de escenas que Pascual. Fotografías de botella sustituibles en este archivo. */
const B = 'assets/vinos/';
window.ProductWorld.init({
  mount: '#familias',
  order: ['Bodega Palacio','Tintos','Blancos','Frizzantes','Espumosos','Pazos','Otras'],
  sections: [
    {
      template:'hero', family:'Palacio de Bornos', color:'#eba061', ink:'#251d17',
      eyebrow:'Bodega Palacio de Bornos', title:'Verdejo. El origen en primer plano.',
      description:'Palacio de Bornos Verdejo 2025, de la D.O. Rueda, en botella de 75 cl. Disponible también con tapón de rosca. Abre el recorrido por toda la bodega: blancos, frizzantes, tintos de Ribera y espumosos.',
      backword:'RUEDA', bottom:'01 — Palacio de Bornos',
      product:{name:'Palacio de Bornos Verdejo 2025 · 75 cl', image:'assets/marcas/bornos-verdejo.webp', width:187, height:622, alt:'Botella original de Palacio de Bornos Verdejo'}
    },
    {
      template:'lineup', family:'Palacio de Bornos', color:'#efe5d3', ink:'#392b1f',
      eyebrow:'Palacio de Bornos · Blancos', title:'Los blancos de Rueda.',
      note:'Una imagen por variedad',
      variants:[
        {name:'La Caprichosa · Verdejo 2025', description:'Verdejo sobre lías de Palacio de Bornos.', image:B+'la-caprichosa-verdejo.webp', width:119, height:478, alt:'Botella La Caprichosa Verdejo sobre lías'},
        {name:'Verdejo fermentado en barrica · 2023', description:'Blanco de Palacio de Bornos fermentado en barrica.', image:'assets/marcas/bornos-fermentado.webp', width:270, height:612, alt:'Botella Palacio de Bornos Verdejo fermentado en barrica'},
        {name:'Bornos Semidulce Verdejo', description:'Verdejo semidulce de Palacio de Bornos.', image:B+'bornos-semidulce-verdejo.webp', width:135, height:546, alt:'Botella Palacio de Bornos Verdejo Semidulce'},
        {name:'Sauvignon Blanc', description:'Palacio de Bornos Sauvignon Blanc.', image:'assets/marcas/bornos-sauvignon-2025.webp', width:270, height:612, alt:'Botella Palacio de Bornos Sauvignon Blanc'}
      ]
    },
    {
      template:'lineup', family:'Palacio de Bornos', color:'#ee8a33', ink:'#281c16',
      eyebrow:'Palacio de Bornos · Frizzantes', title:'Frizzante, fresco y ligero.',
      note:'Una imagen por variedad',
      variants:[
        {name:'Bornos Frizzante Verdejo · 5,5 º', description:'Frizzante Verdejo de Palacio de Bornos.', image:B+'bornos-frizzante-cutout.webp', width:430, height:1070, alt:'Botella Palacio de Bornos Frizzante Verdejo'},
        {name:'Bornos Rosado Frizzante · 5,5 º', description:'Frizzante rosado de Palacio de Bornos.', image:B+'bornos-rosado-frizzante.webp', width:206, height:746, alt:'Botella Bornos Frizzante Rosado 5,5 grados'},
        {name:'Laué Frizzante Verdejo · lata de 250 ml', description:'Frizzante Verdejo de Palacio de Bornos en lata.', image:B+'laue-frizzante.webp', width:260, height:570, alt:'Lata Laué Frizzante Verdejo'},
        {name:'Laué Frizzante Verdejo · pack de 4 latas de 250 ml', description:'Pack de cuatro latas de Laué Frizzante Verdejo. Imagen de una lata individual.', image:B+'laue-frizzante.webp', width:260, height:570, alt:'Lata Laué Frizzante Verdejo, imagen del formato individual'}
      ]
    },
    {
      template:'lineup', family:'Bornos · Ribera del Duero', color:'#e8ddd0', ink:'#3a1f1a',
      eyebrow:'Palacio de Bornos · Tintos', title:'Tintos de Ribera.',
      note:'Una imagen por variedad',
      variants:[
        {name:'Dominio de Bornos Roble · 2024', description:'Tinto roble 2024 de Dominio de Bornos.', image:B+'dominio-de-bornos-roble.webp', width:128, height:494, alt:'Botella Dominio de Bornos Roble, Ribera del Duero'},
        {name:'Lleiroso Crianza · 2022', description:'Lleiroso Crianza 2022, Ribera del Duero.', image:B+'lleiroso-crianza-tempranillo.webp', width:130, height:489, alt:'Botella Lleiroso Crianza, Ribera del Duero'},
        {name:'Lleiroso Reserva · 2021', description:'Lleiroso Reserva 2021, Ribera del Duero.', image:B+'lleiroso-reserva-2021.webp', width:130, height:490, alt:'Botella Lleiroso Reserva, Ribera del Duero'},
        {name:'Lleiroso Crianza · Magnum 2021', description:'Lleiroso Crianza 2021 en formato magnum, Ribera del Duero. Imagen de la botella estándar.', image:B+'lleiroso-crianza-tempranillo.webp', width:130, height:489, alt:'Botella Lleiroso Crianza, imagen del formato estándar'}
      ]
    },
    {
      template:'lineup', family:'Palacio de Bornos', color:'#f3ead6', ink:'#2f2a1c',
      eyebrow:'Palacio de Bornos · Espumosos', title:'Para brindar.',
      note:'Una imagen por variedad',
      variants:[
        {name:'Espumoso Palacio de Bornos Brut', description:'Vino espumoso Brut de Palacio de Bornos.', image:B+'bornos-espumoso-brut.webp', width:208, height:756, alt:'Botella Palacio de Bornos Verdejo Brut, espumoso de Rueda'},
        {name:'Espumoso Palacio de Bornos Nature', description:'Vino espumoso Nature de Palacio de Bornos.', image:B+'bornos-espumoso-brut-nature.webp', width:222, height:755, alt:'Botella Palacio de Bornos Verdejo Brut Nature, espumoso de Rueda'},
        {name:'Espumoso Palacio de Bornos Semiseco', description:'Vino espumoso semiseco de Palacio de Bornos.', image:B+'bornos-espumoso-semiseco.webp', width:208, height:755, alt:'Botella Palacio de Bornos Verdejo Semiseco, espumoso de Rueda'},
        {name:'Espumoso Palacio de Bornos Rosado', description:'Vino espumoso rosado de Palacio de Bornos.', image:B+'bornos-espumoso-rosado-semiseco.webp', width:208, height:755, alt:'Botella Palacio de Bornos Rosado Semiseco, espumoso de Rueda'}
      ]
    },
    {
      template:'lineup', family:'Pazos de Baró', color:'#dfe7d0', ink:'#2b3320',
      eyebrow:'Pazos de Baró · Vinos', title:'Pingoleta, Pink-goleta y Godello.',
      note:'Una imagen por variedad',
      variants:[
        {name:'Pingoleta · Ribera del Duero · 10 meses · 2024', description:'Tinto de Pazos de Baró, de la D.O. Ribera del Duero, con diez meses de crianza.', image:B+'pingoleta-ribera-10-meses.webp', width:130, height:530, alt:'Botella Pingoleta de Pazos de Baró, Ribera del Duero 10 meses'},
        {name:'Pink-goleta · Clarete · 75 cl · 2025', description:'Clarete de Pazos de Baró, de tempranillo y godello.', image:B+'pink-goleta-clarete.webp', width:188, height:652, alt:'Botella Pink-goleta Clarete de Pazos de Baró'},
        {name:'Godello · D.O. Castilla y León · 2024', description:'Godello blanco de Pazos de Baró.', image:B+'godello-pazos-de-baro.webp', width:110, height:368, alt:'Botella Godello de Pazos de Baró'}
      ]
    },
    {
      template:'lineup', family:'Otras bodegas', color:'#f4f0e9', ink:'#29231f',
      eyebrow:'Más nombres en la selección', title:'Otras referencias.',
      note:'Una imagen por variedad',
      variants:[
        {name:'Pinna Fidelis Roble', description:'Pinna Fidelis Roble, Ribera del Duero.', image:B+'pinna-fidelis-roble-2020.webp', width:153, height:494, alt:'Botella Pinna Fidelis Roble 2020, Ribera del Duero'},
        {name:'Pinna Fidelis Crianza', description:'Crianza de Pinna Fidelis, Ribera del Duero.', image:B+'pinna-fidelis-crianza.webp', width:140, height:560, alt:'Botella Pinna Fidelis Crianza, Ribera del Duero'},
        {name:'Pinna Fidelis Roble · botella 3/8 con estuche', description:'Pinna Fidelis Roble, Ribera del Duero, en botella de 3/8 (37,5 cl) con estuche blanco.', image:B+'pinna-fidelis-roble-pequena-estuche.webp', width:377, height:660, alt:'Botella pequeña de Pinna Fidelis Roble con su estuche blanco'},
        {name:'Pinna Fidelis · estuche de regalo', description:'Pinna Fidelis, Ribera del Duero, presentado en estuche de regalo negro.', image:B+'pinna-fidelis-estuche-regalo.webp', width:366, height:900, alt:'Pinna Fidelis, Ribera del Duero, en estuche de regalo negro'},
        {name:'De tiros largos · Ribera del Duero', description:'Tinto de la D.O. Ribera del Duero.', image:B+'de-tiros-largos.webp', width:150, height:607, alt:'Botella De tiros largos, tinto de Ribera del Duero'}
      ]
    }
  ]
});
