// ==================================
// Part 1: Notifications
// ==================================
const notifyBtn = document.getElementById("notifyBtn");
const notifyMsg = document.getElementById("notifyMsg");

notifyBtn.addEventListener("click", () => {
  notifyMsg.classList.toggle("hidden"); // Toggle message visibility
});

// ==================================
// Part 2: Interactive Features
// ==================================

// Dark Mode Toggle
const toggleMode = document.getElementById("toggleMode");
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Stock Counter
let stock = 0;
const stockDisplay = document.getElementById("stockCount");
const increaseStock = document.getElementById("increaseStock");
const decreaseStock = document.getElementById("decreaseStock");

increaseStock.addEventListener("click", () => {
  stock++;
  stockDisplay.textContent = stock;
});

decreaseStock.addEventListener("click", () => {
  if (stock > 0) stock--; // Prevent negative stock
  stockDisplay.textContent = stock;
});

// Collapsible FAQ
const faqToggle = document.querySelector(".faq-toggle");
const faqText = document.querySelector(".faq");

faqToggle.addEventListener("click", () => {
  faqText.classList.toggle("hidden");
});

// ==================================
// Part 3: Client Registration Form
// ==================================
const clientForm = document.getElementById("clientForm");
const clientName = document.getElementById("clientName");
const clientEmail = document.getElementById("clientEmail");
const clientPassword = document.getElementById("clientPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formSuccess = document.getElementById("formSuccess");

clientForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop actual submission
  let valid = true;

  // Validate Name (at least 3 characters)
  if (clientName.value.trim().length < 3) {
    nameError.textContent = "Full name must be at least 3 characters.";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  // Validate Email (basic regex)
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(clientEmail.value)) {
    emailError.textContent = "Enter a valid email address (e.g. info@sifa.com).";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  // Validate Password (min 6 chars + number)
  const passwordPattern = /^(?=.*\d).{6,}$/;
  if (!passwordPattern.test(clientPassword.value)) {
    passwordError.textContent =
      "Password must be at least 6 characters & contain a number.";
    valid = false;
  } else {
    passwordError.textContent = "";
  }

  // Success
  if (valid) {
    formSuccess.classList.remove("hidden");
    clientForm.reset();
  }
});
