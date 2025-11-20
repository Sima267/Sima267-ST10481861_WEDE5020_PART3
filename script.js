document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.classList.toggle("open");
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
      navLinks.classList.remove("show");
      menuToggle.classList.remove("open");
    });
  });

  // Card hover animation
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    });
  });

  // =====================
  // Product Data
  // =====================
  const products = [
    { id: 1, category: "men", name: "Men's T-Shirt", price: 199, sizes: ["S","M","L","XL"], image: "images/men.jpg" },
    { id: 2, category: "men", name: "Men's Jacket", price: 499, sizes: ["M","L","XL"], image: "images/men.jpg" },
    { id: 3, category: "women", name: "Women's T-Shirt", price: 179, sizes: ["S","M","L"], image: "images/women.jpg" },
    { id: 4, category: "women", name: "Women's Dress", price: 399, sizes: ["S","M","L"], image: "images/women.jpg" },
    { id: 5, category: "accessories", name: "Bag", price: 249, sizes: ["One Size"], image: "images/accessories.jpg" },
    { id: 6, category: "accessories", name: "Hat", price: 99, sizes: ["One Size"], image: "images/accessories.jpg" },
  ];

  const productGrid = document.getElementById("product-grid");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = [];

  function displayProducts(category = "all") {
    productGrid.innerHTML = "";
    let filteredProducts = category === "all" ? products : products.filter(p => p.category === category);
    filteredProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>R${product.price}</p>
        <select class="size-select">
          ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
        </select>
        <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });

    // Attach add-to-cart events
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        const product = products.find(p => p.id === id);
        const selectedSize = btn.previousElementSibling.value;
        addToCart(product, selectedSize);
      });
    });
  }

  function addToCart(product, size) {
    cart.push({...product, selectedSize: size});
    updateCart();
  }

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.innerHTML = `${item.name} (${item.selectedSize}) - R${item.price} <button data-index="${index}" class="remove-item">Remove</button>`;
      cartItemsContainer.appendChild(div);
    });
    cartTotal.textContent = `Total: R${total}`;
    // Remove item
    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", () => {
        cart.splice(parseInt(btn.dataset.index), 1);
        updateCart();
      });
    });
  }

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase! Total: R" + cart.reduce((acc, item) => acc + item.price, 0));
    cart = [];
    updateCart();
  });

  // =====================
  // Filter Buttons
  // =====================
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      displayProducts(btn.dataset.category);
    });
  });

  // Display all products on page load
  displayProducts();
});
