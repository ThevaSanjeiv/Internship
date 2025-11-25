// script.js
const navToggle = document.getElementById('nav-toggle')
const drawer = document.getElementById('drawer') || document.querySelector('.drawer')
const drawerClose = document.getElementById('drawer-close') || document.querySelector('.drawer-close')
const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu')
const dropdowns = document.querySelectorAll('.dropdown')
const drawerDropdowns = document.querySelectorAll('.drawer-dropdown')

function isMobile(){ return window.innerWidth <= 750 }

function closeAllDropdowns(){
  dropdowns.forEach(d => d.classList.remove('open'))
  drawerDropdowns.forEach(d => d.classList.remove('open'))
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', () => {
    if (!isMobile()){
      if (drawer) drawer.classList.remove('open')
      if (navMenu) navMenu.setAttribute('aria-hidden','false')
      if (navToggle) navToggle.setAttribute('aria-expanded','false')
      closeAllDropdowns()
    } else {
      if (navMenu) navMenu.setAttribute('aria-hidden','true')
    }
  })

  if (navToggle && drawer){
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation()
      const willOpen = !drawer.classList.contains('open')
      drawer.classList.toggle('open')
      drawer.setAttribute('aria-hidden', String(!willOpen))
      navToggle.setAttribute('aria-expanded', String(willOpen))
    })
  }

  if (drawerClose && drawer){
    drawerClose.addEventListener('click', (e) => {
      e.stopPropagation()
      drawer.classList.remove('open')
      drawer.setAttribute('aria-hidden','true')
      if (navToggle) navToggle.setAttribute('aria-expanded','false')
      closeAllDropdowns()
    })
  }

  dropdowns.forEach(drop => {
    const btn = drop.querySelector('.drop-toggle')
    if (!btn) return
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const isOpen = drop.classList.toggle('open')
      btn.setAttribute('aria-expanded', String(isOpen))
      dropdowns.forEach(d => { if (d !== drop) d.classList.remove('open') })
    })
  })

  drawerDropdowns.forEach(dd => {
    const btn = dd.querySelector('.drawer-drop-toggle')
    if (!btn) return
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      dd.classList.toggle('open')
    })
  })

  document.addEventListener('click', (e) => {
    const t = e.target
    if (drawer && !drawer.contains(t) && navToggle && !navToggle.contains(t)){
      drawer.classList.remove('open')
      drawer.setAttribute('aria-hidden','true')
      if (navToggle) navToggle.setAttribute('aria-expanded','false')
      closeAllDropdowns()
    }
    if (navMenu && !isMobile() && !navMenu.contains(t)){
      dropdowns.forEach(d => d.classList.remove('open'))
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      if (drawer) drawer.classList.remove('open')
      if (drawer) drawer.setAttribute('aria-hidden','true')
      if (navToggle) navToggle.setAttribute('aria-expanded','false')
      closeAllDropdowns()
    }
  })

  (function(){
    const navbar = document.querySelector('.navbar')
    if (!navbar) return
    const onScroll = () => {
      if (window.scrollY > 8) navbar.classList.add('scrolled')
      else navbar.classList.remove('scrolled')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, {passive:true})
  })()
})

// script.js
// document.addEventListener('DOMContentLoaded', function(){
//   var desktopPills = Array.from(document.querySelectorAll('.course-filters .course-pill'));
//   var mobileItems = Array.from(document.querySelectorAll('.mobile-list .mobile-item'));
//   var toggle = document.querySelector('.filters-toggle');
//   var dropdown = document.getElementById('mobile-dropdown');
//   var toggleLabel = document.querySelector('.filters-toggle .toggle-label');

//   function setActiveByKey(key){
//     desktopPills.forEach(function(p){ p.classList.toggle('active', p.dataset.key === key) });
//     mobileItems.forEach(function(m){ m.classList.toggle('active', m.dataset.key === key) });
//     if(toggleLabel) toggleLabel.textContent = key;
//   }

//   desktopPills.forEach(function(p){
//     p.addEventListener('click', function(){
//       var key = p.dataset.key;
//       setActiveByKey(key);
//     });
//   });

