const { chromium } = require('playwright');
/* Revisión de calidad de menaje.html con Playwright: capturas (escritorio y móvil), consola, enlaces internos, accesibilidad básica,
   contraste AA, foco con teclado, reducción de movimiento y peso.
   Uso:  python3 -m http.server 8780   (en la raíz del repositorio, en otra terminal)
         NODE_PATH=$(npm root -g) node _herramientas/qa-menaje.js http://localhost:8780 _herramientas/capturas-menaje
   Playwright no es una dependencia del sitio: solo hace falta para esta revisión. */
const BASE=process.argv[2]||'http://localhost:8780';
const S=process.argv[3]||'.';
require('fs').mkdirSync(S,{recursive:true});
const out={};
const contrastFn = `
(function(){
  const parse=c=>{const m=c.match(/[\\d.]+/g).map(Number);return {r:m[0],g:m[1],b:m[2],a:m.length>3?m[3]:1}};
  const lin=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};
  const L=c=>.2126*lin(c.r)+.7152*lin(c.g)+.0722*lin(c.b);
  const blend=(f,b)=>({r:f.r*f.a+b.r*(1-f.a),g:f.g*f.a+b.g*(1-f.a),b:f.b*f.a+b.b*(1-f.a),a:1});
  const bgOf=el=>{let layers=[];let e=el;while(e&&e!==document.documentElement){const cs=getComputedStyle(e);const c=parse(cs.backgroundColor);if(c.a>0){layers.push(c);if(c.a>=1)break}if(cs.backgroundImage!=='none'&&e!==document.body){return null}e=e.parentElement}
    let base={r:255,g:255,b:255,a:1};for(let i=layers.length-1;i>=0;i--)base=blend(layers[i],base);return base};
  const opac=el=>{let o=1;for(let e=el;e;e=e.parentElement)o*=parseFloat(getComputedStyle(e).opacity);return o};
  const res=[];
  document.querySelectorAll('body *').forEach(el=>{
    if(el.closest('[aria-hidden="true"]')||el.closest('script,style,noscript'))return;
    const hasText=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!hasText)return;
    const r=el.getBoundingClientRect();if(r.width<2||r.height<2)return;
    if(opac(el)<.05)return; /* aún sin revelar por la animación de entrada */
    const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none')return;
    const vh=innerHeight; if(r.bottom<0||r.top>vh)return;
    const bg=bgOf(el);if(!bg){res.push({txt:el.textContent.trim().slice(0,28),skip:'imagen de fondo'});return}
    let fg=parse(cs.color);const o=opac(el);fg.a=fg.a*o;const f=blend(fg,bg);
    const l1=L(f),l2=L(bg);const ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);
    const size=parseFloat(cs.fontSize),bold=parseInt(cs.fontWeight)>=700;const large=size>=24||(size>=18.66&&bold);
    res.push({tag:el.tagName,cls:(el.className&&el.className.baseVal===undefined?el.className:'').toString().slice(0,30),txt:el.textContent.trim().slice(0,28),ratio:+ratio.toFixed(2),need:large?3:4.5,size});
  });
  return res;
})()`;
(async()=>{
  const b=await chromium.launch();
  // ---------- por viewport ----------
  for (const [name,w,h] of [['desktop',1440,900],['tablet',820,1100],['mobile',390,844],['xs',320,640]]) {
    const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:1});
    const p=await ctx.newPage(); const o={console:[],failed:[],bad:[],bytes:{}};
    p.on('console',m=>{if(['error','warning'].includes(m.type())&&!/fonts\.(googleapis|gstatic)|net::ERR/.test(m.text()))o.console.push(m.type()+': '+m.text().slice(0,150))});
    p.on('pageerror',e=>o.console.push('pageerror: '+e.message));
    p.on('requestfailed',r=>{if(!/fonts\.(googleapis|gstatic)/.test(r.url()))o.failed.push(r.url())});
    const sizes={};p.on('response',async r=>{try{if(r.status()>=400&&!/fonts\./.test(r.url()))o.bad.push(r.status()+' '+r.url().split('/').slice(-2).join('/'));const u=new URL(r.url());if(u.host!=='localhost:'+BASE.split(':')[2])return;const buf=await r.body();sizes[u.pathname]=buf.length}catch(e){}});
    await p.goto(BASE+'/menaje.html',{waitUntil:'load'}); await p.waitForTimeout(1200);
    const first=Object.assign({},sizes);
    const H=await p.evaluate(()=>document.documentElement.scrollHeight);
    const stops=name==='desktop'?[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1];
    const contrast=[];const lowc=[];
    for(let i=0;i<stops.length;i++){
      await p.evaluate(y=>window.scrollTo(0,y),Math.round((H-h)*stops[i]));await p.waitForTimeout(550);
      if(name==='desktop'||name==='mobile') await p.screenshot({path:`${S}/${name}-${String(i).padStart(2,'0')}.jpg`,type:'jpeg',quality:70});
      const rs=await p.evaluate(contrastFn); contrast.push(...rs);
    }
    for(const r of contrast){ if(r.ratio&&r.ratio<r.need) lowc.push(r) }
    const uniqLow=[...new Map(lowc.map(r=>[r.txt+r.cls,r])).values()];
    o.lowContrast=uniqLow; o.skipped=[...new Set(contrast.filter(r=>r.skip).map(r=>r.txt))].slice(0,8);o.checked=contrast.filter(r=>r.ratio).length;
    o.overflow=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
    const all=Object.assign({},sizes); o.pageH=H;
    const sum=obj=>Object.values(obj).reduce((a,b)=>a+b,0);
    o.bytes={initial:sum(first),afterScroll:sum(all),images:Object.entries(all).filter(([k])=>/\.(webp|jpg|png)$/.test(k)).reduce((a,[,v])=>a+v,0),js:Object.entries(all).filter(([k])=>/\.js$/.test(k)).reduce((a,[,v])=>a+v,0),css:Object.entries(all).filter(([k])=>/\.css$/.test(k)).reduce((a,[,v])=>a+v,0),html:all['/menaje.html']};
    o.reqs={initial:Object.keys(first).length,afterScroll:Object.keys(all).length};
    out[name]=o; await ctx.close();
  }
  // ---------- estructura y accesibilidad (escritorio) ----------
  const ctx=await b.newContext({viewport:{width:1440,height:900}});const p=await ctx.newPage();await p.goto(BASE+'/menaje.html');await p.waitForTimeout(1000);
  out.a11y=await p.evaluate(()=>{
    const imgs=[...document.querySelectorAll('img')].map(i=>({src:i.getAttribute('src'),alt:i.getAttribute('alt'),w:i.getAttribute('width'),h:i.getAttribute('height'),loading:i.getAttribute('loading'),hidden:!!i.closest('[aria-hidden="true"]')}));
    const ids={};document.querySelectorAll('[id]').forEach(e=>ids[e.id]=(ids[e.id]||0)+1);
    const dup=Object.entries(ids).filter(([,n])=>n>1).map(([k])=>k);
    const links=[...document.querySelectorAll('a[href]')];
    const noName=links.filter(a=>!(a.textContent.trim()||a.getAttribute('aria-label'))).map(a=>a.outerHTML.slice(0,80));
    const anchors=links.filter(a=>a.getAttribute('href').startsWith('#')&&a.getAttribute('href').length>1).map(a=>a.getAttribute('href')).filter(h=>!document.querySelector(h));
    const ctrls=[...document.querySelectorAll('input,textarea,select')].filter(i=>i.type!=='hidden'&&!(i.labels&&i.labels.length)&&!i.getAttribute('aria-label')).map(i=>i.id||i.name);
    const btnNoName=[...document.querySelectorAll('button')].filter(b=>!(b.textContent.trim()||b.getAttribute('aria-label'))).length;
    const heads=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]);let skip=false;for(let i=1;i<heads.length;i++)if(heads[i]-heads[i-1]>1)skip=true;
    return {lang:document.documentElement.lang,title:document.title,h1:heads.filter(x=>x===1).length,headingSkip:skip,landmarks:{header:document.querySelectorAll('header').length,nav:document.querySelectorAll('nav').length,main:document.querySelectorAll('main').length,footer:document.querySelectorAll('footer').length},imgs,imgsMissingAlt:imgs.filter(i=>i.alt===null).map(i=>i.src),imgsNoSize:imgs.filter(i=>!i.w||!i.h).map(i=>i.src),dupIds:dup,linksNoName:noName,brokenAnchors:anchors,ctrlsNoLabel:ctrls,btnNoName,viewportMeta:document.querySelector('meta[name=viewport]').content,mainHasSkipTarget:!!document.getElementById('contenido'),skipHref:document.querySelector('.pw-skip')&&document.querySelector('.pw-skip').getAttribute('href')}});
  // enlaces
  out.links=await p.evaluate(()=>[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')));
  // ---------- teclado: salto al contenido y foco visible ----------
  const focus=[];await p.evaluate(()=>window.scrollTo(0,0));
  await p.keyboard.press('Tab');
  out.skip=await p.evaluate(()=>{const a=document.activeElement;const r=a.getBoundingClientRect();const cs=getComputedStyle(a);return {cls:a.className,text:a.textContent.trim(),visible:r.top>=0&&r.width>10,outline:cs.outlineStyle+' '+cs.outlineWidth}});
  await p.keyboard.press('Enter');await p.waitForTimeout(300);out.skip.afterEnter=await p.evaluate(()=>location.hash);
  await p.evaluate(()=>{document.activeElement.blur();window.scrollTo(0,0);location.hash='';});
  await p.goto(BASE+'/menaje.html');await p.waitForTimeout(600);
  for(let i=0;i<70;i++){
    await p.keyboard.press('Tab');
    const f=await p.evaluate(()=>{const a=document.activeElement;if(!a||a===document.body)return null;const cs=getComputedStyle(a);const vis=a.matches(':focus-visible');const outline=cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>0;const shadow=cs.boxShadow!=='none';return {tag:a.tagName,txt:(a.textContent||a.getAttribute('aria-label')||a.id).trim().slice(0,30),vis,outline,shadow,oc:cs.outlineColor,ow:cs.outlineWidth}});
    if(!f)break; focus.push(f);
    if(f.txt.startsWith('Enviar consulta')||f.txt.startsWith('Volver a inicio')) { /* seguimos hasta el final */ }
  }
  out.focus={count:focus.length,noIndicator:focus.filter(f=>!(f.outline||f.shadow)).map(f=>f.tag+':'+f.txt),sample:focus.slice(0,4)};
  // FAQ con teclado
  await p.goto(BASE+'/menaje.html');await p.waitForTimeout(500);
  await p.focus('.menaje-faq-list summary');await p.keyboard.press('Space');out.faqSpace=await p.evaluate(()=>document.querySelector('.menaje-faq-list details').open);
  await p.keyboard.press('Space');out.faqSpace2=await p.evaluate(()=>document.querySelector('.menaje-faq-list details').open);
  await ctx.close();
  // ---------- reducción de movimiento ----------
  const rctx=await b.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});const rp=await rctx.newPage();const rerr=[];rp.on('pageerror',e=>rerr.push(e.message));
  await rp.goto(BASE+'/menaje.html');await rp.waitForTimeout(1200);
  out.reduced=await rp.evaluate(()=>{const sticky=[...document.querySelectorAll('.pw-sticky')].map(e=>getComputedStyle(e).position);const e=document.querySelector('.pw-e');return {bodyStatic:document.body.classList.contains('pw-static'),stickyPositions:[...new Set(sticky)],sceneHeight:Math.round(e.getBoundingClientRect().height),listOpacity:[...document.querySelectorAll('.pw-e-list li')].map(l=>getComputedStyle(l).opacity).filter((v,i,a)=>a.indexOf(v)===i),imgTransform:getComputedStyle(document.querySelector('.pw-e-image')).transform,pageH:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,btnTransition:getComputedStyle(document.querySelector('.menaje-btn')).transitionDuration,motionBtn:!!document.querySelector('.vm-motion-btn')}});
  out.reduced.errors=rerr;
  const H2=await rp.evaluate(()=>document.documentElement.scrollHeight);
  await rp.screenshot({path:`${S}/reducido-escritorio-completa.jpg`,type:'jpeg',quality:60,fullPage:true});
  const rc=await rp.evaluate(contrastFn); out.reduced.lowContrast=rc.filter(r=>r.ratio&&r.ratio<r.need);
  await rctx.close();
  require('fs').writeFileSync(S+'/audit.json',JSON.stringify(out,null,1));
  await b.close();
})();
