export default class LayerSettings {
	variance = 1;   	// positional variance
	distance = 100; 	// distance between vertices
	colorRand = 0;		// random color variance
	colorMode = -1;		// -1 = darken 1 = lighten
	lineColor = "#fff"; // polygon outline color
	lineOpacity = 0;	// polygon outline opacity

	#redrawCallback = null;
	
	constructor(redrawCallback) {
		this.#redrawCallback = redrawCallback;
	}
	
	get variance() { return this.variance; }
	set variance(value) {
		this.variance = value;
		this.#redrawCallback();
	}

	get distance() { return this.distance; }
	set distance(value) {
		this.distance = value;
		this.#redrawCallback();
	}

	get colorRand() { return this.colorRand; }
	set colorRand(value) {
		this.colorRand = value;
		this.#redrawCallback();
	}

	get colorMode() { return this.colorMode; }
	set colorMode(value) {
		this.colorMode = value;
		this.#redrawCallback();
	}

	get lineColor() { return this.lineColor; }
	set lineColor(value) {
		this.lineColor = value;
		this.#redrawCallback();
	}

	get lineOpacity() { return this.lineOpacity; }
	set lineOpacity(value) {
		this.lineOpacity = value;
		this.#redrawCallback();
	}
}