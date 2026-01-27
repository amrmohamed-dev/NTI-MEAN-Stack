const cartItemsEl = document.querySelector('.cart__items');
const totalItemsEl = document.getElementById('total-items');
const totalPriceEl = document.getElementById('total-price');

let myCart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  cartItemsEl.innerHTML = '';

  if (myCart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty 🛒</p>';
    totalItemsEl.textContent = 0;
    totalPriceEl.textContent = 0;
    return;
  }

  const totalItems = myCart.reduce((sum, item) => sum + item.quantity, 0);
  totalItemsEl.textContent = totalItems;

  let totalPrice = 0;
  let completed = 0;

  myCart.forEach((item) => {
    fetchData(`${baseUrl}/${item.id}`, (product) => {
      totalPrice += product.price * item.quantity;

      cartItemsEl.innerHTML += `
              <div class="cart__item">
                <img src="${product.thumbnail}" />
                <div class="cart__info">
                  <h4>${product.title}</h4>
                  <p class="cart__price">$${product.price}</p>
        
                  <div class="cart__controls">
                    <button onclick="changeQty(${product.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${product.id}, 1)">+</button>
        
                    <button class="remove" onclick="removeItem(${product.id})">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            `;
      completed++;
      if (completed === myCart.length) {
        totalPriceEl.textContent = totalPrice.toFixed(2);
        updateCartCount();
      }
    });
  });

  localStorage.setItem('cart', JSON.stringify(myCart));
  updateCartCount();
}

function changeQty(id, amount) {
  const item = myCart.find((p) => p.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    removeItem(id);
  }
  renderCart();
}

function removeItem(id) {
  myCart = myCart.filter((p) => p.id !== id);
  localStorage.setItem('cart', JSON.stringify(myCart));

  renderCart();
}

renderCart();
