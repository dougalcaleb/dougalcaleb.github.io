"use strict"

export const DEFAULTS = {
	ui: {
		csize: [5, 200],
		brushIndicatorColor: "rgba(0,0,0,0.5)",
		brushIndicatorWeight: 3,
		brushDrawColor: "rgba(255,255,255,0.3)",
		selectedVertex: { color: "rgba(255,255,255,1)", size: 5 },
		selectionBrushKeybinds: { "b": true, " ": true },
	},
	inputs: {
		debounce: 500,
		previewRedrawDelay: 50,
	},
};