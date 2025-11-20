// =====================
// Product & Cart Functionality
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Sample product data
  const products = [
    { id: 1, name: "Men's T-Shirt", category: "Men", price: 250, sizes: ["S", "M", "L", "XL"], img: "images/men1.jpg" },
    { id: 2, name: "Men's Jeans", category: "Men", price: 450, sizes: ["M", "L", "XL"], img: "images/men2.jpg" },
    { id: 3, name: "Women's Top", category: "Women", price: 300, sizes: ["S", "M", "L"], img: "images/women1.jpg" },
    { id: 4, name: "Women's Dress", category: "Women", price: 550, sizes: ["S", "M", "L"], img: "images/women2.jpg" },
    { id: 5, name: "Leather Bag", category: "Accessories", price: 700, sizes: [], img: "images/accessory1.jpg" },
    { id: 6, name: "Sneakers", category: "Accessories", price: 650, sizes: ["6", "7", "8", "9"], img: "images/accessory2.jpg" },
  ];

  let cart = [];

  const productList = document.getElementById("product-list"); // ✅ Correct container
  const categoryButtons = document.querySelectorAll("[data-category]"); // ✅ Only category buttons

  // Function to render products
  function renderProducts(category = null) {
    productList.innerHTML = ""; // Clear current products
    const filtered = category ? products.filter(p => p.category === category) : products;

    const grid = document.createElement("div");
    grid.classList.add("grid");

    filtered.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>R${product.price}</p>
        ${product.sizes.length > 0 ? `
          <label>Size: 
            <select class="size-select">
              ${product.sizes.map(s => `<option value="${s}">${s}</option>`).join("")}
            </select>
          </label>` : ""}
        <button class="btn add-to-cart">Add to Cart</button>
      `;

      // Add to cart functionality
      card.querySelector(".add-to-cart").addEventListener("click", () => {
        const size = product.sizes.length > 0 ? card.querySelector(".size-select").value : null;
        cart.push({ ...product, selectedSize: size });
        updateCart();
        alert(`✅ Added ${product.name} ${size ? "(" + size + ")" : ""} to cart`);
      });

      grid.appendChild(card);
    });

    productList.appendChild(grid);
  }

  // Update cart (console demo for now)
  function updateCart() {
    console.clear();
    console.log("🛒 Cart Items:");
    cart.forEach(item => console.log(`${item.name} ${item.selectedSize ? "(" + item.selectedSize + ")" : ""} - R${item.price}`));
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    console.log("💰 Total: R" + total);
  }

  // Category button listeners
  categoryButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      renderProducts(button.dataset.category);
    });
  });

  // Initial render: show all products
  renderProducts();
});
