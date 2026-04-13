// (function () {
//   "use strict";

//   const initFAQ = () => {
//     if (window.__faqBound) return;

//     const items = document.querySelectorAll(".faq-item");

//     items.forEach((item) => {
//       item.addEventListener("toggle", () => {
//         if (item.open) {
//           // Close others (accordion effect)
//           items.forEach((other) => {
//             if (other !== item && other.open) {
//               other.open = false;
//             }
//           });
//         }
//       });
//     });

//     window.__faqBound = true;
//   };

//   document.addEventListener("DOMContentLoaded", initFAQ);
//   document.addEventListener("layout:ready", initFAQ);
// })();

(function () {
  "use strict";
console.log("FAQ JS Loaded");
  const API_BASE = window.CONFIG?.API_BASE_URL || "http://localhost:5000";

  const fetchFAQ = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/faqs`);
      const data = await res.json();
      console.log(data);
      
      renderFAQ(data);

    } catch (error) {
      console.error("Error fetching FAQ:", error);
    }
  };

  const renderFAQ = (faqs) => {
    const container = document.getElementById("faq-container");
    if (!container) return;
    console.log("Rendering FAQs:", faqs);
    container.innerHTML = "";

    faqs.forEach((faq) => {
      const item = document.createElement("details");
      item.className = "faq-item reveal is-visible";

      item.innerHTML = `
        <summary>${faq.question}</summary>
        <p>${faq.answer}</p>
      `;

      container.appendChild(item);
    });

    initAccordion();
  };

  const initAccordion = () => {
    const items = document.querySelectorAll(".faq-item");

    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  };

  // IMPORTANT: wait for layout to finish
  document.addEventListener("DOMContentLoaded", fetchFAQ);
document.addEventListener("layout:ready", fetchFAQ);
})();