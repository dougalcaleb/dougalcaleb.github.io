import { Roundabout } from "/javascript/roundabout.min.js";

new Roundabout({
   parent: ".roundabout-example",
   id: "#type-8",
   pagesToShow: 3,
   pageSpacing: 15,
   interpolate: [
      {
         between: [
            [0, 30],
            [1, 100]
         ],
         value: "filter",
         unit: "brightness($%)"
      },
      {
         between: [
            [1, 100],
            [2, 30]
         ],
         value: "filter",
         unit: "brightness($%)"
      },
      {
         between: [
            [0, 80],
            [1, 100]
         ],
         value: "height",
         unit: "$%"
      },
      {
         between: [
            [1, 100],
            [2, 80]
         ],
         value: "height",
         unit: "$%"
      },
   ],
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
   id: "#type-8-2",
   pagesToShow: 3,
   pageSpacing: 15,
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