import Utils from "../modules/utility.js";
import Store from "./store.js";
import Stack from "../models/Stack.js";
import LayerState from "../models/LayerState.js";
import Layer from "../models/Layer.js";
import UI from "./ui.js";
import Editor from "./editor.js";

export default class PreviewStore {
	constructor() {}

	layers = [];
	layerMap = {};
	activePalette = null;
	activeLayerIndex = 0;
	allowRedraw = true;
	redrawTimeout = null;
	gradientData = null;
	imageData = null;
	pixelRatio = 1;
	overlayLayer = null;

	#xAngles = null;
	#yAngles = null;
	#undoStack = new Stack();
	#usingImgCount = 0;

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
	get usingImgCount() {
		return this.#usingImgCount;
	}
	set usingImgCount(value) {
		this.#usingImgCount = value;
		if (value) {
			document.querySelectorAll(".image-dimensions").forEach((el) => {
				el.disabled = true;
			});
		} else {
			document.querySelectorAll(".image-dimensions").forEach((el) => {
				el.disabled = false;
			});
		}
	}

	SelectPalette(index) {
		this.activeLayer.settings.gradient = Store.palettes[index];
		this.activeLayer.settings.gradientIndex = index;
	}

	SelectLayer(identifier) {
		if (typeof identifier === "string") {
			this.activeLayerIndex = this.layerMap[identifier].index;
		} else if (typeof identifier === "number") {
			this.activeLayerIndex = identifier;
		}
		document.querySelector(".layer-selected")?.classList.remove("layer-selected");
		this.activeLayer.uiElement.classList.add("layer-selected");
		UI.SetUIToLayer(this.activeLayer);
		Editor.RefreshSaved();
		if (this.#usingImgCount === 0) {
			this.pixelRatio = Store.settings.x / this.layers[0].canvas._canvasElement.offsetWidth;
		}
	}

	RemoveLayer(identifier) {
		if (typeof identifier === "string") {
			this.layerMap[identifier].Delete();
			this.layers.splice(this.layerMap[identifier].index, 1);
			delete this.layerMap[identifier];
		} else if (typeof identifier === "number") {
			this.layers[identifier].Delete();
			delete this.layerMap[this.layers[identifier].id];
			this.layers.splice(identifier, 1);
		}
		this.layers.forEach((layer, idx) => {
			layer.index = idx;
		});
		this.SelectLayer(this.layers.length - 1);
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

	NewLayer() {
		const layer = new Layer();
		layer.DrawReference();
		layer.Fill();
		layer.InitialPolygons();
		this.layers.push(layer);
		this.layerMap[layer.id] = layer;
		return layer;
	}

	AddLayer(layer) {
		this.layers.push(layer);
		this.layerMap[layer.id] = layer;
	}

	setAngles() {
		this.#xAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.x / Store.settings.y));
		this.#yAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.y / Store.settings.x));
	}
}