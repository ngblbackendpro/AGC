(function () {
  "use strict";

  
  const API_BASE = window.CONFIG.API_BASE_URL

const fetchPrivacy = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/privacy`);
    const data = await res.json();


    const el = document.getElementById("section-privacy-text");
    if (!el) return;

    // if backend has data
    if (data && data.privacy) {
      el.innerHTML = data.privacy;
    } else {
      el.innerHTML =
        "Loading...";
    }

  } catch (error) {
    console.error("Error fetching privacy:", error);
  }
};


const initPrivacy = () => {
  if (window.__privacyInit) return;

  fetchPrivacy();   // ✅ ADD THIS
 

  window.__privacyInit = true;
};
window.onload = initPrivacy;
})();