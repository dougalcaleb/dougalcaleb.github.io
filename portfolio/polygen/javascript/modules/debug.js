export default class DebugUtils {
	constructor() { }
	
	static drawPoints(ctx, vertices, textFn = null) {
		for (const vertex of vertices) {
			ctx.fillStyle = "red";
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
}