(function(){
  "use strict";

  /* Header scroll state */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if(toggle && navLinks){
    toggle.addEventListener('click', function(){
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Mobile services dropdown accordion */
  var dropdown = document.querySelector('.nav-dropdown');
  if(dropdown && window.matchMedia){
    var dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    if(dropdownToggle){
      dropdownToggle.addEventListener('click', function(e){
        if(window.innerWidth <= 960){
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  }

  /* Hero slider */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots button');
  if(slides.length > 1){
    var current = 0;
    var timer;
    function show(i){
      slides.forEach(function(s, idx){ s.classList.toggle('is-active', idx === i); });
      dots.forEach(function(d, idx){ d.classList.toggle('is-active', idx === i); });
      current = i;
    }
    function next(){ show((current + 1) % slides.length); }
    function startAuto(){ timer = setInterval(next, 6000); }
    function stopAuto(){ clearInterval(timer); }
    dots.forEach(function(d, idx){
      d.addEventListener('click', function(){ stopAuto(); show(idx); startAuto(); });
    });
    show(0);
    startAuto();
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  /* Footer year */
  var yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(function(el){ el.textContent = new Date().getFullYear(); });

})();
