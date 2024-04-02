import Store from "./controllers/store.js";
import UI from "./controllers/ui.js";

/* 
TODO:

- Outline weight instead of outline opacity
- Reseed randomness button
- Ensure everything works properly with multiple layers, types, etc
- Start on reimplementation of the editor functions

! Known bug:
- Create new layer after having already created an image layer, the new layer will be of type "linear" but the settings will be for an image layer

*/

// Init
Store.Init();
UI.Init();