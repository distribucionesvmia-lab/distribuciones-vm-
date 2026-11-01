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
]
# Botón fijo «Llamar» (solo se ve en móvil; se escribe igual en todas las páginas)
CALL_NUMBER = '+34635098044'
CALL_ICON = ('<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>')
CALL_HTML = ('<!-- call-float -->\n<aside aria-label="Llamada rápida">'
             f'<a class="call-float" href="tel:{CALL_NUMBER}" aria-label="Llamar al 635 09 80 44">{CALL_ICON}<span>Llamar</span></a></aside>\n'
             '<!-- /call-float -->')
CALL_RE = re.compile(r'<!-- call-float -->.*?<!-- /call-float -->', re.S)

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
}


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
    contact = '#contacto' if home else 'index.html#contacto'
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
    if CALL_RE.search(h):
        h = CALL_RE.sub(lambda m: CALL_HTML, h, count=1)
    else:
        h = h.replace('</body>', CALL_HTML + '\n</body>', 1)
    if 'site-header.css' not in h:
        h = h.replace('</head>', '<link rel="stylesheet" href="site-header.css?v=1">\n</head>', 1)
    if 'site-header.js' not in h:
        h = h.replace('</body>', '<script src="site-header.js?v=1" defer></script>\n</body>', 1)
    open(p, 'w', encoding='utf-8').write(h)
    print('ok', page)
