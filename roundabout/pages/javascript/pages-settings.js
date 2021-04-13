import { Roundabout } from "/javascript/roundabout.min.js";

new Roundabout({
   parent: ".roundabout-example",
   pages: [
      {
         backgroundImage: "../images/numbers/0.png",
         html: "<button class='exampleButton'>Hello World!</button>",
         css: ".exampleButton { position: relative; left: 25px; top: 25px; z-index: 3}"
      },
      {
         backgroundImage: "../images/numbers/1.png"
      },
      {
         backgroundImage: "../images/numbers/2.png"
      },
      {
         backgroundImage: "../images/numbers/3.png"
      },
      {
         backgroundImage: "../images/numbers/4.png"
      },
      {
         backgroundImage: "../images/numbers/5.png"
      }
   ]
});

document.querySelector(".exampleButton").addEventListener("click", () => {
   alert("Hello World!");
});