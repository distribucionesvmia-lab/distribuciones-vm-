"""Genera menaje-articulos.js (listado de Menaje) a partir del Excel de artículos del ERP.

Uso (desde la raíz del repositorio):  python3 -I _herramientas/menaje.py ruta/al/ARTICULOS.xlsx

Toma los artículos activos de las familias de menaje (54 Cocina, 55 Cristalería, 56 Consumibles, 57 Cubertería,
58 Complementos de mesa, 59 Cuchillería y 61 Platos) y los agrupa por familia, en el orden de códigos del ERP.
No incluye precios. Necesita openpyxl.
"""
import json
import os
import re
import sys

import openpyxl

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if len(sys.argv) < 2:
    raise SystemExit('Uso: python3 -I _herramientas/menaje.py ruta/al/ARTICULOS.xlsx')

GROUPS = {'54': 'Cocina', '55': 'Cristalería', '56': 'Consumibles', '57': 'Cubertería',
          '58': 'Complementos de mesa', '59': 'Cuchillería', '61': 'Platos, tazas y bowls'}
SUB = {'54.0': 'Cocina', '55.0': 'Cristalería', '55.1': 'Vasos de cristal', '55.11': 'Vasos de agua', '55.12': 'Vasos de cerveza',
       '55.2': 'Copas', '55.21': 'Copas de cerveza', '55.22': 'Copas de vino', '55.23': 'Copas de licores',
       '56.0': 'Consumibles', '56.1': 'Vasos desechables', '56.2': 'De un solo uso', '56.3': 'Higiénico',
       '57.1': 'Tenedores', '57.2': 'Cucharas', '57.3': 'Cuchillos', '58.0': 'Complementos de mesa', '59.0': 'Cuchillería',
       '61.0': 'Platos', '61.1': 'Tazas', '61.2': 'Bowls'}
UNITS = {'cl', 'cc', 'ml', 'gr', 'g', 'kg', 'cm', 'mm', 'l', 'und', 'uds', 'ud', 'un', 'x', 'w', 'mg'}
SMALL = {'de', 'del', 'la', 'el', 'los', 'las', 'con', 'sin', 'y', 'para', 'en', 'a', 'al', 'o', 'por'}


def nice(name):
    name = re.sub(r'\s+', ' ', name).strip()
    out = []
    for i, w in enumerate(name.split(' ')):
        core = re.sub(r'[^\wÀ-ÿ]', '', w).lower()
        if core in UNITS and i > 0:
            out.append(w.lower())
        elif core in SMALL and i > 0:
            out.append(w.lower())
        elif re.search(r'\d', w):
            out.append(w.lower() if re.fullmatch(r'[\d.,/x*+-]+[a-zA-Z]*\.?', w) else w[:1].upper() + w[1:].lower())
        elif len(core) <= 2 and w.isupper():
            out.append(w)
        else:
            out.append(w[:1].upper() + w[1:].lower() if not w.startswith('(') else '(' + w[1:2].upper() + w[2:].lower())
    return ' '.join(out)


def key(fam):
    return [int(p) for p in fam.split('.')]


ws = openpyxl.load_workbook(sys.argv[1], data_only=True).active
items = []
for row in ws.iter_rows(min_row=2, values_only=True):
    fam = str(row[9]).strip() if row[9] is not None else ''
    if not fam or fam.split('.')[0] not in GROUPS or fam not in SUB:
        continue
    items.append((key(fam), fam, nice(str(row[2]))))
items.sort(key=lambda x: (x[0], x[2].lower()))
data = [{'g': GROUPS[f.split('.')[0]], 's': SUB[f], 'n': n} for _, f, n in items]
with open(os.path.join(ROOT, 'menaje-articulos.js'), 'w', encoding='utf-8') as f:
    f.write('/* Listado de Menaje. Generado por _herramientas/menaje.py desde ' + os.path.basename(sys.argv[1]) + '. No editar a mano. */\n')
    f.write('window.MENAJE = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(len(data), 'artículos en', len({d['g'] for d in data}), 'familias')
