"use strict";

const DEFAULTS = {
	reportInt: 5,
}

const values = {
	imageData: null,
	selectedVertices: null,
	radius: 0,
};

self.onmessage = (data) => {
	values.imageData = data.data.canvas;
	values.selectedVertices = structuredClone(data.data.selectedVerts);
	values.radius = data.data.radius;

	calculateNearestColorLine();
};

function calculateNearestColorLine() {
	/**
	 * Process:
	 * check in a circle around vertex
	 * choose vector on that line that has the greatest difference.
	 * Traverse that line and find where the boundary is. Calculate both individual pixel boundaries and trail of 3 for blurred edges
	 * 		- Play with early quitting or full traversal
	 * Move vertex to position
	 * Next vertex
	 */

	let checkedPixels = [];
	let diffPixels = [];
	let totalOperations = 0;
	let onOperation = 0;

	// let regularReport = setInterval(() => {
	// 	console.log("Sending back progress report...")
	// 	returnOutput({ type: "progress", data: onOperation / totalOperations, complete: false });
	// }, DEFAULTS.reportInt);

	for (let [vertexID, vertex] of Object.entries(values.selectedVertices)) {
		
		let max = {
			diff: 0,
			x: null,
			y: null
		};

		let radiusSqr = values.radius ** 2;

		totalOperations += values.radius * 4; 

		// top half: starts at right (0 radians) and goes to left
		for (let x = values.radius; x > -values.radius; x--) {
			let xOrigin = validateCoord(vertex.coord[0], vertex.coord[1])[0];
			let yOrigin = validateCoord(vertex.coord[0], vertex.coord[1])[1];

			let xCheck = xOrigin + x;
			let yCheck = yOrigin + Math.sqrt(Math.abs(radiusSqr - x ** 2));
			
			[xCheck, yCheck] = validateCoord(xCheck, yCheck);

			checkedPixels.push([xCheck, yCheck]);

			let diff = calcPixelDiff(
				{ x: xOrigin, y: yOrigin }, // base pixel
				{ x: xCheck, y: yCheck } // checked pixel
			);

			if (diff > max.diff) {
				max = {
					diff: diff,
					x: xCheck,
					y: yCheck
				};
			}

			onOperation++;
		}

		// bottom half: starts at left (pi radians) and goes to right
		for (let x = -values.radius; x < values.radius; x++) {
			let xOrigin = validateCoord(vertex.coord[0], vertex.coord[1])[0];
			let yOrigin = validateCoord(vertex.coord[0], vertex.coord[1])[1];

			let xCheck = xOrigin + x;
			let yCheck = yOrigin - Math.sqrt(Math.abs(radiusSqr - x ** 2));
			
			[xCheck, yCheck] = validateCoord(xCheck, yCheck);

			checkedPixels.push([xCheck, yCheck]);

			let diff = calcPixelDiff(
				{ x: xOrigin, y: yOrigin }, // base pixel
				{ x: xCheck, y: yCheck } // checked pixel
			);

			if (diff > max.diff) {
				max = {
					diff: diff,
					x: xCheck,
					y: yCheck
				};
			}

			onOperation++;
		}

		diffPixels.push([max.x, max.y]);
	}

	// clearInterval(regularReport);

	returnOutput({ type: "debug-drawPixels-radius", data: checkedPixels, complete: false });

	returnOutput({ type: "debug-drawPixels-diff", data: diffPixels, complete: false });

	returnOutput({ type: "progress", data: 100, complete: true});
}

// return the difference (0-1) of two pixels bases on the RGB averages
function calcPixelDiff(pix1, pix2) {
	let rgb1 = getPixelColor(pix1.x, pix1.y);
	let rgb2 = getPixelColor(pix2.x, pix2.y);

	let avg1 = (rgb1.r + rgb1.g + rgb1.b + rgb1.a) / 4;
	let avg2 = (rgb2.r + rgb2.g + rgb2.b + rgb1.a) / 4;

	return Math.abs(avg2 - avg1);
}

// Returns an RGBA color of the color at a given pixel on the canvas
function getPixelColor(x, y) {
	// Get pixel color from canvas and apply brightness alterations to RGB components
	let r = values.imageData.data[y * (values.imageData.width * 4) + x * 4];
	let g = values.imageData.data[y * (values.imageData.width * 4) + x * 4 + 1];
	let b = values.imageData.data[y * (values.imageData.width * 4) + x * 4 + 2];
	let a = values.imageData.data[y * (values.imageData.width * 4) + x * 4 + 3];
	return { r: r, g: g, b: b, a: a };
}

// Adjust given XY coords to be valid if not
function validateCoord(x, y) {
	x = Math.round(x);
	y = Math.round(y);
	if (x < 0) {
		x = 0;
	}
	if (y < 0) {
		y = 0;
	}
	if (x > values.imageData.width - 1) {	
		x = values.imageData.width - 1;
	}
	if (y > values.imageData.height - 1) {
		y = values.imageData.height - 1;
	}

	return [x, y];
}

function returnOutput(out) {
	postMessage(out);
}