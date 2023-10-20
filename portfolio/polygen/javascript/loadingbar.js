let DataStore;

export class LoadingIndicator {
	constructor(store) {

		DataStore = store;

		this.height = 200;
		this.width = 1000;

		this.canvas = document.getElementById("loader");
		this.ctx = this.canvas.getContext("2d");
		
		this.dummyCanvas = new OffscreenCanvas(this.height, this.width);
		this.dummyCtx = this.dummyCanvas.getContext("2d");

		this.debuginit();

		// setInterval(() => {
		// 	console.log(DataStore.gradientData);
		// 	this.setupReference();
		// }, 100);

		this.tris = [
			{x: 0, y: 0, v: 0, c: 0}, // xpos ypos velocity color
		]
	}

	// This uses the active gradient as the reference.
	setupReference() {
		// initialize gradient
		let grad;
		if (DataStore.gradientData.type == "linear") {
			const adjGradData = {
				x1: DataStore.gradientData.x1 * (this.width / DataStore.settings.x),
				y1: DataStore.gradientData.y1 * (this.height / DataStore.settings.y),
				x2: DataStore.gradientData.x2 * (this.width / DataStore.settings.x),
				y2: DataStore.gradientData.y2 * (this.height / DataStore.settings.y)
			}
			grad = this.ctx.createLinearGradient(adjGradData.x1, adjGradData.y1, adjGradData.x2, adjGradData.y2);
		} else {
			const adjGradData = {
				x: DataStore.gradientData.x * this.width,
				y: DataStore.gradientData.y * this.height,
				iRad: DataStore.settings.irad * Math.max(DataStore.settings.x, DataStore.settings.y)* (this.width / DataStore.settings.x),
				oRad: DataStore.settings.orad * Math.max(DataStore.settings.x, DataStore.settings.y) * (this.width / DataStore.settings.x),
			}
			grad = this.dummyCtx.createRadialGradient(adjGradData.x, adjGradData.y, adjGradData.iRad, adjGradData.x, adjGradData.y, adjGradData.oRad);
		}

		// Add color stops
		for (let a = 0; a < DataStore.gradientData.stops.length; a++) {
			let pos = DataStore.gradientData.stops[a][0];
			grad.addColorStop(pos, DataStore.gradientData.stops[a][1]);
		}

		// Draw
		this.dummyCtx.fillStyle = grad;
		this.dummyCtx.fillRect(0, 0, DataStore.settings.x, DataStore.settings.y);
	}

	debuginit() {
		this.canvas.height = this.height;
		this.canvas.width = this.width;
		this.ctx.fillStyle = "white";
		this.ctx.rect(0, 0, this.height, this.width);
		this.ctx.fill();
	}

	animate() {

	}
}

/** Process:
 * Create a gradient (use offscreen canvas to poll) pull gradient data from DataStore.gradData;
 * Create a triangle, poll color at x position
 * if x position is on the right, constant velocity
 * if x position is on the left, increasing velocity and fade
 */