import Utils from "../modules/utility.js";
import Store from "./store.js";

export default class PreviewStore {
	constructor() { }

	layers = [];
	activePalette = null;
	activeLayerIndex = 1;
	allowRedraw = true;
	redrawTimeout = null;
	gradientData = null;

	#xAngles = null;
	#yAngles = null;

	get baseCanvas() {
		return this.layers[0].canvas;
	}
	get baseLayer() {
		return this.layers[0];
	}
	get activeLayer() {
		return this.layers[this.activeLayerIndex];
	}
	get xAngles() {
		if (this.#xAngles === null) {
			this.setAngles();
		}
		return this.#xAngles;
	}
	get yAngles() {
		if (this.#yAngles === null) {
			this.setAngles();
		}
		return this.#yAngles;
	}

	SelectPalette(index) {
		this.activePalette = Store.palettes[index];
		this.RedrawAll();
	}

	SelectLayer(index) {
		this.activeLayerIndex = index;
	}

	RedrawAll() {
		this.layers.forEach((layer) => {
			layer.canvas.Draw();
		});
	}

	Redraw(index) {
		this.layers[index].canvas.Draw();
	}

	setAngles() {
		this.#xAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.x / Store.settings.y));
		this.#yAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.y / Store.settings.x));
	}
}