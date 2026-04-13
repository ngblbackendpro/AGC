(function (){

  const API = 'http://localhost:5000'
window.AdminApp = window.AdminApp || {};
var app = window.AdminApp;

const socialForm = document.querySelector("#social-form");


app.renderSocialForm = async (e) => {
  try{
    const res = await fetch (`${API}/api/social`);
    if(!res.ok) {
      throw new Error('request failed');
    }
    const Social = await res.json();

    socialForm.linkedin.value = Social?.linkedin ?? 'enter new value';
    socialForm.instagram.value = Social?.instagram ?? 'enter new value';
    socialForm.facebook.value = Social?.facebook ?? 'enter new value';
  } catch (error) {
    console.error(error);
  }
}

socialForm.addEventListener('submit', async (e) => {
  e.preventDefault();
    const data = {
      linkedin: socialForm.linkedin.value,
      instagram: socialForm.instagram.value,
      facebook:  socialForm.facebook.value
    }

    if(!data.linkedin || !data.instagram || !data.facebook){
      app.showToast('All fields are required');
      return;
    }

    try{
      const res = await fetch (`${API}/api/social`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if(!res.ok){
        const err = await res.json();
        throw new Error(err.message || 'failed to update the social fields');
      }
      app.renderSocialForm();
      app.showToast('Social links updated successfully');
    } catch (error) {
      console.error(error);
    }
});

document.querySelector('#clear-social-btn').addEventListener('click', async (e)=> {
  try{
    const res = await fetch (`${API}/api/social`,{
      method: 'DELETE'
    });
    if(!res.ok){
      const err = await res.json();
      throw new Error(err.message || 'failed to clear social links')
    }
    app.renderSocialForm();
    app.showToast('Social links cleared');
  } catch (error) {
    console.error(error);
  }
});


app.renderSocialForm();
})();