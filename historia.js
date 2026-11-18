(function(){
  'use strict';
  var ruta=document.querySelector('.hi-ruta');if(!ruta)return;
  var stops=[].slice.call(ruta.querySelectorAll('.hi-stop'));
  var road=ruta.querySelector('.hi-road'),NS='http://www.w3.org/2000/svg';
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var VEH={
    camion:'<rect x="6" y="12" width="52" height="30" rx="3" fill="#b9892e"/><rect x="58" y="22" width="26" height="20" rx="3" fill="#c8372d"/><rect x="66" y="25" width="12" height="8" fill="#cfe6ee"/><rect x="6" y="40" width="80" height="5" fill="#3a332f"/><circle cx="24" cy="46" r="7" fill="#251d1a"/><circle cx="72" cy="46" r="7" fill="#251d1a"/><circle cx="24" cy="46" r="3" fill="#bbb"/><circle cx="72" cy="46" r="3" fill="#bbb"/>',
    furgon:'<path d="M6 14h56a6 6 0 0 1 6 6v22H6z" fill="#e8e2d4"/><path d="M62 20h12l10 12v10H62z" fill="#c8372d"/><path d="M66 24h7l7 8H66z" fill="#cfe6ee"/><rect x="6" y="30" width="56" height="5" fill="#c8372d"/><circle cx="22" cy="44" r="7" fill="#251d1a"/><circle cx="70" cy="44" r="7" fill="#251d1a"/><circle cx="22" cy="44" r="3" fill="#bbb"/><circle cx="70" cy="44" r="3" fill="#bbb"/>',
    frigo:'<rect x="4" y="8" width="58" height="34" rx="3" fill="#f7f3ea"/><rect x="52" y="5" width="10" height="8" rx="1" fill="#9aa7ad"/><rect x="4" y="26" width="58" height="6" fill="#2a7f8a"/><rect x="62" y="20" width="22" height="22" rx="3" fill="#c8372d"/><rect x="68" y="23" width="11" height="8" fill="#cfe6ee"/><rect x="4" y="40" width="80" height="5" fill="#3a332f"/><circle cx="20" cy="46" r="7" fill="#251d1a"/><circle cx="70" cy="46" r="7" fill="#251d1a"/><circle cx="20" cy="46" r="3" fill="#bbb"/><circle cx="70" cy="46" r="3" fill="#bbb"/>',
    coche:'<path d="M10 34l8-12h30l14 12h18v10H10z" fill="#c8372d"/><path d="M22 24h12v10H17zM37 24h10l10 10H37z" fill="#cfe6ee"/><circle cx="26" cy="44" r="7" fill="#251d1a"/><circle cx="68" cy="44" r="7" fill="#251d1a"/><circle cx="26" cy="44" r="3" fill="#bbb"/><circle cx="68" cy="44" r="3" fill="#bbb"/>',
    electrico:'<path d="M6 14h56a6 6 0 0 1 6 6v22H6z" fill="#f7f3ea"/><path d="M62 20h12l10 12v10H62z" fill="#2f8f5b"/><path d="M66 24h7l7 8H66z" fill="#cfe6ee"/><path d="M36 18l-8 12h7l-3 10 11-14h-7z" fill="#2f8f5b"/><circle cx="22" cy="44" r="7" fill="#251d1a"/><circle cx="70" cy="44" r="7" fill="#251d1a"/><circle cx="22" cy="44" r="3" fill="#bbb"/><circle cx="70" cy="44" r="3" fill="#bbb"/>'
  };
  var IMG={pegaso:'Pegaso J4',dkv:'dkv-ram',mb180:'mb180d',mb410:'mb410',mocay:'mocay',fe:'furgon-electrico',ford:'ford-transit',ibiza:'ibiza-mocay'};var LEFT={fe:1,ford:1};IMG.pegaso='pegaso';
  var veh=document.createElement('div');veh.className='hi-vehicle';veh.setAttribute('aria-hidden','true');
  var fl=document.createElement('div');fl.className='flip';veh.appendChild(fl);
  Object.keys(VEH).forEach(function(k){var d=document.createElement('div');d.className='v';d.dataset.k=k;d.innerHTML='<svg viewBox="0 0 90 56">'+VEH[k]+'</svg>';fl.appendChild(d)});
  Object.keys(IMG).forEach(function(k){var d=document.createElement('div');d.className='v img';d.dataset.k=k;d.innerHTML='<img src="assets/historia/'+IMG[k]+'.png" alt="" width="720" height="400">';fl.appendChild(d)});
  var cap=document.createElement('span');cap.className='hi-vcap'; /* el nombre del vehículo ya no se muestra bajo el avatar */
  ruta.appendChild(veh);
  var SAL=stops.findIndex(function(s){return /Salamanca/.test(s.textContent)});if(SAL<0)SAL=stops.length;
  var base,prog,clipRect,pts=[],len=0,cur=-1,mk=[],decoEls=[],tl,tlChips=[],tlFill;

  var DECO={
    castle:'<svg viewBox="0 0 300 160"><rect x="56" y="84" width="214" height="40" fill="#bf936c"/><rect x="60" y="78" width="8" height="6" fill="#bf936c"/><rect x="74" y="78" width="8" height="6" fill="#bf936c"/><rect x="88" y="78" width="8" height="6" fill="#bf936c"/><rect x="102" y="78" width="8" height="6" fill="#bf936c"/><rect x="116" y="78" width="8" height="6" fill="#bf936c"/><rect x="130" y="78" width="8" height="6" fill="#bf936c"/><rect x="144" y="78" width="8" height="6" fill="#bf936c"/><rect x="158" y="78" width="8" height="6" fill="#bf936c"/><rect x="172" y="78" width="8" height="6" fill="#bf936c"/><rect x="186" y="78" width="8" height="6" fill="#bf936c"/><rect x="200" y="78" width="8" height="6" fill="#bf936c"/><rect x="214" y="78" width="8" height="6" fill="#bf936c"/><rect x="232" y="62" width="40" height="62" fill="#b98b63"/><rect x="234" y="56" width="7" height="6" fill="#b98b63"/><rect x="246" y="56" width="7" height="6" fill="#b98b63"/><rect x="258" y="56" width="7" height="6" fill="#b98b63"/><rect x="0" y="122" width="300" height="30" fill="#c9a07a"/><rect x="2" y="116" width="9" height="6" fill="#c9a07a"/><rect x="18" y="116" width="9" height="6" fill="#c9a07a"/><rect x="34" y="116" width="9" height="6" fill="#c9a07a"/><rect x="50" y="116" width="9" height="6" fill="#c9a07a"/><rect x="66" y="116" width="9" height="6" fill="#c9a07a"/><rect x="82" y="116" width="9" height="6" fill="#c9a07a"/><rect x="98" y="116" width="9" height="6" fill="#c9a07a"/><rect x="114" y="116" width="9" height="6" fill="#c9a07a"/><rect x="130" y="116" width="9" height="6" fill="#c9a07a"/><rect x="146" y="116" width="9" height="6" fill="#c9a07a"/><rect x="162" y="116" width="9" height="6" fill="#c9a07a"/><rect x="178" y="116" width="9" height="6" fill="#c9a07a"/><rect x="194" y="116" width="9" height="6" fill="#c9a07a"/><rect x="210" y="116" width="9" height="6" fill="#c9a07a"/><rect x="226" y="116" width="9" height="6" fill="#c9a07a"/><rect x="242" y="116" width="9" height="6" fill="#c9a07a"/><rect x="258" y="116" width="9" height="6" fill="#c9a07a"/><rect x="274" y="116" width="9" height="6" fill="#c9a07a"/><rect x="6" y="14" width="56" height="112" fill="#d2ab86"/><rect x="6" y="14" width="56" height="112" fill="none" stroke="#b98b63" stroke-width="2"/><rect x="2" y="12" width="64" height="12" fill="#c9a07a"/><rect x="10" y="5" width="8" height="6" fill="#c9a07a"/><rect x="23" y="5" width="8" height="6" fill="#c9a07a"/><rect x="36" y="5" width="8" height="6" fill="#c9a07a"/><rect x="49" y="5" width="8" height="6" fill="#c9a07a"/><rect x="0" y="4" width="14" height="30" rx="7" fill="#c9a07a"/><rect x="54" y="4" width="14" height="30" rx="7" fill="#c9a07a"/><rect x="29" y="52" width="9" height="12" fill="#5a3a26"/><g fill="#a97b55"><circle cx="16" cy="40" r="1.6"/><circle cx="26" cy="40" r="1.6"/><circle cx="36" cy="40" r="1.6"/><circle cx="46" cy="40" r="1.6"/><circle cx="52" cy="74" r="1.6"/><circle cx="14" cy="80" r="1.6"/><circle cx="24" cy="92" r="1.6"/><circle cx="44" cy="96" r="1.6"/><circle cx="34" cy="110" r="1.6"/><circle cx="16" cy="104" r="1.6"/></g><rect x="112" y="98" width="52" height="54" fill="#d2ab86"/><rect x="112" y="92" width="8" height="6" fill="#d2ab86"/><rect x="124" y="92" width="8" height="6" fill="#d2ab86"/><rect x="136" y="92" width="8" height="6" fill="#d2ab86"/><rect x="148" y="92" width="8" height="6" fill="#d2ab86"/><rect x="104" y="108" width="14" height="44" rx="7" fill="#c9a07a"/><rect x="158" y="108" width="14" height="44" rx="7" fill="#c9a07a"/><path d="M128 152v-22a10 10 0 0 1 20 0v22z" fill="#5a3a26"/><rect x="132" y="104" width="12" height="12" fill="#c8372d"/><rect x="262" y="108" width="34" height="44" rx="4" fill="#cfa782"/><rect x="262" y="102" width="8" height="6" fill="#cfa782"/><rect x="274" y="102" width="8" height="6" fill="#cfa782"/><rect x="286" y="102" width="8" height="6" fill="#cfa782"/><rect x="0" y="150" width="300" height="8" rx="4" fill="#bdb07a"/></svg>',
    vine:'<svg viewBox="0 0 220 130"><path d="M0 128Q60 40 220 70V130z" fill="#a9c27f"/><g stroke="#4f7a36" stroke-width="5" stroke-linecap="round" fill="none"><path d="M14 124Q70 60 214 88"/><path d="M14 112Q70 50 214 78"/><path d="M30 126Q90 80 214 102"/></g><g fill="#6b8f45"><circle cx="46" cy="96" r="9"/><circle cx="80" cy="82" r="9"/><circle cx="114" cy="78" r="9"/><circle cx="150" cy="82" r="9"/><circle cx="184" cy="88" r="9"/></g><g fill="#6a3a78"><circle cx="46" cy="108" r="5"/><circle cx="52" cy="113" r="5"/><circle cx="41" cy="113" r="5"/><circle cx="120" cy="92" r="5"/><circle cx="126" cy="97" r="5"/><circle cx="115" cy="97" r="5"/></g><g stroke="#7a5a3a" stroke-width="3"><path d="M30 100v22M64 90v26M98 82v26M132 82v26M166 86v26M200 92v24"/></g></svg>',
    pines:'<svg viewBox="0 0 200 150"><g stroke="#7a5230" stroke-width="7" stroke-linecap="round"><path d="M50 146V84"/><path d="M110 146V70"/><path d="M165 146V92"/></g><g fill="#3f7f45"><ellipse cx="50" cy="76" rx="38" ry="19"/><ellipse cx="110" cy="60" rx="46" ry="22"/><ellipse cx="165" cy="86" rx="30" ry="15"/></g><g fill="#33683a"><ellipse cx="44" cy="82" rx="26" ry="9"/><ellipse cx="108" cy="68" rx="32" ry="10"/></g><rect y="144" width="200" height="6" rx="3" fill="#c9b27c"/></svg>',
    wheat:'<svg viewBox="0 0 200 130"><circle cx="160" cy="26" r="16" fill="#f3c24a"/><path d="M0 110Q100 70 200 100V130H0z" fill="#e2b95a"/><g stroke="#c9972e" stroke-width="3" stroke-linecap="round"><path d="M20 120l4-34M38 118l4-38M56 116l4-40M74 114l4-38M92 112l4-36M110 112l4-36M128 114l4-38M146 116l4-38M164 118l4-34M182 120l4-30"/></g><g fill="#e8c35f"><ellipse cx="24" cy="82" rx="3" ry="9"/><ellipse cx="42" cy="76" rx="3" ry="9"/><ellipse cx="60" cy="72" rx="3" ry="9"/><ellipse cx="78" cy="72" rx="3" ry="9"/><ellipse cx="96" cy="74" rx="3" ry="9"/><ellipse cx="114" cy="74" rx="3" ry="9"/><ellipse cx="132" cy="72" rx="3" ry="9"/><ellipse cx="150" cy="74" rx="3" ry="9"/><ellipse cx="168" cy="80" rx="3" ry="9"/></g></svg>',
    sun:'<svg viewBox="0 0 200 140"><rect y="122" width="200" height="12" rx="6" fill="#9db56a"/><g stroke="#4f7a36" stroke-width="4"><path d="M40 124V66M100 124V50M160 124V70"/></g><g><circle cx="40" cy="58" r="22" fill="#f3b72a"/><circle cx="40" cy="58" r="10" fill="#6b4423"/><circle cx="100" cy="42" r="26" fill="#f3b72a"/><circle cx="100" cy="42" r="12" fill="#6b4423"/><circle cx="160" cy="62" r="22" fill="#f3b72a"/><circle cx="160" cy="62" r="10" fill="#6b4423"/></g></svg>',
    colegiata:'<svg viewBox="0 0 120 230"><rect x="0" y="176" width="50" height="46" fill="#b5573f"/><rect x="0" y="172" width="50" height="6" fill="#d8c9a8"/><rect x="14" y="188" width="20" height="34" rx="10" fill="#d8c9a8"/><rect x="19" y="195" width="10" height="27" rx="5" fill="#5a3a26"/><rect x="88" y="190" width="32" height="32" fill="#b5573f"/><rect x="88" y="186" width="32" height="6" fill="#d8c9a8"/><rect x="48" y="84" width="42" height="138" fill="#b5573f"/><g fill="#d8c9a8"><rect x="45" y="204" width="48" height="4"/><rect x="45" y="170" width="48" height="4"/><rect x="45" y="136" width="48" height="4"/><rect x="45" y="104" width="48" height="4"/><rect x="45" y="82" width="48" height="5"/></g><g fill="#5a3a26"><rect x="64" y="180" width="6" height="18" rx="3"/><rect x="64" y="146" width="6" height="18" rx="3"/><rect x="64" y="114" width="6" height="16" rx="3"/></g><g fill="#3a1e14"><path d="M54 100v-8a4 4 0 0 1 8 0v8z"/><path d="M76 100v-8a4 4 0 0 1 8 0v8z"/></g><g fill="#d8c9a8"><rect x="52" y="86" width="3" height="3"/></g><rect x="54" y="48" width="30" height="36" fill="#b5573f"/><g fill="#d8c9a8"><rect x="52" y="46" width="4" height="40"/><rect x="82" y="46" width="4" height="40"/><rect x="52" y="44" width="34" height="4"/></g><circle cx="69" cy="64" r="9" fill="#f1ead8" stroke="#d8c9a8" stroke-width="2.5"/><path d="M69 58v6l4 3" stroke="#3a332f" stroke-width="1.6" fill="none"/><path d="M56 44q13-26 26 0z" fill="#4a4f55"/><path d="M60 42q9-16 18 0M69 20v22" stroke="#6b7078" stroke-width="1.2" fill="none"/><rect x="68" y="6" width="2" height="16" fill="#4a4f55"/><rect x="63" y="10" width="12" height="2" fill="#4a4f55"/><rect y="222" width="120" height="6" rx="3" fill="#cdb98e"/></svg>',
    plaza:'<svg viewBox="0 0 280 160"><rect x="2" y="26" width="64" height="104" fill="#a8452f"/><rect x="66" y="16" width="70" height="114" fill="#b8412f"/><rect x="136" y="30" width="72" height="100" fill="#e8e2d4"/><rect x="208" y="40" width="70" height="90" fill="#bfa68a"/><g fill="#f1ead8"><rect x="12" y="38" width="12" height="24"/><rect x="40" y="38" width="12" height="24"/><rect x="12" y="72" width="12" height="24"/><rect x="40" y="72" width="12" height="24"/><rect x="76" y="28" width="12" height="24"/><rect x="110" y="28" width="12" height="24"/><rect x="76" y="64" width="12" height="24"/><rect x="110" y="64" width="12" height="24"/><rect x="146" y="42" width="12" height="24"/><rect x="176" y="42" width="12" height="24"/><rect x="146" y="76" width="12" height="24"/><rect x="176" y="76" width="12" height="24"/><rect x="218" y="52" width="12" height="22"/><rect x="250" y="52" width="12" height="22"/><rect x="218" y="82" width="12" height="22"/><rect x="250" y="82" width="12" height="22"/></g><g fill="#6a4a3a"><rect x="12" y="38" width="12" height="24" opacity=".35"/></g><g stroke="#2f3a40" stroke-width="2"><path d="M8 66h56M8 100h56M70 56h64M70 92h64M140 70h68M140 104h68M212 76h64M212 108h64"/></g><g stroke="#2f3a40" stroke-width="1.5"><path d="M8 62v4M20 62v4M32 62v4M44 62v4M56 62v4M70 52v4M86 52v4M102 52v4M118 52v4M140 66v4M156 66v4M172 66v4M188 66v4M204 66v4"/></g><rect x="0" y="126" width="280" height="6" fill="#d8c9a8"/><g fill="#cdb98e"><rect x="12" y="132" width="10" height="5"/><rect x="62" y="132" width="10" height="5"/><rect x="112" y="132" width="10" height="5"/><rect x="162" y="132" width="10" height="5"/><rect x="212" y="132" width="10" height="5"/><rect x="262" y="132" width="10" height="5"/></g><g fill="#3a5a68"><rect x="15" y="100" width="4" height="32"/><rect x="65" y="100" width="4" height="32"/><rect x="115" y="100" width="4" height="32"/><rect x="165" y="100" width="4" height="32"/><rect x="215" y="100" width="4" height="32"/><rect x="265" y="100" width="4" height="32"/></g><path d="M30 112q22-8 44 0l-4 6H34z" fill="#f4e7bd"/><path d="M180 112q36-14 70 0l-6 8h-58z" fill="#f4e7bd"/><rect x="0" y="154" width="280" height="6" rx="3" fill="#cdb98e"/></svg>',
    village:'<svg viewBox="0 0 220 140"><rect x="0" y="124" width="220" height="10" rx="5" fill="#9db56a"/><rect x="12" y="84" width="48" height="42" fill="#e9d9b8"/><path d="M6 86l30-26 30 26z" fill="#b5523b"/><rect x="74" y="64" width="36" height="62" fill="#d8c39a"/><path d="M92 36l-10 28h20z" fill="#8f3b2b"/><rect x="88" y="64" width="8" height="8" rx="4" fill="#4a2018"/><rect x="160" y="68" width="9" height="16" fill="#a8452f"/><circle class="pf" cx="164" cy="62" r="4" fill="#fff" opacity=".85"/><circle class="pf" style="animation-delay:1.1s" cx="164" cy="62" r="5" fill="#fff" opacity=".85"/><circle class="pf" style="animation-delay:2.2s" cx="164" cy="62" r="4" fill="#fff" opacity=".85"/><rect x="122" y="90" width="52" height="36" fill="#eadfc4"/><path d="M116 92l32-24 32 24z" fill="#b5523b"/><rect x="184" y="98" width="28" height="28" fill="#e2cfa6"/><path d="M180 100l18-16 18 16z" fill="#a8452f"/><rect x="26" y="100" width="10" height="14" fill="#6a4a2a"/><rect x="140" y="106" width="12" height="20" fill="#6a4a2a"/></svg>',
    bridge:'<svg viewBox="0 0 220 110"><path d="M0 90h220v20H0z" fill="#a9cbd9"/><path d="M0 40h220v12H0z" fill="#c9b27c"/><path d="M0 52h220v38H0z" fill="#d6c196"/><g fill="#a9cbd9"><path d="M20 90a26 38 0 0 1 52 0z"/><path d="M84 90a26 38 0 0 1 52 0z"/><path d="M148 90a26 38 0 0 1 52 0z"/></g><path d="M0 36h220" stroke="#8f7a52" stroke-width="3"/></svg>'
  };
  var PLAN=['castle','village','vine','colegiata','pines','plaza','bridge','village','vine','wheat','pines','village'];

  tl=document.createElement('nav');tl.className='hi-tl';tl.setAttribute('aria-label','Línea de tiempo');
  tl.innerHTML='<div class="hi-tl-in"></div><span class="hi-tl-bar"><i></i></span>';
  tlFill=tl.querySelector('i');var tin=tl.querySelector('.hi-tl-in');
  stops.forEach(function(s,i){var y=s.dataset.chip||s.querySelector('.hi-year').textContent;var b=document.createElement('button');b.type='button';b.textContent=y;b.className=s.classList.contains('major')?'maj':'';b.setAttribute('aria-label','Ir a '+y+': '+s.querySelector('h2').textContent);b.addEventListener('click',function(){var hh=parseFloat(getComputedStyle(ruta).getPropertyValue('--hh'))||90;scrollTo({top:s.getBoundingClientRect().top+scrollY-hh-70,behavior:reduce?'auto':'smooth'})});tin.appendChild(b);tlChips.push(b)});
  ruta.insertBefore(tl,ruta.firstChild);
  var deco=document.createElement('div');deco.className='hi-deco';deco.setAttribute('aria-hidden','true');ruta.insertBefore(deco,road);
  function addDeco(k,x,y,w,cls){var d=document.createElement('div');d._y=y;d.className='hi-d '+(cls||'')+(reduce?' on':'');decoEls.push(d);d.style.cssText='left:'+x+'px;top:'+y+'px;width:'+w+'px';d.innerHTML=DECO[k];deco.appendChild(d)}
  function tinyTree(x,y,s,c){var d=document.createElement('div');d._y=y;d.className='hi-t'+(reduce?' on':'');decoEls.push(d);d.style.cssText='left:'+x+'px;top:'+y+'px;width:'+s+'px;height:'+s*1.4+'px';d.innerHTML='<svg viewBox="0 0 20 28"><rect x="9" y="18" width="3" height="10" fill="#7a5230"/><ellipse cx="10.5" cy="12" rx="8" ry="11" fill="'+c+'"/></svg>';deco.appendChild(d)}
  function buildDeco(w,mob){
    deco.innerHTML='';decoEls=[];
    var ys=pts.map(function(p){return p.y});
    pts.forEach(function(p,i){
      var k=PLAN[i%PLAN.length];
      if(mob){
        var ny=i<pts.length-1?(p.y+pts[i+1].y)/2+30:p.y+90;
        addDeco(k,w-96,ny-18,k==='colegiata'?34:64,'sm');
      }else{
        var cardLeft=i%2===0;
        var cx=cardLeft?w*0.80:w*0.20;
        var dw=k==='colegiata'?130:(k==='plaza'||k==='castle'?250:220);addDeco(k,cx-dw/2,p.y+10,dw,'');
        if(i<pts.length-1){var k2=PLAN[(i+5)%PLAN.length];var gx=cardLeft?w*0.50+90:w*0.50-250;addDeco(k2,gx,(p.y+pts[i+1].y)/2-10,k2==='colegiata'?70:150,'sm')}
      }
    });
    var cols=['#4d8a4a','#5f9a55','#3f7f45','#7aa65a'];
    var n=Math.floor(len/(mob?130:110));
    for(var q=0;q<n;q++){
      var L=(q+0.5)*len/n,pp=base.getPointAtLength(L),a=base.getPointAtLength(Math.min(len,L+2)),b2=base.getPointAtLength(Math.max(0,L-2));
      var tx=a.x-b2.x,ty=a.y-b2.y,m=Math.sqrt(tx*tx+ty*ty)||1,nx=-ty/m,ny2=tx/m,side=q%2?1:-1,off=(mob?20:30)*side+ (q%3)*3;
      var sz=(mob?14:18)+(q%3)*3;
      tinyTree(pp.x+nx*off-sz/2,pp.y+ny2*off-sz*1.2,sz,cols[q%4]);
    }
  }
  function build(){
    var rr=ruta.getBoundingClientRect(),w=rr.width,mob=w<=760;
    pts=stops.map(function(s,i){
      var r=s.getBoundingClientRect(),y=r.top-rr.top+(mob?44:50),x;
      if(mob)x=(i%2?42:30)+parseFloat(getComputedStyle(ruta).paddingLeft);
      else x=w*(i%2?0.585:0.415);
      return {x:x,y:y};
    });
    var d='M'+pts[0].x+' '+(pts[0].y-90),prev={x:pts[0].x,y:pts[0].y-90};
    pts.forEach(function(p){var dy=p.y-prev.y;d+=' C'+prev.x+' '+(prev.y+dy*.55)+' '+p.x+' '+(p.y-dy*.55)+' '+p.x+' '+p.y;prev=p});
    var end={x:pts[pts.length-1].x,y:pts[pts.length-1].y+130};d+=' C'+prev.x+' '+(prev.y+60)+' '+end.x+' '+(end.y-60)+' '+end.x+' '+end.y;
    road.setAttribute('viewBox','0 0 '+w+' '+rr.height);
    road.innerHTML='';
    var lw=mob?12:18;
    function path(cls,stroke,sw,extra){var p=document.createElementNS(NS,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke',stroke);p.setAttribute('stroke-width',sw);p.setAttribute('stroke-linecap','round');if(extra)p.setAttribute('stroke-dasharray',extra);road.appendChild(p);return p}
    var defs=document.createElementNS(NS,'defs'),cp=document.createElementNS(NS,'clipPath');cp.setAttribute('id','hiClip');
    clipRect=document.createElementNS(NS,'rect');clipRect.setAttribute('x',-50);clipRect.setAttribute('y',0);clipRect.setAttribute('width',w+100);clipRect.setAttribute('height',0);cp.appendChild(clipRect);defs.appendChild(cp);road.appendChild(defs);
    path('','#e9dfca',lw+8);path('','#ddd2bc',lw);path('','#f3ecdc',2,'2 10');
    var g=document.createElementNS(NS,'g');g.setAttribute('clip-path','url(#hiClip)');road.appendChild(g);
    var rd=road;road=g;
    path('','#d6c8ae',lw+8);
    path('','#4b4540',lw);
    path('','#f7f3ea',2,'2 10');
    prog=path('','#c8372d',3);
    road=rd;
    base=document.createElementNS(NS,'path');base.setAttribute('d',d);base.setAttribute('fill','none');base.setAttribute('stroke','none');road.appendChild(base);
    len=base.getTotalLength();prog.setAttribute('stroke-dasharray',len);
    mk=[];pts.forEach(function(p,i){
      var major=stops[i].classList.contains('major');
      var c=document.createElementNS(NS,'circle');c.setAttribute('cx',p.x);c.setAttribute('cy',p.y);c.setAttribute('r',major?(mob?10:14):(mob?6:8));c.setAttribute('fill',major?'#c8372d':'#f7f3ea');c.setAttribute('stroke',major?'#fff':'#c8372d');c.setAttribute('stroke-width',major?4:3);c.setAttribute('opacity',reduce?1:.3);road.appendChild(c);mk.push(c);
    });
    ruta.style.setProperty('--hh',((document.querySelector('.site-header')||{offsetHeight:90}).offsetHeight+(document.querySelector('.sh-sub')||{offsetHeight:0}).offsetHeight)+'px');
    buildDeco(w,mob);
    update();
  }
  function atYv(L){return base.getPointAtLength(L).y+10}
  function atY(y){var lo=0,hi=len;for(var i=0;i<22;i++){var m=(lo+hi)/2;if(base.getPointAtLength(m).y<y)lo=m;else hi=m}return lo}
  function update(){
    if(!base)return;
    var rr=ruta.getBoundingClientRect(),y=innerHeight*0.55-rr.top;
    var L=reduce?len:Math.max(0,Math.min(len,atY(y)));
    prog.setAttribute('stroke-dashoffset',len-L);
    clipRect.setAttribute('height',Math.max(0,reduce?9e5:atYv(L)));
    var p=base.getPointAtLength(L),q=base.getPointAtLength(Math.min(len,L+4)),o=base.getPointAtLength(Math.max(0,L-4));
    var dx=q.x-o.x,dy=q.y-o.y,th=Math.atan2(dx,dy)*180/Math.PI;
    var tilt=Math.max(-14,Math.min(14,th*.4));
    veh.style.transform='translate('+p.x+'px,'+p.y+'px) rotate('+tilt+'deg)';
    var idx=0;pts.forEach(function(s,i){if(s.y<=p.y+20)idx=i});
    var fin=p.y>pts[pts.length-1].y+70;var kk=fin?'fe':stops[idx].dataset.veh;fl.style.transform='none'; /* sin espejo: los rótulos y las puertas deben verse siempre bien */
    ruta.classList.toggle('is90',idx>=SAL);
    mk.forEach(function(c,i){c.setAttribute('opacity',(reduce||pts[i].y<=p.y+20)?1:.3)});
    decoEls.forEach(function(d){if(reduce||p.y>=d._y-80)d.classList.add('on')});
    if(tl){tlChips.forEach(function(c,i){c.classList.toggle('on',i===idx);c.classList.toggle('past',i<idx)});tlFill.style.width=(L/len*100)+'%';if(idx!==tl._cur){tl._cur=idx;var c=tlChips[idx];tl.querySelector('.hi-tl-in').scrollTo({left:c.offsetLeft-(tl.clientWidth-c.offsetWidth)/2,behavior:reduce?'auto':'smooth'})}}
    var st=fin?-2:idx;if(st!==cur){cur=st;[].forEach.call(fl.children,function(c){c.classList.toggle('on',c.dataset&&c.dataset.k===kk)});cap.textContent=fin?'Citroën ë-Jumpy · hoy':(stops[idx].dataset.vcap||'')}
  }
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
    stops.forEach(function(s){io.observe(s)});
  }else stops.forEach(function(s){s.classList.add('in')});
  var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(build,150)});
  addEventListener('scroll',function(){requestAnimationFrame(update)},{passive:true});
  addEventListener('load',build);
  [].forEach.call(ruta.querySelectorAll('img'),function(i){i.addEventListener('load',function(){clearTimeout(t);t=setTimeout(build,100)})});
  build();
})();
