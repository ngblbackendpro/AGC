// const FRONTEND_DATA_KEY = "agcSiteData";

// const frontendDefaults = {
//   stats: { engagements: "120+", industries: "30", partners: "15" },
//   social: { linkedin: "#", instagram: "#", facebook: "#" },
//   blogs: [],
//   careers: [],
//   contact: { location: "Panchkula, India", email: "connect@aroraglobal.com", phone: "+91 00000 00000" },
//   faqs: [],
//   terms: "",
//   privacy: "",
// };

// window.CONFIG = {
//   API_BASE_URL: "http://localhost:5000" // your backend URL
// };

// const mergeObjects = (base, incoming) => {
//   const next = { ...base };
//   Object.keys(incoming || {}).forEach((key) => {
//     const b = base[key];
//     const n = incoming[key];
//     if (b && n && typeof b === "object" && typeof n === "object" && !Array.isArray(b) && !Array.isArray(n)) {
//       next[key] = mergeObjects(b, n);
//     } else {
//       next[key] = n;
//     }
//   });
//   return next;
// };

// // const getFrontendData = () => {
// //   const raw = localStorage.getItem(FRONTEND_DATA_KEY);
// //   if (!raw) return { ...frontendDefaults };
// //   try {
// //     return mergeObjects({ ...frontendDefaults }, JSON.parse(raw));
// //   } catch (_error) {
// //     return { ...frontendDefaults };
// //   }
// // };

// const setText = (selector, value) => {
//   const el = document.querySelector(selector);
//   if (el) el.textContent = value;
// };

// const applyStats = (data) => {
//   const metricEls = document.querySelectorAll(".hero-metrics h3");
//   if (metricEls.length >= 3) {
//     metricEls[0].textContent = data.stats.engagements;
//     metricEls[1].textContent = data.stats.industries;
//     metricEls[2].textContent = data.stats.partners;
//   }
// };

// const applySocial = (data) => {
//   const links = document.querySelectorAll(".footer-social a");
//   links.forEach((link) => {
//     const label = (link.getAttribute("aria-label") || "").toLowerCase();
//     if (label.includes("linkedin")) link.href = data.social.linkedin || "#";
//     if (label.includes("instagram")) link.href = data.social.instagram || "#";
//     if (label.includes("facebook")) link.href = data.social.facebook || "#";
//   });
// };

// const applyBlogs = (data) => {
//   const grid = document.querySelector(".blog-grid");
//   if (!grid || !data.blogs.length) return;

//   const sorted = data.blogs.slice().sort((a, b) => b.date.localeCompare(a.date));
//   grid.innerHTML = sorted
//     .map(
//       (blog) => `
//       <article class="blog-card reveal">
//         <div class="blog-image">
//           <img src="${blog.image}" alt="${blog.title}" loading="lazy" />
//         </div>
//         <div class="blog-content">
//           <span class="blog-category">${blog.category}</span>
//           <h3>${blog.title}</h3>
//           <p class="blog-preview">${blog.description.slice(0, 140)}${blog.description.length > 140 ? "..." : ""}</p>
//           <p class="blog-full" hidden>${blog.description}</p>
//           <div class="actions">
//             <button class="btn btn-primary blog-read-more" type="button">Read More</button>
//           </div>
//         </div>
//       </article>
//     `
//     )
//     .join("");

// };

// const applyHomeLatestBlogs = (data) => {
//   const grid = document.querySelector("#latest-blogs .card-grid");
//   if (!grid || !data.blogs.length) return;

//   const latest = data.blogs.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
//   grid.innerHTML = latest
//     .map(
//       (blog) => `
//       <article class="card reveal">
//         <div class="card-media">
//           <img src="${blog.image}" alt="${blog.title}" loading="lazy" />
//         </div>
//         <h3>${blog.title}</h3>
//         <p>${blog.description.slice(0, 120)}${blog.description.length > 120 ? "..." : ""}</p>
//         <a class="btn btn-primary" href="blogs.html">Read Article</a>
//       </article>
//     `
//     )
//     .join("");
// };

// const applyCareers = (data) => {
//   const grid = document.querySelector(".job-grid");
//   if (!grid || !data.careers.length) return;

//   grid.innerHTML = data.careers
//     .map(
//       (job) => `
//       <div class="job-card job reveal">
//         <div class="job-top">
//           <h3>${job.title}</h3>
//           <span class="badge job-badge">${job.type}</span>
//         </div>
//         <p class="job-meta">${job.mode}</p>
//         <p class="job-desc">${job.description}</p>
//         <a href="${job.applyLink}" class="apply-btn job-btn">Apply Now</a>
//       </div>
//     `
//     )
//     .join("");
// };

