import Draggable from "./draggable.js";
import Store from "../controllers/store.js";
import Utils from "./utility.js";
import Gradient from "../models/Gradient.js";

export default class GradientEditorPopup {
	constructor(position, gradient = [], createNew = true) {
		this.gradientColorSet = gradient.length > 0
			? new Gradient(gradient)
			: new Gradient(Store.Preview.activePalette);
		
		this.colorsBySliderID = {};

		this.template = document.getElementById("gradient-editor-popup").content.children[0].cloneNode(true);
		this.template.querySelector(".popup-title-text").innerText = createNew ? "Create New Gradient" : "Edit Gradient";

		this.canvas = this.template.querySelector(".gradient-editor-preview");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.height = 50;
		this.canvas.width = 400;

		this.aborts = {
			general: new AbortController(), // for elements that exist for the duration of the popup's life
			stopPopup: new AbortController(), // only for the color stop popup menu
		};

		this.selectedStop = null;

		this.currentClick = null;

		this.colorSet = new Promise((resolve, reject) => {
			this.return = resolve;
			this.reject = reject;
		});

		this.mouseIsOver = null;
		this.stopControlsOpen = false;
		this.addNewStopAllowed = true;
		this.currentStopControlElement = null;
		this.rangeStops = [];
		this.position = position;

		this.#createGradientEditor(this.gradientColorSet);
		this.#setListeners();
		this.#setPosition();

		this.dragHandler = new Draggable(this.template.querySelector(".popup-title"), this.template.querySelector(".popup"));
	}

