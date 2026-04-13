(function (){


// const API = 'http://localhost:5000';
const API = "https://agc-arap.onrender.com";

window.AdminApp = window.AdminApp || {};
var app = window.AdminApp;

const statsForm = document.querySelector("#stats-form");

app.renderStatsForm = async (e) => {
  try{
    const res = await fetch (`${API}/api/home`);
    if(!res.ok) {
      throw new Error('request failed');
    }
    const Home = await res.json();
    statsForm.engagements.value = Home?.engagements ?? 'enter new value';
    statsForm.industries.value = Home?.industries ?? 'enter new value';
    statsForm.partners.value = Home?.partners ?? 'enter new value';

  } catch (error) {
    console.error(error);
  }
};


statsForm.addEventListener('submit', async (e)=> {
  e.preventDefault();
  
  const data = {
    engagements : statsForm.engagements.value,
    industries : statsForm.industries.value,
    partners : statsForm.partners.value
  }

  if(!data.engagements || !data.industries || !data.partners){
    app.showToast('All fields are required');
    return;
  }
  try{
    const res = await fetch (`${API}/api/home`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    });
    if(!res.ok){
      const err = await res.json();
      throw new Error(err.message || 'Failed to update Home Stats');
    }
    app.renderStatsForm();
    app.showToast('Home states are updated');
  } catch (error) {
      console.error(error);
  }
});

document.querySelector('#clear-stats-btn').addEventListener('click', async (e) => {
  try{
    const res = await fetch (`${API}/api/home`, {
      method: 'DELETE'
    });
    if(!res.ok) {
      throw new Error('Failed to clear Home elements');
    }
    app.renderStatsForm();
    app.showToast('Home elements cleared');
  } catch (error) {
    console.error(error);
  }
})


app.renderStatsForm();

})();