// const applyContact = (data) => {
//   document.querySelectorAll(".info-item").forEach((item) => {
//     const label = item.querySelector("h4")?.textContent?.toLowerCase() || "";
//     if (label.includes("office") || label.includes("head")) {
//       const officeText = item.querySelector("p");
//       if (officeText) {
//         officeText.textContent = data.contact.location;
//       }
//     }
//     if (label.includes("email")) {
//       const emailLink = item.querySelector("a");
//       if (emailLink) {
//         emailLink.textContent = data.contact.email;
//         emailLink.href = `mailto:${data.contact.email}`;
//       }
//     }
//     if (label.includes("phone")) {
//       const phoneLink = item.querySelector("a");
//       if (phoneLink) {
//         phoneLink.textContent = data.contact.phone;
//         phoneLink.href = `tel:${data.contact.phone.replace(/\s+/g, "")}`;
//       }
//     }
//   });
// };

// const applyFaq = (data) => {
//   const list = document.querySelector(".faq-list");
//   if (!list || !data.faqs.length) return;
//   list.innerHTML = data.faqs
//     .map(
//       (faq, idx) => `
//       <details class="faq-item reveal" ${idx === 0 ? "open" : ""}>
//         <summary>${faq.question}</summary>
//         <p>${faq.answer}</p>
//       </details>
//     `
//     )
//     .join("");
// };

// const applyLegalText = (data) => {
//   const termsBody = document.querySelector("#section-terms-text");
//   if (termsBody && data.terms) {
//     termsBody.textContent = data.terms;
//   }

//   const privacyBody = document.querySelector("#section-privacy-text");
//   if (privacyBody && data.privacy) {
//     privacyBody.textContent = data.privacy;
//   }
// };

// const fetchSocialLinks = async () => {
//   try {
//     const res = await fetch(`${window.CONFIG.API_BASE_URL}/api/social`);
//     const data = await res.json();

//     console.log("Social API Data:", data);

//     applySocial(data);

//   } catch (error) {
//     console.error("Error fetching social:", error);
//   }
// };

// document.addEventListener("layout:ready", fetchSocialLinks);
// // document.addEventListener("layout:ready", () => {
// //   const data = getFrontendData();
// //   applyStats(data);
// //   applySocial(data);
// //   applyBlogs(data);
// //   applyHomeLatestBlogs(data);
// //   applyCareers(data);
// //   applyContact(data);
// //   applyFaq(data);
// //   applyLegalText(data);
// // });
// ================= CONFIG =================
window.CONFIG = {
  // API_BASE_URL: "http://localhost:5000"
  API_BASE_URL: "https://agc-arap.onrender.com"
};

// ================= SOCIAL =================
const applySocial = (data) => {
  const links = document.querySelectorAll(".footer-social a");

  links.forEach((link) => {
    const label = (link.getAttribute("aria-label") || "").toLowerCase();

    if (label.includes("linkedin")) link.href = data.linkedin || "#";
    if (label.includes("instagram")) link.href = data.instagram || "#";
    if (label.includes("facebook")) link.href = data.facebook || "#";
  });
};

const fetchSocial = async () => {
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/social`);
    const data = await res.json();
    applySocial(data);
  } catch (err) {
    console.error("Social fetch error:", err);
  }
};

// ================= FAQ =================
const applyFaq = (faqs) => {
  const container = document.querySelector(".faq-list");
  if (!container || !faqs.length) return;

  container.innerHTML = faqs.map((faq, i) => `
    <details class="faq-item" ${i === 0 ? "open" : ""}>
      <summary>${faq.question}</summary>
      <p>${faq.answer}</p>
    </details>
  `).join("");
};

const fetchFaq = async () => {
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/faqs`);
    const data = await res.json();
    applyFaq(data);
  } catch (err) {
    console.error("FAQ fetch error:", err);
  }
};

// ================= CAREERS =================
const applyCareers = (jobs) => {
  const grid = document.querySelector(".job-grid");
  if (!grid || !jobs.length) return;

  grid.innerHTML = jobs.map(job => `
    <div class="job-card job">
      <div class="job-top">
        <h3>${job.title}</h3>
        <span class="badge job-badge">${job.type}</span>
      </div>
      <p class="job-meta">${job.mode}</p>
      <p class="job-desc">${job.description}</p>
      <a href="${job.applyLink}" class="apply-btn job-btn">Apply Now</a>
    </div>
  `).join("");
};

const fetchCareers = async () => {
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/careers`);
    const data = await res.json();
    applyCareers(data);
  } catch (err) {
    console.error("Career fetch error:", err);
  }
};

// ================= PRIVACY =================
const applyPrivacy = (data) => {
  const el = document.querySelector("#section-privacy-text");
  if (el && data.privacy) {
    el.innerHTML = data.privacy;
  }
};

const fetchPrivacy = async () => {
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/privacy`);
    const data = await res.json();
    applyPrivacy(data);
  } catch (err) {
    console.error("Privacy fetch error:", err);
  }
};

// ================= TERMS =================
const applyTerms = (data) => {
  const el = document.querySelector("#section-terms-text");
  if (el && data.terms) {
    el.innerHTML = data.terms;
  }
};

const fetchTerms = async () => {
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/terms`);
    const data = await res.json();
    applyTerms(data);
  } catch (err) {
    console.error("Terms fetch error:", err);
  }
};

// ================= INIT =================
document.addEventListener("layout:ready", () => {
  fetchSocial();
  fetchFaq();
  fetchCareers();
  fetchPrivacy();
  fetchTerms();
});