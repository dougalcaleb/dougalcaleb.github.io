import Canvas from "./canvas.js";
import Store from "./store.js";
import Utils from "../modules/utility.js";

export default class Compiler {
	constructor() { }
	
	static CompileToPNG() {
		const canvas = new Canvas({ compiler: true});
		Store.Preview.layers.forEach((layer) => {
			canvas._parentLayer = layer;
			canvas.DrawPolygons(false);
		});
		return canvas;
	}

	static CompileToSVG() {
		const parts = [
			'<?xml version="1.0" standalone="no"?>',
			`<svg xmlns="http://www.w3.org/2000/svg" width="${Store.settings.x}" height="${Store.settings.y}">`
		];

		Store.Preview.layers.forEach((layer) => {
			layer.polygons.forEach((polygon) => {
				let current = '<path d="';
				polygon.vertices.forEach((vertex, idx) => {
					if (idx === 0) {
						current += `M ${vertex.x} ${vertex.y} `;
					} else {
						current += `L ${vertex.x} ${vertex.y} `;
					}
				});
				const fillColor = Utils.rgbToHex(polygon.color);
				current += `z" fill="${fillColor}" `;
				const lineColor = (layer.settings.lineOpacity === 0 ? fillColor : layer.settings.lineColor);
				current += `stroke="${lineColor}" `;
				const lineWidth = (layer.settings.lineOpacity === 0 ? 1 : ~~(layer.settings.lineOpacity * 2));
				current += `stroke-width="${lineWidth}" />`
				parts.push(current);
			});
		});
		parts.push("</svg>");
		return parts.join("");
	}
}