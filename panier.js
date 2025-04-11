document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }

  cart.forEach(product => {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h3>${product.name}</h3>
        <p>${product.description || product.longDescription}</p>
        <strong>${product.price}</strong>
      </div>
    `;
    cartContainer.appendChild(item);
  });
});
