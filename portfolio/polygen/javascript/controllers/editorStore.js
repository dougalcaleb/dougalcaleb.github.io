export default class EditorStore {
	constructor() { }

	selection = [];
	#propFalloff = 0;

	get propFalloff() { return this.#propFalloff; }
	set propFalloff(value) { this.#propFalloff = value; }

	activateBrush() {
		console.warn("activateBrush not implemented");
	}
	
	deactivateBrush() {
		console.warn("deactivateBrush not implemented");
	}

	clean() {
		console.warn("clean not implemented");
	}

	recalculateSelected() {
		console.warn("recalculateSelected not implemented");
	}

	colorSnap() {
		console.warn("colorSnap not implemented");
	}

	vertexDrag() {
		console.warn("vertexDrag not implemented");
	}
}