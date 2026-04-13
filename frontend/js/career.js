(function () {
  "use strict";

  const API_BASE = window.CONFIG?.API_BASE_URL || "http://localhost:5000";

  // ================= FETCH CAREERS =================
  const fetchCareers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/careers`);
      const data = await res.json();

      console.log("Careers:", data);

      renderCareers(data);

    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };

  // ================= RENDER =================
  const renderCareers = (careers) => {
    const container = document.getElementById("career-container");
    if (!container) return;

    container.innerHTML = "";

    if (!careers.length) {
      container.innerHTML = "<p>No openings available right now.</p>";
      return;
    }

    careers.forEach((job) => {
      const card = document.createElement("div");
      card.className = "job-card job fade-section";

      card.innerHTML = `
        <div class="job-top">
          <h3>${job.title}</h3>
          <span class="badge job-badge">${job.type}</span>
        </div>
        <p class="job-meta">${job.mode}</p>
        <p class="job-desc">${job.description}</p>
        <a href="${job.applyLink}" target="_blank" class="apply-btn job-btn">Apply Now</a>
      `;
      animateJobs();

      container.appendChild(card);
    });
  };

  const animateJobs = () => {
  const sections = document.querySelectorAll(".fade-section");

  sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add("show");
        }, index * 200);
      });
    };
  // ================= INIT =================
  document.addEventListener("DOMContentLoaded", fetchCareers);

})();