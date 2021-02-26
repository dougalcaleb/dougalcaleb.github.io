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
   {name: "listenForResize", category: "Behavioral"},
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

let sortOrder = "c";
let sameTab = true;

let msgSrc = window.location.hostname == "127.0.0.1" ? "http://127.0.0.1:5501/roundabout/helper.html" : "https://dougalcaleb.github.io/roundabout/helper.html";

function sendMessage(set = null) {
   document.getElementById("ls-helper").contentWindow.postMessage(set, msgSrc);
   // console.log("Message sent to helper");   
}


window.addEventListener("message", (event) => {
   // console.log("Recieved response", event.data);
   sortOrder = event.data.sortOrder;
   sameTab = JSON.parse(event.data.sameTab);
   if (sortOrder == "c") {
      document.querySelector(".sort-order").innerHTML = "Sort: by category";
   } else {
      document.querySelector(".sort-order").innerHTML = "Sort: alphabetical";
   }
   if (sameTab) {
      document.querySelector(".tab-behavior").innerHTML = "Links: same tab";
   } else {
      document.querySelector(".tab-behavior").innerHTML = "Links: new tab";
   }
   // console.log(sortOrder);
   // console.log("Sorting from message response");
   document.querySelector(".settings").innerHTML = "";
   sort(sortOrder);
});

(function setup() {
   let i = document.getElementById("ls-helper");
   i.addEventListener("load", function () {
      sendMessage();
   });
   i.src = '/roundabout/helper.html';

   document.querySelectorAll("div.code").forEach(element => {
      element.setAttribute("contenteditable", "true");
   });
})();

document.querySelector(".sort-order").addEventListener("click", () => {
   if (sortOrder == "c") {
      document.querySelector(".sort-order").innerHTML = "Sort: alphabetical";
      sortOrder = "a";
   } else {
      document.querySelector(".sort-order").innerHTML = "Sort: by category";
      sortOrder = "c";
   }
   try {
      sendMessage({ sortOrder: sortOrder });
   } catch (e) {
      console.error(e);
      console.warn("Setting could not be saved");
   }
   document.querySelector(".settings").innerHTML = "";
   sort(sortOrder);
});

document.querySelector(".tab-behavior").addEventListener("click", () => {
   if (sameTab) {
      document.querySelector(".tab-behavior").innerHTML = "Links: new tab";
      sameTab = false;
   } else {
      document.querySelector(".tab-behavior").innerHTML = "Links: same tab";
      sameTab = true;
   }
   try {
      sendMessage({ sameTab: JSON.stringify(sameTab) });
   } catch (e) {
      console.error(e);
      console.warn("Setting could not be saved");
   }
   document.querySelector(".settings").innerHTML = "";
   sort(sortOrder);
});

function sort(method) {
   // console.log(`Sorting with methos ${method}`);
   let table = document.querySelector(".settings");

   let gs = document.createElement("div");
   gs.innerHTML = `GETTING STARTED`;
   table.appendChild(gs);
   gs.classList.add("category-title");

   let newGs = document.createElement("a");
   newGs.setAttribute("href", `/roundabout/setup.html`);
   if (!sameTab) {
      newGs.setAttribute("target", "_blank");
   }
   newGs.innerHTML = `<div>Setup</div>`;
   table.appendChild(newGs);

   newGs = document.createElement("a");
   newGs.setAttribute("href", `/roundabout/pages/styling.html`);
   if (!sameTab) {
      newGs.setAttribute("target", "_blank");
   }
   newGs.innerHTML = `<div>Custom Styling</div>`;
   table.appendChild(newGs);
   
   gs = document.createElement("div");
   gs.innerHTML = `SETTINGS`;
   table.appendChild(gs);
   gs.classList.add("category-title");

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
         cat.classList.add("section-title");
         category.forEach(setting => {
            let newtr = document.createElement("a");
            newtr.setAttribute("href", `/roundabout/pages/${setting.name}.html`);
            if (!sameTab) {
               newtr.setAttribute("target", "_blank");
            }
            newtr.innerHTML = `<div>${setting.name}</div>`;
            table.appendChild(newtr);
         });
      });
   } else if (method == "a") {
      let sorted = [];
      settings.forEach(setting => {
         sorted.push(setting.name);
      });
      sorted.forEach(setting => {
         let newtr = document.createElement("a");
         newtr.setAttribute("href", `/roundabout/pages/${setting}.html`);
         if (!sameTab) {
            newtr.setAttribute("target", "_blank");
         }
         newtr.innerHTML = `<div>${setting}</div>`;
         table.appendChild(newtr);
      });
   }      
}

sort(sortOrder);