//   mobileItems.forEach(function(m){
//     m.addEventListener('click', function(e){
//       var key = m.dataset.key;
//       setActiveByKey(key);
//       closeDropdown();
//     });
//   });

//   function openDropdown(){
//     dropdown.classList.add('show');
//     dropdown.setAttribute('aria-hidden','false');
//     toggle.setAttribute('aria-expanded','true');
//   }
//   function closeDropdown(){
//     dropdown.classList.remove('show');
//     dropdown.setAttribute('aria-hidden','true');
//     toggle.setAttribute('aria-expanded','false');
//   }
//   function toggleDropdown(){
//     if(dropdown.classList.contains('show')) closeDropdown(); else openDropdown();
//   }

//   if(toggle){
//     toggle.addEventListener('click', function(e){
//       e.stopPropagation();
//       toggleDropdown();
//     });
//   }

//   document.addEventListener('click', function(e){
//     if(!dropdown.contains(e.target) && !toggle.contains(e.target)) closeDropdown();
//   });

//   document.addEventListener('keydown', function(e){
//     if(e.key === 'Escape') closeDropdown();
//   });
// });
    

// document.addEventListener('DOMContentLoaded', function(){
//   var desktopPills = Array.from(document.querySelectorAll('.course-filters .course-pill'));
//   var mobileItems = Array.from(document.querySelectorAll('.mobile-list .mobile-item'));
//   var toggle = document.querySelector('.filters-toggle');
//   var dropdown = document.getElementById('mobile-dropdown');
//   var toggleLabel = document.querySelector('.filters-toggle .toggle-label');

//   function setActiveByKey(key){
//     desktopPills.forEach(function(p){ p.classList.toggle('active', p.dataset.key === key) });
//     mobileItems.forEach(function(m){ m.classList.toggle('active', m.dataset.key === key) });
//     if(toggleLabel) toggleLabel.textContent = key;
//   }

//   desktopPills.forEach(function(p){
//     p.addEventListener('click', function(){
//       var key = p.dataset.key;
//       setActiveByKey(key);
//     });
//   });

//   mobileItems.forEach(function(m){
//     m.addEventListener('click', function(e){
//       var key = m.dataset.key;
//       setActiveByKey(key);
//       closeDropdown();
//     });
//   });

//   function openDropdown(){
//     dropdown.classList.add('show');
//     dropdown.setAttribute('aria-hidden','false');
//     toggle.setAttribute('aria-expanded','true');
//   }
//   function closeDropdown(){
//     dropdown.classList.remove('show');
//     dropdown.setAttribute('aria-hidden','true');
//     toggle.setAttribute('aria-expanded','false');
//   }
//   function toggleDropdown(){
//     if(dropdown.classList.contains('show')) closeDropdown(); else openDropdown();
//   }

//   if(toggle){
//     toggle.addEventListener('click', function(e){
//       e.stopPropagation();
//       toggleDropdown();
//     });
//   }

//   document.addEventListener('click', function(e){
//     if(!dropdown.contains(e.target) && !toggle.contains(e.target)) closeDropdown();
//   });

//   document.addEventListener('keydown', function(e){
//     if(e.key === 'Escape') closeDropdown();
//   });
// });

