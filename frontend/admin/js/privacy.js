
(function () {
  // const API = 'http://localhost:5000';
  const API = "https://agc-arap.onrender.com";

  window.AdminApp = window.AdminApp || {};
  var app = window.AdminApp;

  let quill; // ✅ declare globally inside module

  document.addEventListener("admin:ready", () => {
    console.log("Admin Ready - Privacy Init");

    const privacyForm = document.querySelector("#privacy-form");
    const editor = document.querySelector("#editor");

    if (!privacyForm || !editor) return;

    // ✅ INIT QUILL HERE (after DOM ready)
    quill = new Quill('#editor', {
      theme: 'snow'
    });

    // ================= FETCH =================
    app.renderPrivacyForms = async () => {
      try {
        const res = await fetch(`${API}/api/privacy`);
        const Privacy = await res.json();

        quill.root.innerHTML = Privacy?.privacy || '';

      } catch (error) {
        console.error(error);
      }
    };

    // ================= SUBMIT =================
    privacyForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        privacy: quill.root.innerHTML
      };

      if (!data.privacy) {
        app.showToast('please fill the field first');
        return;
      }

      try {
        const res = await fetch(`${API}/api/privacy`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!res.ok) {
          app.showToast('Failed to update the privacy');
          return;
        }

        app.showToast('Privacy has Updated');
        app.renderPrivacyForms();

      } catch (error) {
        console.error(error);
      }
    });

    // ================= CLEAR =================
    document.querySelector('#clear-privacy-btn')?.addEventListener('click', async () => {
      try {
        const res = await fetch(`${API}/api/privacy`, {
          method: 'DELETE'
        });

        if (!res.ok) {
          app.showToast('Can not clear the privacies');
          return;
        }

        quill.root.innerHTML = '';
        app.showToast('Privacy has cleared now');

      } catch (error) {
        console.error(error);
      }
    });

    // ✅ CALL AFTER EVERYTHING READY
    app.renderPrivacyForms();
  });

})();