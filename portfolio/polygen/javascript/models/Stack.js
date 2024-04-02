import Defaults from "../controllers/internalDefaultStore.js";

export default class Stack {
	#values = {};
	#maxSize = Defaults.LIMITS.UNDO_LIMIT;

	constructor(values = []) {
		values.forEach((value, index) => {
			this.#values[String(index)] = value;
		});
	}

	get length() {
		return Object.keys(this.#values).length;
	}
	get top() {
		return this.#values[this.length - 1];
	}
	set length(value) {
		this.#maxSize = value;
	}

	Push(value) {
		this.#values[this.length] = value;
		if (this.length > this.#maxSize) {
			this.Trim();
		}
	}

	Pop() {
		const value = this.#values[this.length - 1];
		delete this.#values[this.length - 1];
		return value;
	}

	Trim() {
		delete this.#values["0"];
		if (this.length > 0) {
			for (let i = 1; i <= this.length; i++) {
				this.#values[String(i)] = this.#values[String(i + 1)];
			}
			delete this.#values[this.length - 1];
		}
	}
}