import { Preview } from "./previewController.js";
import { Editor } from "./editorController.js";
import { Controls } from "./uiController.js";
import { LoadingIndicator } from "./loadingbar.js";
import { Store } from "./dataController.js";
import { GradientEditorPopup } from "./gradientEditorPopup.js";

/* 
TODO:

CURRENT:
- Popup refactor

Features:
- Vertex snap to color line
	- Edit mode: draw to erase or restore sections of detected edges
	- Adjustable threshold and proportional falloff
- Individual vertex editing
	- Proportional Falloff
	- Transparency mode?

- Delete color palette

Fixes:
- Fix color palette modal not applying on save
- Rewrite modal to be a popup
- Inconsistency with replace vertices function

*/


// Init

const DataStore = new Store();
const PreviewLayer = new Preview(DataStore);
const EditLayer = new Editor(DataStore);
const Control = new Controls(DataStore, PreviewLayer, EditLayer);
new GradientEditorPopup(DataStore);

DataStore.route("EditLayer", EditLayer);
DataStore.route("PreviewLayer", PreviewLayer);