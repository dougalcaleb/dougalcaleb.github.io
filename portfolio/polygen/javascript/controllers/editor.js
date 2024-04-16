import Store from "./store.js";
import Utils from "../modules/utility.js";
import Defaults from "./internalDefaultStore.js";
import Vertex from "../models/Vertex.js";
import Polygon from "../models/Polygon.js";
import DebugUtils from "../modules/debug.js";

const Tools = {
	SELECTION: "selection",
	MOVE: "move",
	ADD: "vertex",
}

export default class Editor {
	constructor() { }

	static _boundingRect = null;
	static _activeTool = null;
	static _ctx = null;
	static _canvas = null;
	static _abortControllers = {
		selection: null,
		move: null,
		add: null,
	};

	static _selection = {
		selecting: false,
		extend: false,
		color: "rgba(255, 255, 255, 1)",
		rect: {
			start: null,
			end: null
		},
		hasAltered: false
	};
	static _move = {
		delta: {
			start: null,
			end: null
		},
		moving: false,
		vertexMap: [],
		verticesBeforeMove: {}
	};
	static _add = {
		activeVertices: [],
		activePolygon: null
	};
	
	static Init() {
		this._ctx = Store.Preview.overlayLayer.canvas.ctx;
		this._canvas = Store.Preview.overlayLayer.canvas._canvasElement;
		this.#GetCommon();
		this.#KeyListeners();
	}

	static RefreshSaved() {
		this.#GetCommon();
	}

	static #KeyListeners() {
		document.addEventListener("keydown", (event) => {
			if (event.key === "Shift" || event.key === "Control") {
				this._selection.extend = true;
				this.DrawSelectionPoints();
			}
		});

