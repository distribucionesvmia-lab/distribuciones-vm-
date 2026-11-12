"""Genera en todas las páginas el bloque SEO (canonical, Open Graph, Twitter), los datos de empresa local
(JSON-LD de empresa en la portada; migas y preguntas frecuentes en Menaje), sitemap.xml y robots.txt.

Uso (desde la raíz del repositorio):  python3 -I _herramientas/seo.py

BASE es la dirección del sitio, con barra final. Mientras la web esté oculta incluye la carpeta privada\ny las páginas llevan noindex; para abrirla al público, BASE vuelve a ser solo el dominio y se quita el noindex. Cuando la web pase a un dominio propio
(por ejemplo IONOS), cámbiala aquí y vuelve a ejecutar el script.
"""
import json
import os
import re
from html import unescape

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BASE = 'https://distribucionesvm.es/vm-2fe82817c8/'
SITE = 'Distribuciones Valentín'
DEFAULT_IMG = ('assets/portada.webp', 1792, 1008, 'Furgoneta de reparto frente al Castillo de la Mota, en Medina del Campo')
# página -> imagen para compartir (ruta, ancho, alto, texto alternativo); sin entrada usa DEFAULT_IMG
IMAGES = {
    'cafe-mocay.html': ('assets/marcas/mocay-cafe-arabica.webp', 515, 515, 'Café Mocay Maestro Colombia'),
    'menaje.html': ('assets/menaje/og-menaje.jpg', 1200, 630, 'Mesa de restaurante preparada con copas, platos y servilletas bajo una luz cálida'),
}
PAGES = ['index.html', 'cafe-mocay.html', 'pascual.html', 'vinos.html', 'agua.html',
         'despensa.html', 'refrigerados.html', 'congelados.html', 'menaje.html', 'aviso-legal.html', 'privacidad.html']

BUSINESS = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    'additionalType': 'https://schema.org/Wholesaler',
    'name': 'Distribuciones Valentín Martín',
    'alternateName': SITE,
    'description': 'Distribución para hostelería: alimentación, bebidas y menaje de primeras marcas, desde Medina del Campo y hasta 90 km a la redonda.',
    'url': BASE,
    'logo': BASE + 'assets/logo.png',
    'image': BASE + 'assets/portada.webp',
    'telephone': '+34635098044',
    'email': 'oficina@distribucionesvm.es',
    'foundingDate': '1982',
    'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Cl Labradores, n.º 45, parcela 24B',
        'postalCode': '47400',
        'addressLocality': 'Medina del Campo',
        'addressRegion': 'Valladolid',
        'addressCountry': 'ES',
    },
    'openingHoursSpecification': [{
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '07:00',
        'closes': '15:00',
    }],
    'areaServed': ['Medina del Campo', 'Valladolid', 'Salamanca', 'Ávila', 'Segovia'],
    'sameAs': [
        'https://www.facebook.com/share/1LfPCX2kSw/',
        'https://www.instagram.com/distrvalentinmartin/',
    ],
}

BLOCK_RE = re.compile(r'\n?<!-- seo -->.*?<!-- /seo -->', re.S)


def esc(t):
    return t.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;')


def menaje_ld(html):
    """Migas de pan y preguntas frecuentes de menaje.html; las preguntas se leen de la propia página."""
    faq = re.findall(r'<details><summary>(.*?)</summary><p>(.*?)</p></details>', html, re.S)
    graph = [
        {'@type': 'BreadcrumbList', '@id': BASE + 'menaje.html#migas', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': BASE},
            {'@type': 'ListItem', 'position': 2, 'name': 'Menaje', 'item': BASE + 'menaje.html'}]},
        {'@type': 'FAQPage', '@id': BASE + 'menaje.html#preguntas', 'mainEntity': [
            {'@type': 'Question', 'name': unescape(q), 'acceptedAnswer': {'@type': 'Answer', 'text': unescape(a)}} for q, a in faq]},
    ]
    return '<script type="application/ld+json">' + json.dumps({'@context': 'https://schema.org', '@graph': graph}, ensure_ascii=False, separators=(',', ':')) + '</script>'


def block(page, html):
    title = re.search(r'<title>(.*?)</title>', html, re.S).group(1).strip()
    desc = re.search(r'<meta name="description" content="(.*?)"', html, re.S).group(1).strip()
    img, w, h, alt = IMAGES.get(page, DEFAULT_IMG)
    url = BASE if page == 'index.html' else BASE + page
    lines = [
        '<!-- seo -->',
        f'<link rel="canonical" href="{url}">',
        '<meta name="robots" content="noindex,nofollow,noarchive">',
        '<meta property="og:type" content="website">',
        '<meta property="og:locale" content="es_ES">',
        f'<meta property="og:site_name" content="{SITE}">',
        f'<meta property="og:title" content="{title}">',
        f'<meta property="og:description" content="{desc}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:image" content="{BASE + img}">',
        f'<meta property="og:image:width" content="{w}">',
        f'<meta property="og:image:height" content="{h}">',
        f'<meta property="og:image:alt" content="{esc(alt)}">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{title}">',
        f'<meta name="twitter:description" content="{desc}">',
        f'<meta name="twitter:image" content="{BASE + img}">',
    ]
    if page == 'index.html':
        lines.append('<script type="application/ld+json">' + json.dumps(BUSINESS, ensure_ascii=False, separators=(',', ':')) + '</script>')
    if page == 'menaje.html':
        lines.append(menaje_ld(html))
    lines.append('<!-- /seo -->')
    return '\n' + '\n'.join(lines)


for page in PAGES:
    p = os.path.join(ROOT, page)
    h = open(p, encoding='utf-8').read()
    h = BLOCK_RE.sub('', h)
    h = h.replace('</head>', block(page, h) + '\n</head>', 1)
    open(p, 'w', encoding='utf-8').write(h)
    print('ok', page)

open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8').write('User-agent: *\nDisallow: /\n')
sm = os.path.join(ROOT, 'sitemap.xml')
if os.path.exists(sm):
    os.remove(sm)
print('ok robots.txt (sin indexar) y sin sitemap')
