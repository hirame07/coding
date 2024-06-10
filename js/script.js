'use strict';


// modal
const pagetop = document.querySelector(".page-top");
const drawerIcon = document.querySelector(".drawer-icon");
  drawerIcon.addEventListener('click', function() {
    this.classList.toggle('is-open');
    document.querySelector("#modal").classList.toggle('is-open');
});

const modalMenu = document.querySelector(".modal__menu");
modalMenu.addEventListener('click', e => {
  if (!e.target.classList.contains('modal__link')) return;
  drawerIcon.classList.remove('is-open');
  document.querySelector("#modal").classList.remove('is-open');
});

// Campaign modal
document.querySelector(".campaign__items").addEventListener('click', e => {
  if (!e.target.closest('.campaign__box')) return;
  const targetNum = e.target.closest('.campaign__box').dataset.itemNum;
  const targetModal = document.querySelector(`.campaign__modal${targetNum}`);
  targetModal.classList.add('is-open');
  pagetop.classList.remove('is-show');
});

document.querySelectorAll(".campaign__modal__btn").forEach(btn => {
  btn.addEventListener("click", function() {
    this.closest('.campaign__modal__container').classList.remove('is-open');
    pagetop.classList.add('is-show');
  });
});

document.querySelectorAll(".campaign__modal__bg").forEach(bg => {
  bg.addEventListener("click", function() {
    this.closest('.campaign__modal__container').classList.remove('is-open');
    pagetop.classList.add('is-show');
  });
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll(".is-open").forEach(item => {
    item.classList.remove('is-open');
    pagetop.classList.add('is-show');
  });
});

// Pagetop button
$(window).on('scroll', function() {
  if ($(window).scrollTop() > 300) {
    $('.page-top').addClass('is-show');
  } else {
    $('.page-top').removeClass('is-show');
  }
});

// about swiper
const aboutSwiper = new Swiper(".about-swiper", {
  slidesPerView: 'auto',
  spaceBetween: 10,
  loop: true,
  centeredSlides: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: true,
  },
  speed: 2000,
});

// spots swiper
const spotsSwiper = new Swiper(".spots-swiper", {
  slidesPerView: 'auto',
  spaceBetween: 16,
  centeredSlides: true,
  loop: true,
  // autoplay: {
  //   delay: 2000,
  //   disableOnInteraction: false,
  // },
  breakpoints: {
    768: {
      spaceBetween: 32,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Accordion
class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector('summary');
    // Store the <div class="content"> element
    this.content = el.querySelector('.qa__answer');

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
    // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;
    
    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 200,
      easing: 'linear'
    });
    
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 200,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});

// Form 
const form = document.querySelector(".contact__form");

const displayError = (inputBox) => {
  inputBox.classList.add('is-invalid');
  if (!inputBox.classList.contains('contact__privacy__checkbox__input')) inputBox.closest('.contact__field').querySelector("label").style.color = '#CE2073';
  if (inputBox.tagName === 'SELECT') inputBox.closest('.select__container').style.setProperty('--icon-image','url(../img/contact-select-icon-red.webp)');
}


form.addEventListener('focusout', e => {
  if (!(e.target.tagName === 'INPUT' ||  e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA')) return;
  if (e.target.classList.contains('btn')) return;
  if (!e.target.checkValidity()) {
    displayError(e.target);
  } else {
    e.target.classList.remove('is-invalid');
    if (!e.target.classList.contains('contact__privacy__checkbox__input')) e.target.closest('.contact__field').querySelector("label").style.color = '#4A3636';
    if (e.target.tagName === 'SELECT') e.target.closest('.select__container').style.setProperty('--icon-image','url(../img/contact-select-icon.svg)');
  }
});

const selectBox = document.querySelector(".contact__select");
const textArea = document.querySelector(".contact__textarea");
const formBtn = document.querySelector("#form-btn");

formBtn.addEventListener('click', e => {
  // e.preventDefault();
  document.querySelectorAll("input").forEach(input => {
    if (!input.checkValidity()) displayError(input);
  });

  if (!selectBox.checkValidity()) displayError(selectBox);
  
  if (!textArea.checkValidity()) displayError(textArea);
});

const displayAlert = function() {
  alert('Successfully submitted!');
}