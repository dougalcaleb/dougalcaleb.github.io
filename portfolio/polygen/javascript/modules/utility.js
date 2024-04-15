export default class Utils {
	constructor() {}

	static radToDeg(rad) {
		return rad * (180 / Math.PI);
	}

	static degToRad(deg) {
		return deg * (Math.PI / 180);
	}

	static isDescendant(parent, child) {
		var node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}

	static colorVariance(color, variance, direction) {
		return color + variance * direction;
	}

	static randPosNeg() {
		return Math.random() < 0.5 ? -1 : 1;
	}

	static hexToRgb(color, returnAsString = false) {
		let hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
		let rgb = {
			r: parseInt(hex[1], 16),
			g: parseInt(hex[2], 16),
			b: parseInt(hex[3], 16),
		};
		if (returnAsString) {
			return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
		}
		return rgb;
	}

	static rgbToHex(color) {
		const components = color.match(/\d+/g);
		const r = parseInt(components[0]);
		const g = parseInt(components[1]);
		const b = parseInt(components[2]);
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	static UUID() {
		let d = new Date().getTime(),
			d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			let r = Math.random() * 16;
			if (d > 0) {
				r = (d + r) % 16 | 0;
				d = Math.floor(d / 16);
			} else {
				r = (d2 + r) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}
			return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
		});
	}

	static PointDistance(v1, v2) {
		return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
	}

	static PointDistanceSqr(v1, v2) {
		return Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2);
	}

	static Round(value, places) {
		return +(Math.round(value + "e+" + places) + "e-" + places);
	}

	// Seedable random number generator
	// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
	static sfc32(a, b, c, d) {
		return function () {
			a |= 0;
			b |= 0;
			c |= 0;
			d |= 0;
			let t = (((a + b) | 0) + d) | 0;
			d = (d + 1) | 0;
			a = b ^ (b >>> 9);
			b = (c + (c << 3)) | 0;
			c = (c << 21) | (c >>> 11);
			c = (c + t) | 0;
			return (t >>> 0) / 4294967296;
		};
	}

	static Random = class {
		_seed = null;
		_func = null;
		_nestedFunc = null;
		_mode = null;

		constructor(mode = 0) {
			this._mode = mode;
			this._seed = [Date.now() * Math.random(), Date.now() * Math.random(), Date.now() * Math.random(), Date.now() * Math.random()];
			if (this._mode === 0) {
				this._func = Utils.sfc32(...this._seed);
			} else if (this._mode === 1) {
				this._nestedFunc = Utils.sfc32(...this._seed);
				this._func = () => (this._nestedFunc() < 0.5 ? -1 : 1);
			}
		}

		Next() {
			return this._func();
		}

		Reset() {
			if (this._mode === 0) {
				this._func = Utils.sfc32(...this._seed);
			} else if (this._mode === 1) {
				this._nestedFunc = Utils.sfc32(...this._seed);
				this._func = () => (this._nestedFunc() < 0.5 ? -1 : 1);
			}
		}
	};
}