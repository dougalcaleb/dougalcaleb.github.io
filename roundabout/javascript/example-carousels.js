import { Roundabout } from "/javascript/roundabout.min.js";
import { RoundaboutScripter } from "/javascript/roundabout-scripting.min.js";

new Roundabout({
	parent: ".type-1",
	id: "#type-1",
	pages: [
		{
			backgroundImage: "./images/numbers/0.png",
		},
		{
			backgroundImage: "./images/numbers/1.png",
		},
		{
			backgroundImage: "./images/numbers/2.png",
		},
		{
			backgroundImage: "./images/numbers/3.png",
		},
		{
			backgroundImage: "./images/numbers/4.png",
		},
		{
			backgroundImage: "./images/numbers/5.png",
		},
	],
});

new Roundabout({
	parent: ".type-2",
	id: "#type-2",
	navigationBehavior: "direction",
   infinite: false,
   pagesToShow: 2,
   navigationTrim: false,
	pages: [
		{
			backgroundImage: "./images/numbers/0.png",
		},
		{
			backgroundImage: "./images/numbers/1.png",
		},
		{
			backgroundImage: "./images/numbers/2.png",
		},
		{
			backgroundImage: "./images/numbers/3.png",
		},
		{
			backgroundImage: "./images/numbers/4.png",
		},
		{
			backgroundImage: "./images/numbers/5.png",
		},
	],
});

new Roundabout({
	parent: ".type-3",
	id: "#type-3",
	navigation: false,
	pagesToShow: 3,
	pageSpacing: 10,
	interpolate: [
		{
			between: [
				[0, 80],
				[1, 100],
			],
			value: "height",
			unit: "$%",
      },
		{
			between: [
				[1, 100],
				[2, 80],
			],
			value: "height",
			unit: "$%",
		},
	],
	pages: [
		{
			backgroundImage: "./images/numbers/0.png",
		},
		{
			backgroundImage: "./images/numbers/1.png",
		},
		{
			backgroundImage: "./images/numbers/2.png",
		},
		{
			backgroundImage: "./images/numbers/3.png",
		},
		{
			backgroundImage: "./images/numbers/4.png",
		},
		{
			backgroundImage: "./images/numbers/5.png",
		},
	],
});

new Roundabout({
	parent: ".type-4",
	id: "#type-4",
	transition: 500,
	throttleTimeout: 800,
	type: "gallery",
	pages: [
		{
			backgroundImage: "./images/numbers/0.png",
		},
		{
			backgroundImage: "./images/numbers/1.png",
		},
		{
			backgroundImage: "./images/numbers/2.png",
		},
		{
			backgroundImage: "./images/numbers/3.png",
		},
		{
			backgroundImage: "./images/numbers/4.png",
		},
		{
			backgroundImage: "./images/numbers/5.png",
		},
	],
});

new Roundabout({
	parent: ".type-5",
	id: "#type-5",
	swipeSnap: false,
	buttons: false,
	navigation: false,
	infinite: false,
	pagesToShow: 4,
	pageSpacing: 25,
   swipeResistance: 0.97,
   keys: false,
	pages: [
		{
			backgroundImage: "./images/numbers/0.png",
		},
		{
			backgroundImage: "./images/numbers/1.png",
		},
		{
			backgroundImage: "./images/numbers/2.png",
		},
		{
			backgroundImage: "./images/numbers/3.png",
		},
		{
			backgroundImage: "./images/numbers/4.png",
		},
		{
			backgroundImage: "./images/numbers/5.png",
		},
	],
});

// Main carousel
const main = new Roundabout({
	parent: ".type-6",
	id: "#type-6-1",
	navigationBehavior: "direction",
	pages: [
		{
			backgroundImage: "./images/numbers/0.png",
		},
		{
			backgroundImage: "./images/numbers/1.png",
		},
		{
			backgroundImage: "./images/numbers/2.png",
		},
		{
			backgroundImage: "./images/numbers/3.png",
		},
		{
			backgroundImage: "./images/numbers/4.png",
		},
		{
			backgroundImage: "./images/numbers/5.png",
		},
	],
});

