import Vertex from "./vertex.js";
import Store from "../store.js";
import Utils from "../modules/utility.js";

export default class Polygon {
	vertices = [];
	color = null;

	constructor(vertices) {
		this.vertices = vertices;
		if (this.vertices.length > 2) {
			this.vertices = Utils.createPolygon(vertices);
		}
	}
	
	AddVertex(vertex) {
		this.vertices.push(vertex);
		if (this.vertices.length > 2) {
			this.vertices = Utils.createPolygon(this.vertices);
		}
	}
	
	GetColor() {
		const center = this.GetCenter();
		this.color = Store.Preview.baseCanvas.GetPixelColor(center.x, center.y);
		return this.color;
	}

	GetCenter() {
		let x = 0;
		let y = 0;
		for (let i = 0; i < this.vertices.length; i++) {
			x += this.vertices[i].x;
			y += this.vertices[i].y;
		}
		return { x: x / this.vertices.length, y: y / this.vertices.length };
	}
}