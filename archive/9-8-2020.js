// DATE ARCHIVED: 09/08/2020 10:57 PM
// REASON: RESTRUCTURING USED VARIABLES AND NAVIGATION METHODS
// WORKING: PARTIAL - LAST NAV METHOD NOT FINISHED


// SETUP

/*
FORKING:

- Copy all code in this page
- Must have left and right nav buttons accessible by the user

REQUIRED CSS:
    - .carousel-page-wrap
    - .carousel-btnL & .carousel-btnR
    - .carousel-image
REQUIRED FOR BUBBLES:
    - .carousel-bubbles
    - .carousel-active-bubble
    - .carousel-inactive-bubble
    - .carousel-bubble
ADDITIONALLY REQUIRED:
    - A master wrap that defines the size of the slider with hidden overflow, everything is put inside this wrap including static navigation (for the reference, it is .slider)



EDITING PAGES:

- To add an image, paste the URL into the 'pages' array in the order you want them to appear and add promotion text and styling
- To remove an image page, delete its URL and corresponding text and text styling
- The radio buttons are generated here, no HTML editing required
- The CSS of the buttons and bubbles can be edited safely
*/

// To do:
/*
- REMOVE PAGES, USE ORDER ONLY

- Add different type of sliders
- Add drag support
*/


/*NOTES:
- Now using two arrays
- One for active page and two side images: order
- One for inactive pages placed behind main image: static
- carousel.order[1] is active image
- ids swapped between arrays
- Min of 4 images, must double when 3 are supplied

*/


var carousel = {

// ELEMENTS

"pages": ["images/carousel/slide-outdated-1-1.jpg","images/carousel/slide-outdated-1-2.jpg","images/carousel/slide-outdated-1-3.jpg","images/carousel/slide-outdated-1-4.jpg","images/carousel/slide-outdated-1-4.jpg","images/carousel/slide-outdated-1-4.jpg","images/carousel/slide-outdated-1-4.jpg"], //,"images/carousel/slide-outdated-1-4.jpg"
"text": [],
"textStyle": [ // top, left, font, color, width
    []
],

// BEHAVIORS

// done
"promoText": false,             // enables promotional overlay text (soon to be deprecated)
"radioBubbles": true,           // enables radio bubbles
"autoScroll": false,            // scroll slider automatically
"autoScrollSpeed": 5000,        // time in miliseconds between scrolling between pages when autoScroll is true
"autoScrollTimeout": 15000,     // time in miliseconds to resume autoscroll after user interaction with navigation
"transition": 0.6,              // time in seconds for transitions
"scrollType": 0,                // 0 > static scroll | 1 > overlapping scroll | 2 > fade | x 3 > fade+movement
"throttle": true,               // enables user interaction throttling
"throttleTimeout": 300,         // interval to throttle clicks in ms
"throttleMatchTrans": true,     // sets throttleTimeout to cover the transition time. Overrides explicit throttleTimeout value
"useKeys": true,                // enables using l/r arrow keys to navigate
// in progress
"infinite": true,               // enables infinite scrolling
// todo
"fadeOffset": 20,               // movement of the new slide when scrollType is 2
"enableSwipe": false,           // enables touch or click-drag scrolling
"drag": 0,                      // Resistance after dragging past the end when enableSwipe is true

// NOT EDITABLE

"margin": [],
"ids": [],
"order": [],
"static": [],
"pmargin": 0,
"page": 0,
"pos": 0,
"loop": 0,
"scrollTimeout": null,
"scrollInt": null,
"allowed": true,
"falsePages": null,
"last": 0

};


document.querySelector(".carousel-btnR").addEventListener("click", btnRClicked);
document.querySelector(".carousel-btnL").addEventListener("click", btnLClicked);
// Bubble event listener is inside "createPages()" in the "if (carousel.radioBubbles)" statement, currently line 169.

if (carousel.useKeys) {
    document.addEventListener("keydown", keydn);
}

function keydn(event) {
	switch(event.keyCode) {
		case 37: // Left
			btnLClicked()
			break;
		case 39: // Right
			btnRClicked();
			break;
	}
}



