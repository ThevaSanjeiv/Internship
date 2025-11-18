const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
});

dropdowns.forEach(drop => {
    const btn = drop.querySelector('.drop-toggle');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdowns.forEach(d => {
            if (d !== drop) d.classList.remove('open');
        });
        drop.classList.toggle('open');
    });
});
document.addEventListener('click', () => {
    navMenu.classList.remove('open');
    dropdowns.forEach(d => d.classList.remove('open'));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('open');
        dropdowns.forEach(d => d.classList.remove('open'));
    }
});
