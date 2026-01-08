const showToast = (message, firstColor, secondColor) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor: `linear-gradient(to right, ${firstColor}, ${secondColor})`,
  }).showToast();
};

let user = null;
let pass = null;

const loginModal = document.getElementById('loginModal');
const logoutBtn = document.getElementById('logoutBtn');

const userInput = document.getElementById('loginUser');
const passInput = document.getElementById('loginPass');

function openLogin() {
  loginModal.style.display = 'flex';
  logoutBtn.style.display = 'none';
}

function handleLogin() {
  const u = userInput.value.trim();
  const p = passInput.value.trim();

  if (u !== 'amr' || p !== '123') {
    return showToast('Invalid username or password', '#ff5f6d', '#ffc371');
  }

  user = u;
  pass = p;

  localStorage.setItem('username', user);

  document.getElementById('welcomeMsg').textContent = `Welcome, ${user} 👋`;

  loginModal.style.display = 'none';
  logoutBtn.style.display = 'inline-block';

  showToast('Logged in successfully', '#00b09b', '#96c93d');
}

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('cart');
  localStorage.removeItem('queue');
  user = null;
  pass = null;

  showToast('Logged out', '#ff5f6d', '#ffc371');

  setTimeout(() => {
    location.reload();
  }, 1100);
}

function checkLog() {
  if (!user) {
    openLogin();
    showToast('Please login first', '#ff5f6d', '#ffc371');
    return false;
  }
  return true;
}

const undoBtn = document.getElementById('undoBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const prodDiv = document.getElementById('prod');
const cartDiv = document.getElementById('cart');
const queueDiv = document.getElementById('queue');
const totalPriceEl = document.getElementById('totalPrice');
const countEl = document.getElementById('count');

const prods = [
  { name: 'Phone', price: 7000 },
  { name: 'Laptop', price: 12000 },
  { name: 'Smart Watch', price: 900 },
  { name: 'Hand Bag', price: 600 },
  { name: 'Mobile Charger', price: 100 },
  { name: 'T-Shirt', price: 350 },
];

let cart = [];
let queue = [];

function loadData() {
  try {
    user = localStorage.getItem('username');
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    queue = JSON.parse(localStorage.getItem('queue')) || [];
  } catch {
    user = null;
    cart = [];
    queue = [];
  }
}

function saveData() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('queue', JSON.stringify(queue));
  } catch {}
}

function countTime() {
  let count = Number(countEl.textContent);
  const timer = setInterval(() => {
    if (count > 0) {
      count--;
      countEl.textContent = count;
    } else clearInterval(timer);
  }, 1000);
}
countTime();

let rows = '<ol>';
for (let i = 0; i < prods.length; i++) {
  rows += `
    <li>
      Name: ${prods[i].name}, Price: ${prods[i].price}
      <button id="buy-btn-${i}" onclick="buy(${i})">Buy</button>
    </li>`;
}
rows += '</ol>';
prodDiv.innerHTML = rows;

function isDuplicate(product) {
  return (
    cart.some((p) => p.name === product.name) ||
    queue.some((p) => p.name === product.name)
  );
}

function updateBuyButtons() {
  prods.forEach((p, i) => {
    const btn = document.getElementById(`buy-btn-${i}`);
    if (!btn) return;

    if (isDuplicate(p)) {
      btn.disabled = true;
      btn.textContent = 'Added';
    } else {
      btn.disabled = false;
      btn.textContent = 'Buy';
    }
  });
}

function buy(index) {
  if (!checkLog()) return;

  const product = prods[index];

  if (isDuplicate(product)) {
    showToast('This product already exists', '#ff5f6d', '#ffc371');
    return;
  }

  if (cart.length >= 3) {
    queue.push(product);
    showToast('Cart is full — item added to Queue', '#00b09b', '#96c93d');
  } else {
    cart.push(product);
    showToast('Product added to Cart', '#00b09b', '#96c93d');
  }

  updateCartQueue();
}

function undo() {
  if (!checkLog()) return;

  if (cart.length === 0) {
    showToast('Cart is already empty', '#ff5f6d', '#ffc371');
    return;
  }

  cart.pop();

  if (queue.length > 0) {
    cart.push(queue.shift());
  }

  showToast('Undo successful', '#00b09b', '#96c93d');
  updateCartQueue();
}

function checkout() {
  if (!checkLog()) return;

  if (cart.length === 0) {
    showToast('Cart is empty — nothing to checkout', '#ff5f6d', '#ffc371');
    return;
  }

  const total = cart.reduce((s, p) => s + p.price, 0);

  const ok = confirm(
    `Checkout:\n\n${cart
      .map((p) => `• ${p.name} — ${p.price}`)
      .join('\n')}\n\nTotal = ${total}\n\nConfirm checkout?`
  );

  if (!ok) return;

  cart = [];

  while (cart.length < 3 && queue.length > 0) {
    cart.push(queue.shift());
  }

  showToast('Order completed', '#00b09b', '#96c93d');
  updateCartQueue();
}

function updateCartQueue() {
  undoBtn.disabled = cart.length === 0;
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;

  cartDiv.innerHTML = showLst('cart', cart);
  queueDiv.innerHTML = showLst('queue', queue);

  const total = cart.reduce((s, p) => s + p.price, 0);
  totalPriceEl.textContent = `Total: ${total}`;

  saveData();
  updateBuyButtons();
}

function showLst(type, lst) {
  let rows = '<ul>';
  if (type === 'cart') {
    for (let i = lst.length - 1; i >= 0; i--)
      rows += `<li>${lst[i].name} — ${lst[i].price}</li>`;
  } else {
    for (let i = 0; i < lst.length; i++)
      rows += `<li>${lst[i].name} — ${lst[i].price}</li>`;
  }
  rows += '</ul>';
  return rows;
}

loadData();
updateCartQueue();

if (user) {
  document.getElementById(
    'welcomeMsg'
  ).textContent = `Welcome back, ${user} 👋`;
  loginModal.style.display = 'none';
  logoutBtn.style.display = 'inline-block';
} else {
  openLogin();
}
