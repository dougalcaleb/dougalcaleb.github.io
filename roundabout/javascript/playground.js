// import settings
import { settings } from "./settings.js";
import { roundabout, Roundabout } from "/javascript/roundabout.min.js";
// Constants
const input = document.querySelector(".code");
// Settings
const autocomplete = [
	["[", "]"],
	["(", ")"],
	["{", "}"],
	[`"`, `"`],
	["`", "`"],
	["'", "'"],
];
const tabPairs = [
	["(", ")"],
	["{", "}"],
	["[", "]"],
];
// [name, type, default]
const autoSettings = [
	["autoscroll", "boolean", "false"],
	["autoscrollDirection", "string", '"right"'],
	["autoscrollPauseOnHover", "boolean", "false"],
	["autoscrollSpeed", "integer", "5000"],
	["autoscrollStartAfter", "integer", "5000"],
   ["autoscrollTimeout", "integer", "15000"],
   ["breakpoints", "array", "[{width: 500, swipeThreshold: 50}]"],
   ["buttons", "boolean", "true"],
	["id", "string", '".myCarousel"'],
	["infinite", "boolean", "true"],
	["keys", "boolean", "true"],
   ["lazyLoad", "string", '"none"'],
   ["listenForResize", "boolean", "false"],
	["navigation", "boolean", "true"],
	["navigationBehavior", "string", '"nearest"'],
	["navigationTrim", "boolean", "true"],
	["nextHTML", "string", "&lt;SVG Right Arrow&gt;"],
	["pages", "array", "[]"],
	["pageSpacing", "integer", "0"],
	["pageSpacingMode", "string", '"fill"'],
	["pageSpacingUnits", "string", '"px"'],
	["pagesToShow", "integer", "1"],
	["parent", "string", '"body"'],
	["prevHTML", "string", "&lt;SVG Left Arrow&gt;"],
	["scrollBy", "integer", "1"],
	["showWrappedPage", "boolean", "false"],
	["swipe", "boolean", "true"],
	["swipeMultiplier", "number", "1"],
	["swipeResistance", "number", "0.95"],
	["swipeThreshold", "integer", "300"],
	["throttle", "boolean", "true"],
	["throttleButtons", "boolean", "true"],
	["throttleKeys", "boolean", "true"],
	["throttleNavigation", "boolean", "true"],
	["throttleSwipe", "boolean", "true"],
	["throttleTimeout", "integer", "300"],
	["transition", "integer", "300"],
	["transitionFunction", "string", '"ease"'],
   ["uiEnabled", "boolean", "true"],
   // ====
   ["html", "string", '""'],
   ["css", "string", '""'],
   ["backgroundImage", "string", '""']
   
	// ["type", "string", '"normal"'],
	// ["throttleMatchTransition", "boolean", "true"],
	// ["mobile", "object", "{swipeThreshold:50}"],
	// ["mobileBreakpoint", "integer", "700"],
];
const accepted = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_", "-"];
const tabSize = 4;
let updateSpeed = 1000;
let updateMethod = "onclose";
let clearConsole = true;
// Variables
let tabs = 1;
let updated = true;
let updateChecker;
let carousel;
let lastWasPair = false;
let autocompleting = true;
let typing = "";
let matcher;
let profiles = {};


input.addEventListener("keydown", (e) => {
   if (updateMethod == "delay") {
      clearTimeout(updateChecker);
      updateChecker = setTimeout(checkForUpdate, updateSpeed);
   }
	updated = false;

	if (autocompleting && accepted.includes(e.key.toString().toLowerCase())) {
		checkAutocomplete(e.key);
	}

	checkForChar(input, 0);
	if (e.key == "Tab") {
		e.preventDefault();
		for (let a = 0; a < tabSize; a++) {
			insertAtCursor(" ", false);
		}
		return;
	}
	if (e.key == "Enter") {
		setTimeout(() => {
			let pairCorrection = 0;
			tabPairs.forEach((char) => {
				if (checkForChar(0, char[0])) {
					pairCorrection = -1;
					// console.log(`Found ${char[0]}. Not tabbing.`);
				}
				if (checkForChar(0, char[1])) {
					pairCorrection = -1;
					// console.log(`Found ${char[1]}. Not tabbing.`);
				}
			});
			for (let a = 0; a < tabSize * tabs; a++) {
				insertAtCursor(" ", false);
			}
			let result = calcTabs(pairCorrection);
			// console.log(`New tab distance is ${result}`);
			lastWasPair = false;
		}, 0);
		// return;
		autocompleting = true;
		typing = "";
	}
	if (e.key == "Backspace") {
		if (lastWasPair) {
			e.preventDefault();
			lastWasPair = false;
			insertAtCursor("DELETE", false, -1);
			insertAtCursor("DELETE", true, 0);
		}
      if (autocompleting) {
         if (typing.length > 0) {
            typing = typing.substr(0, typing.length - 1);
         }
         checkAutocomplete("BACKSPACE");
		}
	}
	let wasPair = false;
	autocomplete.forEach((pair) => {
		if (e.key == pair[0] && !checkForChar(1)) {
			e.preventDefault();
			insertAtCursor(pair[0], false);
			insertAtCursor(pair[1], true);
			lastWasPair = true;
			wasPair = true;
		}
	});
	if (!wasPair) {
		lastWasPair = false;
	}
});

