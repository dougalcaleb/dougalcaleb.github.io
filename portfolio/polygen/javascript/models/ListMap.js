/**
 * ListMap
 * A map of arrays. Can contain a list of objects for each key.
 */

export default class ListMap {
	constructor() {
		this._list = new Proxy({}, ListMap.GetSetHandler);
		return this._list;
	}

	static GetSetHandler = {
		get: function (target, prop) {
			return target[prop];
		},
	
		set: function (target, prop, value) {
			if (target[prop] === undefined) {
				target[prop] = [value];
				return true;
			} else {
				target[prop].push(value);
				return true;
			}
		}
	};
}