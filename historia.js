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
  var IMG={pegaso:'Pegaso J4',dkv:'dkv-ram',mb180:'mb180d',mb410:'mb410',mocay:'mocay',fe:'furgon-electrico',ford:'ford-transit'};var LEFT={fe:1,ford:1};IMG.pegaso='pegaso';
  var veh=document.createElement('div');veh.className='hi-vehicle';veh.setAttribute('aria-hidden','true');
  var fl=document.createElement('div');fl.className='flip';veh.appendChild(fl);
  Object.keys(VEH).forEach(function(k){var d=document.createElement('div');d.className='v';d.dataset.k=k;d.innerHTML='<svg viewBox="0 0 90 56">'+VEH[k]+'</svg>';fl.appendChild(d)});
  Object.keys(IMG).forEach(function(k){var d=document.createElement('div');d.className='v img';d.dataset.k=k;d.innerHTML='<img src="assets/historia/'+IMG[k]+'.png" alt="" width="720" height="400">';fl.appendChild(d)});
  var cap=document.createElement('span');cap.className='hi-vcap';veh.appendChild(cap);
  ruta.appendChild(veh);
  var base,prog,pts=[],len=0,cur=-1;

  var DECO={
    castle:'<svg viewBox="0 0 220 150"><rect x="8" y="92" width="204" height="44" fill="#b5523b"/><g fill="#b5523b"><rect x="8" y="84" width="10" height="10"/><rect x="26" y="84" width="10" height="10"/><rect x="44" y="84" width="10" height="10"/><rect x="62" y="84" width="10" height="10"/><rect x="148" y="84" width="10" height="10"/><rect x="166" y="84" width="10" height="10"/><rect x="184" y="84" width="10" height="10"/><rect x="202" y="84" width="10" height="10"/></g><rect x="78" y="28" width="62" height="108" fill="#a8452f"/><g fill="#a8452f"><rect x="78" y="18" width="10" height="12"/><rect x="95" y="18" width="10" height="12"/><rect x="113" y="18" width="10" height="12"/><rect x="130" y="18" width="10" height="12"/></g><rect x="100" y="50" width="18" height="26" rx="9" fill="#5a2a20"/><rect x="104" y="100" width="22" height="36" rx="11" fill="#4a2018"/><rect x="26" y="104" width="10" height="16" rx="5" fill="#5a2a20"/><rect x="176" y="104" width="10" height="16" rx="5" fill="#5a2a20"/><path d="M109 18V4l18 6-18 6" fill="#c8372d"/><rect x="0" y="136" width="220" height="8" rx="4" fill="#8aa36a"/></svg>',
    vine:'<svg viewBox="0 0 220 130"><path d="M0 128Q60 40 220 70V130z" fill="#a9c27f"/><g stroke="#4f7a36" stroke-width="5" stroke-linecap="round" fill="none"><path d="M14 124Q70 60 214 88"/><path d="M14 112Q70 50 214 78"/><path d="M30 126Q90 80 214 102"/></g><g fill="#6b8f45"><circle cx="46" cy="96" r="9"/><circle cx="80" cy="82" r="9"/><circle cx="114" cy="78" r="9"/><circle cx="150" cy="82" r="9"/><circle cx="184" cy="88" r="9"/></g><g fill="#6a3a78"><circle cx="46" cy="108" r="5"/><circle cx="52" cy="113" r="5"/><circle cx="41" cy="113" r="5"/><circle cx="120" cy="92" r="5"/><circle cx="126" cy="97" r="5"/><circle cx="115" cy="97" r="5"/></g><g stroke="#7a5a3a" stroke-width="3"><path d="M30 100v22M64 90v26M98 82v26M132 82v26M166 86v26M200 92v24"/></g></svg>',
    pines:'<svg viewBox="0 0 200 150"><g stroke="#7a5230" stroke-width="7" stroke-linecap="round"><path d="M50 146V84"/><path d="M110 146V70"/><path d="M165 146V92"/></g><g fill="#3f7f45"><ellipse cx="50" cy="76" rx="38" ry="19"/><ellipse cx="110" cy="60" rx="46" ry="22"/><ellipse cx="165" cy="86" rx="30" ry="15"/></g><g fill="#33683a"><ellipse cx="44" cy="82" rx="26" ry="9"/><ellipse cx="108" cy="68" rx="32" ry="10"/></g><rect y="144" width="200" height="6" rx="3" fill="#c9b27c"/></svg>',
    wheat:'<svg viewBox="0 0 200 130"><circle cx="160" cy="26" r="16" fill="#f3c24a"/><path d="M0 110Q100 70 200 100V130H0z" fill="#e2b95a"/><g stroke="#c9972e" stroke-width="3" stroke-linecap="round"><path d="M20 120l4-34M38 118l4-38M56 116l4-40M74 114l4-38M92 112l4-36M110 112l4-36M128 114l4-38M146 116l4-38M164 118l4-34M182 120l4-30"/></g><g fill="#e8c35f"><ellipse cx="24" cy="82" rx="3" ry="9"/><ellipse cx="42" cy="76" rx="3" ry="9"/><ellipse cx="60" cy="72" rx="3" ry="9"/><ellipse cx="78" cy="72" rx="3" ry="9"/><ellipse cx="96" cy="74" rx="3" ry="9"/><ellipse cx="114" cy="74" rx="3" ry="9"/><ellipse cx="132" cy="72" rx="3" ry="9"/><ellipse cx="150" cy="74" rx="3" ry="9"/><ellipse cx="168" cy="80" rx="3" ry="9"/></g></svg>',
    sun:'<svg viewBox="0 0 200 140"><rect y="122" width="200" height="12" rx="6" fill="#9db56a"/><g stroke="#4f7a36" stroke-width="4"><path d="M40 124V66M100 124V50M160 124V70"/></g><g><circle cx="40" cy="58" r="22" fill="#f3b72a"/><circle cx="40" cy="58" r="10" fill="#6b4423"/><circle cx="100" cy="42" r="26" fill="#f3b72a"/><circle cx="100" cy="42" r="12" fill="#6b4423"/><circle cx="160" cy="62" r="22" fill="#f3b72a"/><circle cx="160" cy="62" r="10" fill="#6b4423"/></g></svg>',
    village:'<svg viewBox="0 0 220 140"><rect x="0" y="124" width="220" height="10" rx="5" fill="#9db56a"/><rect x="12" y="84" width="48" height="42" fill="#e9d9b8"/><path d="M6 86l30-26 30 26z" fill="#b5523b"/><rect x="74" y="64" width="36" height="62" fill="#d8c39a"/><path d="M92 36l-10 28h20z" fill="#8f3b2b"/><rect x="88" y="64" width="8" height="8" rx="4" fill="#4a2018"/><rect x="122" y="90" width="52" height="36" fill="#eadfc4"/><path d="M116 92l32-24 32 24z" fill="#b5523b"/><rect x="184" y="98" width="28" height="28" fill="#e2cfa6"/><path d="M180 100l18-16 18 16z" fill="#a8452f"/><rect x="26" y="100" width="10" height="14" fill="#6a4a2a"/><rect x="140" y="106" width="12" height="20" fill="#6a4a2a"/></svg>',
    bridge:'<svg viewBox="0 0 220 110"><path d="M0 90h220v20H0z" fill="#a9cbd9"/><path d="M0 40h220v12H0z" fill="#c9b27c"/><path d="M0 52h220v38H0z" fill="#d6c196"/><g fill="#a9cbd9"><path d="M20 90a26 38 0 0 1 52 0z"/><path d="M84 90a26 38 0 0 1 52 0z"/><path d="M148 90a26 38 0 0 1 52 0z"/></g><path d="M0 36h220" stroke="#8f7a52" stroke-width="3"/></svg>'
  };
  var PLAN=['castle','village','vine','sun','pines','pines','bridge','village','vine','wheat','pines','village'];
  var deco=document.createElement('div');deco.className='hi-deco';deco.setAttribute('aria-hidden','true');ruta.insertBefore(deco,road);
  function addDeco(k,x,y,w,cls){var d=document.createElement('div');d.className='hi-d '+(cls||'');d.style.cssText='left:'+x+'px;top:'+y+'px;width:'+w+'px';d.innerHTML=DECO[k];deco.appendChild(d)}
  function tinyTree(x,y,s,c){var d=document.createElement('div');d.className='hi-t';d.style.cssText='left:'+x+'px;top:'+y+'px;width:'+s+'px;height:'+s*1.4+'px';d.innerHTML='<svg viewBox="0 0 20 28"><rect x="9" y="18" width="3" height="10" fill="#7a5230"/><ellipse cx="10.5" cy="12" rx="8" ry="11" fill="'+c+'"/></svg>';deco.appendChild(d)}
  function buildDeco(w,mob){
    deco.innerHTML='';
    var ys=pts.map(function(p){return p.y});
    pts.forEach(function(p,i){
      var k=PLAN[i%PLAN.length];
      if(mob){
        var ny=i<pts.length-1?(p.y+pts[i+1].y)/2+30:p.y+90;
        addDeco(k,w-96,ny-18,64,'sm');
      }else{
        var cardLeft=i%2===0;
        var cx=cardLeft?w*0.80:w*0.20;
        addDeco(k,cx-110,p.y+10,220,'');
        if(i<pts.length-1){var k2=PLAN[(i+5)%PLAN.length];var gx=cardLeft?w*0.50+90:w*0.50-250;addDeco(k2,gx,(p.y+pts[i+1].y)/2-10,150,'sm')}
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
      if(mob)x=(i%2?44:26)+parseFloat(getComputedStyle(ruta).paddingLeft)-0;
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
    path('','#d6c8ae',lw+8);
    base=path('','#4b4540',lw);
    path('','#f7f3ea',2,'2 10');
    prog=path('','#c8372d',3);
    len=base.getTotalLength();prog.setAttribute('stroke-dasharray',len);
    pts.forEach(function(p,i){
      var major=stops[i].classList.contains('major');
      var c=document.createElementNS(NS,'circle');c.setAttribute('cx',p.x);c.setAttribute('cy',p.y);c.setAttribute('r',major?(mob?10:14):(mob?6:8));c.setAttribute('fill',major?'#c8372d':'#f7f3ea');c.setAttribute('stroke',major?'#fff':'#c8372d');c.setAttribute('stroke-width',major?4:3);road.appendChild(c);
    });
    buildDeco(w,mob);
    update();
  }
  function atY(y){var lo=0,hi=len;for(var i=0;i<22;i++){var m=(lo+hi)/2;if(base.getPointAtLength(m).y<y)lo=m;else hi=m}return lo}
  function update(){
    if(!base)return;
    var rr=ruta.getBoundingClientRect(),y=innerHeight*0.55-rr.top;
    var L=reduce?len:Math.max(0,Math.min(len,atY(y)));
    prog.setAttribute('stroke-dashoffset',len-L);
    var p=base.getPointAtLength(L),q=base.getPointAtLength(Math.min(len,L+4)),o=base.getPointAtLength(Math.max(0,L-4));
    var dx=q.x-o.x,dy=q.y-o.y,th=Math.atan2(dx,dy)*180/Math.PI;
    var tilt=Math.max(-14,Math.min(14,th*.4));
    veh.style.transform='translate('+p.x+'px,'+p.y+'px) rotate('+tilt+'deg)';
    var idx=0;pts.forEach(function(s,i){if(s.y<=p.y+20)idx=i});
    var fin=p.y>pts[pts.length-1].y+70;var kk=fin?'fe':stops[idx].dataset.veh;fl.style.transform=((dx<0)!==!!LEFT[kk])?'scaleX(-1)':'none';
    ruta.classList.toggle('is90',idx===stops.length-1);
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
