import { Thread } from "./threadManager.js";
import { DEFAULTS } from "./globals.js";

let DataStore;

// Editor canvas control
export class Editor {
	constructor(store) {

		DataStore = store;

		this.canvas = document.getElementById("canvas-edit");
		this.ctx = this.canvas.getContext("2d");

		this.preDrawImage = null;

		this.canvasCompressionRatio = 1;

		this.isClean = true;

		this.computedEdgeImage = null;

		this.brush = {
			FollowEvent: new AbortController(),
			indOn: true,
			size: 100,
			sizeStep: 5,
			minSize: 5,
			maxSize: 100,
			posX: null,
			posY: null,
			drawing: false,
			active: false,
			points: [],
		};

		this.drag = {
			DragEvent: new AbortController(),
			MouseEvent: new AbortController(),
			active: false,
			dragStart: { x: null, y: null },
			vertices: {},
			lastRedraw: null,
			redrawDelay: 15,
			neighbors: {},
			maxVertexIndex: 0,
		}

		this.selectedVertices = {};
	}

	handleWindowResize() {
		this.canvasCompressionRatio = this.canvas.offsetWidth / DataStore.settings.x;
	}

	updateSettings(settings) {
		this.canvas.height = settings.y.toString();
		this.canvas.width = settings.x.toString();
		this.canvasCompressionRatio = this.canvas.offsetWidth / settings.x;
	}

	colorSnap() {
		document.querySelector(".loader-wrap").style.visibility = "visible";
		document.querySelector(".loader-wrap").style.opacity = "1";

		const ImageToolsWorker = new Thread();
		ImageToolsWorker.open("imageToolsWorker");

		ImageToolsWorker.send({
			preCompute: this.computedEdgeImage,
			selectedVerts: this.selectedVertices,
			allVerts: DataStore.PreviewLayer.verts,
			radius: DataStore.PreviewLayer.vertexMeta.dist,
			canvas: DataStore.PreviewLayer.imageData,
			propFalloff: DataStore.settings.propFalloff,
		});

		let currentLine = {
			element: null,
			text: null,
			elapsed: 0,
			elapsedSince: null,
		}
		let updateInt;

		ImageToolsWorker.recieve((data) => {
			let operation = data.type.split("-")
			switch (operation[0]) {
				case "result":
					DataStore.PreviewLayer.replaceVertices(data.data);
					this.computedEdgeImage = data.computed;
					ImageToolsWorker.close();
					break;
				case "progress":
					if (data.data.begin) {
						clearInterval(updateInt);
						updateInt = setInterval(() => {
							currentLine.elapsedSince = data.data.startTime;
							currentLine.elapsed = Date.now() - currentLine.elapsedSince;
							currentLine.element.innerHTML = `${currentLine.text} (${Number((currentLine.elapsed / 1000).toFixed(0)) || 0}s)`;
						}, 1000);
						
					}
					if (data.data.complete) {
						setTimeout(() => {
							document.querySelector(".loader-wrap").style.visibility = "hidden";
							document.querySelector(".loader-wrap").style.opacity = 0;
							document.getElementById("loader-progress").innerHTML = "";
						}, 400);
						return;
					}
					if (data.data.new) {
						currentLine.elapsedSince = Date.now();
						currentLine.element = document.createElement("span");
						currentLine.text = data.data.operation;
						document.getElementById("loader-progress").prepend(currentLine.element)
						currentLine.element.innerHTML = `${currentLine.text} (${data.data.elapsedTime || 0}s)`
					} else {
						currentLine.element.innerHTML = `${currentLine.text} (${data.data.elapsedTime}ms)`
					}
					break;
				case "debug":
					if (operation[1] == "drawFull") {
						DataStore.PreviewLayer.imageData.data.set(data.data);
						DataStore.PreviewLayer.ctx.putImageData(DataStore.PreviewLayer.imageData, 0, 0);
					}
					break;
			}
		});
	}

