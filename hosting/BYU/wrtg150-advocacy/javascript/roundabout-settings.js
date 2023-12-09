import { Roundabout } from "./roundabout.min.js";
import { Store } from "./store.js";

const main = new Roundabout({
	id: "#body-main",
	parent: "#body",
	type: "gallery",
	swipe: false,
	infinite: false,
	// scrollwheel: true,
	navigation: false,
	buttons: false,
	pages: Store.pages,
});

Store.main = main;