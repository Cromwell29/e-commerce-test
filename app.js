// 🌙 Bouton mode sombre
document.getElementById('toggle-dark')?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});
// 🎯 Appliquer le dark mode dès le chargement si nécessaire
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // 🎞️ Animation fade-in
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(el => observer.observe(el));
});

// ⬆️ Bouton "Retour en haut"
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
});
scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 🖼️ Lightbox images
const lightboxLinks = document.querySelectorAll('.lightbox');
lightboxLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const src = e.target.src;
    const modal = document.createElement('div');
    modal.classList.add('lightbox-modal');
    modal.innerHTML = `
      <div class="lightbox-content">
        <img src="${src}" alt="Image agrandie" />
        <button class="close-lightbox">×</button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-lightbox').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');

  const fakeProducts = [
    {
      id: 1,
      name: "Tasse Sakura",
      price: "12.90€",
      image: "img/tasse-sakura.jpg",
      description: "Une tasse délicate inspirée des fleurs de cerisier."
    },
    {
      id: 2,
      name: "Sac Bento",
      price: "24.50€",
      image: "img/sac-bento.jpg",
      description: "Transportez votre déjeuner avec élégance."
    },
    {
      id: 3,
      name: "Chaussettes Chat",
      price: "8.90€",
      image: "img/chaussettes-chat.jpg",
      description: "Confort et kawaii réunis pour vos pieds."
    }
  ];

  // Génération des cartes produits
  fakeProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>${product.price}</strong><br />
      <a href="produit.html?id=${product.id}" class="btn">Ajouter au panier</a>
    `;

    productList.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 100);
  });
});
