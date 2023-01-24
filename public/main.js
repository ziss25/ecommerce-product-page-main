// menu action
const menu = document.querySelector('.hamb-icon');
const asside = document.querySelector('.nav-mobile');
const close = document.querySelector('.close');
menu.addEventListener('click', () => {
  asside.classList.add('end');
});
close.addEventListener('click', () => {
  asside.classList.remove('end');
});

// cart action
//dan urusan parent position nya udah di urus di css... karna css memiliki media query maka sangat gampang manipulasi lewat sana berdasarkan lebar layar tertentu
const cart = document.querySelector('[cart]');
const modal_cart = document.querySelector('[modal-cart]');
cart.addEventListener('click', () => {
  modal_cart.classList.toggle('none');
});

// swipe js
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

var swiper = new Swiper('.mySwiper-item', {
  // loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

// ini tumb nya
var swiper2 = new Swiper('.mySwiper-tumb', {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: swiper,
  },
  autoplay: {
    delay: 3000,
  },
});

console.log(swiper2);
