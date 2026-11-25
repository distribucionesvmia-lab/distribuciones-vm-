/* Promociones: espumosos Palacio de Bornos (D.O. Rueda). Sin precio: «con 5 botellas, una de regalo». */
window.ProductWorld.init({
  mount: '#familias',
  sections: [
    {
      template: 'lineup', id: 'espumosos-promo', family: 'Promociones', label: 'Espumosos en promoción', color: '#f3ead6', ink: '#2f2a1c',
      eyebrow: 'Palacio de Bornos · D.O. Rueda', title: 'Espumosos en promoción: con 5 botellas, una de regalo.',
      note: 'Espumosos de Palacio de Bornos, «La primera» bodega en hacer espumoso en Castilla y León, en 1978',
      variants: [
        {name:'Brut Nature', description:'El más seco de los cuatro: sin azúcar añadido. En promoción: con 5 botellas, una de regalo.', image:'assets/vinos/bornos-espumoso-brut-nature.png', width:222, height:755, alt:'Botella Palacio de Bornos Verdejo Brut Nature, espumoso de Rueda'},
        {name:'Brut', description:'Seco. En promoción: con 5 botellas, una de regalo.', image:'assets/vinos/bornos-espumoso-brut.png', width:208, height:756, alt:'Botella Palacio de Bornos Verdejo Brut, espumoso de Rueda'},
        {name:'Semiseco', description:'Con un toque suave de dulzor. En promoción: con 5 botellas, una de regalo.', image:'assets/vinos/bornos-espumoso-semiseco.png', width:208, height:755, alt:'Botella Palacio de Bornos Verdejo Semiseco, espumoso de Rueda'},
        {name:'Rosado Semiseco', description:'Espumoso rosado con un toque suave de dulzor. En promoción: con 5 botellas, una de regalo.', image:'assets/vinos/bornos-espumoso-rosado-semiseco.png', width:208, height:755, alt:'Botella Palacio de Bornos Rosado Semiseco, espumoso de Rueda'}
      ]
    }
  ]
});
