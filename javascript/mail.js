let form = document.getElementById("mail-form");

async function handleSubmit(event) {
	event.preventDefault();
	let status = document.getElementById("form-status");
   let data = new FormData(event.target);
   if (
      document.querySelector(".reply-to").value != "" &&
      document.querySelector(".mail-subject").value != "" &&
      document.querySelector(".mail-message").value != ""
   ) {
      fetch(event.target.action, {
         method: form.method,
         body: data,
         headers: {
            Accept: "application/json",
         },
      })
         .then((response) => {
            status.innerHTML = "Thanks for your submission!";
            form.reset();
         })
         .catch((error) => {
            status.innerHTML = "Oops! There was a problem submitting your form";
         });
   } else {
      status.innerHTML = "Please fill out all fields";
   }
	
}

form.addEventListener("submit", handleSubmit);