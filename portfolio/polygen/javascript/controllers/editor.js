import Store from "./store.js";
import Utils from "../modules/utility.js";
import Defaults from "./internalDefaultStore.js";
import DebugUtils from "../modules/debug.js";

export default class Editor {
	static selection = [];

	static _boundingRect = null;
	static _selectionRect = {
		start: null,
		end: null
	};
	static _selecting = false;
	static _ctx = null;
	static _canvas = null;
	static _extendSelection = false;
	static _selectionColor = "rgba(255, 255, 255, 1)";

	constructor() { }
	
	static Init() {
		this._ctx = Store.Preview.overlayLayer.canvas.ctx;
		this._canvas = Store.Preview.overlayLayer.canvas._canvasElement;
		this.#SetListeners();
		this.#GetCommon();
		this.#KeyListeners();
	}

	static RefreshSaved() {
		this.#GetCommon();
	}

	static #KeyListeners() {
		document.addEventListener("keydown", (event) => {
			if (event.key === "Shift" || event.key === "Control") {
				this._extendSelection = true;
				this.DrawSelectionPoints();
			}
		});

		document.addEventListener("keyup", (event) => {
			if (event.key === "Shift" || event.key === "Control") {
				this._extendSelection = false;
				if (this._selecting) {
					this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
					this.DrawSelectionBox();
				}
			}
		});
	}
	
	static #SetListeners() {
		this._canvas.addEventListener("mousemove", (event) => {
			if (this._selecting) {
				this._selectionRect.end = this.GetCanvasPosition(event.clientX, event.clientY);
				this.DrawSelectionBox();
				if (this._extendSelection) {
					this.DrawSelectionPoints();
				}
			}
		});

		this._canvas.addEventListener("mousedown", (dnEvent) => {
			this._selectionRect.start = this.GetCanvasPosition(dnEvent.clientX, dnEvent.clientY);
			this._selecting = true;
			const aborter = new AbortController();
			document.body.addEventListener("mouseup", (upEvent) => {
				this._selectionRect.end = this.GetCanvasPosition(upEvent.clientX, upEvent.clientY);
				aborter.abort();
				this._selecting = false;
				this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
				try {
					if (Utils.PointDistanceSqr(this._selectionRect.start, this._selectionRect.end) > Defaults.UI.EDITOR_DRAG_THRESHOLD) {
						this.AddToSelection(this.GetVerticesInBounds(this._selectionRect.start, this._selectionRect.end));
					}
				} catch (e) {
					console.warn("Error selecting vertices.");
				}
				this._selectionRect.start = null;
				this._selectionRect.end = null;
			}, { signal: aborter.signal });
		});
	}

	static #GetCommon() {
		this._boundingRect = Store.Preview.activeLayer.canvas._canvasElement.getBoundingClientRect();
	}

	// Gets the nearest vertex (taking randomness into account) given a canvas coordinate
	static GetNearestVertex(x, y) {
		// Get the nearest base vertex point. All vertices are derivatives of these points
		const nearestAnchor = {
			x: Math.round(x / Store.Preview.activeLayer.settings.cellSize),
			y: Math.round(y / Store.Preview.activeLayer.settings.cellSize)
		}

		// Get the 3x3 square of vertices around the nearest anchor point
		const anchorSquare = [
			{ x: nearestAnchor.x - 1, y: nearestAnchor.y - 1 },
			{ x: nearestAnchor.x, y: nearestAnchor.y - 1 },
			{ x: nearestAnchor.x + 1, y: nearestAnchor.y - 1 },
			{ x: nearestAnchor.x - 1, y: nearestAnchor.y },
			{ x: nearestAnchor.x, y: nearestAnchor.y },
			{ x: nearestAnchor.x + 1, y: nearestAnchor.y },
			{ x: nearestAnchor.x - 1, y: nearestAnchor.y + 1 },
			{ x: nearestAnchor.x, y: nearestAnchor.y + 1 },
			{ x: nearestAnchor.x + 1, y: nearestAnchor.y + 1 }
		];

		// Find the nearest vertex in the anchor square
		let nearest = {
			point: null,
			distance: Infinity
		}
		const vMap = Store.Preview.activeLayer.vertexMap;
		const xCount = Math.ceil(Store.settings.x / Store.Preview.activeLayer.settings.cellSize) + 1;
		const yCount = Math.ceil(Store.settings.y / Store.Preview.activeLayer.settings.cellSize) + 1;

		anchorSquare.forEach(anchor => {
			if (anchor.x < 0 || anchor.y < 0 || anchor.x >= xCount || anchor.y >= yCount) return;

			let distance = Utils.PointDistanceSqr(vMap[anchor.x + "-" + anchor.y], { x, y });
			if (distance < nearest.distance) {
				nearest = {
					point: vMap[anchor.x + "-" + anchor.y],
					distance
				}
			}
		});

		return nearest.point;
	}

	static DrawSelectionBox() {
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
		this._ctx.setLineDash([Defaults.UI.EDITOR_SELECTION_DASH[0] * Store.Preview.pixelRatio, Defaults.UI.EDITOR_SELECTION_DASH[1] * Store.Preview.pixelRatio]);
		this._ctx.strokeStyle = this._selectionColor;
		this._ctx.lineWidth = Defaults.UI.EDITOR_SELECTION_WEIGHT * Store.Preview.pixelRatio;
		this._ctx.strokeRect(this._selectionRect.start.x, this._selectionRect.start.y, this._selectionRect.end.x - this._selectionRect.start.x, this._selectionRect.end.y - this._selectionRect.start.y);
		this._ctx.setLineDash([]);
	}

	static GetVerticesInBounds(point1, point2) {
		// normalize points so that point1 is top left and point2 is bottom right
		const topLeft = {
			x: Math.min(point1.x, point2.x),
			y: Math.min(point1.y, point2.y)
		};
		const bottomRight = {
			x: Math.max(point1.x, point2.x),
			y: Math.max(point1.y, point2.y)
		};

		// these are the max anchors that could have vertices within the selection box
		const topLeftAnchor = {
			x: Math.floor(topLeft.x / Store.Preview.activeLayer.settings.cellSize),
			y: Math.floor(topLeft.y / Store.Preview.activeLayer.settings.cellSize)
		};
		const bottomRightAnchor = {
			x: Math.ceil(bottomRight.x / Store.Preview.activeLayer.settings.cellSize) + 1,
			y: Math.ceil(bottomRight.y / Store.Preview.activeLayer.settings.cellSize) + 1
		};

		// clamp anchors to within the canvas bounds
		topLeftAnchor.x = Math.max(0, topLeftAnchor.x);
		topLeftAnchor.y = Math.max(0, topLeftAnchor.y);
		bottomRightAnchor.x = Math.min(bottomRightAnchor.x, Math.ceil(Store.settings.x / Store.Preview.activeLayer.settings.cellSize));
		bottomRightAnchor.y = Math.min(bottomRightAnchor.y, Math.ceil(Store.settings.y / Store.Preview.activeLayer.settings.cellSize));

		// get all vertices within the selection box
		const vInBox = [];
		for (let y = topLeftAnchor.y; y < bottomRightAnchor.y; y++) {
			for (let x = topLeftAnchor.x; x < bottomRightAnchor.x; x++) {
				const vertex = Store.Preview.activeLayer.vertexMap[x + "-" + y];
				if (vertex && vertex.x >= topLeft.x && vertex.x <= bottomRight.x && vertex.y >= topLeft.y && vertex.y <= bottomRight.y) {
					vInBox.push(vertex);
				}
			}
		}

		return vInBox;
	}

	static AddToSelection(vertices) {
		if (!this._extendSelection) {
			this.selection = [];
		}
		this.selection.push(...vertices);
		this.DrawSelectionPoints();
	}

	static ClearSelection() {
		this.selection = [];
	}

	static GetCanvasPosition(x, y) {
		return {
			x: (x - this._boundingRect.x) * Store.Preview.pixelRatio,
			y: (y - this._boundingRect.y) * Store.Preview.pixelRatio
		};
	}

	static DrawSelectionPoints() {
		this.selection.forEach(vertex => {
			this._ctx.fillStyle = this._selectionColor;
			this._ctx.beginPath();
			this._ctx.arc(vertex.x, vertex.y, Defaults.UI.EDITOR_VERTEX_SIZE * Store.Preview.pixelRatio, 0, Math.PI * 2);
			this._ctx.fill();
		});
	}
}