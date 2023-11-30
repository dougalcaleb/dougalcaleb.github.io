import { DEFAULTS } from "./globals.js";

let DataStore;

// Main canvas control
export class Preview {
	constructor(store) {

		DataStore = store;

		// HTML Canvas element
		this.canvas = document.getElementById("canvas-main");
		// Canvas context
		this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
		
		this.dummyCanvas = new OffscreenCanvas(1,1);
		this.dummyCtx = this.dummyCanvas.getContext("2d");

		this.xAngles = null;
		this.yAngles = null;

		// Draw throttle
		this.redrawDelay = DEFAULTS.inputs.previewRedrawDelay;
		this.allowRedraw = true;
		this.redrawTimeout = null;

		// Debug
		this.debug = {
			drawPoints: false,
			drawAvgs: false,
			drawGradientLine: false,
			drawGradient: true,
			drawNearestVert: false,
			drawAllNearestVerts: false,
			drawAllCheckedVerts: false,
			drawVertexCoords: false,
		};

		// These are accessed externally by the brush mode
		this.vertCount = { x: null, y: null }

		// Values used in calculating vertex final positions. Accessed by brush mode
		this.vertexMeta = {
			dist: null,
			xCount: 0,
			yCount: 0,
			xShift: 0,
			yShift: 0,
		}

		// Generated verticies
		this.verts = [];

		// Pixel data
		this.imageData = null;

		// Angle from centerpoint to corner
		this.idealAngle = null;

		// Drawn image
		this.imgSrc = null;
	}

	draw(newVerts = true) {
		if (DataStore.settings.mode == "image" && this.imgSrc == null) {
			return;
		}

		// Clear canvas for new draw. Prevents contamination of colors between changes
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		DataStore.EditLayer.clean(false);

		// Set canvas dimensions
		if (DataStore.settings.mode != "image") {
			this.canvas.height = DataStore.settings.y.toString();
			this.canvas.width = DataStore.settings.x.toString();

			this.dummyCanvas.height = DataStore.settings.y.toString();
			this.dummyCanvas.width = DataStore.settings.x.toString();

			DataStore.EditLayer.canvas.height = DataStore.settings.y.toString();
			DataStore.EditLayer.canvas.width = DataStore.settings.x.toString();
		}

		// Calculate ideal angle (angle from corner to corner of canvas, used for snapping rotation to diagonals)
		this.idealAngle = Math.atan(DataStore.settings.y / DataStore.settings.x);

		// Generate verticies
		if (newVerts) {
			this.verts = this.verticies();
		}

		// Draw underlying gradient or image
		if (DataStore.settings.mode != "image") {
			this.drawGradient();
		} else {
			this.ctx.drawImage(this.imgSrc, 0, 0);
		}

		// Get pixel data
		this.imageData = this.ctx.getImageData(0, 0, DataStore.settings.x, DataStore.settings.y);
		if (this.debug.drawPoints) {
			this.drawPoints();
		}

		// Create and draw polygons
		this.polygons();
	}

	// Replace existing vertices with newly calculated vertices. Used by edit mode Recalculate Vertices functionality
	replaceVertices(newVerts) {
		// console.log("replacting verts. verts before:");
		// console.log(this.verts);
		for (let [key, value] of Object.entries(newVerts)) {
			this.verts[value.id[1]][value.id[0]] = value.coord;
		}
		this.draw(false);
	}

	// Generates and returns the verticies
	verticies() {
		// Distance between non-varied verticies (x-based)
		let dist = DataStore.settings.x / (DEFAULTS.ui.csize[1] - DataStore.settings.csize);

		this.vertexMeta.dist = dist;

		// Vertex counts
		let xc = Math.ceil(DataStore.settings.x / dist + 1) + 2; // magic number helps to correct image peeking through.
		let yc = Math.ceil(DataStore.settings.y / dist + 2);

		this.vertexMeta.xCount = xc;
		this.vertexMeta.yCount = yc;

		this.vertCount = { x: xc, y: yc };

		// Pre-variance shifts to center verticies
		let xshift = (dist * xc - DataStore.settings.x) / 2;
		let yshift = (dist * yc - DataStore.settings.y) / 2;

		this.vertexMeta.xShift = xshift;
		this.vertexMeta.yShift = yshift;

		let verts = [];

		// Create vertex placements
		for (let a = 0; a <= yc; a++) {
			let row = [];
			for (let b = 0; b < xc; b++) {
				let vertX = dist * b;
				let vertY = dist * a;
				let xVari = Math.random() * DataStore.settings.vvar * dist - (DataStore.settings.vvar * dist) / 2;
				let yVari = Math.random() * DataStore.settings.vvar * dist - (DataStore.settings.vvar * dist) / 2;
				row.push([vertX + xVari - xshift, vertY + yVari - yshift]);
			}
			verts.push(row);
		}

		return verts;
	}

