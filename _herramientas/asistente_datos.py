"""Genera asistente-datos.js: datos de apoyo del asistente (azúcares y edulcorantes, cafés Mocay) a partir del Excel de artículos.

Uso (desde la raíz del repositorio):  python3 -I _herramientas/asistente_datos.py ruta/al/ARTICULOS.xlsx

Solo toma artículos que existan en el Excel (se comprueba cada nombre) y no lleva precios ni códigos.
Cada entrada: nombre en el Excel -> nombre que se muestra. «arabica» solo donde la propia marca o el nombre del artículo lo dicen.
"""
import json
import os
import sys

import openpyxl

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if len(sys.argv) < 2:
    raise SystemExit('Uso: python3 -I _herramientas/asistente_datos.py ruta/al/ARTICULOS.xlsx')

AZUCAR = [  # (nombre en el Excel, nombre visible, tipo)
    ('MOCAY AZUCAR " 5 GR " SOBRE (1 X 1000)', 'Mocay · azúcar blanco en sobre de 5 g (1.000 sobres)', 'Sobres'),
    ('MOCAY AZUCAR PAPEL SOBRE 7 GR (1X1000)', 'Mocay · azúcar blanco en sobre de papel de 7 g (1.000 sobres)', 'Sobres'),
    ('MOCAY AZUCAR MORENO SOBRE 5 GR (1X500)', 'Mocay · azúcar moreno en sobre de 5 g (500 sobres)', 'Sobres'),
    ('MOCAY AZUCAR Moreno Sobre 7 GR (1X500)', 'Mocay · azúcar moreno en sobre de 7 g (500 sobres)', 'Sobres'),
    ('MOCAY EDULCORANTE SOB.6GRX150 UN.', 'Mocay · edulcorante en sobre de 6 g (150 sobres)', 'Edulcorante'),
    ('AZUCAR ANAGRAMA SOBRE 6 GR (1 X 1.000)', 'Azúcar Anagrama en sobre de 6 g (1.000 sobres)', 'Sobres'),
    ('AZUCAR ANAGRAMA SOBRE 8 GR (1 X 1.150)', 'Azúcar Anagrama en sobre de 8 g (1.150 sobres)', 'Sobres'),
    ('AZUCAR ANAGRAMA TUBO 7 grs (1.000 UN)', 'Azúcar Anagrama en tubo de 7 g (1.000 unidades)', 'Sobres'),
    ('AZÚCAR BLANCO TETRAEDRO 750 UNID 7gr(genérico)', 'Azúcar blanco en tetraedro de 7 g (750 unidades)', 'Sobres'),
    ('AZUCAR BOLSA+AGITADOR 500 UN.', 'Azúcar en bolsita con agitador (500 unidades)', 'Sobres'),
    ('AZUCARITOS BLANCOS C/ 300 GR', 'Azucarillos blancos (caja de 300 g)', 'Azucarillos'),
    ('AZUCARITOS MORENO ESTUCHE 300 GR(50UND)', 'Azucarillos morenos (estuche de 300 g, 50 unidades)', 'Azucarillos'),
    ('AZUCAR AZUCARERA PAPEL 1 KG', 'Azúcar Azucarera en paquete de papel de 1 kg', 'A granel'),
]
CAFE = [  # (nombre en el Excel, nombre visible, grupo, ¿arábica?)
    ('MOCAY CAFE  MAESTRO COLOMBIA 1Kg', 'Maestro Colombia · 1 kg', 'Grano · gama Maestro', True),
    ('MOCAY MAESTRO ECOLOGICO ETIOPIA 1Kg', 'Maestro Ecológico Etiopía · 1 kg', 'Grano · gama Maestro', True),
    ('MOCAY MAESTRO PLUS 1Kg', 'Maestro Plus · 1 kg', 'Grano · gama Maestro', True),
    ('MOCAY BARISTA 2 (EN.N) 1Kg', 'Barista 2 · 1 kg', 'Grano · gama Barista', False),
    ('MOCAY BARISTA T.ITALIANO 1 KG', 'Barista Tueste Italiano · 1 kg', 'Grano · gama Barista', False),
    ('MOCAY BARISTA 3 DESCAF.(NATU)1K', 'Barista 3 descafeinado · 1 kg', 'Descafeinado', False),
    ('MOCAY PROFESIONAL DESCAF (ESPE.)1KG E.R.', 'Profesional descafeinado · 1 kg', 'Descafeinado', False),
    ('MOCAY BOLSA 500 GR DESCAFEINADO ECO', 'Descafeinado ecológico · bolsa de 500 g', 'Descafeinado', False),
    ('MOCAY DESCAF 100 SOBRE.ET.ROJA', 'Descafeinado en sobres (100 sobres)', 'Descafeinado', False),
    ('MOCAY ARABICA CAPSULA 9 GR (EST.1 X 50)', 'Cápsula Mocay Arábica · 9 g (50 cápsulas)', 'Cápsulas', True),
    ('MOCAY " 8 GR" CAPSULA "NUEVA" Descafe.(EST. 1X50)', 'Cápsula descafeinada · 8 g (50 cápsulas)', 'Cápsulas', False),
    ('MOCAY CAFE SOLUBLE SIN FILTRO 250gr', 'Café soluble · 250 g', 'Soluble', False),
]
wb = openpyxl.load_workbook(sys.argv[1], read_only=True)
nombres = {str(r[2]).strip() for r in wb.active.iter_rows(min_row=2, values_only=True) if r[2]}
for lista in (AZUCAR, CAFE):
    for fila in lista:
        if fila[0].strip() not in nombres:
            raise SystemExit('No está en el Excel: ' + fila[0])
datos = {'azucar': [{'n': n, 't': t} for _, n, t in AZUCAR],
         'cafe': [{'n': n, 'g': g, 'a': a} for _, n, g, a in CAFE]}
with open(os.path.join(ROOT, 'asistente-datos.js'), 'w', encoding='utf-8') as f:
    f.write('/* Datos de apoyo del asistente (azúcares y cafés Mocay). Generado por _herramientas/asistente_datos.py desde el Excel de artículos. No editar a mano. */\n')
    f.write('window.ASISTENTE_DATOS = ' + json.dumps(datos, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('ok asistente-datos.js')
