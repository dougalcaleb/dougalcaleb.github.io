import Defaults from "./internalDefaultStore.js";
import Utils from "../modules/utility.js";
import Store from "./store.js";

export default class PreviewStore {
	constructor() { }

	layers = [];
	activePalette = null;
	allowRedraw = true;
	redrawTimeout = null;
	gradientData = null;

	#xAngles = null;
	#yAngles = null;

	get baseCanvas() {
		return this.layers[0];
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

	RedrawAll() {
		this.layers.forEach((layer) => {
			layer.Draw();
		});
	}

	Redraw(index) {
		this.layers[index].Draw();
	}

	setAngles() {
		this.#xAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.x / Store.settings.y));
		this.#yAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.y / Store.settings.x));
	}
}