	// Debug draw verticies
	drawPoints() {
		this.ctx.fillStyle = "red";
		for (let a = 0; a < this.verts.length; a++) {
			for (let b = 0; b < this.verts[a].length; b++) {
				this.ctx.beginPath();
				this.ctx.arc(this.verts[a][b][0], this.verts[a][b][1], 5, 0, Math.PI * 2);
				this.ctx.fill();
			}
		}
	}

	debugDrawListOfVerts(verts, drawData = null) {
		this.ctx.fillStyle = drawData?.color || "red";
		for (let [id, data] of Object.entries(verts)) {
			this.ctx.beginPath();
			this.ctx.arc(data.coord[0], data.coord[1], drawData?.size || 5, 0, Math.PI * 2);
			this.ctx.fill();
		}
	}

	// Calculate and draw the underlying gradient that will be used to determine the colors of the polygons
	drawGradient() {
		let gradient, gradData;
		if (DataStore.settings.mode == "linear") {
			// Center coords (also lengths to center)
			let centerX = DataStore.settings.x / 2;
			let centerY = DataStore.settings.y / 2;
			let rad = Preview.degToRad(DataStore.settings.rot);
			let r;

			let knownX = null;
			let knownY = null;

			let angleOffset = this.xAngles * 0.5;

			// Calculate which quadrant of the rectangle the angle is pointed. Use that to calculate the length that the gradient should be so it doesn't leave the edges
			if (rad <= angleOffset || rad >= Math.PI * 2 - angleOffset) {
				// right quad
				knownX = centerX;
				r = knownX / Math.cos(rad);
			} else if (rad >= angleOffset && rad <= angleOffset + this.yAngles) {
				// top quad
				knownY = centerY;
				r = knownY / Math.sin(rad);
			} else if (rad >= angleOffset + this.yAngles && rad <= angleOffset + this.xAngles + this.yAngles) {
				// left quad
				knownX = -1 * centerX;
				r = knownX / Math.cos(rad);
			} else if (rad >= angleOffset + this.xAngles + this.yAngles && rad <= 2 * Math.PI - angleOffset) {
				// bottom quad
				knownY = -1 * centerY;
				r = knownY / Math.sin(rad);
			} else {
				console.warn("Invalid Rotation. Cannot calculate quadrant.");
			}

			// Start and end coords of gradient
			let x1, y1, x2, y2;

			let sin = Math.sin(rad) * r;
			let cos = Math.cos(rad) * r;

			// XY pair 1
			x1 = centerX - cos;
			y1 = centerY + sin;

			// XY pair 2
			x2 = centerX + cos;
			y2 = centerY - sin;

			// Draws a ling perpendicular to the gradient, including endpoints
			if (this.debug.drawGradientLine) {
				this.ctx.fillStyle = "pink";
				this.ctx.beginPath();
				this.ctx.arc(x1, y1, 20, 0, Math.PI * 2);
				this.ctx.fill();
				this.ctx.fillStyle = "orange";
				this.ctx.beginPath();
				this.ctx.arc(x2, y2, 20, 0, Math.PI * 2);
				this.ctx.fill();
				this.ctx.strokeStyle = "red";
				this.ctx.beginPath();
				this.ctx.moveTo(x1, y1);
				this.ctx.lineTo(x2, y2);
				this.ctx.stroke();
			}

			gradData = {
				type: "linear",
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2,
				stops: []
			};

			gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
		} else {
			gradData = {
				type: "radial",
				x: DataStore.settings.posx,
				y: DataStore.settings.posy,
				iRad: DataStore.settings.irad * Math.max(DataStore.settings.x, DataStore.settings.y),
				oRad: DataStore.settings.orad * Math.max(DataStore.settings.x, DataStore.settings.y),
				stops: []
			};
			gradient = this.ctx.createRadialGradient(
				DataStore.settings.posx * DataStore.settings.x,
				DataStore.settings.posy * DataStore.settings.y,
				DataStore.settings.irad * Math.max(DataStore.settings.x, DataStore.settings.y),
				DataStore.settings.posx * DataStore.settings.x,
				DataStore.settings.posy * DataStore.settings.y,
				DataStore.settings.orad * Math.max(DataStore.settings.x, DataStore.settings.y)
			);
		}

		// Add color stops
		for (let a = 0; a < DataStore.settings.colors.length; a++) {
			gradient.addColorStop(DataStore.settings.colors[a].stop, DataStore.settings.colors[a].color);
			gradData.stops.push([DataStore.settings.colors[a].stop, DataStore.settings.colors[a].color]);
		}

		// Draw
		if (this.debug.drawGradient) {
			this.ctx.fillStyle = gradient;
			this.ctx.fillRect(0, 0, DataStore.settings.x, DataStore.settings.y);
		}

		DataStore.set("gradientData", gradData);
	}

