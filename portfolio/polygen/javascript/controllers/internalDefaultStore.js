export default class Defaults {
	constructor() { }
	
	static UI = {
		CELL_SIZE: [5, 200],
		BRUSH_INDICATOR_COLOR: "rgba(0,0,0,0.5)",
		BRUSH_INDICATOR_WEIGHT: 3,
		BRUSH_DRAW_COLOR: "rgba(255,255,255,0.3)",
		SELECTED_VERTEX: { COLOR: "rgba(255,255,255,1)", SIZE: 5 },
		SELECTION_BRUSH_KEYBINDS: { "b": true, " ": true },
		UNDO_KEYBINDS: { "CTRL": "Control", "Z": "z" },
	};
	static INPUTS = {
		DEBOUNCE: 500,
		PREVIEW_REDRAW_DELAY: 100,
	};
	static LIMITS = {
		COLOR_STOPS: 15,
		UNDO_LIMIT: 10,
	};
}