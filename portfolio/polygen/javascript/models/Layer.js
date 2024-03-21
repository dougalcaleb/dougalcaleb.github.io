export class Layer {
	constructor(name, layer, vertices) {
		this.name = name; //string
		this.layer = layer; // number
		this.vertices = vertices; // VertexData
	}

	static swap(Layer1, Layer2) {
		let temp = Layer1.layer;
		Layer1.layer = Layer2.layer;
		Layer2.layer = temp;
	}
}