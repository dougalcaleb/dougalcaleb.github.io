import Store from "../controllers/store.js";

export default class LayerSettings {
	#variance = 0.4;   		// positional variance
	#cellSize = 100; 		// distance between vertices
	#colorRand = 0;			// random color variance
	#colorMode = -1;		// -1 = darken 1 = lighten
	#lineColor = "#ffffff"; // polygon outline color
	#lineOpacity = 0;		// polygon outline opacity
	#gradient = null;		// color gradient
	#gradRotation = 0;		// gradient rotation
	#radialX = 0.5;			// radial gradient center x
	#radialY = 0.5;			// radial gradient center y
	#innerRad = 0;			// radial gradient inner radius
	#outerRad = 0.5;		// radial gradient outer radius
	#type = "linear"; 		// gradient mode

	gradientIndex = 0;

	#redrawCallback = null;
	
	constructor(redrawCallback) {
		this.#redrawCallback = redrawCallback;
		this.#gradient = Store.Preview.layers.length ? Store.Preview.layers[0].settings.gradient : Store.defaultPalettes[0];
	}
	
	get variance() { return this.#variance; }
	set variance(value) {
		this.#variance = value;
		this.#redrawCallback(true);
	}

	get cellSize() { return this.#cellSize; }
	set cellSize(value) {
		this.#cellSize = value;
		this.#redrawCallback(true);
	}

	get colorRand() { return this.#colorRand; }
	set colorRand(value) {
		this.#colorRand = value;
		this.#redrawCallback();
	}

	get colorMode() { return this.#colorMode; }
	set colorMode(value) {
		this.#colorMode = value;
		this.#redrawCallback();
	}

	get lineColor() { return this.#lineColor; }
	set lineColor(value) {
		this.#lineColor = value;
		this.#redrawCallback();
	}

	get lineOpacity() { return this.#lineOpacity; }
	set lineOpacity(value) {
		this.#lineOpacity = value;
		this.#redrawCallback();
	}

	get gradient() { return this.#gradient; }
	set gradient(value) {
		this.#gradient = value;
		this.#redrawCallback();
	}

	get gradRotation() { return this.#gradRotation; }
	set gradRotation(value) {
		this.#gradRotation = value;
		this.#redrawCallback();
	}

	get radialX() { return this.#radialX; }
	set radialX(value) {
		this.#radialX = value;
		this.#redrawCallback();
	}

	get radialY() { return this.#radialY; }
	set radialY(value) {
		this.#radialY = value;
		this.#redrawCallback();
	}

	get innerRad() { return this.#innerRad; }
	set innerRad(value) {
		this.#innerRad = value;
		this.#redrawCallback();
	}

	get outerRad() { return this.#outerRad; }
	set outerRad(value) {
		this.#outerRad = value;
		this.#redrawCallback();
	}

	get type() { return this.#type; }
	set type(value) {
		if (this.#type === "image") {
			this.#type = value;
			this.#redrawCallback(true);
		} else {
			this.#type = value;
			this.#redrawCallback();
		}
	}
}