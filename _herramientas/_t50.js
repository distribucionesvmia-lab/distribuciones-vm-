const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3500);
console.log(JSON.stringify(await p.evaluate(()=>{const m=document.querySelector('.hero-media').getBoundingClientRect(),i=document.querySelector('.hero-bg'),r=i.getBoundingClientRect(),cs=getComputedStyle(i);return {media:[m.top,m.height,m.width],img:[r.top,r.height,r.width],fit:cs.objectFit,pos:cs.objectPosition,tf:cs.transform,nat:[i.naturalWidth,i.naturalHeight],src:i.currentSrc.split('/').pop()}})));
await p.screenshot({path:'/tmp/h390.png',clip:{x:0,y:90,width:390,height:330}});await b.close()})()
