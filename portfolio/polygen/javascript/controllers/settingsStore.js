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
	#pendingSettings = {};
	#pendingActions = [];
	#waitForManualUpdate = false;

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
		if (this.#waitForManualUpdate) {
			if (value == "image" && this.#settings.mode != "image") {
				this.#pendingSettings.x = Store.Preview.layers[0].canvas._imgSrc.width;
				this.#pendingSettings.y = Store.Preview.layers[0].canvas._imgSrc.height;
			} else {
				this.#pendingActions.push(Store.Preview.setAngles);
			}
			this.#pendingSettings.mode = value;
		} else {
			if (value == "image" && this.#settings.mode != "image") {
				this.#settings.x = Store.Preview.layers[0].canvas._imgSrc.width;
				this.#settings.y = Store.Preview.layers[0].canvas._imgSrc.height;
			} else if (value != "image") {
				Store.Preview.setAngles();
			}
			this.#settings.mode = value;
			this.#RefreshAll();
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
		this.#RefreshAll();
	}
	set y(value) {
		this.#settings.y = value;
		Store.Preview.layers.forEach((layer) => {
			layer.canvas._canvasElement.height = value;
		});
		this.#RefreshAll();
	}
	set propFalloff(value) { this.#settings.propFalloff = value; }

	waitForManualUpdate() {
		this.#waitForManualUpdate = true;
	}

	manualUpdate() {
		this.#waitForManualUpdate = false;
		for (const key in this.#pendingSettings) {
			this.#settings[key] = this.#pendingSettings[key];
		}
		this.#pendingActions.forEach(action => action());
		this.#pendingSettings = {};
		this.#pendingActions = [];
	}

	#RefreshAll() {
		Store.Preview.layers.forEach((layer) => {
			layer.canvas.Draw();
		});
	}
}