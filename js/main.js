/* ── Nav scroll shadow ── */
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('nav');
  if(nav)nav.classList.toggle('sh',scrollY>24);
},{passive:true});

/* ── Hamburger menu ── */
const hbgBtn=document.getElementById('hbg');
if(hbgBtn){
  hbgBtn.addEventListener('click',()=>{
    const m=document.getElementById('mm');
    if(m)m.style.display=m.style.display==='block'?'none':'block';
  });
}
document.querySelectorAll('#mm a').forEach(a=>a.addEventListener('click',()=>{
  const m=document.getElementById('mm');
  if(m)m.style.display='none';
}));

/* ── Mouse glow ── */
const glow=document.getElementById('glow');
if(glow){
  document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
}

/* ── Ease out cubic ── */
function easeOut(t){return 1-Math.pow(1-t,3)}
function countTo(el,target,suffix,dur,delay){
  if(!el)return;
  setTimeout(()=>{
    const t0=performance.now();
    (function tick(now){
      const p=Math.min((now-t0)/dur,1);
      el.textContent=Math.round(easeOut(p)*target)+suffix;
      if(p<1)requestAnimationFrame(tick);
    })(performance.now());
  },delay);
}

/* ── Hero animate on load ── */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const hl=document.getElementById('hl');
    if(hl)hl.style.strokeDashoffset='0';

    const hd1=document.getElementById('hd1'),hd2=document.getElementById('hd2');
    if(hd1)hd1.style.strokeDashoffset='0';
    if(hd2)setTimeout(()=>{hd2.style.opacity='1';hd2.style.strokeDashoffset='0';},900);

    // bars
    const hbars=document.getElementById('hbars');
    if(hbars){
      const bd=[{h:28,c:'#e06b30',l:'IA'},{h:44,c:'#e06b30',l:'Dev'},{h:35,c:'#2d4be0',l:'Data'},{h:30,c:'#2d4be0',l:'Seg'},{h:48,c:'#e06b30',l:'Ops'},{h:38,c:'#7c3aed',l:'ML'}];
      hbars.innerHTML=bd.map((b,i)=>`<div class="bmc"><div class="bmb" id="hb${i}" style="height:${b.h}px;background:${b.c};opacity:.85"></div><span class="bml">${b.l}</span></div>`).join('');
      bd.forEach((_,i)=>{
        const b=document.getElementById('hb'+i);
        if(b)setTimeout(()=>{b.style.transition='transform .75s cubic-bezier(.16,1,.3,1)';b.style.transform='scaleY(1)'},500+i*90);
      });
    }
  },400);

  countTo(document.getElementById('mv1'),87,'%',1800,700);
  countTo(document.getElementById('mv2'),340,' hrs',2000,900);
});

/* ── Horizontal scroll section ── */
const hSection=document.getElementById('proceso');
if(hSection){
  const hTrack=hSection.querySelector('.hscroll-track');
  const hDots=hSection.querySelectorAll('.hp');

  function fixHCentering(){
    if(!hTrack)return;
    const vpHalf=hTrack.parentElement.offsetWidth/2;
    const firstCard=hTrack.querySelector('.hcard');
    const cardHalf=firstCard?firstCard.offsetWidth/2:170;
    hTrack.style.marginLeft=Math.max(0,vpHalf-cardHalf)+'px';
  }
  fixHCentering();
  window.addEventListener('resize',()=>{fixHCentering();updateHScroll()},{passive:true});

  function updateHScroll(){
    if(!hTrack)return;
    const rect=hSection.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,-rect.top/(rect.height-window.innerHeight)));
    const cards=hTrack.querySelectorAll('.hcard');
    const cardW=cards[0]?cards[0].offsetWidth:340;
    const maxShift=(cards.length-1)*(cardW+24);
    hTrack.style.transform=`translateX(-${progress*maxShift}px)`;
    const dotIdx=Math.round(progress*(hDots.length-1));
    hDots.forEach((d,i)=>d.classList.toggle('active',i===dotIdx));
  }
  window.addEventListener('scroll',updateHScroll,{passive:true});
}

/* ── Intersection observer for scroll reveals ── */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target;
    el.classList.add('in');

    el.querySelectorAll('[data-target]').forEach((c,i)=>countTo(c,parseInt(c.dataset.target),c.dataset.suffix||'',1800,i*180));
    el.querySelectorAll('.pfill[data-w]').forEach((b,i)=>setTimeout(()=>b.style.width=b.dataset.w,i*120+300));
    el.querySelectorAll('.sline').forEach((l,i)=>setTimeout(()=>l.style.strokeDashoffset='0',i*150+200));
    el.querySelectorAll('.sbar').forEach((b,i)=>setTimeout(()=>{b.style.transition='transform .85s cubic-bezier(.16,1,.3,1)';b.style.transform='scaleY(1)'},i*80+150));

    obs.unobserve(el);
  });
},{threshold:0.08});

document.querySelectorAll('.reveal,.nstrip,.charts,.svc-item').forEach(el=>obs.observe(el));

/* ── FAQ accordion (contacto page) ── */
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.closest('.faq-item');
    if(!item)return;
    const wasOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
    if(!wasOpen)item.classList.add('open');
  });
});
