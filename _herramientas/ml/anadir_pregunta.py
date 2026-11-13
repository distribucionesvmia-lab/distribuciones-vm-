"""Añade preguntas reales de clientes al entrenamiento del asistente y (opcionalmente) reentrena.

Uso (desde la raíz del repositorio):
    python3 -I _herramientas/ml/anadir_pregunta.py TEMA "pregunta 1" "pregunta 2" ...
    python3 -I _herramientas/ml/anadir_pregunta.py --temas             (lista los temas)
    python3 -I _herramientas/ml/anadir_pregunta.py --reentrenar        (reentrena y escribe modelo-asistente.js)

TEMA es uno de los de INTENTS en chat.js (zona, dias, plazo, horario, pago…) o «nada» si la pregunta no tiene que ver con la distribuidora.
Si la pregunta necesita una respuesta nueva que todavía no existe, primero hay que escribirla en chat.js (INTENTS) y luego añadir aquí sus ejemplos.
"""
import os
import re
import subprocess
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
import ejemplos  # noqa: E402

RUTA = os.path.join(AQUI, 'ejemplos.py')
if len(sys.argv) < 2:
    raise SystemExit(__doc__)
if sys.argv[1] == '--temas':
    print(' '.join(ejemplos.ENTRENAMIENTO)); raise SystemExit
if sys.argv[1] == '--reentrenar':
    raise SystemExit(subprocess.call([sys.executable, '-I', os.path.join(AQUI, 'entrenar_asistente.py')], cwd=os.path.join(AQUI, '..', '..')))
tema, preguntas = sys.argv[1], sys.argv[2:]
if tema not in ejemplos.ENTRENAMIENTO:
    raise SystemExit('Tema desconocido: %s. Temas: %s' % (tema, ' '.join(ejemplos.ENTRENAMIENTO)))
texto = open(RUTA, encoding='utf-8').read()
# localiza la lista del tema dentro de ENTRENAMIENTO y añade las preguntas nuevas al final de esa lista
ini = texto.index('ENTRENAMIENTO = {')
fin = texto.index('\nPRUEBA = {')
bloque = texto[ini:fin]
m = re.search(r"( '%s': \[)(.*?)(\],\n)" % re.escape(tema), bloque, re.S)
if not m:
    raise SystemExit('No encuentro el tema en ejemplos.py')
nuevas = [p.strip() for p in preguntas if p.strip() and p.strip() not in ejemplos.ENTRENAMIENTO[tema]]
if not nuevas:
    raise SystemExit('Esas preguntas ya estaban.')
extra = ', ' + ', '.join(repr(p) for p in nuevas)
bloque = bloque[:m.end(2)] + extra + bloque[m.end(2):]
open(RUTA, 'w', encoding='utf-8').write(texto[:ini] + bloque + texto[fin:])
print('Añadidas %d pregunta(s) al tema «%s». Ahora: python3 -I _herramientas/ml/anadir_pregunta.py --reentrenar' % (len(nuevas), tema))
