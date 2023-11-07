let DataStore;

export class LoadingIndicator {
	constructor(store, height = 180, width = 1000, layers = 3) {

		DataStore = store;

		this.height = height;
		this.width = width;

		this.halfWidth = this.width / 2;

		this.continueAnimation = true;

		this.animOpts = {
			fps: 15,
			length: 5,
			transitionFunction: "ease-in-out",
			transition: 1,
		};

		this.animData = {
			triWidth: Math.floor(height / layers),
			triHalfWidth: Math.floor((height / layers) / 2),
			triHeight: Math.floor((height / layers) / Math.sqrt(2)),
			triHalfHeight: Math.floor((height / layers) / Math.sqrt(2) / 2),
			startX: Math.floor(this.width - ((height / layers) / 2)),
			startY: Math.floor((height / layers) / Math.sqrt(2) / 2),
			loop: null,
		}

		// console.log(this.animData)

		this.canvas = document.getElementById("loader");
		this.ctx = this.canvas.getContext("2d");
		this.imageData;
		
		this.dummyCanvas = new OffscreenCanvas(this.width, this.height);
		this.dummyCtx = this.dummyCanvas.getContext("2d");

		// setInterval(() => {
		// 	console.log(DataStore.gradientData);
		// 	this.setupReference();
		// }, 100);

		setTimeout(() => {
			this.setupReference();
			this.beginAnimation();
			// this.animate();
		}, 100)

		// setTimeout(() => {
		// 	this.stopAnimation();
		// }, 2100)

		this.tris = [
			// {x: 0, y: 0, v: 0, c: 0, p: null}, // xpos ypos velocity color path
		];

		this.canvas.height = this.height;
		this.canvas.width = this.width;
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

		this.imageData = this.dummyCtx.getImageData(0, 0, this.width, this.height);
	}

	newTriangle(orientaton = "dn") {
		if (orientaton === "dn") {
			let fill = this.getPixelColor(this.animData.startX, this.animData.triHalfHeight);
			this.tris.push({
				x: this.animData.startX,
				y: this.animData.startY,
				vel: this.animOpts.initVel,
				color: fill,
				type: 0
			});
		} else {
			let fill = this.getPixelColor(this.animData.startX, this.animData.triHalfHeight);
			this.tris.push({
				x: this.animData.startX,
				y: this.animData.startY,
				vel: this.animOpts.initVel,
				color: fill,
				type: 1
			});
		}
	}

	/** NEW IDEA:
	 * - Single line of triangles
	 * - On interval, slides to the left and pauses
	 * - Canvas width is ((#tris / 2) + 1) * triwidth. Height is triheight.
	 * - 2 draw modes: start on top / start on bottom
	 * - Array is colors, not triangle data
	 * - Starting on bottom:
	 *  
	 * 		- 0.5width,height -> 1.5width,height -> width,0         -> close 0
	 * 		- width,0 		  -> 2width,0        -> 1.5width,height -> close 1
	 * 		- 1.5width,height -> 2.5width,height -> 2width,0		-> close 2
	 * 		- 2width,0 		  -> 3width,0		 -> 2.5width,height -> close 3
	 * 		- 2.5width,height -> 3.5width,height -> 3width,0		-> close 4
	 * 
	 * 		idx is 0 based
	 * 
	 * 		formulas for 3 vertices of a triangle with given index idx:
	 * 		1:	(idx + 1) * halfwidth, ((idx + 1) % 2) * height
	 * 		2:	(idx + 1) * halfwidth + width, ((idx + 1) % 2) * height
	 * 		3:  (idx + 1) * halfwidth + halfwidth, (idx % 2) * height
	 * 
	 * 		-> Animate: All x values subtract animation specified x
	 * 
	 * 		-> Have one array of precomputed paths
	 * 			Loop:
	 * 		-> Apply colors to correct triangles
	 * 		-> Animate canvas with canvas translate(), fade out last triangle, fade in first one
	 * 		-> Reset canvas: Untranslate and redraw paths with correct colors
	 * 			Reloop
	 */


	animate() {
		console.log("Animate called");
		// this.canvas.style.transitionDuration = `${this.animOpts.transition}s`;
		setTimeout(() => {
			console.log("timeout expired");
			this.canvas.style.transform = `translate(-${this.animData.triHalfWidth}px, 0px)`;
		}, 0);
		// this.canvas.style.transform = `translate(-${Math.random() * 100}px, 0px)`;

		// setTimeout(() => {
		// 	console.log("in timeout");
		// 	this.canvas.style.transitionDuration = "0s";
		// 	console.log(this.canvas.style.transitionDuration)
		// 	this.canvas.style.transform = "translate(0px, 0px)";
		// 	this.canvas.style.transitionDuration = `${this.animOpts.transition}s`;
		// 	console.log(this.canvas.style.transitionDuration)
		// }, this.animOpts.transition * 1000);
	}

	resetAnimation() {
		console.log("ResetAnimation called")
		// this.canvas.style.transitionDuration = "0s";
		// setTimeout(() => {
			this.canvas.style.transform = "translate(0px, 0px)";
		// }, 0);
		// this.canvas.style = "";
	}



	// animate(requestFrame = false) {
	// 	this.ctx.clearRect(0, 0, this.width, this.height);

