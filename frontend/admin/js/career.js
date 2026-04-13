(function () {
  const API = "http://localhost:5000";
window.AdminApp = window.AdminApp || {};
const app = window.AdminApp;

const careerForm = document.querySelector("#career-form");

////////////////////////  render career end  /////////////////////////


app.renderCareerTable = async () => {
  try{
    const res = await fetch(`${API}/api/careers`);
    if(!res.ok){
      throw new Error('Request Failed');
    }
    const careers = await res.json();
    const table = document.querySelector("#careers-table");
    table.innerHTML = careers.map(
      (job) => `
      <tr>
        <td>${job.title}</td>
        <td><span class="badge">${job.type}</span></td>
        <td>${job.mode}</td>
        <td>
          <div class="actions">
            <button class="btn alt" data-id="${job._id}" data-action="edit">Edit</button>
            <button class="btn danger" data-id="${job._id}" data-action="delete">Delete</button>
          </div>
        </td>
      </tr>`
    )
    .join("");

  } catch (error) {
    console.error(error);
  }
}

////////////////////////  render career end  /////////////////////////


////////////////////////  updating career starts  /////////////////////////

careerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();

 

  const data = {
    title: careerForm.title.value,
    type: careerForm.type.value,
    mode: careerForm.mode.value,
    description: careerForm.description.value,
    applyLink: careerForm.applyLink.value
  }
  try{
    if(careerForm.elements.id.value){
      await fetch (`${API}/api/careers/${careerForm.elements.id.value}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } else {
      await fetch (`${API}/api/careers`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }
    careerForm.reset();
    careerForm.elements.id.value = '';

    app.renderCareerTable();
    app.showToast('Career added successfully');
  } catch (error) {
    console.error(error);
  } 
});



////////////////////////  updating career end  /////////////////////////


////////////////////////  deleting and edit career starts  /////////////////////////

document.addEventListener('click', async (e) => {

  if (!e.target.closest('#careers-table')) return;
  const id = e.target.getAttribute('data-id');
  const action = e.target.getAttribute('data-action');

  if(!id) return;
  if(action === 'delete') {
    const doConfirm = confirm("Are you sure you want to delete this Job");
    if(!doConfirm) return;
    await fetch (`${API}/api/careers/${id}`,{
      method: 'DELETE'
    });
    app.renderCareerTable();
    app.showToast('Job has deleted');
  }

  if(action === 'edit'){
    const res = await fetch(`${API}/api/careers`);
    if (!res.ok){
      throw new Error('Request Failed');
    }
    const careers = await res.json();
    const career = careers.find(b => b._id === id);
    if(!career) return;
    careerForm.elements.id.value = career._id;
    careerForm.title.value = career.title;
    careerForm.type.value = career.type;
    careerForm.mode.value = career.mode;
    careerForm.description.value = career.description;
    careerForm.applyLink.value = career.applyLink;
  }
})

////////////////////////  deleting and edit career end  /////////////////////////



document.querySelector("#career-form-reset").addEventListener("click", () => {
  careerForm.reset();
  careerForm.elements.id.value = "";
  app.showToast("Career edit cancelled.", "ok");
});

app.renderCareerTable();

})();