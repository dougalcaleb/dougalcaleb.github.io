// Manages the web worker that runs the heavy image calculations in the background. Currently does not support more than one worker.
 export class Thread {

	static supported = true;
	static worker = null;
	static callback = null;

	constructor() {
		return null;
	}

	static open() {
		if (!Thread.supported || !window.Worker) {
			console.warn("WebWorkers aren't supported. Features disabled: color line finding.");
			Thread.supported = false;
			return;
		}

		Thread.worker = new Worker("./javascript/worker.js");

		Thread.worker.onmessage = (data) => {
			Thread.#__handleMessageRecieved(data.data);
		}

		Thread.worker.onerror = (e) => {
			console.warn("Worker Error:");
			console.warn(e);
		}
	}

	static send(data) {
		Thread.worker.postMessage(data);
	}

	static recieve(callback) {
		Thread.callback = callback;
	}

	static #__handleMessageRecieved(data) {
		Thread.callback(data);
	}
}