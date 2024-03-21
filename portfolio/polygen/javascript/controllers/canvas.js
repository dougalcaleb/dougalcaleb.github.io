import Store from "./store.js";

export default class Canvas {
	index = null;
	ctx = null;

	_imgSrc = null;
	_imageData = null;
	_isBaseCanvas = false;
	_canvasElement = null;

	constructor(transparency = true, willReadFrequently = false) {
		this._canvasElement = document.createElement("canvas");;
		this._canvasElement.width = Store.settings.x;
		this._canvasElement.height = Store.settings.y;
		this._canvasElement.classList.add("main-canvas");
		this.index = Store.Preview.layers.length;
		if (this.index === 0) {
			this._canvasElement.id = "canvas-main";
		}
		document.querySelector(".preview").appendChild(this._canvasElement);

		this.ctx = this._canvasElement.getContext("2d", { alpha: transparency, willReadFrequently: willReadFrequently });
	}

	Draw() {

	}

	DrawImage(image) {
		if (!this._isBaseCanvas) {
			console.error("The canvas you are trying to draw on is not the base canvas. Please use the base canvas to draw images.");
			return;
		}
		const fr = new window.FileReader();
		fr.readAsDataURL(image);
		fr.onload = () => {
			const img = new Image();
			img.src = fr.result;
			img.onload = () => {
				this._canvasElement.width = img.width;
				this._canvasElement.height = img.height;
				document.querySelector(".image-height").value = img.height;
				document.querySelector(".image-width").value = img.width;
				Store.settings.x = img.width;
				Store.settings.y = img.height;
				this.imgSrc = img;
				this.ctx.drawImage(img, 0, 0);
				//! this.draw(true);
			};
		};
	}
}