document.addEventListener('DOMContentLoaded', () => {
    const cartData = JSON.parse(localStorage.getItem('cartItems')) || [];
    const tbody = document.querySelector('#cart tbody');
    let grandTotal = 0;
  
    cartData.forEach(item => {
      const itemTotal = item.quantity * item.price;
      grandTotal += itemTotal;
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
        <td>$${itemTotal}</td>
      `;
      tbody.appendChild(row);
    });
  
    document.getElementById('grandTotal').innerText = `$${grandTotal}`;
  });
  