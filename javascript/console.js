document.addEventListener("keydown", (e) => {
   if (e.key == "~") {
      let cons = document.createElement("input");
      cons.classList.add("console");
      document.body.appendChild(cons);
      cons.value = "";
      cons.focus();
      cons.addEventListener("keydown", (ev) => {
         if (ev.key == "Enter") {
            switch (cons.value) {
               case "enable-mail-proto":
                  document.querySelector(".contact").innerHTML = `<form id="my-form" action="https://formspree.io/f/xjvjbkbo" method="POST">
						<label>Email:</label>
						<input type="email" name="email" />
						<label>Message:</label>
						<input type="text" name="message" />
						<button id="my-form-button">Submit</button>
						<p id="my-form-status"></p>
					</form>`;
            }
            cons.value = "";
         }
      });
   }
});