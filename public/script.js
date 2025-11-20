// Load cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(tire) {
  let cart = getCart();
  const existing = cart.find(item => item.id === tire.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...tire, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
  alert('Added to cart!');
}

function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  location.reload();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

function loadCart() {
  const cart = getCart();
  const tbody = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  let total = 0;

  if (cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">Your cart is empty</td></tr>';
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    tbody.innerHTML += `
      <tr>
        <td><img src="${item.image}" width="80"></td>
        <td>${item.brand} ${item.model}</td>
        <td>${item.size}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${item.price * item.quantity}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
      </tr>`;
  });

  totalEl.textContent = total;
  document.getElementById('checkout-section').style.display = 'block';
}