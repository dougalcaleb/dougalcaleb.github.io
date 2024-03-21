import Canvas from "../controllers/canvas.js";
import Store from "../controllers/store.js";

export default class Layer {
	name = "";
	canvas = null;
	vertices = [];
	index = null;

	constructor(canvas = null) {
		this.canvas = canvas
		if (canvas === null) {
			this.canvas = new Canvas();
		}
		this.index = Store.Preview.layers.length;
	}

	static Swap(Layer1, Layer2) {
		let temp = Layer1.layer;
		Layer1.layer = Layer2.layer;
		Layer2.layer = temp;
	}
}