import Canvas from "./canvas.js";
import Store from "./store.js";
import Utils from "../modules/utility.js";

export default class Compiler {
	constructor() { }
	
	static CompileToPNG() {
		const canvas = new Canvas({ compiler: true});
		Store.Preview.layers.forEach((layer) => {
			if (layer.canvas.drawType === "gradient") {
				canvas._gradientToCanvas(Store.Preview.gradientData);
			} else if (layer.canvas.drawType === "image") {
				canvas._imgToCanvas(Store.Preview.imageData);
			} else {
				canvas._parentLayer = layer;
				canvas.DrawPolygons(false);
			}
		});
		return canvas;
	}

	static CompileToSVG() {
		const parts = [
			'<?xml version="1.0" standalone="no"?>',
			`<svg xmlns="http://www.w3.org/2000/svg" width="${Store.settings.x}" height="${Store.settings.y}">`
		];

		Store.Preview.layers.forEach((layer) => {
			if (layer.canvas.drawType === "polygons") {
				console.log("compiling layer polys");
				console.log(layer.polygons);
				layer.polygons.forEach((polygon) => {
					let current = '<path d="';
					polygon.vertices.forEach((vertex, idx) => {
						if (idx === 0) {
							current += `M ${vertex.x} ${vertex.y} `;
						} else {
							current += `L ${vertex.x} ${vertex.y} `;
						}
					});
					current += `z" fill="${Utils.rgbToHex(polygon.color)}" />`;
					parts.push(current);
				});
			}
		});
		parts.push("</svg>");
		return parts.join("");
	}
}