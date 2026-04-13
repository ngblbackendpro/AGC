(function(){

  const API = 'http://localhost:5000';

window.AdminApp = window.AdminApp || {};
var app = window.AdminApp;

const contactForm = document.querySelector("#contact-form");

app.renderContactForm = async (e) => {
  try{
    const res = await fetch(`${API}/api/contacts`);
    if(!res.ok){
      throw new Error('request failed');
    }
    const contacts = await res.json();
    contactForm.location.value = contacts.location || "enter new value";
    contactForm.email.value = contacts.email || "enter new value";
    contactForm.phone.value = contacts.phone || "enter new value";
  } catch (error) {
    console.error(error);
  }
};




contactForm.addEventListener('submit', async(e)=> {
  e.preventDefault();
  const data = {
    location: contactForm.location.value,
    email: contactForm.email.value,
    phone: contactForm.phone.value
  }

  if(!data.location || !data.email || !data.phone){
    app.showToast('All fields are required') || alert('all fields are requried');
    return;
  }

  try{
    const res  = await fetch(`${API}/api/contacts`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    });

    if(!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to update contact');
    }

    app.renderContactForm();
    app.showToast('Contact Updated');
  } catch (error) {
    console.error(error);
  }
});

document.querySelector("#clear-contact-btn").addEventListener('click', async (e)=> {
  try{
    const res = await fetch(`${API}/api/contacts`, {
      method: 'DELETE'
    });
    if(!res.ok) {
      throw new Error('Failed to clear Contacts');
    }

    app.renderContactForm();
    app.showToast('Contact cleared');

  } catch (error) {
    console.error(error);
  }
});


document.querySelector("#clear-contact-btn").addEventListener("click", () => {
  app.siteData.contact = { location: "", email: "", phone: "" };
  app.persist("Contact info cleared.");
});

app.renderContactForm();
})();