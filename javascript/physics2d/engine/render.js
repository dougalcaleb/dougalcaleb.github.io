export default class Renderer {
	canvas = null;
	ctx = null;
	width = 0;
	height = 0;

	#env = null;

	constructor(env, clock) {
		this.#env = env;
		this.canvas = env.canvas;
		this.width = env.sceneX;
		this.height = env.sceneY;
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.ctx = this.canvas.getContext("2d");

		this.render = this.render.bind(this);
		clock.subscribeAfter(this.render);
	}

	setCanvasSize(x, y) {
		this.width = x;
		this.height = y;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = this.#env.backgroundColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.#env._polygons.forEach(polygon => {
			if (!polygon.render) return;

			this.ctx.strokeStyle = this.#env.lineColor;
			this.ctx.lineWidth = this.#env.lineWidth;
			this.ctx.beginPath();
			const start = polygon.vertices.getAt(0).add(polygon.position);
			this.ctx.moveTo(start.x * this.#env.scale, this.canvas.height - (start.y * this.#env.scale));
			polygon.vertices.forEach((vertex, index) => {
				const pos = vertex.add(polygon.position);
				if (index > 0) {
					this.ctx.lineTo(pos.x * this.#env.scale, this.canvas.height - (pos.y * this.#env.scale));
				}
			});
			this.ctx.fillStyle = this.#env.fillColor;
			this.ctx.fill();
			this.ctx.closePath();
			this.ctx.stroke();
		});
	}
}