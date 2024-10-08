import Store from "./store.js";
import Editor from "./editor.js";

export default class SettingsStore {
	constructor() { }
	
	#settings = {
		x: 1920,
		y: 1080,
	};

	get x() { return this.#settings.x; }
	get y() { return this.#settings.y; }

	set x(value) {
		this.#settings.x = value;
		Store.Preview.layers.forEach((layer) => {
			layer.canvas._canvasElement.width = value;
		});
		Store.Preview.pixelRatio = this.#settings.x / Store.Preview.layers[0].canvas._canvasElement.offsetWidth;
		this.#RegenerateAll();
	}
	set y(value) {
		this.#settings.y = value;
		Store.Preview.layers.forEach((layer) => {
			layer.canvas._canvasElement.height = value;
		});
		Store.Preview.pixelRatio = this.#settings.x /  Store.Preview.layers[0].canvas._canvasElement.offsetWidth;
		this.#RegenerateAll();
	}

	setFromImg(x, y) {
		this.#settings.x = x;
		this.#settings.y = y;
		Store.Preview.overlayLayer.canvas._canvasElement.width = x;
		Store.Preview.overlayLayer.canvas._canvasElement.height = y;
		Store.Preview.pixelRatio = this.#settings.x / Store.Preview.overlayLayer.canvas._canvasElement.offsetWidth;
		console.log(Store.Preview.overlayLayer.canvas._canvasElement.offsetWidth);
		console.log(Store.Preview.pixelRatio);
		this.#RegenerateAll();
		Editor.RefreshSaved();
	}

	#RegenerateAll() {
		Store.Preview.layers.forEach((layer, idx) => {
			layer.canvas._canvasElement.height = this.#settings.y;
			layer.canvas._canvasElement.width = this.#settings.x;
			layer.refCanvas._canvasElement.height = this.#settings.y;
			layer.refCanvas._canvasElement.width = this.#settings.x;
			if (layer.settings.type != "image") {
				layer.DrawReference();
				layer.Fill();
				layer.InitialPolygons();
			}
		});
	}
}