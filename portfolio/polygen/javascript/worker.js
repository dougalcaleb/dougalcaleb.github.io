"use strict";

const DEBUG = {
	drawCheckedRadius: false,
	drawTraversal: true,
	drawDiffPoint: true,
}

self.onmessage = (data) => {
	Image.imageData = data.data.canvas;
	Image.selectedVertices = structuredClone(data.data.selectedVerts);
	Image.height = data.data.canvas.height;
	Image.width = data.data.canvas.width;

	calculateNearestColorLine();
	/** Try a couple different kernels:
	 * [0, -1, 0, -1, 4, -1, 0, -1, 0]
	 * [-1, -1, -1, -1, 8, -1, -1, -1, -1]
	 * 
	 * sobel:
	 * x: [1, 0, -1, -2, 0, -2, 1, 0, 1]
	 * y: [1, 2, 1, 0, 0, 0, -1, -2, -1]
	 * 
	 * gaussian blur:
	 * 
	 */
};

function calculateNearestColorLine() {
	const grayscale = Image.convertToGrayscale(Image.imageData);
	Image.draw(grayscale);
	const smoothed = Image.smoothImage(grayscale);
	setTimeout(() => {
		Image.draw(smoothed);
	}, 2000);
}


class Image {
	// generals
	static imageData;
	static selectedVertices;
	static height;
	static width;

	// kernels
	static gaussian = [1, 2, 1, 2, 4, 2, 1, 2, 1];
	static gaussian_normalized = [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625];
	static sobel_x = [1, 0, -1, -2, 0, -2, 1, 0, 1];
	static sobel_y = [1, 2, 1, 0, 0, 0, -1, -2, -1];

	static edge_1 = [0, -1, 0, -1, 4, -1, 0, -1, 0];
	static edge_2 = [-1, -1, -1, -1, 8, -1, -1, -1, -1];

	//* NOTE: 'index' always points to the first of the 4 pixel values (red value)

	constructor() { return null; }

	static draw(imageData) {
		ThreadManager.post({ type: "debug-drawFull", data: imageData });
	}

	// applies a kernel to a single pixel and returns the value. Currently only supports 3x3 kernels
	static applyKernel(index, imageData, kernel) {
		const indices = {
			tl: index - (Image.width * 4) - 4,
			t: index - (Image.width * 4),
			tr: index - (Image.width * 4) + 4,
			l: index - 4,
			c: index,
			r: index + 4,
			bl: index + (Image.width * 4) - 4,
			b: index + (Image.width * 4),
			br: index + (Image.width * 4) + 4
		};
		// index = Image.width * y * 4 + 4 * x
		const appliedPix = {
			tl: [imageData[indices.tl] * kernel[0], imageData[indices.tl + 1] * kernel[0], imageData[indices.tl + 2] * kernel[0], imageData[indices.tl + 3] * kernel[0]],
			t: [imageData[indices.t] * kernel[1], imageData[indices.t + 1] * kernel[1], imageData[indices.t + 2] * kernel[1], imageData[indices.t + 3] * kernel[1]],
			tr: [imageData[indices.tr] * kernel[2], imageData[indices.tr + 1] * kernel[2], imageData[indices.tr + 2] * kernel[2], imageData[indices.tr + 3] * kernel[2]],
			l: [imageData[indices.l] * kernel[3], imageData[indices.l + 1] * kernel[3], imageData[indices.l + 2] * kernel[3], imageData[indices.l + 3] * kernel[3]],
			c: [imageData[indices.c] * kernel[4], imageData[indices.c + 1] * kernel[4], imageData[indices.c + 2] * kernel[4], imageData[indices.c + 3] * kernel[4]],
			r: [imageData[indices.r] * kernel[5], imageData[indices.r + 1] * kernel[5], imageData[indices.r + 2] * kernel[5], imageData[indices.r + 3] * kernel[5]],
			bl: [imageData[indices.bl] * kernel[6], imageData[indices.bl + 1] * kernel[6], imageData[indices.bl + 2] * kernel[6], imageData[indices.bl + 3] * kernel[6]],
			b: [imageData[indices.b] * kernel[7], imageData[indices.b + 1] * kernel[7], imageData[indices.b + 2] * kernel[7], imageData[indices.b + 3] * kernel[7]],
			br: [imageData[indices.br] * kernel[8], imageData[indices.br + 1] * kernel[8], imageData[indices.br + 2] * kernel[8], imageData[indices.br + 3] * kernel[8]],
		};

		const adjustedPixel = [null, null, null, null];
		
		adjustedPixel[0] = appliedPix.tl[0]
			+ appliedPix.t[0]
			+ appliedPix.tr[0]
			+ appliedPix.l[0]
			+ appliedPix.c[0]
			+ appliedPix.r[0]
			+ appliedPix.bl[0]
			+ appliedPix.b[0]
			+ appliedPix.br[0];
		
		adjustedPixel[1] = appliedPix.tl[1]
			+ appliedPix.t[1]
			+ appliedPix.tr[1]
			+ appliedPix.l[1]
			+ appliedPix.c[1]
			+ appliedPix.r[1]
			+ appliedPix.bl[1]
			+ appliedPix.b[1]
			+ appliedPix.br[1];
		
		adjustedPixel[2] = appliedPix.tl[2]
			+ appliedPix.t[2]
			+ appliedPix.tr[2]
			+ appliedPix.l[2]
			+ appliedPix.c[2]
			+ appliedPix.r[2]
			+ appliedPix.bl[2]
			+ appliedPix.b[2]
			+ appliedPix.br[2];
		
		adjustedPixel[3] = appliedPix.tl[3]
			+ appliedPix.t[3]
			+ appliedPix.tr[3]
			+ appliedPix.l[3]
			+ appliedPix.c[3]
			+ appliedPix.r[3]
			+ appliedPix.bl[3]
			+ appliedPix.b[3]
			+ appliedPix.br[3];
		
		return adjustedPixel;
	}
	
