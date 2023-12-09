import { Store } from "./store.js";
import { RoundaboutScripter } from "./roundabout-scripting.min.js";

const RS = new RoundaboutScripter();

function nodeToHTMLString(DOMnode) {
	let parent = document.createElement("div");
	parent.appendChild(DOMnode);
	return parent.innerHTML.trim();
}

function page0setup() {
	let root = document.querySelector("#page-0").content.children[0].cloneNode(true);
	Store.pages.push({ html: nodeToHTMLString(root) });
}

function page1setup() {
	let root = document.querySelector("#page-1").content.children[0].cloneNode(true);
	Store.pages.push({ html: nodeToHTMLString(root) });
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
		element.style.animation = "0.3s animateIn";
		element.style.animationDelay = `${idx * 0.1}s`;
		element.style.animationFillMode = `forwards`;
	});
}

page0setup();
page1setup();


let throttle = 1000;
let lastScroll;

let active = 0;
let incoming = null;

document.body.addEventListener("wheel", (event) => {
	if (event.deltaY < 0) {
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
		}, 800);
	} else if (event.deltaY > 0) {
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
		}, 800);
	}
})