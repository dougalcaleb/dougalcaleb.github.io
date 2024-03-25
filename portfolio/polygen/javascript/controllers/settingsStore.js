import Store from "./store.js";

export default class SettingsStore {
	constructor() { }
	
	#settings = {
		mode: "linear",
		x: 1920,
		y: 1080,
		propFalloff: 4 
	};

	get mode() { return this.#settings.mode; }
	get x() { return this.#settings.x; }
	get y() { return this.#settings.y; }
	get propFalloff() { return this.#settings.propFalloff; }

	set mode(value) {
		if (value === "linear" || value === "radial") {
			Store.Preview.activeLayer.settings.type = value;
			this.#settings.mode = value;
		} else if (value === "image") {
			this.#settings.mode = value;
		}
	}
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
	set propFalloff(value) { this.#settings.propFalloff = value; }

	setFromImg(x, y) {
		this.#settings.x = x;
		this.#settings.y = y;
		Store.Preview.pixelRatio = this.#settings.x / Store.Preview.baseCanvas._canvasElement.offsetWidth;
		this.#RegenerateAll();
	}

	#RegenerateAll() {
		Store.Preview.layers.forEach((layer, idx) => {
			layer.canvas._canvasElement.height = this.#settings.y;
			layer.canvas._canvasElement.width = this.#settings.x;
			layer.refCanvas._canvasElement.height = this.#settings.y;
			layer.refCanvas._canvasElement.width = this.#settings.x;
			layer.DrawReference();
			layer.Fill();
			layer.InitialPolygons();
		});
	}
}