// create each slider page and respective elements, and edit variables appropriately
function createPages() {

    // if user supplied only two slides, create two more, for compatibility
    if (carousel.scrollType === 0 && carousel.pages.length === 2) {
        carousel.pages.push(carousel.pages[0]);
        carousel.pages.push(carousel.pages[1]);
        carousel.falsePages = 2;
    }

    // create each page
    for (var a = 0; a < carousel.pages.length; a++) {
        var pg = document.createElement("DIV");
        pg.classList.add("carousel-image");
        pg.classList.add("carousel-image-"+a);
        document.querySelector(".carousel-page-wrap").appendChild(pg);
        pg.style.backgroundImage = "url('"+carousel.pages[a]+"')";
        pg.style.transition = carousel.transition+"s";

        switch (carousel.scrollType) {
            case 0: // static
                pg.style.left = "100%";
                carousel.margin.push((100 * a));
                break;
            case 1: // overlap
                if (a > 0) {
                    pg.style.left = "100%";
                    carousel.margin.push(100);
                } else {
                    pg.style.left = "0%";
                    carousel.margin.push(0);
                }
                break;
            case 2: // fade
                pg.style.left = "0";
                if (a > 0) {
                    pg.style.opacity = "0";
                }
                carousel.margin.push(0);
                break;
        }

        // add promotional text to the slide (soon to be deprecated)
        if (carousel.promoText) {
            var txt = document.createElement("P");
            txt.classList.add("carousel-promotion-text");
            txt.classList.add("carousel-promo-text-"+a);
            document.querySelector(".carousel-page-wrap").appendChild(txt);
            txt.innerHTML = carousel.text[a];
            txt.style.top = carousel.textStyle[a][0];
            txt.style.left = "calc("+(100*a)+"% + "+carousel.textStyle[a][1]+")";
            txt.style.fontFamily = carousel.textStyle[a][2];
            txt.style.color = carousel.textStyle[a][3];
            txt.style.width = carousel.textStyle[a][4];
        }

        // add radio bubbles correctly
        if (carousel.radioBubbles) {
            if ((carousel.falsePages !== null && carousel.falsePages > a) || carousel.falsePages === null) {
                var bub = document.createElement("DIV");
                bub.classList.add("carousel-bubble");
                bub.classList.add("carousel-bubble-"+a);
                document.querySelector(".carousel-bubbles").appendChild(bub);
                document.querySelector(".carousel-bubble-"+a).addEventListener("click", bubbleNav);
                document.querySelector(".carousel-bubble-0").classList.add("carousel-active-bubble");
            }
        }
    }

    // based on scroll type, edit variables and styles
    switch (carousel.scrollType) {
        case 0: // static
            document.querySelector(".carousel-image-0").style.left = "0%";
            document.querySelector(".carousel-image-0").style.zIndex = "5";
            document.querySelector(".carousel-image-"+(carousel.pages.length-1)).style.left = "-100%";
            break;
        case 1: // overlap
            document.querySelector(".carousel-image-0").style.zIndex = "3";
            document.querySelector(".carousel-image-1").style.zIndex = "5";
            document.querySelector(".carousel-image-"+(carousel.pages.length-1)).style.left = "-100%";
            break;
        case 2: // fade
            break;
    }

    // create a style "".carousel-transition" for use in movements (does not need to be edited by the user)
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = ".carousel-transition { transition:"+carousel.transition+"s; }";
    document.getElementsByTagName("head")[0].appendChild(style);
}

// specific event for when the navigate right button is physically clicked, throttling handled
function btnRClicked() { 
    resetScrollTimeout();
    if (carousel.allowed) {
        btnR();
        if (carousel.throttle) {
            carousel.allowed = false;
            setTimeout(function() {
                carousel.allowed = true;
            }, carousel.throttleTimeout);
        }
    }
}

// specific event for when the navigate left button is physically clicked, throttling handled
function btnLClicked() { 
    resetScrollTimeout();
    if (carousel.allowed) {
        btnL();
        if (carousel.throttle) {
            carousel.allowed = false;
            setTimeout(function() {
                carousel.allowed = true;
            }, carousel.throttleTimeout);
        }
    }
}

//======================================================================

// LEFT AND RIGHT MOVEMENT

//======================================================================


