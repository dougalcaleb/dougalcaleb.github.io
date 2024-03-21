export default class Vertex {
	x = 0;
	y = 0;
	neighbors = [];
	polygons = [];

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	GetNeighbors() {
		this.neighbors = [];
		this.polygons.forEach((polygon) => {
			this.neighbors.push(...polygon.GetNeighborsOfVertex(this));
		})
	}
}