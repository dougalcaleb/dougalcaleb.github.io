export default class EditorStore {
	constructor() { }
	
	brush = {
		FollowEvent: new AbortController(),
		indOn: true,
		size: 100,
		sizeStep: 5,
		minSize: 5,
		maxSize: 100,
		posX: null,
		posY: null,
		drawing: false,
		active: false,
		points: [],
	};

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