"use strict"

import { Preview } from "./previewController.js";
import { Editor } from "./editorController.js";
import { Controls } from "./uiController.js";
import { LoadingIndicator } from "./loadingbar.js";
import { Modals } from "./modal.js";
import { Store } from "./dataController.js";

/*

TO DO:

Features:
- Brush tool:
   - Snap to color
   - Falloff for snap to color?
   - Drag individual vertices
      - Transparency mode?

- Add Delete Color Palette

WORKING ON NEXT:

- Finish split of classes into files
- Vertices move towards detected edges
- Rewrite modal to be a popup
- Additional controls for edge detection

- Fix new color palette not applying on save
*/


// Init

const DataStore = new Store();
const PreviewLayer = new Preview(DataStore);
const EditLayer = new Editor(DataStore);
const Modal = new Modals();
const Control = new Controls(DataStore, PreviewLayer, EditLayer);
const LoadingBar = new LoadingIndicator();

DataStore.route("EditLayer", EditLayer);
DataStore.route("PreviewLayer", PreviewLayer);
DataStore.route("Modal", Modal);