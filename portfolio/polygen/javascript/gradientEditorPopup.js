let DataStore;

/**
 * TODO:
 * 
 * Add color stop button
 * Delete color stop button
 * Return color stop data in promise
 * Restyle popup, make it more responsive and fix those buttons, figure out what to do with that BL corner
 * Draggable?
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
			general: new AbortController(),
			stopPopup: new AbortController(),
		};

		this.selectedStop = null;

		this.currentClick = null;

		this.promiseOut = new Promise((resolve, reject) => {
			this.return = resolve;
		});

		this.mouseIsOver = null;
		this.stopControlsOpen = false;
		this.currentStopControlElement = null;
		this.rangeStops = [];
		
		this.createGradientEditor(this.gradientColorSet);
		this.setListeners();
		return this.output;
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

		// Create sliders and set up event listeners
		for (let [idx, color] of colors.entries()) {
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

			rangeStop.addEventListener("mousedown", (event) => {
				this.mouseIsOver = "colorStop";
				document.getElementById(`range-stop-${this.selectedStop}`)?.classList.remove("popup-stop-selected");
				const id = idx;
				this.selectedStop = id;
				rangeStop.classList.add("popup-stop-selected");
				this.currentClick = { x: event.clientX };

				const prevStopControlsWrap = document.getElementById("popup-stop-controls-wrap");
				prevStopControlsWrap?.parentElement.removeChild(prevStopControlsWrap);

			}, { signal: this.aborts.general.signal });

			rangeStop.addEventListener("mouseout", () => { this.mouseIsOver = null }, { signal: this.aborts.general.signal });
			
			rangeStop.addEventListener("mouseup", (event) => {
				const id = idx;
				const dX = Math.abs(event.clientX - this.currentClick.x);

				if (this.selectedStop !== id || dX > 2) return

				this.openStopControls(id, event);

			}, { signal: this.aborts.general.signal })

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

			document.body.addEventListener("mousedown", (event) => {
				if (!this.mouseIsOver && this.stopControlsOpen) {
					event.preventDefault();
					this.closeStopControls();
					this.refreshPreview();
				}
			}, { signal: this.aborts.general.signal });

			this.rangeStops.push({el: rangeStop, id: String(idx)});
		}

		// Clone the HTML popup template to the DOM
		document.body.appendChild(this.template);

		this.drawGradientPreview();
	}

	openStopControls(stopID, event) {
		this.currentStopControlElement = document.getElementById("popup-color-picker-stop-edit").content.children[0].cloneNode(true);
				
		document.body.appendChild(this.currentStopControlElement);
		this.currentStopControlElement.style = `transform: translate(${event.clientX}px, ${event.clientY}px); z-index: 10; position: relative;`;
		document.querySelector(".popup-color-picker-wrap").style.background = this.colorsBySliderID[String(stopID)].color;

		document.querySelector(".popup-color-picker-input").value = this.colorsBySliderID[String(stopID)].color;

		document.querySelector(".popup-color-picker-input").addEventListener("mouseover", () => { this.mouseIsOver = "colorPicker" }, { signal: this.aborts.stopPopup.signal });
		document.querySelector(".popup-color-picker-input").addEventListener("mouseout", () => { this.mouseIsOver = null }, { signal: this.aborts.stopPopup.signal });
					
		document.querySelector(".popup-color-picker-bucket-icon").style.color = this.colorsBySliderID[String(stopID)].color;
		
		document.querySelector(".popup-color-picker-input").addEventListener("input", (event) => {
			this.colorsBySliderID[String(stopID)].color = event.target.value;
		}, { signal: this.aborts.stopPopup.signal });

		this.stopControlsOpen = true;
	}

	closeStopControls() {
		this.currentStopControlElement.parentElement.removeChild(this.currentStopControlElement);

		this.aborts.stopPopup.abort();
		this.aborts.stopPopup = new AbortController();
		this.stopControlsOpen = false;
	}

	refreshPreview() {
		console.log(this.colorsBySliderID);
		this.rangeStops.forEach((element) => {
			element.el.style.setProperty("--thumb-color", this.colorsBySliderID[element.id].color);
		});
		this.drawGradientPreview();
	}

	/**
	 * Draw the live preview gradient to the popup's preview canvas
	 */
	drawGradientPreview() {
		const gradient = this.ctx.createLinearGradient(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
		
		for (let [id, colorPair] of Object.entries(this.colorsBySliderID)) {
			gradient.addColorStop(colorPair.stop, colorPair.color);
		}

		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	setListeners() {
		document.querySelector(".popup-save").addEventListener("click", () => {
			let output = [];
			Object.entries(this.colorsBySliderID).map(([key, pair]) => {
				output[Number(key)] = pair;
			});

			console.log(output);

			this.return(output);
		});
	}

	/**
	 * Destroy the popup
	 */
	destroy() {
		this.aborts.general.abort();
		this.aborts.stopPopup.abort();
	}
}