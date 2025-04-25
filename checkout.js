document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const tbody = document.querySelector('#summary-table tbody');
  const totalDisplay = document.getElementById('summary-total');

  let total = 0;

  cartItems.forEach(item => {
    const row = document.createElement('tr');
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${itemTotal.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  totalDisplay.textContent = `$${total.toFixed(2)}`;

  // Handle form submission
  document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const deliveryDate = this.deliveryDate.value;
    if (this.checkValidity()) {
      document.getElementById('checkoutForm').style.display = 'none';
      document.getElementById('order-summary').style.display = 'none';
      document.getElementById('confirmation').style.display = 'block';
      document.getElementById('delivery-date').textContent = deliveryDate;

      // Optional: Clear cart after checkout
      localStorage.removeItem('cartItems');
    }
  });
});
