const loadFragment = async (selector, path) => {
  const target = document.querySelector(selector);
  if (!target) {
    return;
  }

  try {
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Could not load ${path}`);
    }
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
};

const setActiveNavLink = () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const cleanHref = href.split("#")[0];
    if (!cleanHref) {
      return;
    }

    if (cleanHref === currentPath) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const initializeLayout = async () => {
  await Promise.all([
    loadFragment("#site-header", "partials/header.html"),
    loadFragment("#site-footer", "partials/footer.html"),
  ]);

  setActiveNavLink();

  if (typeof window.initializeSiteShell === "function") {
    window.initializeSiteShell();
  }

  document.dispatchEvent(new CustomEvent("layout:ready"));
};

document.addEventListener("DOMContentLoaded", initializeLayout);
