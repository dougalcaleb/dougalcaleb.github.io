import Roundabout from "/javascript/roundabout.min.js";

new Roundabout({
   parent: ".roundabout-example",
   id: "#type-8",
   pagesToShow: 3,
   pageSpacing: 15,
   interpolate: [
      {
		values: {
			0: 30,
			1: 100
		},
         property: "filter",
         unit: "brightness($%)"
      },
      {
         values: {
            1: 100,
            2: 30
		 },
         property: "filter",
         unit: "brightness($%)"
      },
      {
         values: {
            0: 80,
            1: 100
		 },
         property: "height",
         unit: "$%",
		 curve: (x) => x ** 3
      },
      {
         values: {
            1: 100,
            2: 80
		 },
         property: "height",
         unit: "$%",
		 curve: (x) => x ** 3
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