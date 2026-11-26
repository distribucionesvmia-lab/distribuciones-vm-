/* Reusable, content-driven product scenes. Product data belongs in a separate file. */
(function () {
  'use strict';

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const img = (item, className = '', eager = false) => `<img class="${className}" src="${esc(item.image)}" alt="${esc(item.alt || item.name)}" width="${Number(item.width) || 600}" height="${Number(item.height) || 600}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
  /* identificador estable de cada escena (enlaces con #): item.id o, si falta, familia + título */
  const slug = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
  const sid = item => ` id="${esc(item.id || slug((item.family || '') + ' ' + (item.title || '')))}"`;
  /* texto escapado con negrita opcional: **así** */
  const rich = value => esc(value).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const number = index => String(index + 1).padStart(2, '0');
  let total = 4;
  const dark = item => item.dark ? ' is-dark' : '';
  const label = (item, index) => `<p class="pw-scene-label"><span>${number(index)} / ${String(total).padStart(2, '0')}</span><span>${esc(item.label || item.family)}</span></p>`;
  /* Precios de tarifa: viven en precios.js (los genera _herramientas/precios.py desde el Excel de artículos). Clave: página|familia|nombre. */
  const page = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
  const fmt = n => Number(n).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const price = (family, p) => {
    if (p && p.precio != null) return `<span class="pw-price"><span class="pw-price-n">${fmt(p.precio)} €</span> <span class="pw-price-u">${esc(p.precioNota || 'IVA incluido')}</span></span>`;
    const e = window.PRECIOS && p && window.PRECIOS[`${page}|${family}|${p.name}`];
    return e ? `<span class="pw-price"><span class="pw-price-n">${fmt(e.p)} €</span> <span class="pw-price-u">${esc(e.u || 'ud.')}</span></span>` : '';
  };
  const button = item => item.cta ? `<a class="pw-link" href="${esc(item.cta.href)}">${esc(item.cta.label)} <span aria-hidden="true">↗</span></a>` : '';

  const templates = {
    hero(item, index) {
      return `<section${sid(item)} class="pw-scene pw-a${item.orbit?' has-orbit':''}${item.product.wide?' is-wide':''}${item.mirror?' is-mirror':''}${dark(item)}" style="--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}">
        <div class="pw-sticky"><div class="pw-scene-inner">${label(item,index)}
          <div class="pw-a-copy"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2><p class="pw-description">${rich(item.description)}</p>${item.faq?`<details class="pw-more-text pw-faq-d"><summary>${esc(item.faq.q)}</summary><p>${rich(item.faq.a)}</p></details>`:''}${price(item.family,item.product)}${button(item)}</div>
          <div class="pw-a-art">${item.logo?`<img class="pw-a-logo" src="${esc(item.logo.image)}" alt="${esc(item.logo.alt)}" width="${Number(item.logo.width)}" height="${Number(item.logo.height)}">`:''}<span class="pw-a-ring" aria-hidden="true"></span><span class="pw-a-backword" aria-hidden="true">${esc(item.backword || item.family)}</span>${img(item.product,'pw-a-product')}${item.orbit?`<ul class="pw-a-orbit" style="--n:${item.orbit.length}" aria-label="${esc(item.orbitLabel||'Formatos')}">${item.orbit.map((o,k)=>`<li style="--i:${k}"><img src="${esc(o.image)}" alt="${esc(o.alt||o.name)}" title="${esc(o.name||o.alt)}" width="${Number(o.width)||420}" height="${Number(o.height)||420}" loading="lazy" decoding="async"></li>`).join('')}</ul>`:''}${item.bottom?'':`<p class="pw-product-note">${esc(item.product.name)}</p>`}</div>
          ${item.bodegon?`<figure class="pw-a-bodegon"><img src="${esc(item.bodegon.image)}" alt="${esc(item.bodegon.alt)}" width="${Number(item.bodegon.width)||1055}" height="${Number(item.bodegon.height)||406}" loading="lazy" decoding="async"></figure>`:''}
          ${item.showcase?`<ul class="pw-a-showcase" aria-label="Formatos industriales">${item.showcase.map(f=>`<li><img src="${esc(f.image)}" alt="${esc(f.alt)}" title="${esc(f.alt)}" width="320" height="320" loading="lazy" decoding="async"></li>`).join('')}</ul>`:''}
          <p class="pw-scene-bottom">${esc(item.bottom || '')}</p>
        </div></div></section>`;
    },
    range(item, index) {
      return `<section${sid(item)} class="pw-scene pw-b${dark(item)}" style="--n:${item.products.length};--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}">
        <div class="pw-sticky"><div class="pw-scene-inner">${label(item,index)}
          <div class="pw-b-head"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2><p>${esc(item.description)}</p></div>
          <div class="pw-b-window"><div class="pw-b-track">${item.products.map((p,i) => `<article class="pw-b-panel${p.duo?' is-duo':''}"><span class="pw-panel-number">${number(i)} / ${String(item.products.length).padStart(2,'0')}</span><div class="pw-b-image">${img(p,'',true)}</div><div class="pw-b-copy"><p class="pw-panel-kicker">${esc(p.kicker || item.family)}</p><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>${price(item.family,p)}</div></article>`).join('')}</div></div>
          <div class="pw-b-bottom"><span>Desliza para recorrer la gama →</span><span class="pw-progress"><i></i></span></div>
        </div></div></section>`;
    },
    editorial(item, index) {
      /* tarjeta lateral opcional (item.side): se queda fija a un lado y, al hacer scroll, van pasando sus ventajas */
      const side = item.side ? `<aside class="pw-c-side" style="--frame-color:${esc(item.side.frames[0].color || item.color)}" aria-label="${esc(item.side.title)}"><p class="pw-overline">${esc(item.side.eyebrow)}</p><h3 class="pw-c-side-title">${esc(item.side.title)}</h3><div class="pw-c-side-frames">${item.side.frames.map((f,i)=>`<div class="pw-c-side-frame${i===0?' is-current':''}" style="--frame-color:${esc(f.color || item.color)}"><div class="pw-c-side-icon">${img(f)}</div><div class="pw-c-side-copy"><span>${number(i)} / ${String(item.side.frames.length).padStart(2,'0')}</span><h4>${esc(f.name)}</h4><p>${esc(f.description)}</p></div></div>`).join('')}</div><div class="pw-c-side-rail" aria-hidden="true">${item.side.frames.map((_,i)=>`<i${i===0?' class="is-current"':''}></i>`).join('')}</div></aside>` : '';
      return `<section${sid(item)} class="pw-scene pw-c${item.columns===3?' is-3':''}${item.side?' has-side':''}${dark(item)}" style="--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}"><div class="pw-c-inner">${label(item,index)}
        <div class="pw-c-title">${item.logo?`<img class="pw-c-logo" src="${esc(item.logo.image)}" alt="${esc(item.logo.alt)}" width="${Number(item.logo.width)||300}" height="${Number(item.logo.height)||100}" decoding="async">`:''}<p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2><p>${esc(item.description)}</p></div>
        <div class="pw-c-grid"${item.gridId?` id="${esc(item.gridId)}"`:''}>${item.products.map((p,i) => `<article class="pw-c-item"><div class="pw-c-photo${p.cover?' is-cover':''}"${p.cover?` style="--ar:${Number(p.width)||4}/${Number(p.height)||3}"`:''}>${img(p)}</div><div class="pw-c-caption"><span>${number(i)}</span><div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>${price(item.family,p)}</div></div></article>`).join('')}</div>${button(item)}${side}</div></section>`;
    },
    lineup(item, index) {
      const n = item.variants.length;
      const multi = item.variants.some(v => v.image);
      /* una «ranura» por foto: una referencia puede llevar fotos extra (v.extra) que se van mostrando una tras otra con el scroll */
      const slots = [];
      item.variants.forEach((v, i) => {
        if (v.image) { slots.push({ v: i, s: 0, o: v }); (v.extra || []).forEach((e, k) => slots.push({ v: i, s: k + 1, o: e })); }
        else slots.push({ v: i, s: 0, o: null });
      });
      return `<section${sid(item)} class="pw-scene pw-e${n>8?' is-long':''}${n>9?' is-scroll':''}${(item._flip||item.flip)?' is-flip':''}${dark(item)}" style="--n:${slots.length};--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}">
        <div class="pw-sticky"><div class="pw-scene-inner">${item.sinRotulo?'':label(item,index)}
          <div class="pw-e-grid">
            <div class="pw-e-head">${item.logo?`<img class="pw-e-logo" src="${esc(item.logo.image)}" alt="${esc(item.logo.alt)}" width="${Number(item.logo.width)||300}" height="${Number(item.logo.height)||80}" decoding="async">`:''}<p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2>${item.virtudes ? `<ul class="pw-virt" aria-label="${esc(item.virtudesTitulo||'Virtudes')}">${item.virtudes.map(v=>`<li><span class="pw-virt-s" aria-hidden="true">${esc(v.sym)}</span><span><b>${esc(v.name)}</b><small>${esc(v.desc)}</small></span></li>`).join('')}</ul>` : ''}${item.sugerencia?`<${item.sugerencia.href?'a href="'+esc(item.sugerencia.href)+'"':'aside'} class="pw-e-sug${item.sugerencia.clase?' '+esc(item.sugerencia.clase):''}">${item.sugerencia.image?`<img src="${esc(item.sugerencia.image)}" alt="${esc(item.sugerencia.alt)}" width="${Number(item.sugerencia.width)||300}" height="${Number(item.sugerencia.height)||300}" loading="lazy" decoding="async">`:''}<p><b>${esc(item.sugerencia.title)}</b>${esc(item.sugerencia.text)}</p></${item.sugerencia.href?'a':'aside'}>`:''}</div>
            <div class="pw-e-art"><span class="pw-e-disc" aria-hidden="true"></span>${item.ilustracion?(item.ilustracion.pie?`<figure class="pw-e-ilus pw-e-ilus-f" aria-hidden="true"><img src="${esc(item.ilustracion.image)}" alt="" width="${Number(item.ilustracion.width)||400}" height="${Number(item.ilustracion.height)||400}" loading="lazy" decoding="async"><figcaption>${esc(item.ilustracion.pie)}</figcaption></figure>`:`<img class="pw-e-ilus" src="${esc(item.ilustracion.image)}" alt="" aria-hidden="true" width="${Number(item.ilustracion.width)||400}" height="${Number(item.ilustracion.height)||400}" loading="lazy" decoding="async">`):''}${item.cartel?`<div class="pw-e-cartel" role="img" aria-label="${esc(item.cartel)}"><i class="pw-cuerda" aria-hidden="true"></i><i class="pw-cuerda" aria-hidden="true"></i><span aria-hidden="true">${esc(item.cartel)}</span></div>`:''}${multi ? slots.map((sl,k) => sl.o ? img(sl.o,`pw-e-image pw-e-multi${k===0?' is-current':''}`,k<2).replace('<img ',`<img data-v="${sl.v}" data-s="${sl.s}" `) : `<span data-v="${sl.v}" data-s="0" class="pw-e-image pw-e-multi pw-e-pending${k===0?' is-current':''}" role="img" aria-label="Imagen pendiente">Imagen pendiente</span>`).join('') : item.product ? img(item.product,'pw-e-image',!item.product.lazy) : '<span class="pw-e-image pw-e-pending is-current" role="img" aria-label="Imagen pendiente">Imagen pendiente</span>'}<p class="pw-e-note">${esc(item.note || '')}</p></div>
              <ol class="pw-e-list">${item.variants.map((v,i) => `<li${i===0?' class="is-current"':''}><span class="pw-e-num">${number(i)}</span><b>${esc(v.name)}</b><small>${esc(v.description)}${price(item.family,v)}</small>${multi && v.image ? `<img class="pw-e-thumb" src="${esc(v.image)}" alt="${esc(v.alt || v.name)}" width="${Number(v.width) || 300}" height="${Number(v.height) || 300}" loading="lazy" decoding="async">` : ''}</li>`).join('')}</ol>${item.cta ? `<div class="pw-e-cta">${button(item)}</div>` : ''}
          </div>
        </div></div></section>`;
    },
    ambiente(item, index) {
      return `<section${sid(item)} class="pw-scene pw-amb" style="--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-label="${esc(item.alt)}">${item.label?`<div class="pw-amb-label">${label(item,index)}</div>`:''}<img src="${esc(item.image)}" alt="${esc(item.alt)}" width="${Number(item.width)||1200}" height="${Number(item.height)||500}" loading="lazy" decoding="async"></section>`;
    },
    video(item, index) {
      const v = item.video;
      return `<section${sid(item)} class="pw-scene pw-v${dark(item)}" style="--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}"><div class="pw-v-inner">${label(item,index)}
        <div class="pw-v-head"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2>${item.note?`<p class="pw-v-note">${esc(item.note)}</p>`:''}</div></div>
        <div class="pw-v-frame"><video class="pw-v-el" src="${esc(v.src)}" poster="${esc(v.poster||'')}" preload="metadata" muted playsinline loop controls aria-label="${esc(v.title)}"></video></div>
        <p class="pw-v-credit">Vídeo: ${esc(v.author)}</p>
      </section>`;
    },
    story(item, index) {
      return `<section${sid(item)} class="pw-scene pw-d${dark(item)}" style="--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}"><div class="pw-sticky"><div class="pw-scene-inner">${label(item,index)}
        <div class="pw-d-head"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2>${item.note?`<p class="pw-d-note">${esc(item.note)}</p>`:''}</div>
        <div class="pw-d-scenes">${item.frames.map((f,i)=>`<article class="pw-d-frame${i===0?' is-current':''}" data-frame="${i}" style="--frame-color:${esc(f.color || item.color)}"><div class="pw-d-image">${img(f)}</div><div class="pw-d-copy"><span>${number(i)} / ${String(item.frames.length).padStart(2,'0')}</span><h3>${esc(f.name)}</h3><p>${esc(f.description)}</p>${price(item.family,f)}</div></article>`).join('')}</div>
        <div class="pw-d-rail" aria-hidden="true">${item.frames.map((_,i)=>`<i${i===0?' class="is-current"':''}></i>`).join('')}</div>
      </div></div></section>`;
    }
  };

  function init(config) {
    const mount = document.querySelector(config.mount || '#familias');
    if (!mount) return;
    if (Array.isArray(config.order)) {
      /* orden de escenas: cada texto se busca en «familia | eyebrow»; lo que no coincide va al final (orden estable) */
      const rank = sec => { const i = config.order.findIndex(t => `${sec.family}|${sec.eyebrow || ''}`.includes(t)); return i < 0 ? config.order.length : i; };
      config.sections = config.sections.map((sec, i) => ({ sec, i })).sort((a, b) => rank(a.sec) - rank(b.sec) || a.i - b.i).map(x => x.sec);
    }
    total = config.sections.length;
    /* config.alternar: los lineup van alternando de lado (foto a la izquierda, foto a la derecha…) para no repetir siempre la misma composición */
    if (config.alternar) { let k = 0; config.sections.forEach(sec => { if (sec.template === 'lineup') sec._flip = (k++ % 2) === 1; }); }
    mount.innerHTML = config.sections.map((item, index) => {
      if (!templates[item.template]) throw new Error(`Plantilla desconocida: ${item.template}`);
      return templates[item.template](item, index);
    }).join('');
    /* enlace con #sección (por ejemplo, desde el asistente): se desplaza a la escena una vez montada la página */
    if (location.hash.length > 1) {
      const ir = () => { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); };
      setTimeout(ir, 80);
      window.addEventListener('load', () => setTimeout(ir, 250), { once: true });
    }
    if (mount.querySelector('.pw-price')) mount.insertAdjacentHTML('afterend', '<p class="pw-price-note">Precios de tarifa por unidad de venta. Pide tu tarifa personalizada, sin compromiso.</p>');
    /* vídeo a todo el ancho: arranca solo y sin sonido al verse, y se pausa al salir (con «reducir animaciones» solo con los controles) */
    mount.querySelectorAll('.pw-v-el').forEach(vid => {
      if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { const p = vid.play(); if (p && p.catch) p.catch(() => {}); } else vid.pause(); }), { threshold: 0.4 }).observe(vid);
    });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 760px)');
    /* tarjeta lateral con ventajas: la ventaja activa depende de lo que se ha recorrido de la sección (en pantallas estrechas o con «reducir animaciones» se ven todas seguidas) */
    (function setupSide() {
      const sides = [...mount.querySelectorAll('.pw-c-side')];
      if (!sides.length) return;
      const estrecha = window.matchMedia('(max-width: 900px)');
      let pendiente = false;
      function actualizar() {
        pendiente = false;
        sides.forEach(side => {
          const frames = [...side.querySelectorAll('.pw-c-side-frame')];
          if (estrecha.matches || reduce.matches) { frames.forEach(f => f.classList.add('is-current')); return; }
          const ir = side.closest('.pw-c-inner').getBoundingClientRect(), sr = side.getBoundingClientRect();
          const tope = parseFloat(getComputedStyle(side).top) || 0;
          const p = Math.min(1, Math.max(0, (tope - ir.top) / Math.max(1, ir.height - sr.height)));
          const activa = Math.min(frames.length - 1, Math.floor(p * frames.length * 0.9999));
          frames.forEach((f, i) => f.classList.toggle('is-current', i === activa));
          side.querySelectorAll('.pw-c-side-rail i').forEach((d, i) => d.classList.toggle('is-current', i === activa));
          side.style.setProperty('--frame-color', frames[activa].style.getPropertyValue('--frame-color'));
        });
      }
      const pedir = () => { if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); } };
      window.addEventListener('scroll', pedir, { passive: true });
      window.addEventListener('resize', pedir);
      estrecha.addEventListener('change', pedir);
      reduce.addEventListener('change', pedir);
      actualizar();
    })();
    let triggers = [];

    /* móvil: aparición progresiva, paralaje suave del producto y, en las gamas con lista, imagen fija que cambia con la variedad activa */
    let mobileOff = null;
    function teardownMobile() {
      if (mobileOff) { mobileOff(); mobileOff = null; }
      document.body.classList.remove('pw-mobile-anim');
      mount.querySelectorAll('.is-in').forEach(el => el.classList.remove('is-in'));
      mount.querySelectorAll('.pw-scene').forEach(sc => sc.style.removeProperty('--mp'));
    }
    function setupMobile() {
      document.body.classList.add('pw-mobile-anim');
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }), { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
      mount.querySelectorAll('.pw-a-copy,.pw-a-art,.pw-b-head,.pw-b-panel,.pw-c-title,.pw-c-item,.pw-d-head,.pw-d-frame,.pw-e-head,.pw-e-list li').forEach(el => io.observe(el));
      const showSub = L => L.multi.forEach(m => m.classList.toggle('is-current', Number(m.dataset.v) === L.cur && Number(m.dataset.s) === L.sub));
      const lineups = [...mount.querySelectorAll('.pw-e')].map(scene => ({
        scene, art: scene.querySelector('.pw-e-art'), cur: 0, sub: 0,
        rows: [...scene.querySelectorAll('.pw-e-list li')],
        multi: [...scene.querySelectorAll('.pw-e-multi')]
      }));
      const heroes = [...mount.querySelectorAll('.pw-a')];
      const header = document.querySelector('.site-header');
      let ticking = false;
      const update = () => {
        ticking = false;
        const vh = window.innerHeight;
        if (header) document.documentElement.style.setProperty('--sh-h', header.offsetHeight + 'px');
        heroes.forEach(sc => {
          const r = sc.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          sc.style.setProperty('--mp', Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height))).toFixed(3));
        });
        lineups.forEach(L => {
          const r = L.scene.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const focus = L.art.getBoundingClientRect().bottom + 72;
          let a = 0;
          L.rows.forEach((li, i) => { if (li.getBoundingClientRect().top <= focus) a = i; });
          if (a !== L.cur) {
            L.cur = a; L.sub = 0;
            L.rows.forEach((li, i) => li.classList.toggle('is-current', i === a));
            showSub(L);
          }
        });
      };
      const on = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      const cycle = setInterval(() => lineups.forEach(L => {
        const k = L.multi.filter(m => Number(m.dataset.v) === L.cur).length;
        if (k > 1) { L.sub = (L.sub + 1) % k; showSub(L); }
      }), 2300);
      window.addEventListener('scroll', on, { passive: true });
      window.addEventListener('resize', on);
      update();
      mobileOff = () => { clearInterval(cycle); io.disconnect(); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
    }
    function reset() {
      triggers.forEach(t => t.kill()); triggers = [];
      teardownMobile();
      mount.querySelectorAll('.pw-scene').forEach(scene => {
        scene.style.removeProperty('--progress');
        scene.querySelector('.pw-b-track')?.style.removeProperty('transform');
        scene.querySelectorAll('.pw-d-frame').forEach((f,i) => f.classList.toggle('is-current',i===0));
        scene.querySelectorAll('.pw-e-list li').forEach((r,i) => r.classList.toggle('is-current',i===0));
        scene.querySelectorAll('.pw-e-multi').forEach((m,i) => m.classList.toggle('is-current',i===0));
        const eList = scene.querySelector('.pw-e-list'); if (eList) eList.scrollTop = 0;
        if (scene.classList.contains('pw-d')) scene.style.setProperty('--scene',scene.querySelector('.pw-d-frame')?.style.getPropertyValue('--frame-color') || '');
      });
      const staticMode = reduce.matches || mobile.matches || !window.gsap || !window.ScrollTrigger;
      document.body.classList.toggle('pw-static', staticMode && !mobile.matches);
      if (mobile.matches && !reduce.matches && 'IntersectionObserver' in window) setupMobile();
      if (staticMode) return;
      gsap.registerPlugin(ScrollTrigger);
      mount.querySelectorAll('.pw-scene').forEach(scene => {
        if (scene.classList.contains('pw-c')) {
          scene.querySelectorAll('.pw-c-item').forEach(el => triggers.push(ScrollTrigger.create({trigger:el,start:'top 86%',end:'top 35%',scrub:true,onUpdate:self=>el.style.setProperty('--reveal',self.progress.toFixed(3))})));
          return;
        }
        triggers.push(ScrollTrigger.create({trigger:scene,start:'top top',end:'bottom bottom',scrub:true,onUpdate:self=>{
          const p=self.progress;
          scene.style.setProperty('--progress',p.toFixed(4));
          if (scene.classList.contains('pw-b')) {
            const track=scene.querySelector('.pw-b-track');
            const windowEl=scene.querySelector('.pw-b-window');
            const travel=Math.max(0,track.scrollWidth-windowEl.clientWidth);
            track.style.transform=`translate3d(${-travel*p}px,0,0)`;
          }
          if (scene.classList.contains('pw-e')) {
            const rows=[...scene.querySelectorAll('.pw-e-list li')];
            const ms=[...scene.querySelectorAll('.pw-e-multi')];
            const slot=ms.length?Math.min(ms.length-1,Math.floor(Math.min(.9999,p)*ms.length)):0;
            const active=ms.length?Number(ms[slot].dataset.v):Math.min(rows.length-1,Math.floor(Math.min(.9999,p)*rows.length));
            rows.forEach((r,i)=>r.classList.toggle('is-current',i===active));
            ms.forEach((m,i)=>m.classList.toggle('is-current',i===slot));
            const list=scene.querySelector('.pw-e-list');
            if (scene.classList.contains('is-scroll') && list) { const dy=rows[active].getBoundingClientRect().top-list.getBoundingClientRect().top+list.scrollTop; list.scrollTop=Math.max(0,dy-list.clientHeight*.38); }
          }
          if (scene.classList.contains('pw-d')) {
            const frames=[...scene.querySelectorAll('.pw-d-frame')];
            const active=Math.min(frames.length-1,Math.floor(Math.min(.9999,p)*frames.length));
            frames.forEach((f,i)=>f.classList.toggle('is-current',i===active));
            scene.style.setProperty('--scene', frames[active].style.getPropertyValue('--frame-color'));
            scene.querySelectorAll('.pw-d-rail i').forEach((dot,i)=>dot.classList.toggle('is-current',i===active));
          }
        }}));
      });
      ScrollTrigger.refresh();
    }
    reset();
    reduce.addEventListener('change',reset);
    mobile.addEventListener('change',reset);
    window.addEventListener('load',()=>window.ScrollTrigger?.refresh(),{once:true});
  }

  window.ProductWorld = {init, templates: Object.keys(templates)};
})();
