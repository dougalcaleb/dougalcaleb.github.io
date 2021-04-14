import { settings, scripting } from "/javascript/settings.js";

const VERSION = "v1.4.0";

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

   // document.querySelectorAll("div.code").forEach(element => {
   //    element.setAttribute("contenteditable", "true");
   //    element.setAttribute("spellcheck", "false");
   // });

   let v = document.createElement("span");
   v.innerText = VERSION;
   v.classList.add("version");
   document.querySelector(".title").appendChild(v);
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

   let table = document.querySelector(".settings");
   // Getting Started header
   let gs = document.createElement("div");
   gs.innerHTML = `GETTING STARTED`;
   table.appendChild(gs);
   gs.classList.add("category-title");

   // Setup button
   let newGs = document.createElement("a");
   newGs.setAttribute("href", `/roundabout/setup.html`);
   if (!sameTab) {
      newGs.setAttribute("target", "_blank");
   }
   newGs.innerHTML = `<div>Setup</div>`;
   table.appendChild(newGs);

   // Styling button
   newGs = document.createElement("a");
   newGs.setAttribute("href", `/roundabout/styling.html`);
   if (!sameTab) {
      newGs.setAttribute("target", "_blank");
   }
   newGs.innerHTML = `<div>Custom Styling</div>`;
   table.appendChild(newGs);

   // Scripting button
   newGs = document.createElement("a");
   newGs.setAttribute("href", `/roundabout/scripting.html`);
   if (!sameTab) {
      newGs.setAttribute("target", "_blank");
   }
   newGs.innerHTML = `<div>Scripting</div>`;
   table.appendChild(newGs);

   // Patch notes button
   newGs = document.createElement("a");
   newGs.setAttribute("href", `/roundabout/patch-notes.html`);
   if (!sameTab) {
      newGs.setAttribute("target", "_blank");
   }
   newGs.innerHTML = `<div>Patch Notes</div>`;
   table.appendChild(newGs);

   // Examples button
   newGs = document.createElement("a");
   newGs.setAttribute("href", `/roundabout/examples.html`);
   if (!sameTab) {
      newGs.setAttribute("target", "_blank");
   }
   newGs.innerHTML = `<div>Examples</div>`;
   table.appendChild(newGs);
   
   // Settings header
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

   // Scripting header
   gs = document.createElement("div");
   gs.innerHTML = `SCRIPTING`;
   table.appendChild(gs);
   gs.classList.add("category-title");

   scripting.forEach(method => {
      let newtr = document.createElement("a");
         newtr.setAttribute("href", `/roundabout/pages/${method.name}.html`);
         if (!sameTab) {
            newtr.setAttribute("target", "_blank");
         }
         newtr.innerHTML = `<div>${method.name}</div>`;
         table.appendChild(newtr);
   });

}

sort(sortOrder);