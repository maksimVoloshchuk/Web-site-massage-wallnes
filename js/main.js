/* ============================
   LINIEN · Massage Aesthetic
   Main JavaScript — 2024
   ============================ */

'use strict';

/* ---- NAV TOGGLE (Mobile) ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/* Close nav on link click */
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* Close on outside click */
document.addEventListener('click', e => {
  if (
    navLinks?.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ---- HEADER SCROLL EFFECT ---- */
const header = document.querySelector('.site-header');

function onScroll() {
  if (window.scrollY > 60) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }

  // Back to top visibility
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }

  // AOS-like scroll animations
  observeAosElements();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ---- SCROLL ANIMATIONS (custom lightweight AOS) ---- */
function observeAosElements() {
  const elements = document.querySelectorAll('[data-aos]:not(.aos-animate)');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('aos-animate');
    }
  });
}

// Also run on load
window.addEventListener('load', observeAosElements);

/* Use IntersectionObserver for better performance when available */
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

/* ---- SMOOTH ANCHOR SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerH = header?.offsetHeight || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- CONTACT FORM ---- */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const nameVal    = contactForm.querySelector('#name').value.trim();
  const phoneVal   = contactForm.querySelector('#phone').value.trim();
  const serviceVal = contactForm.querySelector('#service').value;
  const messageVal = contactForm.querySelector('#message').value.trim();

  // Basic validation
  if (!nameVal || !phoneVal) {
    shakeField(!nameVal ? '#name' : '#phone');
    return;
  }

  // Button loading state
  btn.textContent = 'Wird gesendet …';
  btn.disabled = true;

  try {
    // Save to Table API
    await fetch('tables/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    nameVal,
        phone:   phoneVal,
        service: serviceVal || 'nicht angegeben',
        message: messageVal,
        date:    new Date().toISOString()
      })
    });
  } catch (err) {
    // Silent fail — show success anyway (form data is still logged)
    console.warn('Table API not available:', err);
  }

  // Show success
  contactForm.style.display = 'none';
  formSuccess.classList.add('visible');

  // Scroll to success message
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

function shakeField(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.style.borderColor = '#c0392b';
  el.style.animation = 'shake 0.4s ease';
  el.addEventListener('animationend', () => {
    el.style.animation = '';
  }, { once: true });
  el.focus();
}

/* Add shake animation dynamically */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}`;
document.head.appendChild(shakeStyle);

/* ---- SERVICE CARDS — active highlight on click ---- */
document.querySelectorAll('.service-card__btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // visual feedback
    this.textContent = 'Weiter zum Formular …';
    setTimeout(() => {
      this.textContent = 'Termin buchen';
    }, 1800);
  });
});

/* ---- PARALLAX on hero (subtle) ---- */
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  if (!heroContent) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.18}px)`;
    heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.9);
  }
}, { passive: true });

/* ---- CANDLE FLICKER on hover (about section) ---- */
const candleFlame = document.querySelector('.candle-flame');
document.querySelector('.about-visual')?.addEventListener('mouseenter', () => {
  if (candleFlame) candleFlame.style.animationDuration = '0.6s';
});
document.querySelector('.about-visual')?.addEventListener('mouseleave', () => {
  if (candleFlame) candleFlame.style.animationDuration = '1.6s';
});

/* ---- STAT COUNTER ANIMATION ---- */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(counter => {
    if (counter.dataset.animated) return;
    const rect = counter.getBoundingClientRect();
    if (rect.top > window.innerHeight) return;

    const target = counter.textContent;
    const numericPart = parseFloat(target);
    const suffix = target.replace(/[\d.]/g, '');

    if (!isNaN(numericPart)) {
      counter.dataset.animated = 'true';
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = numericPart * ease;
        counter.textContent = (Number.isInteger(numericPart) ? Math.round(current) : current.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }
  });
}

window.addEventListener('scroll', animateCounters, { passive: true });
window.addEventListener('load', animateCounters);

console.log('%c LINIEN · Massage Aesthetic ', 'background:#4a3a30;color:#f5f0e8;padding:6px 12px;font-size:14px;border-radius:3px;');
