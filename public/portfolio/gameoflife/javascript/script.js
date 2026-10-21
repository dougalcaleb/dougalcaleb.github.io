class GameOfLife {
	constructor() {
		// additional config
		this.tileSize = 1000;
		this.trueColor = "white";
		this.falseColor = "black";

		// state
		this.running = false;
      this.stepInt = null;
      this.gen = 0;
		this.activeConfig = JSON.stringify({
			gx: this.gx,
			gy: this.gy,
			seed: this.seed,
			timestep: this.timestep,
		});

		// game config
		this.gx = 40;
      this.gy = 40;
		this.seed = Math.floor(Math.random() * 8999999999 + 1000000000);
		this.timestep = 100;

		// world
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.ctx = this.canvas.getContext("2d");
      this.tiles = {};
      this.gameBound = {
         x: document.querySelector(".game").clientWidth * 0.9,
         y: document.querySelector(".game").clientHeight * 0.9
      }

		// start
		document.querySelector(".game-seed").value = this.seed;
		this.initBoard();
	}

   initBoard() {
      if (this.gx > this.gy) {
         this.tileSize = this.gameBound.x / this.gx;
      } else {
         this.tileSize = this.gameBound.y / this.gy;
      }
      this.tileSize = Math.floor(this.tileSize);
		this.canvas.setAttribute("height", this.gy * this.tileSize);
      this.canvas.setAttribute("width", this.gx * this.tileSize);
      
      let next = 0;
      let s = this.seed.toString().split("");

		for (let a = 0; a < this.gx; a++) {
         for (let b = 0; b < this.gy; b++) {
            // this.tiles[`${a}-${b}`] = s[next] % 2 == 0;
            // next = (next + parseInt(s[next])) / 2;

            this.tiles[`${a}-${b}`] = Math.floor(Math.random() * 4) == 0;
			}
      }

      this.draw();
	}

	updateConfig(config) {
		this.activeConfig = JSON.stringify(config);
		this.gx = config.gx;
		this.gy = config.gy;
		this.seed = config.seed;
		this.timestep = config.timestep;

      this.initBoard();
	}

   step() {
      let next = {};
      this.gen++;
      document.querySelector(".game-generation").innerText = `Generation: ${this.gen}`;
      for (const tile in this.tiles) {
         let n = this.getLiveNeighbours(tile);

         // die by underpopulation
         if (n < 2) { 
            next[tile] = false;
         } else
         // live because environment is liveable
         if ((n == 2 || n == 3) && this.tiles[tile]) {
            next[tile] = true;
         } else
         // new life by reproduction
         if (n == 3 && !this.tiles[tile]) {
            next[tile] = true;
         } else
         // die by overpopulation
         if (n > 3) {
            next[tile] = false;
         } else {
            next[tile] = false;
         }
      }

      // debugger;

      this.tiles = {};
      Object.assign(this.tiles, next);
      this.draw();
   }

	draw() {
		for (const tile in this.tiles) {
			let coords = tile.split("-");
			coords[0] = parseInt(coords[0]);
         coords[1] = parseInt(coords[1]);
			this.ctx.beginPath();
         this.ctx.fillStyle = this.tiles[tile] ? this.trueColor : this.falseColor;
         this.ctx.rect(
				coords[0] * this.tileSize,
				coords[1] * this.tileSize,
				this.tileSize,
				this.tileSize
         );
         this.ctx.fill();
		}
   }
   
   getLiveNeighbours(tile) {
      let total = 0;
      let c = tile.split("-");
		c[0] = parseInt(c[0]);
      c[1] = parseInt(c[1]);

      if (this.tiles[`${(c[0] - 1)}-${(c[1] - 1)}`]) { // tl
         total++;

      }   
      if (this.tiles[`${(c[0])}-${(c[1] - 1)}`]) { // t
         total++;
      }       
      if (this.tiles[`${(c[0] + 1)}-${(c[1] - 1)}`]) { // tr
         total++;
      }   
      if (this.tiles[`${(c[0] + 1)}-${(c[1])}`]) { // r
         total++;
      }       
      if (this.tiles[`${(c[0] + 1)}-${(c[1] + 1)}`]) { // br
         total++;
      }   
      if (this.tiles[`${(c[0])}-${(c[1] + 1)}`]) { // b
         total++;
      }       
      if (this.tiles[`${(c[0] - 1)}-${(c[1] + 1)}`]) { // bl
         total++;
      }   
      if (this.tiles[`${(c[0] - 1)}-${(c[1])}`]) { // l
         total++;
      }       
      
      return total;
   }
}

let Game = new GameOfLife();

function init() {
   document.querySelector(".game-play-pause").addEventListener("click", () => {
      if (!Game.running) {
         document.querySelector(".game-play-pause").innerText = "Pause Simulation";
         run();
      } else {
         document.querySelector(".game-play-pause").innerText = "Run Simulation";
         pause();
      }
   });

   document.querySelector(".game-step").addEventListener("click", () => {
      Game.step();
   });

   document.querySelector(".game-clear").addEventListener("click", () => {
      for (const tile in Game.tiles) {
         Game.tiles[tile] = false;
      }
      Game.draw();
   });

   Game.canvas.addEventListener("click", (event) => {
      let rect = Game.canvas.getBoundingClientRect();
      let x = Math.floor((event.clientX - rect.left) / Game.tileSize);
      let y = Math.floor((event.clientY - rect.top) / Game.tileSize);
      Game.tiles[`${x}-${y}`] = !Game.tiles[`${x}-${y}`];
      Game.draw();
      // console.log(`(${x},${y})`);
   });

   Game.canvas.addEventListener("mousemove", (event) => {
      let rect = Game.canvas.getBoundingClientRect();
      let x = Math.floor((event.clientX - rect.left) / Game.tileSize);
      let y = Math.floor((event.clientY - rect.top) / Game.tileSize);
      document.querySelector(".game-coords").innerText = `Mouse: (${x},${y})`;
   });
}

function run() {
   Game.running = true;
   let newConfig = JSON.stringify({
      gx: parseInt(document.querySelector(".game-width").value),
      gy: parseInt(document.querySelector(".game-height").value),
      seed: parseInt(document.querySelector(".game-seed").value),
      timestep: parseInt(document.querySelector(".game-timestep").value),
   });
   if (newConfig != Game.activeConfig) {
      Game.updateConfig(JSON.parse(newConfig));
   }
   Game.stepInt = window.setInterval(() => {
      Game.step();
   }, Game.timestep);
}

function pause() {
   Game.running = false;
   window.clearInterval(Game.stepInt);
}

init();