function btnR() { // advance the slider as if the right button were clicked
    switch (carousel.scrollType) {
        case 0: // static

            if (!carousel.infinite && carousel.order[2] !== carousel.last) {
                console.log("End")
            }


            carouselOrderShift("r");












            if (carousel.page < (carousel.pages.length-1)) {
                document.querySelector(".carousel-image-"+(carousel.page+1)).style.zIndex = "5";
                document.querySelector(".carousel-image-"+(carousel.page+1)).style.visibility = "visible";
            } else {
                document.querySelector(".carousel-image-0").style.zIndex = "5";
                document.querySelector(".carousel-image-0").style.visibility = "visible";
            }
            if ((!carousel.infinite && carousel.page < carousel.pages.length-1) || (carousel.infinite && carousel.page !== carousel.pages.length-1)) {
                document.querySelector(".carousel-image-"+carousel.page).style.left = "-100%";
                document.querySelector(".carousel-image-"+carousel.page).style.visibility = "hidden";
                document.querySelector(".carousel-image-"+(carousel.page+1)).style.left = "0%";
            } else
            if ((carousel.infinite) && (carousel.page === carousel.pages.length-1)) {
                document.querySelector(".carousel-image-"+(carousel.pages.length-1)).style.left = "-100%";
                document.querySelector(".carousel-image-"+(carousel.pages.length-1)).style.visibility = "hidden";
                document.querySelector(".carousel-image-0").style.left = "0%";
            }
            carousel.order.push(carousel.page);
            carousel.order.shift();
            if (carousel.page === (carousel.pages.length-1)) {
                carousel.page = 0;
            } else {
                carousel.page++;
                carousel.pos++;
            }
            if (carousel.infinite) {
                document.querySelector(".carousel-image-"+carousel.order[1]).style.zIndex = "3";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.left = "100%";
            }
            break;

        case 1: // overlap
            carousel.order.push(carousel.page);
            carousel.order.shift();
            if (carousel.page === (carousel.pages.length-1)) {
                carousel.page = 0;
            } else {
                carousel.page++;
            }
            if ((carousel.page < (carousel.pages.length-1)) && !carousel.infinite) {
                document.querySelector(".carousel-image-"+carousel.page).style.left = "0%";
            } else if (carousel.infinite) {
                document.querySelector(".carousel-image-"+carousel.page).style.left = "0%";
                document.querySelector(".carousel-image-"+(carousel.order[1])).style.zIndex = "5";
            }
            if (carousel.infinite) {
                // console.log("Moving "+carousel.order[(carousel.order.length-2)]+" to the left");
                document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-2)]).style.left = "100%";
                document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-2)]).style.zIndex = "3";
            }
            if (carousel.infinite && (carousel.page === 0)) {
                document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-1)]).style.zIndex = "3";
            }
            break;

        case 2: // fade
            
            break;
    }// end of scrolltype switch

    if (carousel.radioBubbles && carousel.falsePages === null) {
        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.remove("carousel-inactive-bubble");

        document.querySelector(".carousel-bubble-"+last(carousel.order)).classList.add("carousel-inactive-bubble"); 
        document.querySelector(".carousel-bubble-"+last(carousel.order)).classList.remove("carousel-active-bubble");
    } else if (carousel.radioBubbles) {
        fakeBubbles();
    }
}

function btnL() { // advance the slider as if the left button were clicked
    switch (carousel.scrollType) {
        case 0: // static
            if (carousel.page > 0) {
                document.querySelector(".carousel-image-"+(carousel.page-1)).style.zIndex = "5";
                document.querySelector(".carousel-image-"+(carousel.page-1)).style.visibility = "visible";
            } else {
                document.querySelector(".carousel-image-"+last(carousel.order)).style.zIndex = "5";
                document.querySelector(".carousel-image-"+last(carousel.order)).style.visibility = "visible";
            }
            if ((!carousel.infinite && carousel.page > 0) || (carousel.infinite && carousel.page !== 0)) {
                document.querySelector(".carousel-image-"+carousel.page).style.left = "100%";
                document.querySelector(".carousel-image-"+carousel.page).style.visibility = "hidden";
                document.querySelector(".carousel-image-"+(carousel.page-1)).style.left = "0%";
            } else
            if ((carousel.infinite) && (carousel.page === 0)) {
                document.querySelector(".carousel-image-"+last(carousel.order)).style.left = "0%";
                document.querySelector(".carousel-image-0").style.left = "100%";
            }
            if (carousel.page === 0) {
                carousel.page = (carousel.pages.length-1);
            } else {
                carousel.page--;
                carousel.pos--;
            }
            carousel.order.unshift(carousel.page);
            carousel.order.pop();
            if (carousel.infinite) {
                document.querySelector(".carousel-image-"+last(carousel.order)).style.zIndex = "3";
                document.querySelector(".carousel-image-"+last(carousel.order)).style.left = "-100%";
            }
            break;
        case 1: // overlap
            if (carousel.page === 0) {
                carousel.page = (carousel.pages.length-1);
            } else {
                carousel.page--;
            }
            carousel.order.unshift(carousel.page);
            carousel.order.pop();

            
            if ((carousel.page > 0) && !carousel.infinite) {
                document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-1)]).style.left = "0%";
            } else if (carousel.infinite) {
                // document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-1)]).style.left = "0%";

                // document.querySelector(".carousel-image-"+carousel.page).style.left = "100%";
                document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-2)]).style.zIndex = "5";
            }
            if (carousel.infinite) {
                console.log("Moving "+carousel.order[(carousel.order.length-2)]+" to the right");
                document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-2)]).style.left = "0%";
                document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-2)]).style.zIndex = "3";
            }
            if (carousel.infinite && (carousel.page === 0)) {
                document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-1)]).style.zIndex = "3";
            }
            
            break;
        case 2: // fade
            break;
    }// end of scrolltype switch

    if (carousel.radioBubbles && carousel.falsePages === null) {
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.remove("carousel-active-bubble");

        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.remove("carousel-inactive-bubble");
    } else if (carousel.radioBubbles) {
        fakeBubbles();
    }
}


