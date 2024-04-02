import Utils from "../modules/utility.js";

export default class Vertex {
	x = 0;
	y = 0;
	posX = 0;
	posY = 0;
	neighbors = [];
	polygons = [];

	constructor(x = null, y = null, posX = null, posY = null) {
		this.x = ~~x;
		this.y = ~~y;
		this.posX = posX;
		this.posY = posY;
		this.id = Utils.UUID();
	}

	static CopySet(vertexSet) {
		const newSet = [];
		vertexSet.forEach((vertex) => {
			newSet.push(new Vertex(vertex.x, vertex.y));
		});
		return newSet;
	}

	GetNeighbors() {
		this.neighbors = [];
		this.polygons.forEach((polygon) => {
			this.neighbors.push(...polygon.GetNeighborsOfVertex(this));
		});
	}
}