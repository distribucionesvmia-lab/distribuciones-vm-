const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();for(const [w,h] of [[1440,900],[1280,720],[1920,1080]]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto('http://localhost:8770/despensa.html');await p.waitForTimeout(1800);
const names=await p.evaluate(()=>[...document.querySelectorAll('.pw-e')].filter(x=>x.classList.contains('is-scroll')).map(x=>x.querySelector('h2').textContent.slice(0,22)));
if(w==1440)console.log('escenas con lista desplazable:',names.join(' | '));
for(const sel of ['Carmencita','Luengo']){
const y=await p.evaluate(sel=>{const s=[...document.querySelectorAll('.pw-e')].find(x=>x.querySelector('h2').textContent.includes(sel));return s?[s.getBoundingClientRect().top+scrollY,s.offsetHeight]:null},sel);if(!y)continue;
const res=[];for(const f of [0.02,0.25,0.5,0.75,0.98]){await p.evaluate(([y,a,f])=>scrollTo(0,y+f*(a-innerHeight)),[y[0],y[1],f]);await p.waitForTimeout(1100);
res.push(await p.evaluate(sel=>{const s=[...document.querySelectorAll('.pw-e')].find(x=>x.querySelector('h2').textContent.includes(sel));const l=s.querySelector('.pw-e-list').getBoundingClientRect(),c=s.querySelector('.pw-e-list li.is-current'),r=c.getBoundingClientRect(),all=[...s.querySelectorAll('.pw-e-list li')];const vis=all.filter(li=>{const q=li.getBoundingClientRect();return q.top>=l.top-1&&q.bottom<=l.bottom+1}).length;const idx=all.indexOf(c)+1;return idx+(r.top>=l.top&&r.bottom<=l.bottom?'✓':'✗')+'/'+vis+'vis'},sel))}
console.log(w,sel,res.join('  '))}
await p.close()}await b.close()})()
