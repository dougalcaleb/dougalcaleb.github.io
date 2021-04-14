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
	{name: "navigation", category: "General", type: "boolean", default: roundabout.defaults.navigation},
	{name: "navigationBehavior", category: "Behavioral", type: "string", default: roundabout.defaults.navigationBehavior},
	{name: "navigationTrim", category: "Behavioral", type: "boolean", default: roundabout.defaults.navigationTrim},
	{name: "nextHTML", category: "General", type: "string", default: "&lt;SVG Right Arrow&gt;"},
	{name: "pages", category: "General", type: "array", default: roundabout.defaults.pages},
	{name: "pageSpacing", category: "General", type: "integer", default: roundabout.defaults.pageSpacing},
	{name: "pageSpacingMode", category: "General", type: "string", default: roundabout.defaults.pageSpacingMode},
	{name: "pageSpacingUnits", category: "General", type: "string", default: roundabout.defaults.pageSpacingUnits},
	{name: "pagesToShow", category: "General", type: "integer", default: roundabout.defaults.pagesToShow},
	{name: "parent", category: "General", type: "string", default: roundabout.defaults.parent},
	{name: "prevHTML", category: "General", type: "string", default: "&lt;SVG Left Arrow&gt;"},
	{name: "scrollBy", category: "Behavioral", type: "integer", default: roundabout.defaults.scrollBy},
	{name: "scrollwheel", category: "Behavioral", type: "boolean", default: roundabout.defaults.scrollwheel},
	{name: "showWrappedPage", category: "Behavioral", type: "boolean", default: roundabout.defaults.showWrappedPage},
	{name: "swipe", category: "Behavioral", type: "boolean", default: roundabout.defaults.swipe},
	{name: "swipeMultiplier", category: "Behavioral", type: "number", default: roundabout.defaults.swipeMultiplier},
	{name: "swipeResistance", category: "Behavioral", type: "number", default: roundabout.defaults.swipeResistance},
	{name: "swipeSnap", category: "Behavioral", type: "boolean", default: roundabout.defaults.swipeSnap, todo: true},
	{name: "swipeSpeedThreshold", category: "Behavioral", type: "integer", default: roundabout.defaults.swipeSpeedThreshold, todo: true},
	{name: "swipeThreshold", category: "Behavioral", type: "integer", default: roundabout.defaults.swipeThreshold},
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
	{name: "html", category: null, type: "string", default: '""'},
	{name: "css", category: null, type: "string", default: '""'},
	{name: "backgroundImage", category: null, type: "string", default: '""'},
	// misc
	// {name: "ignoreErrors", category: "Misc", type: "boolean", default: roundabout.defaults.ignoreErrors},
];

export const scripting = [
	// scripting
	{name: "addPage", category: "Scripting", todo: true},
	{name: "addPageElement", category: "Scripting", todo: true},
	{name: "afterDestroy", category: "Scripting", todo: true},
	{name: "beforeDestroy", category: "Scripting", todo: true},
	{name: "destroy", category: "Scripting", todo: true},
	{name: "lazyLoad", category: "Scripting", todo: true},
	{name: "onDragEnd", category: "Scripting", todo: true},
	{name: "onDragStart", category: "Scripting", todo: true},
	{name: "onScroll", category: "Scripting", todo: true},
	{name: "onScrollEnd", category: "Scripting", todo: true},
	{name: "onScrollNext", category: "Scripting", todo: true},
	{name: "onScrollNextEnd", category: "Scripting", todo: true},
	{name: "onScrollPrevious", category: "Scripting", todo: true},
	{name: "onScrollPreviousEnd", category: "Scripting", todo: true},
	{name: "removePage", category: "Scripting", todo: true},
	{name: "scroll", category: "Scripting", todo: true},
	{name: "scrollNext", category: "Scripting", todo: true},
	{name: "scrollPrevious", category: "Scripting", todo: true},
	{name: "scrollTo", category: "Scripting", todo: true},
	{name: "setValue", category: "Scripting", todo: true},
	{name: "throttledScroll", category: "Scripting", todo: true},
];
