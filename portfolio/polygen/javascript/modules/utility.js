export default class Utils {
	constructor() { }
	
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
}