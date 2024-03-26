import Store from "./store.js";
import GradientEditorPopup from "../modules/gradientEditorPopup.js";
import Gradient from "../models/Gradient.js";
import Utils from "../modules/utility.js";
import Compiler from "./compiler.js";

export default class UI {
	constructor() { }

	//==================================
	//	Public Methods
	//==================================
	
	static Init() {
		UI.#DisplayCorrectUI();
		UI.#PopulateCommon();
		UI.#ButtonListeners();
		UI.#RangeListeners();
		UI.#KeyListeners();
		UI.#MiscListeners();

		document.querySelectorAll(".palette")[0].classList.add("active-palette");
		document.querySelectorAll(".layer-wrap")[0].classList.add("layer-selected");
	}

	static AddPalette(palette, index) {
		const wrap = document.createElement("DIV");
		wrap.classList.add("palette");
		const paletteElement = document.createElement("DIV");
		paletteElement.classList.add("palette-colors");
		palette.forEach((color) => {
			const colorDiv = document.createElement("DIV");
			colorDiv.classList.add("palette-color");
			colorDiv.style.backgroundColor = color.color;
			paletteElement.appendChild(colorDiv);
		});

		const opts = document.createElement("DIV");
		opts.classList.add("palette-options");
		opts.innerHTML = Store.htmlTemplates["PALETTE_CONTROLS"];

		wrap.appendChild(paletteElement);
		wrap.appendChild(opts);
		document.querySelector(".control-palettes").appendChild(wrap);

		// Add its event listener for editing
		opts.children[0].addEventListener("click", async (event) => {
			try {
				Store.Preview.SelectPalette(index);
				const GEopts = {x: event.clientX + 50, y: event.clientY, centerY: true, centerX: false }
				const newColors = await new GradientEditorPopup(GEopts, Store.palettes[index], false).colorSet;
				if (newColors.length != 0) {
					Store.UpdatePalette(new Gradient(newColors), index);
					Store.SavePalettes();
					updatePaletteColors(paletteElement, newColors);
					Store.Preview.SelectPalette(index);
				}
			} catch (e) {
				if (e !== "Cancel") {
					console.error(e);
				}
			}
		});

		// Add its event listener for selecting
		wrap.addEventListener("click", () => {
			Store.Preview.SelectPalette(index);
			document.querySelector(".active-palette").classList.remove("active-palette");
			wrap.classList.add("active-palette");
		});
	}

	static AddLayer(layer) {
		const template = document.getElementById("layer-template").content.children[0];
		const newLayer = template.cloneNode(true);
		document.querySelector(".vertex-layer").appendChild(newLayer);
		newLayer.querySelector(".layer-name").innerText = layer.name;
		newLayer.addEventListener("click", function (event) {
			if ((event.target !== this) && !event.target.classList.contains("layer-name")) return;
			document.querySelector(".layer-selected")?.classList.remove("layer-selected");
			newLayer.classList.add("layer-selected");
			Store.Preview.SelectLayer(layer.id);
		});
		newLayer.querySelector(".layer-btn-wrap .layer-visible").addEventListener("click", () => {
			newLayer.classList.add("layer-inactive");
			newLayer.classList.remove("layer-active");
			Store.Preview.layerMap[layer.id].visible = false;
		});
		newLayer.querySelector(".layer-btn-wrap .layer-hidden").addEventListener("click", () => {
			newLayer.classList.add("layer-active");
			newLayer.classList.remove("layer-inactive");
			Store.Preview.layerMap[layer.id].visible = true;
		});
		newLayer.querySelector(".layer-btn-wrap .layer-delete").addEventListener("click", () => {
			Store.Preview.RemoveLayer(layer.id);
			newLayer.remove();
		});
		Store.Preview.layerMap[layer.id].uiElement = newLayer;
	}

