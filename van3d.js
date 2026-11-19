/* Furgoneta 3D de la portada (Mercedes-Benz Sprinter chasis cabina).
   Modelo sencillo con Three.js (copia local en assets/vendor) y las fotos reales del vehículo como rótulos:
   lateral izquierdo, lateral derecho y frontal, recortadas, sin matrícula y sin golpes.
   Se carga solo cuando la zona está cerca de la pantalla; si el navegador no admite WebGL se queda la foto lateral. */
(function () {
  'use strict';
  var fig = document.getElementById('van-fig');
  if (!fig) return;
  var photo = fig.querySelector('.van-photo');
  var poster = fig.querySelector('.van-img');
  if (!photo) return;

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hasWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }
  if (!hasWebGL()) return;

  var started = false;
  function start() {
    if (started) return;
    started = true;
    var s = document.createElement('script');
    s.src = 'assets/vendor/three.min.js';
    s.onload = build;
    document.head.appendChild(s);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); start(); }
    }, { rootMargin: '1200px 0px' });
    io.observe(fig);
  } else {
    window.addEventListener('load', start);
  }

  function build() {
    var T = window.THREE;
    if (!T) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'van-canvas';
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Furgoneta de reparto Mercedes-Benz Sprinter de Distribuciones Valentín en 3D. Arrastra para girarla.');
    canvas.tabIndex = 0;
    photo.appendChild(canvas);

    var renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (e) { canvas.remove(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.setClearColor(0x000000, 0);

    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(22, 1.6, 1, 100);
    var target = new T.Vector3(0, 1.28, 0);
    scene.add(new T.HemisphereLight(0xffffff, 0xd9d4c8, 0.95));
    var sun = new T.DirectionalLight(0xffffff, 0.55);
    sun.position.set(4, 8, 6);
    scene.add(sun);

    /* medidas en metros: la furgoneta mira hacia -x; largo 6,6 m, ancho 2,1 m. La silueta sale de la propia foto lateral */
    var L = 6.6, W = 2.1, HALF = W / 2, X0 = -L / 2, PX = 1200 / L, H = 514 / PX;
    var van = new T.Group();
    scene.add(van);
    var white = new T.MeshLambertMaterial({ color: 0xeceff0 });
    var dark = new T.MeshLambertMaterial({ color: 0x2d3033 });

    /* perfil superior (cada 24 px de la foto): cabina, deflector y caja */
    var TOP = [319, 310, 301, 294, 287, 259, 238, 215, 201, 177, 155, 141, 135, 96, 96, 67, 62, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2];
    var BODY_Y0 = 0.42, pts = [];
    pts.push(new T.Vector2(X0 + 0.05, BODY_Y0));
    TOP.forEach(function (t, k) { pts.push(new T.Vector2(X0 + (k * 24 + 12) / PX, Math.max(BODY_Y0 + 0.2, H - t / PX - 0.02))); });
    pts.push(new T.Vector2(L / 2 - 0.03, H - 0.04));
    pts.push(new T.Vector2(L / 2 - 0.03, BODY_Y0));
    var bodyGeo = new T.ExtrudeGeometry(new T.Shape(pts), { depth: W - 0.06, bevelEnabled: false });
    bodyGeo.translate(0, 0, -(W - 0.06) / 2);
    van.add(new T.Mesh(bodyGeo, white));

    function box(x0, x1, y0, y1, w, mat) {
      var m = new T.Mesh(new T.BoxGeometry(x1 - x0, y1 - y0, w), mat || white);
      m.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0);
      van.add(m);
    }
    /* chasis y paragolpes trasero */
    box(X0 + 0.3, L / 2 - 0.1, 0.4, 0.78, 1.3, dark);
    box(L / 2 - 0.02, L / 2 + 0.14, 0.50, 0.78, 1.9, dark);

    /* ruedas */
    var tire = new T.MeshLambertMaterial({ color: 0x1b1c1e });
    var hub = new T.MeshLambertMaterial({ color: 0x9aa0a4 });
    function wheel(x, z) {
      var g = new T.Group();
      var t = new T.Mesh(new T.CylinderGeometry(0.4, 0.4, 0.3, 28), tire);
      var h = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.32, 20), hub);
      t.rotation.x = Math.PI / 2; h.rotation.x = Math.PI / 2;
      g.add(t); g.add(h);
      g.position.set(x, 0.4, z);
      van.add(g);
    }
    var fx = X0 + 144 / PX, rx = X0 + 912 / PX;
    [fx, rx].forEach(function (x) { wheel(x, 0.82); wheel(x, -0.82); });

    /* trasera: puertas blancas con luces (sin matrícula) */
    var rc = document.createElement('canvas');
    rc.width = 512; rc.height = 495;
    var cx = rc.getContext('2d');
    cx.fillStyle = '#eceff0'; cx.fillRect(0, 0, 512, 495);
    cx.fillStyle = '#c9cdd0'; cx.fillRect(254, 14, 4, 467);
    cx.fillStyle = '#9aa0a4'; cx.fillRect(236, 230, 10, 34); cx.fillRect(266, 230, 10, 34);
    cx.fillStyle = '#b3282d'; cx.fillRect(10, 330, 22, 90); cx.fillRect(480, 330, 22, 90);
    cx.strokeStyle = '#c9cdd0'; cx.lineWidth = 4; cx.strokeRect(6, 6, 500, 483);
    var rt = new T.CanvasTexture(rc); rt.encoding = T.sRGBEncoding;
    var rear = new T.Mesh(new T.PlaneGeometry(W, 2.03), new T.MeshBasicMaterial({ map: rt }));
    rear.position.set(L / 2 + 0.003, 1.785, 0);
    rear.rotation.y = Math.PI / 2;
    van.add(rear);

    /* sombra suave en el suelo (no gira con la furgoneta) */
    var sc = document.createElement('canvas');
    sc.width = 256; sc.height = 128;
    var sx = sc.getContext('2d');
    sx.translate(128, 64); sx.scale(1, 0.5);
    var gr = sx.createRadialGradient(0, 0, 6, 0, 0, 120);
    gr.addColorStop(0, 'rgba(30,24,20,.40)'); gr.addColorStop(0.6, 'rgba(30,24,20,.18)'); gr.addColorStop(1, 'rgba(30,24,20,0)');
    sx.fillStyle = gr; sx.beginPath(); sx.arc(0, 0, 120, 0, Math.PI * 2); sx.fill();
    var st = new T.CanvasTexture(sc); st.encoding = T.sRGBEncoding;
    var shadow = new T.Mesh(new T.PlaneGeometry(9.4, 4.2), new T.MeshBasicMaterial({ map: st, transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    scene.add(shadow);

    /* fotos reales como rótulos */
    var loader = new T.TextureLoader();
    var pending = 3;
    function tex(url, cb) {
      loader.load(url, function (t) {
        t.encoding = T.sRGBEncoding;
        t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        cb(t, t.image.width, t.image.height);
        if (--pending === 0) ready();
      });
    }
    function mat(t) { return new T.MeshBasicMaterial({ map: t, transparent: true, alphaTest: 0.45 }); }

    tex('assets/van3d/van-izquierda.png', function (t, w, h) {
      var m = new T.Mesh(new T.PlaneGeometry(L, L * h / w), mat(t));
      m.position.set(0, L * h / w / 2, HALF + 0.004);
      van.add(m);
    });
    tex('assets/van3d/van-derecha.png', function (t, w, h) {
      var m = new T.Mesh(new T.PlaneGeometry(L, L * h / w), mat(t));
      m.position.set(0, L * h / w / 2, -HALF - 0.004);
      m.rotation.y = Math.PI;
      van.add(m);
    });
    tex('assets/van3d/van-frente.png', function (t, w, h) {
      var fw = 2.2, fh = fw * h / w;
      var m = new T.Mesh(new T.PlaneGeometry(fw, fh), mat(t));
      m.position.set(X0 + 0.02, 0.3 + fh / 2, 0);
      m.rotation.y = -Math.PI / 2;
      van.add(m);
    });

    /* cámara y giro con el dedo o el ratón */
    var yaw = 0, pitch = 0.13, vel = 0, drag = false, lastX = 0, lastY = 0, hinting = !reduce, t0 = 0;
    var visible = true, running = false, shown = false;

    function size() {
      var w = fig.clientWidth || 600, h = fig.clientHeight || 380;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    function place() {
      var d = 11.9 * Math.max(1, 1.62 / camera.aspect);
      camera.position.set(target.x, target.y + Math.sin(pitch) * d, Math.cos(pitch) * d);
      camera.lookAt(target);
    }
    function draw(now) {
      if (hinting) {
        t0 = t0 || now;
        var el = (now - t0) / 1000;
        if (el > 4.2) hinting = false; else yaw = Math.sin(el * 1.5) * 0.5 * Math.max(0, 1 - el / 4.2);
      }
      if (!drag && Math.abs(vel) > 0.0004) { yaw += vel; vel *= 0.94; } else if (!drag) { vel = 0; }
      van.rotation.y = yaw;
      place();
      renderer.render(scene, camera);
    }
    function loop(now) {
      if (!visible) { running = false; return; }
      draw(now);
      if (drag || hinting || Math.abs(vel) > 0.0004) requestAnimationFrame(loop); else running = false;
    }
    function kick() { if (!running && visible) { running = true; requestAnimationFrame(loop); } }

    function ready() {
      size(); draw(performance.now());
      canvas.classList.add('is-ready');
      if (poster) poster.classList.add('is-hidden');
      shown = true;
      kick();
    }
    if (window.ResizeObserver) new ResizeObserver(function () { if (shown) { size(); draw(performance.now()); } }).observe(fig);
    else window.addEventListener('resize', function () { if (shown) { size(); draw(performance.now()); } });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) kick(); }).observe(fig);
    }

    canvas.addEventListener('pointerdown', function (e) {
      drag = true; hinting = false; vel = 0; lastX = e.clientX; lastY = e.clientY;
      try { canvas.setPointerCapture(e.pointerId); } catch (x) { /* nada */ }
      fig.classList.add('is-dragging');
      kick();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      vel = dx * 0.0085; yaw += vel;
      pitch = Math.max(0.02, Math.min(0.5, pitch + dy * 0.004));
      kick();
    });
    function up() { drag = false; fig.classList.remove('is-dragging'); kick(); }
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { vel = -0.05; hinting = false; kick(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { vel = 0.05; hinting = false; kick(); e.preventDefault(); }
    });
  }
})();
