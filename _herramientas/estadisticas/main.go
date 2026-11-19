// Estadísticas de Distribuciones VM: contador de visitas propio, sin cookies y sin servicios de terceros.
//
// Dos servidores en un solo programa:
//   - contador (público, lo expone Tailscale Funnel): solo recibe visitas en /hit y no enseña nada.
//   - panel (privado, solo en este ordenador por defecto): estadísticas con usuario y contraseña.
//
// Privacidad: no se guarda la dirección de internet ni nada que identifique a una persona. De cada visita se guarda la
// hora, la página, de dónde viene, el tipo de aparato y un código que cambia cada día y no se puede deshacer.
package main

import (
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"html"
	"io"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"
	_ "time/tzdata" // zonas horarias incluidas en el programa (Windows no las trae)
)

type Config struct {
	Contador string   `json:"escuchar_contador"`
	Panel    string   `json:"escuchar_panel"`
	Usuario  string   `json:"usuario"`
	Clave    string   `json:"clave"`
	Sal      string   `json:"sal_secreta"`
	Webs     []string `json:"webs_permitidas"`
	Zona     string   `json:"zona_horaria"`
}

// Visita guardada (una línea por visita en datos/AAAA-MM.jsonl).
type Hit struct {
	T string `json:"t"`           // fecha y hora local
	K string `json:"k"`           // v = página vista, e = evento (llamar, correo…)
	P string `json:"p"`           // página
	E string `json:"e,omitempty"` // evento
	O string `json:"o,omitempty"` // origen marcado en el QR (?o=furgoneta)
	R string `json:"r,omitempty"` // web de la que viene
	D string `json:"d"`           // móvil, tablet u ordenador
	V string `json:"v"`           // código anónimo del día
}

var (
	cfg     Config
	loc     *time.Location
	baseDir string
	mu      sync.Mutex
	limite  = map[string]int{}
	limMu   sync.Mutex
)

var eventosValidos = map[string]bool{"llamar": true, "correo": true, "formulario": true, "asistente": true}

func main() {
	exe, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	baseDir = filepath.Dir(exe)
	if d := os.Getenv("ESTADISTICAS_DIR"); d != "" {
		baseDir = d
	}
	cargarConfig()
	loc, err = time.LoadLocation(cfg.Zona)
	if err != nil {
		loc = time.FixedZone("CET", 3600)
	}
	_ = os.MkdirAll(filepath.Join(baseDir, "datos"), 0o755)

	go func() {
		for range time.Tick(time.Minute) {
			limMu.Lock()
			limite = map[string]int{}
			limMu.Unlock()
		}
	}()

	pub := http.NewServeMux()
	pub.HandleFunc("/hit", manejarHit)
	pub.HandleFunc("/salud", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "ok") })
	pub.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		fmt.Fprint(w, "Contador de Distribuciones VM")
	})
	pan := http.NewServeMux()
	pan.HandleFunc("/", conClave(manejarPanel))
	pan.HandleFunc("/export.csv", conClave(manejarCSV))

	fmt.Println("Estadísticas de Distribuciones VM en marcha.")
	fmt.Println("  Contador (para Tailscale Funnel):", cfg.Contador)
	fmt.Println("  Panel (ábrelo en el navegador):   http://" + verDireccion(cfg.Panel))
	fmt.Println("  Usuario:", cfg.Usuario, "· la contraseña está en config.json")
	fmt.Println("No cierres esta ventana: minimízala.")

	go func() { log.Fatal(http.ListenAndServe(cfg.Panel, pan)) }()
	log.Fatal(http.ListenAndServe(cfg.Contador, pub))
}

func verDireccion(a string) string {
	if strings.HasPrefix(a, ":") || strings.HasPrefix(a, "0.0.0.0") {
		return "localhost" + a[strings.LastIndex(a, ":"):]
	}
	return a
}

func aleatorio(n int) string {
	b := make([]byte, n)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}

func clave() string {
	const abc = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	b := make([]byte, 14)
	_, _ = rand.Read(b)
	for i := range b {
		b[i] = abc[int(b[i])%len(abc)]
	}
	return string(b)
}

