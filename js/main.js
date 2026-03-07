/* ============================================
   DJ LAROCA — main.js
   Versão: 1.1.0
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── CURSOR CUSTOMIZADO (apenas desktop) ──────────────────
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx - 6 + 'px';
      cursor.style.top  = my - 6 + 'px';
    });

    function animateRing() {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform     = 'scale(2)';
        cursorRing.style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform     = 'scale(1)';
        cursorRing.style.transform = 'scale(1)';
      });
    });
  }


  // ─── MENU HAMBURGUER (mobile) ──────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  // ─── NAV SCROLL ───────────────────────────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });


  // ─── PARALLAX NO GRID DO HERO ─────────────────────────────
  const gridLines = document.querySelector('.grid-lines');

  if (gridLines && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('scroll', () => {
      gridLines.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    });
  }


  // ─── SCROLL REVEAL (.reveal) ──────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


  // ─── TIMELINE (stagger) ───────────────────────────────────
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item').forEach((el) => timelineObserver.observe(el));


  // ─── STAGGER REVEAL (grids) ───────────────────────────────
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.estilo-card, .gallery-item, .video-item')
          .forEach((item, i) => setTimeout(() => item.classList.add('visible'), i * 120));
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.estilos-grid, .gallery-grid, .video-strip')
    .forEach((el) => staggerObserver.observe(el));

});


  // ─── MOSAICO DINÂMICO ─────────────────────────────────────
  const mosaicGrid   = document.getElementById('mosaicGrid');
  const TOTAL_FOTOS  = 84;
  const POSICOES     = 8;
  const FOTOS_PATH   = 'assets/images/galeria/';

  // Rotações alternadas para 8 posições
  const positions = [
    { rot: -10, zi: 3 },
    { rot:   7, zi: 2 },
    { rot:  -5, zi: 5 },
    { rot:   9, zi: 6 },
    { rot:  -7, zi: 4 },
    { rot:   6, zi: 5 },
    { rot:  -4, zi: 3 },
    { rot:  10, zi: 4 },
  ];

  // Distribui as 84 fotos entre as 9 posições
  function distribuirFotos() {
    const todos = Array.from({ length: TOTAL_FOTOS }, (_, i) =>
      `${FOTOS_PATH}foto-${String(i + 1).padStart(3, '0')}.jpg`
    );
    // Embaralha
    for (let i = todos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [todos[i], todos[j]] = [todos[j], todos[i]];
    }
    // Divide em grupos para cada posição
    const grupos = Array.from({ length: POSICOES }, () => []);
    todos.forEach((foto, i) => grupos[i % POSICOES].push(foto));
    return grupos;
  }

  // Monta o HTML do mosaico com posições definidas pelo JS
  function buildMosaic(grupos) {
    mosaicGrid.innerHTML = '';
    const containerW = mosaicGrid.offsetWidth || window.innerWidth;
    const isMobile   = window.innerWidth <= 768;

    grupos.forEach((fotos, posIdx) => {
      const item = document.createElement('div');
      item.className = 'mosaic-item';

      const p = positions[posIdx];
      item.style.transform = `rotate(${p.rot}deg)`;
      item.style.zIndex    = p.zi;

      const wrap = document.createElement('div');
      wrap.className = 'mosaic-img-wrap';

      fotos.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `DJ Laroca - foto ${posIdx + 1}`;
        if (i === 0) img.classList.add('active');
        wrap.appendChild(img);
      });

      item.appendChild(wrap);
      mosaicGrid.appendChild(item);
    });
  }

  // Troca as fotos automaticamente — cada posição em tempo diferente
  function startSlideshow(grupos) {
    const indices = new Array(POSICOES).fill(0);

    grupos.forEach((fotos, posIdx) => {
      if (fotos.length <= 1) return;

      // Intervalo diferente para cada posição (2.5s a 5s)
      const intervalo = 2500 + posIdx * 300;

      setInterval(() => {
        const wrap = mosaicGrid.children[posIdx]?.querySelector('.mosaic-img-wrap');
        if (!wrap) return;

        const imgs = wrap.querySelectorAll('img');
        imgs[indices[posIdx]].classList.remove('active');
        indices[posIdx] = (indices[posIdx] + 1) % fotos.length;
        imgs[indices[posIdx]].classList.add('active');
      }, intervalo);
    });
  }

  if (mosaicGrid) {
    const grupos = distribuirFotos();
    buildMosaic(grupos);
    startSlideshow(grupos);
  }