// Nav carousel
const nav = new Roundabout({
	parent: ".type-6",
	id: "#type-6-2",
	pagesToShow: 3,
	swipeSnap: false,
	pageSpacing: 25,
	buttons: false,
	navigation: false,
	infinite: false,
	swipeResistance: 1,
	throttleTimeout: 200,
	transition: 200,
	scrollwheel: true,
	pages: [
		{
			backgroundImage: "./images/numbers/0.png",
			html: `<div class="interactive-nav i-nav-0"></div>`,
		},
		{
			backgroundImage: "./images/numbers/1.png",
			html: `<div class="interactive-nav i-nav-1"></div>`,
		},
		{
			backgroundImage: "./images/numbers/2.png",
			html: `<div class="interactive-nav i-nav-2"></div>`,
		},
		{
			backgroundImage: "./images/numbers/3.png",
			html: `<div class="interactive-nav i-nav-3"></div>`,
		},
		{
			backgroundImage: "./images/numbers/4.png",
			html: `<div class="interactive-nav i-nav-4"></div>`,
		},
		{
			backgroundImage: "./images/numbers/5.png",
			html: `<div class="interactive-nav i-nav-5"></div>`,
		},
	],
});

// Initialize the scripting module
const RS = new RoundaboutScripter();

// Give each page a click handler
// We won't use the normal "click" listener, because that can cause drag interactions to be counted as clicks
document.querySelectorAll(".interactive-nav").forEach((navBtn) => {
	let mouseStart = 0;
	let mouseEnd = 0;
	// On mouse down, track the start position
	navBtn.addEventListener("mousedown", (event) => {
		mouseStart = event.clientX;
	});
	// On mouse up, track the end position. If the movement of the mouse was less than 5 pixels, we can assume it was a click
	// Otherwise, if the mouse moved more than 5 pixels, we assume it was a drag event, so we don't scroll
	navBtn.addEventListener("mouseup", (event) => {
		mouseEnd = event.clientX;
		if (Math.abs(mouseEnd - mouseStart) < 5) {
			let goToPage = parseInt(navBtn.classList[1].substring(navBtn.classList[1].length - 1));
			RS.scrollTo(main, goToPage);
		}
	});
});

new Roundabout({
	parent: ".type-7",
	id: "#type-7",
   pagesToShow: 3,
   scrollwheel: true,
   interpolate: [
      // Size
		{
			between: [
				[0, 80],
				[1, 100],
			],
			value: "height",
			unit: "$%",
      },
      {
         between: [
            [1, 100],
            [2, 80],
         ],
         value: "height",
         unit: "$%"
      },
      // Font size
      {
			between: [
				[0, 5],
				[1, 8],
			],
			value: "fontSize",
			unit: "$vw",
      },
      {
         between: [
            [1, 8],
            [2, 5],
         ],
         value: "fontSize",
         unit: "$vw"
      },
      // Opacity
      {
			between: [
				[0, 0.3],
				[1, 1],
			],
			value: "opacity",
			unit: "$",
      },
      {
         between: [
            [1, 1],
            [2, 0.3],
         ],
         value: "opacity",
         unit: "$"
      }
	],
	rotation: "right",
	pageSpacing: 10,
	navigation: false,
	swipeThreshold: 100,
	swipeSpeedThreshold: 800,
	transition: 200,
	throttleTimeout: 200,
	pages: [
		{
			// backgroundImage: "./images/numbers/0.png",
			html: `<div class="number"><span>0</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/1.png",
			html: `<div class="number"><span>1</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/2.png",
			html: `<div class="number"><span>2</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/3.png",
			html: `<div class="number"><span>3</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/4.png",
			html: `<div class="number"><span>4</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/5.png",
			html: `<div class="number"><span>5</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/5.png",
			html: `<div class="number"><span>6</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/5.png",
			html: `<div class="number"><span>7</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/5.png",
			html: `<div class="number"><span>8</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/5.png",
			html: `<div class="number"><span>9</span></div>`,
		},
		{
			// backgroundImage: "./images/numbers/5.png",
			html: `<div class="number"><span>10</span></div>`,
		},
	],
});
