const defaults = {
	ui: {
		csize: [5, 200],
	},
	inputs: {
		debounce: 500,
	},
};

/*

TODO:
Bugfixes:
- Rotation snap is broken now

Features:
- Brush tool:
   - Regnerate sections of vertices (useful for when it makes wonky triangles)
   - Snap to color
   - Should select (paint) and then apply after. Can use to impose a limit
   - Falloff for snap to color?
   - Drag individual vertices
      - Transparency mode?

- Zoom with scroll wheel?

*/

// Control panel UI
class Controls {
	constructor() {
		this.activeType = 0;
		// All settings
		this.settings = {
			mode: "linear",
			vvar: 0.9,
			csize: 185,
			bvar: 0,
			bmode: "darken",
			rot: 0,
			posx: 0.5,
			posy: 0.5,
			irad: 0,
			orad: 0.5,
			line: "#ffffff",
			lineOp: 0,
			edge: "varied",
			x: 1920,
			y: 1080,
			colors: [],
		};
		// Color palettes
		this.defaultPalettes = [
			["#f3e1af", "#f09c3d", "#f0693d", "#f03d72", "#9f3df0", "#3d81f0", "#037ac4"],
			["#e7e98b", "#8be9d2", "#73b5dd", "#1074b1", "#014e7e"],
			["#787878", "#454545", "#333333", "#454545", "#787878"],
			["#011fb7", "#5c01b7", "#3b0e67"],
		];
		this.palettes = [];
		// Name to use for localStorage API
		this.savePalettesAs = "polygen-palettes";
	}

	// Basic setup - hide irrelevant controls, setup listeners, setup canvas
	init() {
		for (let a = 0; a < document.querySelectorAll(".fortype-1").length; a++) {
			if (!document.querySelectorAll(".fortype-1")[a].classList.contains("fortype-0")) {
				document.querySelectorAll(".fortype-1")[a].style.height = "0px";
			}
		}
		for (let a = 0; a < document.querySelectorAll(".fortype-2").length; a++) {
			document.querySelectorAll(".fortype-2")[a].style.height = "0px";
		}
		this.populate();
		this.buttonListeners();
		this.rangeListeners();
		this.miscListeners();
		Canvas.canvas.height = this.settings.y.toString();
		Canvas.canvas.width = this.settings.x.toString();

		this.settings.colors = this.palettes[0];

		Canvas.updateSettings(this.settings);
	}

	// Populate different repetitive elements of the UI like buttons and palettes
	populate() {
		// Fill in rotation buttons
		let svgs = [
			`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>`, // up
			`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>`, // down
			`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>`, // left
			`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>`, // right

			`<svg viewBox="0 0 24 24" style="transform: rotate(45deg)"><path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>`, // tr
			`<svg viewBox="0 0 24 24" style="transform: rotate(45deg)"><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>`, // bl
			`<svg viewBox="0 0 24 24" style="transform: rotate(45deg)"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>`, // tl
			`<svg viewBox="0 0 24 24" style="transform: rotate(45deg)"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>`, // br
		];

		for (let a = 0; a < document.querySelectorAll(".rot-snap").length; a++) {
			document.querySelectorAll(".rot-snap")[a].innerHTML = svgs[a];
		}

		// Fetch palettes from localStorage
		let startingPalettes = [];

		let custom = JSON.parse(localStorage.getItem(this.savePalettesAs));
		if (custom && custom.length > 0) {
			startingPalettes = custom;
		} else {
			startingPalettes = this.defaultPalettes;
		}

		// Populate color palettes
		for (let a = 0; a < startingPalettes.length; a++) {
			this.addPalette(startingPalettes[a], false);
		}

		localStorage.setItem(this.savePalettesAs, JSON.stringify(this.palettes));
	}