function insertAtCursor(val, isEnd, side) {
	//IE support
	if (document.selection) {
		input.focus();
		sel = document.selection.createRange();
		sel.text = val;
	}
	//MOZILLA and others
	else if (input.selectionStart || input.selectionStart == "0") {
		var startPos = input.selectionStart;
		var endPos = input.selectionEnd;
		if (val == "DELETE") {
			input.value = input.value.substring(0, startPos + side) + input.value.substring(endPos + side + 1, input.value.length);
		} else {
			input.value = input.value.substring(0, startPos) + val + input.value.substring(endPos, input.value.length);
		}
		if (isEnd && val != "DELETE") {
			input.selectionStart = startPos + val.length - 1;
			input.selectionEnd = startPos + val.length - 1;
		} else if (val != "DELETE") {
			input.selectionStart = startPos + val.length;
			input.selectionEnd = startPos + val.length;
		} else if (val == "DELETE" && !isEnd) {
			input.selectionStart = startPos - 1;
			input.selectionEnd = startPos - 1;
		} else if (val == "DELETE" && isEnd) {
			input.selectionStart = startPos;
			input.selectionEnd = startPos;
		}
	} else {
		input.value += val;
	}
}

function checkForChar(position, value) {
	var pos = input.selectionStart + position;
	let char = input.value.substring(pos + position - 2, pos + position - 1);
	if (!value && char.trim() != "") {
		return true;
	} else if (value == char) {
		return true;
	}
	return false;
}

function checkForUpdate() {
	if (!updated) {
		carousel = null;
		// let rawSettings = input.value.trim().substring(15, input.value.trim().length - 2);
		let settings;
		try {
			settings = JSON.parse(input.value.trim().substring(15, input.value.trim().length - 2));
			document.querySelector(".code-toggle").style.color = "";
		} catch (e) {
			document.querySelector(".code-toggle").style.color = "red";
      }
      document.querySelectorAll(".roundabout-wrapper").forEach((rCarousel) => {
         rCarousel.remove();
      });
      document.querySelectorAll(".roundabout-error-message").forEach((errorMsg) => {
         errorMsg.remove();
      });
		// if (document.querySelector(destroy)) {
		// 	document.querySelector(destroy).remove();
		// }
		// if (document.querySelector(".roundabout-error-message")) {
		// 	document.querySelector(".roundabout-error-message").remove();
		// }
      if (clearConsole) {
         console.clear();
      }
		roundabout.usedIds = [];
      roundabout.on = -1;
      console.log("Attempting to render new Roundabout carousel...");
      try {
         carousel = new Roundabout(settings);
         console.log("Render was successful.");
      } catch (e) {
         document.querySelector(".code-toggle").style.color = "#fff700";
         console.error(e);
      }
      try {
         document.querySelector(".rbt-v").innerHTML = `Roundabout version: ${carousel.VERSION}`;
      } catch (e) {
         console.log("Could not get version. There might be a settings error.")
      }
		updated = true;
	}
}

function calcTabs(correction = 0) {
	let chars = input.value.slice(0, input.selectionStart).split("");
	let pairs = 0;
	chars.forEach((codeChar) => {
		tabPairs.forEach((tabChar) => {
			if (codeChar == tabChar[0]) {
				pairs++;
			}
			if (codeChar == tabChar[1]) {
				pairs--;
			}
		});
	});
	tabs = pairs - 1 + correction;
	return tabs;
}

function checkAutocomplete(key) {
   if (key == "BACKSPACE") {
      typing = typing.substr(0, typing.length - 1);
   } else {
      typing += key;
   }
	matcher = new RegExp(`${typing}[a-z]*`, "ig");
	let matches = [];
   document.querySelector(".autocomplete").innerHTML = null;
   //! FIXXXXXXXXX
	settings.forEach((setting) => {
		if (setting.type.match(matcher) && setting[0].substr(0, 2) != "--") {
			matches.push(setting);
			if (document.querySelector(".auto-hint")) {
				document.querySelector(".auto-hint").style.opacity = "0";
			}
			let autoHint = document.createElement("div");
			autoHint.classList.add("auto-row");
			autoHint.innerHTML = `<div>${setting[0]}</div><div>${setting[1]}</div><div>${setting[2]}</div>`;
			document.querySelector(".autocomplete").appendChild(autoHint);
		}
   });
   if (typing.length == 0) {
	   document.querySelector(".autocomplete").innerHTML = null;
      let autoHintRestore = document.createElement("div");
      autoHintRestore.classList.add("auto-hint");
      autoHintRestore.innerText = "Start typing above. Any matching settings will appear here.";
      document.querySelector(".autocomplete").appendChild(autoHintRestore);
   }
}

