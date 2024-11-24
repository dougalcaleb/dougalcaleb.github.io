import EditorStore from "./editorStore.js";
import PreviewStore from "./previewStore.js";
import SettingsStore from "./settingsStore.js";
import Defaults from "./internalDefaultStore.js";
import Gradient from "../models/Gradient.js";
import Layer from "../models/Layer.js";
import ConfirmPopup from "../modules/confirmPopup.js";

export default class Store {
	constructor() { }

	static Init() {
		// Initialize data
		Store.GetHTMLTemplates();
		Store.GetSavedPalettes();

		// Create initial canvas
		Store.Preview.AddLayer(new Layer());
		Store.Preview.activePalette = Store.palettes[0];
		Store.Preview.layers[0].DrawReference();
		Store.Preview.layers[0].Fill();
		Store.Preview.layers[0].InitialPolygons();
		
		// Create overlay layer
		Store.Preview.overlayLayer = new Layer();
		Store.Preview.overlayLayer.name = "OVERLAY";
		Store.Preview.overlayLayer.index = 100;
		Store.globalLayerCount--;

		Store.Preview.pixelRatio = Store.settings.x / Store.Preview.layers[0].canvas._canvasElement.offsetWidth;

		Store.SavePalettes();
	}

	static defaultPalettes = [
		new Gradient([
			{ color: "#f3e1af", stop: 0 },
			{ color: "#f09c3d", stop: 0.16 },
			{ color: "#f0693d", stop: 0.33},
			{ color: "#f03d72", stop: 0.5 },
			{ color: "#9f3df0", stop: 0.66 },
			{ color: "#3d81f0", stop: 0.83 },
			{ color: "#037ac4", stop: 1 }
		]),
		new Gradient([
			{ color: "#e7e98b", stop: 0 },
			{ color: "#8be9d2", stop: 0.25 },
			{ color: "#73b5dd", stop: 0.5 },
			{ color: "#1074b1", stop: 0.75 },
			{ color: "#014e7e", stop: 1 }
		]),
		new Gradient([
			{ color: "#787878", stop: 0 },
			{ color: "#454545", stop: 0.25 },
			{ color: "#a5e8a1", stop: 0.5 },
			{ color: "#454545", stop: 0.75 },
			{ color: "#787878", stop: 1 }
		]),
		new Gradient([
			{ color: "#0b132b", stop: 0 },
			{ color: "#1c2541", stop: 0.25 },
			{ color: "#5bc0be", stop: 0.5 },
			{ color: "#6fffe9", stop: 0.75 },
			{ color: "#3a506b", stop: 1 }
		]),
		new Gradient([
			{ color: "#231942", stop: 0 },
			{ color: "#5e548e", stop: 0.25 },
			{ color: "#9f86c0", stop: 0.5 },
			{ color: "#be95c4", stop: 0.75 },
			{ color: "#e0b1cb", stop: 1 }
		]),
		new Gradient([
			{ color: "#7a93ac", stop: 0 },
			{ color: "#f1c7c7", stop: 0.25 },
			{ color: "#ae5656", stop: 0.5 },
			{ color: "#7c2f2f", stop: 0.75 },
			{ color: "#671b1b", stop: 1 }
        ])
	];
	static palettes = [];
	static htmlTemplates = {};
	static activePage = 0;
	static globalLayerCount = 0;

	static #savePalettesAs = "polygen-saved-palettes";

	static Editor = new EditorStore();
	static Preview = new PreviewStore();
	static Defaults = Defaults;
	static settings = new SettingsStore();

	static get idealAngle() {
		return Math.atan(Store.settings.y / Store.settings.x);
	}

	static GetSavedPalettes() {
		const palettes = JSON.parse(localStorage.getItem(Store.#savePalettesAs)) || Store.defaultPalettes;
		palettes.forEach(p => {
			if (p instanceof Gradient) {
				Store.palettes.push(p);
				return;
			}
			Store.palettes.push(new Gradient(p));
		});
	}

	static SavePalettes() {
		const palettes = Store.palettes.map(p => p.getSaveData());
		localStorage.setItem(Store.#savePalettesAs, JSON.stringify(palettes));
	}

	static GetHTMLTemplates() {
		const templates = document.querySelector("#_JS_TEMPLATES");
		Array.from(templates.content.children).forEach((t) => {
			Store.htmlTemplates[t.id] = t.content.children[0].outerHTML;
		});
	}

	static AddPalette(palette, pos = Store.palettes.length) {
		Store.palettes.splice(pos, 0, palette);
	}

	static UpdatePalette(palette, pos) {
		Store.palettes[pos] = palette;
	}

	static async GetImageFile() {
		if (Store.Preview.usingImgCount > 1) {
			const confirm = await new ConfirmPopup({
				body: "Because there is already an image in another layer, an image in this layer will not resize the canvas. Are you sure you want to continue?"
			}).value;
			if (confirm) {
				const img = await window.showOpenFilePicker({types: [{description: "Image", accept: {"image/*": [".png", ".jpeg", ".jpg"]}}]});
				const file = await img[0].getFile();
				Store.Preview.activeLayer.DrawImage(file);
			} else {
				return;
			}
		} else {
			const img = await window.showOpenFilePicker({types: [{description: "Image", accept: {"image/*": [".png", ".jpeg", ".jpg"]}}]});
			const file = await img[0].getFile();
			Store.Preview.activeLayer.DrawImage(file);
		}
	}
}