export default class Gradient {
	constructor(gradient) {
		this.type = "Gradient";
		this._values = new Map(gradient);
	}

	// Ensures correct order of color stops
	get stops() {
		const vals = Array.from(this._values);
		vals.sort((a, b) => a.position - b.position);
		return vals;
	}

	add(color, position) {
		this._values.push({ color: color, stop: position });
	}

	removeAt(position) {
		const pos = this._values.findIndex((stop) => stop.position === this.stops[position]);
		this._values.splice(pos, 1);
	}

	adjust(index, position) {
		const pos = this._values.findIndex((stop) => stop.position === this.stops[index]);
		this._values[pos].position = position;
	}
}