/**
 * ListMap
 * A map of arrays. Can contain a list of objects for each key.
 */

export default class ListMap {
	constructor() {
		this._list = {};
	}

	delete(key, index = 0) {
		this._list[key].splice(index, 1);
	}

	add(key, value) {
		if (this._list[key] === undefined) {
			this._list[key] = [value];
		} else {
			this._list[key].push(value);
		}
	}
	
	get(id) {
		return this._list[id];
	}
}