	// Applies a minor Gaussian blur to the image to reduce noise
	static smoothImage(imageData) {
		let smoothedData = new Uint8ClampedArray(imageData);
		Image.Iterate((index) => {
			const smoothedPixel = Image.applyKernel(index, imageData, Image.gaussian_normalized);
			// console.log(smoothedPixel);
			smoothedData[index] = smoothedPixel[0];
			smoothedData[index + 1] = smoothedPixel[1];
			smoothedData[index + 2] = smoothedPixel[2];
			smoothedData[index + 3] = smoothedPixel[3];
		});
		return smoothedData;
	}

	// Iterates over the dimensions of the base image. Calls a callback, passing to it valid indices. A valid index is any pixel that is not an edge pixel.
	static Iterate(callback) {//! not quite working - incorrectly marks strips
		for (let a = Image.width * 4; a < Image.imageData.data.length - Image.width * 4; a += 4) {
			// skip left and right edges
			if (a % Image.width == 0) {
				// console.log("Skipped left side: index is " + a);
				continue;
			}
			if ((a + 4) % Image.width == 0) {
				// console.log("skipped right side. index is " + a);
				continue;
			}

			// return to the callback with a kernel-able pixel index
			callback(a);
		}
	}

	// convert canvas image data to grayscale. Takes canvas ImageData returns canvas ImageData.data
	static convertToGrayscale(canvasImageData) {
		let grayscaleData = new Uint8ClampedArray(canvasImageData.data);
		for (let i = 0; i < grayscaleData.length; i += 4) {
			const avg = 0.299 * grayscaleData[i] + 0.587 * grayscaleData[i + 1] + 0.114 * grayscaleData[i + 2];
			grayscaleData[i] = avg; // red
			grayscaleData[i + 1] = avg; // green
			grayscaleData[i + 2] = avg; // blue
		}
		return grayscaleData;
	}

	// return the difference (0-1) of two pixels bases on the RGB averages
	static calcPixelDiff(origin, checkAgainst) {
		let rgb1 = getPixelColor(origin.x, origin.y);
		let rgb2 = getPixelColor(checkAgainst.x, checkAgainst.y);

		let avg1 = (rgb1.r + rgb1.g + rgb1.b + rgb1.a) / 4;
		let avg2 = (rgb2.r + rgb2.g + rgb2.b + rgb1.a) / 4;

		return Math.abs(avg2 - avg1);
	}

	// Returns an RGBA color of the color at a given pixel on the canvas
	static getPixelColor(x, y) {
		// Get pixel color from canvas and apply brightness alterations to RGB components
		let r = Image.imageData.data[y * (Image.imageData.width * 4) + x * 4];
		let g = Image.imageData.data[y * (Image.imageData.width * 4) + x * 4 + 1];
		let b = Image.imageData.data[y * (Image.imageData.width * 4) + x * 4 + 2];
		let a = Image.imageData.data[y * (Image.imageData.width * 4) + x * 4 + 3];
		return { r: r, g: g, b: b, a: a };
	}

	// Adjust given XY coords to be valid if not
	static validateCoord(x, y) {
		x = Math.round(x);
		y = Math.round(y);
		if (x < 0) {
			x = 0;
		}
		if (y < 0) {
			y = 0;
		}
		if (x > Image.imageData.width - 1) {	
			x = Image.imageData.width - 1;
		}
		if (y > Image.imageData.height - 1) {
			y = Image.imageData.height - 1;
		}

		return [x, y];
	}
}

class ThreadManager {
	constructor() { return null; }

	static post(data) {
		postMessage(data);
	}
}