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
  var IMG={pegaso:'Pegaso J4',dkv:'dkv-ram',mb180:'mb180d',mb410:'mb410',mocay:'mocay',fe:'furgon-electrico'};var LEFT={fe:1};IMG.pegaso='pegaso';
  var veh=document.createElement('div');veh.className='hi-vehicle';veh.setAttribute('aria-hidden','true');
  var fl=document.createElement('div');fl.className='flip';veh.appendChild(fl);
  Object.keys(VEH).forEach(function(k){var d=document.createElement('div');d.className='v';d.dataset.k=k;d.innerHTML='<svg viewBox="0 0 90 56">'+VEH[k]+'</svg>';fl.appendChild(d)});
  Object.keys(IMG).forEach(function(k){var d=document.createElement('div');d.className='v img';d.dataset.k=k;d.innerHTML='<img src="assets/historia/'+IMG[k]+'.png" alt="" width="720" height="400">';fl.appendChild(d)});
  var cap=document.createElement('span');cap.className='hi-vcap';veh.appendChild(cap);
  ruta.appendChild(veh);
  var base,prog,pts=[],len=0,cur=-1;
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
    var kk=stops[idx].dataset.veh;fl.style.transform=((dx<0)!==!!LEFT[kk])?'scaleX(-1)':'none';
    ruta.classList.toggle('is90',idx===stops.length-1);
    if(idx!==cur){cur=idx;var k=stops[idx].dataset.veh;[].forEach.call(fl.children,function(c){c.classList.toggle('on',c.dataset&&c.dataset.k===k)});cap.textContent=stops[idx].dataset.vcap||''}
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
