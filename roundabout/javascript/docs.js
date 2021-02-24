let settings = [
   {name: "autoscroll", category: "Behavioral"},
   {name: "autoscrollDirection", category: "Behavioral"},
   {name: "autoscrollPauseOnHover", category: "Behavioral"},
   {name: "autoscrollSpeed", category: "Behavioral"},
   {name: "autoscrollStartAfter", category: "Behavioral"},
   {name: "autoscrollTimeout", category: "Behavioral"},
   {name: "breakpoints", category: "General"},
   {name: "id", category: "General"},
   {name: "infinite", category: "Behavioral"},
   {name: "keys", category: "Behavioral"},
   {name: "lazyLoad", category: "Behavioral"},
   {name: "navigation", category: "General"},
   {name: "navigationBehavior", category: "Behavioral"},
   {name: "navigationTrim", category: "Behavioral"},
   {name: "nextHTML", category: "General"},
   {name: "pageSpacing", category: "General"},
   {name: "pageSpacingMode", category: "General"},
   {name: "pageSpacingUnits", category: "General"},
   {name: "pages", category: "General"},
   {name: "pagesToShow", category: "General"},
   {name: "parent", category: "General"},
   {name: "prevHTML", category: "General"},
   {name: "scrollBy", category: "Behavioral"},
   {name: "showWrappedPage", category: "Behavioral"},
   {name: "swipe", category: "Behavioral"},
   {name: "swipeMultiplier", category: "Behavioral"},
   {name: "swipeResistance", category: "Behavioral"},
   {name: "swipeThreshold", category: "Behavioral"},
   {name: "throttle", category: "Behavioral"},
   {name: "throttleButtons", category: "Behavioral"},
   {name: "throttleKeys", category: "Behavioral"},
   {name: "throttleMatchTransition", category: "Behavioral"},
   {name: "throttleNavigation", category: "Behavioral"},
   {name: "throttleSwipe", category: "Behavioral"},
   {name: "throttleTimeout", category: "Behavioral"},
   {name: "transition", category: "Behavioral"},
   {name: "transitionFunction", category: "Behavioral"},
   {name: "uiEnabled", category: "General"},
];



function generate() {
   settings.forEach((setting) => {
      
   });
}

function sort(method) {
   let table = document.querySelector(".settings");
   if (method == "c") {
      let sorted = [[], []];
      settings.forEach(setting => {
         switch (setting.category) {
            case "General":
               sorted[0].push(setting);
               break;
            case "Behavioral":
               sorted[1].push(setting);
               break;
         }
      });
      sorted.forEach(category => {
         let cat = document.createElement("div");
         cat.innerHTML = `${category[0].category.toUpperCase()}`;
         table.appendChild(cat);
         category.forEach(setting => {
            let newtr = document.createElement("div");
            newtr.innerHTML = `${setting.name}`;
            table.appendChild(newtr);
         });
      });
   } else if (method == "a") {
      let sorted = [];
      settings.forEach(setting => {
         sorted.push(setting.name);
      });
      sorted.forEach(setting => {
         let newtr = document.createElement("div");
         newtr.innerHTML = setting;
         table.appendChild(newtr);
      });
   }      
}

sort("a");