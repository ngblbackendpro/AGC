(function(){
const API = 'http://localhost:5000';

window.AdminApp = window.AdminApp || {};
var app = window.AdminApp;

const termsForm = document.querySelector("#terms-form");

app.renderTermsTable =  async () => {
    try{
        const res = await fetch (`${API}/api/terms`);
        if(!res.ok){
            throw new Error('request failed');
        }

        const result = await res.json();
        const Terms = Array.isArray(result) ? result : result.data;

        const table = document.querySelector("#terms-table");
        if (!table) {
        console.error("Table not found");
        return;
        }
        if (!Array.isArray(Terms)) {
        table.innerHTML = `<tr><td colspan="3">Invalid data</td></tr>`;
        return;
        }
        table.innerHTML = Terms.map(
        (term) => `
        <tr>
          <td>${term.heading || ""}</td>
          <td>${term.summary || ""}</td>
          <td>
            <div class="actions">
              <button class="btn alt" data-id="${term._id}" data-action="edit">Edit</button>
              <button class="btn danger" data-id="${term._id}" data-action="delete">Delete</button>
            </div>
          </td>
        </tr>`
      )
      .join("");

        // termsForm.terms.value = Terms?.terms ?? 'Enter the Terms';
    } catch (error) {
        console.error(error)
        const table = document.querySelector("#terms-table");
        if (table) {
        table.innerHTML = `<tr><td colspan="3">Error loading data</td></tr>`;
        }
    }
};


termsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        heading: termsForm.heading.value,
        summary: termsForm.summary.value
    }
    if(!data.heading || !data.summary ){
        app.showToast('please insert data into the field');
        return;
    }
    try{
        if(termsForm.elements.id.value){
            await fetch(`${API}/api/terms/${termsForm.elements.id.value}`,{
                method: 'PUT',
                headers: {
                    "Content-type" : 'application/json'
                },
                body: JSON.stringify(data)
            })
        } else{
        const res = await fetch (`${API}/api/terms`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!res.ok){
            const err = await res.json();
            throw new Error(err.message || 'Failed to update the fields');
        }
    }
        app.renderTermsTable();
        app.showToast('Terms updated successfully');
    
    } catch (error) {
        console.error(error);
    }
});


addEventListener('click', async (e) => {
    if (!e.target.closest('#terms-table')) return;
    const id = e.target.getAttribute('data-id');
    const action = e.target.getAttribute('data-action');

    if(!id) return;
    if(action === 'delete') {
        const doConfirm = confirm('Are you sure you want to delete this term')
        if(!doConfirm) return;

        await fetch(`${API}/api/terms/${id}`, {
            method: 'DELETE'
        });
        app.renderTermsTable();
        app.showToast('term has deleted')
    }
    if(action === 'edit'){
        try{
            const res = await fetch(`${API}/api/terms`);
            if(!res){
                throw new Error('req failed');
            }
            const Terms = await res.json();
            const term = Terms.find(b => b._id === id);
            if(!id) return;
            termsForm.elements.id.value = term._id;
            termsForm.heading.value = term.heading;
            termsForm.summary.value = term.summary;
        } catch (error) {
            console.error(error);
        }
    };
    
});

app.renderTermsTable();

})();