		document.addEventListener("keyup", (event) => {
			if (event.key === "Shift" || event.key === "Control") {
				this._selection.extend = false;
				if (this._selection.selecting) {
					this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
					this.DrawSelectionBox();
				}
			}
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
		const vMap = Store.Preview.activeLayer.anchorMap;
		const xCount = Math.ceil(Store.settings.x / Store.Preview.activeLayer.settings.cellSize) + 1;
		const yCount = Math.ceil(Store.settings.y / Store.Preview.activeLayer.settings.cellSize) + 1;

		anchorSquare.forEach(anchor => {
			if (anchor.x < 0 || anchor.y < 0 || anchor.x >= xCount || anchor.y >= yCount) return;

			vMap[anchor.x + "-" + anchor.y].forEach(vertex => {
				let distance = Utils.PointDistanceSqr(vertex, { x, y });
				if (distance < nearest.distance) {
					nearest = {
						point: vertex,
						distance
					}
				}
			});			
		});

		return nearest.point;
	}

	static DrawSelectionBox() {
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
		this._ctx.setLineDash([Defaults.UI.EDITOR_SELECTION_DASH[0] * Store.Preview.pixelRatio, Defaults.UI.EDITOR_SELECTION_DASH[1] * Store.Preview.pixelRatio]);
		this._ctx.strokeStyle = this._selection.color;
		this._ctx.lineWidth = Defaults.UI.EDITOR_SELECTION_WEIGHT * Store.Preview.pixelRatio;
		this._ctx.strokeRect(this._selection.rect.start.x, this._selection.rect.start.y, this._selection.rect.end.x - this._selection.rect.start.x, this._selection.rect.end.y - this._selection.rect.start.y);
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

		let topLeftAnchor, bottomRightAnchor;

		if (!this._selection.hasAltered) {
			// these are the max anchors that could have vertices within the selection box
			// we can be sure of this before the user moves any vertices or adds vertices, but all bets are off after that
			topLeftAnchor = {
				x: Math.floor(topLeft.x / Store.Preview.activeLayer.settings.cellSize),
				y: Math.floor(topLeft.y / Store.Preview.activeLayer.settings.cellSize)
			};
			bottomRightAnchor = {
				x: Math.ceil(bottomRight.x / Store.Preview.activeLayer.settings.cellSize) + 1,
				y: Math.ceil(bottomRight.y / Store.Preview.activeLayer.settings.cellSize) + 1
			};
		} else {
			topLeftAnchor = {
				x: 0,
				y: 0
			};
			bottomRightAnchor = {
				x: Math.ceil(Store.settings.x / Store.Preview.activeLayer.settings.cellSize),
				y: Math.ceil(Store.settings.y / Store.Preview.activeLayer.settings.cellSize)
			};
		}

		// clamp anchors to within the canvas bounds
		topLeftAnchor.x = Math.max(0, topLeftAnchor.x);
		topLeftAnchor.y = Math.max(0, topLeftAnchor.y);
		bottomRightAnchor.x = Math.min(bottomRightAnchor.x, Math.ceil(Store.settings.x / Store.Preview.activeLayer.settings.cellSize));
		bottomRightAnchor.y = Math.min(bottomRightAnchor.y, Math.ceil(Store.settings.y / Store.Preview.activeLayer.settings.cellSize));

		// get all vertices within the selection box
		const vInBox = [];
		for (let y = topLeftAnchor.y; y < bottomRightAnchor.y; y++) {
			for (let x = topLeftAnchor.x; x < bottomRightAnchor.x; x++) {
				Store.Preview.activeLayer.anchorMap[x + "-" + y].forEach((vertex) => {
					if (vertex && vertex.x >= topLeft.x && vertex.x <= bottomRight.x && vertex.y >= topLeft.y && vertex.y <= bottomRight.y) {
						vInBox.push(vertex);
					}
				});
			}
		}

		return vInBox;
	}

	static AddToSelection(vertices) {
		if (!this._selection.extend) {
			Store.Editor.selection = [];
		}
		Store.Editor.selection.push(...vertices);
		this.DrawSelectionPoints();
	}

	static ClearSelection() {
		Store.Editor.selection = [];
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
	}

	static GetCanvasPosition(x, y) {
		return {
			x: (x - this._boundingRect.x) * Store.Preview.pixelRatio,
			y: (y - this._boundingRect.y) * Store.Preview.pixelRatio
		};
	}

	static DrawSelectionPoints() {
		Store.Editor.selection.forEach(vertex => {
			this._ctx.fillStyle = this._selection.color;
			this._ctx.beginPath();
			this._ctx.arc(vertex.x, vertex.y, Defaults.UI.EDITOR_VERTEX_SIZE * Store.Preview.pixelRatio, 0, Math.PI * 2);
			this._ctx.fill();
		});
	}

	static SelectionTool() {
		// Ensure no other tools are active
		if (this._activeTool === Tools.SELECTION) {
			this.DeactivateSelectionTool();
			return;
		} else if (this._activeTool === Tools.MOVE) {
			this.DeactivateMoveTool();
		} else if (this._activeTool === Tools.ADD) {
			this.DeactivateAddTool();
		}

		this._activeTool = Tools.SELECTION;
		this._abortControllers.selection = new AbortController();

		this._canvas.addEventListener("mousemove", (event) => {
			if (this._selection.selecting) {
				this._selection.rect.end = this.GetCanvasPosition(event.clientX, event.clientY);
				this.DrawSelectionBox();
				if (this._selection.extend) {
					this.DrawSelectionPoints();
				}
			}
		}, { signal: this._abortControllers.selection.signal });

		this._canvas.addEventListener("mousedown", (dnEvent) => {
			this._selection.rect.start = this.GetCanvasPosition(dnEvent.clientX, dnEvent.clientY);
			this._selection.selecting = true;
			const aborter = new AbortController();
			document.body.addEventListener("mouseup", (upEvent) => {
				this._selection.rect.end = this.GetCanvasPosition(upEvent.clientX, upEvent.clientY);
				aborter.abort();
				this._selection.selecting = false;
				this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
				// Ensure the mouse interaction was more than a click, then get the vertices in the selection bounds
				try {
					if (Utils.PointDistanceSqr(this._selection.rect.start, this._selection.rect.end) > Defaults.UI.EDITOR_DRAG_THRESHOLD) {
						this.AddToSelection(this.GetVerticesInBounds(this._selection.rect.start, this._selection.rect.end));
					}
				} catch (e) {
					// If the user ends the selection out of the document window, we get an error
					console.warn("Error selecting vertices.");
				}
				this._selection.rect.start = null;
				this._selection.rect.end = null;
			}, { signal: aborter.signal });
		}, { signal: this._abortControllers.selection.signal });

		document.querySelector("#editor-select").classList.add("btn-active");
	}

	static DeactivateSelectionTool() {
		this._activeTool = null;
		this._abortControllers.selection.abort();
		document.querySelector("#editor-select").classList.remove("btn-active");
	}

	/**
	 * Prop falloff implementation:
	 * On mousedown, get all vertices in the selection
	 * Create an array of vertices with the following shape:
	 * [
	 * 	{
	 * 		vertex: vertex,
	 * 		id: x-y
	 * 		falloff: (distance from mouse / cellSize) (gives roughly the nth cell away from the mouse)
	 * 	},
	 * ]
	 * 
	 * On mousemove, iterate through each vertex and apply (delta * (falloff - vFalloff)/falloff)
	 */

	static MoveTool() {
		// Ensure no other tools are active
		if (this._activeTool === Tools.MOVE) {
			this.DeactivateMoveTool();
			return;
		} else if (this._activeTool === Tools.SELECTION) {
			this.DeactivateSelectionTool();
		} else if (this._activeTool === Tools.ADD) {
			this.DeactivateAddTool();
		}

		this._activeTool = Tools.MOVE;
		this._abortControllers.move = new AbortController();

		this._canvas.addEventListener("mousemove", (event) => {
			if (this._move.moving) {
				this._move.delta.end = this.GetCanvasPosition(event.clientX, event.clientY);
				this.#MoveSelection();
			}
		}, { signal: this._abortControllers.move.signal });

		this._canvas.addEventListener("mousedown", (dnEvent) => {
			this._selection.hasAltered = true;
			this._move.moving = true;
			this._move.delta.start = this.GetCanvasPosition(dnEvent.clientX, dnEvent.clientY);
			this._move.vertexMap = Store.Editor.selection.map(vertex => {
				return {
					vertex,
					id: vertex.posX + "-" + vertex.posY,
					falloff: Utils.Round(Utils.PointDistance(this._move.delta.start, vertex) / Store.Preview.activeLayer.settings.cellSize, 4)
				}
			});

			this._move.verticesBeforeMove = Vertex.CopySetAsIdMap(Store.Editor.selection);
			const aborter = new AbortController();
			document.body.addEventListener("mouseup", (upEvent) => {
				this._move.delta.end = this.GetCanvasPosition(upEvent.clientX, upEvent.clientY);
				this._move.moving = false;
				aborter.abort();
			}, { signal: aborter.signal });
		}, { signal: this._abortControllers.move.signal });

		document.querySelector("#editor-move").classList.add("btn-active");
	}

	// Helper for MoveTool
	static #MoveSelection() {
		const adjusted = this._move.vertexMap.map((vertex) => {
			// Mouse delta
			const delta = {
				x: this._move.delta.end.x - this._move.delta.start.x,
				y: this._move.delta.end.y - this._move.delta.start.y,
			};

			// Apply falloff
			if (Store.Editor.propFalloff !== 0) {
				const falloff = Math.max((Store.Editor.propFalloff - vertex.falloff) / Store.Editor.propFalloff, 0);
				delta.x *= falloff;
				delta.y *= falloff;
			}

			vertex.vertex.x = this._move.verticesBeforeMove[vertex.vertex.id].x + delta.x;
			vertex.vertex.y = this._move.verticesBeforeMove[vertex.vertex.id].y + delta.y;

			return vertex.vertex;
		});

		// Propagate changes
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
		this.DrawSelectionPoints();
		Store.Preview.activeLayer.UpdateVertices(adjusted);
	}

