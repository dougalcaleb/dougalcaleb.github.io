// Manages web workers that run in the background.
export class Thread {
	static supported = true;
	static openWorkers = {};

	constructor(threadName = null) {
		this.callback = null;
		this.worker = null;
		this.workerName = null;

		if (threadName != null) {
			open(threadName);
		}
	}

	open(workerName) {
		if (!Thread.supported || !window.Worker) {
			console.warn("WebWorkers aren't supported. Some features may not function properly.");
			Thread.supported = false;
			return;
		}

		if (!!Thread.openWorkers[workerName]) throw new Error("Thread Error: attempting to open a worker that is already open");

		this.worker = new Worker(`./javascript/${workerName}.js`);
		this.workerName = workerName;

		Thread.openWorkers[workerName] = { worker: workerName, running: false };

		this.worker.onmessage = (data) => {
			if (!!data.data?._threadStatus) {
				Thread.openWorkers[this.workerName].running = data.data._threadStatus.running;
			} else {
				this.callback(data.data);
			}
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

	close(force = false) {
		if (force || !Thread.openWorkers[this.workerName].running) {
			this.worker.terminate();
			delete Thread.openWorkers[this.workerName];
		} else {
			throw new Error("Thread Error: attempted to close a worker that is running. To do this, use the 'force' parameter")
		}
	}
}
