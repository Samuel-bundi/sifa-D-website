// Example product database
const product = {
  "101": { name: "Bananas", price: 1.5 },
  "102": { name: "Milk", price: 2.0 },
  "103": { name: "Bread", price: 1.2 },
  "104": { name: "Eggs", price: 3.0 }
};

let cart = [];

// Elements
const productCodeField = document.getElementById("product-code");
const feedbackElement = document.getElementById("product-code-feedback");
const cartItemsContainer = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart-message");
const subtotalEl = document.getElementById("cart-subtotal");
const discountEl = document.getElementById("cart-discount");
const taxEl = document.getElementById("cart-tax");
const totalEl = document.getElementById("cart-total");
const finalizeBtn = document.getElementById("finalize-sale");

const receiptView = document.getElementById("receipt-view");
const cartView = document.getElementById("cart-view");
const receiptDate = document.getElementById("receipt-date");
const receiptId = document.getElementById("receipt-transaction-id");
const receiptItems = document.getElementById("receipt-items");
const receiptSubtotal = document.getElementById("receipt-subtotal");
const receiptDiscount = document.getElementById("receipt-discount");
const receiptTax = document.getElementById("receipt-tax");
const receiptTotal = document.getElementById("receipt-total");

// Add to cart
document.getElementById("add-to-cart").addEventListener("click", () => {
  const code = productCodeField.value.trim();
  if (!products[code]) {
    feedbackElement.textContent = "❌ Invalid product code!";
    return;
  }
  feedbackElement.textContent = "";

  const existing = cart.find(item => item.code === code);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ code, name: products[code].name, price: products[code].price, quantity: 1 });
  }

  productCodeField.value = "";
  renderCart();
});

// Render cart
function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    finalizeBtn.disabled = true;
    updateSummary();
    return;
  }
  emptyCartMessage.style.display = "none";
  finalizeBtn.disabled = false;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <span>x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-item">X</button>
    `;
    div.querySelector(".remove-item").addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });
    cartItemsContainer.appendChild(div);
  });

  updateSummary();
}

// Update summary
function updateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 20 ? subtotal * 0.1 : 0; // 10% discount if > $20
  const tax = (subtotal - discount) * 0.05; // 5% tax
  const total = subtotal - discount + tax;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  discountEl.textContent = `$${discount.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Finalize sale
finalizeBtn.addEventListener("click", () => {
  cartView.style.display = "none";
  receiptView.style.display = "block";

  const now = new Date();
  receiptDate.textContent = now.toLocaleString();
  receiptId.textContent = "TX" + Math.floor(Math.random() * 100000);

  receiptItems.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<span>${item.name} x${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span>`;
    receiptItems.appendChild(div);
  });

  receiptSubtotal.textContent = subtotalEl.textContent;
  receiptDiscount.textContent = discountEl.textContent;
  receiptTax.textContent = taxEl.textContent;
  receiptTotal.textContent = totalEl.textContent;
});

// Print receipt
document.getElementById("print-receipt").addEventListener("click", () => {
  window.print();
});

// Start over
document.getElementById("start-over").addEventListener("click", () => {
  cart = [];
  renderCart();
  receiptView.style.display = "none";
  cartView.style.display = "block";
});
// Load products from localStorage or use defaults
let products = JSON.parse(localStorage.getItem("products")) || {
  "101": { name: "Bananas", price: 1.5 },
  "102": { name: "Milk", price: 2.0 },
  "103": { name: "Bread", price: 1.2 },
  "104": { name: "Eggs", price: 3.0 }
};

// Save products to localStorage
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// ================= ADMIN PANEL =================
// Add product form
const adminForm = document.getElementById("admin-form");
const adminList = document.getElementById("admin-products");

if (adminForm) {
  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("admin-code").value.trim();
    const name = document.getElementById("admin-name").value.trim();
    const price = parseFloat(document.getElementById("admin-price").value);

    if (!code || !name || isNaN(price)) {
      alert("Please fill all fields correctly.");
      return;
    }

    products[code] = { name, price };
    saveProducts();
    renderAdminProducts();
    adminForm.reset();
    alert("✅ Product added successfully!");
  });

  function renderAdminProducts() {
    adminList.innerHTML = "";
    Object.entries(products).forEach(([code, prod]) => {
      const li = document.createElement("li");
      li.textContent = `${code} - ${prod.name} ($${prod.price.toFixed(2)})`;
      adminList.appendChild(li);
    });
  }

  renderAdminProducts();
}
saveProducts();