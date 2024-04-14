import Store from "./store.js";

export default class Editor {
	constructor() { }
	
	static Init() {
		this.#SetListeners();
	}
	
	static #SetListeners() {
		Store.Preview.overlayLayer.canvas._canvasElement.addEventListener("mouseover", (event) => {

		});
	}

	static GetNearestVertex(x, y) {
		/**
		 * Get active layer
		 * Find 9 nearest anchor positions
		 * Find the closest vertex of those 9
		 */
	}
}