func cargarConfig() {
	ruta := filepath.Join(baseDir, "config.json")
	if raw, err := os.ReadFile(ruta); err == nil {
		if err := json.Unmarshal(raw, &cfg); err != nil {
			log.Fatal("config.json no se entiende: ", err)
		}
	}
	cambio := false
	if cfg.Contador == "" {
		cfg.Contador, cambio = "127.0.0.1:8787", true
	}
	if cfg.Panel == "" {
		cfg.Panel, cambio = "127.0.0.1:8788", true
	}
	if cfg.Usuario == "" {
		cfg.Usuario, cambio = "admin", true
	}
	if cfg.Clave == "" {
		cfg.Clave, cambio = clave(), true
	}
	if cfg.Sal == "" {
		cfg.Sal, cambio = aleatorio(16), true
	}
	if len(cfg.Webs) == 0 {
		cfg.Webs, cambio = []string{"https://distribucionesvm.es"}, true
	}
	if cfg.Zona == "" {
		cfg.Zona, cambio = "Europe/Madrid", true
	}
	if cambio {
		raw, _ := json.MarshalIndent(cfg, "", "  ")
		if err := os.WriteFile(ruta, raw, 0o600); err != nil {
			log.Fatal("no puedo guardar config.json: ", err)
		}
		fmt.Println("Primera vez: he creado config.json con tu contraseña del panel:", cfg.Clave)
	}
}

// ---------------------------------------------------------------- contador

func ipDe(r *http.Request) string {
	if x := r.Header.Get("X-Forwarded-For"); x != "" {
		return strings.TrimSpace(strings.Split(x, ",")[0])
	}
	h, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return h
}

func esBot(ua string) bool {
	u := strings.ToLower(ua)
	if u == "" {
		return true
	}
	for _, s := range []string{"bot", "spider", "crawl", "slurp", "curl", "wget", "python", "headless", "lighthouse", "preview", "monitor", "facebookexternalhit", "scrapy"} {
		if strings.Contains(u, s) {
			return true
		}
	}
	return false
}

func dispositivo(ua string, w int) string {
	u := strings.ToLower(ua)
	switch {
	case strings.Contains(u, "ipad") || strings.Contains(u, "tablet"):
		return "tablet"
	case strings.Contains(u, "mobi") || strings.Contains(u, "iphone") || strings.Contains(u, "android"):
		if w >= 700 {
			return "tablet"
		}
		return "móvil"
	case w > 0 && w <= 760:
		return "móvil"
	}
	return "ordenador"
}

func limpio(s string, max int) string {
	s = strings.TrimSpace(s)
	if len(s) > max {
		s = s[:max]
	}
	return strings.Map(func(r rune) rune {
		if r < 32 || r == 127 {
			return -1
		}
		return r
	}, s)
}

func origenPermitido(o string) bool {
	for _, w := range cfg.Webs {
		if strings.EqualFold(strings.TrimRight(w, "/"), o) {
			return true
		}
	}
	return false
}

func manejarHit(w http.ResponseWriter, r *http.Request) {
	origen := r.Header.Get("Origin")
	if origen != "" {
		if !origenPermitido(origen) {
			http.Error(w, "origen no permitido", http.StatusForbidden)
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", origen)
		w.Header().Set("Vary", "Origin")
	}
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "86400")
		w.WriteHeader(http.StatusNoContent)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "usa POST", http.StatusMethodNotAllowed)
		return
	}
	ua := r.UserAgent()
	if esBot(ua) {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	raw, _ := io.ReadAll(io.LimitReader(r.Body, 2048))
	var in struct {
		K string `json:"k"`
		P string `json:"p"`
		E string `json:"e"`
		O string `json:"o"`
		R string `json:"r"`
		W int    `json:"w"`
	}
	if json.Unmarshal(raw, &in) != nil || (in.K != "v" && in.K != "e") {
		http.Error(w, "datos no válidos", http.StatusBadRequest)
		return
	}
	ahora := time.Now().In(loc)
	vis := sha256.Sum256([]byte(cfg.Sal + "|" + ahora.Format("2006-01-02") + "|" + ipDe(r) + "|" + ua))
	v := hex.EncodeToString(vis[:])[:12]

	limMu.Lock()
	limite[v]++
	n := limite[v]
	limMu.Unlock()
	if n > 90 {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	h := Hit{T: ahora.Format("2006-01-02T15:04:05"), K: in.K, D: dispositivo(ua, in.W), V: v}
	p := limpio(in.P, 200)
	if !strings.HasPrefix(p, "/") {
		p = "/"
	}
	if i := strings.IndexAny(p, "?#"); i >= 0 {
		p = p[:i]
	}
	h.P = p
	if in.K == "e" {
		if !eventosValidos[in.E] {
			http.Error(w, "evento no válido", http.StatusBadRequest)
			return
		}
		h.E = in.E
	}
	if o := strings.ToLower(limpio(in.O, 30)); o != "" {
		ok := true
		for _, c := range o {
			if !(c >= 'a' && c <= 'z' || c >= '0' && c <= '9' || c == '-' || c == '_') {
				ok = false
			}
		}
		if ok {
			h.O = o
		}
	}
	if rf := limpio(in.R, 100); rf != "" {
		if u, err := url.Parse(rf); err == nil && u.Host != "" {
			rf = strings.TrimPrefix(strings.ToLower(u.Host), "www.")
		}
		if !strings.Contains(rf, "distribucionesvm") {
			h.R = rf
		}
	}
	guardar(h, ahora)
	w.WriteHeader(http.StatusNoContent)
}

func guardar(h Hit, t time.Time) {
	linea, _ := json.Marshal(h)
	mu.Lock()
	defer mu.Unlock()
	f, err := os.OpenFile(filepath.Join(baseDir, "datos", t.Format("2006-01")+".jsonl"), os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o644)
	if err != nil {
		log.Println("no puedo guardar:", err)
		return
	}
	defer f.Close()
	_, _ = f.Write(append(linea, '\n'))
}

// ---------------------------------------------------------------- panel

var fallos = struct {
	sync.Mutex
	n map[string]int
}{n: map[string]int{}}

func conClave(sig http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		u, p, ok := r.BasicAuth()
		bien := ok && subtle.ConstantTimeCompare([]byte(u), []byte(cfg.Usuario)) == 1 &&
			subtle.ConstantTimeCompare([]byte(p), []byte(cfg.Clave)) == 1
		if !bien {
			time.Sleep(1500 * time.Millisecond)
			w.Header().Set("WWW-Authenticate", `Basic realm="Estadisticas DVM", charset="UTF-8"`)
			http.Error(w, "Hace falta usuario y contraseña", http.StatusUnauthorized)
			return
		}
		sig(w, r)
	}
}