// // course 
// const COURSES = [
//   {
//     id: 'py-full',
//     title: 'Python Fullstack',
//     img: 'https://firebasestorage.googleapis.com/v0/b/oceanlivereact.appspot.com/o/OA-Live-Admin%2FcourseImage%2FPython%20fullstack.png?alt=media&token=4c85a13a-6c19-4b4d-b517-e424ef6611f1',
//     desc: 'The Full Stack Web Development with Python & Django course is a comprehensive, hands-on training program designed to take you from a beginner to a professional full-stack web developer.',
//     tags: ['MongoDB','Python'],
//     duration: '6 Months',
//     seats: '1500',
//     price: '₹32,000',
//     categories: ['Fullstack','Most popular']
//   },
//   {
//     id: 'java-full',
//     title: 'Java Fullstack',
//     img: 'https://storage.googleapis.com/oceanlivereact.appspot.com/OA-Live-Admin/courseImage/1761297355210_Java%20fullstack.png',
//     desc: 'The Full Stack Java Developer Program is a career-ready training that takes you from the basics of web technologies to advanced Java Enterprise Development.',
//     tags: ['Sass','Mysql'],
//     duration: '6 Months',
//     seats: '3000',
//     price: '₹36,000',
//     categories: ['Fullstack']
//   },
//   {
//     id: 'mern',
//     title: 'MERNSTACK',
//     img: 'https://storage.googleapis.com/oceanlivereact.appspot.com/OA-Live-Admin/courseImage/1761397931328_MERN%20STACK.png',
//     desc: 'The MERN Stack is a full-stack JavaScript framework for building dynamic web applications.',
//     tags: ['Css','Express js'],
//     duration: '6 Months',
//     seats: '2000',
//     price: '₹32,000',
//     categories: ['Fullstack','Most popular']
//   },
//   {
//     id: 'data-analytics',
//     title: 'Data Analytics',
//     img: 'https://firebasestorage.googleapis.com/v0/b/oceanlivereact.appspot.com/o/OA-Live-Admin%2FcourseImage%2FDATA%20ANALYTICS.png?alt=media&token=366be502-8346-43eb-ac4d-ce01cfda9fc8',
//     desc: 'The Data Analytics Master Program is a career-oriented, hands-on training designed to help you become a professional Data Analyst from scratch.',
//     tags: ['MongoDB','Pandas'],
//     duration: '6 Months',
//     seats: '500',
//     price: '₹36,000',
//     categories: ['Data, AI & Cloud']
//   },
//   {
//     id: 'data-science',
//     title: 'Data Science',
//     img: 'https://firebasestorage.googleapis.com/v0/b/oceanlivereact.appspot.com/o/OA-Live-Admin%2FcourseImage%2FDATA%20SCIENCE.png?alt=media&token=856e9837-fb9f-4444-847c-42f7a1adcdcd',
//     desc: 'The Data Science & Artificial Intelligence Master Program is a comprehensive, project-driven training.',
//     tags: ['Excel','Pandas'],
//     duration: '8 Months',
//     seats: '50',
//     price: '₹80,000',
//     categories: ['Data, AI & Cloud']
//   },
//   {
//     id: 'mean',
//     title: 'MEANSTACK',
//     img: 'https://storage.googleapis.com/oceanlivereact.appspot.com/OA-Live-Admin/courseImage/1762149332553_MEANSTACK.png',
//     desc: 'The MEAN Stack Development Course is a comprehensive, hands-on training program designed to help you master both front-end and back-end using JavaScript.',
//     tags: ['Angular','Node js'],
//     duration: '6 Months',
//     seats: '1500',
//     price: '₹32,000',
//     categories: ['Fullstack']
//   },
//   {
//     id: 'adv-java',
//     title: 'Advanced Java Fullstack',
//     img: 'https://firebasestorage.googleapis.com/v0/b/oceanlivereact.appspot.com/o/OA-Live-Admin%2FcourseImage%2F1761383426355_Java.png?alt=media',
//     desc: 'The Advanced Full Stack Java Developer Program is a career-oriented training designed to help learners master both backend and frontend technologies using Java.',
//     tags: ['Docker','Css'],
//     duration: '7 Months',
//     seats: '2000',
//     price: '₹44,000',
//     categories: ['Fullstack']
//   },
//   {
//     id: 'frontend',
//     title: 'Front End Development',
//     img: 'https://firebasestorage.googleapis.com/v0/b/oceanlivereact.appspot.com/o/OA-Live-Admin%2FcourseImage%2FFRONT%20END%20DEVELOPMENT.png?alt=media&token=f84419a4-fbd6-407c-a317-28db78d1fa3c',
//     desc: 'Complete hands-on course designed to help learners master the core building blocks of the web — HTML, CSS, and JavaScript.',
//     tags: ['Sass','Bootstrap'],
//     duration: '3 Months',
//     seats: '1500',
//     price: '₹16,000',
//     categories: ['Frontend']
//   },
//   {
//     id: 'powerbi',
//     title: 'Power BI',
//     img: 'https://firebasestorage.googleapis.com/v0/b/oceanlivereact.appspot.com/o/OA-Live-Admin%2FcourseImage%2Fpowerbi_cover.png?alt=media&token=c35727af-e0ef-4497-9a5d-276f58b11b51',
//     desc: 'Professional Power BI Data Analytics Course to master data visualization, modeling, and reporting using Power BI Desktop and Service.',
//     tags: ['Power BI Desktop'],
//     duration: '2 Months',
//     seats: '500',
//     price: '₹16,000',
//     categories: ['Data, AI & Cloud']
//   }
// ];


