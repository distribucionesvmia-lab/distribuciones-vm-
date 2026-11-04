"""Fija el dominio público en menaje.html, sitemap.xml y robots.txt.

Uso (desde la raíz del repositorio):
  python3 -I _herramientas/dominio.py https://www.ejemplo.es   # sustituye el marcador y completa las etiquetas de menaje.html
  python3 -I _herramientas/dominio.py --check                  # lista dónde queda el marcador

El dominio todavía es [POR CONFIRMAR] (ver MENAJE-PENDIENTES.md). Mientras tanto, los archivos usan
https://DOMINIO.POR-CONFIRMAR.invalid, un dominio reservado que nunca resuelve.
Qué hace con un dominio:
  - sustituye el marcador en el JSON-LD de menaje.html, en sitemap.xml y en robots.txt;
  - hace absolutas canonical, og:image y twitter:image de menaje.html y añade og:url;
  - quita los comentarios que explican el marcador.
Es idempotente: se puede ejecutar de nuevo con otro dominio mientras quede algún marcador o ruta relativa.
No quita el noindex de menaje.html: eso se decide aparte.
"""
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TOKEN = 'https://DOMINIO.POR-CONFIRMAR.invalid'
FILES = ['menaje.html', 'sitemap.xml', 'robots.txt']


def read(name):
    with open(os.path.join(ROOT, name), encoding='utf-8') as f:
        return f.read()


def write(name, text):
    with open(os.path.join(ROOT, name), 'w', encoding='utf-8') as f:
        f.write(text)


def check():
    found = False
    for name in FILES:
        for n, line in enumerate(read(name).splitlines(), 1):
            if 'POR-CONFIRMAR.invalid' in line:
                found = True
                print(f'{name}:{n}: {line.strip()[:110]}')
    print('Quedan marcadores: falta fijar el dominio.' if found else 'No quedan marcadores.')
    return 1 if found else 0


def apply(base):
    base = base.rstrip('/')
    if not re.fullmatch(r'https://[a-z0-9.-]+\.[a-z]{2,}(/[A-Za-z0-9._~/-]*)?', base):
        raise SystemExit('Indica un dominio con https://, por ejemplo https://www.ejemplo.es')
    for name in FILES:
        text = read(name).replace(TOKEN, base)
        text = re.sub(r'[ \t]*<!--(?:(?!-->).)*?POR-CONFIRMAR\.invalid(?:(?!-->).)*?-->\n?', '', text, flags=re.S)
        if name == 'menaje.html':   # comentarios de menaje.html que dejan de ser ciertos con el dominio fijado
            text = re.sub(r'[ \t]*<!--(?:(?!-->).)*?(?:Canonical relativa|og:image y twitter:image)(?:(?!-->).)*?-->\n?', '', text, flags=re.S)
        text = re.sub(r'^# El dominio aún es.*\n', '', text, flags=re.M)
        if name == 'menaje.html':
            text = re.sub(r'(<link rel="canonical" href=")menaje\.html(">)', rf'\g<1>{base}/menaje.html\2', text)
            text = re.sub(r'(<meta (?:property="og:image"|name="twitter:image") content=")(assets/[^"]+")', rf'\g<1>{base}/\2', text)
            if 'property="og:url"' not in text:
                text = text.replace('  <meta property="og:type" content="website">', f'  <meta property="og:url" content="{base}/menaje.html">\n  <meta property="og:type" content="website">', 1)
        write(name, text)
        print('ok', name)
    return 0


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    sys.exit(check() if sys.argv[1] == '--check' else apply(sys.argv[1]))
