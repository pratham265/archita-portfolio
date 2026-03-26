/* ============================================
   SINGLE-PAGE SCROLL — Nav + Reveal
   ============================================ */

(function () {
  'use strict';

  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  sections.forEach(section => revealObserver.observe(section));

  /* ---------- Active nav link tracking ---------- */
  function updateActiveNav() {
    const offset = window.innerHeight * 0.35;
    let currentId = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < offset) {
        currentId = section.id;
      }
    });

    // Map section IDs to nav targets
    let activeNav = '';
    if (['hero', 'about'].includes(currentId)) activeNav = '#about';
    else if (['words', 'work'].includes(currentId)) activeNav = '#work';
    else if (['contact', 'connect-form'].includes(currentId)) activeNav = '#contact';

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === activeNav);
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateActiveNav(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  /* ---------- Smooth scroll for nav links ---------- */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Connect form ---------- */
  const form = document.getElementById('connectForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#connect-name').value;
      const email = form.querySelector('#connect-email').value;
      const message = form.querySelector('#connect-message').value;
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Archita,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
      window.location.href = `mailto:architadas1774@gmail.com?subject=${subject}&body=${body}`;

      const btn = form.querySelector('.connect-btn');
      btn.innerHTML = 'Opening Email ✓';
      setTimeout(() => {
        btn.innerHTML = 'Send Message <span class="btn-arrow">↗</span>';
        form.reset();
      }, 2500);
    });
  }

  /* ---------- Init ---------- */
  updateActiveNav();
  setTimeout(() => sections[0]?.classList.add('visible'), 50);
})();
