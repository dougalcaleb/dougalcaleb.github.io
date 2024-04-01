export default class Gradient {
	#changed = true;
	#cache = [];

	constructor(gradient) {
		if (gradient instanceof this.constructor) {
			gradient = structuredClone(gradient.stops);
		}
		this.type = "Gradient";
		this._values = Array.from(gradient);
	}

	// Ensures correct order of color stops
	get stops() {
		if (!this.#changed) {
			return this.#cache;
		}
		const vals = Array.from(this._values);
		vals.sort((a, b) => a.position - b.position);
		this.#cache = vals;
		this.#changed = false;
		return vals;
	}

	get length() {
		return this._values.length;
	}

	add(color, position) {
		this._values.push({ color: color, stop: position });
		this.#changed = true;
	}

	removeAt(position) {
		const pos = this._values.findIndex((stop) => stop.position === this.stops[position]);
		this._values.splice(pos, 1);
		this.#changed = true;
	}

	adjust(index, position) {
		const pos = this._values.findIndex((stop) => stop.position === this.stops[index]);
		this._values[pos].position = position;
		this.#changed = true;
	}

	getSaveData() {
		return this.stops;
	}

	//* Iterators

	forEach(callback) {
		this.stops.forEach((stop, index) => {
			callback(stop, index);
		});
	}

	[Symbol.iterator]() {
		let index = 0;
		return {
			next: () => {
				if (index < this.stops.length) {
					return { value: this.stops[index++], done: false };
				} else {
					return { done: true };
				}
			}
		};
	}
}