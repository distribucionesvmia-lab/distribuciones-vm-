/* Reusable, content-driven product scenes. Product data belongs in a separate file. */
(function () {
  'use strict';

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const img = (item, className = '', eager = false) => `<img class="${className}" src="${esc(item.image)}" alt="${esc(item.alt || item.name)}" width="${Number(item.width) || 600}" height="${Number(item.height) || 600}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
  const number = index => String(index + 1).padStart(2, '0');
  let total = 4;
  const dark = item => item.dark ? ' is-dark' : '';
  const label = (item, index) => `<p class="pw-scene-label"><span>${number(index)} / ${String(total).padStart(2, '0')}</span><span>${esc(item.family)}</span></p>`;
  const button = item => item.cta ? `<a class="pw-link" href="${esc(item.cta.href)}">${esc(item.cta.label)} <span aria-hidden="true">↗</span></a>` : '';

  const templates = {
    hero(item, index) {
      return `<section class="pw-scene pw-a${item.product.wide?' is-wide':''}${dark(item)}" style="--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}">
        <div class="pw-sticky"><div class="pw-scene-inner">${label(item,index)}
          <div class="pw-a-copy"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2><p class="pw-description">${esc(item.description)}</p>${button(item)}</div>
          <div class="pw-a-art">${item.logo?`<img class="pw-a-logo" src="${esc(item.logo.image)}" alt="${esc(item.logo.alt)}" width="${Number(item.logo.width)}" height="${Number(item.logo.height)}">`:''}<span class="pw-a-ring" aria-hidden="true"></span><span class="pw-a-backword" aria-hidden="true">${esc(item.backword || item.family)}</span>${img(item.product,'pw-a-product')}<p class="pw-product-note">${esc(item.product.name)}</p></div>
          <p class="pw-scene-bottom">${esc(item.bottom || '')}</p>
        </div></div></section>`;
    },
    range(item, index) {
      return `<section class="pw-scene pw-b${dark(item)}" style="--n:${item.products.length};--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}">
        <div class="pw-sticky"><div class="pw-scene-inner">${label(item,index)}
          <div class="pw-b-head"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2><p>${esc(item.description)}</p></div>
          <div class="pw-b-window"><div class="pw-b-track">${item.products.map((p,i) => `<article class="pw-b-panel"><span class="pw-panel-number">${number(i)} / ${String(item.products.length).padStart(2,'0')}</span><div class="pw-b-image">${img(p,'',true)}</div><div class="pw-b-copy"><p class="pw-panel-kicker">${esc(item.family)}</p><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p></div></article>`).join('')}</div></div>
          <div class="pw-b-bottom"><span>Desliza para recorrer la gama →</span><span class="pw-progress"><i></i></span></div>
        </div></div></section>`;
    },
    editorial(item, index) {
      return `<section class="pw-scene pw-c${item.columns===3?' is-3':''}${dark(item)}" style="--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}"><div class="pw-c-inner">${label(item,index)}
        <div class="pw-c-title"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2><p>${esc(item.description)}</p></div>
        <div class="pw-c-grid">${item.products.map((p,i) => `<article class="pw-c-item"><div class="pw-c-photo${p.cover?' is-cover':''}"${p.cover?` style="--ar:${Number(p.width)||4}/${Number(p.height)||3}"`:''}>${img(p)}</div><div class="pw-c-caption"><span>${number(i)}</span><div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p></div></div></article>`).join('')}</div>${button(item)}</div></section>`;
    },
    lineup(item, index) {
      const n = item.variants.length;
      const multi = item.variants.some(v => v.image);
      return `<section class="pw-scene pw-e${n>8?' is-long':''}${n>14?' is-scroll':''}${dark(item)}" style="--n:${n};--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}">
        <div class="pw-sticky"><div class="pw-scene-inner">${label(item,index)}
          <div class="pw-e-grid">
            <div class="pw-e-head"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2></div>
            <div class="pw-e-art"><span class="pw-e-disc" aria-hidden="true"></span>${multi ? item.variants.map((v,i) => v.image ? img(v,`pw-e-image pw-e-multi${i===0?' is-current':''}`,i<2) : `<span class="pw-e-image pw-e-multi pw-e-pending${i===0?' is-current':''}" role="img" aria-label="Imagen pendiente">Imagen pendiente</span>`).join('') : item.product ? img(item.product,'pw-e-image',true) : '<span class="pw-e-image pw-e-pending is-current" role="img" aria-label="Imagen pendiente">Imagen pendiente</span>'}<p class="pw-e-note">${esc(item.note || '')}</p></div>
              <ol class="pw-e-list">${item.variants.map((v,i) => `<li${i===0?' class="is-current"':''}><span class="pw-e-num">${number(i)}</span><b>${esc(v.name)}</b><small>${esc(v.description)}</small>${multi && v.image ? `<img class="pw-e-thumb" src="${esc(v.image)}" alt="${esc(v.alt || v.name)}" width="${Number(v.width) || 300}" height="${Number(v.height) || 300}" loading="lazy" decoding="async">` : ''}</li>`).join('')}</ol>${item.cta ? `<div class="pw-e-cta">${button(item)}</div>` : ''}
          </div>
        </div></div></section>`;
    },
    story(item, index) {
      return `<section class="pw-scene pw-d${dark(item)}" style="--scene:${esc(item.color)};--ink:${esc(item.ink)}" aria-labelledby="pw-scene-${index}"><div class="pw-sticky"><div class="pw-scene-inner">${label(item,index)}
        <div class="pw-d-head"><p class="pw-overline">${esc(item.eyebrow)}</p><h2 id="pw-scene-${index}">${esc(item.title)}</h2></div>
        <div class="pw-d-scenes">${item.frames.map((f,i)=>`<article class="pw-d-frame${i===0?' is-current':''}" data-frame="${i}" style="--frame-color:${esc(f.color || item.color)}"><div class="pw-d-image">${img(f)}</div><div class="pw-d-copy"><span>${number(i)} / ${String(item.frames.length).padStart(2,'0')}</span><h3>${esc(f.name)}</h3><p>${esc(f.description)}</p></div></article>`).join('')}</div>
        <div class="pw-d-rail" aria-hidden="true">${item.frames.map((_,i)=>`<i${i===0?' class="is-current"':''}></i>`).join('')}</div>
      </div></div></section>`;
    }
  };

  function init(config) {
    const mount = document.querySelector(config.mount || '#familias');
    if (!mount) return;
    total = config.sections.length;
    mount.innerHTML = config.sections.map((item, index) => {
      if (!templates[item.template]) throw new Error(`Plantilla desconocida: ${item.template}`);
      return templates[item.template](item, index);
    }).join('');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 760px)');
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
      const lineups = [...mount.querySelectorAll('.pw-e')].map(scene => ({
        scene, art: scene.querySelector('.pw-e-art'), cur: 0,
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
            L.cur = a;
            L.rows.forEach((li, i) => li.classList.toggle('is-current', i === a));
            L.multi.forEach((m, i) => m.classList.toggle('is-current', i === a));
          }
        });
      };
      const on = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      window.addEventListener('scroll', on, { passive: true });
      window.addEventListener('resize', on);
      update();
      mobileOff = () => { io.disconnect(); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
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
            const active=Math.min(rows.length-1,Math.floor(Math.min(.9999,p)*rows.length));
            rows.forEach((r,i)=>r.classList.toggle('is-current',i===active));
            scene.querySelectorAll('.pw-e-multi').forEach((m,i)=>m.classList.toggle('is-current',i===active));
            const list=scene.querySelector('.pw-e-list');
            if (scene.classList.contains('is-scroll') && list) list.scrollTop=rows[active].offsetTop-list.clientHeight*.38;
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
