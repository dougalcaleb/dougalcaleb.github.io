// function forward() {
// 	let xhttp = new XMLHttpRequest();
// 	xhttp.onreadystatechange = function () {
// 		if (this.readyState == 4 && this.status == 200) {
// 			document.querySelector("body").innerHTML = this.responseText;
// 		}
// 	};
// 	xhttp.open("post", "ajax_info.txt", true);
// 	xhttp.send();
// }

let form = document.getElementById("my-form");

async function handleSubmit(event) {
   event.preventDefault();
   console.log("Handling submit");
	let status = document.getElementById("my-form-status");
	let data = new FormData(event.target);
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
}


form.addEventListener("submit", handleSubmit);