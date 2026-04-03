/* ─── main.js ─────────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════
   PRELOADER
════════════════════════════════════ */
function runPreloader() {
  const count = document.getElementById('preCount');
  const bar   = document.getElementById('preBar');
  const pre   = document.getElementById('preloader');
  let n = 0;

  const tick = setInterval(() => {
    n += Math.random() * 4 + 1;
    if (n >= 100) {
      n = 100;
      clearInterval(tick);
      setTimeout(() => {
        gsap.to(pre, {
          opacity: 0, duration: 0.7, ease: 'power2.inOut',
          onComplete: () => { pre.style.display = 'none'; animateHeroIn(); }
        });
      }, 350);
    }
    count.textContent = Math.floor(n);
    bar.style.width   = n + '%';
  }, 28);
}

/* ════════════════════════════════════
   HERO ENTRANCE
════════════════════════════════════ */
function animateHeroIn() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, from: { y: 20 } })
    .to('.name-inner',   { y: '0%', duration: 0.9, stagger: 0.12 }, '-=0.4')
    .to('.hero-tagline', { opacity: 1, duration: 0.6 }, '-=0.4')
    .to('.hero-ctas',    { opacity: 1, duration: 0.6 }, '-=0.3')
    .to('#scrollHint',   { opacity: 1, duration: 0.5 }, '-=0.2');
}

/* ════════════════════════════════════
   THREE.JS  — PARTICLE MESH BG
════════════════════════════════════ */
function initThreeJS() {
  const canvas   = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 35;

  /* Create grid of particles */
  const COLS = 60, ROWS = 40;
  const COUNT = COLS * ROWS;
  const positions = new Float32Array(COUNT * 3);
  const initialZ  = new Float32Array(COUNT);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      positions[i * 3]     = (c / (COLS - 1) - 0.5) * 60;
      positions[i * 3 + 1] = (r / (ROWS - 1) - 0.5) * 40;
      positions[i * 3 + 2] = 0;
      initialZ[i] = Math.random() * Math.PI * 2;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.18,
    color: new THREE.Color('#e8607a'),
    transparent: true,
    opacity: 0.45,
  });

  const mesh = new THREE.Points(geo, mat);
  scene.add(mesh);

  /* Mouse tracking */
  let mx = 0, my = 0;
  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* Animate */
  let frame;
  function animate() {
    frame = requestAnimationFrame(animate);
    const t   = Date.now() * 0.001;
    const pos = geo.attributes.position;

    for (let i = 0; i < COUNT; i++) {
      const x  = pos.getX(i);
      const y  = pos.getY(i);
      const z  = Math.sin(x * 0.25 + t * 0.6 + initialZ[i]) *
                 Math.cos(y * 0.25 + t * 0.4) * 3;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;

    camera.position.x += (mx * 4 - camera.position.x) * 0.04;
    camera.position.y += (-my * 3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  /* Fade canvas when hero leaves viewport */
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate: self => { canvas.style.opacity = 1 - self.progress; }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById('cursor');
  const blob = document.getElementById('cursor-blob');
  let bx = 0, by = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    dot.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`;
  });

  (function loopBlob() {
    bx += (cx - bx) * 0.1;
    by += (cy - by) * 0.1;
    blob.style.transform = `translate(${bx - 18}px, ${by - 18}px)`;
    requestAnimationFrame(loopBlob);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('big'); blob.classList.add('big');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('big'); blob.classList.remove('big');
    });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    blob.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    blob.style.opacity = '1';
  });
}

/* ════════════════════════════════════
   NAV SCROLL
════════════════════════════════════ */
function initNav() {
  ScrollTrigger.create({
    start: 80,
    onEnter:     () => document.getElementById('nav').classList.add('scrolled'),
    onLeaveBack: () => document.getElementById('nav').classList.remove('scrolled'),
  });
}

/* ════════════════════════════════════
   SCROLL REVEALS
════════════════════════════════════ */
function initReveals() {
  gsap.utils.toArray('.reveal-fade').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  gsap.utils.toArray('.reveal-up').forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.fromTo(el,
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  /* Skill bar fills */
  document.querySelectorAll('.sfill').forEach(fill => {
    const pct = getComputedStyle(fill.closest('.sbar')).getPropertyValue('--p').trim();
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 90%',
      onEnter: () => { fill.style.width = pct + '%'; }
    });
  });
}

/* ════════════════════════════════════
   HINGE CARD — PROMPT CYCLING
════════════════════════════════════ */
function initHingeCard() {
  const prompts = document.querySelectorAll('.hinge-prompt');
  const dots    = document.querySelectorAll('.hdot');
  let current   = 0;

  function goTo(idx) {
    prompts[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    prompts[current].classList.add('active');
    dots[current].classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.to)));
  });

  setInterval(() => goTo((current + 1) % prompts.length), 3200);
}

/* ════════════════════════════════════
   3D TILT EFFECT
════════════════════════════════════ */
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left) / r.width  - 0.5;
      const y  = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `
        perspective(900px)
        rotateY(${x * 12}deg)
        rotateX(${-y * 10}deg)
        scale(1.02)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  });
}

/* ════════════════════════════════════
   HINGE CARD — 3D TILT
════════════════════════════════════ */
function initHingeTilt() {
  const card = document.getElementById('hingeCard');
  if (!card) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `
      perspective(1000px)
      rotateY(${x * 10}deg)
      rotateX(${-y * 8}deg)
      translateZ(8px)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  });
}

/* ════════════════════════════════════
   SCROLL-LINKED TEXT PARALLAX
════════════════════════════════════ */
function initParallax() {
  gsap.to('.hero-bg-word', {
    yPercent: 40,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', scrub: 1 }
  });
}

/* ════════════════════════════════════
   SECTION EYEBROW — counter anim for stats
════════════════════════════════════ */
function initCounters() {
  document.querySelectorAll('.a-val').forEach(el => {
    const raw = el.textContent.trim();
    const num = parseFloat(raw);
    if (isNaN(num)) return;
    const suffix = raw.replace(String(num), '');
    el.textContent = '0' + suffix;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: num,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: function() {
            const v = this.targets()[0].val;
            el.textContent = (Number.isInteger(num) ? Math.round(v) : v.toFixed(2)) + suffix;
          }
        });
      }
    });
  });
}

/* ════════════════════════════════════
   BOOT
════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initThreeJS();
  initHingeCard();
  initHingeTilt();
  initTilt();
  initReveals();
  initParallax();
  initCounters();
  runPreloader();
});
