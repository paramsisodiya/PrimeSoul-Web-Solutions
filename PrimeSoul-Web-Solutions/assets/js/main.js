'use strict';

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    const [s0, s1, s2] = hamburger.querySelectorAll('span');
    if (open) {
      s0.style.transform = 'rotate(45deg) translate(5px,5px)';
      s1.style.opacity = '0';
      s2.style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      [s0, s1, s2].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (!e.isIntersecting) return;
    const delay = parseFloat(e.target.dataset.delay || 0) * 1000;
    setTimeout(() => e.target.classList.add('visible'), delay);
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
  const siblings = [...(el.parentElement?.children || [])].filter(c =>
    c.classList.contains('reveal') || c.classList.contains('reveal-left') || c.classList.contains('reveal-right')
  );
  const idx = siblings.indexOf(el);
  if (idx > 0 && !el.dataset.delay) el.dataset.delay = (idx * 0.08).toFixed(2);
  revealObserver.observe(el);
});

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

/* ── FAQ TOGGLE ── */
document.querySelectorAll('details.faq-item').forEach(d => {
  d.addEventListener('toggle', () => {
    const icon = d.querySelector('summary i');
    if (icon) icon.className = d.open ? 'fas fa-minus' : 'fas fa-plus';
  });
});

/* ── PORTFOLIO FILTER ── */
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

console.log('%cPrimeSoul Web Solutions', 'color:#4a3fff;font-family:Syne,sans-serif;font-weight:800;font-size:16px;');