updateChecker = setTimeout(checkForUpdate, updateSpeed);

let codeShown = true;
let settingsShown = false;
let infoShown = false;
document.querySelector(".code-toggle").addEventListener("click", () => {
   toggleCode();
   toggleSettings(false);
   toggleHelp(false);
});
document.querySelector(".settings").addEventListener("click", () => {
   toggleCode(false);
   toggleSettings();
   toggleHelp(false);
});
document.querySelector(".info").addEventListener("click", () => {
   toggleCode(false);
   toggleSettings(false);
   toggleHelp();
});

function toggleCode(forced) {
   if (forced != undefined) codeShown = !forced;
   if (codeShown) {
      document.querySelector(".code-editor").style.display = "none";
      if (updateMethod == "onclose") {
         checkForUpdate();
      }
		codeShown = false;
	} else {
		document.querySelector(".code-editor").style.display = "inline-block";
		codeShown = true;
	}
}
function toggleSettings(forced) {
   if (forced != undefined) settingsShown = !forced;
   if (settingsShown) {
		document.querySelector(".settings-modal").style.display = "none";
		settingsShown = false;
	} else {
		document.querySelector(".settings-modal").style.display = "inline-block";
		settingsShown = true;
	}
}

function toggleHelp(forced) {
   if (forced != undefined) infoShown = !forced;
   if (infoShown) {
		document.querySelector(".help-modal").style.display = "none";
		infoShown = false;
	} else {
		document.querySelector(".help-modal").style.display = "inline-block";
		infoShown = true;
	}
}

document.querySelector(".apply-close").addEventListener("click", () => {
   updateMethod = "onclose";
   clearTimeout(updateChecker);
   document.querySelector(".apply-close").classList.add("button-active");
   document.querySelector(".apply-delay").classList.remove("button-active");
});
document.querySelector(".apply-delay").addEventListener("click", () => {
   updateMethod = "delay";
   document.querySelector(".apply-delay").classList.add("button-active");
   document.querySelector(".apply-close").classList.remove("button-active");
});

document.querySelector(".clear-before").addEventListener("click", () => {
   clearConsole = true;
   document.querySelector(".clear-before").classList.add("button-active");
   document.querySelector(".dont-clear").classList.remove("button-active");
});
document.querySelector(".dont-clear").addEventListener("click", () => {
   clearConsole = false;
   document.querySelector(".dont-clear").classList.add("button-active");
   document.querySelector(".clear-before").classList.remove("button-active");
});

document.querySelector(".save-button").addEventListener("click", () => {
   if (!document.querySelector(".name-input").value) {
      return;
   }
   profiles[document.querySelector(".name-input").value] = input.value;
   localStorage.setItem("Roundabout_Playground_Saves", JSON.stringify(profiles));
   document.querySelector(".name-input").value = "";
   populateSaves();
});

document.querySelector(".load-button").addEventListener("click", () => {
   input.value = JSON.parse(localStorage.getItem("Roundabout_Playground_Saves"))[document.querySelector(".profile-list").value];
   toggleCode();
   toggleSettings(false);
   toggleHelp(false);
   updated = false;
   if (updateMethod == "delay") {
      updateChecker = setTimeout(checkForUpdate, updateSpeed);
   }
});
document.querySelector(".delete-button").addEventListener("click", () => {
   delete profiles[document.querySelector(".profile-list").value];
   localStorage.setItem("Roundabout_Playground_Saves", JSON.stringify(profiles));
   populateSaves();
});
document.querySelector(".delay-input").addEventListener("input", () => {
   updateSpeed = parseInt(document.querySelector(".delay-input").value);
});

function populateSaves() {
   document.querySelector(".profile-list").innerHTML = null;
   let allSaves = JSON.parse(localStorage.getItem("Roundabout_Playground_Saves"));
   let hasDefault = false;
   for (let key in allSaves) {
      if (key.toString().toLowerCase() == "default") {
         hasDefault = true;
      }
      profiles[key] = allSaves[key];
      let newOption = document.createElement("option");
      newOption.setAttribute("value", key.toString());
      newOption.innerText = key.toString();
      document.querySelector(".profile-list").appendChild(newOption);
   }
   if (!hasDefault) {
      profiles.default = `new Roundabout({
    
});`;
      profiles.hasPages = `new Roundabout({
    "pages": [
      {
         "backgroundImage": "./images/numbers/0.png"
      },
      {
         "backgroundImage": "./images/numbers/1.png"
      },
      {
         "backgroundImage": "./images/numbers/2.png"
      },
      {
         "backgroundImage": "./images/numbers/3.png"
      },
      {
         "backgroundImage": "./images/numbers/4.png"
      },
      {
         "backgroundImage": "./images/numbers/5.png"
      }
    ]
});`
   }
   localStorage.setItem("Roundabout_Playground_Saves", JSON.stringify(profiles));
}

populateSaves();