func leerHits(desde time.Time) []Hit {
	archivos, _ := filepath.Glob(filepath.Join(baseDir, "datos", "*.jsonl"))
	sort.Strings(archivos)
	var out []Hit
	for _, a := range archivos {
		raw, err := os.ReadFile(a)
		if err != nil {
			continue
		}
		for _, l := range strings.Split(string(raw), "\n") {
			if l == "" {
				continue
			}
			var h Hit
			if json.Unmarshal([]byte(l), &h) != nil {
				continue
			}
			t, err := time.ParseInLocation("2006-01-02T15:04:05", h.T, loc)
			if err != nil || t.Before(desde) {
				continue
			}
			out = append(out, h)
		}
	}
	return out
}

func rango(r *http.Request) (int, time.Time) {
	d, err := strconv.Atoi(r.URL.Query().Get("d"))
	if err != nil || d < 0 || d > 3650 {
		d = 7
	}
	ahora := time.Now().In(loc)
	ini := time.Date(ahora.Year(), ahora.Month(), ahora.Day(), 0, 0, 0, 0, loc)
	if d == 0 {
		return 0, time.Time{}
	}
	return d, ini.AddDate(0, 0, -(d - 1))
}

func manejarCSV(w http.ResponseWriter, r *http.Request) {
	_, desde := rango(r)
	w.Header().Set("Content-Type", "text/csv; charset=utf-8")
	w.Header().Set("Content-Disposition", `attachment; filename="estadisticas-dvm.csv"`)
	fmt.Fprint(w, "\xef\xbb\xbffecha_hora,tipo,pagina,evento,origen,viene_de,aparato,codigo_dia\n")
	for _, h := range leerHits(desde) {
		fmt.Fprintf(w, "%s,%s,%s,%s,%s,%s,%s,%s\n", h.T, map[string]string{"v": "vista", "e": "evento"}[h.K], csv(h.P), h.E, h.O, csv(h.R), h.D, h.V)
	}
}

func csv(s string) string { return `"` + strings.ReplaceAll(s, `"`, `""`) + `"` }

type fila struct {
	Nombre string
	N      int
}

func top(m map[string]int, max int) []fila {
	var f []fila
	for k, v := range m {
		f = append(f, fila{k, v})
	}
	sort.Slice(f, func(i, j int) bool {
		if f[i].N != f[j].N {
			return f[i].N > f[j].N
		}
		return f[i].Nombre < f[j].Nombre
	})
	if max > 0 && len(f) > max {
		f = f[:max]
	}
	return f
}

func num(n int) string {
	s := strconv.Itoa(n)
	if n < 1000 {
		return s
	}
	var o []byte
	for i, c := range []byte(s) {
		if i > 0 && (len(s)-i)%3 == 0 {
			o = append(o, '.')
		}
		o = append(o, c)
	}
	return string(o)
}

