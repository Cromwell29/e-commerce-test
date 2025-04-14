document.addEventListener("DOMContentLoaded", () => {
  const productId = new URLSearchParams(window.location.search).get("id");

  const fakeProducts = [
    {
      id: 1,
      name: "Tasse Sakura",
      price: "12.90€",
      image: "img/tasse-sakura.jpg",
      description: "Une tasse délicate inspirée des fleurs de cerisier.",
      longDescription: "Parfaite pour le thé ou le café, cette tasse en céramique aux motifs sakura apporte une touche zen à votre quotidien. Résistante au micro-ondes et au lave-vaisselle.",
      approved: true,
      quantity: 1
    },
    {
      id: 2,
      name: "Sac Bento",
      price: "24.50€",
      image: "img/sac-bento.jpg",
      description: "Transportez votre déjeuner avec élégance.",
      longDescription: "Ce sac bento au tissu traditionnel japonais est idéal pour garder votre repas au frais. Compact et stylé, il convient à tous vos déplacements.",
      approved: true,
      quantity: 1
    },
    {
      id: 3,
      name: "Chaussettes Chat",
      price: "8.90€",
      image: "img/chaussettes-chat.jpg",
      description: "Confort et kawaii réunis pour vos pieds.",
      longDescription: "Portez la douceur avec ces chaussettes à motif chat. En coton respirant, elles s’adaptent à toutes les tailles adultes.",
      approved: false,
      quantity: 1
    },
  ];

  const product = fakeProducts.find(p => p.id == productId);

  if (!product) {
    document.querySelector(".product-detail").innerHTML = "<p>Produit introuvable.</p>";
    return;
  }

  // Injection des infos
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-image").alt = product.name;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent = product.longDescription;
  document.getElementById("product-price").textContent = product.price;

  // Badge
  if (product.approved) {
    document.getElementById("seal-badge").style.display = "block";
  }

  // Création du bouton Ajouter au panier
  const btn = document.createElement("a");
  btn.href = "#";
  btn.className = "btn";
  btn.textContent = "Ajouter au panier";
  // Créer le champ de quantité
  const quantityWrapper = document.createElement("div");
  quantityWrapper.className = "product-quantity";

  const quantityLabel = document.createElement("label");
  quantityLabel.textContent = "Quantité : ";
  quantityLabel.setAttribute("for", "product-qty");

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.min = 1;
  quantityInput.value = 1;
  quantityInput.id = "product-qty";

  quantityWrapper.appendChild(quantityLabel);
  quantityWrapper.appendChild(quantityInput);
  const productInfo = document.querySelector(".product-info");
  productInfo.appendChild(quantityWrapper);  // 👈 champ quantité
  productInfo.appendChild(btn);              // 👈 bouton panier

  btn.addEventListener("click", (e) => {
  e.preventDefault();

  const quantity = parseInt(quantityInput.value) || 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(p => p.id == product.id);

  if (!existing) {
    cart.push({ ...product, quantity });
  } else {
    existing.quantity += quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  btn.textContent = "Ajouté ! 🛒";
  btn.disabled = true;
});
});
