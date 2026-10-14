function toggleMenu(){const n=document.querySelector('.nav-links');n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.top='68px';n.style.left='14px';n.style.right='14px';n.style.padding='18px';n.style.borderRadius='16px';n.style.background='#fff';n.style.flexDirection='column';n.style.alignItems='flex-start';n.style.boxShadow='0 20px 45px rgba(0,0,0,.12)'}
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
function filterGallery(cat,btn){document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.gallery-item').forEach(x=>x.style.display=(cat==='all'||x.dataset.cat===cat)?'block':'none')}
function openModal(title,body){document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=body;document.getElementById('modal').classList.add('open')}
function closeModal(){document.getElementById('modal').classList.remove('open')}
function sendForm(e){e.preventDefault();alert('Form demo: connect this form to your email service or backend before publishing.')}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<1000)document.querySelector('.nav-links').style.display='none'}));

/* ===== V3 INTERACTION / 3D MOTION ===== */
(function(){
  const canvas=document.createElement('canvas'); canvas.id='fx-canvas'; document.body.prepend(canvas);
  const ctx=canvas.getContext('2d'); let W,H,pts=[];
  function resize(){W=canvas.width=innerWidth*devicePixelRatio;H=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=[];let n=Math.min(70,Math.floor(innerWidth/18));for(let i=0;i<n;i++)pts.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.5+.35})}
  function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(44,190,255,.55)';ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){let a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<120){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle='rgba(0,155,255,'+(0.12*(1-d/120))+')';ctx.lineWidth=.7;ctx.stroke()}}requestAnimationFrame(draw)}
  resize();addEventListener('resize',resize);draw();
})();
(function(){
 const glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);let tx=-300,ty=-300,x=tx,y=ty;
 addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});function loop(){x+=(tx-x)*.09;y+=(ty-y)*.09;glow.style.left=x+'px';glow.style.top=y+'px';requestAnimationFrame(loop)}loop();
})();
(function(){
 const nav=document.querySelector('.navbar');addEventListener('scroll',()=>nav&&nav.classList.toggle('scrolled',scrollY>20));
 const tiltEls=document.querySelectorAll('.skill-card,.project,.cert,.achievement,.edu-card,.contact-item,.qr-card,.career-step');
 tiltEls.forEach(el=>{el.addEventListener('pointermove',e=>{if(innerWidth<800)return;const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${(-py*5).toFixed(2)}deg) rotateY(${(px*6).toFixed(2)}deg) translateY(-7px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
 const photo=document.querySelector('.photo-frame');if(photo){photo.addEventListener('pointermove',e=>{if(innerWidth<800 || photo.classList.contains('profile-spin'))return;const r=photo.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;photo.style.animationPlayState='paused';photo.style.transform=`perspective(900px) rotateX(${(-py*6).toFixed(2)}deg) rotateY(${(px*8).toFixed(2)}deg) translateY(-4px)`});photo.addEventListener('pointerleave',()=>{photo.style.transform='';photo.style.animationPlayState='running'})}
})();

/* V4 profile photo: one 360-degree 3D spin each time the cursor enters */
(function(){
 const photo=document.querySelector('.photo-frame');
 if(!photo) return;
 photo.classList.add('profile-spin-ready');
 let timer;
 photo.addEventListener('pointerenter',()=>{
   if(window.innerWidth<700) return;
   clearTimeout(timer);
   photo.classList.remove('profile-spin');
   void photo.offsetWidth;
   photo.classList.add('profile-spin');
   timer=setTimeout(()=>photo.classList.remove('profile-spin'),1700);
 });
})();

/* ===== Portfolio interaction fallback / helper ===== */
(function () {
  "use strict";

  window.toggleMenu = window.toggleMenu || function () {
    const nav = document.querySelector(".nav-links");
    if (nav) nav.classList.toggle("mobile-open");
  };

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      const nav = document.querySelector(".nav-links");
      if (nav) nav.classList.remove("mobile-open");
    });
  });

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
