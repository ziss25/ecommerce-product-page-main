const menu = document.querySelector('.hamb-icon');
const asside = document.querySelector('.nav-mobile');
const close = document.querySelector('.close');
menu.addEventListener('click', () => {
  asside.classList.add('end');
});
close.addEventListener('click', () => {
  asside.classList.remove('end');
});
