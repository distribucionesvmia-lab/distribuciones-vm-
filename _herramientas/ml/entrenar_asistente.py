"""Entrena el clasificador de temas del asistente (TF-IDF de n-gramas de caracteres + regresión logística) y lo exporta
a modelo-asistente.js, que chat.js lee en el navegador sin librerías ni servidor.

Uso (desde la raíz del repositorio):
    python3 -I _herramientas/ml/entrenar_asistente.py [--reglas reglas.json] [--c 20]

Necesita scikit-learn y numpy. Los datos están en _herramientas/ml/ejemplos.py.
Con --reglas (salida de etiquetar.js sobre las preguntas de PRUEBA) compara el sistema de reglas con las reglas + modelo.
"""
import argparse
import json
import os
import re
import sys
import unicodedata

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_predict

AQUI = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(AQUI, '..', '..'))
sys.path.insert(0, AQUI)
from ejemplos import ENTRENAMIENTO, PRUEBA  # noqa: E402


def prep(t):
    """Igual que norm() + las abreviaturas de limpiar() en chat.js."""
    t = unicodedata.normalize('NFD', str(t).lower())
    t = re.sub('[̀-ͯ]', '', t)
    t = re.sub(r'[^a-z0-9 ]+', ' ', t)
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r'\b(q|k|ke)\b', 'que', t)
    t = re.sub(r'\b(xq|pq|porq|porke)\b', 'porque', t)
    t = re.sub(r'\b(tb|tmb|tambn)\b', 'tambien', t)
    t = re.sub(r'\bx\b', 'por', t)
    t = re.sub(r'\bd\b', 'de', t)
    return re.sub(r'\s+', ' ', t).strip()


def datos(d):
    X, y = [], []
    for tema, frases in d.items():
        for f in frases:
            X.append(prep(f)); y.append(tema)
    return X, np.array(y)


ap = argparse.ArgumentParser()
ap.add_argument('--reglas')
ap.add_argument('--c', type=float, default=20.0)
ap.add_argument('--umbral', type=float, default=0.55)
args = ap.parse_args()

Xtr, ytr = datos(ENTRENAMIENTO)
Xte, yte = datos(PRUEBA)
vec = TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4), min_df=2, max_features=3000)
Atr = vec.fit_transform(Xtr)
clf = LogisticRegression(C=args.c, max_iter=3000)

# 1) validación cruzada sobre el entrenamiento
cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=1)
pred_cv = cross_val_predict(LogisticRegression(C=args.c, max_iter=3000), Atr, ytr, cv=cv)
print('validación cruzada (3 bloques): %.1f %%' % (100 * np.mean(pred_cv == ytr)))

# 2) preguntas aparte (nunca vistas en el entrenamiento)
clf.fit(Atr, ytr)
Ate = vec.transform(Xte)
proba = clf.predict_proba(Ate)
clases = list(clf.classes_)
top = np.array([clases[i] for i in proba.argmax(1)])
conf = proba.max(1)
print('preguntas aparte, solo modelo: %.1f %% (%d de %d)' % (100 * np.mean(top == yte), int(np.sum(top == yte)), len(yte)))
for u in (0.4, 0.5, 0.55, 0.6, 0.7):
    seg = conf >= u
    print('  umbral %.2f: contesta %d, acierta %.1f %% de las que contesta' % (u, seg.sum(), 100 * np.mean(top[seg] == yte[seg]) if seg.any() else 0))
print('\ninformes por tema (preguntas aparte):')
errores = [(yte[i], top[i], round(float(conf[i]), 2), Xte[i]) for i in range(len(yte)) if top[i] != yte[i]]
for e in errores: print('  esperaba %-12s dio %-12s (%.2f)  «%s»' % e)

