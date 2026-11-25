/* Promociones: espumosos Palacio de Bornos (D.O. Rueda). Sin precio: «con 5 unidades, una de regalo». */
window.ProductWorld.init({
  mount: '#familias',
  sections: [
    {
      template: 'lineup', id: 'espumosos-promo', family: 'Promociones', label: 'Espumosos en promoción', color: '#3a0f1a', ink: '#f6e6c4', dark: true,
      eyebrow: 'Palacio de Bornos · D.O. Rueda', title: 'Cuatro espumosos para brindar en Navidad.',
      note: 'Segunda fermentación en botella (método tradicional). Notas de cata y servicio, según las fichas técnicas de Palacio de Bornos',
      variants: [
        {name:'Brut Nature', description:'Verdejo 100 %, 36 meses en botella. Burbuja fina y constante; aromas de fruta madura, almendra y cacahuete de la segunda fermentación. Sírvelo a 8 ºC con pescado blanco y azul, marisco, caviar, caza de pluma o queso.', image:'assets/vinos/bornos-espumoso-brut-nature.png', width:222, height:755, alt:'Botella Palacio de Bornos Verdejo Brut Nature, espumoso de Rueda'},
        {name:'Brut', description:'Verdejo 100 %, mínimo 12 meses en botella. Aroma potente y complejo, con flores blancas y hierbas silvestres; amplio y fresco en boca. Sírvelo a 12-14 ºC con pescado, marisco, aves, carne blanca, verduras y quesos.', image:'assets/vinos/bornos-espumoso-brut.png', width:208, height:756, alt:'Botella Palacio de Bornos Verdejo Brut, espumoso de Rueda'},
        {name:'Semiseco', description:'Verdejo 100 %, 9 meses en botella. Notas de menta y manzana madura, con buen equilibrio entre dulzor y acidez. Sírvelo a 5-7 ºC con postres, dulces, mazapanes y turrones: el espumoso de la sobremesa de Navidad.', image:'assets/vinos/bornos-espumoso-semiseco.png', width:208, height:755, alt:'Botella Palacio de Bornos Verdejo Semiseco, espumoso de Rueda'},
        {name:'Rosado Semiseco', description:'Tempranillo 100 %, 9 meses en botella. Rosa fresa intenso, con fresa, cereza y toques florales; fresco y con buena acidez. Sírvelo a 10-12 ºC con pastas, arroces, pescados, mariscos y dulces.', image:'assets/vinos/bornos-espumoso-rosado-semiseco.png', width:208, height:755, alt:'Botella Palacio de Bornos Rosado Semiseco, espumoso de Rueda'}
      ]
    }
  ]
});
