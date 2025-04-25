let cartItems = [];

// Function to add items to the cart
function addToCart() {
  const inputs = document.querySelectorAll('input[type=number]');
  inputs.forEach(input => {
    const quantity = parseInt(input.value);
    if (quantity > 0) {
      const name = input.name;
      const price = parseFloat(input.dataset.price);
      const existingItem = cartItems.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({ name, quantity, price });
      }
    }
    input.value = 0; // Reset input value after adding to cart
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartTable();
}

// Function to go to the cart page
function goToCart() {
  if (cartItems.length > 0) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href = 'cart.html';
  } else {
    alert("Please select at least one item to add to cart.");
  }
}

// Function to update the cart table
function updateCartTable() {
  const tbody = document.querySelector('#cart tbody');
  if (!tbody) return; // Avoid error if cart table doesn't exist on this page

  tbody.innerHTML = '';
  let total = 0;

  cartItems.forEach(item => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  const totalDisplay = document.getElementById('total');
  if (totalDisplay) totalDisplay.innerText = `$${total.toFixed(2)}`;
}

// Function to proceed with the purchase
function buyNow() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  window.location.href = 'checkout.html';
}

// Function to save the favourite order
function saveFavourite() {
  if (cartItems.length > 0) {
    localStorage.setItem('favouriteOrder', JSON.stringify(cartItems));
    alert("Favourite order saved!");
  } else {
    alert("No items to save as favourite.");
  }
}

// Function to apply the favourite order
function applyFavourite() {
  const favourite = JSON.parse(localStorage.getItem('favouriteOrder'));

  if (!favourite || favourite.length === 0) {
    alert("No favourite order found.");
    return;
  }

  // Clear cart and inputs
  cartItems = [];
  const inputs = document.querySelectorAll('input[type=number]');
  inputs.forEach(input => input.value = 0);

  // Apply favourite
  favourite.forEach(item => {
    const input = document.querySelector(`input[name="${item.name}"]`);
    if (input) {
      input.value = item.quantity;
      cartItems.push({ ...item });
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartTable();
  alert("Favourite order applied!");
}

// Load cart from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('cartItems');
  if (stored) {
    cartItems = JSON.parse(stored);
    updateCartTable();
  }
});
