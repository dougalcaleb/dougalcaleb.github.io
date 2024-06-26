// TODO:
/**
 * Proportional neighbor movement isn't implemented
 * Proportional neighbor movement isn't implemented
 */

// Bind to thread manager for cleanliness
self.onmessage = (data) => { ThreadManager.recieve(data); };

// Main function
function calculateNearestColorLine() {
	let tStart, tEnd, adjVerts, edge_result;
	let tStart, tEnd, adjVerts, edge_result;

	ThreadManager.post({
		_threadStatus: {
			running: true
		}
	});

	// If this has been run before (the user is selecting new vertices), there's no need to recompute the edge data
	if (Image.preComputedEdges) {
		console.log("FOUND PRECOMPUTED DATA")
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Using existing image data",
				begin: true,
				startTime: Date.now()
			}
		})

		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Move Vertices",
				begin: true,
				startTime: Date.now()
			}
		})

		tStart = Date.now();
		adjVerts = Image.moveVerticesToLines(Image.preComputedEdges);
		tEnd = Date.now();

		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Move Vertices"
			}
		});
	} else { // ==== FIRST - TIME IMAGE DATA GENERATION ====
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Grayscale Conversion",
				begin: true,
				startTime: Date.now()
			}
		})
	
		tStart = Date.now();
		const grayscale = Image.convertToGrayscale(Image.imageData);
		tEnd = Date.now();
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Grayscale Conversion"
			}
		})
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Image Smoothing",
				begin: true,
				startTime: Date.now()
			}
		})
	
		tStart = Date.now();
		const smoothed = Image.smoothImage(grayscale);
		tEnd = Date.now();
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Image Smoothing"
			}
		})
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Edge Detection",
				begin: true,
				startTime: Date.now()
			}
		})
	
		tStart = Date.now();
		edge_result = Image.edgeDetectSobel(smoothed);
		tEnd = Date.now();
		Image.draw(edge_result);
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Edge Detection"
			}
		})
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Move Vertices",
				begin: true,
				startTime: Date.now()
			}
		})
	
		tStart = Date.now();
		adjVerts = Image.moveVerticesToLines(edge_result);
		tEnd = Date.now();
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Move Vertices"
			}
		});
	}

	// FINAL
	ThreadManager.post({
		_threadStatus: {
			running: true
		}
	});

	// If this has been run before (the user is selecting new vertices), there's no need to recompute the edge data
	if (Image.preComputedEdges) {
		console.log("FOUND PRECOMPUTED DATA")
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Using existing image data",
				begin: true,
				startTime: Date.now()
			}
		})

		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Move Vertices",
				begin: true,
				startTime: Date.now()
			}
		})

		tStart = Date.now();
		adjVerts = Image.moveVerticesToLines(Image.preComputedEdges);
		tEnd = Date.now();

		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Move Vertices"
			}
		});
	} else { // ==== FIRST - TIME IMAGE DATA GENERATION ====
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Grayscale Conversion",
				begin: true,
				startTime: Date.now()
			}
		})
	
		tStart = Date.now();
		const grayscale = Image.convertToGrayscale(Image.imageData);
		tEnd = Date.now();
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Grayscale Conversion"
			}
		})
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Image Smoothing",
				begin: true,
				startTime: Date.now()
			}
		})
	
		tStart = Date.now();
		const smoothed = Image.smoothImage(grayscale);
		tEnd = Date.now();
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Image Smoothing"
			}
		})
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Edge Detection",
				begin: true,
				startTime: Date.now()
			}
		})
	
		tStart = Date.now();
		edge_result = Image.edgeDetectSobel(smoothed);
		tEnd = Date.now();
		Image.draw(edge_result);
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Edge Detection"
			}
		})
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: 0,
				new: true,
				operation: "Move Vertices",
				begin: true,
				startTime: Date.now()
			}
		})
	
		tStart = Date.now();
		adjVerts = Image.moveVerticesToLines(edge_result);
		tEnd = Date.now();
	
		ThreadManager.post({
			type: "progress",
			data: {
				elapsedTime: tEnd - tStart,
				new: false,
				operation: "Move Vertices"
			}
		});
	}

	// FINAL

	ThreadManager.post({
		type: "progress",
		data: {
			complete: true
		}
	})

	ThreadManager.post({
		_threadStatus: {
			running: false
		}
	});

	ThreadManager.post({
		type: "result",
		data: adjVerts,
		computed: edge_result || Image.preComputedEdges,
	});

	ThreadManager.post({
		_threadStatus: {
			running: false
		}
	});

	ThreadManager.post({
		type: "result",
		data: adjVerts,
		computed: edge_result || Image.preComputedEdges,
	});
}

