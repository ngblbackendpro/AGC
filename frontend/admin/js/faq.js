(function (){

const API = 'http://localhost:5000'
window.AdminApp = window.AdminApp || {};
var app = window.AdminApp;

const faqForm = document.querySelector("#faq-form");

app.renderFaqTable = async (e) => {
  try{
    const res = await fetch(`${API}/api/faqs`);
    if(!res.ok){
      throw new Error('request failed');
    }
      const Faqs = await res.json();
      const table = document.querySelector("#faq-table");   
      table.innerHTML = Faqs.map(
        (faq) => `
        <tr>
          <td>${faq.question}</td>
          <td>
            <div class="actions">
              <button class="btn alt" data-id="${faq._id}" data-action="edit">Edit</button>
              <button class="btn danger" data-id="${faq._id}" data-action="delete">Delete</button>
            </div>
          </td>
        </tr>`
      )
      .join("");
    
  } catch (error) {
    console.error(error);
  }
};


faqForm.addEventListener('submit', async (e)=> {
  e.preventDefault();

  const data = {
    question: faqForm.question.value,
    answer: faqForm.answer.value
  }
  try{
    if(faqForm.elements.id.value){
      await fetch(`${API}/api/faqs/${faqForm.elements.id.value}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } else {
      await fetch(`${API}/api/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }
    faqForm.reset();
    faqForm.elements.id.value = '';
    app.renderFaqTable();
    app.showToast('Faq added');

  } catch (error) {
    console.error(error);
  }
});




document.addEventListener('click', async (e) => {
  if (!e.target.closest('#faq-table')) return;
  const id = e.target.getAttribute('data-id');
  const action = e.target.getAttribute('data-action');

  if(!id) return;

  if(action === 'delete'){
    const doConfirm = confirm('Are you sure you want to delete this faq');
    if(!doConfirm) return;
    await fetch(`${API}/api/faqs/${id}`,{
      method: 'DELETE'
    });
    app.renderFaqTable();
    app.showToast('Faq deleted')
  }

  if(action === 'edit') {
    try{
      const res = await fetch (`${API}/api/faqs`);
      if(!res.ok){
        throw new Error('request failed');
      }
      const Faqs = await res.json();
      const faq = Faqs.find(b => b._id === id);
      if(!faq) return;
      faqForm.elements.id.value = faq._id;
      faqForm.question.value = faq.question;
      faqForm.answer.value = faq.answer;
    } catch (error) {
      console.error(error);
    }
  }
});



document.querySelector("#faq-form-reset").addEventListener("click", () => {
  faqForm.reset();
  faqForm.elements.id.value = "";
  app.showToast("FAQ edit cancelled.", "ok");
});


app.renderFaqTable();

})();