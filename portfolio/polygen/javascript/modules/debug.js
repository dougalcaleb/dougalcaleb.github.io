export default class DebugUtils {
	constructor() { }
	
	static drawPoints(ctx, vertices, clearBeforeDraw = true, color = "red", textFn = null) {
		// DebugUtils.drawPoints(this.canvas.ctx, this.vertices);
		if (clearBeforeDraw) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
		for (const vertex of vertices) {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(vertex.x, vertex.y, 5, 0, Math.PI * 2);
			ctx.fill();
			if (!!textFn) {
				ctx.fillStyle = "black";
				ctx.font = "20px Arial";
				ctx.fillText(textFn(vertex), vertex.x, vertex.y + 20);
			}
		}
	}

	static drawTextAt(ctx, x, y, text) {
		ctx.fillStyle = "black";
		ctx.font = "15px Arial";
		ctx.fillText(text, x, y);
	}
}