	static DeactivateMoveTool() {
		this._activeTool = null;
		this._abortControllers.move.abort();
		document.querySelector("#editor-move").classList.remove("btn-active");
	}

	static AddTool() {
		if (this._activeTool === Tools.ADD) {
			this.DeactivateAddTool();
			return;
		} else if (this._activeTool === Tools.SELECTION) {
			this.DeactivateSelectionTool();
		} else if (this._activeTool === Tools.MOVE) {
			this.DeactivateMoveTool();
		}

		this._activeTool = Tools.ADD;
		this._abortControllers.add = new AbortController();

		this._canvas.addEventListener("click", (event) => {
			const coord = this.GetCanvasPosition(event.clientX, event.clientY);
			const nearestAnchor = {
				x: Math.round(coord.x / Store.Preview.activeLayer.settings.cellSize),
				y: Math.round(coord.y / Store.Preview.activeLayer.settings.cellSize)
			};
			const vertex = new Vertex(coord.x, coord.y, nearestAnchor.x, nearestAnchor.y);
			this._add.activeVertices.push(vertex);
			this._add.activePolygon = new Polygon(this._add.activeVertices, Store.Preview.activeLayer);
			Store.Preview.activeLayer.AddVertex(vertex);
			if (this._add.activeVertices.length === 1) {
				Store.Preview.activeLayer.AddCustomPolygon(this._add.activePolygon);
			} else {
				Store.Preview.activeLayer.UpdateCustomPolygon(this._add.activePolygon);
			}
		}, { signal: this._abortControllers.add.signal });

		document.querySelector("#editor-add").classList.add("btn-active");
	}
	
	static DeactivateAddTool() {
		this._activeTool = null;
		this._abortControllers.add.abort();
		this._add.activeVertices = [];
		this._add.activePolygon = null;
		document.querySelector("#editor-add").classList.remove("btn-active");
	}
}