#!/usr/bin/env python3
"""Genera los QR de la web, uno por sitio donde se va a poner, para ver en el panel de estadísticas cuál funciona mejor.

Uso:   python3 generar_qr.py https://distribucionesvm.es furgoneta tarjeta carta albaran mostrador
Crea, en la carpeta «qr/», para cada nombre un PNG (para imprimir) y un SVG (vectorial, para rotular la furgoneta o
imprimir en grande). El QR lleva a  https://distribucionesvm.es/?o=nombre  y el panel cuenta las visitas de cada nombre.
Los QR son permanentes: no caducan ni dependen de ningún servicio. Usa solo letras minúsculas, números, «-» y «_».
Necesita:  pip install segno
"""
import re
import sys
from pathlib import Path

import segno


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    base = sys.argv[1].rstrip("/")
    if not base.startswith("https://"):
        sys.exit("La dirección debe empezar por https://")
    salida = Path(__file__).resolve().parent / "qr"
    salida.mkdir(exist_ok=True)
    for nombre in sys.argv[2:]:
        if not re.fullmatch(r"[a-z0-9_-]{1,30}", nombre):
            sys.exit(f"Nombre no válido: «{nombre}» (solo minúsculas, números, - y _)")
        url = f"{base}/?o={nombre}"
        # corrección de errores alta (H): sigue leyéndose aunque se ensucie o se ponga un logo pequeño en el centro
        qr = segno.make(url, error="h", micro=False)
        qr.save(salida / f"qr-{nombre}.png", scale=24, border=4, dark="#173b3c", light="white")
        qr.save(salida / f"qr-{nombre}.svg", scale=24, border=4, dark="#173b3c", light="white")
        print(f"OK  {nombre}: {url}")
    print(f"Archivos en {salida}")


if __name__ == "__main__":
    main()
