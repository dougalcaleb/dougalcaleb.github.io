import Vertex from "./Vertex.js";
import Polygon from "./Polygon.js";

export default class LayerState {
	index = null;
	polygons = [];
	vertices = [];

	constructor(layer) {
		this.index = layer.index;
		this.polygons = Polygon.CopySet(layer.polygons);
		this.vertices = Vertex.CopySet(layer.vertices);
	}
}