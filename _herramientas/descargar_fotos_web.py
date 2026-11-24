"""Descarga las fotos de una web (la portada y las páginas del mismo dominio) a una carpeta.

Uso (desde cualquier carpeta):
    python descargar_fotos_web.py https://www.ejemplo.com  carpeta_destino  [profundidad]  [ancho_minimo]

  profundidad   cuántos clics seguir desde la portada (por defecto 2)
  ancho_minimo  se ignoran las imágenes más pequeñas, en píxeles (por defecto 200)

Crea en la carpeta de destino:
    imagenes/        las fotos descargadas
    LISTADO.csv      nombre del archivo, texto alternativo, página donde estaba y dirección original
Después comprime la carpeta en un .zip y súbela a la conversación.

Solo usa la biblioteca estándar de Python 3 y Pillow (pip install pillow) para medir el tamaño.
Respeta un descanso entre peticiones. Úsalo solo en webs de las que tengáis permiso.
"""
import csv
import hashlib
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser

UA = "Mozilla/5.0 (compatible; descarga-fotos-catalogo/1.0)"
EXT = (".jpg", ".jpeg", ".png", ".webp", ".gif")


class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.imgs, self.links = [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "img":
            alt = a.get("alt", "") or ""
            for k in ("src", "data-src", "data-lazy-src", "data-original"):
                if a.get(k):
                    self.imgs.append((a[k], alt))
            for k in ("srcset", "data-srcset"):
                if a.get(k):
                    partes = [p.strip().split(" ")[0] for p in a[k].split(",") if p.strip()]
                    if partes:
                        self.imgs.append((partes[-1], alt))  # la última suele ser la más grande
        elif tag == "meta" and (a.get("property") in ("og:image", "twitter:image") or a.get("name") == "twitter:image"):
            if a.get("content"):
                self.imgs.append((a["content"], "og:image"))
        elif tag == "a" and a.get("href"):
            self.links.append(a["href"])
        elif tag == "source" and a.get("srcset"):
            self.imgs.append((a["srcset"].split(",")[-1].strip().split(" ")[0], ""))


def pedir(url, binario=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        datos = r.read()
        return datos if binario else datos.decode(r.headers.get_content_charset() or "utf-8", "replace")


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    inicio, destino = sys.argv[1], sys.argv[2]
    prof = int(sys.argv[3]) if len(sys.argv) > 3 else 2
    minimo = int(sys.argv[4]) if len(sys.argv) > 4 else 200
    dominio = urllib.parse.urlparse(inicio).netloc
    os.makedirs(os.path.join(destino, "imagenes"), exist_ok=True)
    try:
        from PIL import Image
    except ImportError:
        Image = None
        print("Aviso: sin Pillow no se puede filtrar por tamaño (pip install pillow).")

    vistas, cola, hechas, filas = set(), [(inicio, 0)], set(), []
    while cola:
        pagina, nivel = cola.pop(0)
        if pagina in vistas:
            continue
        vistas.add(pagina)
        try:
            html = pedir(pagina)
        except Exception as e:
            print("No se pudo abrir", pagina, e)
            continue
        p = Parser()
        p.feed(html)
        print(f"[{nivel}] {pagina}: {len(p.imgs)} imágenes")
        for src, alt in p.imgs:
            u = urllib.parse.urljoin(pagina, src.split("#")[0])
            if not u.lower().split("?")[0].endswith(EXT) or u in hechas:
                continue
            hechas.add(u)
            try:
                datos = pedir(u, binario=True)
            except Exception:
                continue
            if Image:
                try:
                    import io
                    ancho, alto = Image.open(io.BytesIO(datos)).size
                    if max(ancho, alto) < minimo:
                        continue
                except Exception:
                    pass
            nombre = os.path.basename(urllib.parse.urlparse(u).path) or hashlib.md5(u.encode()).hexdigest()
            nombre = re.sub(r"[^A-Za-z0-9._-]", "_", nombre)
            ruta = os.path.join(destino, "imagenes", nombre)
            if os.path.exists(ruta):
                ruta = os.path.join(destino, "imagenes", hashlib.md5(u.encode()).hexdigest()[:6] + "_" + nombre)
            with open(ruta, "wb") as f:
                f.write(datos)
            filas.append([os.path.basename(ruta), alt, pagina, u])
            time.sleep(0.3)
        if nivel < prof:
            for h in p.links:
                v = urllib.parse.urljoin(pagina, h.split("#")[0])
                if urllib.parse.urlparse(v).netloc == dominio and v not in vistas and not v.lower().endswith(EXT + (".pdf", ".zip")):
                    cola.append((v, nivel + 1))
        time.sleep(0.5)

    with open(os.path.join(destino, "LISTADO.csv"), "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["Archivo", "Texto alternativo", "Página", "Dirección original"])
        w.writerows(filas)
    print(f"\nListo: {len(filas)} imágenes en {os.path.join(destino, 'imagenes')}")


if __name__ == "__main__":
    main()
