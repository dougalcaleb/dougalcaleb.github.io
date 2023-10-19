// Manages web workers that run in the background.
export class Thread {
	static supported = true;
	static openWorkers = [];

	constructor() {
		this.callback = null;
		this.worker = null;
		this.workerName = null;
	}

	open(workerName) {
		if (!Thread.supported || !window.Worker) {
			console.warn("WebWorkers aren't supported. Features disabled: color line finding.");
			Thread.supported = false;
			return;
		}

		if (Thread.openWorkers.includes(workerName)) throw new Error("Thread Error: attempting to open a worker that is already open");

		this.worker = new Worker(`./javascript/${workerName}.js`);
		this.workerName = workerName;

		Thread.openWorkers.push(workerName);

		this.worker.onmessage = (data) => {
			this.callback(data.data);
		};

		this.worker.onerror = (e) => {
			console.error(e);
		};
	}

	send(data) {
		this.worker.postMessage(data);
	}

	recieve(callback) {
		this.callback = callback;
	}

	close() {
		this.worker.terminate();
		Thread.openWorkers.splice(Thread.openWorkers.indexOf(this.workerName), 1);
	}
}