	polygons() {
		// Convert outline color from hex to rgb and add opacity
		let hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(DataStore.settings.line);
		let rgb = parseInt(hex[1], 16) + "," + parseInt(hex[2], 16) + "," + parseInt(hex[3], 16);
		this.ctx.strokeStyle = `rgba(${rgb}, ${DataStore.settings.lineOp})`;

		for (let a = 0; a < this.verts.length; a++) {
			for (let b = 0; b < this.verts[a].length; b++) {

				// Centers of triangles
				let avgX1, avgX2, avgY1, avgY2;

				// Skip over edges
				if (!this.verts[a + 1] || !this.verts[a][b + 1] || !this.verts[a + 1][b + 1]) {
					continue;
				}

				if (this.debug.drawVertexCoords) {
					this.ctx.fillStyle = "black";
					this.ctx.font = "20px serif"
					this.ctx.fillText(`(${b},${a})`, this.verts[a][b][0] - 40, this.verts[a][b][1])
				}
				
				// top left to bottom right distance
				let tlbrLength = Math.hypot(this.verts[a + 1][b + 1][0] - this.verts[a][b][0], this.verts[a + 1][b][1] - this.verts[a][b][1]).toFixed(2);
				// top right to bottom left distance
				let trblLength = Math.hypot(this.verts[a][b + 1][0] - this.verts[a][b][0], this.verts[a + 1][b + 1][1] - this.verts[a][b][1]).toFixed(2);
				
				// Decide which way the triangle points
				let tri;
				if (tlbrLength < trblLength) { // choose the direction that makes the cut shorter
					tri = 0
				} else if (tlbrLength == trblLength) { // if they're equal (in the case of 0 vertex variance) make it random
					tri = Math.floor(Math.random() * 2);
				} else { // if the above comparison isn't the shorter one, do the shorter one
					tri = 1;
				}

				this.ctx.beginPath();

				// Draw triangle line
				if (tri == 0) {
					// tl to br
					// Get centers
					avgX1 = (this.verts[a][b][0] + this.verts[a][b + 1][0] + this.verts[a + 1][b + 1][0]) / 3;
					avgY1 = (this.verts[a][b][1] + this.verts[a][b + 1][1] + this.verts[a + 1][b + 1][1]) / 3;
					avgX2 = (this.verts[a][b][0] + this.verts[a + 1][b][0] + this.verts[a + 1][b + 1][0]) / 3;
					avgY2 = (this.verts[a][b][1] + this.verts[a + 1][b][1] + this.verts[a + 1][b + 1][1]) / 3;
					// Upper right triangle
					this.ctx.fillStyle = this.getPixelColor(avgX1, avgY1);
					this.ctx.moveTo(this.verts[a][b][0], this.verts[a][b][1]);
					this.ctx.lineTo(this.verts[a][b + 1][0], this.verts[a][b + 1][1]);
					this.ctx.lineTo(this.verts[a + 1][b + 1][0], this.verts[a + 1][b + 1][1]);
					this.ctx.closePath();
					this.ctx.fill();
					this.ctx.stroke();
					// Bottom left triangle
					this.ctx.fillStyle = this.getPixelColor(avgX2, avgY2);
					this.ctx.beginPath();
					this.ctx.moveTo(this.verts[a][b][0], this.verts[a][b][1]);
					this.ctx.lineTo(this.verts[a + 1][b][0], this.verts[a + 1][b][1]);
					this.ctx.lineTo(this.verts[a + 1][b + 1][0], this.verts[a + 1][b + 1][1]);
					this.ctx.closePath();
					this.ctx.fill();
					this.ctx.stroke();
				} else {
					// tr to bl
					// Bottom right triangle
					avgX1 = (this.verts[a][b][0] + this.verts[a + 1][b][0] + this.verts[a + 1][b + 1][0]) / 3;
					avgY1 = (this.verts[a][b][1] + this.verts[a + 1][b][1] + this.verts[a + 1][b + 1][1]) / 3;
					avgX2 = (this.verts[a][b][0] + this.verts[a][b + 1][0] + this.verts[a + 1][b + 1][0]) / 3;
					avgY2 = (this.verts[a][b][1] + this.verts[a][b + 1][1] + this.verts[a + 1][b + 1][1]) / 3;
					this.ctx.fillStyle = this.getPixelColor(avgX1, avgY1);
					this.ctx.moveTo(this.verts[a][b + 1][0], this.verts[a][b + 1][1]);
					this.ctx.lineTo(this.verts[a + 1][b + 1][0], this.verts[a + 1][b + 1][1]);
					this.ctx.lineTo(this.verts[a + 1][b][0], this.verts[a + 1][b][1]);
					this.ctx.closePath();
					this.ctx.fill();
					this.ctx.stroke();
					// Upper left triangle
					this.ctx.fillStyle = this.getPixelColor(avgX2, avgY2);
					this.ctx.beginPath();
					this.ctx.moveTo(this.verts[a][b][0], this.verts[a][b][1]);
					this.ctx.lineTo(this.verts[a][b + 1][0], this.verts[a][b + 1][1]);
					this.ctx.lineTo(this.verts[a + 1][b][0], this.verts[a + 1][b][1]);
					this.ctx.closePath();
					this.ctx.fill();
					this.ctx.stroke();
				}

				// Draw dots at the average points in the polygons where color will be drawn from
				if (this.debug.drawAvgs) {
					this.ctx.fillStyle = "white";
					this.ctx.beginPath();
					this.ctx.arc(avgX1, avgY1, 2, 0, Math.PI * 2);
					this.ctx.fill();
					this.ctx.fillStyle = "black";
					this.ctx.beginPath();
					this.ctx.arc(avgX2, avgY2, 2, 0, Math.PI * 2);
					this.ctx.fill();
				}
			}
		}
	}

