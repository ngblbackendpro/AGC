(function () {
  "use strict";

  const API_BASE = window.CONFIG.API_BASE_URL;

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/teams`);
      const data = await res.json();

      renderTeam(data);
    } catch (err) {
      console.error("Error fetching team:", err);
    }
  };

  const renderTeam = (members) => {
    const container = document.getElementById("team-container");
    if (!container) return;

    container.innerHTML = "";

    members.forEach((member) => {
      const imageUrl = member.photo
        ? member.photo.startsWith("http")
          ? member.photo
          : `${API_BASE}/${member.photo}`
        : "img/default-user.png";

      const card = document.createElement("article");
      card.className = "team-row reveal";

      card.innerHTML = `
        <div class="member-photo">
          <img src="${imageUrl}" alt="${member.name}" loading="lazy" />
        </div>

        <div class="member-details">
          <p class="role-tag">${member.designation || ""}</p>
          <h3>${member.name}</h3>

          <ul>
            ${member.role ? `<li><strong>Role:</strong> ${member.role}</li>` : ""}
            ${member.expertise ? `<li><strong>Expertise:</strong> ${member.expertise}</li>` : ""}
            ${member.background ? `<li><strong>Background:</strong> ${member.background}</li>` : ""}
            ${member.qualifications ? `<li><strong>Qualifications:</strong> ${member.qualifications}</li>` : ""}
            ${member.personal ? `<li><strong>Personal:</strong> ${member.personal}</li>` : ""}
          </ul>
        </div>
      `;

      container.appendChild(card);
    });

    // re-trigger animation
    if (window.initializeSiteShell) {
      window.initializeSiteShell();
    }
  };

  const init = () => {
    fetchTeam();
  };

  document.addEventListener("DOMContentLoaded", init);
})();