	// Add a color palette
	addPalette(colors) {
		let pos = this.palettes.length;

		let wrap = document.createElement("DIV");
		wrap.classList.add("palette");
		let palette = document.createElement("DIV");
		palette.classList.add("palette-colors");
		for (let b = 0; b < colors.length; b++) {
			let el = document.createElement("DIV");
			el.classList.add("palette-color");
			el.style.background = colors[b];
			palette.appendChild(el);
		}
		let opts = document.createElement("DIV");
		opts.classList.add("palette-options");
		opts.innerHTML = `
         <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
      `;
		wrap.appendChild(palette);
		wrap.appendChild(opts);
		document.querySelector(".control-palettes").insertBefore(wrap, document.querySelector(".control-palettes").childNodes[2]);

		opts.children[0].addEventListener("click", async () => {
			let newColors = await Modal.modal("Edit Color Palette", this.palettes[pos]);
			Modal.destroy();
			if (newColors.length != 0) {
				this.palettes[pos] = newColors;
				localStorage.setItem(this.savePalettesAs, JSON.stringify(this.palettes));
				while (palette.childElementCount > 0) {
					palette.removeChild(palette.children[0]);
				}
				for (let a = 0; a < newColors.length; a++) {
					let el = document.createElement("DIV");
					el.classList.add("palette-color");
					el.style.background = newColors[a];
					palette.appendChild(el);
				}
			}
		});

		wrap.addEventListener("click", () => {
			this.settings.colors = this.palettes[pos];
			Canvas.updateSettings(this.settings, false);
		});

		if (!this.palettes.includes(colors)) {
			this.palettes.push(colors);
			localStorage.setItem(this.savePalettesAs, JSON.stringify(this.palettes));
		}
	}

	// Event listeners for buttons
	buttonListeners() {
		document.querySelector(".type-0").addEventListener("click", () => {
			document.querySelector(".type-btn.btn-active").classList.remove("btn-active");
			for (let a = 0; a < document.querySelectorAll(".fortype-0").length; a++) {
				document.querySelectorAll(".fortype-0")[a].style.height = "";
			}
			for (let a = 0; a < document.querySelectorAll(".fortype-1").length; a++) {
				if (!document.querySelectorAll(".fortype-1")[a].classList.contains("fortype-0")) {
					document.querySelectorAll(".fortype-1")[a].style.height = "0px";
				}
			}
			for (let a = 0; a < document.querySelectorAll(".fortype-2").length; a++) {
				document.querySelectorAll(".fortype-2")[a].style.height = "0px";
			}
			document.querySelector(".type-0").classList.add("btn-active");
			this.activeType = 0;
			this.settings.mode = "linear";
			Canvas.updateSettings(this.settings);
		});
		document.querySelector(".type-1").addEventListener("click", () => {
			document.querySelector(".type-btn.btn-active").classList.remove("btn-active");
			for (let a = 0; a < document.querySelectorAll(".fortype-0").length; a++) {
				document.querySelectorAll(".fortype-0")[a].style.height = "0px";
			}
			for (let a = 0; a < document.querySelectorAll(".fortype-1").length; a++) {
				document.querySelectorAll(".fortype-1")[a].style.height = "";
			}
			for (let a = 0; a < document.querySelectorAll(".fortype-2").length; a++) {
				document.querySelectorAll(".fortype-2")[a].style.height = "0px";
			}
			document.querySelector(".type-1").classList.add("btn-active");
			this.activeType = 1;
			this.settings.mode = "radial";
			Canvas.updateSettings(this.settings);
		});
		document.querySelector(".type-2").addEventListener("click", () => {
			document.querySelector(".type-btn.btn-active").classList.remove("btn-active");
			for (let a = 0; a < document.querySelectorAll(".fortype-0").length; a++) {
				document.querySelectorAll(".fortype-0")[a].style.height = "0px";
			}
			for (let a = 0; a < document.querySelectorAll(".fortype-1").length; a++) {
				document.querySelectorAll(".fortype-1")[a].style.height = "0px";
			}
			for (let a = 0; a < document.querySelectorAll(".fortype-2").length; a++) {
				document.querySelectorAll(".fortype-2")[a].style.height = "";
			}
			document.querySelector(".type-2").classList.add("btn-active");
			this.activeType = 2;
			this.settings.mode = "image";
			Canvas.updateSettings(this.settings);
		});

		for (let a = 0; a < document.querySelectorAll(".rot-snap").length; a++) {
			document.querySelectorAll(".rot-snap")[a].addEventListener("click", () => {
				if (document.querySelector(".rot-snap.btn-active")) {
					document.querySelector(".rot-snap.btn-active").classList.remove("btn-active");
				}
				document.querySelectorAll(".rot-snap")[a].classList.add("btn-active");
			});
		}

		for (let a = 0; a < document.querySelectorAll(".bmode-btn").length; a++) {
			document.querySelectorAll(".bmode-btn")[a].addEventListener("click", () => {
				if (document.querySelector(".bmode-btn.btn-active")) {
					document.querySelector(".bmode-btn.btn-active").classList.remove("btn-active");
				}
				document.querySelectorAll(".bmode-btn")[a].classList.add("btn-active");
			});
		}

		document.querySelector(".file-choose").addEventListener("click", async () => {
			let img = await window.showOpenFilePicker({types: [{description: "Image", accept: {"image/*": [".png", ".jped", ".jpg"]}}]});
			let file = await img[0].getFile();
			Canvas.drawImg(file);
		});

		document.querySelector(".snap-0").addEventListener("click", () => {
			this.settings.rot = 270;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-1").addEventListener("click", () => {
			this.settings.rot = 90;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-2").addEventListener("click", () => {
			this.settings.rot = 180;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-3").addEventListener("click", () => {
			this.settings.rot = 0;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-4").addEventListener("click", () => {
			this.settings.rot = Canvas.radToDeg(-1 * Canvas.idealAngle);
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-5").addEventListener("click", () => {
			this.settings.rot = Canvas.radToDeg(Math.PI - Canvas.idealAngle);
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-6").addEventListener("click", () => {
			this.settings.rot = Canvas.radToDeg(-1 * (Math.PI - Canvas.idealAngle));
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-7").addEventListener("click", () => {
			this.settings.rot = Canvas.radToDeg(Canvas.idealAngle);
			Canvas.updateSettings(this.settings, false);
		});
	}

