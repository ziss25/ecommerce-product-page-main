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
