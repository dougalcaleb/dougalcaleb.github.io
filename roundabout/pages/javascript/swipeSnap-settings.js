import { Roundabout } from "/javascript/roundabout.min.js";

new Roundabout({
   parent: ".roundabout-example",
   pagesToShow: 3,
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
   pagesToShow: 3,
   swipeSnap: false,
   id: ".second",
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