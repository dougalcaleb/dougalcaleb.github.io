import Defaults from "./internalDefaultStore.js";
import Utils from "../modules/utility.js";

export default class PreviewStore {
	constructor() { }

	layers = [];
	
	xAngles = null;
	yAngles = null;

	redrawDelay = Defaults.INPUTS.PREVIEW_REDRAW_DELAY;
	allowRedraw = true;
	redrawTimeout = null;

	get baseCanvas() {
		return layers[0];
	}

	setAngles() {
		xAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.x / Store.settings.y));
		yAngles = Utils.degToRad(180) - (2 * Math.atan(Store.settings.y / Store.settings.x));
	}
}