let settings = [//45
   {
      category: "general",
      name: "autoGenCSS",
   },
   {
      category: "behavior",
      name: "autoscroll",
   },
   {
      category: "behavior",
      name: "autoscrollDirection",
   },
   {
      category: "behavior",
      name: "autoscrollPauseOnHover",
   },
   {
      category: "behavior",
      name: "autoscrollSpeed",
   },
   {
      category: "behavior",
      name: "autoscrollStartAfter",
   },
   {
      category: "behavior",
      name: "autoscrollTimeout",
   },
   {
      category: "pages",
      name: "backgroundImage",
   },
   {
      category: "pages",
      name: "css",
   },
   {
      category: "type-specific",
      name: "direction",
   },
   {
      category: "type-specific",
      name: "enlargeCenter",
   },
   {
      category: "pages",
      name: "html",
   },
   {
      category: "general",
      name: "id",
   },
   {
      category: "behavior",
      name: "infinite",
   },
   {
      category: "behavior",
      name: "keys",
   },
   {
      category: "general",
      name: "mobile",
   },
   {
      category: "general",
      name: "mobileBreakpoint",
   },
   {
      category: "general",
      name: "navigation",
   },
   {
      category: "behavior",
      name: "navigationBehavior",
   },
   {
      category: "type-specific",
      name: "offsetIn",
   },
   {
      category: "type-specific",
      name: "offsetOut",
   },
   {
      category: "type-specific",
      name: "offsetUnits",
   },
   {
      category: "general",
      name: "pages",
   },
   {
      category: "type-specific",
      name: "pageSpacing",
   },
   {
      category: "type-specific",
      name: "pageSpacingUnits",
   },
   {
      category: "type-specific",
      name: "pagesToShow",
   },
   {
      category: "general",
      name: "parent",
   },
   {
      category: "behavior",
      name: "showWrappedPage",
   },
   {
      category: "type-specific",
      name: "sizeFalloff",
   },
   {
      category: "type-specific",
      name: "spacingMode",
   },
   {
      category: "behavior",
      name: "swipe",
   },
   {
      category: "behavior",
      name: "swipeMultiplier",
   },
   {
      category: "behavior",
      name: "swipeResistance",
   },
   {
      category: "behavior",
      name: "swipeThreshold",
   },
   {
      category: "behavior",
      name: "transitionFunction",
   },
   {
      category: "behavior",
      name: "throttle",
   },
   {
      category: "behavior",
      name: "throttleButtons",
   },
   {
      category: "behavior",
      name: "throttleKeys",
   },
   {
      category: "behavior",
      name: "throttleMatchTransition",
   },
   {
      category: "behavior",
      name: "throttleNavigation",
   },
   {
      category: "behavior",
      name: "throttleSwipe",
   },
   {
      category: "behavior",
      name: "throttleTimeout",
   },
   {
      category: "behavior",
      name: "transition",
   },
   {
      category: "general",
      name: "type",
   },
   {
      category: "general",
      name: "visualPreset",
   },
];
let sortMethod = "category"; // or alphabetical






function generate() {
   settings.forEach((setting) => {
      
   });
}

// // ### General Settings:

// // Setting | Type | Description | Default
// // --------|------|-------------|--------
// autoGenCSS | Boolean | true
// id | String | ".myCarousel"
// mobile | Object | {swipeThreshold: 50}
// mobileBreakpoint | Integer | 700
// navigation | Boolean |true
// pages | Array |  []
// parent | String | "body"
// type | String | "normal"
// visualPreset | Integer |  0

// // ### Pages settings:

// // Setting | Type | Description
// // --------|------|------------
// backgroundImage | String | 
// css | String | 
// html | String |

// // ### Behavorial Settings:

// // Setting | Type | Description | Default
// // --------|------|-------------|--------
// autoScroll | Boolean | false
// autoScrollDirection | String | "right"
// autoScrollPauseOnHover | Boolean |  false
// autoScrollSpeed | Integer |  5000
// autoScrollStartAfter | Integer |  5000
// autoScrollTimeout | Integer | 15000
// infinite | Boolean |  true
// keys | Boolean | true
// navigationBehavior | String |  "nearest"
// swipe | Boolean |  true
// swipeMultiplier | Number |  1
// swipeResistance | Number |  0.95
// swipeThreshold | Integer |  300
// showWrappedPage | Boolean |  false
// transition | Integer | 300
// transitionFunction | String |  "ease"
// throttle | Boolean |true
// throttleButtons | Boolean | true
// throttleKeys | Boolean |  true
// throttleMatchTransition | Boolean | true
// throttleNavigation | Boolean |  true
// throttleSwipe | Boolean |  true
// throttleTimeout | Integer |  300


// // ### Type-Specific Settings:

// // Setting | Type | Description | Default | Applies to Type(s)
// // --------|------|-------------|---------|-------------------
// direction | String |"both" | "stack"
// enlargeCenter | Integer | 100 | "normal"
// offsetIn | Integer |  20 | "fade"
// offsetOut | Integer |  -20 | "fade"
// offsetUnits | String |  "px" | "fade"
// sizeFalloff | Integer |  0 | "normal"
// spacingMode | String | "fill" | "normal", "fade"
// pageSpacing | Integer |  0 | "normal", "fade"
// pageSpacingUnits | String |  "px" | "normal", "fade"
// pagesToShow | Integer | 1 | "normal", "fade"