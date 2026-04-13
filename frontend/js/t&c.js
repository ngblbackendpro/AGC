(function () {
  const API = window.CONFIG.API_BASE_URL;

  const showTerms = async () => {
    try {
      const res = await fetch(`${API}/api/terms`);
      if (!res.ok) throw new Error("Failed to fetch terms");

      const terms = await res.json();

      const container = document.querySelector(".terms-content");
      if (!container) return;

      // Remove old static cards (optional but recommended)
      container.querySelectorAll(".terms-card").forEach(el => el.remove());

      if (!Array.isArray(terms) || terms.length === 0) {
        container.innerHTML += `<p>No terms available</p>`;
        return;
      }

      const html = terms.map((term, index) => `
        <div class="terms-card ${index === 0 ? "active" : ""}" id="term-${index}">
          <button class="terms-toggle">
            ${index + 1}. ${term.heading}
          </button>
          <div class="terms-body">
            <p>${term.summary}</p>
          </div>
        </div>
      `).join("");

      container.innerHTML += html;

    } catch (error) {
      console.error(error);
    }
  };

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("terms-toggle")) return;

  const card = e.target.closest(".terms-card");
  const body = card.querySelector(".terms-body");

  if (card.classList.contains("active")) {
    // CLOSE
    body.style.maxHeight = body.scrollHeight + "px";
    requestAnimationFrame(() => {
      body.style.maxHeight = "0px";
    });
    card.classList.remove("active");
  } else {
    // OPEN
    card.classList.add("active");
    body.style.maxHeight = body.scrollHeight + "px";
  }
});

  document.addEventListener("DOMContentLoaded", showTerms);
})();