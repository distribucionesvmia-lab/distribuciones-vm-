"""Crea el ZIP listo para subir por FTP a IONOS (carpeta raíz del dominio).

Uso (desde la raíz del repositorio):  python3 -I _herramientas/zip_ionos.py [salida.zip]

Incluye las páginas, los recursos y el .htaccess (compresión y caché). Deja fuera lo que no se publica:
herramientas, versiones antiguas, imágenes sin usar, documentos .md y el control de versiones.
Antes de generar el ZIP ejecuta versionar.py, seo.py (con BASE = el dominio de IONOS) y cabecera.py.
"""
import os
import sys
import zipfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'web-ionos.zip')
EXCLUDE_DIRS = {'.git', '.github', '.claude', '.taste-skill', '_herramientas', '_version-3d', '_version-anterior', '_sin-usar', '_site'}
EXCLUDE_EXT = {'.md', '.zip'}
EXCLUDE_FILES = {'.gitignore', '.DS_Store'}

n = 0
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = sorted(d for d in dirs if d not in EXCLUDE_DIRS)
        for f in sorted(files):
            if f in EXCLUDE_FILES or os.path.splitext(f)[1].lower() in EXCLUDE_EXT:
                continue
            p = os.path.join(base, f)
            if os.path.abspath(p) == os.path.abspath(OUT):
                continue
            z.write(p, os.path.relpath(p, ROOT))
            n += 1
print(n, 'archivos →', OUT, f'({os.path.getsize(OUT) // 1024} KB)')