func barras(f []fila, vacio string) string {
	if len(f) == 0 {
		return `<p class="vacio">` + vacio + `</p>`
	}
	max := 1
	for _, x := range f {
		if x.N > max {
			max = x.N
		}
	}
	var b strings.Builder
	b.WriteString(`<ul class="lista">`)
	for _, x := range f {
		fmt.Fprintf(&b, `<li><span class="nom">%s</span><span class="bar"><i style="width:%d%%"></i></span><b>%s</b></li>`, html.EscapeString(x.Nombre), x.N*100/max, num(x.N))
	}
	b.WriteString(`</ul>`)
	return b.String()
}

func columnas(etq []string, val []int, cada int) string {
	max := 1
	for _, v := range val {
		if v > max {
			max = v
		}
	}
	var b strings.Builder
	b.WriteString(`<div class="cols">`)
	for i, v := range val {
		etiqueta := ""
		if cada <= 1 || (len(val)-1-i)%cada == 0 {
			etiqueta = etq[i]
		}
		fmt.Fprintf(&b, `<div class="col" title="%s: %s"><i style="height:%d%%"></i><span>%s</span></div>`, html.EscapeString(etq[i]), num(v), v*100/max, html.EscapeString(etiqueta))
	}
	b.WriteString(`</div>`)
	return b.String()
}

func nombrePagina(p string) string {
	if p == "/" || p == "/index.html" || p == "" {
		return "Inicio"
	}
	return strings.TrimSuffix(strings.TrimPrefix(p, "/"), ".html")
}

