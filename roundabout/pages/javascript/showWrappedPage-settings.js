import { Roundabout } from "/javascript/roundabout.min.js";

new Roundabout({
   parent: ".roundabout-example",
   id: ".hasWrappedPage",
   showWrappedPage: true,
   infinite: false,
   swipeResistance: 0.5,
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
   id: ".secondCarousel",
   // showWrappedPage: true,
   infinite: false,
   swipeResistance: 0.5,
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