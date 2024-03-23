export default class LayerSettings {
	#variance = 0.4;   		// positional variance
	#cellSize = 100; 		// distance between vertices
	#colorRand = 0;			// random color variance
	#colorMode = -1;		// -1 = darken 1 = lighten
	#lineColor = "#ffffff"; // polygon outline color
	#lineOpacity = 0;		// polygon outline opacity

	#redrawCallback = null;
	
	constructor(redrawCallback) {
		this.#redrawCallback = redrawCallback;
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
}