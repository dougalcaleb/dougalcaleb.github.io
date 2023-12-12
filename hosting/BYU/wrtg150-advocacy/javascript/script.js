import { Store } from "./store.js";
import { RoundaboutScripter } from "./roundabout-scripting.min.js";

const RS = new RoundaboutScripter();

// helper for the wonderful double transition we gotta do. but only once at least.
function nodeToHTMLString(DOMnode) {
	let parent = document.createElement("div");
	parent.appendChild(DOMnode);
	return parent.innerHTML.trim();
}

// convert html template to html string which eventually gets reinterpreted as html template. wonderful.
function pagesToRoundabout() {
	document.querySelectorAll("template").forEach((element, idx) => {
		let root = document.querySelector(`#page-${idx}`).content.children[0].cloneNode(true);
		let bgImg = root.querySelector("a.bgImg");
		let settings = {
			html: nodeToHTMLString(root)
		}
		if (!!bgImg) {
			settings.backgroundImage = bgImg.href;
		}
		Store.pages.push(settings);
	});
}

function animOut(id) {
	document.querySelectorAll(`.animate-${id}`).forEach((element, idx) => {
		element.style.animation = "0.5s animateOut";
		element.style.animationDelay = `${idx * 0.1}s`;
		element.style.animationFillMode = `forwards`;
	});
}

function animIn(id) {
	document.querySelectorAll(`.animate-${id}`).forEach((element, idx) => {
		element.style.animation = "0.1s animateIn";
		element.style.animationDelay = `0s`;
		element.style.animationFillMode = `forwards`;
	});
}

pagesToRoundabout();


let throttle = 1000;
let lastScroll;
let scrollTimeout = 500;

let active = 0;
let incoming = null;

// scroll advance
document.body.addEventListener("wheel", (event) => {
	if (event.deltaY < 0) {
		attemptScrollPrev();
	} else if (event.deltaY > 0) {
		attemptScrollNext();
	}
});

document.body.addEventListener("click", () => {
	attemptScrollNext();
});

function attemptScrollNext() {
	if (Date.now() - lastScroll < throttle) return

	if (active < Store.pages.length - 1) {
		lastScroll = Date.now();
		incoming = active + 1;
	
		animIn(incoming);
		animOut(active)
		
		active++;
	}

	setTimeout(() => {
		RS.scrollNext(Store.main);
	}, scrollTimeout);

	document.querySelector(".nav-option-active").classList.remove("nav-option-active");
	document.querySelector(`#nav-option-${active}`).classList.add("nav-option-active");
}

function attemptScrollPrev() {
	if (Date.now() - lastScroll < throttle) return

	if (active > 0) {
		lastScroll = Date.now();
		incoming = active - 1;
	
		animIn(incoming);
		animOut(active);

		active--;
	}

	setTimeout(() => {
		RS.scrollPrevious(Store.main);
	}, scrollTimeout);

	document.querySelector(".nav-option-active").classList.remove("nav-option-active");
	document.querySelector(`#nav-option-${active}`).classList.add("nav-option-active");
}

// click advance
document.querySelectorAll(".nav-option").forEach((element, idx) => {
	element.addEventListener("click", () => {

		if (Date.now() - lastScroll < throttle || idx == active) return
		lastScroll = Date.now();

		document.querySelector(".nav-option-active").classList.remove("nav-option-active");
		element.classList.add("nav-option-active");

		animOut(active);
		animIn(idx);

		active = idx;

		setTimeout(() => {
			RS.scrollTo(Store.main, active);
		}, scrollTimeout);
	});
});

document.querySelector("#learn-more").addEventListener("click", () => {
	document.querySelector("#learn-more-link").click();
});

// document.body.onload(() => {
// 	console.log("Images loaded");
// });

setTimeout(() => {
	document.querySelector("#page-1-img-right").addEventListener("load", () => {
		document.querySelector("#page-1-gradient-right").style.width = document.querySelector("#page-1-img-right").offsetWidth + "px";
	})
	document.querySelector("#page-2-img-right").addEventListener("load", () => {
		document.querySelector("#page-2-gradient-right").style.width = document.querySelector("#page-2-img-right").offsetWidth + "px";
	})
}, 10);

setTimeout(() => {
	// document.querySelector("#page-1-gradient-right").style.width = document.querySelector("#page-1-img-right").offsetWidth + "px";
	document.querySelector("#page-2-gradient-right").style.width = document.querySelector("#page-2-img-right").offsetWidth + "px";
}, 100);

window.onresize = () => {
	document.querySelector("#page-1-gradient-right").style.width = document.querySelector("#page-1-img-right").offsetWidth + "px";
	document.querySelector("#page-2-gradient-right").style.width = document.querySelector("#page-2-img-right").offsetWidth + "px";
}