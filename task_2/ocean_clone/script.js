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