// const track = document.querySelector('.cards-track');
// const prevBtn = document.querySelector('.carousel-controls .prev');
// const nextBtn = document.querySelector('.carousel-controls .next');

// let filteredCourses = COURSES.slice();
// let currentIndex = 0;    
// let cardsPerPage = 3;   
// let gap = 28;            

// function createCard(course) {
//   const c = document.createElement('article');
//   c.className = 'course-card';
//   c.setAttribute('data-id', course.id);

//   const top = document.createElement('div');
//   top.className = 'card-top';
//   top.style.backgroundImage = `url("${course.img}")`;

//   const body = document.createElement('div');
//   body.className = 'card-body';

//   const title = document.createElement('h3');
//   title.textContent = course.title;

//   const desc = document.createElement('p');
//   desc.className = 'desc';
//   desc.textContent = course.desc;

//   const badges = document.createElement('div');
//   badges.className = 'badges';
//   (course.tags || []).slice(0,3).forEach(t => {
//     const b = document.createElement('span');
//     b.className = 'badge';
//     b.textContent = t;
//     badges.appendChild(b);
//   });
//   if ((course.tags||[]).length > 3) {
//     const more = document.createElement('span');
//     more.className='badge';
//     more.textContent = `+${(course.tags||[]).length - 3} more`;
//     badges.appendChild(more);
//   }

//   const info = document.createElement('div');
//   info.className = 'info-row';
//   info.innerHTML = `<span>⏱ ${course.duration}</span><span>👥 ${course.seats}</span>`;

//   const priceRow = document.createElement('div');
//   priceRow.className = 'price-row';
//   const price = document.createElement('div');
//   price.className = 'price';
//   price.textContent = course.price;
//   const btn = document.createElement('button');
//   btn.className = 'enroll-btn';
//   btn.textContent = 'Enroll Now →';
  

//   priceRow.appendChild(price);
//   priceRow.appendChild(btn);

//   body.appendChild(title);
//   body.appendChild(desc);
//   body.appendChild(badges);
//   body.appendChild(info);
//   body.appendChild(priceRow);

//   c.appendChild(top);
//   c.appendChild(body);
//   return c;
// }

// function renderCards() {
//   track.innerHTML = '';
//   filteredCourses.forEach(course => {
//     track.appendChild(createCard(course));
//   });

//   // reset indices & transform
//   currentIndex = 0;
//   updateButtons();
//   moveToIndex(0, true);
//   // after render, recompute pages
//   computeLayout();
// }

// /* Compute cards per page based on container width & card width */
// function computeLayout() {
//   const carousel = document.querySelector('.courses-carousel');
//   const trackChildren = track.children;
//   if (!trackChildren.length) return;

//   // measure first card width (including margin/gap)
//   const card = trackChildren[0];
//   const cardStyle = getComputedStyle(card);
//   const cardWidth = card.getBoundingClientRect().width;
//   // gap read from container style (fallback to JS constant)
//   const trackStyle = getComputedStyle(track);
//   let g = gap;
//   // attempt to parse gap if present
//   const gapVal = trackStyle.gap || trackStyle.columnGap || trackStyle['grid-gap'];
//   if (gapVal) {
//     const parsed = parseFloat(gapVal);
//     if (!isNaN(parsed)) g = parsed;
//   }
//   gap = g;

