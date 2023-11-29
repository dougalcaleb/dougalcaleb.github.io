export class Store {
	constructor() {
		// All settings
		this.settings = {
			mode: "linear",
			vvar: 0.9,
			csize: 185,
			bvar: 0,
			bmode: "darken",
			rot: 0,
			posx: 0.5,
			posy: 0.5,
			irad: 0,
			orad: 0.5,
			line: "#ffffff",
			lineOp: 0,
			edge: "varied",
			x: 1920,
			y: 1080,
			colors: [],
			propFalloff: 4 
		};
	}

	// Updates settings
	update(newSettings) {
		this.settings = Object.assign(this.settings, newSettings);
		return this.settings;
	}

	// Updates this.objname. Always overwrites.
	set(objName, settings) {
		this[objName] = Object.assign(this[objName] || {}, settings);
	}

	// Returns this.objName
	get(objName) {
		return this[objName];
	}

	// Creates a reference to other classes to avoid circular dependencies but allow inter-class side effects
	route(objName, objRef) {
		if (this[objName]) throw new Error(`Data Store routing error: Attempting to overwrite route ${objName}`);

		this[objName] = objRef;

		return this[objName];
	}
}