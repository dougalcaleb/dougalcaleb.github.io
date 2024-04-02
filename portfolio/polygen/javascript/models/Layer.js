import Canvas from "../controllers/canvas.js";
import Store from "../controllers/store.js";
import LayerSettings from "./LayerSettings.js";
import Vertex from "./vertex.js";
import Utils from "../modules/utility.js";
import Polygon from "./Polygon.js";
import DebugUtils from "../modules/debug.js";

export default class Layer {
	name = "";
	canvas = null;
	refCanvas = null;
	vertices = [];
	polygons = [];
	id = null;
    uiElement = null;
    _posRand = null;
    _dirRand = null;
	
	settings = null;
	
	#index = null;
	#arranged = []; // 2D array of vertices. Used only for initial polygon creation
	#visible = true;
	#imageFileHandle = null;

	constructor() {
		this.#index = Store.Preview.layers.length;
		this.canvas = new Canvas({ parentLayer: this });
		this.refCanvas = new Canvas({ offscreenCanvas: true, willReadFrequently: true, parentLayer: this });
		this.canvas._canvasElement.style.zIndex = this.#index + 1;
		this.name = "Layer " + (this.index + 1);
		this.settings = new LayerSettings(this.Redraw.bind(this));
        this.id = Utils.UUID();
        this._posRand = new Utils.Random();
        this._dirRand = new Utils.Random(1);
	}

	static Swap(layer1, layer2) {
		let temp = layer1.index;
		layer1.index = layer2.index;
		layer2.index = temp;
	}

	get index() {
		return this.#index;
	}
	set index(value) {
		this.#index = value;
		this.canvas._canvasElement.style.zIndex = value+1;
	}
	get visible() {
		return this.#visible;
	}
	set visible(value) {
		this.#visible = value;
		this.canvas._canvasElement.style.visibility = value ? "visible" : "hidden";
	}

	Delete() {
		this.canvas._canvasElement.remove();
	}

    Fill() {
        this._dirRand.Reset();
        this._posRand.Reset();

		// Number of vertices in each direction
		const xCount = Math.ceil(Store.settings.x / this.settings.cellSize) + 1;
		const yCount = Math.ceil(Store.settings.y / this.settings.cellSize) + 1;

		// Distance between vertices and the edges of the canvas
		const xShift = (Store.settings.x - this.settings.cellSize * (xCount - 1)) / 2;
		const yShift = (Store.settings.y - this.settings.cellSize * (yCount - 1)) / 2;
		
		const halfCell = this.settings.cellSize / 2;
        
		// Create vertex placements
		for (let y = 0; y < yCount; y++) {
			const row = [];
			for (let x = 0; x < xCount; x++) {
				const vertex = new Vertex();

				if (x === 0) {
					vertex.x = 0;
                } else if (x == xCount - 1) {
					vertex.x = Store.settings.x;
				} else {
					const xVariance = Math.min(this._posRand.Next() * this.settings.variance * this.settings.cellSize, halfCell) * this._dirRand.Next();
					vertex.x = ~~((this.settings.cellSize * x) + xShift + xVariance);
				}

				if (y === 0) {
					vertex.y = 0;
                } else if (y == yCount - 1) {
					vertex.y = Store.settings.y;
				} else {
					const yVariance = Math.min(this._posRand.Next() * this.settings.variance * this.settings.cellSize, halfCell) * this._dirRand.Next();
					vertex.y = ~~((this.settings.cellSize * y) + yShift + yVariance);
                }

                vertex.posX = x;
                vertex.posY = y;

				this.vertices.push(vertex);
				row.push(vertex);
			}
			this.#arranged.push(row);
		}
	}

	// Generates initial grid-based triangle polygons
	InitialPolygons() {
		for (let y = 0; y < this.#arranged.length; y++) {
			for (let x = 0; x < this.#arranged[y].length; x++) {
				const verts = this.#arranged;
				
				// Skip over bottom and right edges
				if (!verts[y + 1] || !verts[y][x + 1] || !verts[y + 1][x + 1]) {
					continue;
				}

				// top left to bottom right distance
				const tlbrLength = Utils.Round(Math.hypot(verts[y + 1][x + 1].x - verts[y][x].x, verts[y + 1][x + 1].y - verts[y][x].y), 2);
				// top right to bottom left distance
				const trblLength = Utils.Round(Math.hypot(verts[y][x + 1].x - verts[y + 1][x].x, verts[y][x + 1].y - verts[y + 1][x].y), 2);

				// Decide which way the triangle points
				let tri;
				if (tlbrLength < trblLength) { // choose the direction that makes the cut shorter
					tri = 0;
				} else if (tlbrLength == trblLength) { // if they're equal (in the case of 0 vertex variance) make it random
					tri = Math.floor(Math.random() * 2);
				} else {
					tri = 1;
				}

				// Create polygons
				let poly1 = null;
				let poly2 = null;
				if (tri == 0) {
					// Bottom left triangle
					poly1 = new Polygon([verts[y][x], verts[y + 1][x], verts[y + 1][x + 1]], this);
					// Upper right triangle
					poly2 = new Polygon([verts[y][x], verts[y][x + 1], verts[y + 1][x + 1]], this);
				} else {
					// Upper left triangle
					poly1 = new Polygon([verts[y][x], verts[y][x + 1], verts[y + 1][x]], this);
					// Lower right triangle
					poly2 = new Polygon([verts[y][x + 1], verts[y + 1][x + 1], verts[y + 1][x]], this);
				}

				this.polygons.push(poly1, poly2);
			}
		}
		this.canvas.DrawPolygons();
	}

	DrawReference() {
		this.refCanvas.DrawGradient();
	}

	DrawImage(file = null) {
		if (file === null) {
			file = this.#imageFileHandle;
		}
		this.#imageFileHandle = file;
		this.refCanvas.DrawImage(file, () => {
			this.vertices = [];
			this.#arranged = [];
			this.Fill();
			this.polygons = [];
			this.InitialPolygons();
		});
	}

	DrawFromState(layerState) {
		this.polygons = layerState.polygons;
		this.vertices = layerState.vertices;
		this.Redraw();
	}

	Redraw(generateNewVertices = false, redrawRef = false) {
		if (generateNewVertices) {
			Store.Preview.AddUndoState(this.index);
			this.vertices = [];
			this.#arranged = [];
			if (redrawRef) {
				this.DrawReference();
			}
			this.Fill();
			this.polygons = [];
			this.InitialPolygons();
		} else {
			if (this.settings.type != "image") {
				this.refCanvas.DrawGradient();
			}
			this.canvas.DrawPolygons();
		}
	}
}