	recalculateSelected() {

		let recalculated = [];
		
		for (let [key, value] of Object.entries(this.selectedVertices)) {
			let dist = DataStore.PreviewLayer.vertexMeta.dist;
			let vertX = dist * value.id[0];
			let vertY = dist * value.id[1];
			let xVari = Math.random() * DataStore.settings.vvar * dist - (DataStore.settings.vvar * dist) / 2;
			let yVari = Math.random() * DataStore.settings.vvar * dist - (DataStore.settings.vvar * dist) / 2;
			recalculated.push({
				id: value.id,
				coord: [vertX + xVari - DataStore.PreviewLayer.vertexMeta.xShift, vertY + yVari - DataStore.PreviewLayer.vertexMeta.yShift]
			});
		}

		DataStore.PreviewLayer.replaceVertices(recalculated);
	}

	activateBrush() {
		document.querySelector(".brush-btn").classList.add("btn-active");
		this.canvas.style.cursor = "crosshair";

		let isInPreviewWindow = false;
		let isInCanvasWindow = false;
		this.canvasCompressionRatio = this.canvas.offsetWidth / DataStore.settings.x;

		// Mouse down and mouse up: set for paint
		window.addEventListener("mousedown", (Event) => {
			if (isInPreviewWindow && isInCanvasWindow) {
				this.ctx.clearRect(0, 0, DataStore.settings.x, DataStore.settings.y);
				this.brush.drawing = true;
				this.selectedVertices = {};
				this.selectVertices(Event);
			}
		}, { signal: this.brush.FollowEvent.signal });

		window.addEventListener("mouseup", () => {
			this.brush.drawing = false;
		}, { signal: this.brush.FollowEvent.signal });

		// Mouse following
		window.addEventListener("mousemove", (Event) => {
			this.selectVertices(Event);
		}, { signal: this.brush.FollowEvent.signal });

		// Wheel zoom
		window.addEventListener("wheel", (Event) => {
			Event.deltaY > 0 ? (this.brush.size -= this.brush.sizeStep) : (this.brush.size += this.brush.sizeStep);
			this.brush.size = Math.max(this.brush.size, this.brush.minSize);
			this.brush.size = Math.min(this.brush.size, this.brush.maxSize);

			if (!this.brush.drawing) {
				this.ctx.clearRect(0, 0, DataStore.settings.x, DataStore.settings.y);
				this.ctx.beginPath();
				this.ctx.lineWidth = DEFAULTS.ui.brushIndicatorWeight / this.canvasCompressionRatio;
				this.ctx.arc(this.brush.posX, this.brush.posY, this.brush.size / this.canvasCompressionRatio, 0, 2 * Math.PI);
				this.ctx.stroke();
			}

			this.drawSelectedVertices();

		}, { signal: this.brush.FollowEvent.signal });

		// Change cursor when on canvas
		document.querySelector(".controls").addEventListener("mouseover", () => {
			if (isInPreviewWindow) {
				isInPreviewWindow = false;
				this.canvas.style.cursor = "default";
			}
		}, { signal: this.brush.FollowEvent.signal });

		this.canvas.addEventListener("mouseover", () => {
			isInPreviewWindow = true;
			isInCanvasWindow = true;
			this.canvas.style.cursor = "crosshair";
		}, { signal: this.brush.FollowEvent.signal });

		this.canvas.addEventListener("mouseout", () => {
			isInCanvasWindow = false;
		}, { signal: this.brush.FollowEvent.signal });
	}

