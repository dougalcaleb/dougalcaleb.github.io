import Utils from "../modules/utility.js";
import Store from "./store.js";
import Stack from "../models/Stack.js";
import LayerState from "../models/LayerState.js";

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
	#undoStack = new Stack();

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

	Undo() {
		if (this.#undoStack.length === 0) {
			return;
		}
		const layerState = this.#undoStack.Pop();
		this.SelectLayer(layerState.index);
		this.activeLayer.DrawFromState(layerState);
	}

	AddUndoState(index) {
		this.#undoStack.Push(new LayerState(this.layers[index]));
	}

	setAngles() {
		this.#xAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.x / Store.settings.y));
		this.#yAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.y / Store.settings.x));
	}
}