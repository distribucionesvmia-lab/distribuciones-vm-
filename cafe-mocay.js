(function () {
  'use strict';

  var chapters = Array.prototype.slice.call(document.querySelectorAll('.m-chapter'));
  var media = Array.prototype.slice.call(document.querySelectorAll('.m-stage-media'));
  var spriteSets = media.map(function (item) { return Array.prototype.slice.call(item.querySelectorAll('.m-sprite')); });
  var journey = document.querySelector('.m-journey');
  var index = document.getElementById('m-stage-index');
  var reduce = window.VM_REDUCE || window.matchMedia('(prefers-reduced-motion: reduce)');
  var ticking = false;
  var centers = [];
  var lastActive = -1;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function measure() {
    centers = chapters.map(function (chapter) {
      var box = chapter.getBoundingClientRect();
      return window.scrollY + box.top + box.height / 2;
    });
    update();
  }

  function update() {
    ticking = false;
    if (!journey || !centers.length) return;
    var focus = window.scrollY + window.innerHeight * (window.innerWidth <= 700 ? .65 : .52);
    var position = 0;
    if (focus >= centers[centers.length - 1]) position = centers.length - 1;
    else if (focus > centers[0]) {
      for (var i = 0; i < centers.length - 1; i++) {
        if (focus < centers[i + 1]) {
          position = i + (focus - centers[i]) / (centers[i + 1] - centers[i]);
          break;
        }
      }
    }

    var active = Math.round(position);
    if (active !== lastActive) {
      lastActive = active;
      index.innerHTML = String(active + 1).padStart(2, '0') + ' <span>/ 03</span>';
      journey.setAttribute('data-active', chapters[active].getAttribute('data-chapter'));
    }

    media.forEach(function (item, i) {
      var delta = position - i;
      var weight = reduce.matches ? (i === active ? 1 : 0) : clamp(1 - Math.abs(delta) * 2, 0, 1);
      item.style.opacity = weight.toFixed(3);
      item.style.visibility = weight > .001 ? 'visible' : 'hidden';
      item.style.transform = reduce.matches ? 'none' :
        'translate3d(' + (-delta * 12).toFixed(1) + 'px,' + (delta * -35).toFixed(1) + 'px,0) scale(' + (.91 + weight * .09).toFixed(3) + ')';
      spriteSets[i].forEach(function (sprite) {
        var depth = +(sprite.getAttribute('data-depth') || .5);
        sprite.style.transform = reduce.matches ? 'none' :
          'translate3d(' + (-delta * depth * 32).toFixed(1) + 'px,' + (delta * depth * 20).toFixed(1) + 'px,0) rotate(' + (delta * depth * 2.5).toFixed(2) + 'deg)';
      });
    });
  }

  function requestUpdate() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  if (journey && chapters.length === media.length) {
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    if (reduce.addEventListener) reduce.addEventListener('change', requestUpdate);
    window.addEventListener('load', measure);
    measure();
  }

  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add('m-no-gsap');
    return;
  }
  if (reduce.matches) return;
  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* caída de granos al abrir la página: recortes fotográficos con profundidad de campo */
  (function () {
    var hero = document.querySelector('.m-hero');
    if (!hero) return;
    var mob = window.matchMedia('(max-width: 900px)').matches;
    var rain = document.createElement('div');
    rain.className = 'm-rain';
    rain.setAttribute('aria-hidden', 'true');
    hero.appendChild(rain);
    var seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    var count = mob ? 14 : 30, beans = [], maxEnd = 0;
    for (var i = 0; i < count; i++) {
      var depth = rnd();
      var size = ((mob ? 38 : 46) + depth * (mob ? 90 : 150)) * 0.8;
      var img = document.createElement('img');
      img.src = 'assets/grano-cafe.webp'; img.alt = ''; img.className = 'm-bean';
      img.width = 201; img.height = 280;
      img.style.width = size + 'px'; img.style.height = 'auto';
      var blur = depth > 0.82 ? (depth - 0.82) * 30 : (depth < 0.25 ? (0.25 - depth) * 12 : 0);
      img.style.filter = 'drop-shadow(0 ' + (8 + depth * 18) + 'px ' + (6 + depth * 12) + 'px rgba(20,16,13,.32)) blur(' + blur.toFixed(1) + 'px)';
      rain.appendChild(img);
      beans.push({ el: img, size: size, x: rnd(), rot: rnd() * 360, spin: (rnd() < 0.5 ? -1 : 1) * (180 + rnd() * 380), flip: rnd() < 0.5 ? -1 : 1, start: 0.3 + rnd() * 3.2, dur: 4.6 - depth * 2.2 });
    }
    var W = function () { return rain.clientWidth; }, H = function () { return rain.clientHeight; };
    var tl = gsap.timeline({ onComplete: function () { rain.parentNode && rain.parentNode.removeChild(rain); } });
    beans.forEach(function (b) {
      gsap.set(b.el, { x: b.x * (W() - b.size * 0.4) - b.size * 0.2, scaleX: b.flip, rotation: b.rot });
      tl.fromTo(b.el, { y: -b.size * 1.4 }, { y: H() + b.size * 0.4, rotation: b.rot + b.spin, ease: 'power1.in', duration: b.dur }, b.start);
    });
  })();

  gsap.from('.m-hero-copy > *', {
    y: 24, autoAlpha: 0, duration: 1, stagger: .09, ease: 'power3.out', delay: .08
  });
  gsap.from('.m-hero-pack', {
    x: 70, y: 80, rotation: 5, scale: .9, autoAlpha: 0,
    duration: 1.5, ease: 'power3.out', delay: .25
  });
  gsap.to('.m-hero-pack', {
    yPercent: -14, rotation: -1, ease: 'none',
    scrollTrigger: { trigger: '.m-hero', start: 'top top', end: 'bottom top', scrub: .5 }
  });
  gsap.to('.m-halo', {
    scale: 1.13, rotation: 8, ease: 'none',
    scrollTrigger: { trigger: '.m-hero', start: 'top top', end: 'bottom top', scrub: .5 }
  });

  gsap.fromTo('.m-service-image img', { scale: 1.08, yPercent: -3 }, {
    scale: 1.08, yPercent: 3, ease: 'none',
    scrollTrigger: { trigger: '.m-service', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  window.addEventListener('load', function () { window.ScrollTrigger.refresh(); measure(); });
})();

/* Precios de tarifa de las infusiones: salen de precios.js (lo genera _herramientas/precios.py) */
(function () {
  'use strict';
  var P = window.PRECIOS;
  if (!P) return;
  var shown = 0;
  Array.prototype.forEach.call(document.querySelectorAll('.m-inf-card[data-precio]'), function (li) {
    var e = P[li.getAttribute('data-precio')];
    if (!e) return;
    var s = document.createElement('span');
    s.className = 'm-inf-price';
    s.innerHTML = '<b>' + Number(e.p).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €</b> <small>' + String(e.u || 'ud.').replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</small>';
    li.appendChild(s);
    shown++;
  });
  if (shown) {
    var sec = document.getElementById('infusiones');
    if (sec) { var n = document.createElement('p'); n.className = 'm-inf-note'; n.textContent = 'Precios de tarifa por formato de venta. Pide tu tarifa personalizada, sin compromiso.'; sec.appendChild(n); }
  }
})();