	static SetUIToLayer(layer) {
		document.querySelector(".i-variance").value = layer.settings.variance;
		document.querySelector(".i-verts").value = layer.settings.cellSize;
		document.querySelector(".i-outline").value = layer.settings.lineOpacity;
		document.querySelector(".i-outline-color").value = layer.settings.lineColor;
		document.querySelector(".i-0-rotation").value = layer.settings.gradRotation;
		document.querySelector(".i-1-posx").value = layer.settings.radialX;
		document.querySelector(".i-1-posy").value = layer.settings.radialY;
		document.querySelector(".i-1-inrad").value = layer.settings.innerRad;
		document.querySelector(".i-1-outrad").value = layer.settings.outerRad;
		document.querySelector(".i-bright-variance").value = layer.settings.colorRand;
		document.querySelector(".lighten").classList.remove("btn-active");
		document.querySelector(".darken").classList.remove("btn-active");
		if (layer.settings.colorMode === 1) {
			document.querySelector(".lighten").classList.add("btn-active");
		}
		if (layer.settings.colorMode === -1) {
			document.querySelector(".darken").classList.add("btn-active");
		}
		document.querySelector(".i-outline-color").value = layer.settings.lineColor;
		document.querySelector(".i-outline").value = layer.settings.lineOpacity;
		document.querySelector(".i-variance").value = layer.settings.variance;
		document.querySelectorAll(".palette").forEach((el) => {
			el.classList.remove("active-palette");
		});
		document.querySelectorAll(".palette")[layer.settings.gradientIndex].classList.add("active-palette");
		document.querySelector(".i-outline-color").value = layer.settings.lineColor;
		document.querySelector(".outline-color-wrap").style.background = layer.settings.lineColor;
	}


	//==================================
	//	Private Methods
	//==================================