// Contains methods and properties to apply effects to the image
class Image {
	// generals
	static imageData;
	static selectedVertices;
	static vertices;
	static vertices;
	static vertexRadius;
	static height;
	static width;

	static preComputedEdges;

	static preComputedEdges;

	// kernels
	static gaussian = [1, 2, 1, 2, 4, 2, 1, 2, 1];
	static gaussian_normalized = [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625];
	static gaussian_large_normalized = [0.00000067, 0.00002292, 0.00019117, 0.00038771, 0.00019117, 0.00002292, 0.00000067, 0.00002292, 0.00078633, 0.00655965, 0.01330373, 0.00655965, 0.00078633, 0.00002292, 0.00019117, 0.00655965, 0.05472157, 0.11098164, 0.05472157, 0.00655965, 0.00019117, 0.00038771, 0.01330373, 0.11098164, 0.22508352, 0.11098164, 0.01330373, 0.00038771, 0.00019117, 0.00655965, 0.05472157, 0.11098164, 0.05472157, 0.00655965, 0.00019117, 0.00002292, 0.00078633, 0.00655965, 0.01330373, 0.00655965, 0.00078633, 0.00002292, 0.00000067, 0.00002292, 0.00019117, 0.00038771, 0.00019117, 0.00002292, 0.00000067];

	static sobel_x = [1, 0, -1, 2, 0, -2, 1, 0, -1];
	static sobel_y = [1, 2, 1, 0, 0, 0, -1, -2, -1];

	static edge_1 = [0, -1, 0, -1, 4, -1, 0, -1, 0];
	static edge_1_normalized = [0, -0.25, 0, -0.25, 1, -0.25, 0, -0.25, 0];

	static edge_2 = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
	static edge_2_normalized = [-1/9, -1/9, -1/9, -1/9, 8/9, -1/9, -1/9, -1/9, -1/9];

	//* NOTE: 'index' always points to the first of the 4 pixel values (red value)

	constructor() { return null; }

	static draw(imageData) {
		console.log("-- Sending image to be drawn");
		ThreadManager.post({ type: "debug-drawFull", data: imageData });
	}

	// Router for the 2 different kernel application functions.
	// applyKernelDynamic is something like 4x or 5x slower but allows kernels of different sizes.
	// applyKernelFast is fast but only works for 3x3 kernels.
	static applyKernel(index, imageData, kernel) {
		if (Math.sqrt(kernel.length) % 1 !== 0) {
			console.warn("Invalid kernel size. Must be an odd square kernel.");
			return;
		}

		if (kernel.length == 9) {
			return Image.applyKernelFast(index, imageData, kernel);
		} else {
			return Image.applyKernelDynamic(index, imageData, kernel);
		}
	}

