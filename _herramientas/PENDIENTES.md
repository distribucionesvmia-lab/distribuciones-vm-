# Pendientes con fecha

## 10 de enero de 2027: quitar la mención de la promoción de Navidad en Vinos
- En `vinos-products.js`, la sección de espumosos tiene una línea `sugerencia: (new Date() < new Date(2027, 0, 10)) ? {...} : null`.
  La mención desaparece sola el 10 de enero de 2027. Después hay que borrar esa línea (y el comentario que la precede) para dejar el código limpio.
- Decidir también qué se hace con la página `promociones.html`, su tarjeta en la portada y el botón «Promociones» de la barra superior (`_herramientas/cabecera.py`, después ejecutar `cabecera.py` y `versionar.py`).
