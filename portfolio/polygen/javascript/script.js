"use strict"

const DEFAULTS = {
	ui: {
		csize: [5, 200],
		editCircleColor: "rgba(0,0,0,0.5)",
		brushDrawColor: "rgba(255,255,255,0.05)",
		selectedVertexColor: { color: "rgba(255,255,255,1)", size: 5 },
		brushLineWeight: 3,
		selectionBrushKeybinds: { "b": true, " ": true },
	},
	inputs: {
		debounce: 500,
		previewRedrawDelay: 50,
	},
};

/*

TODO:

Features:
- Brush tool:
   - Snap to color
   - Falloff for snap to color?
   - Drag individual vertices
      - Transparency mode?

- Refactor: change brush drawing to be smooth.
	- Check this JSFiddle: https://jsfiddle.net/aesthaddicts/PEKyw/
	- Try to use requestAnimationFrame to draw instead of overusing the mousemove event. Should help performance?

- Optimization:
	- Add a web worker for calculating nearby color changes (required - start with it this way, it will likely be computationally intense)
	- Add a web worker for vertex generation (optional - it isn't noticeable now)

- Add Delete Color Palette

*/

// Control panel UI
class Controls {
	constructor() {
		this.activeType = 0;
		this.page = 0;

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

		this.init();
	}

	// Basic setup - hide irrelevant controls, setup listeners, setup canvases
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
		this.keyListeners();
		this.miscListeners();

		PreviewLayer.canvas.height = this.settings.y.toString();
		PreviewLayer.canvas.width = this.settings.x.toString();

		EditLayer.canvas.height = this.settings.y.toString();
		EditLayer.canvas.width = this.settings.x.toString();

		this.settings.colors = this.palettes[0];
		document.querySelectorAll(".palette")[0].classList.add("active-palette");

		// First draw
		this.updateSettings(this.settings);
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
		if (this.settings.mode !== "image") {
			PreviewLayer.xAngles = Preview.degToRad(180) - 2 * Math.atan(this.settings.x / this.settings.y);
			PreviewLayer.yAngles = Preview.degToRad(180) - 2 * Math.atan(this.settings.y / this.settings.x);
		}

