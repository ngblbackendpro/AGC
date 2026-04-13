const loadFragment = async (path) => {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return response.text();
};

const sectionManifest = [
  { target: "dashboard", file: "partials/section-dashboard.html", active: true },
  { target: "home", file: "partials/section-home.html" },
  { target: "team", file: "partials/section-team.html" },
  { target: "social", file: "partials/section-social.html" },
  { target: "blogs", file: "partials/section-blogs.html" },
  { target: "careers", file: "partials/section-careers.html" },
  { target: "contact", file: "partials/section-contact.html" },
  { target: "faqs", file: "partials/section-faqs.html" },
  { target: "terms", file: "partials/section-terms.html" },
  { target: "privacy", file: "partials/section-privacy.html" },
];

const adminScriptOrder = [
  "js/admin-data.js",
  "js/dashboard.js",
  "js/home.js",
  "js/team.js",
  "js/social.js",
  "js/blog.js",
  "js/career.js",
  "js/contact.js",
  "js/faq.js",
  "js/terms.js",
  "js/privacy.js"
];

const loadScriptSequentially = async (src) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.body.appendChild(script);
  });

const initializeAdminLayout = async () => {
  const root = document.querySelector("#admin-shell-root");
  if (!root) {
    return;
  }

  try {
    const [sidebarMarkup, topbarMarkup, ...sectionMarkup] = await Promise.all([
      loadFragment("partials/sidebar.html"),
      loadFragment("partials/topbar.html"),
      ...sectionManifest.map((section) => loadFragment(section.file)),
    ]);

    const sectionBlocks = sectionManifest
      .map((section, index) => {
        const activeClass = section.active ? " active" : "";
        return `<section id="section-${section.target}" class="section${activeClass}">${sectionMarkup[index]}</section>`;
      })
      .join("");

    root.innerHTML = `
      <div class="admin-shell">
        <aside class="sidebar">${sidebarMarkup}</aside>
        <main class="main">
          <div class="topbar panel">${topbarMarkup}</div>
          ${sectionBlocks}
        </main>
      </div>
      <div id="toast" class="toast"></div>
    `;

    for (const src of adminScriptOrder) {
      await loadScriptSequentially(src);
    }
    document.dispatchEvent(new Event("admin:ready"));
  } catch (error) {
    console.error(error);
    root.innerHTML = "<p class='panel'>Admin layout failed to load. Please refresh the page.</p>";
  }
};

document.addEventListener("DOMContentLoaded", initializeAdminLayout);
