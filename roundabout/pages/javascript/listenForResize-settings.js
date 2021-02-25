new Roundabout({
   parent: ".roundabout-example",
   pagesToShow: 3,
	listenForResize: true,
	breakpoints: [
		{
			width: 1200,
			pagesToShow: 2,
		},
		{
			width: 800,
			pagesToShow: 1,
			navigation: false,
		},
	],
	pages: [
		{
			backgroundImage: "../images/numbers/0.png",
		},
		{
			backgroundImage: "../images/numbers/1.png",
		},
		{
			backgroundImage: "../images/numbers/2.png",
		},
		{
			backgroundImage: "../images/numbers/3.png",
		},
		{
			backgroundImage: "../images/numbers/4.png",
		},
		{
			backgroundImage: "../images/numbers/5.png",
		},
	],
});
