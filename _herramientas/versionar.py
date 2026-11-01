"""Pone en cada <link> y <script> local de las páginas un ?v= que depende del contenido del archivo.

Uso (desde la raíz del repositorio):  python3 -I _herramientas/versionar.py

Si el archivo no cambia, su ?v= tampoco. Si cambia, cambia solo y los navegadores (y la caché de IONOS)
descargan la versión nueva. Ejecútalo siempre antes de publicar.
"""
import glob
import hashlib
import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
REF = re.compile(r'((?:href|src)="(?!https?:|//)([^"?#]+\.(?:css|js)))(?:\?v=[^"]*)?"')


def digest(path):
    with open(path, 'rb') as f:
        return hashlib.sha1(f.read()).hexdigest()[:8]


changed = 0
for page in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
    html = open(page, encoding='utf-8').read()

    def fix(m):
        target = os.path.join(ROOT, m.group(2))
        if not os.path.isfile(target):
            return m.group(0)
        return f'{m.group(1)}?v={digest(target)}"'

    new = REF.sub(fix, html)
    if new != html:
        open(page, 'w', encoding='utf-8').write(new)
        changed += 1
        print('actualizado', os.path.basename(page))
print(changed, 'páginas con versiones nuevas')
