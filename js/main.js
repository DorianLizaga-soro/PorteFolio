const ROLES=['Développeur Fullstack','Front-end & Back-end','Du concept au déploiement'];let tyOn=0;
function startTyping(){if(tyOn)return;tyOn=1;const el=document.getElementById('ty');let r=0,i=0,del=0;
  (function tick(){const w=ROLES[r];i+=del?-1:1;el.textContent=w.slice(0,i);let d=del?35:70;
    if(!del&&i===w.length){del=1;d=1700}else if(del&&i===0){del=0;r=(r+1)%ROLES.length;d=350}setTimeout(tick,d)})()}
const home=document.getElementById('home'),nv=document.querySelector('nav');
home.addEventListener('mousemove',e=>{const b=home.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;
  home.style.setProperty('--mx',x*100+'%');home.style.setProperty('--my',y*100+'%');
  home.style.setProperty('--px',(x-.5)*-26+'px');home.style.setProperty('--py',(y-.5)*-18+'px')});
addEventListener('scroll',()=>nv.classList.toggle('sc',scrollY>20),{passive:true});
const rv=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('show')),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>rv.observe(el));
const links=[...document.querySelectorAll('.links a')];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section').forEach(s=>spy.observe(s));

/* fond tech : grille de points réactive, paquets de données, fragments de code */
(function(){
  const cv=document.getElementById('bg'),c=cv.getContext('2d');let W,H,D,G,mx=-9999,my=-9999;
  function size(){D=Math.min(devicePixelRatio||1,2);W=cv.width=innerWidth*D;H=cv.height=innerHeight*D;G=40*D}
  size();addEventListener('resize',size);
  addEventListener('pointermove',e=>{mx=e.clientX*D;my=e.clientY*D},{passive:true});
  addEventListener('pointerleave',()=>{mx=my=-9999});
  const R=170;
  const TK=['</>','{ }','=>','const','git push','npm run dev','SELECT *','<div>','0101','async','return','200 OK','php artisan','flex','JSON','try { }'];
  const small=innerWidth<700,TN=small?7:15,T=[];
  const mkT=(init)=>({s:TK[Math.floor(Math.random()*TK.length)],x:Math.random()*W,y:init?Math.random()*H:H+30*D,v:(.12+Math.random()*.22)*D,f:(10+Math.random()*4)*D,a:.07+Math.random()*.12});
  for(let i=0;i<TN;i++)T.push(mkT(true));
  const P=[];let nextP=1800;
  function spawn(){const h=Math.random()>.5,i=Math.floor(Math.random()*((h?H:W)/G)),dir=Math.random()>.5?1:-1;
    P.push({x:h?(dir>0?-10:W+10):i*G+.5,y:h?i*G+.5:(dir>0?-10:H+10),dx:h?dir:0,dy:h?0:dir,v:(1.3+Math.random()*1.3)*D,tr:[]})}
  function step(p,k){const ox=p.x,oy=p.y;p.x+=p.dx*p.v*k;p.y+=p.dy*p.v*k;
    if(p.dx){const a=Math.floor(ox/G),b=Math.floor(p.x/G);if(a!==b&&Math.random()<.14){p.x=Math.max(a,b)*G+.5;p.dy=Math.random()>.5?1:-1;p.dx=0}}
    else{const a=Math.floor(oy/G),b=Math.floor(p.y/G);if(a!==b&&Math.random()<.14){p.y=Math.max(a,b)*G+.5;p.dx=Math.random()>.5?1:-1;p.dy=0}}
    p.tr.push([p.x,p.y]);if(p.tr.length>16)p.tr.shift()}
  function dots(){
    c.fillStyle='rgba(74,222,128,.17)';const s=1.3*D;
    for(let x=0;x<W;x+=G)for(let y=0;y<H;y+=G)c.fillRect(x-s/2+.5,y-s/2+.5,s,s);
    if(mx<-999)return;const r=R*D,x0=Math.max(0,Math.floor((mx-r)/G)),x1=Math.ceil((mx+r)/G),y0=Math.max(0,Math.floor((my-r)/G)),y1=Math.ceil((my+r)/G);
    for(let i=x0;i<=x1;i++)for(let j=y0;j<=y1;j++){const x=i*G,y=j*G,d=Math.hypot(x-mx,y-my);if(d>r)continue;const k=1-d/r;
      c.fillStyle='rgba(110,240,138,'+(.25+.75*k)+')';c.shadowColor='#22C55E';c.shadowBlur=k*12*D;c.beginPath();c.arc(x+.5,y+.5,(1+2.2*k)*D,0,6.283);c.fill()}
    c.shadowBlur=0}
  let last=performance.now();
  function frame(now){const dt=Math.min(now-last,50),k=dt/16.7;last=now;nextP-=dt;
    if(nextP<=0&&P.length<2){spawn();nextP=3000+Math.random()*4000}
    c.clearRect(0,0,W,H);dots();
    c.textBaseline='middle';
    for(const t of T){t.y-=t.v*k;if(t.y<-30*D)Object.assign(t,mkT(false));c.font=t.f+'px ui-monospace,Menlo,Consolas,monospace';c.fillStyle='rgba(74,222,128,'+t.a+')';c.fillText(t.s,t.x,t.y)}
    c.lineCap='round';c.lineWidth=1.5*D;
    for(let i=P.length-1;i>=0;i--){const p=P[i];step(p,k);const n=p.tr.length;
      for(let j=1;j<n;j++){c.strokeStyle='rgba(110,240,138,'+(j/n*.45)+')';c.beginPath();c.moveTo(p.tr[j-1][0],p.tr[j-1][1]);c.lineTo(p.tr[j][0],p.tr[j][1]);c.stroke()}
      c.fillStyle='#E8FFF0';c.shadowColor='#22C55E';c.shadowBlur=12*D;c.beginPath();c.arc(p.x,p.y,2*D,0,6.283);c.fill();c.shadowBlur=0;
      if(p.x<-40||p.x>W+40||p.y<-40||p.y>H+40)P.splice(i,1)}
    requestAnimationFrame(frame)}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){dots()}else requestAnimationFrame(frame);
})();
