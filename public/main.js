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
const BTN__checkout = document.querySelector('.checkout');

// cart contain for item
const cartContain = document.querySelector('.modal-body__content');
const cartCountNotifaction = document.querySelector('.count-product-notificaton');

// data count sementara
let count = 0;

cartContain.innerHTML = emptyComponent();

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
    title: `success`,
    icon: 'success',
    confirmButtonText: 'barang udah ditambahkan di cart',
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

  // addDataToLocalStrogae(itemCheckOut);
  renderItems(itemCheckOut);
  removeEmptyComponent();
  notificationProduct();
  removeElement();
  getItems_and_getNumber();
});

BTN__checkout.addEventListener('click', () => {
  const priceTotal = getItems_and_getNumber();
  console.log(priceTotal);
});

function renderItems(itemCheckOut) {
  // render element items nya
  // element sebelumnya ditambah sama yg sekarang habis itu render semua nya
  cartContain.innerHTML += itemCheckOut;
}

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
      checkItemCart();
      getItems_and_getNumber();
    });
  });
}

function emptyComponent() {
  return `
  <p class = 'emptyComponent'>Your cart is empty</p>
  `;
}

function checkItemCart() {
  // pengecekan apakah cart-contain nya ada item nya apa tidak kalo ada maka next tapi kalo tidak ada render component empty
  if (cartContain.children.length === 0) {
    cartContain.innerHTML = emptyComponent();
  }
}

function removeEmptyComponent() {
  // function ini maksudnya hilangkan tag p sebelumnya karna default itemnya kosong maka kita harus hilangkan emptyComponent nya
  if (cartContain.children[0].nodeName == 'P') {
    cartContain.children[0].remove();
  }
}

function getItems_and_getNumber() {
  // total purchase keknya disini
  // untuk jaga" kalo semisal data totalPrice nya dibutuhkan
  const tes = cartContain.children;
  let totalPurchase = 0;
  let totalItemProduct = 0;
  for (const key in tes) {
    if (Object.hasOwnProperty.call(tes, key)) {
      // find jumlah item
      const element = tes[key];
      const e = element.children[1].children[0];
      const hasil = e.textContent.split('$');
      const num = hasil[1].split('.00')[1];
      const result = num.split('x')[1];
      totalItemProduct += parseInt(result);

      // find totalPrice
      let total = element.children[1].children[0].children[0];
      const memisahkanMataUang = total.textContent.split('$');
      const memisahkanNol = memisahkanMataUang[1].split('.00');
      totalPurchase += parseInt(memisahkanNol[0]);
    }
  }

  return [totalItemProduct, totalPurchase];
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

// from submit to google sheets
// pada saat checkout data result kita msukkan di google sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbzE5fW0SGs0jj1jzw4z1-AJ2jTb6suFJyaw9W27yDuuCeitqrLRYgt1859hfF0Lrkukyw/exec';

const form = document.forms['myForm'];
form.addEventListener('submit', (e) => {
  const [jumlahProduct, jumlahPrice] = getItems_and_getNumber();
  createToForm(jumlahProduct, jumlahPrice);
  console.log(form.children);
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'checkout berhasil',
        showConfirmButton: false,
        timer: 2000,
      });
      // reset kembali ke empty element
      cartContain.innerHTML = emptyComponent();
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });

  // find element yg selain btn lalu di hapus dari form nya karna data selanjutnya agar bisa dimasukkan lagi
  form.innerHTML = `<button type="submit" class="checkout">checkout</button>`;
  console.log(form.children);
});

function createToForm(jumlahProduct, jumlahPrice) {
  createElement('product', 'Sneakers');
  createElement('jumlah', `x${jumlahProduct}`);
  createElement('total', `$${jumlahPrice}.00`);
}

function createElement(id, value) {
  const node = document.createElement('input');
  node.setAttribute('name', id);
  node.setAttribute('value', value);
  node.setAttribute('type', 'text');
  node.setAttribute('class', 'none');
  form.appendChild(node);
}
