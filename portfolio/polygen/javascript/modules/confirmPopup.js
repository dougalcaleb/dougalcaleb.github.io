import Draggable from "./draggable.js";

export default class ConfirmPopup {
	#defaults = {
		position: null,
		title: "Confirm",
		body: "Are you sure?",
		cancelText: "Cancel",
		okText: "Continue",
	};
	#resolve = null;
	#reject = null;
	#abortController = new AbortController();

	constructor(options = this.#defaults) {
		const settings = Object.assign(this.#defaults, options);

		this.value = new Promise((resolve, reject) => {
			this.#resolve = resolve;
			this.#reject = reject;
		});

		this.template = document.getElementById("confirm-popup").content.children[0].cloneNode(true);
		this.template.querySelector(".popup-title-text").innerText = settings.title;
		this.template.querySelector(".popup-body-text").innerText = settings.body;
		this.template.querySelector(".popup-cancel").innerText = settings.cancelText;
		this.template.querySelector(".popup-save").innerText = settings.okText;

		document.body.appendChild(this.template);
		
		this.dragHandler = new Draggable(this.template.querySelector(".popup-title"), this.template.querySelector(".popup"));

		this.#setPosition(settings.position);
		
		this.template.querySelector(".popup-cancel").addEventListener("click", () => {
			this.#reject(false);
			this.destroy();
		}, { signal: this.#abortController.signal });
		this.template.querySelector(".popup-save").addEventListener("click", () => {
			this.#resolve(true);
			this.destroy();
		}, { signal: this.#abortController.signal });
		this.template.querySelector(".popup-close").addEventListener("click", () => {
			this.#reject(false);
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
		rootEl.parentElement.removeChild(rootEl);
	}
}