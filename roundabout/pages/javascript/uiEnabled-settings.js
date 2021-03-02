new Roundabout({
   parent: ".roundabout-example",
   autoscroll: true,
   autoscrollSpeed: 8000,
   transition: 5000,
   autoscrollStartAfter: 0,
   // transitionFunction: "ease-in-out",
   uiEnabled: false,
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