"""Genera precios.js (precios de tarifa de la web) a partir del Excel de artículos del ERP.

Uso (desde la raíz del repositorio):  python3 -I _herramientas/precios.py ruta/al/ARTICULOS.xlsx

Necesita openpyxl. Lee _herramientas/precios-mapa.json, que dice qué artículo del Excel corresponde a cada
producto de la web (clave «página|familia de la escena|nombre del producto»), y escribe precios.js con el
precio actual de cada artículo. Si un código no está en el Excel, avisa y no pone precio a ese producto.
Para quitar todos los precios de la web basta con vaciar el mapa (o borrar precios.js).
"""
import json
import os
import sys

import openpyxl

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
xlsx = sys.argv[1] if len(sys.argv) > 1 else None
if not xlsx:
    raise SystemExit('Uso: python3 -I _herramientas/precios.py ruta/al/ARTICULOS.xlsx')

ws = openpyxl.load_workbook(xlsx, data_only=True).active
price = {}
for row in ws.iter_rows(min_row=2, values_only=True):
    if row[1] is not None and row[3] is not None:
        price[str(row[1]).strip()] = float(row[3])

mapa = json.load(open(os.path.join(ROOT, '_herramientas', 'precios-mapa.json'), encoding='utf-8'))
out, faltan = {}, []
for key, v in sorted(mapa.items()):
    if v['cod'] in price:
        out[key] = {'p': round(price[v['cod']], 3), 'u': v.get('u', 'ud.')}
    else:
        faltan.append((key, v['cod']))
body = json.dumps(out, ensure_ascii=False, separators=(',', ':'))
open(os.path.join(ROOT, 'precios.js'), 'w', encoding='utf-8').write(
    '/* Precios de tarifa. Generado por _herramientas/precios.py desde ' + os.path.basename(xlsx) + '. No editar a mano. */\n'
    'window.PRECIOS = ' + body + ';\n')
print(len(out), 'precios escritos en precios.js')
for k, c in faltan:
    print('SIN PRECIO (código no encontrado):', c, k)
