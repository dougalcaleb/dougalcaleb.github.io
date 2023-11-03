let DataStore;

export class GradientEditorPopup {
	constructor(store, gradient = []) {

		DataStore = store;

		// this.root = null;
		this.gradientColorSet = gradient.length > 0 ? gradient : DataStore.settings.colors;
		this.colorsBySliderID = {};
		
		this.template = document.getElementById("gradient-editor-popup").content.children[0];

		this.canvas = this.template.querySelector(".popup-preview");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.height = 40;
		this.canvas.width = 400;

		this.eventAborter = new AbortController();

		// this.output = new Promise((resolve, reject) => {
		// 	// have event listeners that call resolve and reject
		// 	resolve();
		// });
		
		this.createGradientEditor(this.gradientColorSet);
		// return this.output;
	}

	/**
	 * Sets up the color stop draggers and the data to keep track of the colors and positions
	 * @param {Array<Object>} colors An array of objects containing a color and a stop - { color: "colCode", stop: dec }
	 */
	createGradientEditor(colors) {
		const styleSheet = document.createElement("STYLE");
		styleSheet.setAttribute("type", "text/css");

		// Create an object that is identical to the provided color data, but with the corresponding slider ID as the key
		for (let [idx, color] of colors.entries()) {
			this.colorsBySliderID[String(idx)] = color;
			styleSheet.innerHTML += `#range-stop-${idx}::-webkit-slider-thumb {background: ${color.color};} `;
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
			].forEach((set) => {
				rangeStop.setAttribute(set[0], set[1]);
			});

			this.template.querySelector(".popup-preview-wrap").appendChild(rangeStop);

			rangeStop.addEventListener(
				"input",
				() => {
					const id = idx;
					const col = this.colorsBySliderID[String(id)];
					col.stop = rangeStop.value;
					this.colorsBySliderID[String(id)] = col;
					this.drawGradientPreview();
				},
				{signal: this.eventAborter.signal}
			);
		}

		// Add the stylesheet to the document and clone the HTML template to the DOM
		document.getElementsByTagName("head")[0].appendChild(styleSheet);
		document.body.appendChild(this.template);

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

	/**
	 * Destroy the popup
	 */
	destroy() {
		this.eventAborter.abort();
	}
}