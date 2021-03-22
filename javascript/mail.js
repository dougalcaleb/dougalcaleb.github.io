let form = document.getElementById("mail-form");
let cooldown = 8.64e+7;

if (!localStorage.getItem("m-c")) {
   localStorage.setItem("m-c", 0);
}

async function handleSubmit(event) {
	event.preventDefault();
	let status = document.getElementById("form-status");
   let data = new FormData(event.target);
   if (
      document.querySelector(".reply-to").value != "" &&
      document.querySelector(".mail-subject").value != "" &&
      document.querySelector(".mail-message").value != ""
   ) {
      if (Date.now() - localStorage.getItem("m-c") > cooldown) {
         localStorage.setItem("m-c", Date.now());
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
         status.innerHTML = "You cannot send more than 1 email per day";
      }
   } else {
      status.innerHTML = "Please fill out all fields";
   }
}

form.addEventListener("submit", handleSubmit);