	static #DisplayCorrectUI() {
		for (let a = 0; a < document.querySelectorAll(".fortype-1").length; a++) {
			if (!document.querySelectorAll(".fortype-1")[a].classList.contains("fortype-0")) {
				document.querySelectorAll(".fortype-1")[a].style.height = "0px";
			}
		}
		for (let a = 0; a < document.querySelectorAll(".fortype-2").length; a++) {
			document.querySelectorAll(".fortype-2")[a].style.height = "0px";
		}
	}

	// Populate different repetitive elements of the UI like buttons and palettes
	static #PopulateCommon() {
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

		// Populate color palettes
		Store.palettes.forEach((p, idx) => {
			UI.AddPalette(p, idx);
		});

		// Populate layers
		Store.Preview.layers.forEach((l, idx) => {
			UI.AddLayer(l);
		});
	}

	static #ButtonListeners() {
		// panels
		document.querySelector(".choose-properties").addEventListener("click", () => {
			Store.activePage = 0;
			document.querySelector(".choose-tools").classList.remove("btn-active");
			document.querySelector(".choose-properties").classList.add("btn-active");
			document.querySelector(".panel-image-tools").style.display = "none";
			document.querySelector(".panel-image-properties").style.display = "inline";
			//! EditLayer.deactivateBrush();
		});
		document.querySelector(".choose-tools").addEventListener("click", () => {
			Store.activePage = 1;
			document.querySelector(".choose-properties").classList.remove("btn-active");
			document.querySelector(".choose-tools").classList.add("btn-active");
			document.querySelector(".panel-image-tools").style.display = "inline";
			document.querySelector(".panel-image-properties").style.display = "none";
		});

		// show / hide relevant buttons for specific gradient types
		document.querySelector(".type-0").addEventListener("click", () => {
			document.querySelector(".type-btn.btn-active").classList.remove("btn-active");
			document.querySelectorAll(".fortype-0").forEach((el) => {
				el.style.height = "";
			});
			document.querySelectorAll(".fortype-1").forEach((el) => {
				if (!el.classList.contains("fortype-0")) {
					el.style.height = "0px";
				}
			});
			document.querySelectorAll(".fortype-2").forEach((el) => {
				el.style.height = "0px";
			});
			document.querySelectorAll(".image-dimensions").forEach((el) => {
				el.disabled = false;
			});
			document.querySelector(".type-0").classList.add("btn-active");
			Store.activeType = 0;
			Store.settings.mode = "linear";
		});
		document.querySelector(".type-1").addEventListener("click", () => {
			document.querySelector(".type-btn.btn-active").classList.remove("btn-active");
			document.querySelectorAll(".fortype-0").forEach((el) => {
				el.style.height = "0px";
			});
			document.querySelectorAll(".fortype-1").forEach((el) => {
				el.style.height = "";
			});
			document.querySelectorAll(".fortype-2").forEach((el) => {
				el.style.height = "0px";
			});
			document.querySelectorAll(".image-dimensions").forEach((el) => {
				el.disabled = false;
			});
			document.querySelector(".type-1").classList.add("btn-active");
			Store.activeType = 1;
			Store.settings.mode = "radial";
		});
		document.querySelector(".type-2").addEventListener("click", () => {
			document.querySelector(".type-btn.btn-active").classList.remove("btn-active");
			document.querySelectorAll(".fortype-0").forEach((el) => {
				el.style.height = "0px";
			});
			document.querySelectorAll(".fortype-1").forEach((el) => {
				el.style.height = "0px";
			});
			document.querySelectorAll(".fortype-2").forEach((el) => {
				el.style.height = "";
			});
			document.querySelectorAll(".image-dimensions").forEach((el) => {
				el.disabled = true;
			});
			document.querySelector(".type-2").classList.add("btn-active");
			Store.activeType = 2;
			Store.settings.mode = "image";
		});

		// rotation snap buttons (adding/removing active styling)
		document.querySelectorAll(".rot-snap").forEach((el) => {
			el.addEventListener("click", () => {
				if (document.querySelector(".rot-snap.btn-active")) {
					document.querySelector(".rot-snap.btn-active").classList.remove("btn-active");
				}
				el.classList.add("btn-active");
			});
		});

		// brightness mode buttons (adding/removing active styling)
		document.querySelectorAll(".bmode-btn").forEach((el) => {
			el.addEventListener("click", () => {
				if (document.querySelector(".bmode-btn.btn-active")) {
					document.querySelector(".bmode-btn.btn-active").classList.remove("btn-active");
				}
				el.classList.add("btn-active");
			});
		});

		// file picker
		document.querySelector(".file-choose").addEventListener("click", async () => {
			const img = await window.showOpenFilePicker({types: [{description: "Image", accept: {"image/*": [".png", ".jpeg", ".jpg"]}}]});
			const file = await img[0].getFile();
			Store.Preview.baseCanvas.DrawImage(file);
		});

		// rotation snap buttons (setting rotation)
		document.querySelector(".snap-0").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.gradRotation = 90;
		});
		document.querySelector(".snap-1").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.gradRotation = 270;
		});
		document.querySelector(".snap-2").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.gradRotation = 180;
		});
		document.querySelector(".snap-3").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.gradRotation = 0;
		});
		document.querySelector(".snap-4").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.gradRotation = Utils.radToDeg(Store.idealAngle);
		});
		document.querySelector(".snap-5").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.gradRotation = Utils.radToDeg(Math.PI + Store.idealAngle);
		});
		document.querySelector(".snap-6").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.gradRotation = Utils.radToDeg(Math.PI - Store.idealAngle);
		});
		document.querySelector(".snap-7").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.gradRotation = Utils.radToDeg(-1 * Store.idealAngle);
		});

		// selection brush toggle
		document.querySelector(".brush-btn").addEventListener("click", () => {
			if (!Store.Editor.brush.active) {
				Store.Editor.brush.active = true;
				Store.Editor.activateBrush();
			} else {
				Store.Editor.deactivateBrush();
			}
		});

		document.querySelector(".deselect-vertices").addEventListener("click", () => {
			Store.Editor.clean();
		});

		document.querySelector(".vertex-recalc").addEventListener("click", () => {
			Store.Editor.recalculateSelected();
		});

		document.querySelector(".vertex-color-snap").addEventListener("click", () => {
			Store.Editor.colorSnap();
		});

		document.querySelector(".vertex-manual-drag").addEventListener("click", (event) => {
			event.target.classList.toggle("btn-active");
			Store.Editor.vertexDrag();
		});
	}

	// Event listeners for keypresses
	static #KeyListeners() {
		// selection brush
		let ctrlHeld = false;
		window.addEventListener("keydown", (event) => {
			if (Object.hasOwn(Store.Defaults.UI.SELECTION_BRUSH_KEYBINDS, event.key) && !Store.Editor.brush.active) {
				Store.Editor.brush.active = true;
				Store.Editor.activateBrush();
			}
			if (event.key === Store.Defaults.UI.UNDO_KEYBINDS.CTRL) {
				ctrlHeld = true;
			}
			if (ctrlHeld && event.key === Store.Defaults.UI.UNDO_KEYBINDS.Z) {
				Store.Preview.Undo();
			}
		});
		window.addEventListener("keyup", (event) => {
			if (Object.hasOwn(Store.Defaults.UI.SELECTION_BRUSH_KEYBINDS, event.key)) {
				Store.Editor.deactivateBrush();
			}
			if (event.key === Store.Defaults.UI.UNDO_KEYBINDS.CTRL) {
				ctrlHeld = false;
			}
		});
		
	}

	static #RangeListeners() {
		// general - vertex variance and cell size
		document.querySelector(".i-variance").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.variance = event.target.value;
		});
		document.querySelector(".i-verts").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.cellSize = event.target.value;
		});

		// linear gradient
		document.querySelector(".i-0-rotation").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.gradRotation = event.target.value;
			if (document.querySelector(".rot-snap.btn-active")) {
				document.querySelector(".rot-snap.btn-active").classList.remove("btn-active");
			}
		});

		// radial gradient
		document.querySelector(".i-1-posx").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.radialX = event.target.value;
		});
		document.querySelector(".i-1-posy").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.radialY = event.target.value;
		});
		document.querySelector(".i-1-inrad").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.innerRad = event.target.value;
		});
		document.querySelector(".i-1-outrad").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.outerRad = event.target.value;
		});

		// brightness variance
		document.querySelector(".i-bright-variance").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.colorRand = event.target.value;
		});
		document.querySelector(".lighten").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.colorMode = 1;
		});
		document.querySelector(".darken").addEventListener("click", () => {
			Store.Preview.activeLayer.settings.colorMode = -1;
		});

		// outline
		document.querySelector(".i-outline").addEventListener("input", (event) => {
			Store.Preview.activeLayer.settings.lineOpacity = parseFloat(event.target.value);
		});

		// proportional falloff (tools)
		document.querySelector(".prop-falloff").addEventListener("input", (event) => {
			Store.settings.propFalloff = parseInt(event.target.value);
		});
	}

	// Other event listeners
	static #MiscListeners() {
		let ySizeDebounce = null;
		let xSizeDebounce = null;

		// outline color picker
		document.querySelector(".i-outline-color").addEventListener("input", (event) => {
			document.querySelector(".outline-color-wrap").style.background = event.target.value;
			Store.Preview.activeLayer.settings.lineColor = document.querySelector(".i-outline-color").value;
		});

		// dimensions
		document.querySelector(".image-height").addEventListener("input", (event) => {
			clearTimeout(ySizeDebounce);
			ySizeDebounce = setTimeout(() => {
				if (event.target.value !== "0" && event.target.value !== undefined && event.target.value !== "") {
					Store.settings.y = Number(event.target.value);
				} else {
					console.warn("ERROR: Bad height dimension value. Enter a value of 1 or greater");
				}
			}, Store.Defaults.INPUTS.DEBOUNCE);
		});
		document.querySelector(".image-width").addEventListener("input", (event) => {
			clearTimeout(xSizeDebounce);
			xSizeDebounce = setTimeout(() => {
				if (event.target.value !== "0" && event.target.value !== undefined && event.target.value !== "") {
					Store.settings.x = Number(event.target.value);
				} else {
					console.warn("ERROR: Bad width dimension value. Enter a value of 1 or greater");
				}
			}, Store.Defaults.INPUTS.DEBOUNCE);
		});

		// add color palette
    	document.querySelector(".palette-add").addEventListener("click", async (event) => {
			try {
				let colors = await new GradientEditorPopup({x: event.clientX + 50, y: event.clientY, centerY: true, centerX: false}).colorSet;
				if (colors.length != 0) {
					Store.AddPalette(new Gradient(colors));
					Store.SavePalettes();
					this.AddPalette(colors, Store.palettes.length - 1);
				}
			} catch (e) {
				if (e !== "Cancel") {
					console.warn(e);
				}
			}
		});

		document.querySelector(".layer-add").addEventListener("click", () => {
			const newLayer = Store.Preview.NewLayer();
			UI.AddLayer(newLayer);
			Store.Preview.SelectLayer(newLayer.id);
		});

		// download image
		document.querySelector(".download-as-png").addEventListener("click", () => {
			let downloader = document.querySelector(".downloader");
			downloader.setAttribute("download", "Polygen Image.png");
			const compiled = Compiler.CompileToPNG();
			downloader.setAttribute("href", compiled._canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream"));
			downloader.click();
		});
		document.querySelector(".download-as-svg").addEventListener("click", () => {
			let downloader = document.querySelector(".downloader");
			downloader.setAttribute("download", "Polygen Image.svg");
			const compiled = Compiler.CompileToSVG();
			downloader.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(compiled));
			downloader.click();
		});

		window.addEventListener("resize", () => {
			Store.Preview.pixelRatio = Store.settings.x / Store.Preview.baseCanvas._canvasElement.offsetWidth;
		});
	}
}


function updatePaletteColors(paletteElement, colors) {
	paletteElement.innerHTML = "";
	colors.forEach((color) => {
		const colorDiv = document.createElement("DIV");
		colorDiv.classList.add("palette-color");
		colorDiv.style.backgroundColor = color.color;
		paletteElement.appendChild(colorDiv);
	});
}