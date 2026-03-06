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