func manejarPanel(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	d, desde := rango(r)
	hits := leerHits(desde)

	vistas, quedan := 0, map[string]bool{}
	horas := make([]int, 24)
	dias := make([]int, 7)
	porDia := map[string]int{}
	paginas, disp, refs, origenes, eventos := map[string]int{}, map[string]int{}, map[string]int{}, map[string]int{}, map[string]int{}
	vQR := 0
	var ultimo string
	for _, h := range hits {
		if h.T > ultimo {
			ultimo = h.T
		}
		if h.K == "e" {
			eventos[map[string]string{"llamar": "Pulsan en llamar", "correo": "Pulsan en el correo", "formulario": "Envían el formulario", "asistente": "Abren el asistente"}[h.E]]++
			continue
		}
		t, _ := time.ParseInLocation("2006-01-02T15:04:05", h.T, loc)
		vistas++
		quedan[h.T[:10]+h.V] = true
		horas[t.Hour()]++
		dias[(int(t.Weekday())+6)%7]++
		porDia[h.T[:10]]++
		paginas[nombrePagina(h.P)]++
		disp[h.D]++
		if h.O != "" {
			origenes[h.O]++
			vQR++
		}
		if h.R == "" {
			refs["Directo o sin dato"]++
		} else {
			refs[h.R]++
		}
	}

	titulo := map[int]string{1: "hoy", 7: "últimos 7 días", 30: "últimos 30 días", 90: "últimos 90 días", 0: "todo"}[d]
	if titulo == "" {
		titulo = fmt.Sprintf("últimos %d días", d)
	}
	var etqH []string
	for i := 0; i < 24; i++ {
		etqH = append(etqH, fmt.Sprintf("%02d", i))
	}
	nd := d
	if nd == 0 || nd > 31 {
		nd = 31
	}
	hoy := time.Now().In(loc)
	var etqD []string
	var valD []int
	for i := nd - 1; i >= 0; i-- {
		dd := hoy.AddDate(0, 0, -i)
		etqD = append(etqD, dd.Format("02/01"))
		valD = append(valD, porDia[dd.Format("2006-01-02")])
	}
	rangos := ""
	for _, o := range [][2]string{{"1", "Hoy"}, {"7", "7 días"}, {"30", "30 días"}, {"90", "90 días"}, {"0", "Todo"}} {
		clase := ""
		if o[0] == strconv.Itoa(d) {
			clase = ` class="on"`
		}
		rangos += fmt.Sprintf(`<a%s href="/?d=%s">%s</a>`, clase, o[0], o[1])
	}
	pie := "Aún no hay visitas registradas."
	if ultimo != "" {
		pie = "Última visita registrada: " + strings.Replace(ultimo, "T", " a las ", 1)
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	fmt.Fprintf(w, panelHTML,
		rangos, titulo,
		num(vistas), num(len(quedan)), num(vQR),
		barras(top(eventos, 0), "Todavía nadie ha pulsado."),
		columnas(etqH, horas, 1),
		columnas([]string{"Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"}, dias, 1),
		columnas(etqD, valD, map[bool]int{true: 5, false: 1}[len(valD) > 14]),
		barras(top(paginas, 12), "Sin datos todavía."),
		barras(top(origenes, 0), "Aún no ha entrado nadie con un QR (los QR llevan <code>?o=nombre</code>)."),
		barras(top(refs, 8), "Sin datos todavía."),
		barras(top(disp, 0), "Sin datos todavía."),
		html.EscapeString(pie), html.EscapeString(cfg.Zona), d)
}

const panelHTML = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Estadísticas · Distribuciones VM</title>
<style>
:root{--rojo:#c61819;--verde:#173b3c;--crema:#f7f3ea;--tinta:#251d1a}
*{box-sizing:border-box}body{margin:0;background:var(--crema);color:var(--tinta);font:16px/1.4 system-ui,Segoe UI,Arial,sans-serif}
header{background:var(--verde);color:#fff;padding:18px 20px}header h1{margin:0;font-size:1.25rem}header p{margin:4px 0 0;opacity:.8;font-size:.9rem}
main{max-width:1100px;margin:0 auto;padding:18px 16px 40px}
.rangos{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}.rangos a{padding:8px 16px;border-radius:99px;background:#fff;color:var(--tinta);text-decoration:none;font-weight:600;border:1px solid #e0d3bb}
.rangos a.on{background:var(--rojo);border-color:var(--rojo);color:#fff}
.tarjetas{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px}
.tarjeta{background:#fff;border-radius:14px;padding:16px 18px;border:1px solid #eadfcb}.tarjeta b{display:block;font-size:2.1rem;line-height:1.1;color:var(--rojo)}.tarjeta span{font-size:.9rem;opacity:.75}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}
section{background:#fff;border-radius:14px;padding:16px 18px;border:1px solid #eadfcb}section h2{margin:0 0 12px;font-size:1.05rem}section.ancho{grid-column:1/-1}
.lista{list-style:none;margin:0;padding:0;display:grid;gap:7px}.lista li{display:grid;grid-template-columns:minmax(120px,44%%) 1fr auto;gap:10px;align-items:center;font-size:.95rem}
.nom{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar{height:12px;background:#f1e8d6;border-radius:6px;overflow:hidden}.bar i{display:block;height:100%%;background:var(--verde);border-radius:6px}
.cols{display:flex;align-items:flex-end;gap:3px;height:150px;padding-bottom:20px}.col{flex:1;position:relative;height:100%%;display:flex;align-items:flex-end}.col i{display:block;width:100%%;background:var(--verde);border-radius:4px 4px 0 0;min-height:2px}
.col span{position:absolute;bottom:-20px;left:50%%;transform:translateX(-50%%);font-size:.62rem;opacity:.7;white-space:nowrap}
.vacio{margin:0;opacity:.6}footer{margin-top:16px;font-size:.85rem;opacity:.7}footer a{color:var(--rojo)}code{background:#f1e8d6;padding:1px 5px;border-radius:4px}
@media(max-width:560px){.cols .col span{display:none}.cols{padding-bottom:0}}
</style></head><body>
<header><h1>Estadísticas de la web · Distribuciones VM</h1><p>Contador propio, sin cookies. Solo ves datos agrupados, nunca personas.</p></header>
<main>
<div class="rangos">%s</div>
<p style="margin:0 0 12px;opacity:.7">Periodo: <b>%s</b></p>
<div class="tarjetas">
<div class="tarjeta"><b>%s</b><span>páginas vistas</span></div>
<div class="tarjeta"><b>%s</b><span>visitantes (cada día cuenta una vez)</span></div>
<div class="tarjeta"><b>%s</b><span>visitas que llegan por un QR</span></div>
</div>
<div class="grid">
<section><h2>Qué hace la gente</h2>%s</section>
<section class="ancho"><h2>A qué hora entran (hora de la zona)</h2>%s</section>
<section><h2>Qué día de la semana</h2>%s</section>
<section><h2>Visitas por día</h2>%s</section>
<section><h2>Páginas más vistas</h2>%s</section>
<section><h2>Por qué QR entran</h2>%s</section>
<section><h2>De dónde vienen</h2>%s</section>
<section><h2>Móvil u ordenador</h2>%s</section>
</div>
<footer>%s · Zona horaria: %s · <a href="/export.csv?d=%d">Descargar los datos (Excel)</a></footer>
</main></body></html>`
