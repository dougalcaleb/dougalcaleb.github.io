"use strict"

export class LoadingIndicator {
	constructor() {
		this.canvas = document.getElementById("loader");
		this.ctx = this.canvas.getContext("2d");

		this.height = 200;
		this.width = 1000;

		this.debuginit();
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