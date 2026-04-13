(function () {
  "use strict";

  const API_BASE = window.CONFIG.API_BASE_URL;

const fetchBlogs = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/blogs`);
    const data = await res.json();

    renderBlogs(data);
  } catch (err) {
    console.error("Error fetching blogs:", err);
  }
};

const renderBlogs = (blogs) => {
  const container = document.getElementById("blogs-container");

  if (!container) return;

  container.innerHTML = "";

  blogs.forEach((blog) => {
    const imageUrl = blog.image
      ? blog.image.startsWith("http")
        ? blog.image
        : `${API_BASE}/${blog.image}`
      : "assets/default.jpg";

    const card = document.createElement("div");
    card.className = "blog-card";

    card.innerHTML = `
      <img src="${imageUrl}" class="blog-image" alt="${blog.title}" />

      <div class="blog-content">
        <h3>${blog.title}</h3>
        <p class="blog-category">${blog.category || ""}</p>

        <p class="blog-preview">
          ${blog.description.substring(0, 120)}...
        </p>

        <div class="blog-full" hidden>
          <p>${blog.description}</p>
        </div>

        <button class="blog-read-more">Read More</button>
      </div>
    `;

    container.appendChild(card);
  });
};



  const expand = (el) => {
    el.style.overflow = "hidden";
    el.style.maxHeight = "0px";
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";

    const height = el.scrollHeight;

    requestAnimationFrame(() => {
      el.style.transition = "max-height 0.4s ease, opacity 0.3s ease, transform 0.3s ease";
      el.style.maxHeight = height + "px";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    setTimeout(() => {
      el.style.maxHeight = "none"; // keep natural height
    }, 400);
  };

  const collapse = (el) => {
    el.style.overflow = "hidden";
    el.style.maxHeight = el.scrollHeight + "px";

    requestAnimationFrame(() => {
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
    });
  };

  const buttonEffect = (btn) => {
    btn.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.95)" },
        { transform: "scale(1)" }
      ],
      { duration: 200, easing: "ease" }
    );
  };

  const toggleBlog = (card, btn) => {
    const preview = card.querySelector(".blog-preview");
    const full = card.querySelector(".blog-full");

    if (!preview || !full) return;

    const isExpanded = card.classList.contains("expanded");

    buttonEffect(btn);

    if (isExpanded) {
      // Collapse
      collapse(full);
      card.classList.remove("expanded");
      preview.removeAttribute("hidden");
      btn.textContent = "Read More";
    } else {
      // Expand
      card.classList.add("expanded");
      preview.setAttribute("hidden", true);
      expand(full);
      btn.textContent = "Read Less";
    }
  };

  const handleClick = (e) => {
    const btn = e.target.closest(".blog-read-more");
    if (!btn) return;

    const card = btn.closest(".blog-card");
    if (!card) return;

    toggleBlog(card, btn);
  };

const init = () => {
  if (window.__blogSafeBound) return;

  document.addEventListener("click", handleClick);

  fetchBlogs(); // ✅ ADD THIS LINE

  window.__blogSafeBound = true;
};

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("layout:ready", init);
})();