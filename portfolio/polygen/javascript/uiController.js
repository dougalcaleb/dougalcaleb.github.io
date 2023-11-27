import { DEFAULTS } from "./globals.js"
import { Preview } from "./previewController.js";
import { GradientEditorPopup } from "./gradientEditorPopup.js";

let DataStore, PreviewLayer, EditLayer;

// Control panel UI
export class Controls {
	constructor(store, Preview, Edit) {

		DataStore = store;
		PreviewLayer = Preview;
		EditLayer = Edit;
		
		this.activeType = 0;
		this.page = 0;

		// Color palettes
		this.defaultPalettes = [
			[
				{ color: "#f3e1af", stop: 0 },
				{ color: "#f09c3d", stop: 0.16 },
				{ color: "#f0693d", stop: 0.33},
				{ color: "#f03d72", stop: 0.5 },
				{ color: "#9f3df0", stop: 0.66 },
				{ color: "#3d81f0", stop: 0.83 },
				{ color: "#037ac4", stop: 1 }
			],
			[
				{ color: "#e7e98b", stop: 0 },
				{ color: "#8be9d2", stop: 0.25 },
				{ color: "#73b5dd", stop: 0.5 },
				{ color: "#1074b1", stop: 0.75 },
				{ color: "#014e7e", stop: 1 }
			],
			[
				{ color: "#787878", stop: 0 },
				{ color: "#454545", stop: 0.25 },
				{ color: "#333333", stop: 0.5 },
				{ color: "#454545", stop: 0.75 },
				{ color: "#787878", stop: 1 }
			],
			[
				{ color: "#011fb7", stop: 0 },
				{ color: "#5c01b7", stop: 0.5 },
				{ color: "#3b0e67", stop: 1 }
			],
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

		PreviewLayer.canvas.height = DataStore.settings.y.toString();
		PreviewLayer.canvas.width = DataStore.settings.x.toString();

		EditLayer.canvas.height = DataStore.settings.y.toString();
		EditLayer.canvas.width = DataStore.settings.x.toString();

		DataStore.settings.colors = this.palettes[0];
		document.querySelectorAll(".palette")[0].classList.add("active-palette");

		// First draw
		this.updateSettings(DataStore.settings);
	}

	// Handle controls changing
	updateSettings(newSettings, redrawVerts = true, bypassDelay = false) {

		if (newSettings.mode == "image") {
			newSettings.x = PreviewLayer.imgSrc.width;
			newSettings.y = PreviewLayer.imgSrc.height;
		}
		// Refresh settings
		DataStore.update(newSettings);

		// Recalculate
		if (DataStore.settings.mode !== "image") {
			PreviewLayer.xAngles = Preview.degToRad(180) - 2 * Math.atan(DataStore.settings.x / DataStore.settings.y);
			PreviewLayer.yAngles = Preview.degToRad(180) - 2 * Math.atan(DataStore.settings.y / DataStore.settings.x);
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
			el.style.background = colors[b].color;
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
         try {
            let newColors = await new GradientEditorPopup(this.palettes[pos]).colorSet;
            if (newColors.length != 0) {
               this.palettes[pos] = newColors;
               localStorage.setItem(this.savePalettesAs, JSON.stringify(this.palettes));
               while (palette.childElementCount > 0) {
                  palette.removeChild(palette.children[0]);
               }
               for (let a = 0; a < newColors.length; a++) {
                  let el = document.createElement("DIV");
                  el.classList.add("palette-color");
                  el.style.background = newColors[a].color;
                  palette.appendChild(el);
               }
               DataStore.settings.colors = this.palettes[pos];
               this.updateSettings(DataStore.settings, false);
            }
         } catch (e) {
            if (e !== "Cancel") {
               console.warn(e);
            }
         }
		});

		// Add its event listener for selecting
		wrap.addEventListener("click", () => {
			DataStore.settings.colors = this.palettes[pos];
			document.querySelector(".active-palette").classList.remove("active-palette");
			wrap.classList.add("active-palette");
			this.updateSettings(DataStore.settings, false);
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
			EditLayer.deactivateBrush();
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
			DataStore.settings.mode = "linear";
			this.updateSettings(DataStore.settings);
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
			DataStore.settings.mode = "radial";
			this.updateSettings(DataStore.settings);
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
			DataStore.settings.mode = "image";
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
			DataStore.settings.rot = 90;
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".snap-1").addEventListener("click", () => {
			DataStore.settings.rot = 270;
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".snap-2").addEventListener("click", () => {
			DataStore.settings.rot = 180;
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".snap-3").addEventListener("click", () => {
			DataStore.settings.rot = 0;
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".snap-4").addEventListener("click", () => {
			DataStore.settings.rot = Preview.radToDeg(PreviewLayer.idealAngle);
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".snap-5").addEventListener("click", () => {
			DataStore.settings.rot = Preview.radToDeg(Math.PI + PreviewLayer.idealAngle);
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".snap-6").addEventListener("click", () => {
			DataStore.settings.rot = Preview.radToDeg(Math.PI - PreviewLayer.idealAngle);
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".snap-7").addEventListener("click", () => {
			DataStore.settings.rot = Preview.radToDeg(-1 * PreviewLayer.idealAngle);
			this.updateSettings(DataStore.settings, false);
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
			DataStore.settings.vvar = document.querySelector(".i-variance").value;
			this.updateSettings(DataStore.settings);
		});
		document.querySelector(".i-verts").addEventListener("input", () => {
			DataStore.settings.csize = document.querySelector(".i-verts").value;
			this.updateSettings(DataStore.settings);
		});

		// linear gradient
		document.querySelector(".i-0-rotation").addEventListener("input", () => {
			DataStore.settings.rot = document.querySelector(".i-0-rotation").value;
			this.updateSettings(DataStore.settings, false);
			if (document.querySelector(".rot-snap.btn-active")) {
				document.querySelector(".rot-snap.btn-active").classList.remove("btn-active");
			}
		});

		// radial gradient
		document.querySelector(".i-1-posx").addEventListener("input", () => {
			DataStore.settings.posx = document.querySelector(".i-1-posx").value;
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".i-1-posy").addEventListener("input", () => {
			DataStore.settings.posy = document.querySelector(".i-1-posy").value;
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".i-1-inrad").addEventListener("input", () => {
			DataStore.settings.irad = document.querySelector(".i-1-inrad").value;
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".i-1-outrad").addEventListener("input", () => {
			DataStore.settings.orad = document.querySelector(".i-1-outrad").value;
			this.updateSettings(DataStore.settings, false);
		});

		// brightness variance
		document.querySelector(".i-bright-variance").addEventListener("input", () => {
			DataStore.settings.bvar = document.querySelector(".i-bright-variance").value;
			this.updateSettings(DataStore.settings, false);
		});
		document.querySelector(".lighten").addEventListener("click", () => {
			DataStore.settings.bmode = "lighten";
			this.updateSettings(DataStore.settings, false, true);
		});
		document.querySelector(".darken").addEventListener("click", () => {
			DataStore.settings.bmode = "darken";
			this.updateSettings(DataStore.settings, false, true);
		});

		// outline
		document.querySelector(".i-outline").addEventListener("input", () => {
			DataStore.settings.lineOp = parseFloat(document.querySelector(".i-outline").value);
			this.updateSettings(DataStore.settings, false);
		});
	}

	// Other event listeners
	miscListeners() {
		let hDimDebounce = null;
		let wDimDebounce = null;

		// outline color picker
		document.querySelector(".i-outline-color").addEventListener("input", () => {
			document.querySelector(".outline-color-wrap").style.background = document.querySelector(".i-outline-color").value;
			DataStore.settings.line = document.querySelector(".i-outline-color").value;
			this.updateSettings(DataStore.settings, false);
		});

		// dimensions
		document.querySelector(".image-height").addEventListener("input", () => {
			clearTimeout(hDimDebounce);
			hDimDebounce = setTimeout(() => {
				DataStore.settings.y = document.querySelector(".image-height").value;
				if (DataStore.settings.y !== "0" && DataStore.settings.y !== undefined && DataStore.settings.y !== "") {
					this.updateSettings(DataStore.settings);
				} else {
					console.warn("ERROR: Bad height dimension value. Enter a value of 1 or greater");
				}
			}, DEFAULTS.inputs.debounce);
		});
		document.querySelector(".image-width").addEventListener("input", () => {
			clearTimeout(wDimDebounce);
			wDimDebounce = setTimeout(() => {
				DataStore.settings.x = document.querySelector(".image-width").value;
				if (DataStore.settings.x !== "0" && DataStore.settings.x !== undefined && DataStore.settings.x !== "") {
					this.updateSettings(DataStore.settings);
				} else {
					console.warn("ERROR: Bad width dimension value. Enter a value of 1 or greater");
				}
			}, DEFAULTS.inputs.debounce);
		});

		// add color palette
      document.querySelector(".palette-add").addEventListener("click", async () => {
         try {
            let colors = await new GradientEditorPopup().colorSet;
            if (colors.length != 0) {
               this.addPalette(colors);
            }
         } catch (e) {
            if (e !== "Cancel") {
               console.warn(e);
            }
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