	// Run on mousemove event
	selectVertices(Event) {
		this.isClean = false;

		// Calculate cursor position relative to canvas
		this.brush.posX = ((Event.clientX - this.canvas.getBoundingClientRect().x) / this.canvasCompressionRatio);
		this.brush.posY = ((Event.clientY - this.canvas.getBoundingClientRect().y) / this.canvasCompressionRatio);

		// If not drawing, clear the canvas, draw the indicator, and exit. If drawing, draw the overlay and continue executing.
		if (!this.brush.drawing) {
			this.ctx.beginPath();
			this.ctx.arc(this.brush.posX, this.brush.posY, this.brush.size / this.canvasCompressionRatio, 0, 2 * Math.PI);
			this.ctx.strokeStyle = DEFAULTS.ui.brushIndicatorColor;
			this.ctx.lineWidth = DEFAULTS.ui.brushIndicatorWeight / this.canvasCompressionRatio;
			
			this.brush.points = [];

			this.ctx.clearRect(0, 0, DataStore.settings.x, DataStore.settings.y);

			this.ctx.stroke();
			this.drawSelectedVertices();
			return;
		} else {
			this.brush.points.push([this.brush.posX, this.brush.posY]);
			this.drawBrushStroke();
		}

		// Calculate the nearest vertex to start checking for vertices in the paint area
		let nearestX = Math.round((this.brush.posX / DataStore.PreviewLayer.vertexMeta.dist) + 1.5);    // these magic numbers have to do with the overlap vertices (past the edges)
		let nearestY = Math.round((this.brush.posY / DataStore.PreviewLayer.vertexMeta.dist) + 1.25);   // there might be a way to calculate this, but this does fine

		// Bind so that it doesn't try to search for vertices that don't exist
		nearestY = Math.max(0, Math.min(nearestY, DataStore.PreviewLayer.verts.length - 1));
		nearestX = Math.max(0, Math.min(nearestX, DataStore.PreviewLayer.verts[0].length - 1));

		// Select the vertex
		let nearestVert = DataStore.PreviewLayer.verts[nearestY][nearestX];

		let vertCheckRadius = Math.ceil((this.brush.size / DataStore.PreviewLayer.vertexMeta.dist) / this.canvasCompressionRatio);
		let nearbyVerts = [];

		// Run through all potential nearby verts (square around mouse)
		for (let a = -vertCheckRadius; a <= vertCheckRadius; a++) {
			for (let b = -vertCheckRadius; b <= vertCheckRadius; b++) {
				let checkX = nearestX + b;
				let checkY = nearestY + a;

				// Prevent checking nonexistent verts
				if (checkX < 0 || checkY < 0 || checkX >= DataStore.PreviewLayer.verts[0].length || checkY >= DataStore.PreviewLayer.verts.length) {
					continue;
				}

				// Debug: draw square of checked vertices
				if (DataStore.PreviewLayer.debug.drawAllCheckedVerts) {
					this.ctx.beginPath()
					this.ctx.arc(DataStore.PreviewLayer.verts[checkY][checkX][0], DataStore.PreviewLayer.verts[checkY][checkX][1], 10, 0, 2 * Math.PI);
					this.ctx.fillStyle = "rgba(0,0,255,1)";
					this.ctx.fill();
					this.ctx.fillStyle = DEFAULTS.ui.brushDrawColor;
				}

				// Get the offset between vert being checked and mouse pos
				let dx = this.brush.posX - DataStore.PreviewLayer.verts[nearestY + a][nearestX + b][0];
				let dy = this.brush.posY - DataStore.PreviewLayer.verts[nearestY + a][nearestX + b][1];
				
				// Calculate if vertex is actually inside circle
				let diff = (Math.hypot(dx, dy));
				if (diff < (this.brush.size)  / this.canvasCompressionRatio) {
					let data = [[nearestX + b, nearestY + a], DataStore.PreviewLayer.verts[nearestY + a][nearestX + b]]
					nearbyVerts.push(data);

					// Debug: draw verts inside circle
					if (DataStore.PreviewLayer.debug.drawAllNearestVerts) {
						this.ctx.beginPath()
						this.ctx.arc(DataStore.PreviewLayer.verts[nearestY + a][nearestX + b][0], DataStore.PreviewLayer.verts[nearestY + a][nearestX + b][1], 10, 0, 2 * Math.PI);
						this.ctx.fillStyle = "rgba(0,255,0,1)";
						this.ctx.fill();
						this.ctx.fillStyle = DEFAULTS.ui.brushDrawColor;
					}
				}
			}
		}

		// Assign valid vertices to the selected vertices object
		nearbyVerts.forEach((point) => {
			this.selectedVertices[point[0].toString()] = { id: point[0], coord: point[1] };
		});

		this.drawSelectedVertices();

		// Debug: draw single nearest vertex
		if (DataStore.PreviewLayer.debug.drawNearestVert) {
			this.ctx.beginPath();
			this.ctx.arc(nearestVert[0], nearestVert[1], 10, 0, 2 * Math.PI);
			this.ctx.fillStyle = "rgba(255,0,0,1)";
			this.ctx.fill();
			this.ctx.fillStyle = DEFAULTS.ui.brushDrawColor;
		}
	}