	#setPosition() {
		let popupHeight = this.template.querySelector(".popup").offsetHeight;
		let popupWidth = this.template.querySelector(".popup").offsetWidth;
		if (this.position.centerX) {
			this.position.x -= popupWidth / 2;
		}
		if (this.position.centerY) {
			this.position.y -= popupHeight / 2;
		}
		if (this.position.y + popupHeight > window.innerHeight) {
			this.position.y = window.innerHeight - popupHeight;
		}
		this.template.querySelector(".popup").style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
	}

	/**
	 * Sets up the color stop draggers and the data to keep track of the colors and positions
	 * @param {Gradient} colors The gradient color data
	 */
	#createGradientEditor(colors) {
		// Create an object that is identical to the provided color data, but with the corresponding slider ID as the key
		colors.forEach((color, idx) => {
			this.colorsBySliderID[String(idx)] = color;
		});

		this.#createStops(colors);

		// Clone the HTML popup template to the DOM
		document.body.appendChild(this.template);

		this.#drawGradientPreview();
	}

	// Clones the popup controls template for color stops and handles inputs
	#openStopControls(stopID, pos) {
		this.currentStopControlElement = document.getElementById("popup-color-picker-stop-edit").content.children[0].cloneNode(true);

		document.body.appendChild(this.currentStopControlElement);
		this.currentStopControlElement.style = `transform: translate(${pos.x}px, ${pos.y}px); z-index: 100; position: relative;`;
		document.querySelector(".popup-color-picker-wrap").style.background = this.colorsBySliderID[String(stopID)].color;

		document.querySelector(".popup-color-picker-input").value = this.colorsBySliderID[String(stopID)].color;

		document.querySelector(".popup-color-picker-input").addEventListener(
			"mouseover",
			() => {
				this.mouseIsOver = "colorPicker";
			},
			{signal: this.aborts.stopPopup.signal}
		);
		document.querySelector(".popup-color-picker-input").addEventListener(
			"mouseout",
			() => {
				this.mouseIsOver = null;
			},
			{signal: this.aborts.stopPopup.signal}
		);

		document.querySelector(".popup-color-picker-bucket-icon").style.color = this.colorsBySliderID[String(stopID)].color;

		document.querySelector(".popup-color-picker-input").addEventListener(
			"input",
			(event) => {
				this.colorsBySliderID[String(stopID)].color = event.target.value;
			},
			{signal: this.aborts.stopPopup.signal}
		);

		document.querySelector(".popup-color-stop-delete").addEventListener(
			"click",
			() => {
				this.#removeStop(stopID);
				this.#closeStopControls();
			},
			{signal: this.aborts.stopPopup.signal}
		);

		this.stopControlsOpen = true;
		this.addNewStopAllowed = false;
	}

	// Closes and deletes the popup controls for color stops
	#closeStopControls() {
		if (this.currentStopControlElement) {
			this.currentStopControlElement.parentElement.removeChild(this.currentStopControlElement);
		}

		this.aborts.stopPopup.abort();
		this.aborts.stopPopup = new AbortController();
		this.stopControlsOpen = false;
		this.addNewStopAllowed = true;
		this.currentStopControlElement = null;
	}

	// Adds data for a new color stop, then recreates the stops and refreshes the preview
	#addNewStop(newStopPos, mousePos) {
		newStopPos = Number(newStopPos);
		for (let [id, color] of Object.entries(this.colorsBySliderID)) {
			let colorDataLength = Object.entries(this.colorsBySliderID).length;
			if (color.stop > newStopPos || (id == colorDataLength - 1 && newStopPos > this.colorsBySliderID[String(colorDataLength - 1)].stop)) {
				const colorsArr = Object.values(this.colorsBySliderID).map((val) => val);
				colorsArr.splice(id, 0, {color: "#ffffff", stop: newStopPos});
				this.colorsBySliderID = Object.assign({}, colorsArr);
				this.#createStops(colorsArr, true);
				this.#refreshPreview();
				this.#openStopControls(id, mousePos);
				break;
			}
		}
	}

	// Deletes data for an existing color stop, then recreates the stops and refreshes the preview
	#removeStop(stopID) {
		if (Object.entries(this.colorsBySliderID).length == 1) return;

		delete this.colorsBySliderID[String(stopID)];
		const colorsArr = Object.values(this.colorsBySliderID).map((val) => val);
		this.colorsBySliderID = Object.assign({}, colorsArr);
		this.#createStops(colorsArr, true);
		this.#refreshPreview();
	}

	/**
	 * Creates a set of color stop range inputs with their corresponding colors and input handlers
	 * @param {Gradient} gradient Gradient data
	 * @param {Boolean} deleteExisting Deletes the existing color stop elements entirely in preparation for a new set
	 */
	#createStops(gradient, deleteExisting = false, returnElementsFor = []) {
		if (deleteExisting) {
			document.querySelectorAll(".popup-range-stop").forEach((element) => {
				element.parentElement.removeChild(element);
			});
			this.rangeStops = [];
		}

		const elementsToReturn = [];

		// Create sliders and set up event listeners
		gradient.forEach((color, idx) => {
			// Create element, add attributes, add to body
			const rangeStop = document.createElement("input");
			[
				["type", "range"],
				["max", "1"],
				["min", "0"],
				["step", "0.01"],
				["id", `range-stop-${idx}`],
				["value", color.stop],
				["class", `popup-range-stop`],
			].forEach((set) => {
				rangeStop.setAttribute(set[0], set[1]);
			});

			rangeStop.style.setProperty("--thumb-color", this.colorsBySliderID[String(idx)].color);

			this.template.querySelector(".gradient-editor-stop-wrap").appendChild(rangeStop);

			// Select color stop that had mousedown
			rangeStop.addEventListener(
				"mousedown",
				(event) => {
					this.mouseIsOver = "colorStop";
					document.getElementById(`range-stop-${this.selectedStop}`)?.classList.remove("popup-stop-selected");
					const id = idx;
					this.selectedStop = id;
					rangeStop.classList.add("popup-stop-selected");
					this.currentClick = {x: event.clientX};

					this.#closeStopControls();
				},
				{signal: this.aborts.general.signal}
			);

			rangeStop.addEventListener(
				"mouseout",
				() => {
					this.mouseIsOver = null;
				},
				{signal: this.aborts.general.signal}
			);

			// If 'click' on color stop had a mouse delta of < 2px, open stop controls
			rangeStop.addEventListener(
				"mouseup",
				(event) => {
					const id = idx;
					const dX = Math.abs(event.clientX - this.currentClick.x);

					if (this.selectedStop !== id || dX > 2) return;

					this.#openStopControls(id, {x: event.clientX, y: event.clientY});
				},
				{signal: this.aborts.general.signal}
			);

			// Updates color on input
			rangeStop.addEventListener(
				"input",
				() => {
					const id = idx;
					const col = this.colorsBySliderID[String(id)];
					col.stop = Number(rangeStop.value);
					this.colorsBySliderID[String(id)] = col;
					this.#drawGradientPreview();
				},
				{signal: this.aborts.general.signal}
			);

			this.rangeStops.push({el: rangeStop, id: String(idx)});

			if (returnElementsFor.includes(String(idx))) {
				elementsToReturn.push(rangeStop);
			}
		});

		return elementsToReturn;
	}

	// Updates colors for all color stops and re-draws the canvas preview
	#refreshPreview() {
		this.rangeStops.forEach((element) => {
			element.el.style.setProperty("--thumb-color", this.colorsBySliderID[element.id].color);
		});
		this.#drawGradientPreview();
	}

	// Draw the live preview gradient to the popup's preview canvas
	#drawGradientPreview() {
		const gradient = this.ctx.createLinearGradient(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);

		for (let colorPair of Object.values(this.colorsBySliderID)) {
			gradient.addColorStop(colorPair.stop, colorPair.color);
		}

		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Evenly space all stops from 0 to 1
    #spaceStopsEvenly() {
        const evenly = new Gradient([]);
        for (let [id, color] of Object.entries(this.colorsBySliderID)) {
            evenly.add(color.color, Number(id) / (Object.entries(this.colorsBySliderID).length - 1));
            this.colorsBySliderID[id] = {color: color.color, stop: Number(id) / (Object.entries(this.colorsBySliderID).length - 1)};
        }
        this.#createStops(evenly.stops, true);
        this.#refreshPreview();
    }

	// Sets some general listeners that apply to the entirety of the popup
	#setListeners() {
		// Save and exit
		document.querySelector(".popup-save").addEventListener(
			"click",
			() => {
				let output = [];
				Object.entries(this.colorsBySliderID).map(([key, pair]) => {
					output[Number(key)] = pair;
				});

				this.return(output);
				this.destroy();
			},
			{signal: this.aborts.general.signal}
		);

		document.querySelector(".popup-cancel").addEventListener("click", () => {
			this.destroy();
			this.reject("Cancel");
		}, {signal: this.aborts.general.signal});

		document.querySelector(".popup-close").addEventListener("click", () => {
			this.destroy();
			this.reject("Cancel");
        }, { signal: this.aborts.general.signal });
        
        document.querySelector(".popup-space-stops").addEventListener("click", () => {
            this.#spaceStopsEvenly();
        }, { signal: this.aborts.general.signal });

		// Add new color stop
		document.querySelector(".popup-add-color-stop").addEventListener(
			"mousedown",
			(event) => {
				if (!this.addNewStopAllowed || Object.keys(this.colorsBySliderID).length === Store.Defaults.LIMITS.COLOR_STOPS) return;

				this.addNewStopAllowed = false;
				setTimeout(() => {
					this.#addNewStop(event.target.value, {x: event.clientX, y: event.clientY});
				}, 0);
			},
			{signal: this.aborts.general.signal}
		);

		// Exit color stop edit popup
		document.body.addEventListener(
			"mousedown",
			(event) => {
				if (!this.mouseIsOver && this.stopControlsOpen && !Utils.isDescendant(this.currentStopControlElement, event.target)) {
					event.preventDefault();
					this.#closeStopControls();
					this.#refreshPreview();
				}
			},
			{signal: this.aborts.general.signal}
		);
	}

	// Destroy the popup
	destroy() {
		this.aborts.general.abort();
		this.aborts.stopPopup.abort();
		this.dragHandler.destroy();
		let rootEl = document.querySelector(".popup-bg");
		rootEl.parentElement.removeChild(rootEl);
		this.colorsBySliderID = {};
	}
}