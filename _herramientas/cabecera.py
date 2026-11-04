"""Regenera la cabecera común en todas las páginas del sitio.

Uso (desde la raíz del repositorio):  python3 -I _herramientas/cabecera.py

Para añadir una sección al menú, edita MENU y vuelve a ejecutar el script.
El diseño de la cabecera está en site-header.css.
"""
import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# (texto, página o ancla en index.html)
MENU = [
    ('Inicio', 'index.html#inicio'),
    ('Catálogo', 'index.html#catalogo'),
    ('Café Mocay', 'cafe-mocay.html'),
    ('Pascual', 'pascual.html'),
    ('Vinos', 'vinos.html'),
    ('Aguas', 'agua.html'),
    ('Despensa', 'despensa.html'),
    ('Refrigerados', 'refrigerados.html'),
    ('Congelados', 'congelados.html'),
    ('Menaje', 'menaje.html'),
]
# página -> (texto del elemento activo, ¿cabecera fija sobre la portada?)
PAGES = {
    'index.html': ('Inicio', True),
    'cafe-mocay.html': ('Café Mocay', True),
    'pascual.html': ('Pascual', False),
    'vinos.html': ('Vinos', False),
    'agua.html': ('Aguas', False),
    'despensa.html': ('Despensa', False),
    'refrigerados.html': ('Refrigerados', False),
    'congelados.html': ('Congelados', False),
    'menaje.html': ('Menaje', False),
}

# páginas con formulario de contacto propio: el botón «Contactar» baja a él en lugar de ir a la portada
CONTACT_HERE = {'index.html', 'menaje.html'}


def header(page):
    active, fixed = PAGES[page]
    home = page == 'index.html'
    links = []
    for text, href in MENU:
        if home and href.startswith('index.html#'):
            href = href.split('index.html', 1)[1]          # en la portada, anclas internas
        cur = ' aria-current="page"' if text == active else ''
        if text == active and not home:
            href = '#contenido'
        links.append(f'<a href="{href}"{cur}>{text}</a>')
    brand = '#inicio' if home else 'index.html#inicio'
    contact = '#contacto' if page in CONTACT_HERE else 'index.html#contacto'
    cls = 'site-header is-fixed' if fixed else 'site-header'
    return (f'<header class="{cls}" id="top">\n'
            f'  <a class="sh-brand" href="{brand}" aria-label="Distribuciones Valentín, inicio"><img src="assets/logo.png" width="400" height="400" alt=""><span>Distribuciones Valentín</span></a>\n'
            f'  <nav aria-label="Principal">{"".join(links)}</nav>\n'
            f'  <a class="sh-contact" href="{contact}">Contactar <span aria-hidden="true">↗</span></a>\n'
            f'</header>')


HEADER_RE = re.compile(r'<header class="(?:top|m-top|pw-header|site-header)[^"]*"[^>]*>.*?</header>', re.S)

for page in PAGES:
    p = os.path.join(ROOT, page)
    h = open(p, encoding='utf-8').read()
    new = header(page)
    if not HEADER_RE.search(h):
        raise SystemExit(f'{page}: no se encontró la cabecera')
    h = HEADER_RE.sub(lambda m: new, h, count=1)
    if 'site-header.css' not in h:
        h = h.replace('</head>', '<link rel="stylesheet" href="site-header.css?v=1">\n</head>', 1)
    if 'site-header.js' not in h:
        h = h.replace('</body>', '<script src="site-header.js?v=1" defer></script>\n</body>', 1)
    open(p, 'w', encoding='utf-8').write(h)
    print('ok', page)