	// Draw the solid edit brush
	drawBrushStroke() {
		this.ctx.lineWidth = (this.brush.size * 2) / this.canvasCompressionRatio;
		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		this.ctx.strokeStyle = DEFAULTS.ui.brushDrawColor;
		this.ctx.clearRect(0, 0, DataStore.settings.x, DataStore.settings.y);
		this.ctx.beginPath();
		this.ctx.moveTo(this.brush.points[0][0], this.brush.points[0][1]);
		for (let point of this.brush.points) {
			this.ctx.lineTo(point[0], point[1]);
		}
		this.ctx.stroke();
	}

	// Clean up after brush is deactivated
   	deactivateBrush() {
		document.querySelector(".brush-btn").classList.remove("btn-active");
		this.canvas.style.cursor = "default";
      	this.brush.FollowEvent.abort();
		this.brush.FollowEvent = new AbortController();
		this.brush.active = false;
		this.brush.points = [];
		this.ctx.clearRect(0, 0, DataStore.settings.x, DataStore.settings.y);
		this.drawSelectedVertices();
	}
	
	// Iterates over each stored vertex and draws it. Called often
	drawSelectedVertices() {
		for (let [key, value] of Object.entries(this.selectedVertices)) {
			this.ctx.beginPath();
			this.ctx.fillStyle = DEFAULTS.ui.selectedVertex.color;
			this.ctx.moveTo(value.coord[0], value.coord[1]);
			this.ctx.arc(value.coord[0], value.coord[1], DEFAULTS.ui.selectedVertex.size / this.canvasCompressionRatio, 0, 2 * Math.PI);
			this.ctx.fill();
		}
	}

	vertexDrag() {
		this.drag.active = !this.drag.active;
		if (this.drag.active) {
			this.deactivateBrush();
			this.prepareVertexDrag();
		} else {
			this.endCanvasDrag();
		}
	}

	prepareVertexDrag() {
		this.canvas.style.cursor = "grab";
		this.drag.vertices = structuredClone(this.selectedVertices);
		this.drag.neighbors = this.getNeighbors();
		DataStore.PreviewLayer.debugDrawListOfVerts(this.drag.neighbors);
		this.canvas.addEventListener("mousedown", (downEvent) => {
			this.drag.dragStart = { x: downEvent.clientX, y: downEvent.clientY };
			this.canvas.addEventListener("mousemove", (dragEvent) => {
				this.manualDrag(dragEvent);
			}, { signal: this.drag.DragEvent.signal });
		}, { signal: this.drag.MouseEvent.signal });

		this.canvas.addEventListener("mouseup", (event) => {
			this.endCanvasDrag();
		}, { signal: this.drag.MouseEvent.signal });
	}

	//? IDEA: if this gets too heavy, just draw the vertices on the edit layer and then redraw the preview on release
	//? IDEA: if edge vertices are detected to enter the frame because of extreme falloff, generate a new line of vertices on that edge