	// helper function to draw a batch of pixels. Primarily for debug.
	drawBatchPixels(pixels, size = 1, color = "rgba(0,0,0,255)") {
		this.ctx.fillStyle = color;
		for (let pixel of pixels) {
			this.ctx.fillRect(pixel[0], pixel[1], size, size);
		}
	}

	// Returns an RGBA color of the color at a given pixel on the canvas
	getPixelColor(x, y) {
		// Adjust and correct given XY coords to be valid
		x = Math.round(x);
		y = Math.round(y);
		if (x < 0) {
			x = 0;
		}
		if (y < 0) {
			y = 0;
		}
		if (x > DataStore.settings.x - 1) {
			x = DataStore.settings.x - 1;
		}
		if (y > DataStore.settings.y - 1) {
			y = DataStore.settings.y - 1;
		}
		// Get pixel color from canvas and apply brightness alterations to RGB components
		let posNeg = DataStore.settings.bmode == "lighten" ? 1 : -1;
		let bvar = Math.floor(Math.random() * DataStore.settings.bvar);
		let r = this.imageData.data[y * (this.imageData.width * 4) + x * 4] + bvar * posNeg;
		let g = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 1] + bvar * posNeg;
		let b = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 2] + bvar * posNeg;
		let a = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 3];
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}

	// Draw a loaded image onto the canvas
	drawImg(image) {
		let fr = new FileReader();
		fr.readAsDataURL(image);
		fr.onload = () => {
			let img = new Image();
			img.src = fr.result;
			img.onload = () => {
				this.canvas.width = img.width;
				this.canvas.height = img.height;
				document.querySelector(".image-height").value = img.height;
				document.querySelector(".image-width").value = img.width;
				DataStore.settings.x = img.width;
				DataStore.settings.y = img.height;
				DataStore.EditLayer.updateSettings(DataStore.settings);
				this.imgSrc = img;
				this.ctx.drawImage(img, 0, 0);
				this.draw(true);
			};
		};
	}

	static degToRad(deg) {
		return (deg * Math.PI) / 180;
	}
	static radToDeg(rad) {
		return (rad * 180) / Math.PI;
	}
}