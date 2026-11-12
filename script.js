// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Dark / light theme toggle; preference is saved in this browser.
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
function updateThemeButton() {
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.textContent = isLight ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
}
updateThemeButton();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  updateThemeButton();
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

// Front-end form validation only: no backend/email service is connected.
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !message) {
    feedback.textContent = "Please fill in all three fields.";
    feedback.style.color = "#e6a45c";
    return;
  }
  if (!emailPattern.test(email)) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.style.color = "#e6a45c";
    return;
  }
  feedback.textContent = `Thanks, ${name}! The form is valid. This demo does not send the message.`;
  feedback.style.color = "var(--accent)";
  contactForm.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