	// applies a kernel to a single pixel and returns the value. Currently only supports 3x3 kernels
	static applyKernelFast(index, imageData, kernel) {
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

	// applies a kernel to a single pixel and returns the value. Supports any size kernel. Significantly slower than the Fast mode.
	// applies a kernel to a single pixel and returns the value. Supports any size kernel. Significantly slower than the Fast mode.
	static applyKernelDynamic(index, imageData, kernel) {
		const kSize = Math.sqrt(kernel.length);
		const halfKSize = Math.floor(kSize / 2);
		const adjustedPixel = [null, null, null, null];
		let kIdx = 0;
		
		for (let ky = -halfKSize; ky <= halfKSize; ky++) {
			for (let kx = -halfKSize; kx <= halfKSize; kx++) {
				const imgIdx = index + (ky * Image.width * 4) + (kx * 4);
				const pixel = imageData.slice(imgIdx, imgIdx + 4);

				adjustedPixel[0] += pixel[0] * kernel[kIdx];
				adjustedPixel[1] += pixel[1] * kernel[kIdx];
				adjustedPixel[2] += pixel[2] * kernel[kIdx];
				adjustedPixel[3] += pixel[3] * kernel[kIdx];

				kIdx++;
			}
		}

		return adjustedPixel;
	}

	// given an imagedata array, use the Sobel kernel to edge detect the image
	// given an imagedata array, use the Sobel kernel to edge detect the image
	static edgeDetectSobel(imageData, edgeThreshold = 100) {
		let gradientVectors = new Array(imageData.length);
		Image.KernelSafeIterate((index) => {
			// [magnitude, direction]
			const gradientVector = [null, null];
			let sx = Image.applyKernel(index, imageData, Image.sobel_x);
			let sy = Image.applyKernel(index, imageData, Image.sobel_y);

			gradientVector[0] = Math.sqrt(sx[0] ** 2 + sy[0] ** 2);
			// gradientVector[1] = Math.atan2(sy[0], sx[0]);

			if (gradientVector[0] >= edgeThreshold) {
				gradientVectors[index] = 255;
				gradientVectors[index + 1] = 255;
				gradientVectors[index + 2] = 255;
				gradientVectors[index + 3] = 255;
			} else {
				gradientVectors[index] = 0;
				gradientVectors[index + 1] = 0;
				gradientVectors[index + 2] = 0;
				gradientVectors[index + 3] = 255;
			}
		}, Image.sobel_x);
		return gradientVectors;
	}
	
	// Applies a minor Gaussian blur to the image to reduce noise
	static smoothImage(imageData, useLargeGaussian = true, largeGaussianDec = 4) {
		let smoothedData = new Uint8ClampedArray(imageData);
		let adjGauss;

		// trim the gaussian kernel's decimals to (hopefully) help with execution time
		// trim the gaussian kernel's decimals to (hopefully) help with execution time
		if (useLargeGaussian) {
			adjGauss = Image.gaussian_large_normalized.map((val) => {
				return Number(val.toFixed(largeGaussianDec));
			});
		}

		// apply the smoothing kernel to the image
		// apply the smoothing kernel to the image
		const kernel = useLargeGaussian ? adjGauss : Image.gaussian_normalized;
		Image.KernelSafeIterate((index) => {
			let smoothedPixel = Image.applyKernel(index, imageData, kernel);
			smoothedData[index] = smoothedPixel[0];
			smoothedData[index + 1] = smoothedPixel[1];
			smoothedData[index + 2] = smoothedPixel[2];
			smoothedData[index + 3] = smoothedPixel[3];
		}, kernel);
		return smoothedData;
	}

	// given an image data array, use a simple kernel formula to detect edges (not in use)
	// given an image data array, use a simple kernel formula to detect edges (not in use)
	static edgeDetectSimple(imageData) {
		const kernel = Image.edge_2_normalized;
		let edgeData = new Uint8ClampedArray(imageData);
		Image.KernelSafeIterate((index) => {
			let edgePixel = Image.applyKernel(index, imageData, kernel);
			edgeData[index] = edgePixel[0] > 5 ? edgePixel[0] * 100 : 0;
			edgeData[index + 1] = edgePixel[1] > 5 ? edgePixel[0] * 100 : 0;
			edgeData[index + 2] = edgePixel[2] > 5 ? edgePixel[0] * 100 : 0;
			edgeData[index + 3] = 255;
		}, kernel);
		return edgeData;
	}

	// Iterates over the dimensions of the base image. Calls a callback, passing to it valid indices. A valid index is any pixel that is not an edge pixel.
	static KernelSafeIterate(callback, kernel) {
		const halfKSize = Math.floor(Math.sqrt(kernel.length) / 2);
		for (let a = (Image.width * 4 * halfKSize); a < (Image.width * (Image.height - (1 * halfKSize))) * 4; a += 4) { // skip top & bottom
			if (a % (Image.width * 4) == 0 || (a + 4) % (Image.width * 4) == 0) { // skip sides
				continue;
			}
			callback(a);
		}
	}

	// convert canvas image data to grayscale. Takes canvas ImageData returns canvas ImageData.data
	static convertToGrayscale(canvasImageData) {
		let grayscaleData = new Uint8ClampedArray(canvasImageData.data);
		for (let i = 0; i < grayscaleData.length; i += 4) {
			// proprietary grayscale algorithm, enjoy the magic numbers
			const avg = 0.299 * grayscaleData[i] + 0.587 * grayscaleData[i + 1] + 0.114 * grayscaleData[i + 2]; 
			// proprietary grayscale algorithm, enjoy the magic numbers
			const avg = 0.299 * grayscaleData[i] + 0.587 * grayscaleData[i + 1] + 0.114 * grayscaleData[i + 2]; 
			grayscaleData[i] = avg; // red
			grayscaleData[i + 1] = avg; // green
			grayscaleData[i + 2] = avg; // blue
		}
		return grayscaleData;
	}

	// given an array of vertices to alter and the binary edge-detected image data, moves vertices to the closest pixel identified as an edge
	// given an array of vertices to alter and the binary edge-detected image data, moves vertices to the closest pixel identified as an edge
	static moveVerticesToLines(imageData) {
		let adjustedVertices = {};

		// Iterates over each vertex. Checks a square around the vertex (2*radius) and finds increasingly closer positive pixels
		for (const [id, vertex] of Object.entries(Image.selectedVertices)) {
			let closestPixel = null;
			let closestDistance = Infinity;
			let origin = [~~vertex.coord[0], ~~vertex.coord[1]];

			for (let x = origin[0] - Image.vertexRadius; x < origin[0] + Image.vertexRadius; x++) {
				for (let y = origin[1] - Image.vertexRadius; y < origin[1] + Image.vertexRadius; y++) {
					const distance = Math.sqrt((origin[0] - x) ** 2 + (origin[1] - y) ** 2);

					if (distance < closestDistance) {
						const index = (y * Image.width + x) * 4;
						const r = imageData[index];
						const g = imageData[index + 1];
						const b = imageData[index + 2];
						const a = imageData[index + 3];
						if (r === 255 && g === 255 && b === 255 && a === 255) {
							closestPixel = { x, y };
							closestDistance = distance;
						}
					}
				}
			}

			if (closestPixel) {
				// console.log(`discovered: ${closestPixel.x},${closestPixel.y} is closest to ${origin[0]},${origin[1]} after checking ${checkIts} pixels with bounds ${~~vertex.coord[0] - Image.vertexRadius},${~~vertex.coord[1] - Image.vertexRadius} :: ${~~vertex.coord[0] + Image.vertexRadius},${~~vertex.coord[1] + Image.vertexRadius}`);
				adjustedVertices[id] = {
					id: vertex.id,
					coord: [closestPixel.x, closestPixel.y]
				};
			}

			// * Not sure if any of this is useful or not, but still need to add logic to move neighbors proportionally
			// if (closestPixel) {
			// 	const dx = closestPixel.x - vertex.x;
			// 	const dy = closestPixel.y - vertex.y;
			// 	vertex.x = closestPixel.x;
			// 	vertex.y = closestPixel.y;

			// 	// move neighbors proportionally
			// 	for (const neighbor of vertex.neighbors) {
			// 		const ndx = neighbor.x - vertex.x;
			// 		const ndy = neighbor.y - vertex.y;
			// 		const distance = Math.sqrt(ndx * ndx + ndy * ndy);
			// 		neighbor.x = vertex.x + ndx / dx * distance;
			// 		neighbor.y = vertex.y + ndy / dy * distance;
			// 	}
			// }
		}

		return adjustedVertices;
		let adjustedVertices = {};

		// Iterates over each vertex. Checks a square around the vertex (2*radius) and finds increasingly closer positive pixels
		for (const [id, vertex] of Object.entries(Image.selectedVertices)) {
			let closestPixel = null;
			let closestDistance = Infinity;
			let origin = [~~vertex.coord[0], ~~vertex.coord[1]];

			for (let x = origin[0] - Image.vertexRadius; x < origin[0] + Image.vertexRadius; x++) {
				for (let y = origin[1] - Image.vertexRadius; y < origin[1] + Image.vertexRadius; y++) {
					const distance = Math.sqrt((origin[0] - x) ** 2 + (origin[1] - y) ** 2);

					if (distance < closestDistance) {
						const index = (y * Image.width + x) * 4;
						const r = imageData[index];
						const g = imageData[index + 1];
						const b = imageData[index + 2];
						const a = imageData[index + 3];
						if (r === 255 && g === 255 && b === 255 && a === 255) {
							closestPixel = { x, y };
							closestDistance = distance;
						}
					}
				}
			}

			if (closestPixel) {
				// console.log(`discovered: ${closestPixel.x},${closestPixel.y} is closest to ${origin[0]},${origin[1]} after checking ${checkIts} pixels with bounds ${~~vertex.coord[0] - Image.vertexRadius},${~~vertex.coord[1] - Image.vertexRadius} :: ${~~vertex.coord[0] + Image.vertexRadius},${~~vertex.coord[1] + Image.vertexRadius}`);
				adjustedVertices[id] = {
					id: vertex.id,
					coord: [closestPixel.x, closestPixel.y]
				};
			}

			// * Not sure if any of this is useful or not, but still need to add logic to move neighbors proportionally
			// if (closestPixel) {
			// 	const dx = closestPixel.x - vertex.x;
			// 	const dy = closestPixel.y - vertex.y;
			// 	vertex.x = closestPixel.x;
			// 	vertex.y = closestPixel.y;

			// 	// move neighbors proportionally
			// 	for (const neighbor of vertex.neighbors) {
			// 		const ndx = neighbor.x - vertex.x;
			// 		const ndy = neighbor.y - vertex.y;
			// 		const distance = Math.sqrt(ndx * ndx + ndy * ndy);
			// 		neighbor.x = vertex.x + ndx / dx * distance;
			// 		neighbor.y = vertex.y + ndy / dy * distance;
			// 	}
			// }
		}

		return adjustedVertices;
	}
}

// Handles the worker --> main script connection
class ThreadManager {
	constructor() { }

	static post(data) {
		postMessage(data);
	}

	static recieve(data) {
		Image.imageData = data.data.canvas;
		Image.selectedVertices = data.data.selectedVerts;
		Image.vertices = data.data.allVerts;
		Image.selectedVertices = data.data.selectedVerts;
		Image.vertices = data.data.allVerts;
		Image.height = data.data.canvas.height;
		Image.width = data.data.canvas.width;
		Image.vertexRadius = ~~data.data.radius;
		Image.preComputedEdges = data.data.preCompute;

		console.log("WORK RECIEVED");
		console.log(data.data.preCompute);
		Image.vertexRadius = ~~data.data.radius;
		Image.preComputedEdges = data.data.preCompute;

		console.log("WORK RECIEVED");
		console.log(data.data.preCompute);

		calculateNearestColorLine();
	}
}