		// Handle throttling and drawing
		if (bypassDelay) {
			PreviewLayer.draw(redrawVerts);
		} else if (PreviewLayer.allowRedraw) {
			PreviewLayer.allowRedraw = false;
			PreviewLayer.redrawTimeout = window.setTimeout(() => {
				PreviewLayer.draw(redrawVerts);
				PreviewLayer.allowRedraw = true;
			}, PreviewLayer.redrawDelay);
		}
	}

	// Populate different repetitive elements of the UI like buttons and palettes
	populate() {
		// Fill in rotation buttons
		let common = {
			start: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor"',
			startRotd: '<svg viewBox="0 0 24 24" style="transform: rotate(45deg)"><path fill="currentColor" ',
			end: ' /></svg>'
		}

		let svgs = [
			`${common.start}d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z"${common.end}`, // up
			`${common.start}d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z"${common.end}`, // down
			`${common.start}d="M20,10V14H11L14.5,17.5L12.08,19.92L4.16,12L12.08,4.08L14.5,6.5L11,10H20Z"${common.end}`, // left
			`${common.start}d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z"${common.end}`, // right

			`${common.startRotd}d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z"${common.end}`, // tr
			`${common.startRotd}d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z"${common.end}`, // bl
			`${common.startRotd}d="M20,10V14H11L14.5,17.5L12.08,19.92L4.16,12L12.08,4.08L14.5,6.5L11,10H20Z"${common.end}`, // tl
			`${common.startRotd}d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z"${common.end}`, // br
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
		
		// Add to panel
		wrap.appendChild(palette);
		wrap.appendChild(opts);
		document.querySelector(".control-palettes").appendChild(wrap);

		// Create the edit pop up modal
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

		// Add its event listener for selecting
		wrap.addEventListener("click", () => {
			this.settings.colors = this.palettes[pos];
			document.querySelector(".active-palette").classList.remove("active-palette");
			wrap.classList.add("active-palette");
			this.updateSettings(this.settings, false);
		});

		// Save palette to local storage
		if (!this.palettes.includes(colors)) {
			this.palettes.push(colors);
			localStorage.setItem(this.savePalettesAs, JSON.stringify(this.palettes));
		}
	}

	// Event listeners for buttons
	buttonListeners() {

		// panels
		document.querySelector(".choose-properties").addEventListener("click", () => {
			this.page = 0;
			document.querySelector(".choose-tools").classList.remove("btn-active");
			document.querySelector(".choose-properties").classList.add("btn-active");
			document.querySelector(".panel-image-tools").style.display = "none";
			document.querySelector(".panel-image-properties").style.display = "inline";
		});
		document.querySelector(".choose-tools").addEventListener("click", () => {
			this.page = 1;
			document.querySelector(".choose-properties").classList.remove("btn-active");
			document.querySelector(".choose-tools").classList.add("btn-active");
			document.querySelector(".panel-image-tools").style.display = "inline";
			document.querySelector(".panel-image-properties").style.display = "none";
		});

		// show / hide relevant buttons for specific gradient types
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
			this.updateSettings(this.settings);
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
			this.updateSettings(this.settings);
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
			this.updateSettings(this.settings);
		});

		// rotation snap buttons (adding/removing active styling)
		for (let a = 0; a < document.querySelectorAll(".rot-snap").length; a++) {
			document.querySelectorAll(".rot-snap")[a].addEventListener("click", () => {
				if (document.querySelector(".rot-snap.btn-active")) {
					document.querySelector(".rot-snap.btn-active").classList.remove("btn-active");
				}
				document.querySelectorAll(".rot-snap")[a].classList.add("btn-active");
			});
		}

		// brightness mode buttons (there's only 2, but technically this is less code I guess?)
		for (let a = 0; a < document.querySelectorAll(".bmode-btn").length; a++) {
			document.querySelectorAll(".bmode-btn")[a].addEventListener("click", () => {
				if (document.querySelector(".bmode-btn.btn-active")) {
					document.querySelector(".bmode-btn.btn-active").classList.remove("btn-active");
				}
				document.querySelectorAll(".bmode-btn")[a].classList.add("btn-active");
			});
		}

		// file picker
		document.querySelector(".file-choose").addEventListener("click", async () => {
			let img = await window.showOpenFilePicker({types: [{description: "Image", accept: {"image/*": [".png", ".jped", ".jpg"]}}]});
			let file = await img[0].getFile();
			PreviewLayer.drawImg(file);
		});

		// rotation snap buttons (setting rotation)
		document.querySelector(".snap-0").addEventListener("click", () => {
			this.settings.rot = 90;
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-1").addEventListener("click", () => {
			this.settings.rot = 270;
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-2").addEventListener("click", () => {
			this.settings.rot = 180;
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-3").addEventListener("click", () => {
			this.settings.rot = 0;
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-4").addEventListener("click", () => {
			this.settings.rot = Preview.radToDeg(PreviewLayer.idealAngle);
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-5").addEventListener("click", () => {
			this.settings.rot = Preview.radToDeg(Math.PI + PreviewLayer.idealAngle);
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-6").addEventListener("click", () => {
			this.settings.rot = Preview.radToDeg(Math.PI - PreviewLayer.idealAngle);
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".snap-7").addEventListener("click", () => {
			this.settings.rot = Preview.radToDeg(-1 * PreviewLayer.idealAngle);
			this.updateSettings(this.settings, false);
		});

		// selection brush toggle
		document.querySelector(".brush-btn").addEventListener("click", () => {
			if (!EditLayer.brush.active) {
				EditLayer.brush.active = true;
				EditLayer.activateBrush();
			} else {
				EditLayer.deactivateBrush();
			}
		});

		document.querySelector(".deselect-vertices").addEventListener("click", () => {
			EditLayer.clean();
		});

		document.querySelector(".vertex-recalc").addEventListener("click", () => {
			EditLayer.recalculateSelected();
		});

		document.querySelector(".vertex-color-snap").addEventListener("click", () => {
			EditLayer.colorSnap();
		});
	}

	// Event listeners for keypresses
	keyListeners() {
		// selection brush
		window.addEventListener("keydown", (Event) => {
			if (Object.hasOwn(DEFAULTS.ui.selectionBrushKeybinds, Event.key) && !EditLayer.brush.active) {
				EditLayer.brush.active = true;
				EditLayer.activateBrush();
			}
		});
		window.addEventListener("keyup", (Event) => {
			if (Object.hasOwn(DEFAULTS.ui.selectionBrushKeybinds, Event.key)) {
				EditLayer.deactivateBrush();
			}
		});
	}

	// Event listeners for range sliders
	rangeListeners() {
		// general - vertex variance and cell size
		document.querySelector(".i-variance").addEventListener("input", () => {
			this.settings.vvar = document.querySelector(".i-variance").value;
			this.updateSettings(this.settings);
		});
		document.querySelector(".i-verts").addEventListener("input", () => {
			this.settings.csize = document.querySelector(".i-verts").value;
			this.updateSettings(this.settings);
		});

		// linear gradient
		document.querySelector(".i-0-rotation").addEventListener("input", () => {
			this.settings.rot = document.querySelector(".i-0-rotation").value;
			this.updateSettings(this.settings, false);
			if (document.querySelector(".rot-snap.btn-active")) {
				document.querySelector(".rot-snap.btn-active").classList.remove("btn-active");
			}
		});

		// radial gradient
		document.querySelector(".i-1-posx").addEventListener("input", () => {
			this.settings.posx = document.querySelector(".i-1-posx").value;
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".i-1-posy").addEventListener("input", () => {
			this.settings.posy = document.querySelector(".i-1-posy").value;
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".i-1-inrad").addEventListener("input", () => {
			this.settings.irad = document.querySelector(".i-1-inrad").value;
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".i-1-outrad").addEventListener("input", () => {
			this.settings.orad = document.querySelector(".i-1-outrad").value;
			this.updateSettings(this.settings, false);
		});

		// brightness variance
		document.querySelector(".i-bright-variance").addEventListener("input", () => {
			this.settings.bvar = document.querySelector(".i-bright-variance").value;
			this.updateSettings(this.settings, false);
		});
		document.querySelector(".lighten").addEventListener("click", () => {
			this.settings.bmode = "lighten";
			this.updateSettings(this.settings, false, true);
		});
		document.querySelector(".darken").addEventListener("click", () => {
			this.settings.bmode = "darken";
			this.updateSettings(this.settings, false, true);
		});

		// outline
		document.querySelector(".i-outline").addEventListener("input", () => {
			this.settings.lineOp = parseFloat(document.querySelector(".i-outline").value);
			this.updateSettings(this.settings, false);
		});
	}

	// Other event listeners
	miscListeners() {
		let hDimDebounce = null;
		let wDimDebounce = null;

		// outline color picker
		document.querySelector(".i-outline-color").addEventListener("input", () => {
			document.querySelector(".outline-color-wrap").style.background = document.querySelector(".i-outline-color").value;
			this.settings.line = document.querySelector(".i-outline-color").value;
			this.updateSettings(this.settings, false);
		});

		// dimensions
		document.querySelector(".image-height").addEventListener("input", () => {
			clearTimeout(hDimDebounce);
			hDimDebounce = setTimeout(() => {
				this.settings.y = document.querySelector(".image-height").value;
				if (this.settings.y !== "0" && this.settings.y !== undefined && this.settings.y !== "") {
					this.updateSettings(this.settings);
				} else {
					console.warn("ERROR: Bad height dimension value. Enter a value of 1 or greater");
				}
			}, DEFAULTS.inputs.debounce);
		});
		document.querySelector(".image-width").addEventListener("input", () => {
			clearTimeout(wDimDebounce);
			wDimDebounce = setTimeout(() => {
				this.settings.x = document.querySelector(".image-width").value;
				if (this.settings.x !== "0" && this.settings.x !== undefined && this.settings.x !== "") {
					this.updateSettings(this.settings);
				} else {
					console.warn("ERROR: Bad width dimension value. Enter a value of 1 or greater");
				}
			}, DEFAULTS.inputs.debounce);
		});

		// add color palette
		document.querySelector(".palette-add").addEventListener("click", async () => {
			let colors = await Modal.modal("New Color Palette");
			Modal.destroy();
			if (colors.length != 0) {
				this.addPalette(colors);
			}
		});

		// download image
		document.querySelector(".download").addEventListener("click", () => {
			let downloader = document.querySelector(".downloader");
			downloader.setAttribute("download", "Polygen Image.png");
			downloader.setAttribute("href", PreviewLayer.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
			downloader.click();
		});

		window.addEventListener("resize", () => {
			EditLayer.handleWindowResize();
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

// Editor canvas control
class Editor {
	constructor() {
		this.canvas = document.getElementById("canvas-edit");
		this.ctx = this.canvas.getContext("2d");

		this.canvasCompressionRatio = 1;

		this.isClean = true;

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
		};

		this.selectedVertices = {};
	}

	handleWindowResize() {
		this.canvasCompressionRatio = this.canvas.offsetWidth / Control.settings.x;
	}

	updateSettings(settings) {
		this.canvas.height = settings.y.toString();
		this.canvas.width = settings.x.toString();
		this.canvasCompressionRatio = this.canvas.offsetWidth / settings.x;
	}

	colorSnap() {
		document.querySelector(".loader-wrap").style.visibility = "visible";
		
		Thread.open();

		Thread.send({
			verts: PreviewLayer.verts,
			selectedVerts: this.selectedVertices,
			canvas: PreviewLayer.ctx.getImageData(0, 0, Control.settings.x, Control.settings.y),
			radius: PreviewLayer.vertexMeta.dist,
		});

		Thread.recieve((data) => {
			let operation = data.type.split("-")
			switch (operation[0]) {
				case "progress":
					if (data.data == 100) {
						document.querySelector(".loader-wrap").style.visibility = "hidden";
					}
					break;
				case "debug":
					if (operation[1] == "drawPixels" && operation[2] == "radius") {
						PreviewLayer.drawBatchPixels(data.data);
					}

					if (operation[1] == "drawPixels" && operation[2] == "diff") {
						PreviewLayer.drawBatchPixels(data.data, 10, "orange");
					}
					break;
			}
		});
	}

	recalculateSelected() {

		let recalculated = [];
		
		for (let [key, value] of Object.entries(this.selectedVertices)) {
			let dist = PreviewLayer.vertexMeta.dist;
			let vertX = dist * value.id[1];
			let vertY = dist * value.id[0];
			let xVari = Math.random() * Control.settings.vvar * dist - (Control.settings.vvar * dist) / 2;
			let yVari = Math.random() * Control.settings.vvar * dist - (Control.settings.vvar * dist) / 2;
			recalculated.push({
				id: value.id,
				coords: [vertX + xVari - PreviewLayer.vertexMeta.xShift, vertY + yVari - PreviewLayer.vertexMeta.yShift]
			});
		}

		PreviewLayer.replaceVertices(recalculated);
	}

	activateBrush() {
		document.querySelector(".brush-btn").classList.add("btn-active");
		this.canvas.style.cursor = "crosshair";

		let isInPreviewWindow = false;
		let isInCanvasWindow = false;
		this.canvasCompressionRatio = this.canvas.offsetWidth / Control.settings.x;

		// Set defaults for drawing
		this.ctx.strokeStyle = DEFAULTS.ui.editCircleColor;
		this.ctx.fillStyle = DEFAULTS.ui.brushDrawColor;
		this.ctx.lineWidth = DEFAULTS.ui.brushLineWeight / this.canvasCompressionRatio;

		// Mouse down and mouse up: set for paint
		window.addEventListener("mousedown", (Event) => {
			if (isInPreviewWindow && isInCanvasWindow) {
				this.ctx.clearRect(0, 0, Control.settings.x, Control.settings.y);
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
				this.ctx.clearRect(0, 0, Control.settings.x, Control.settings.y);
				this.ctx.beginPath();
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

		// Setup common canvas necessities between area indicator and paint
		this.ctx.beginPath();
		this.ctx.arc(this.brush.posX, this.brush.posY, this.brush.size / this.canvasCompressionRatio, 0, 2 * Math.PI);
		this.ctx.fillStyle = DEFAULTS.ui.brushDrawColor;

		// If not drawing, clear the canvas and exit. If drawing, draw the overlay and continue executing.
		if (!this.brush.drawing) {
			this.ctx.clearRect(0, 0, Control.settings.x, Control.settings.y);				
			this.ctx.stroke();
			this.drawSelectedVertices();
			return;
		} else {
			this.ctx.fill();
		}

		// Calculate the nearest vertex to start checking for vertices in the paint area
		let nearestX = Math.round((this.brush.posX / PreviewLayer.vertexMeta.dist) + 1.5);    // these magic numbers have to do with the overlap vertices (past the edges)
		let nearestY = Math.round((this.brush.posY / PreviewLayer.vertexMeta.dist) + 1.25);   // there might be a way to calculate this, but this does fine

		// Bind so that it doesn't try to search for vertices that don't exist
		nearestY = Math.max(0, Math.min(nearestY, PreviewLayer.verts.length - 1));
		nearestX = Math.max(0, Math.min(nearestX, PreviewLayer.verts[0].length - 1));

		// Select the vertex
		let nearestVert = PreviewLayer.verts[nearestY][nearestX];

		let vertCheckRadius = Math.ceil((this.brush.size / PreviewLayer.vertexMeta.dist) / this.canvasCompressionRatio);
		let nearbyVerts = [];

		// Run through all potential nearby verts (square around mouse)
		for (let a = -vertCheckRadius; a <= vertCheckRadius; a++) {
			for (let b = -vertCheckRadius; b <= vertCheckRadius; b++) {
				let checkX = nearestX + b;
				let checkY = nearestY + a;

				// Prevent checking nonexistent verts
				if (checkX < 0 || checkY < 0 || checkX >= PreviewLayer.verts[0].length || checkY >= PreviewLayer.verts.length) {
					continue;
				}

				// Debug: draw square of checked vertices
				if (PreviewLayer.debug.drawAllCheckedVerts) {
					this.ctx.beginPath()
					this.ctx.arc(PreviewLayer.verts[checkY][checkX][0], PreviewLayer.verts[checkY][checkX][1], 10, 0, 2 * Math.PI);
					this.ctx.fillStyle = "rgba(0,0,255,1)";
					this.ctx.fill();
					this.ctx.fillStyle = DEFAULTS.ui.brushDrawColor;
				}

				// Get the offset between vert being checked and mouse pos
				let dx = this.brush.posX - PreviewLayer.verts[nearestY + a][nearestX + b][0];
				let dy = this.brush.posY - PreviewLayer.verts[nearestY + a][nearestX + b][1];
				
				// Calculate if vertex is actually inside circle
				let diff = (Math.hypot(dx, dy));
				if (diff < (this.brush.size)  / this.canvasCompressionRatio) {
					let data = [[nearestY + a, nearestX + b], PreviewLayer.verts[nearestY + a][nearestX + b]]
					nearbyVerts.push(data);

					// Debug: draw verts inside circle
					if (PreviewLayer.debug.drawAllNearestVerts) {
						this.ctx.beginPath()
						this.ctx.arc(PreviewLayer.verts[nearestY + a][nearestX + b][0], PreviewLayer.verts[nearestY + a][nearestX + b][1], 10, 0, 2 * Math.PI);
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
		if (PreviewLayer.debug.drawNearestVert) {
			this.ctx.beginPath()
			this.ctx.arc(nearestVert[0], nearestVert[1], 10, 0, 2 * Math.PI);
			this.ctx.fillStyle = "rgba(255,0,0,1)";
			this.ctx.fill();
			this.ctx.fillStyle = DEFAULTS.ui.brushDrawColor;
		}
	}

	// Clean up after brush is deactivated
   	deactivateBrush() {
		document.querySelector(".brush-btn").classList.remove("btn-active");
		this.canvas.style.cursor = "default";
      	this.brush.FollowEvent.abort();
		this.brush.FollowEvent = new AbortController();
		this.brush.active = false;
		this.ctx.clearRect(0, 0, Control.settings.x, Control.settings.y);
		this.drawSelectedVertices();
	}
	
	// Iterates over each stored vertex and draws it. Called often
	drawSelectedVertices() {
		for (let [key, value] of Object.entries(this.selectedVertices)) {
			this.ctx.beginPath();
			this.ctx.arc(value.coord[0], value.coord[1], DEFAULTS.ui.selectedVertexColor.size / this.canvasCompressionRatio, 0, 2 * Math.PI);
			this.ctx.fillStyle = DEFAULTS.ui.selectedVertexColor.color;
			this.ctx.fill();
		}
	}

	// Helper function to wipe the edit layer
	clean() {
		if (this.isClean) return;

		this.selectedVertices = {};
		this.ctx.clearRect(0, 0, Control.settings.x, Control.settings.y);
	}
}

// Canvas control
class Preview {
	constructor() {
		// HTML Canvas element
		this.canvas = document.getElementById("canvas-main");
		// Canvas context
		this.ctx = this.canvas.getContext("2d", {willReadFrequently: true});

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
			draw: true,
			drawNearestVert: true,
			drawAllNearestVerts: true,
			drawAllCheckedVerts: false,
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
		if (Control.settings.mode == "image" && this.imgSrc == null) {
			return;
		}

		// Clear canvas for new draw. Prevents contamination of colors between changes
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		EditLayer.clean();

		// Set canvas dimensions
		if (Control.settings.mode != "image") {
			this.canvas.height = Control.settings.y.toString();
			this.canvas.width = Control.settings.x.toString();

			EditLayer.canvas.height = Control.settings.y.toString();
			EditLayer.canvas.width = Control.settings.x.toString();
		}

		// Calculate ideal angle (angle from corner to corner of canvas, used for snapping rotation to diagonals)
		this.idealAngle = Math.atan(Control.settings.y / Control.settings.x);

		// Generate verticies
		if (newVerts) {
			this.verts = this.verticies();
		}

		// Draw underlying gradient or image
		if (Control.settings.mode != "image") {
			this.drawGradient();
		} else {
			this.ctx.drawImage(this.imgSrc, 0, 0);
		}

		// Get pixel data
		this.imageData = this.ctx.getImageData(0, 0, Control.settings.x, Control.settings.y);
		if (this.debug.drawPoints) {
			this.drawPoints();
		}

		// Create and draw polygons
		this.polygons();
	}

	// Replace existing vertices with newly calculated vertices. Used by edit mode Recalculate Vertices functionality
	replaceVertices(newVerts) {
		for (let [key, value] of Object.entries(newVerts)) {
			this.verts[value.id[0]][value.id[1]] = value.coords;
		}

		this.draw(false);
	}

	// Generates and returns the verticies
	verticies() {
		// Distance between non-varied verticies (x-based)
		let dist = Control.settings.x / (DEFAULTS.ui.csize[1] - Control.settings.csize);

		this.vertexMeta.dist = dist;

		// Vertex counts
		let xc = Math.ceil(Control.settings.x / dist + 1) + 2; // magic number helps to correct image peeking through.
		let yc = Math.ceil(Control.settings.y / dist + 2);

		this.vertexMeta.xCount = xc;
		this.vertexMeta.yCount = yc;

		this.vertCount = { x: xc, y: yc };

		// Pre-variance shifts to center verticies
		let xshift = (dist * xc - Control.settings.x) / 2;
		let yshift = (dist * yc - Control.settings.y) / 2;

		this.vertexMeta.xShift = xshift;
		this.vertexMeta.yShift = yshift;

		let verts = [];

		// Create vertex placements
		for (let a = 0; a <= yc; a++) {
			let row = [];
			for (let b = 0; b < xc; b++) {
				let vertX = dist * b;
				let vertY = dist * a;
				let xVari = Math.random() * Control.settings.vvar * dist - (Control.settings.vvar * dist) / 2;
				let yVari = Math.random() * Control.settings.vvar * dist - (Control.settings.vvar * dist) / 2;
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
		if (Control.settings.mode == "linear") {
			// Center coords (also lengths to center)
			let centerX = Control.settings.x / 2;
			let centerY = Control.settings.y / 2;
			let rad = Preview.degToRad(Control.settings.rot);
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
				Control.settings.posx * Control.settings.x,
				Control.settings.posy * Control.settings.y,
				Control.settings.irad * Math.max(Control.settings.x, Control.settings.y),
				Control.settings.posx * Control.settings.x,
				Control.settings.posy * Control.settings.y,
				Control.settings.orad * Math.max(Control.settings.x, Control.settings.y)
			);
		}

		// Add color stops
		for (let a = 0; a < Control.settings.colors.length; a++) {
			let pos = (1 / (Control.settings.colors.length - 1)) * a;
			gradient.addColorStop(pos, Control.settings.colors[a]);
		}

		// Draw
		if (this.debug.draw) {
			this.ctx.fillStyle = gradient;
			this.ctx.fillRect(0, 0, Control.settings.x, Control.settings.y);
		}
	}

	polygons() {
		// Convert outline color from hex to rgb and add opacity
		let hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Control.settings.line);
		let rgb = parseInt(hex[1], 16) + "," + parseInt(hex[2], 16) + "," + parseInt(hex[3], 16);
		this.ctx.strokeStyle = `rgba(${rgb}, ${Control.settings.lineOp})`;

		for (let a = 0; a < this.verts.length; a++) {
			for (let b = 0; b < this.verts[a].length; b++) {

				// Centers of triangles
				let avgX1, avgX2, avgY1, avgY2;

				// Skip over edges
				if (!this.verts[a + 1] || !this.verts[a][b + 1] || !this.verts[a + 1][b + 1]) {
					continue;
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
		if (x > Control.settings.x - 1) {
			x = Control.settings.x - 1;
		}
		if (y > Control.settings.y - 1) {
			y = Control.settings.y - 1;
		}
		// Get pixel color from canvas and apply brightness alterations to RGB components
		let posNeg = Control.settings.bmode == "lighten" ? 1 : -1;
		let bvar = Math.floor(Math.random() * Control.settings.bvar);
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
				Control.settings.x = img.width;
				Control.settings.y = img.height;
				EditLayer.updateSettings(Control.settings);
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

// Create a web worker to run heavy processes in the background. Returns a promise
/** Usage:
 * 	new Thread().then((returnsOutputHere) => {})
 *	Thread.send(inputData);
 */
class Thread {

	static supported = true;
	static worker = null;
	static callback = null;

	constructor() {
		return null;
	}

	static open() {
		if (!Thread.supported || !window.Worker) {
			console.warn("WebWorkers aren't supported. Features disabled: color line finding.");
			Thread.supported = false;
			return;
		}

		Thread.worker = new Worker("./javascript/worker.js");

		Thread.worker.onmessage = (data) => {
			Thread.#__handleMessageRecieved(data.data);
		}

		Thread.worker.onerror = (e) => {
			console.warn("Worker Error:");
			console.warn(e);
		}
	}

	static send(data) {
		Thread.worker.postMessage(data);
	}

	static recieve(callback) {
		Thread.callback = callback;
	}

	static #__handleMessageRecieved(data) {
		Thread.callback(data);
	}
}

// Init

let PreviewLayer = new Preview();
let EditLayer = new Editor();
let Modal = new Modals();
let Control = new Controls();