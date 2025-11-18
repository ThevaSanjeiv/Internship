const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

function isMobile() {
  return window.innerWidth <= 750;
}

function closeAllDropdowns() {
  dropdowns.forEach(d => d.classList.remove('open'));
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      navMenu.classList.remove('open');
      closeAllDropdowns();
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });
  }

  dropdowns.forEach(drop => {
    const btn = drop.querySelector('.drop-toggle');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdowns.forEach(d => {
        if (d !== drop) d.classList.remove('open');
      });
      drop.classList.toggle('open');
    });
  });

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!navMenu.contains(t) && !navToggle.contains(t)) {
      navMenu.classList.remove('open');
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navMenu.classList.remove('open');
      closeAllDropdowns();
    }
  });
});