# 3) reglas actuales frente a reglas + modelo
if args.reglas:
    r = json.load(open(args.reglas, encoding='utf-8'))
    CAT = {'productos', 'bebidas', 'cafe', 'pascual', 'lechecafe', 'lactosa', 'vinos', 'aguas', 'menaje', 'congelados', 'refrigerados', 'despensa'}
    def ok(t, got):
        if t == got: return True
        if t in CAT and (got in CAT or got in ('producto', 'web')): return True
        if t == 'nada' and got in ('nada', ''): return True
        if t == 'proxima' and got in ('proxima', 'zona', 'dias'): return True
        return False
    idx = {x['q']: x for x in r}
    base = alt1 = alt2 = n = 0
    u = args.umbral
    for q, t, p, c in zip(PRUEBA_Q := [q for tema in PRUEBA for q in PRUEBA[tema]], yte, top, conf):
        reg = idx[q]['rules']
        n += 1
        base += ok(t, reg)
        # A) el modelo solo entra cuando las reglas no entienden
        a1 = reg
        if reg in ('nada', '') and c >= u and p != 'nada': a1 = p
        alt1 += ok(t, a1)
        # B) además corrige a las reglas cuando el modelo está muy seguro
        a2 = a1
        if c >= 0.75 and p != 'nada' and not ok(p, reg) and reg not in ('nada', ''): a2 = p
        alt2 += ok(t, a2)
    print('\nreglas solas:                          %d de %d (%.1f %%)' % (base, n, 100 * base / n))
    print('reglas + modelo cuando no entienden:   %d de %d (%.1f %%)' % (alt1, n, 100 * alt1 / n))
    print('reglas + modelo corrigiendo si seguro: %d de %d (%.1f %%)' % (alt2, n, 100 * alt2 / n))

# 4) modelo final: entrena con todo (entrenamiento + preguntas aparte) y exporta
Xall, yall = Xtr + Xte, np.concatenate([ytr, yte])
vec2 = TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4), min_df=2, max_features=3000)
Aall = vec2.fit_transform(Xall)
clf2 = LogisticRegression(C=args.c, max_iter=3000).fit(Aall, yall)
vocab = vec2.get_feature_names_out()
W = clf2.coef_
nz = 0
filas = []
for j in range(len(vocab)):
    par = [[int(c), round(float(W[c, j]), 2)] for c in range(W.shape[0]) if abs(W[c, j]) >= 0.2]
    nz += len(par)
    filas.append(par)
modelo = {'clases': list(clf2.classes_), 'umbral': args.umbral,
          'vocab': list(vocab), 'idf': [round(float(x), 3) for x in vec2.idf_],
          'w': filas, 'b': [round(float(x), 3) for x in clf2.intercept_]}
salida = os.path.join(ROOT, 'modelo-asistente.js')
with open(salida, 'w', encoding='utf-8') as f:
    f.write('/* Clasificador de temas del asistente. Generado por _herramientas/ml/entrenar_asistente.py. No editar a mano. */\n')
    f.write('window.MODELO_ASISTENTE = ' + json.dumps(modelo, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('\nok modelo-asistente.js: %d n-gramas, %d pesos, %.0f KB' % (len(vocab), nz, os.path.getsize(salida) / 1024))

# 5) frases de comprobación para verificar que el JavaScript calcula lo mismo que Python
# (se usa el modelo exportado, con pesos redondeados, para comparar justo lo que usa la web)
def prob_exportada(texto):
    # reimplementación mínima del cálculo que hace chat.js, sobre el modelo ya redondeado
    cuenta = {}
    for w in prep(texto).split():
        w = ' ' + w + ' '
        for n in (2, 3, 4):
            off = 0
            cuenta[w[off:off + n]] = cuenta.get(w[off:off + n], 0) + 1
            while off + n < len(w):
                off += 1
                cuenta[w[off:off + n]] = cuenta.get(w[off:off + n], 0) + 1
            if off == 0: break
    pos = {g: i for i, g in enumerate(modelo['vocab'])}
    v = {pos[g]: c * modelo['idf'][pos[g]] for g, c in cuenta.items() if g in pos}
    nrm = np.sqrt(sum(x * x for x in v.values())) or 1
    lg = list(modelo['b'])
    for i, x in v.items():
        for c, wt in modelo['w'][i]: lg[c] += wt * x / nrm
    e = np.exp(np.array(lg) - max(lg)); return e / e.sum()
muestras = ['¿repartís en Rueda?', 'q dia pasais por olmedo', 'cuánto cuesta el transporte', 'hasta qué población vais', 'qué tiempo hace', 'tenéis leche sin lactosa', 'xq tardan tanto', 'hay alguien ahora mismo']
ver = []
for m in muestras:
    p = prob_exportada(m); k = int(p.argmax()); ver.append({'q': m, 'clase': modelo['clases'][k], 'p': round(float(p[k]), 4)})
json.dump(ver, open(os.path.join(AQUI, 'verificacion.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
tot = sum(prob_exportada(x).argmax() == clases.index(y) for x, y in zip(Xte, yte)) if False else None
