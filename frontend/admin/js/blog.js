(function () {

const API = "http://localhost:5000";

window.AdminApp = window.AdminApp || {};
var app = window.AdminApp;



const blogForm = document.querySelector("#blog-form");


/////////////////  showing all blogs starts /////////////

app.renderBlogTable = async () => {
  try{
    const res = await fetch(`${API}/api/blogs`);
    if (!res.ok) {
      throw new Error("Request failed");
    }
    const blogs = await res.json();
    const table = document.querySelector("#blogs-table");
    table.innerHTML = blogs.map((blog)=> `
      <tr>
        <td><img class="team-thumb" src="${blog.image}" alt="${blog.title}" loading="lazy" /></td>
        <td>${blog.date ? blog.date.split('T')[0] : ''}</td>
        <td>${blog.title}</td>
        <td><span class="badge">${blog.category}</span></td>
        <td>
          <div class="actions">
            <button class="btn alt" data-id="${blog._id}" data-action="edit">Edit</button>
            <button class="btn danger" data-id="${blog._id}" data-action="delete">Delete</button>
          </div>
        </td>
      </tr>`).join('')

  } catch (error) {
    console.error(error);
  }
};

/////////////////  showing all blogs ends /////////////


/////////////////  updating blogs starts /////////////


blogForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append('title', blogForm.title.value);
  formData.append('description', blogForm.description.value);
  formData.append('category', blogForm.category.value);
  formData.append('date', blogForm.date.value);

  const fileInput = blogForm.querySelector('[name="imageFile"]');

  if(fileInput.files[0]) {
    formData.append('image', fileInput.files[0]);
  }

  try{
    if(blogForm.elements.id.value){
      await fetch(`${API}/api/blogs/${blogForm.elements.id.value}`,{
        method: 'PUT',
        body: formData
      });
    } else {
      await fetch (`${API}/api/blogs`, {
        method: 'POST',
        body: formData
      });
    }
    blogForm.reset();
    blogForm.elements.id.value = "";
    
    app.renderBlogTable();
    app.showToast("Blog saved successfully");

  } catch (error) {
    console.error(error);
  }

});


/////////////////  updating blogs ends /////////////



/////////////////  deleting and editing blogs starts /////////////

document.addEventListener('click', async (e) => {
  if (!e.target.closest('#blogs-table')) return;

  const id = e.target.getAttribute('data-id');
  const action = e.target.getAttribute('data-action')

  if(!id) return;

  if(action === 'delete') {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    await fetch(`${API}/api/blogs/${id}`, {
      method: 'DELETE'
    });
    app.renderBlogTable();
    app.showToast("Blog deleted successfully");
  }

  if(action === 'edit') {
    const res = await fetch(`${API}/api/blogs`);
    if (!res.ok) {
      throw new Error("Request failed");
    }
    const blogs = await res.json();

    const blog = blogs.find(b => b._id === id);

    if(!blog) return;

    blogForm.elements.id.value = blog._id;
    blogForm.title.value = blog.title;
    blogForm.description.value = blog.description;
    blogForm.category.value = blog.category;
    blogForm.date.value = blog.date?.split('T')[0] 
  }

});

/////////////////  deleting and editing blogs ends /////////////


document.querySelector("#blog-form-reset").addEventListener("click", () => {
  blogForm.reset();
  blogForm.elements.id.value = "";
  app.showToast("Blog edit cancelled.", "ok");
});

app.renderBlogTable();

})();