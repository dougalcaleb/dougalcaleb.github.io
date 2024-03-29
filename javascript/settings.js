import { roundabout } from "./roundabout.min.js";

export const settings = [
	{name: "autoscroll", category: "Behavioral", type: "boolean", default: roundabout.defaults.autoscroll},
	{name: "autoscrollDirection", category: "Behavioral", type: "string", default: roundabout.defaults.autoscrollDirection},
	{name: "autoscrollPauseOnHover", category: "Behavioral", type: "boolean", default: roundabout.defaults.autoscrollPauseOnHover},
	{name: "autoscrollSpeed", category: "Behavioral", type: "integer", default: roundabout.defaults.autoscrollSpeed},
	{name: "autoscrollStartAfter", category: "Behavioral", type: "integer", default: roundabout.defaults.autoscrollStartAfter},
	{name: "autoscrollTimeout", category: "Behavioral", type: "integer", default: roundabout.defaults.autoscrollTimeout},
	{name: "breakpoints", category: "Behavioral", type: "array", default: roundabout.defaults.breakpoints},
	{name: "buttons", category: "General", type: "boolean", default: roundabout.defaults.buttons},
	{name: "id", category: "General", type: "string", default: roundabout.defaults.id},
	{name: "infinite", category: "Behavioral", type: "boolean", default: roundabout.defaults.infinite},
	{name: "interpolate", category: "Behavioral", type: "array", default: roundabout.defaults.interpolate},
	{name: "keys", category: "Behavioral", type: "boolean", default: roundabout.defaults.keys},
	{name: "lazyLoad", category: "Behavioral", type: "string", default: roundabout.defaults.lazyLoad},
    {name: "listenForResize", category: "Behavioral", type: "boolean", default: roundabout.defaults.listenForResize},
    {name: "loadTimeout", category: "Behavioral", type: "integer", default: roundabout.defaults.loadTimeout},
	{name: "navigation", category: "General", type: "boolean", default: roundabout.defaults.navigation},
	{name: "navigationBehavior", category: "Behavioral", type: "string", default: roundabout.defaults.navigationBehavior},
	{name: "navigationTrim", category: "Behavioral", type: "boolean", default: roundabout.defaults.navigationTrim},
	{name: "nextHTML", category: "General", type: "string", default: "&lt;SVG Right Arrow&gt;"},
	{name: "pages", category: "General", type: "array", default: roundabout.defaults.pages},
	{name: "pageSpacing", category: "General", type: "integer", default: roundabout.defaults.pageSpacing},
	{name: "pageSpacingUnits", category: "General", type: "string", default: roundabout.defaults.pageSpacingUnits},
	{name: "pageSpacingMode", category: "General", type: "string", default: roundabout.defaults.pageSpacingMode},
	{name: "pagesToShow", category: "General", type: "integer", default: roundabout.defaults.pagesToShow},
    { name: "parent", category: "General", type: "string", default: roundabout.defaults.parent },
    {name: "precomputeInterpolation", category: "Behavioral", type: "number", default: roundabout.defaults.precomputeInterpolation},
	{name: "prevHTML", category: "General", type: "string", default: "&lt;SVG Left Arrow&gt;"},
	{name: "rotation", category: "Behavioral", type: "string", default: roundabout.defaults.rotation},
	{name: "scrollBy", category: "Behavioral", type: "integer", default: roundabout.defaults.scrollBy},
	{name: "scrollwheel", category: "Behavioral", type: "boolean", default: roundabout.defaults.scrollwheel},
	{name: "showWrappedPage", category: "Behavioral", type: "boolean", default: roundabout.defaults.showWrappedPage},
	{name: "swipe", category: "Behavioral", type: "boolean", default: roundabout.defaults.swipe},
	{name: "swipeMultiplier", category: "Behavioral", type: "number", default: roundabout.defaults.swipeMultiplier},
	{name: "swipeResistance", category: "Behavioral", type: "number", default: roundabout.defaults.swipeResistance},
	{name: "swipeSnap", category: "Behavioral", type: "boolean", default: roundabout.defaults.swipeSnap},
	{name: "swipeSpeedThreshold", category: "Behavioral", type: "integer", default: roundabout.defaults.swipeSpeedThreshold},
	{name: "swipeThreshold", category: "Behavioral", type: "integer", default: roundabout.defaults.swipeThreshold},
	{name: "template", category: "General", type: "string", defauly: roundabout.defaults.template},
	{name: "throttle", category: "Behavioral", type: "boolean", default: roundabout.defaults.throttle},
	{name: "throttleButtons", category: "Behavioral", type: "boolean", default: roundabout.defaults.throttleButtons},
	{name: "throttleKeys", category: "Behavioral", type: "boolean", default: roundabout.defaults.throttleKeys},
	{name: "throttleNavigation", category: "Behavioral", type: "boolean", default: roundabout.defaults.throttleNavigation},
	{name: "throttleSwipe", category: "Behavioral", type: "boolean", default: roundabout.defaults.throttleSwipe},
	{name: "throttleTimeout", category: "Behavioral", type: "boolean", default: roundabout.defaults.throttleTimeout},
	{name: "transition", category: "Behavioral", type: "integer", default: roundabout.defaults.transition},
	{name: "transitionFunction", category: "Behavioral", type: "string", default: roundabout.defaults.transitionFunction},
	{name: "type", category: "General", type: "string", default: roundabout.defaults.type},
	{name: "uiEnabled", category: "General", type: "boolean", default: roundabout.defaults.uiEnabled},
	// pages
	// {name: "html", category: null, type: "string", default: '""'},
	// {name: "css", category: null, type: "string", default: '""'},
	// {name: "backgroundImage", category: null, type: "string", default: '""'},
	// misc
	// {name: "ignoreErrors", category: "Misc", type: "boolean", default: roundabout.defaults.ignoreErrors},
];

export const scripting = [
   // additional extra values: todo-green knownIssue-orange
	// scripting
	{name: "addPage", category: "Scripting"},
	{name: "addPageElement", category: "Scripting"},
	{name: "afterDestroy", category: "Scripting"},
	{name: "beforeDestroy", category: "Scripting"},
	{name: "destroy", category: "Scripting"},
	{name: "lazyLoad", category: "Scripting"},
	{name: "onDragEnd", category: "Scripting"},
	{name: "onDragStart", category: "Scripting"},
	{name: "onScroll", category: "Scripting"},
	{name: "onScrollEnd", category: "Scripting"},
	{name: "onScrollNext", category: "Scripting"},
	{name: "onScrollNextEnd", category: "Scripting"},
	{name: "onScrollPrevious", category: "Scripting"},
	{name: "onScrollPreviousEnd", category: "Scripting"},
	{name: "removePage", category: "Scripting"},
	{name: "scroll", category: "Scripting"},
	{name: "scrollNext", category: "Scripting"},
	{name: "scrollPrevious", category: "Scripting"},
	{name: "scrollTo", category: "Scripting"},
	{name: "setValue", category: "Scripting"},
	{name: "throttledScroll", category: "Scripting"},
];
