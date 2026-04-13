(function (){

	const API = window.CONFIG.API_BASE_URL

const loadContactInfo = async ()=> {
	try{
		const res = await fetch(`${API}/api/contacts`);
		if(!res.ok){
			const err = await res.json();
			throw new Error(err.message || 'Failed to fatch data');
		}
		const data = await res.json();

		const location = document.getElementById('contact-location');
		location.textContent = data.location || 'N/A';

		const newEmail = document.getElementById('contact-email');
		newEmail.textContent = data.email || 'N/A';
		newEmail.href = `mailto:${data.email}`;

		const newPhone = document.getElementById('contact-phone');
		newPhone.textContent = data.phone || 'N/A';
		newPhone.href = `tel:${data.phone}`;
	} catch (error) {
		console.error(error);
	}
}

function handleFormSubmit(){
	const form = document.querySelector('.contact-form');
	const successE1 = document.querySelector('.form-success');

	if(!form) return;

	form.addEventListener('submit', async (e)=>{
		e.preventDefault();
		const formData = {
			name: form.name.value,
			email: form.email.value,
			company: form.email.value,
			message: form.email.value
		}
		if(!formData.name || !formData.email || !formData.message) {
			alert('please fill the required fields');
		}
		try{
			const res = await fetch (`${API}/api/inquiry`,{
				method: 'POST',
				headers: {
					'Content-Type' : 'application/json'
				},
				body: JSON.stringify(formData)
			});
			if(!res.ok){
				const err = await res.json();
				throw new Error(err.message || 'Failed to send message');
			}
			successE1.textContent = "✅ Message sent successfully!";
			form.reset();
		} catch (error) {
			console.error(error);
			successE1.textContent = "❌ Failed to send message";
		}
	});
}


  document.addEventListener("DOMContentLoaded", () => {
    loadContactInfo();
    handleFormSubmit();
  });

})();