//======================================================================

// ADDITIONAL NAVIGATION FUNCTIONS

//======================================================================


// display bubbles correctly when only two pages have been supplied, but four have been generated
function fakeBubbles() {
    if (carousel.order[0] === 0 || carousel.order[0] === 2) {
        document.querySelector(".carousel-bubble-0").classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-0").classList.remove("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-1").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-1").classList.remove("carousel-active-bubble");
    } else {
        document.querySelector(".carousel-bubble-0").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-0").classList.remove("carousel-active-bubble");
        document.querySelector(".carousel-bubble-1").classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-1").classList.remove("carousel-inactive-bubble");
    }
}

// specific event for when a radio button is physically clicked
function bubbleNav() { 
    var cls = this.classList.item(1);
    cls = cls.slice(16, 17);
    
    resetScrollTimeout();

    cls = parseInt(cls);

    if (carousel.infinite) {
        cls += carousel.loop*4;
    }

    goToPage(cls);
}

// used by bubble nav functions to go to a specific page, given a parameter from 0 to carousel.last
function goToPage(place) { 

    var dist = (place - carousel.page);
    var posDist = Math.abs(dist);

    for (var a = 0; a < posDist; a++) {
        if (dist > 0) {
            btnR();
        }
        if (dist < 0) {
            btnL();
        }
    }
}


//======================================================================

// AUTOSCROLL FUNCTIONS

//======================================================================


// stop the scrolling when a user interacts for a while, then resume autoscroll
function resetScrollTimeout() { 
    clearTimeout(carousel.scrollTimeout);
    clearInterval(carousel.scrollInt);
    carousel.scrollTimeout = setTimeout(setAutoScroll, carousel.autoScrollTimeout);
}

// scroll the page
function scrollAuto() { 
    if (carousel.page < carousel.pages.length) {        
        btnR();
    } else {
        goToPage(0);
    }
}

// start autoscrolling
function setAutoScroll() {  
    if (carousel.autoScroll) {
        carousel.scrollInt = setInterval(scrollAuto, carousel.autoScrollSpeed);
    }
}

//======================================================================

// VARIABLE SETUP

//======================================================================

function setupVariables() {
    carousel.last = (carousel.pages.length-1);
    carousel.order = [carousel.last, 0, 1];
    for (var a = 2; a < (carousel.pages.length-1); a++) {
        carousel.static.unshift(a);
    }
    if (carousel.throttleMatchTrans) {
        carousel.throttleTimeout = (carousel.transition * 1000);
    }
}

//======================================================================

// FUNCTIONS FOR READABILITY

//======================================================================


function last(arr) {
    return arr[arr.length-1];
}

function carouselOrderShift(dir) {
    if (dir === "r") {
        carousel.static.unshift(carousel.order[0]);
        carousel.order.push(last(carousel.static));
        carousel.order.shift();
        carousel.static.pop();
    } else if (dir === "l"){
        carousel.static.push(last(carousel.order));
        carousel.order.unshift(carousel.static[0]);
        carousel.order.pop();
        carousel.static.shift();
    }

    // console.log("Order (shifted "+dir+"):");
    // console.log(carousel.order);

    // console.log("Static (shifted "+dir+"):");
    // console.log(carousel.static);
}


//======================================================================

// INITIAL FUNCTION CALLS

//======================================================================

createPages();
setAutoScroll();
setupVariables();

console.log("Order (initial):");
console.log(carousel.order);

console.log("Static (initial):");
console.log(carousel.static);