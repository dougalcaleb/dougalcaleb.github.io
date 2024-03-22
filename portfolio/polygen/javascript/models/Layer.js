import Canvas from "../controllers/canvas.js";
import Store from "../controllers/store.js";
import LayerSettings from "./LayerSettings.js";
import DebugUtils from "../modules/debug.js";
import Vertex from "./vertex.js";
import Utils from "../modules/utility.js";

export default class Layer {
	name = "";
	canvas = null;
	vertices = [];
	index = null;
	visible = true;

	settings = null;

	constructor(canvas = null) {
		this.canvas = canvas;
		if (canvas === null) {
			this.canvas = new Canvas();
		}
		this.index = Store.Preview.layers.length;
		this.name = "Layer " + (this.index + 1);
		this.settings = new LayerSettings(this.Redraw.bind(this));
	}

	static Swap(Layer1, Layer2) {
		let temp = Layer1.layer;
		Layer1.layer = Layer2.layer;
		Layer2.layer = temp;
	}

	Fill() {
		const xCount = Math.ceil(Store.settings.x / this.settings.cellSize) + 1;
		const yCount = Math.ceil(Store.settings.y / this.settings.cellSize) + 1;

		// Distance between vertices and the edges of the canvas
		const xShift = (Store.settings.x - this.settings.cellSize * (xCount-1)) / 2;
		const yShift = (Store.settings.y - this.settings.cellSize * (yCount - 1)) / 2;

		// Create vertex placements
		for (let x = 0; x < xCount; x++) {
			for (let y = 0; y < yCount; y++) {
				const vertex = new Vertex();

				if (x === 0) {
					vertex.x = 0
				} else if (x == xCount - 1) {
					vertex.x = Store.settings.x;
				} else {
					const xVariance = Math.random() * this.settings.variance * this.settings.cellSize * Utils.randPosNeg();
					vertex.x = (this.settings.cellSize * x) + xShift + xVariance;
				}

				if (y === 0) {
					vertex.y = 0;
				} else if (y == yCount - 1) {
					vertex.y = Store.settings.y;
				} else {
					const yVariance = Math.random() * this.settings.variance * this.settings.cellSize * Utils.randPosNeg();
					vertex.y = (this.settings.cellSize * y) + yShift + yVariance;
				}

				this.vertices.push(vertex);
			}
		}

		DebugUtils.drawPoints(this.canvas.ctx, this.vertices);
	}

	Redraw(generateNewVertices = false) {
		if (generateNewVertices) {
			this.vertices = [];
			this.Fill();
		}
		this.canvas.Draw();
		DebugUtils.drawPoints(this.canvas.ctx, this.vertices);
	}
}