import { Roundabout } from "/javascript/roundabout.min.js";

new Roundabout({
   parent: ".roundabout-example",
   swipeSpeedThreshold: 1200,
   swipeThreshold: 800,
   pages: [
      {
         backgroundImage: "../images/numbers/0.png"
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

new Roundabout({
   parent: ".roundabout-example",
   id: ".second",
   swipeSpeedThreshold: 100,
   swipeThreshold: 800,
   pages: [
      {
         backgroundImage: "../images/numbers/0.png"
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