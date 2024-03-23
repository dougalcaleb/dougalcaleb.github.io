import Store from "./store.js";
import Utils from "../modules/utility.js";

export default class Canvas {
	ctx = null;
	drawType = "polygons"; // "gradient" "image" "polygons"

	_imgSrc = null;
	_imageData = null;
	_isBaseCanvas = false;
	_canvasElement = null;
	_parentLayer = null;

	#lastDraw = 0;
	#redrawPending = false;
	#redrawTimeout = null;

	#willReadFrequently = false;

	// Debug
	#debug = {
		drawPoints: false,
		drawAvgs: false,
		drawGradientLine: false,
		drawGradient: true,
		drawNearestVert: false,
		drawAllNearestVerts: false,
		drawAllCheckedVerts: false,
		drawVertexCoords: false,
	};

	constructor(transparency = true, willReadFrequently = false) {
		this.#willReadFrequently = willReadFrequently;
		this._canvasElement = document.createElement("canvas");;
		this._canvasElement.width = Store.settings.x;
		this._canvasElement.height = Store.settings.y;
		this._canvasElement.classList.add("main-canvas");
		if (this.index === 0) {
			this._canvasElement.id = "canvas-main";
		}
		document.querySelector(".preview").appendChild(this._canvasElement);

		this.ctx = this._canvasElement.getContext("2d", { alpha: transparency, willReadFrequently: willReadFrequently });
	}

	Draw(clearCanvas = true) {
		if (this.drawType == "gradient") {
			this.DrawGradient(clearCanvas);
		} else if (this.drawType == "image") {
			this.#imgToCanvas();
		} else if (this.drawType == "polygons") {
			this.DrawPolygons(clearCanvas);
		}
		if (this.#willReadFrequently) {
			this._imageData = this.ctx.getImageData(0, 0, this._canvasElement.width, this._canvasElement.height);
		}
	}

	DrawPolygons(clearBeforeDraw = true) {
		// Throttle redraws
		if (Date.now() - this.#lastDraw < Store.Defaults.INPUTS.PREVIEW_REDRAW_DELAY) {
			if (!this.#redrawPending) {
				this.#redrawPending = true;
				this.#redrawTimeout = setTimeout(() => {
					this.DrawPolygons();
					this.#redrawPending = false;
				}, Store.Defaults.INPUTS.PREVIEW_REDRAW_DELAY);
			}
			return;
		}
		clearTimeout(this.#redrawTimeout);
		this.#redrawPending = false;
		this.#redrawTimeout = null;

		this.#lastDraw = Date.now();
		this.drawType = "polygons";

		if (clearBeforeDraw) {
			this.ctx.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
		}

		this._parentLayer.polygons.forEach((polygon) => {
			const outlineColorRaw = Utils.hexToRgb(this._parentLayer.settings.lineColor);
			const outlineColor = `rgba(${outlineColorRaw.r}, ${outlineColorRaw.g}, ${outlineColorRaw.b}, ${this._parentLayer.settings.lineOpacity})`;
			this.ctx.strokeStyle = outlineColor;
			const color = polygon.GetColor(true);
			this.ctx.fillStyle = color;
			this.ctx.beginPath();
			this.ctx.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);
			for (let i = 1; i < polygon.vertices.length; i++) {
				this.ctx.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
			}
			this.ctx.closePath();
			this.ctx.fill();
			this.ctx.stroke();
		});
	}

	// Calculate and draw a gradient on this canvas
	DrawGradient(clearBeforeDraw = true) {
		if (!this._isBaseCanvas) {
			console.error("The canvas you are trying to draw on is not the base canvas. Please use the base canvas to draw gradients.");
			console.trace();
			return;
		}
		// Throttle redraws
		if (Date.now() - this.#lastDraw < Store.Defaults.INPUTS.PREVIEW_REDRAW_DELAY) {
			if (!this.#redrawPending) {
				this.#redrawPending = true;
				this.#redrawTimeout = setTimeout(() => {
					this.DrawGradient();
					this.#redrawPending = false;
				}, Store.Defaults.INPUTS.PREVIEW_REDRAW_DELAY);
			}
			return;
		}

		clearTimeout(this.#redrawTimeout);
		this.#redrawPending = false;
		this.#redrawTimeout = null;

		this.#lastDraw = Date.now();
		this.drawType = "gradient";

		if (clearBeforeDraw) {
			this.ctx.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
		}

		let gradient, gradData;
		if (Store.settings.mode == "linear") {
			// Linear gradient
			// Center coords (also lengths to center)
			let centerX = Store.settings.x / 2;
			let centerY = Store.settings.y / 2;
			let rad = Utils.degToRad(Store.settings.rotation);
			let r;

			let knownX = null;
			let knownY = null;

			let angleOffset = Store.Preview.xAngles * 0.5;

			// Calculate which quadrant of the rectangle the angle is pointed. Use that to calculate the length that the gradient should be so it doesn't leave the edges
			if (rad <= angleOffset || rad >= Math.PI * 2 - angleOffset) {
				// right quad
				knownX = centerX;
				r = knownX / Math.cos(rad);
			} else if (rad >= angleOffset && rad <= angleOffset + Store.Preview.yAngles) {
				// top quad
				knownY = centerY;
				r = knownY / Math.sin(rad);
			} else if (rad >= angleOffset + Store.Preview.yAngles && rad <= angleOffset + Store.Preview.xAngles + Store.Preview.yAngles) {
				// left quad
				knownX = -1 * centerX;
				r = knownX / Math.cos(rad);
			} else if (rad >= angleOffset + Store.Preview.xAngles + Store.Preview.yAngles && rad <= 2 * Math.PI - angleOffset) {
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

			// Draws a line perpendicular to the gradient, including endpoints
			if (this.#debug.drawGradientLine) {
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
			// Radial gradient
			gradData = {
				type: "radial",
				x: Store.settings.posx,
				y: Store.settings.posy,
				iRad: Store.settings.irad * Math.max(Store.settings.x, Store.settings.y),
				oRad: Store.settings.orad * Math.max(Store.settings.x, Store.settings.y),
				stops: []
			};
			gradient = this.ctx.createRadialGradient(
				Store.settings.posx * Store.settings.x,
				Store.settings.posy * Store.settings.y,
				Store.settings.irad * Math.max(Store.settings.x, Store.settings.y),
				Store.settings.posx * Store.settings.x,
				Store.settings.posy * Store.settings.y,
				Store.settings.orad * Math.max(Store.settings.x, Store.settings.y)
			);
		}

		// Add color stops
		Store.Preview.activePalette.forEach((color) => {
			gradient.addColorStop(color.stop, color.color);
			gradData.stops.push([color.stop, color.color]);
		});

		// Draw
		this.ctx.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, Store.settings.x, Store.settings.y);

		Store.Preview.gradientData = gradData;

		if (this.#willReadFrequently) {
			this._imageData = this.ctx.getImageData(0, 0, this._canvasElement.width, this._canvasElement.height);
		}
	}

	// Get pixel color from canvas. Optionally apply brightness variance
	GetPixelColor(x, y, options = { return: "rgba", applyVariance: false, forceRead: false }) {
		if (!this.#willReadFrequently && !options.forceRead) {
			console.warn("This canvas is not set to read frequently. If you need to read pixel data frequently, please set the 'willReadFrequently' parameter to true.");
		}
		// Adjust and correct given XY coords to be valid
		x = Math.round(x);
		y = Math.round(y);
		if (x < 0) {
			x = 0;
		}
		if (y < 0) {
			y = 0;
		}
		if (x > Store.settings.x - 1) {
			x = Store.settings.x - 1;
		}
		if (y > Store.settings.y - 1) {
			y = Store.settings.y - 1;
		}
		// Get pixel color from canvas
		let r = this._imageData.data[y * (this._imageData.width * 4) + x * 4];
		let g = this._imageData.data[y * (this._imageData.width * 4) + x * 4 + 1];
		let b = this._imageData.data[y * (this._imageData.width * 4) + x * 4 + 2];
		let a = this._imageData.data[y * (this._imageData.width * 4) + x * 4 + 3];
		// Apply brightness alterations to RGB components
		if (options.applyVariance) {
			let bvar = Math.floor(Math.random() * Store.Preview.activeLayer.settings.colorRand);
			let posNeg = Store.Preview.activeLayer.settings.colorMode;
			r = Utils.colorVariance(r, bvar, posNeg);
			g = Utils.colorVariance(g, bvar, posNeg);
			b = Utils.colorVariance(b, bvar, posNeg);
		}
		if (!options.return || options.return == "rgba") {
			return "rgba(" + r + "," + g + "," + b + "," + a + ")";
		} else if (options.return == "object") {
			return { r, g, b, a };
		} else {
			throw new Error("Invalid return type. Please use 'rgba' or 'object'.");
		}
	}

	// Draw an image on this canvas
	DrawImage(image) {
		if (!this._isBaseCanvas) {
			console.error("The canvas you are trying to draw on is not the base canvas. Please use the base canvas to draw images.");
			return;
		}
		this.drawType = "image";

		const fr = new window.FileReader();
		fr.readAsDataURL(image);
		fr.onload = () => {
			const img = new Image();
			img.src = fr.result;
			img.onload = () => {
				this._canvasElement.width = img.width;
				this._canvasElement.height = img.height;
				document.querySelector(".image-height").value = img.height;
				document.querySelector(".image-width").value = img.width;
				this.imgSrc = img;
				this.#imgToCanvas();
				Store.settings.setFromImg(img.width, img.height);
				Store.Preview.setAngles();
			};
		};
	}

	// Helper
	#imgToCanvas() {
		if (!this._isBaseCanvas) {
			console.error("The canvas you are trying to draw on is not the base canvas. Please use the base canvas to draw images.");
			return;
		}
		this.ctx.drawImage(this.imgSrc, 0, 0);
		if (this.#willReadFrequently) {
			this._imageData = this.ctx.getImageData(0, 0, this._canvasElement.width, this._canvasElement.height);
		}
	}
}