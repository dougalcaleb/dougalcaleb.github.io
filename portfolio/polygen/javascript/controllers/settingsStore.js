import Store from "./store.js";

export default class SettingsStore {
	constructor() { }
	
	#settings = {
		mode: "linear",
		vvar: 0.9,
		cellSize: 185,
		bvar: 0,
		bmode: "darken",
		rotation: 0,
		posx: 0.5,
		posy: 0.5,
		irad: 0,
		orad: 0.5,
		line: "#ffffff",
		lineOp: 0,
		edge: "varied",
		x: 1920,
		y: 1080,
		// colors: [],
		propFalloff: 4 
	};
	#pendingSettings = {};
	#pendingActions = [];
	#waitForManualUpdate = false;

	get mode() { return this.#settings.mode; }
	get vvar() { return this.#settings.vvar; }
	get cellSize() { return this.#settings.cellSize; }
	get bvar() { return this.#settings.bvar; }
	get bmode() { return this.#settings.bmode; }
	get rotation() { return this.#settings.rotation; }
	get posx() { return this.#settings.posx; }
	get posy() { return this.#settings.posy; }
	get irad() { return this.#settings.irad; }
	get orad() { return this.#settings.orad; }
	get line() { return this.#settings.line; }
	get lineOp() { return this.#settings.lineOp; }
	get edge() { return this.#settings.edge; }
	get x() { return this.#settings.x; }
	get y() { return this.#settings.y; }
	// get colors() { return this.#settings.colors; }
	get propFalloff() { return this.#settings.propFalloff; }

	set mode(value) {
		if (this.#waitForManualUpdate) {
			if (value == "image" && this.#settings.mode != "image") {
				this.#pendingSettings.x = Store.Preview.layers[0]._imgSrc.width;
				this.#pendingSettings.y = Store.Preview.layers[0]._imgSrc.height;
			} else {
				this.#pendingActions.push(Store.Preview.setAngles);
			}
			this.#pendingSettings.mode = value;
		} else {
			if (value == "image" && this.#settings.mode != "image") {
				this.#settings.x = Store.Preview.layers[0]._imgSrc.width;
				this.#settings.y = Store.Preview.layers[0]._imgSrc.height;
			} else if (value != "image") {
				Store.Preview.setAngles();
			}
			this.#settings.mode = value;
		}
	}

	set vvar(value) { this.#settings.vvar = value; }
	set cellSize(value) { this.#settings.cellSize = value; }
	set bvar(value) { this.#settings.bvar = value; }
	set bmode(value) { this.#settings.bmode = value; }
	set rotation(value) {
		this.#settings.rotation = value;
		this.#RefreshAll();
	}
	set posx(value) { this.#settings.posx = value; }
	set posy(value) { this.#settings.posy = value; }
	set irad(value) { this.#settings.irad = value; }
	set orad(value) { this.#settings.orad = value; }
	set line(value) { this.#settings.line = value; }
	set lineOp(value) { this.#settings.lineOp = value; }
	set edge(value) { this.#settings.edge = value; }
	set x(value) {
		this.#settings.x = value;
		Store.Preview.layers.forEach((layer) => {
			layer._canvasElement.width = value;
		});
		this.#RefreshAll();
	}
	set y(value) {
		this.#settings.y = value;
		Store.Preview.layers.forEach((layer) => {
			layer._canvasElement.height = value;
		});
		this.#RefreshAll();
	}
	// set colors(value) { this.#settings.colors = value; }
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
			layer.Draw();
		});
	}
}