	// 	for (let [idx, tri] of this.tris.entries()) {
			
	// 		if (tri.type === 0) {
	// 			let triPath = new Path2D();
	// 			triPath.moveTo(tri.x + this.animData.triHalfWidth, tri.y - this.animData.triHalfHeight); // tr
	// 			triPath.lineTo(tri.x - this.animData.triHalfWidth, tri.y - this.animData.triHalfHeight); // tl
	// 			triPath.lineTo(tri.x, tri.y + this.animData.triHalfHeight); // b
	// 			triPath.closePath();

	// 			// this.ctx.fillStyle = tri.color;
	// 			// this.ctx.fill(triPath);

	// 			this.tris[idx].x -= tri.vel;
	// 			if (tri.x < this.halfWidth) {
	// 				this.tris[idx].vel += this.animOpts.accel;
	// 				// console.log(tri.x);
	// 				// console.log(this.animData.triWidth);
	// 				// console.log(this.halfWidth);
	// 				// console.log((255 * ((tri.x - this.animData.triWidth) / this.halfWidth)))
	// 				// console.log("---");
	// 				this.tris[idx].color = this.getPixelColor(tri.x, tri.y, 255*((tri.x - 3 * this.animData.triWidth) / this.halfWidth));
	// 			} else {
	// 				this.tris[idx].color = this.getPixelColor(tri.x, tri.y);
	// 			}

	// 			this.tris[idx].path = triPath;
	// 		} else {
	// 			let triPath = new Path2D();
	// 			triPath.moveTo(tri.x, tri.y - this.animData.triHalfHeight); // t
	// 			triPath.lineTo(tri.x + this.animData.triHalfWidth, tri.y + this.animData.triHalfHeight); // br
	// 			triPath.lineTo(tri.x - this.animData.triHalfWidth, tri.y + this.animData.triHalfHeight); // bl
	// 			triPath.closePath();

	// 			// this.ctx.fillStyle = tri.color;
	// 			// this.ctx.fill(triPath);
				
	// 			this.tris[idx].x -= tri.vel;
	// 			if (tri.x < this.halfWidth) {
	// 				this.tris[idx].vel += this.animOpts.accel;
	// 				this.tris[idx].color = this.getPixelColor(tri.x, tri.y);
	// 			} else {
	// 				this.tris[idx].color = this.getPixelColor(tri.x, tri.y);
	// 			}

	// 			this.tris[idx].path = triPath;
	// 		}
	// 	}

		
	// 	if (requestFrame) {
	// 		window.requestAnimationFrame(() => {
	// 			this.draw(this).bind(this)
	// 		});
	// 	}
	// }

	// draw(parent) {
	// 	for (let [idx, tri] of this.tris.entries()) {
	// 		this.ctx.fillStyle = tri.color;
	// 		this.ctx.fill(tri.path);
	// 	}
	// }

	beginAnimation() {
		// this.newTriangle();
		// setTimeout(() => {
		// 	this.newTriangle(0, "up");

		// }, 800)
		this.canvas.style.transitionTimingFunction = this.animOpts.transitionFunction;
		this.canvas.style.transitionDuration = `${this.animOpts.transition}s`;
		// this.newTriangle(2, "dn");
		// console.log(this.tris)



		this.continueAnimation = true;
		this.animData.loop = setInterval(() => {
			// this.resetAnimation();
			// this.animate(true);
		}, this.animOpts.transition * 1000);
		
		const translate = this.animOpts.length (document.querySelector(".loader-wrap").clientWidth / 2)
		const docStyleSheets = document.styleSheets;
		docStyleSheets[0].insertRule(`@keyframes canvasAnimInt { 0% { transform: translate(0, 0); } 100% { transform: translate(${this.animOpts}, 0px) } }`);


		this.canvas.style.animation = `${this.animOpts.transition}s canvasAnim ease-in-out infinite`
	}

	stopAnimation() {
		console.log(`Frame count: ${this.frameCount}`);
		this.continueAnimation = false;
		clearInterval(this.animData.loop);
	}

	getPixelColor(x, y, alphaCorrection = 0) {
		console.log(alphaCorrection)
		// Adjust and correct given XY coords to be valid
		x = Math.round(x);
		y = Math.round(y);
		if (x < 0) {
			x = 0;
		}
		if (y < 0) {
			y = 0;
		}
		if (x > this.width - 1) {
			x = this.width - 1;
		}
		if (y > this.height - 1) {
			y = this.height - 1;
		}
		// Get pixel color from canvas
		let r = this.imageData.data[y * (this.imageData.width * 4) + x * 4];
		
		let g = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 1];
		let b = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 2];
		let a = this.imageData.data[y * (this.imageData.width * 4) + x * 4 + 3] - alphaCorrection;
		console.log("rgba(" + r + "," + g + "," + b + "," + a + ")")
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}
}

/** Process:
 * Create a gradient (use offscreen canvas to poll) pull gradient data from DataStore.gradData;
 * Create a triangle, poll color at x position
 * if x position is on the right, constant velocity
 * if x position is on the left, increasing velocity and fade
 * 
 * calculate on a fixed framerate and then use requestAnimationFrame to draw
 */

