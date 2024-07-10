'use strict';

// modal
const drawerIcon = document.querySelector(".header__drawer-icon");
const modal = document.querySelector("#modal");
const modalList = document.querySelector(".modal__nav__list");

drawerIcon.addEventListener('click', function() {
  this.classList.toggle('is-open');
  modal.classList.toggle('is-open');
});

modalList.addEventListener('click', (e) => {
  console.log(e.target);
  if (!e.target.closest('.modal__nav__link')) return;
  drawerIcon.classList.remove('is-open');
  modal.classList.remove('is-open');
});

window.addEventListener('keydown', e => {
  if (!e.key === 'Escape') return;
  drawerIcon.classList.remove('is-open');
  modal.classList.remove('is-open');
});

// Works modal
const worksSwiper = document.querySelector(".works__swiper");
const worksModal = document.querySelector(".works__modal");

worksSwiper.addEventListener('click', e => {
  if (!e.target.classList.contains('works__slide__item__btn')) return;
  worksModal.classList.add('is-open');

  const dataNum = e.target.dataset.number;
  document.querySelector(`.works--${dataNum}`).classList.add('is-open');
});

worksModal.addEventListener('click', function(e) {
  if (e.target.classList.contains('works__modal') || e.target.classList.contains('works__modal__close-icon')) {
    document.querySelector(".works__modal__card.is-open").classList.add('is-close');
    document.querySelector(".works__modal__card.is-open").classList.remove('is-open');
    setTimeout(() => {
      worksModal.classList.remove('is-open');
      document.querySelector(".works__modal__card.is-close").classList.remove('is-close');
    }, 750);
  }
});

window.addEventListener('keydown', e => {
  if (!e.key === 'Escape') return;
  document.querySelector(".works__modal__card.is-open").classList.add('is-close');
  document.querySelector(".works__modal__card.is-open").classList.remove('is-open');
  setTimeout(() => {
    worksModal.classList.remove('is-open');
    document.querySelector(".works__modal__card.is-close").classList.remove('is-close');
  }, 750);
});




// Slider
const swiper = new Swiper('.works__swiper', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,
  slidesPerView: 1,
  // spaceBetween: 16,
  centeredSlides: true,
  autoplay: {
    delay: 200000,
    disableOnInteraction: false,
  },
  // breakpoints: {
  //   768: {
  //     spaceBetween: 32,
  //   },
  // },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// pagetop
jQuery(window).on('scroll', function() {
  if (jQuery(window).scrollTop() > 300) {
    jQuery('.pagetop').addClass('is-shown');
  } else {
    jQuery('.pagetop').removeClass('is-shown');
  }
});

// Reveal contents on scroll
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(
  revealSection,
  {
    root: null,
    threshold: 0.3,
  });
  document.querySelectorAll(".section").forEach(sec => {
    sectionObserver.observe(sec);
    sec.classList.add('section--hidden');
  });

  // Reveal Service
const revealService = (entries, observer) => {
  entries.forEach(entry => {
    entry.isIntersecting ? entry.target.classList.remove('service--hidden') : entry.target.classList.add('service--hidden');
  });
}

const serviceObserver = new IntersectionObserver(
  revealService,
  {
    root: null,
    threshold: 0.8,
  });

  const serviceList = document.querySelector(".service__list");
  serviceObserver.observe(serviceList);
  serviceList.classList.add('service--hidden');