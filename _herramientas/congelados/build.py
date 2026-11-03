"""Genera congelados-products.js a partir de tabla.txt y mapa.json.

Uso (desde la raíz del repositorio):
    python3 -I _herramientas/congelados/build.py [carpeta_con_las_imagenes_del_catalogo]

La carpeta es la «…_files» que guarda el navegador al descargar el catálogo de Panamar
(«Guardar página como…»). Si no se indica, o falta alguna imagen, esa variedad muestra
«Imagen pendiente». Las imágenes se recortan al contenido y se convierten a WebP en
assets/congelados/.
"""
import json
import os
import re
import sys
import unicodedata

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
FILES = sys.argv[1] if len(sys.argv) > 1 else None
OUT_IMG = os.path.join(ROOT, 'assets', 'congelados')

groups = [
    ('A', 'Panes y barras', 'Pan precocido', 'El pan de cada servicio.', '#f6e7d0', '#5a3112'),
    ('B', 'Croissants', 'Croissants y hojaldre', 'Hojaldre dorado, listo para hornear.', '#fbe8c4', '#6a3d0a'),
    ('C', 'Bollería dulce', 'Napolitanas, berlinas y más', 'Para el desayuno y la merienda.', '#f7dfd5', '#6b2a18'),
    ('D', 'Snacks salados', 'Empanadas, bocapizzas y paninis', 'Un bocado salado en minutos.', '#efe6d2', '#4a3a14'),
    ('E', 'Pastelería', 'Hojaldre y tartas', 'Para elaborar y para servir.', '#f3e1e3', '#6a1f2e'),
]


def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


mapa = {m['name']: m for m in json.load(open(os.path.join(HERE, 'mapa.json'), encoding='utf-8'))}
rows = []
for line in open(os.path.join(HERE, 'tabla.txt'), encoding='utf-8'):
    if line.strip():
        g, name, desc = [p.strip() for p in line.rstrip('\n').split('||')]
        rows.append((g, name, desc))

done = {}


def prepare(m):
    """Convierte la imagen del catálogo y devuelve (ruta, ancho, alto) o None."""
    if not FILES or not m.get('imagen'):
        return None
    key = m['imagen']
    if key in done:
        return done[key]
    src = None
    for cand in (key, key.replace('%20', ' ')):
        p = os.path.join(FILES, cand)
        if os.path.isfile(p):
            src = p
            break
    if not src:
        done[key] = None
        return None
    os.makedirs(OUT_IMG, exist_ok=True)
    im = Image.open(src)
    has_alpha = im.mode in ('RGBA', 'LA', 'P')
    im = im.convert('RGBA' if has_alpha else 'RGB')
    if has_alpha:
        bb = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
        if bb:
            im = im.crop(bb)
    im.thumbnail((620, 620), Image.LANCZOS)
    fn = f"{m['ref']}-{slug(m['catalogo'])}.webp"
    im.save(os.path.join(OUT_IMG, fn), 'WEBP', quality=86, method=6)
    done[key] = (f'assets/congelados/{fn}', im.width, im.height)
    return done[key]


sections = []
pendientes = []
for code, family, eyebrow, title, color, ink in groups:
    vs = []
    for g, name, desc in [r for r in rows if r[0] == code]:
        v = {'name': name, 'description': desc}
        m = mapa.get(name)
        img = prepare(m) if m else None
        if img:
            v.update(image=img[0], width=img[1], height=img[2], alt=f'{name}, Panamar')
        else:
            pendientes.append(name)
        vs.append(v)
    sections.append({'template': 'lineup', 'family': f'Congelados · {family}', 'color': color, 'ink': ink,
                     'eyebrow': eyebrow, 'title': title,
                     'note': 'Imagen del catálogo oficial de Panamar' if FILES else 'Imagen pendiente · catálogo oficial de Panamar',
                     'variants': vs})

js = '/* Congelados (Panamar). Generado con _herramientas/congelados/build.py */\n'
js += "window.ProductWorld.init({\n  mount: '#familias',\n  order: ['Bollería', 'Panes', 'Croissants', 'Snacks', 'Pastelería'],\n  sections: " + json.dumps(sections, ensure_ascii=False, indent=1) + '\n});\n'
open(os.path.join(ROOT, 'congelados-products.js'), 'w', encoding='utf-8').write(js)
print('productos:', sum(len(s['variants']) for s in sections), '· sin imagen:', len(pendientes))
for p in pendientes[:80]:
    print('  pendiente:', p)
