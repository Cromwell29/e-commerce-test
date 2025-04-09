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
      approved: true
    },
    {
      id: 2,
      name: "Sac Bento",
      price: "24.50€",
      image: "img/sac-bento.jpg",
      description: "Transportez votre déjeuner avec élégance.",
      longDescription: "Ce sac bento au tissu traditionnel japonais est idéal pour garder votre repas au frais. Compact et stylé, il convient à tous vos déplacements.",
      approved: true
    },
    {
      id: 3,
      name: "Chaussettes Chat",
      price: "8.90€",
      image: "img/chaussettes-chat.jpg",
      description: "Confort et kawaii réunis pour vos pieds.",
      longDescription: "Portez la douceur avec ces chaussettes à motif chat. En coton respirant, elles s’adaptent à toutes les tailles adultes.",
      approved: false
    },
  ];

  const product = fakeProducts.find(p => p.id == productId);

  if (!product) {
    document.querySelector(".product-detail").innerHTML = "<p>Produit introuvable.</p>";
    return;
  }

  // Insertion des données dans les bons éléments
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-image").alt = product.name;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent = product.longDescription;
  document.getElementById("product-price").textContent = product.price;

  // Badge
  if (product.approved) {
    document.getElementById("seal-badge").style.display = "block";
  }

  // ✅ Gestion du panier dans le même bloc
  const btn = document.querySelector(".btn");
  btn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(p => p.id == product.id);
    if (!existing) {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    btn.textContent = "Ajouté ! 🛒";
    btn.disabled = true;
  });
});
