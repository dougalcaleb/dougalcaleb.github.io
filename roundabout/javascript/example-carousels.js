new Roundabout({
   parent: ".type-1",
   id: "#type-1",
   pages: [
      {
         backgroundImage: "./images/numbers/0.png"
      },
      {
         backgroundImage: "./images/numbers/1.png"
      },
      {
         backgroundImage: "./images/numbers/2.png"
      },
      {
         backgroundImage: "./images/numbers/3.png"
      },
      {
         backgroundImage: "./images/numbers/4.png"
      },
      {
         backgroundImage: "./images/numbers/5.png"
      }
   ]
});

new Roundabout({
   parent: ".type-2",
   id: "#type-2",
   navigationBehavior: "direction",
   infinite: false,
   pages: [
      {
         backgroundImage: "./images/numbers/0.png"
      },
      {
         backgroundImage: "./images/numbers/1.png"
      },
      {
         backgroundImage: "./images/numbers/2.png"
      },
      {
         backgroundImage: "./images/numbers/3.png"
      },
      {
         backgroundImage: "./images/numbers/4.png"
      },
      {
         backgroundImage: "./images/numbers/5.png"
      }
   ]
});

new Roundabout({
   parent: ".type-3",
   id: "#type-3",
   navigation: false,
   pagesToShow: 3,
   pageSpacing: 10,
   interpolate: [
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
            [2,80]
         ],
         value: "height",
         unit: "$%"
      }
   ],
   pages: [
      {
         backgroundImage: "./images/numbers/0.png"
      },
      {
         backgroundImage: "./images/numbers/1.png"
      },
      {
         backgroundImage: "./images/numbers/2.png"
      },
      {
         backgroundImage: "./images/numbers/3.png"
      },
      {
         backgroundImage: "./images/numbers/4.png"
      },
      {
         backgroundImage: "./images/numbers/5.png"
      }
   ]
});

new Roundabout({
   parent: ".type-4",
   id: "#type-4",
   transition: 500,
   type: "gallery",
   pages: [
      {
         backgroundImage: "./images/numbers/0.png"
      },
      {
         backgroundImage: "./images/numbers/1.png"
      },
      {
         backgroundImage: "./images/numbers/2.png"
      },
      {
         backgroundImage: "./images/numbers/3.png"
      },
      {
         backgroundImage: "./images/numbers/4.png"
      },
      {
         backgroundImage: "./images/numbers/5.png"
      }
   ]
});

new Roundabout({
   parent: ".type-5",
   id: "#type-5",
   swipeSnap: false,
   buttons: false,
   navigation: false,
   infinite: false,
   pagesToShow: 4,
   pageSpacing: 25,
   swipeResistance: 0.97,
   pages: [
      {
         backgroundImage: "./images/numbers/0.png"
      },
      {
         backgroundImage: "./images/numbers/1.png"
      },
      {
         backgroundImage: "./images/numbers/2.png"
      },
      {
         backgroundImage: "./images/numbers/3.png"
      },
      {
         backgroundImage: "./images/numbers/4.png"
      },
      {
         backgroundImage: "./images/numbers/5.png"
      }
   ]
});

// Main carousel
const main = new Roundabout({
   parent: ".type-6",
   id: "#type-6-1",
   navigationBehavior: "direction",
   pages: [
      {
         backgroundImage: "./images/numbers/0.png"
      },
      {
         backgroundImage: "./images/numbers/1.png"
      },
      {
         backgroundImage: "./images/numbers/2.png"
      },
      {
         backgroundImage: "./images/numbers/3.png"
      },
      {
         backgroundImage: "./images/numbers/4.png"
      },
      {
         backgroundImage: "./images/numbers/5.png"
      }
   ]
});

// Nav carousel
const nav = new Roundabout({
   parent: ".type-6",
   id: "#type-6-2",
   pagesToShow: 3,
   swipeSnap: false,
   pageSpacing: 25,
   buttons: false,
   navigation: false,
   infinite: false,
   swipeResistance: 1,
   throttleTimeout: 200,
   transition: 200,
   scrollwheel: true,
   pages: [
      {
         backgroundImage: "./images/numbers/0.png",
         html: `<div class="interactive-nav i-nav-0"></div>`
      },
      {
         backgroundImage: "./images/numbers/1.png",
         html: `<div class="interactive-nav i-nav-1"></div>`
      },
      {
         backgroundImage: "./images/numbers/2.png",
         html: `<div class="interactive-nav i-nav-2"></div>`
      },
      {
         backgroundImage: "./images/numbers/3.png",
         html: `<div class="interactive-nav i-nav-3"></div>`
      },
      {
         backgroundImage: "./images/numbers/4.png",
         html: `<div class="interactive-nav i-nav-4"></div>`
      },
      {
         backgroundImage: "./images/numbers/5.png",
         html: `<div class="interactive-nav i-nav-5"></div>`
      }
   ]
})

// Initialize the scripting module
const RS = new RoundaboutScripter();

// Give each page a click handler.
// We won't use the normal "click" listener, because that can cause drag interactions to be counted as clicks
document.querySelectorAll(".interactive-nav").forEach(navBtn => {
   // Keep track of mouse start and end
   let mouseStart = 0;
   let mouseEnd = 0;
   // On mouse down, track the start position
   navBtn.addEventListener("mousedown", (event) => {
      mouseStart = event.clientX;
   });
   // On mouse up, track the end position. If the movement of the mouse was less than 5 pixels, we can assume it was a click
   // Otherwise, if the mouse moved more than 5 pixels, we assume it was a drag event, so we don't scroll
   navBtn.addEventListener("mouseup", (event) => {
      mouseEnd = event.clientX;
      if (Math.abs(mouseEnd - mouseStart) < 5) {
         let goToPage = parseInt(navBtn.classList[1].substring(navBtn.classList[1].length - 1));
         RS.scrollTo(main, goToPage);
      }
   });
});