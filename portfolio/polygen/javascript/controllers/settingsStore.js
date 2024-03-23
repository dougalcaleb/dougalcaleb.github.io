import Store from "./store.js";

export default class SettingsStore {
	constructor() { }
	
	#settings = {
		mode: "linear",
		rotation: 0,
		posx: 0.5,
		posy: 0.5,
		irad: 0,
		orad: 0.5,
		x: 1920,
		y: 1080,
		propFalloff: 4 
	};

	get mode() { return this.#settings.mode; }
	get rotation() { return this.#settings.rotation; }
	get posx() { return this.#settings.posx; }
	get posy() { return this.#settings.posy; }
	get irad() { return this.#settings.irad; }
	get orad() { return this.#settings.orad; }
	get x() { return this.#settings.x; }
	get y() { return this.#settings.y; }
	get propFalloff() { return this.#settings.propFalloff; }

	set mode(value) {
		if (value === "linear" || value === "radial") {
			if (this.#settings.mode === "image") {
				Store.Preview.baseCanvas.DrawGradient();
				Store.Preview.layers.forEach((layer, idx) => {
					if (idx != 0) {
						layer.canvas._canvasElement.height = this.#settings.y;
						layer.canvas._canvasElement.width = this.#settings.x;
						layer.Fill();
						layer.InitialPolygons();
					}
				});
			}
			this.#settings.mode = value;
			this.#RefreshAll();
		} else if (value === "image") {
			this.#settings.mode = value;
		}
	}
	set rotation(value) {
		this.#settings.rotation = value;
		this.#RefreshAll();
	}
	set posx(value) { 
		this.#settings.posx = value; 
		this.#RefreshAll();
	}
	set posy(value) { 
		this.#settings.posy = value; 
		this.#RefreshAll();
	}
	set irad(value) { 
		this.#settings.irad = value; 
		this.#RefreshAll();
	}
	set orad(value) { 
		this.#settings.orad = value; 
		this.#RefreshAll();
	}
	set x(value) {
		this.#settings.x = value;
		Store.Preview.layers.forEach((layer) => {
			layer.canvas._canvasElement.width = value;
		});
		Store.Preview.pixelRatio = this.#settings.x / Store.Preview.baseCanvas._canvasElement.offsetWidth;
		this.#RegenerateAll();
	}
	set y(value) {
		this.#settings.y = value;
		Store.Preview.layers.forEach((layer) => {
			layer.canvas._canvasElement.height = value;
		});
		Store.Preview.pixelRatio = this.#settings.x / Store.Preview.baseCanvas._canvasElement.offsetWidth;
		this.#RegenerateAll();
	}
	set propFalloff(value) { this.#settings.propFalloff = value; }

	setFromImg(x, y) {
		this.#settings.x = x;
		this.#settings.y = y;
		Store.Preview.pixelRatio = this.#settings.x / Store.Preview.baseCanvas._canvasElement.offsetWidth;
		this.#RegenerateAll();
	}

	#RefreshAll() {
		Store.Preview.layers.forEach((layer) => {
			layer.canvas.Draw();
		});
	}

	#RegenerateAll() {
		Store.Preview.baseCanvas.Draw();
		Store.Preview.layers.forEach((layer, idx) => {
			if (idx != 0) {
				layer.canvas._canvasElement.height = this.#settings.y;
				layer.canvas._canvasElement.width = this.#settings.x;
				layer.Fill();
				layer.InitialPolygons();
			}
		});
	}
}