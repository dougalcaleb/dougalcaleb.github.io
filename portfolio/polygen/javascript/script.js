import Store from "./controllers/store.js";
import UI from "./controllers/ui.js";

/* 
TODO:

Features:
- Vertex snap to color line
	- Edit mode: draw to erase or restore sections of detected edges
	- Adjustable threshold and proportional falloff
- Individual vertex editing
	- Proportional Falloff
	- Transparency mode?

- Delete color palette

Fixes:
- Inconsistency with replace vertices function

*/

// Init
Store.Init();
UI.Init();