//   const containerW = carousel.getBoundingClientRect().width;
//   const possible = Math.floor((containerW + gap) / (cardWidth + gap));
//   cardsPerPage = Math.max(1, possible);
//   // ensure current index within bounds
//   const maxPage = Math.max(0, Math.ceil(filteredCourses.length / cardsPerPage) - 1);
//   currentIndex = Math.min(currentIndex, maxPage);
//   moveToIndex(currentIndex, true);
//   updateButtons();
// }

// function moveToIndex(index, instant=false) {
//   const children = track.children;
//   if (!children.length) return;
//   const card = children[0];
//   const cardW = card.getBoundingClientRect().width;
//   const translateX = index * (cardW + gap) * cardsPerPage;
//   if (instant) {
//     track.style.transition = 'none';
//     track.style.transform = `translateX(-${translateX}px)`;
//     // restore transition
//     requestAnimationFrame(() => {
//       track.style.transition = '';
//     });
//   } else {
//     track.style.transform = `translateX(-${translateX}px)`;
//   }
//   currentIndex = index;
//   updateButtons();
// }

// /* Arrow click moves one page right/left */
// prevBtn.addEventListener('click', () => {
//   if (prevBtn.disabled) return;
//   const maxPage = Math.max(0, Math.ceil(filteredCourses.length / cardsPerPage) - 1);
//   const nextIndex = Math.max(0, currentIndex - 1);
//   moveToIndex(nextIndex);
// });
// nextBtn.addEventListener('click', () => {
//   if (nextBtn.disabled) return;
//   const maxPage = Math.max(0, Math.ceil(filteredCourses.length / cardsPerPage) - 1);
//   const nextIndex = Math.min(maxPage, currentIndex + 1);
//   moveToIndex(nextIndex);
// });

// function updateButtons() {
//   const maxPage = Math.max(0, Math.ceil(filteredCourses.length / cardsPerPage) - 1);
//   prevBtn.disabled = currentIndex <= 0;
//   nextBtn.disabled = currentIndex >= maxPage;
// }

// /* ---------- Filters (desktop pills + mobile list) ---------- */
// const pillButtons = document.querySelectorAll('.course-pill');
// const mobileToggle = document.querySelector('.filters-toggle');
// const mobileDropdown = document.getElementById('mobile-dropdown');
// const mobileItems = document.querySelectorAll('.mobile-item');

// pillButtons.forEach(b => {
//   b.addEventListener('click', (ev) => {
//     pillButtons.forEach(x => x.classList.remove('active'));
//     b.classList.add('active');
//     // sync mobile label
//     const label = document.querySelector('.filters-toggle .toggle-label');
//     if (label) label.textContent = b.textContent;
//     applyFilter(b.dataset.key);
//   });
// });

// mobileItems.forEach(mi => {
//   mi.addEventListener('click', () => {
//     mobileItems.forEach(x => x.classList.remove('active'));
//     mi.classList.add('active');
//     // sync desktop pill
//     pillButtons.forEach(p => {
//       if (p.dataset.key === mi.dataset.key) {
//         pillButtons.forEach(x => x.classList.remove('active'));
//         p.classList.add('active');
//       }
//     });
//     const label = document.querySelector('.filters-toggle .toggle-label');
//     if (label) label.textContent = mi.textContent;
//     mobileDropdown.setAttribute('aria-hidden', 'true');
//     document.querySelector('.filters-toggle').setAttribute('aria-expanded', 'false');
//     applyFilter(mi.dataset.key);
//   });
// });

// if (mobileToggle) {
//   mobileToggle.addEventListener('click', () => {
//     const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
//     mobileToggle.setAttribute('aria-expanded', String(!expanded));
//     mobileDropdown.setAttribute('aria-hidden', String(expanded));
//   });
// }

// function applyFilter(key) {
//   if (!key || key === 'All') {
//     filteredCourses = COURSES.slice();
//   } else {
//     filteredCourses = COURSES.filter(c => (c.categories || []).includes(key));
//   }
//   renderCards();
// }

// /* ---------- Initialize ---------- */
// window.addEventListener('resize', () => {
//   computeLayout();
// });

// renderCards(); // initial render
// computeLayout();