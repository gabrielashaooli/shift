/* ═══════════════════════════════════════════════════
   SHIFT — main.js
   Shared behavior across all pages
═══════════════════════════════════════════════════ */

(function(){

  /* ── Nav scroll shadow ── */
  var nav = document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll', function(){
      nav.classList.toggle('sh', window.scrollY > 20);
    }, {passive:true});
  }

  /* ── Hamburger menu ── */
  var hbg = document.getElementById('hbg');
  var mm  = document.getElementById('mm');
  if(hbg && mm){
    hbg.addEventListener('click', function(){
      mm.classList.toggle('open');
      var open = mm.classList.contains('open');
      hbg.innerHTML = open
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></svg>';
    });
    mm.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mm.classList.remove('open'); });
    });
  }

  /* ── Active nav link ── */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mm a').forEach(function(a){
    var href = a.getAttribute('href') || '';
    if(href === path || (path === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });

  /* ── Mouse glow (desktop only) ── */
  var glow = document.getElementById('glow');
  if(glow && window.innerWidth > 768){
    document.addEventListener('mousemove', function(e){
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, {passive:true});
  } else if(glow){
    glow.style.display = 'none';
  }

  /* ── Scroll reveal (IntersectionObserver) ── */
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('in');
        /* Animate progress bars inside revealed element */
        e.target.querySelectorAll('.pfill').forEach(function(pf){
          pf.style.width = pf.dataset.w || '0%';
        });
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.08});

  document.querySelectorAll('.reveal, .nstrip, .svc-item').forEach(function(el){
    obs.observe(el);
  });

  /* ── Smooth anchor links (for index.html anchors) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  /* ── Hero line chart animation ── */
  var hl = document.getElementById('hl');
  if(hl){
    setTimeout(function(){ hl.style.strokeDashoffset = '0'; }, 600);
  }

  /* ── Hero counter animation ── */
  function animateCount(el, target, suffix, duration){
    var start = 0;
    var step = target / (duration / 16);
    var timer = setInterval(function(){
      start = Math.min(start + step, target);
      el.textContent = Math.round(start) + suffix;
      if(start >= target) clearInterval(timer);
    }, 16);
  }
  var mv1 = document.getElementById('mv1');
  var mv2 = document.getElementById('mv2');
  if(mv1 && mv2){
    setTimeout(function(){
      animateCount(mv1, 87, '%', 1200);
      animateCount(mv2, 340, ' hrs', 1400);
    }, 500);
  }

  /* ── Mini bar chart (hero) ── */
  var hbars = document.getElementById('hbars');
  if(hbars){
    var bars = [
      {h:62,c:'#e06b30',l:'IA'},
      {h:48,c:'#e06b30',l:'Dev'},
      {h:55,c:'#2d4be0',l:'Data'},
      {h:38,c:'#2d4be0',l:'Seg'},
      {h:45,c:'#e06b30',l:'Ops'},
      {h:52,c:'#9c5de0',l:'ML'}
    ];
    bars.forEach(function(b){
      var col = document.createElement('div');
      col.className = 'bmc';
      col.innerHTML = '<div class="bmb" style="height:'+b.h+'%;background:'+b.c+';transform-origin:bottom;transform:scaleY(0);transition:transform .7s cubic-bezier(.16,1,.3,1)"></div><span class="bml">'+b.l+'</span>';
      hbars.appendChild(col);
    });
    setTimeout(function(){
      hbars.querySelectorAll('.bmb').forEach(function(b, i){
        setTimeout(function(){ b.style.transform = 'scaleY(1)'; }, i * 80);
      });
    }, 800);
  }

  /* ── Donut chart (hero) ── */
  var dc = document.getElementById('donut-canvas');
  if(dc){
    var ctx = dc.getContext('2d');
    var segments = [{v:62,c:'#e06b30'},{v:25,c:'#2d4be0'},{v:13,c:'#9c5de0'}];
    var total = 100, start = -Math.PI/2, r = 38, cx = 50, cy = 50;
    function drawDonut(progress){
      ctx.clearRect(0,0,100,100);
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      var drawn = 0;
      segments.forEach(function(s){
        var angle = (s.v/total) * Math.PI * 2 * progress;
        ctx.beginPath();
        ctx.arc(cx,cy,r, start+drawn, start+drawn+angle);
        ctx.strokeStyle = s.c;
        ctx.stroke();
        drawn += angle;
      });
    }
    var p = 0;
    var dTimer = setInterval(function(){
      p = Math.min(p + .025, 1);
      drawDonut(p);
      if(p >= 1) clearInterval(dTimer);
    }, 16);
  }

  /* ── Contact form ── */
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando…';
      btn.disabled = true;
      setTimeout(function(){
        form.innerHTML = '<div class="form-success"><div class="form-success-icon">✓</div><h3>¡Mensaje recibido!</h3><p>Te contactamos en menos de 48 horas con una propuesta técnica personalizada.</p></div>';
      }, 1200);
    });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if(q && a){
      q.addEventListener('click', function(){
        var open = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); });
        if(!open) item.classList.add('open');
      });
    }
  });

})();

/* ═══════════════════════════════════════════════════
   Horizontal scroll (index.html only)
═══════════════════════════════════════════════════ */
(function(){
  var hSection = document.getElementById('proceso');
  if(!hSection) return;

  var hTrack = hSection.querySelector('.hscroll-track');
  var hDots  = hSection.querySelectorAll('.hp');

  function fixHCentering(){
    var vpHalf   = hTrack.parentElement.offsetWidth / 2;
    var firstCard = hTrack.querySelector('.hcard');
    var cardHalf = firstCard ? firstCard.offsetWidth / 2 : 170;
    hTrack.style.marginLeft = Math.max(0, vpHalf - cardHalf) + 'px';
  }
  fixHCentering();
  window.addEventListener('resize', function(){ fixHCentering(); updateHScroll(); }, {passive:true});

  function updateHScroll(){
    var rect = hSection.getBoundingClientRect();
    var progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
    var cards = hTrack.querySelectorAll('.hcard');
    var cardW = cards[0] ? cards[0].offsetWidth : 340;
    var maxShift = (cards.length - 1) * (cardW + 24);
    hTrack.style.transform = 'translateX(-' + (progress * maxShift) + 'px)';
    var dotIdx = Math.round(progress * (hDots.length - 1));
    hDots.forEach(function(d, i){ d.classList.toggle('active', i === dotIdx); });
  }
  window.addEventListener('scroll', updateHScroll, {passive:true});
  updateHScroll();
})();