	// Event listeners for range sliders
	rangeListeners() {
		document.querySelector(".i-variance").addEventListener("input", () => {
			this.settings.vvar = document.querySelector(".i-variance").value;
			Canvas.updateSettings(this.settings);
		});
		document.querySelector(".i-verts").addEventListener("input", () => {
			this.settings.csize = document.querySelector(".i-verts").value;
			Canvas.updateSettings(this.settings);
		});
		document.querySelector(".i-bright-variance").addEventListener("input", () => {
			this.settings.bvar = document.querySelector(".i-bright-variance").value;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".i-0-rotation").addEventListener("input", () => {
			this.settings.rot = document.querySelector(".i-0-rotation").value;
			Canvas.updateSettings(this.settings, false);
			if (document.querySelector(".rot-snap.btn-active")) {
				document.querySelector(".rot-snap.btn-active").classList.remove("btn-active");
			}
		});
		document.querySelector(".i-1-posx").addEventListener("input", () => {
			this.settings.posx = document.querySelector(".i-1-posx").value;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".i-1-posy").addEventListener("input", () => {
			this.settings.posy = document.querySelector(".i-1-posy").value;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".i-1-inrad").addEventListener("input", () => {
			this.settings.irad = document.querySelector(".i-1-inrad").value;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".i-1-outrad").addEventListener("input", () => {
			this.settings.orad = document.querySelector(".i-1-outrad").value;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".lighten").addEventListener("click", () => {
			this.settings.bmode = "lighten";
			Canvas.updateSettings(this.settings, false, true);
		});
		document.querySelector(".darken").addEventListener("click", () => {
			this.settings.bmode = "darken";
			Canvas.updateSettings(this.settings, false, true);
		});
		document.querySelector(".i-outline").addEventListener("input", () => {
			this.settings.lineOp = parseFloat(document.querySelector(".i-outline").value);
			Canvas.updateSettings(this.settings, false);
		});
	}

	// Other event listeners
	miscListeners() {
		let hDimDebounce = null;
		let wDimDebounce = null;

		document.querySelector(".i-outline-color").addEventListener("input", () => {
			document.querySelector(".outline-color-wrap").style.background = document.querySelector(".i-outline-color").value;
			this.settings.line = document.querySelector(".i-outline-color").value;
			Canvas.updateSettings(this.settings, false);
		});
		document.querySelector(".image-height").addEventListener("input", () => {
			clearTimeout(hDimDebounce);
			hDimDebounce = setTimeout(() => {
				this.settings.y = document.querySelector(".image-height").value;
				if (this.settings.y !== 0 && this.settings.y !== undefined && this.settings.y !== "") {
					Canvas.updateSettings(this.settings);
				} else {
					console.warn("ERROR: Bad height dimension value. Enter a value of 1 or greater");
				}
			}, defaults.inputs.debounce);
		});
		document.querySelector(".image-width").addEventListener("input", () => {
			clearTimeout(wDimDebounce);
			wDimDebounce = setTimeout(() => {
				this.settings.x = document.querySelector(".image-width").value;
				if (this.settings.x !== 0 && this.settings.x !== undefined && this.settings.x !== "") {
					Canvas.updateSettings(this.settings);
				} else {
					console.warn("ERROR: Bad width dimension value. Enter a value of 1 or greater");
				}
			}, defaults.inputs.debounce);
		});
		document.querySelector(".palette-add").addEventListener("click", async () => {
			let colors = await Modal.modal("New Color Palette");
			Modal.destroy();
			if (colors.length != 0) {
				this.addPalette(colors);
			}
		});
		document.querySelector(".download").addEventListener("click", () => {
			let downloader = document.querySelector(".downloader");
			downloader.setAttribute("download", "Polygen Image.png");
			downloader.setAttribute("href", Canvas.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
			downloader.click();
		});
	}
}

// Create an async modal
class Modals {
	constructor() {
		this.modalEl = null;
		this.colors = [];
	}

	// Allows waiting for a modal to return a color palette
	async modal(title, colors = ["#ffffff"]) {
		this.colors = colors;
		return new Promise((resolve, reject) => {
			this.modalEl = document.createElement("DIV");
			this.modalEl.classList.add("edit-modal-bg");
			this.modalEl.innerHTML = `<div class="edit-modal"><h1 class="modal-title">${title}</h1><div class="modal-colors-wrap"></div><div class="modal-color-add"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg></div><div class="modal-btn-wrap"><button class="modal-cancel">Cancel</button><button class="modal-save">Save</button></div></div>`;
			document.querySelector("body").appendChild(this.modalEl);
			document.querySelector(".modal-cancel").addEventListener("click", () => {
				resolve([]);
			});
			document.querySelector(".modal-save").addEventListener("click", () => {
				if (this.colors.length > 0 && this.colors.length < 15) {
					resolve(this.colors);
				} else {
					window.alert("There must be between 1 and 15 colors");
				}
			});
			document.querySelector(".modal-color-add").addEventListener("click", () => {
				let input = this.color(this.colors[this.colors.length - 1]);
				input.input.addEventListener("input", () => {
					let pos = Array.from(input.wrap.parentNode.children).indexOf(input.wrap);
					this.colors[pos] = input.input.value;
				});
				document.querySelector(".modal-colors-wrap").appendChild(input.wrap);
				this.recalcColors();
			});
			for (let a = 0; a < this.colors.length; a++) {
				let input = this.color(this.colors[a]);
				input.input.addEventListener("input", () => {
					let pos = Array.from(input.wrap.parentNode.children).indexOf(input.wrap);
					this.colors[pos] = input.input.value;
				});
				document.querySelector(".modal-colors-wrap").appendChild(input.wrap);
			}
		});
	}

	// Returns a new color palette box for the modal
	color(startColor) {
		// Create the color box
		let wrap = document.createElement("DIV");
		wrap.classList.add("modal-color");

		let input = document.createElement("INPUT");
		input.classList.add("modal-color-input");

		let controlsTop = document.createElement("DIV");
		controlsTop.classList.add("modal-color-controls-top");
		controlsTop.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg> <svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>`;

		let controlsBtm = document.createElement("DIV");
		controlsBtm.classList.add("modal-color-controls-bottom");
		controlsBtm.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;

		input.setAttribute("type", "color");
		input.value = startColor;
		wrap.style.background = startColor;
		input.addEventListener("input", () => {
			wrap.style.background = input.value;
		});
		wrap.appendChild(input);
		wrap.appendChild(controlsTop);
		wrap.appendChild(controlsBtm);

		// Event listeners for left and right movement buttons on colors
		controlsTop.children[0].addEventListener("click", () => {
			let pos = Array.from(wrap.parentNode.children).indexOf(wrap);
			let p = wrap.parentNode;
			wrap.parentElement.removeChild(wrap);
			p.insertBefore(wrap, p.childNodes[pos - 1]);
			this.recalcColors();
		});
		controlsTop.children[1].addEventListener("click", () => {
			let chArr = Array.from(wrap.parentNode.children);
			let pos = chArr.indexOf(wrap);
			if (pos == chArr.length - 1) {
				pos = -1;
			}
			let p = wrap.parentNode;
			wrap.parentElement.removeChild(wrap);
			p.insertBefore(wrap, p.childNodes[pos + 1]);
			this.recalcColors();
		});
		// Delete color
		controlsBtm.children[0].addEventListener("click", () => {
			wrap.parentElement.removeChild(wrap);
			this.recalcColors();
		});

		return {wrap: wrap, input: input};
	}

	// After color movement, make sure colors are in the right order
	recalcColors() {
		this.colors = [];
		for (let a = 0; a < document.querySelectorAll(".modal-color").length; a++) {
			this.colors.push(document.querySelectorAll(".modal-color-input")[a].value);
		}
	}

	// Destroy modal
	destroy() {
		this.modalEl.parentElement.removeChild(this.modalEl);
		this.modalEl = null;
		this.colors = [];
	}
}

// Canvas control
class Preview {
	constructor() {
		// HTML Canvas element
		this.canvas = document.querySelector("canvas");
		// Canvas context
		this.ctx = this.canvas.getContext("2d", {willReadFrequently: true});
		// Draw settings
		this.settings = {
			mode: "",
			vvar: 0,
			csize: 0,
			bvar: 0,
			bmode: "",
			rot: 0,
			posx: 0,
			posy: 0,
			irad: 0,
			orad: 0,
			line: "",
			lineOp: 0,
			edge: "",
			x: 0,
			y: 0,
			colors: [],
		};

		this.xAngles = null;
		this.yAngles = null;

		// Draw throttle
		this.redrawDelay = 50;
		this.allowRedraw = true;
		this.redrawTimeout = null;

		// Debug
		this.debug = {
			drawPoints: false,
			drawAvgs: false,
			drawGradientLine: false,
			draw: true,
		};

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
		if (this.settings.mode == "image" && this.imgSrc == null) {
			return;
		}
		// Clear canvas for new draw. Prevents contamination of colors between changes
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// Set canvas dimensions
		if (this.settings.mode != "image") {
			Canvas.canvas.height = this.settings.y.toString();
			Canvas.canvas.width = this.settings.x.toString();
		}
		// Calculate ideal angle
		this.idealAngle = Math.atan(this.settings.y / this.settings.x);
		// Generate verticies
		if (newVerts) {
			this.verts = this.verticies();
		}
		// Draw underlying gradient or image
		if (this.settings.mode != "image") {
			this.drawGradient();
		} else {
			this.ctx.drawImage(this.imgSrc, 0, 0);
		}
		// Get pixel data
		this.imageData = this.ctx.getImageData(0, 0, this.settings.x, this.settings.y);
		if (this.debug.drawPoints) {
			this.drawPoints();
		}
		// Create and draw polygons
		this.polygons();
	}

	// Generates and returns the verticies
	verticies() {
		// Distance between non-varied verticies (x-based)
		let dist = this.settings.x / (defaults.ui.csize[1] - this.settings.csize);

		// Vertex counts
		let xc = Math.ceil(this.settings.x / dist + 1) + 2;
		let yc = Math.ceil(this.settings.y / dist + 2);

		// Pre-variance shifts to center verticies
		let xshift = (dist * xc - this.settings.x) / 2;
		let yshift = (dist * yc - this.settings.y) / 2;

		let verts = [];

		// Create vertex placements
		for (let a = 0; a <= yc; a++) {
			let row = [];
			for (let b = 0; b < xc; b++) {
				let vertX = dist * b;
				let vertY = dist * a;
				let xVari = Math.random() * this.settings.vvar * dist - (this.settings.vvar * dist) / 2;
				let yVari = Math.random() * this.settings.vvar * dist - (this.settings.vvar * dist) / 2;
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

	// Calculate and draw the underlying gradient that will be used to determine the colors of the polygons
	drawGradient() {
		let gradient;
		if (this.settings.mode == "linear") {
			// Center coords (also lengths to center)
			let centerX = this.settings.x / 2;
			let centerY = this.settings.y / 2;
			let rad = this.degToRad(this.settings.rot);
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

			gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
		} else {
			gradient = this.ctx.createRadialGradient(
				this.settings.posx * this.settings.x,
				this.settings.posy * this.settings.y,
				this.settings.irad * Math.max(this.settings.x, this.settings.y),
				this.settings.posx * this.settings.x,
				this.settings.posy * this.settings.y,
				this.settings.orad * Math.max(this.settings.x, this.settings.y)
			);
		}

		// Add color stops
		for (let a = 0; a < this.settings.colors.length; a++) {
			let pos = (1 / (this.settings.colors.length - 1)) * a;
			gradient.addColorStop(pos, this.settings.colors[a]);
		}

		// Draw
		if (this.debug.draw) {
			this.ctx.fillStyle = gradient;
			this.ctx.fillRect(0, 0, this.settings.x, this.settings.y);
		}
	}

	polygons() {
		// Convert outline color from hex to rgb and add opacity
		let hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.settings.line);
		let rgb = parseInt(hex[1], 16) + "," + parseInt(hex[2], 16) + "," + parseInt(hex[3], 16);
		this.ctx.strokeStyle = `rgba(${rgb}, ${this.settings.lineOp})`;

		for (let a = 0; a < this.verts.length; a++) {
			for (let b = 0; b < this.verts[a].length; b++) {
				// Decide which way the triangle points
				let tri = Math.floor(Math.random() * 2);

				// Centers of triangles
				let avgX1, avgX2, avgY1, avgY2;

				// Skip over edges
				if (!this.verts[a + 1] || !this.verts[a][b + 1] || !this.verts[a + 1][b + 1]) {
					continue;
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
		if (x > this.settings.x - 1) {
			x = this.settings.x - 1;
		}
		if (y > this.settings.y - 1) {
			y = this.settings.y - 1;
		}
		// Get pixel color from canvas and apply brightness alterations to RGB components
		let posNeg = this.settings.bmode == "lighten" ? 1 : -1;
		let bvar = Math.floor(Math.random() * this.settings.bvar);
		let r = this.imageData.data[y * (this.imageData.width * 4) + x * 4] + bvar * posNeg;
		let g = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 1] + bvar * posNeg;
		let b = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 2] + bvar * posNeg;
		let a = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 3];
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}

	// Handle controls changing
	updateSettings(newSettings, redrawVerts = true, bypassDelay = false) {
		if (newSettings.mode == "image") {
			delete newSettings.x;
			delete newSettings.y;
		}
		// Refresh settings
		this.settings = Object.assign(this.settings, newSettings);

		// Recalculate
		this.xAngles = this.degToRad(180) - 2 * Math.atan(this.settings.x / this.settings.y);
		this.yAngles = this.degToRad(180) - 2 * Math.atan(this.settings.y / this.settings.x);

		// Handle throttling and drawing
		if (bypassDelay) {
			this.draw(redrawVerts);
		} else if (this.allowRedraw) {
			this.allowRedraw = false;
			this.redrawTimeout = window.setTimeout(() => {
				this.draw(redrawVerts);
				this.allowRedraw = true;
			}, this.redrawDelay);
		}
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
				this.settings.x = img.width;
				this.settings.y = img.height;
				this.imgSrc = img;
				this.ctx.drawImage(img, 0, 0);
				this.draw(true);
			};
		};
	}

	degToRad(deg) {
		return (deg * Math.PI) / 180;
	}
	radToDeg(rad) {
		return (rad * 180) / Math.PI;
	}
}

// Init

let Canvas = new Preview();

let Modal = new Modals();

let control = new Controls();
control.init();
