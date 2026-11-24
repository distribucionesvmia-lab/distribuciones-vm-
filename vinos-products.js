/* Misma arquitectura de escenas que Pascual. Fotografías de botella sustituibles en este archivo. */
const B = 'assets/vinos/';
window.ProductWorld.init({
  mount: '#familias',
  alternar: true,
  order: ['Bodega Palacio','Blancos','Ribera del Duero','Frizzantes','Espumosos','Pinna Fidelis','Pazos','Bag in box','Otras'],
  sections: [
    {
      template:'hero', family:'Palacio de Bornos', color:'#eba061', ink:'#251d17',
      eyebrow:'Bodega Palacio de Bornos', title:'Verdejo. El alma máter de Rueda.',
      description:'Palacio de Bornos Verdejo, D.O. Rueda, en botella de 75 cl (también con tapón de rosca). «Captura la esencia de la D.O. Rueda»; «el alma máter de la bodega». Desde aquí, el resto de la casa: blancos, frizzantes, tintos del grupo en Ribera y espumosos.',
      backword:'RUEDA', bottom:'01 — Palacio de Bornos',
      product:{name:'Palacio de Bornos Verdejo 2025 · 75 cl', image:'assets/marcas/bornos-verdejo.png', width:187, height:622, alt:'Botella original de Palacio de Bornos Verdejo'}
    },
    {
      template:'lineup', family:'Palacio de Bornos', color:'#efe5d3', ink:'#392b1f',
      eyebrow:'Palacio de Bornos · Blancos', title:'Los blancos de Rueda.',
      note:'Colección: «equilibra tradición e innovación»',
      variants:[
        {name:'La Caprichosa · Verdejo 2025', description:'Verdejo sobre lías de Palacio de Bornos.', image:B+'la-caprichosa-verdejo.png', width:119, height:478, alt:'Botella La Caprichosa Verdejo sobre lías'},
        {name:'Verdejo fermentado en barrica · 2023', description:'Blanco de Palacio de Bornos fermentado en barrica.', image:'assets/marcas/bornos-fermentado.png', width:270, height:612, alt:'Botella Palacio de Bornos Verdejo fermentado en barrica'},
        {name:'Bornos Semidulce Verdejo', description:'Verdejo semidulce de Palacio de Bornos.', image:B+'bornos-semidulce-verdejo.png', width:135, height:546, alt:'Botella Palacio de Bornos Verdejo Semidulce'}
      ]
    },
    {
      template:'lineup', family:'Palacio de Bornos', color:'#f9dcb6', ink:'#281c16',
      eyebrow:'Palacio de Bornos · Frizzantes', title:'Frizzante, fresco y ligero.',
      note:'Bornos Frizzante Verdejo y Rosado (5,5º) y Laué, el frizzante de Palacio de Bornos en lata. Laué: «una actitud: fresca, vibrante y auténtica»',
      variants:[
        {name:'Bornos Frizzante Verdejo · 5,5 º', description:'Frizzante Verdejo de Palacio de Bornos.', image:B+'bornos-frizzante-cutout.png', width:430, height:1070, alt:'Botella Palacio de Bornos Frizzante Verdejo'},
        {name:'Bornos Rosado Frizzante · 5,5 º', description:'Frizzante rosado de Palacio de Bornos.', image:B+'bornos-rosado-frizzante.png', width:206, height:746, alt:'Botella Bornos Frizzante Rosado 5,5 grados'},
        {name:'Laué Frizzante Verdejo · lata de 250 ml', description:'Laué, frizzante Verdejo de Palacio de Bornos en lata. «Una actitud: fresca, vibrante y auténtica».', image:B+'laue-lata.png', width:251, height:714, alt:'Lata Laué Frizzante Verdejo'},
        {name:'Laué Frizzante Verdejo · pack de 4 latas de 250 ml', description:'Pack de cuatro latas de Laué Frizzante Verdejo.', image:B+'laue-pack-4.png', width:529, height:711, alt:'Pack de 4 latas Laué Frizzante Verdejo'}
      ]
    },
    {
      template:'lineup', id:'lleiroso', family:'Bornos · Ribera del Duero', color:'#e8ddd0', ink:'#3a1f1a',
      eyebrow:'Grupo Bornos · Ribera del Duero', title:'Tintos de Ribera. Dominio de Bornos y Lleiroso.',
      note:'Dos bodegas del grupo Bornos en la D.O. Ribera del Duero: el Roble de Dominio de Bornos, «la frescura del Tempranillo en su forma más franca», y Lleiroso Crianza y Reserva: «máxima expresión de la elegancia e intensidad»',
      variants:[
        {name:'Lleiroso 25 Aniversario · Edición limitada', description:'Novedad, ideal para regalar en Navidad. Reserva 100 % Tempranillo de la añada 2018: 15 meses en barrica de roble francés y 70 meses en botella. Solo 1.188 botellas numeradas, con estuche.', image:B+'lleiroso-25-aniversario.png', width:448, height:955, alt:'Botella Lleiroso 25 Aniversario, edición limitada, Ribera del Duero, con su colgante'},
        {name:'Dominio de Bornos Roble · 2024', description:'Tinto roble 2024 de Dominio de Bornos.', image:B+'dominio-de-bornos-roble.png', width:128, height:494, alt:'Botella Dominio de Bornos Roble, Ribera del Duero'},
        {name:'Lleiroso Crianza · 2022', description:'Lleiroso Crianza 2022, Ribera del Duero.', image:B+'lleiroso-crianza-tempranillo.png', width:130, height:489, alt:'Botella Lleiroso Crianza, Ribera del Duero'},
        {name:'Lleiroso Reserva · 2021', description:'Lleiroso Reserva 2021, Ribera del Duero.', image:B+'lleiroso-reserva-2021.png', width:130, height:490, alt:'Botella Lleiroso Reserva, Ribera del Duero'},
        {name:'Lleiroso Crianza · Magnum 2021', description:'Lleiroso Crianza 2021 en formato magnum, Ribera del Duero. Imagen de la botella estándar.', image:B+'lleiroso-crianza-tempranillo.png', width:130, height:489, alt:'Botella Lleiroso Crianza, imagen del formato estándar'}
      ]
    },
    {
      template:'lineup', family:'Palacio de Bornos', color:'#f3ead6', ink:'#2f2a1c',
      eyebrow:'Palacio de Bornos · Espumosos', title:'Para brindar. Pioneros en Castilla y León.',
      note:'Espumosos de Palacio de Bornos (Nature, Brut, Semiseco y Rosado), «La primera» en hacer espumoso en Castilla y León, en 1978',
      variants:[
        {name:'Espumoso Palacio de Bornos Nature', description:'Vino espumoso Nature de Palacio de Bornos.', image:B+'bornos-espumoso-brut-nature.png', width:222, height:755, alt:'Botella Palacio de Bornos Verdejo Brut Nature, espumoso de Rueda'},
        {name:'Espumoso Palacio de Bornos Brut', description:'Vino espumoso Brut de Palacio de Bornos.', image:B+'bornos-espumoso-brut.png', width:208, height:756, alt:'Botella Palacio de Bornos Verdejo Brut, espumoso de Rueda'},
        {name:'Espumoso Palacio de Bornos Semiseco', description:'Vino espumoso semiseco de Palacio de Bornos.', image:B+'bornos-espumoso-semiseco.png', width:208, height:755, alt:'Botella Palacio de Bornos Verdejo Semiseco, espumoso de Rueda'},
        {name:'Espumoso Palacio de Bornos Rosado', description:'Vino espumoso rosado de Palacio de Bornos.', image:B+'bornos-espumoso-rosado-semiseco.png', width:208, height:755, alt:'Botella Palacio de Bornos Rosado Semiseco, espumoso de Rueda'}
      ]
    },
    {
      template:'lineup', family:'Pazos de Baró', color:'#dfe7d0', ink:'#2b3320',
      eyebrow:'Pazos de Baró · Vinos', title:'Pazos de Baró. Carácter y personalidad.',
      note:'Pingoleta, de Ribera del Duero: «un equilibrio que despierta los sentidos»; el Godello, de IGP Castilla y León: «un vino con carácter y personalidad». Pink-goleta, el clarete de la casa, completa el trío',
      variants:[
        {name:'Pingoleta · Ribera del Duero · 10 meses · 2024', description:'Tinto de Pazos de Baró, de la D.O. Ribera del Duero, con diez meses de crianza.', image:B+'pingoleta-ribera-10-meses.png', width:130, height:530, alt:'Botella Pingoleta de Pazos de Baró, Ribera del Duero 10 meses'},
        {name:'Pink-goleta · Clarete · 75 cl · 2025', description:'Clarete de Pazos de Baró, de tempranillo y godello.', image:B+'pink-goleta-clarete.png', width:153, height:589, alt:'Botella Pink-goleta Clarete de Pazos de Baró'},
        {name:'Godello · D.O. Castilla y León · 2024', description:'Godello blanco de Pazos de Baró.', image:B+'godello-pazos-de-baro.png', width:110, height:368, alt:'Botella Godello de Pazos de Baró'}
      ]
    },
    {
      template:'lineup', family:'Bag in box', color:'#fbfaf6', ink:'#2b2a1f',
      eyebrow:'Bag in box · 5 y 15 litros', title:'Bag in box de 5 y 15 litros.',
      variants:[
        {name:'Vino blanco · bag in box de 5 L', description:'Vino de mesa blanco en bag in box de 5 litros.', image:B+'bib-blanco-5l.png', width:517, height:620, alt:'Caja de bag in box de vino de mesa blanco de 5 litros'},
        {name:'Vino tinto · bag in box de 5 L', description:'Vino de mesa tinto en bag in box de 5 litros.', image:B+'bib-tinto-5l.png', width:518, height:620, alt:'Caja de bag in box de vino de mesa tinto de 5 litros'},
        {name:'Solera · bag in box de 5 L', description:'Solera, blanco envejecido (Vinofiel, vino de la tierra), en bag in box de 5 litros.', image:B+'bib-solera-5l.png', width:517, height:620, alt:'Caja de bag in box Vinofiel Solera, blanco envejecido, de 5 litros'},
        {name:'Vino blanco · bag in box de 15 L', description:'Vino de mesa blanco en bag in box de 15 litros.', image:B+'bib-blanco-15l.png', width:477, height:620, alt:'Caja de bag in box de vino de mesa blanco de 15 litros'},
        {name:'Vino tinto · bag in box de 15 L', description:'Vino de mesa tinto en bag in box de 15 litros.', image:B+'bib-tinto-15l.png', width:476, height:620, alt:'Caja de bag in box de vino de mesa tinto de 15 litros'}
      ]
    },
    {
      template:'lineup', family:'Pinna Fidelis', color:'#f4f0e9', ink:'#29231f',
      eyebrow:'Pinna Fidelis · Peñafiel', title:'Pinna Fidelis, de Peñafiel a la copa.',
      variants:[
        {name:'Pinna Fidelis Crianza · magnum', description:'Crianza de Pinna Fidelis, Ribera del Duero, en formato magnum (1,5 L).', image:B+'pinna-fidelis-crianza-magnum.png', width:260, height:639, alt:'Botella magnum de Pinna Fidelis Crianza, Ribera del Duero'},
        {name:'Pinna Fidelis Crianza · botella normal', description:'Crianza de Pinna Fidelis, Ribera del Duero, en botella de 75 cl.', image:B+'pinna-fidelis-crianza-normal.png', width:137, height:556, alt:'Botella normal de Pinna Fidelis Crianza, Ribera del Duero'},
        {name:'De tiros largos · Pinna Fidelis · Ribera del Duero', description:'Tinto de Pinna Fidelis, 100 % Tinta del País, D.O. Ribera del Duero.', image:B+'de-tiros-largos.png', width:150, height:607, alt:'Botella De tiros largos, tinto de Pinna Fidelis, Ribera del Duero'},
        {name:'Pinna Fidelis · estuche de regalo', description:'Pinna Fidelis, Ribera del Duero, presentado en estuche de regalo negro.', image:B+'pinna-fidelis-estuche-regalo.png', width:366, height:900, alt:'Pinna Fidelis, Ribera del Duero, en estuche de regalo negro'},
        {name:'Pinna Fidelis Roble · magnum', description:'Pinna Fidelis Roble, Ribera del Duero, en formato magnum (1,5 L).', image:B+'pinna-fidelis-roble-magnum.png', width:573, height:1300, alt:'Botella magnum de Pinna Fidelis Roble, Ribera del Duero'},
        {name:'Pinna Fidelis Roble · botella normal', description:'Pinna Fidelis Roble, Ribera del Duero, en botella de 75 cl.', image:B+'pinna-fidelis-roble-normal.png', width:219, height:659, alt:'Botella normal de Pinna Fidelis Roble, Ribera del Duero'},
        {name:'Pinna Fidelis Roble · botella 3/8 con estuche', description:'Pinna Fidelis Roble, Ribera del Duero, en botella de 3/8 (37,5 cl) con estuche blanco.', image:B+'pinna-fidelis-roble-pequena-estuche.png', width:739, height:1300, alt:'Botella pequeña de Pinna Fidelis Roble con su estuche blanco'},
      ]
    }
  ]
});
