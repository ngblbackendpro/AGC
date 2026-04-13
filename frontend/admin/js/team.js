( function (){
  const API = 'http://localhost:5000'
window.AdminApp = window.AdminApp || {};
var app = window.AdminApp;

const teamForm = document.querySelector("#team-form");

app.renderTeamTable = async () => {
  try {
    const res = await fetch(`${API}/api/teams`);
    if(!res.ok){
      throw new Error('Request Failed');
    }

    const teams = await res.json();
    const table = document.querySelector("#team-table");
    table.innerHTML = teams.map(
      (member) => `
      <tr>
        <td><img class="team-thumb" src="${member.photo}" alt="${member.name}" loading="lazy" /></td>
        <td>${member.name}</td>
        <td>${member.designation}</td>
        <td>
          <div class="actions">
            <button class="btn alt" data-id="${member._id}" data-action="edit">Edit</button>
            <button class="btn danger" data-id="${member._id}" data-action="delete">Delete</button>
          </div>
        </td>
      </tr>`
    )
    .join("");
  } catch (error) {
    console.error(error);
  }
}


/////////////  updating teams starts  ///////////////

teamForm.addEventListener('submit', async (e)=>{
  e.preventDefault();

  const formData = new FormData();

  formData.append('name', teamForm.name.value);
  formData.append('designation', teamForm.designation.value);
  formData.append('role', teamForm.role.value);
  formData.append('expertise', teamForm.expertise.value);
  formData.append('background', teamForm.background.value);
  formData.append('qualifications', teamForm.qualifications.value);
  formData.append('personal', teamForm.personal.value);

  if(teamForm.photoFile && teamForm.photoFile.files[0]) {
    formData.append('photo', teamForm.photoFile.files[0]);
  }

  try{
    if(teamForm.elements.id.value){
      await fetch(`${API}/api/teams/${teamForm.elements.id.value}`, {
        method: 'PUT',
        body: formData
      });
    } else {
      await fetch(`${API}/api/teams`, {
        method: 'POST',
        body: formData
      });
    }

    teamForm.reset();
    teamForm.elements.id.value = '';
    app.renderTeamTable();
    app.showToast('Member added successfully');

  } catch (error) {
    console.error(error);
  }

})

/////////////  updating teams ends  ///////////////



/////////////  deleting and editing teams starts  ///////////////

document.addEventListener('click', async (e) => {
  if (!e.target.closest('#team-table')) return;
  const id = e.target.getAttribute('data-id')
  const action = e.target.getAttribute('data-action')

  if(!id) return;

  if(action === 'delete') {
    e.stopPropagation();
    const confirmDelete = confirm("Are you sure you want to delete this member?");
    if(!confirmDelete) return;

    await fetch(`${API}/api/teams/${id}`,{
      method: 'DELETE'
    });
    app.renderTeamTable();
    app.showToast('Member deleted successfully')
  }

  if(action === 'edit') {
    const res = await fetch(`${API}/api/teams`);
    if(!res.ok){
      throw new Error('request failed');
    }
    const teams = await res.json();
    const team = teams.find(b => b._id === id);
    if(!team) return;

    teamForm.elements.id.value = team._id;
    teamForm.name.value = team.name;
    teamForm.designation.value = team.designation;
    teamForm.role.value = team.role;
    teamForm.expertise.value = team.expertise;
    teamForm.background.value = team.background;
    teamForm.qualifications.value = team.qualifications;
    teamForm.personal.value = team.personal

  }
})

/////////////  deleting and editing teams ends  ///////////////

document.querySelector("#team-form-reset").addEventListener("click", () => {
  teamForm.reset();
  teamForm.elements.id.value = "";
  app.showToast("Team member edit cancelled.", "ok");
});

app.renderTeamTable();

})();