	// Handler for manually dragging vertices. Handles selected vertices and proportional falloff
	manualDrag(mouseEvent) {
		for (const id of Object.keys(this.selectedVertices)) {

			let offsetX = (mouseEvent.clientX - this.drag.dragStart.x) / this.canvasCompressionRatio;
			let offsetY = (mouseEvent.clientY - this.drag.dragStart.y) / this.canvasCompressionRatio;

			this.drag.vertices[id].coord = [
				this.selectedVertices[id].coord[0] + offsetX,
				this.selectedVertices[id].coord[1] + offsetY
			];

			for (let [nID, data] of Object.entries(this.drag.neighbors)) {
				let prop = (this.drag.maxVertexIndex - data.index + 1) / this.drag.maxVertexIndex;
				this.drag.neighbors[nID].delta = [offsetX * prop, offsetY * prop];
			}
		}

		// Throttle the redraw since that's the most expensive part of this operation by far
		let now = Date.now();
		if (now - this.drag.lastRedraw > this.drag.redrawDelay) {
			DataStore.PreviewLayer.replaceVertices(this.drag.vertices, false);
			DataStore.PreviewLayer.replaceVertices(this.drag.neighbors);
			this.drag.lastRedraw = Date.now();
		}
	}

	getNeighbors() {
		const neighbors = {};

		for (const [id, vertex] of Object.entries(this.selectedVertices)) {
			let startX = Math.max(vertex.id[0] - DataStore.settings.propFalloff + 1, 0);
			let startY = Math.max(vertex.id[1] - DataStore.settings.propFalloff + 1, 0);
			let endX = Math.min(vertex.id[0] + DataStore.settings.propFalloff, DataStore.PreviewLayer.verts[0].length - 1);
			let endY = Math.min(vertex.id[1] + DataStore.settings.propFalloff, DataStore.PreviewLayer.verts.length - 1);
			
			for (let x = startX; x < endX; x++) {
				for (let y = startY; y < endY; y++) {
					if (!!this.selectedVertices[`${x},${y}`]) {
						continue;
					}

					// get distance from vertex (trim vertices that aren't in a circle)
					let d = Math.sqrt(
						Math.abs(vertex.coord[0] - DataStore.PreviewLayer.verts[y][x][0]) ** 2  +
						Math.abs(vertex.coord[1] - DataStore.PreviewLayer.verts[y][x][1]) ** 2
					);

					if (d > (DataStore.settings.propFalloff - 1) * DataStore.PreviewLayer.vertexMeta.dist) {
						continue;
					}

					// nth point away from the origin (roughly)
					let idx = Math.max(1, Math.round(Math.sqrt((vertex.id[0] - x) ** 2 + (vertex.id[1] - y) ** 2)));

					this.drag.maxVertexIndex = idx > this.drag.maxVertexIndex ? idx : this.drag.maxVertexIndex;

					// If the neighbor is already found, avoid overwrite and ensure the index is the lowest possible value
					if (!!neighbors[`${x},${y}`]) {
						neighbors[`${x},${y}`].index = idx < neighbors[`${x},${y}`].index ? idx : neighbors[`${x},${y}`].index;
					} else {
						neighbors[`${x},${y}`] = { id: [x, y], coord: structuredClone(DataStore.PreviewLayer.verts[y][x]), index: idx, delta: [] };
					}
				}
			}
		}
		return neighbors;
	}

	endCanvasDrag() {
		this.canvas.style.cursor = "default";
		this.drag.DragEvent.abort();
		this.drag.DragEvent = new AbortController();
	}

	// Helper function to wipe the edit layer
	clean(resetSelectedVerts = true) {
		if (this.isClean) return;

		if (resetSelectedVerts) this.selectedVertices = {};
		this.ctx.clearRect(0, 0, DataStore.settings.x, DataStore.settings.y);
	}
}