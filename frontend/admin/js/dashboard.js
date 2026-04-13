if (localStorage.getItem(AGC_AUTH_KEY) !== "true") {
  window.location.href = "index.html";
}

window.AdminApp = window.AdminApp || {};
const app = window.AdminApp;

app.siteData = getSiteData();

const toast = document.querySelector("#toast");
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

app.showToast = (message, type = "ok") => {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  window.setTimeout(() => {
    toast.className = "toast";
  }, 2200);
};

// Persist every content mutation and repaint all sections.
app.persist = (okMessage) => {
  saveSiteData(app.siteData);
  app.renderAll();
  app.showToast(okMessage, "ok");
};

app.readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Image upload failed."));
    reader.readAsDataURL(file);
  });

app.renderDashboard = () => {
  const statsEl = document.querySelector("#dashboard-stats");
  const stats = [
    { label: "Global Engagements", value: app.siteData.stats.engagements },
    { label: "Industries Served", value: app.siteData.stats.industries },
    { label: "Regional Partners", value: app.siteData.stats.partners },
  ];

  statsEl.innerHTML = stats
    .map(
      (item) => `
      <article class="stat-card">
        <p>${item.label}</p>
        <strong>${item.value}</strong>
      </article>`
    )
    .join("");

  const latestBlogs = app.siteData.blogs.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  document.querySelector("#preview-blogs").innerHTML = latestBlogs.map((blog) => `<li>${blog.title}</li>`).join("") || "<li>No blogs found.</li>";
  document.querySelector("#preview-team").innerHTML = (app.siteData.teamMembers || [])
    .slice(0, 4)
    .map(
      (member) => `
      <div class="team-preview-item">
        <img src="${member.photo}" alt="${member.name}" loading="lazy" />
        <div>
          <strong>${member.name}</strong>
          <div class="team-preview-meta">${member.designation}</div>
        </div>
      </div>`
    )
    .join("") || "<p class='empty-note'>No team members found.</p>";

  document.querySelector("#preview-contact").innerHTML = `
    <li>${app.siteData.contact.location}</li>
    <li>${app.siteData.contact.email}</li>
    <li>${app.siteData.contact.phone}</li>`;

  document.querySelector("#preview-careers").innerHTML = app.siteData.careers.map((job) => `<li>${job.title}</li>`).join("") || "<li>No jobs posted.</li>";
};

app.renderAll = () => {
  app.renderDashboard();

  if (typeof app.renderStatsForm === "function") app.renderStatsForm();
  if (typeof app.renderTeamTable === "function") app.renderTeamTable();
  if (typeof app.renderSocialForm === "function") app.renderSocialForm();
  if (typeof app.renderBlogTable === "function") app.renderBlogTable();
  if (typeof app.renderCareerTable === "function") app.renderCareerTable();
  if (typeof app.renderContactForm === "function") app.renderContactForm();
  if (typeof app.renderFaqTable === "function") app.renderFaqTable();
  if (typeof app.renderLegalForms === "function") app.renderLegalForms();
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const target = button.dataset.target;
    sections.forEach((section) => section.classList.remove("active"));
    document.querySelector(`#section-${target}`).classList.add("active");
  });
});

document.querySelector("#logout-btn").addEventListener("click", () => {
  localStorage.removeItem(AGC_AUTH_KEY);
  window.location.href = "index.html";
});

document.querySelector("#reset-data-btn").addEventListener("click", () => {
  app.siteData = resetSiteData();
  app.renderAll();
  app.showToast("Demo data reset successfully.", "ok");
});

window.addEventListener("DOMContentLoaded", () => {
  app.renderAll();
});
