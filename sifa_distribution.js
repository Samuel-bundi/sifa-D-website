// =============================
// Sifa Distribution JS
// =============================

document.addEventListener("DOMContentLoaded", () => {
  // ===== Smooth Scroll for Internal Nav Links =====
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 70;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ===== Scroll-to-Top Button =====
  const scrollBtn = document.createElement("button");
  scrollBtn.innerText = "⬆";
  scrollBtn.id = "scrollTopBtn";
  document.body.appendChild(scrollBtn);

  scrollBtn.style.display = "none"; // Hidden initially

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== Simple Billing System (Cart Demo) =====
  const cart = [];
  const cartSummary = document.getElementById("cart-summary");
  const receiptList = document.getElementById("receipt-list");

  function renderCart() {
    if (!cartSummary || !receiptList) return;
    receiptList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const row = document.createElement("div");
      row.classList.add("receipt-item");
      row.innerHTML = `
        <span>${item.name} (x${item.qty})</span>
        <span>Ksh ${item.price * item.qty}</span>
      `;
      receiptList.appendChild(row);
      total += item.price * item.qty;
    });

    cartSummary.innerText = `Total: Ksh ${total}`;
  }

  // Example function for adding to cart (you can hook this to buttons)
  window.addToCart = function (name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    renderCart();
  };

  // ===== Developer Console Message =====
  console.log("%c Welcome to Sifa Distribution 🚚 ", "background:#2563eb; color:white; padding:4px; border-radius:4px;");
});
