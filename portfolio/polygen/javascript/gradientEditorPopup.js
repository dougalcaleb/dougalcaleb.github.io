import { DEFAULTS } from "./globals.js";

let DataStore;

/**
 * TODO:
 * 
 * Delete color stop functionality
 * Error handling? Use returnError
 * Restyle popup, make it more responsive and fix those buttons, figure out what to do with that BL corner
 * Draggable?
 * Fix: dragging input instead of singe click
 */

export class GradientEditorPopup {
	constructor(store, gradient = []) {

		DataStore = store;

		this.gradientColorSet = gradient.length > 0 ? gradient : DataStore.settings.colors;
		this.colorsBySliderID = {};
		
		this.template = document.getElementById("gradient-editor-popup").content.children[0];

		this.canvas = this.template.querySelector(".popup-preview");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.height = 40;
		this.canvas.width = 400;

		this.aborts = {
			general: new AbortController(), // for elements that exist for the duration of the popup's life
			stopPopup: new AbortController(), // only for the color stop popup menu
		};

		this.selectedStop = null;

		this.currentClick = null;

		this.promiseOut = new Promise((resolve, reject) => {
			this.return = resolve;
			this.returnError = reject;
		});

		this.mouseIsOver = null;
      this.stopControlsOpen = false;
      this.addNewStopAllowed = true;
		this.currentStopControlElement = null;
		this.rangeStops = [];
		
		this.createGradientEditor(this.gradientColorSet);
		this.setListeners();

		return this.promiseOut; // Returns a promise
	}

	/**
	 * Sets up the color stop draggers and the data to keep track of the colors and positions
	 * @param {Array<Object>} colors An array of objects containing a color and a stop - { color: "colCode", stop: dec }
	 */
	createGradientEditor(colors) {

		// Create an object that is identical to the provided color data, but with the corresponding slider ID as the key
		for (let [idx, color] of colors.entries()) {
			this.colorsBySliderID[String(idx)] = color;
		}

		this.createStops(colors);

		// Clone the HTML popup template to the DOM
		document.body.appendChild(this.template);

		this.drawGradientPreview();
	}

	// Clones the popup controls template for color stops and handles inputs
	openStopControls(stopID, pos) {
		this.currentStopControlElement = document.getElementById("popup-color-picker-stop-edit").content.children[0].cloneNode(true);
				
		document.body.appendChild(this.currentStopControlElement);
		this.currentStopControlElement.style = `transform: translate(${pos.x}px, ${pos.y}px); z-index: 10; position: relative;`;
		document.querySelector(".popup-color-picker-wrap").style.background = this.colorsBySliderID[String(stopID)].color;

		document.querySelector(".popup-color-picker-input").value = this.colorsBySliderID[String(stopID)].color;

		document.querySelector(".popup-color-picker-input").addEventListener("mouseover", () => { this.mouseIsOver = "colorPicker" }, { signal: this.aborts.stopPopup.signal });
		document.querySelector(".popup-color-picker-input").addEventListener("mouseout", () => { this.mouseIsOver = null }, { signal: this.aborts.stopPopup.signal });
					
		document.querySelector(".popup-color-picker-bucket-icon").style.color = this.colorsBySliderID[String(stopID)].color;
		
		document.querySelector(".popup-color-picker-input").addEventListener("input", (event) => {
			this.colorsBySliderID[String(stopID)].color = event.target.value;
		}, { signal: this.aborts.stopPopup.signal });

      this.stopControlsOpen = true;
      this.addNewStopAllowed = false;
	}

