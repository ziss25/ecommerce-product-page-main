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
    delay: 5000,
  },
});

// action btn product
const BTN__MINUS = document.querySelector('[btn-minus]');
const BTN__PLUS = document.querySelector('[btn-plus]');
const BTN__CART = document.querySelector('[btn-cart]');
const BTN__output = document.querySelector('[btn-output]');
// cart contain for item
const cartContain = document.querySelector('.modal-body__content');
const cartCountNotifaction = document.querySelector('.count-product-notificaton');
// console.log(cartCountNotifaction);
// data count sementara
let count = 0;
BTN__MINUS.addEventListener('click', () => {
  if (count === 0) return;
  count--;
  BTN__output.innerHTML = `<h3>${count}</h3>`;
});
BTN__PLUS.addEventListener('click', () => {
  count++;
  BTN__output.innerHTML = `<h3>${count}</h3>`;
});
BTN__CART.addEventListener('click', () => {
  // validasi jika jumlah nya 0;
  if (count === 0) return;
  Swal.fire({
    title: `${count}`,
    icon: 'question',
    confirmButtonText: 'success?',
  });

  const basePurchase = 125;
  const itemCheckOut = `
    <div class="modal-item">
      <div class="image-product">
        <img src="/images/image-product-4-thumbnail.jpg" alt="" srcset="" />
      </div>
      <div class="description-product">
        <p>Fall Limited Edition Sneakers $${basePurchase}.00 x ${count} <span>$${basePurchase * count}.00 </span></p>
      </div>
      <div class="icon-delete">
        <img src="/images/icon-delete.svg" alt="" />
      </div>
    </div> `;

  // element sebelumnya ditambah sama yg sekarang habis itu render semua nya
  cartContain.innerHTML += itemCheckOut;

  notificationProduct();
  removeElement();

  // total purchase keknya disini
  // ini hanya sementara jadi lanjut besok.....
  const tes = cartContain.children;
  let totalPurchase = 0;
  for (const key in tes) {
    if (Object.hasOwnProperty.call(tes, key)) {
      const element = tes[key];
      let total = element.children[1].children[0].children[0];
      const memisahkanMataUang = total.textContent.split('$');
      const memisahkanNol = memisahkanMataUang[1].split('.00');
      totalPurchase += parseInt(memisahkanNol[0]);
      // console.log(memisahkanNol);
    }
  }
  console.log(totalPurchase);
});

function notificationProduct() {
  const countProductItem = cartContain.children.length;
  cartCountNotifaction.textContent = countProductItem;
}

function removeElement() {
  const iconDeleteAll = document.querySelectorAll('.icon-delete');
  iconDeleteAll.forEach((item) => {
    item.addEventListener('click', () => {
      item.parentElement.remove();
      notificationProduct();
    });
  });
}

// lightbox
const lightboxClose = document.querySelector('[lightbox-close]');
const lightboxTheme = document.querySelector('.lightbox-theme');
const lightboxModal = document.querySelector('[lightbox-modal]');
const imagesContain = document.getElementById('lightbox-on');

// init swiper js for lighbox
let itemlightbox = new Swiper('.item-lightbox', {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
let tumbLightbox = new Swiper('.tumb-lightbox', {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: itemlightbox,
  },
});

// memunculkan dan menghilangkan component modal lightbox
function lighbox() {
  lightboxTheme.classList.toggle('none');
  lightboxModal.classList.toggle('none');
}

// pengecakan apakah width screen nya memenuhi apa tidak , kalo iya maka future nya tampil , kalo tidak maka fitur nya tidak ada
const currentWidth = screen.width;
const recomendedWidth = 1000;
if (currentWidth >= recomendedWidth) {
  imagesContain.addEventListener('click', lighbox);
  lightboxClose.addEventListener('click', lighbox);
}
