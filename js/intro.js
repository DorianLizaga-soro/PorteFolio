const intro=document.getElementById('intro');
let T=[],raf;
const SEG=[[.023,.297,.955,.04],[.896,.094,.071,.938],[.071,.938,.968,.674]];
function burst(){
  const c=document.getElementById('fx'),x=c.getContext('2d');c.width=intro.clientWidth;c.height=intro.clientHeight;
  const r=document.querySelector('.zwrap').getBoundingClientRect();
  const P=Array.from({length:150},()=>{
    const g=SEG[Math.floor(Math.random()*3)],t=Math.random();
    const px=r.left+(g[0]+(g[2]-g[0])*t)*r.width,py=r.top+(g[1]+(g[3]-g[1])*t)*r.height;
    const ang=Math.atan2(g[3]-g[1],g[2]-g[0])+(Math.random()-.5)*2.4+(Math.random()>.5?0:Math.PI),v=.8+Math.random()*6;
    return{x:px,y:py,vx:Math.cos(ang)*v,vy:Math.sin(ang)*v-.3,l:1,d:.014+Math.random()*.02,s:.8+Math.random()*2.6,c:Math.random()>.45?'#6EF08A':'#22C55E'}});
  (function f(){x.clearRect(0,0,c.width,c.height);let on=0;
    P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vx*=.95;p.vy*=.95;p.l-=p.d;if(p.l>0){on=1;x.globalAlpha=p.l;x.fillStyle=p.c;x.shadowColor='#22C55E';x.shadowBlur=10;x.fillRect(p.x,p.y,p.s*(Math.random()>.7?3:1),p.s)}});
    if(on)raf=requestAnimationFrame(f)})();
}
function playIntro(){
  T.forEach(clearTimeout);cancelAnimationFrame(raf);
  document.body.classList.add('lock');window.scrollTo(0,0);
  intro.classList.remove('hide','go');void intro.offsetWidth;intro.classList.add('go');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){T=[setTimeout(endIntro,700)];return}
  T=[setTimeout(burst,2500),setTimeout(endIntro,5600)];
}
function endIntro(){document.body.classList.add('ready');startTyping();T.forEach(clearTimeout);cancelAnimationFrame(raf);intro.classList.add('hide');document.body.classList.remove('lock')}
intro.addEventListener('click',endIntro);
document.querySelector('nav .lg').addEventListener('dblclick',playIntro);
playIntro();
