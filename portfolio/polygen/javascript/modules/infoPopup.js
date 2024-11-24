import Draggable from "./draggable.js";

export default class ConfirmPopup {
	#defaults = {
		position: null,
		title: "Info",
		body: null,
		okText: "OK",
	};
	#abortController = new AbortController();

	constructor(options = this.#defaults) {
		const settings = Object.assign(this.#defaults, options);

		this.template = document.getElementById("confirm-popup").content.children[0].cloneNode(true);
		this.template.querySelector(".popup").classList.add("info-popup");
		this.template.querySelector(".popup-title-text").innerText = settings.title;
		this.template.querySelector(".popup-body-text").innerHTML = settings.body;
		this.template.querySelector(".popup-cancel").remove();
		this.template.querySelector(".popup-save").innerText = settings.okText;

		document.body.appendChild(this.template);
		
		this.dragHandler = new Draggable(this.template.querySelector(".popup-title"), this.template.querySelector(".popup"));

		this.#setPosition(settings.position);
		
		this.template.querySelector(".popup-save").addEventListener("click", () => {
			this.destroy();
		}, { signal: this.#abortController.signal });
		this.template.querySelector(".popup-close").addEventListener("click", () => {
			this.destroy();
		}, { signal: this.#abortController.signal });
	}

	#setPosition(pos) {
		let popupHeight = this.template.querySelector(".popup").offsetHeight;
		let popupWidth = this.template.querySelector(".popup").offsetWidth;
		if (pos == null) {
			pos = {
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				centerX: true,
				centerY: true,
			};
		}
		if (pos.centerX) {
			pos.x -= popupWidth / 2;
		}
		if (pos.centerY) {
			pos.y -= popupHeight / 2;
		}
		if (pos.y + popupHeight > window.innerHeight) {
			pos.y = window.innerHeight - popupHeight;
		}
		this.template.querySelector(".popup").style.transform = `translate(${pos.x}px, ${pos.y}px)`;
	}

	// Destroy the popup
	destroy() {
		this.#abortController.abort();
		this.dragHandler.destroy();
		let rootEl = document.querySelector(".popup-bg");
		rootEl.remove();
	}
}