const ADMIN_EMAIL = "admin@aroraglobal.com";
const ADMIN_PASSWORD = "admin123";

const loginForm = document.querySelector("#login-form");
const loginError = document.querySelector("#login-error");

if (localStorage.getItem(AGC_AUTH_KEY) === "true") {
  window.location.href = "dashboard.html";
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AGC_AUTH_KEY, "true");
      window.location.href = "dashboard.html";
      return;
    }

    loginError.textContent = "Invalid email or password. Try admin@aroraglobal.com / admin123";
  });
}
