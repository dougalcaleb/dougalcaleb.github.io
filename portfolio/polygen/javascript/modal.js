"use strict"

// Create an async modal
export class Modals {
	constructor() {
		this.modalEl = null;
		this.colors = [];
	}

	// Allows waiting for a modal to return a color palette
	async modal(title, colors = ["#ffffff"]) {
		this.colors = colors;
		return new Promise((resolve, reject) => {
			this.modalEl = document.createElement("DIV");
			this.modalEl.classList.add("edit-modal-bg");
			this.modalEl.innerHTML = `<div class="edit-modal"><h1 class="modal-title">${title}</h1><div class="modal-colors-wrap"></div><div class="modal-color-add"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg></div><div class="modal-btn-wrap"><button class="modal-cancel">Cancel</button><button class="modal-save">Save</button></div></div>`;
			document.querySelector("body").appendChild(this.modalEl);
			document.querySelector(".modal-cancel").addEventListener("click", () => {
				resolve([]);
			});
			document.querySelector(".modal-save").addEventListener("click", () => {
				if (this.colors.length > 0 && this.colors.length < 15) {
					resolve(this.colors);
				} else {
					window.alert("There must be between 1 and 15 colors");
				}
			});
			document.querySelector(".modal-color-add").addEventListener("click", () => {
				let input = this.color(this.colors[this.colors.length - 1]);
				input.input.addEventListener("input", () => {
					let pos = Array.from(input.wrap.parentNode.children).indexOf(input.wrap);
					this.colors[pos] = input.input.value;
				});
				document.querySelector(".modal-colors-wrap").appendChild(input.wrap);
				this.recalcColors();
			});
			for (let a = 0; a < this.colors.length; a++) {
				let input = this.color(this.colors[a]);
				input.input.addEventListener("input", () => {
					let pos = Array.from(input.wrap.parentNode.children).indexOf(input.wrap);
					this.colors[pos] = input.input.value;
				});
				document.querySelector(".modal-colors-wrap").appendChild(input.wrap);
			}
		});
	}

	// Returns a new color palette box for the modal
	color(startColor) {
		// Create the color box
		let wrap = document.createElement("DIV");
		wrap.classList.add("modal-color");

		let input = document.createElement("INPUT");
		input.classList.add("modal-color-input");

		let controlsTop = document.createElement("DIV");
		controlsTop.classList.add("modal-color-controls-top");
		controlsTop.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg> <svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>`;

		let controlsBtm = document.createElement("DIV");
		controlsBtm.classList.add("modal-color-controls-bottom");
		controlsBtm.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;

		input.setAttribute("type", "color");
		input.value = startColor;
		wrap.style.background = startColor;
		input.addEventListener("input", () => {
			wrap.style.background = input.value;
		});
		wrap.appendChild(input);
		wrap.appendChild(controlsTop);
		wrap.appendChild(controlsBtm);

		// Event listeners for left and right movement buttons on colors
		controlsTop.children[0].addEventListener("click", () => {
			let pos = Array.from(wrap.parentNode.children).indexOf(wrap);
			let p = wrap.parentNode;
			wrap.parentElement.removeChild(wrap);
			p.insertBefore(wrap, p.childNodes[pos - 1]);
			this.recalcColors();
		});
		controlsTop.children[1].addEventListener("click", () => {
			let chArr = Array.from(wrap.parentNode.children);
			let pos = chArr.indexOf(wrap);
			if (pos == chArr.length - 1) {
				pos = -1;
			}
			let p = wrap.parentNode;
			wrap.parentElement.removeChild(wrap);
			p.insertBefore(wrap, p.childNodes[pos + 1]);
			this.recalcColors();
		});
		// Delete color
		controlsBtm.children[0].addEventListener("click", () => {
			wrap.parentElement.removeChild(wrap);
			this.recalcColors();
		});

		return {wrap: wrap, input: input};
	}

	// After color movement, make sure colors are in the right order
	recalcColors() {
		this.colors = [];
		for (let a = 0; a < document.querySelectorAll(".modal-color").length; a++) {
			this.colors.push(document.querySelectorAll(".modal-color-input")[a].value);
		}
	}

	// Destroy modal
	destroy() {
		this.modalEl.parentElement.removeChild(this.modalEl);
		this.modalEl = null;
		this.colors = [];
	}
}