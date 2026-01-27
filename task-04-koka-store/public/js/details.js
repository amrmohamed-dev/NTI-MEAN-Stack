const searchParams = new URLSearchParams(location.search);
let id = +searchParams.get('id') || 1;

let quantity = 1;
let cartCount = 0;

const qtyEl = document.getElementById('quantity');
const cartBtn = document.getElementById('add-to-cart');
const incBtn = document.getElementById('increase');
const decBtn = document.getElementById('decrease');

function handleImages(imgs) {
  const productGallery = document.querySelector('.product__gallery');

  productGallery.innerHTML = `
    <img class="main-img" src="${imgs[0]}" />
    <div class="thumbs">
      ${imgs.map((img) => `<img class="thumb" src="${img}">`).join('')}
    </div>
  `;

  const mainImg = productGallery.querySelector('.main-img');
  const thumbs = productGallery.querySelectorAll('.thumb');

  thumbs[0].classList.add('active');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImg.src = thumb.src;
    });
  });
}

incBtn.addEventListener('click', () => {
  quantity++;
  qtyEl.textContent = quantity;
});

decBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    qtyEl.textContent = quantity;
  }
});

cartBtn.addEventListener('click', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({
      id: id,
      quantity: quantity
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount(); 

  quantity = 1;
  qtyEl.textContent = quantity;
});



fetchData(`${baseUrl}/${id}`, (response) => {
  const productInfo = document.querySelector('.product__info');

  handleImages(response.images);

  productInfo.querySelector('#product-title').textContent = response.title;
  productInfo.querySelector('#product-brand').textContent = response.brand;
  productInfo.querySelector('#product-rating').textContent = `(${response.rating})`;
  productInfo.querySelector('#product-price').textContent = response.price;

  document.getElementById('product-desc').textContent = response.description;

  renderReviews(response.reviews);
});

function renderReviews(reviews) {
  const reviewsSection = document.querySelector('.product__reviews');

  if (!reviews || reviews.length === 0) {
    reviewsSection.innerHTML += `<p class="no-reviews">No reviews yet</p>`;
    return;
  }

  const reviewsHTML = reviews
    .map(
      (r) => `
      <div class="review">
        <div class="review__name">${r.reviewerName}</div>
        <div class="review__rating">
          ${'⭐'.repeat(Math.round(r.rating))}
        </div>
        <div class="review__comment">${r.comment}</div>
      </div>
    `,
    )
    .join('');

  reviewsSection.innerHTML += reviewsHTML;
}