	// Closes and deletes the popup controls for color stops
   closeStopControls() {
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
   addNewStop(newStopPos, position) {
		newStopPos = Number(newStopPos);
		for (let [id, color] of Object.entries(this.colorsBySliderID)) {
			if (color.stop > newStopPos) {
				const colorsArr = Object.values(this.colorsBySliderID).map(val => val)
				colorsArr.splice(id, 0, { color: "#ffffff", stop: newStopPos });
				this.colorsBySliderID = Object.assign({}, colorsArr);
				this.createStops(colorsArr, true);
            this.refreshPreview();
            this.openStopControls(id, position);
				break;
			}
		}
	}

	// Deletes data for an existing color stop, then recreates the stops and refreshes the preview
	removeStop() {}

	/**
	 * Creates a set of color stop range inputs with their corresponding colors and input handlers
	 * @param {Array<Object>} colorSetArr An array of objects with color and stop position values
	 * @param {Boolean} deleteExisting Deletes the existing color stop elements entirely in preparation for a new set
	 */
	createStops(colorSetArr, deleteExisting = false, returnElementsFor = []) {
		if (deleteExisting) {
			document.querySelectorAll(".popup-range-stop").forEach((element) => {
				element.parentElement.removeChild(element);
			});
      }

      const elementsToReturn = [];

		// Create sliders and set up event listeners
		for (let [idx, color] of colorSetArr.entries()) {

			// Create element, add attributes, add to body
			const rangeStop = document.createElement("input");
			[
				["type", "range"],
				["max", "1"],
				["min", "0"],
				["step", "0.01"],
				["id", `range-stop-${idx}`],
				["value", color.stop],
				["class", `popup-range-stop`]
			].forEach((set) => {
				rangeStop.setAttribute(set[0], set[1]);
			});

			rangeStop.style.setProperty("--thumb-color", this.colorsBySliderID[String(idx)].color);

			this.template.querySelector(".popup-preview-wrap").appendChild(rangeStop);

			// Select color stop that had mousedown
			rangeStop.addEventListener("mousedown", (event) => {
				this.mouseIsOver = "colorStop";
				document.getElementById(`range-stop-${this.selectedStop}`)?.classList.remove("popup-stop-selected");
				const id = idx;
				this.selectedStop = id;
				rangeStop.classList.add("popup-stop-selected");
				this.currentClick = { x: event.clientX };

            this.closeStopControls();

			}, { signal: this.aborts.general.signal });

			rangeStop.addEventListener("mouseout", () => { this.mouseIsOver = null }, { signal: this.aborts.general.signal });
			
			// If 'click' on color stop had a mouse delta of < 2px, open stop controls
			rangeStop.addEventListener("mouseup", (event) => {
				const id = idx;
				const dX = Math.abs(event.clientX - this.currentClick.x);

				if (this.selectedStop !== id || dX > 2) return

				this.openStopControls(id, {x: event.clientX, y: event.clientY });

			}, { signal: this.aborts.general.signal })

			// Updates color on input
			rangeStop.addEventListener(
				"input",
				() => {
					const id = idx;
					const col = this.colorsBySliderID[String(id)];
					col.stop = Number(rangeStop.value);
					this.colorsBySliderID[String(id)] = col;
					this.drawGradientPreview();
				},
				{ signal: this.aborts.general.signal }
			);

         this.rangeStops.push({ el: rangeStop, id: String(idx) });
         
         if (returnElementsFor.includes(String(idx))) {
            elementsToReturn.push(rangeStop);
         }
      }
      
      return elementsToReturn;
   }
   
	// Updates colors for all color stops and re-draws the canvas preview
	refreshPreview() {
		this.rangeStops.forEach((element) => {
			element.el.style.setProperty("--thumb-color", this.colorsBySliderID[element.id].color);
		});
		this.drawGradientPreview();
	}

	// Draw the live preview gradient to the popup's preview canvas
	drawGradientPreview() {
		const gradient = this.ctx.createLinearGradient(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
		
		for (let [id, colorPair] of Object.entries(this.colorsBySliderID)) {
			gradient.addColorStop(colorPair.stop, colorPair.color);
		}

		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	// Sets some general listeners that apply to the entirety of the popup
	setListeners() {

		// Save and exit
		document.querySelector(".popup-save").addEventListener("click", () => {
			let output = [];
			Object.entries(this.colorsBySliderID).map(([key, pair]) => {
				output[Number(key)] = pair;
			});

			this.return(output);
			this.destroy();
      }, { signal: this.aborts.general.signal });

		// Add new color stop
      document.querySelector(".popup-add-color-stop").addEventListener("mousedown", (event) => {
         if (!this.addNewStopAllowed || Object.keys(this.colorsBySliderID).length === DEFAULTS.limits.colorStops) return;

         this.addNewStopAllowed = false;
         setTimeout(() => {
            this.addNewStop(event.target.value, { x: event.clientX, y: event.clientY });
         }, 0);
		}, { signal: this.aborts.general.signal });

		// Exit color stop edit popup
		document.body.addEventListener("mousedown", (event) => {
			if (!this.mouseIsOver && this.stopControlsOpen) {
				event.preventDefault();
				this.closeStopControls();
				this.refreshPreview();
			}
		}, { signal: this.aborts.general.signal });
	}

	// Destroy the popup
	destroy() {
		this.aborts.general.abort();
		this.aborts.stopPopup.abort();
		// todo: Remove elements
	}
}