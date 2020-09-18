// DATE ARCHIVED: 09/09/2020 8:56 AM
// REASON: REMOVING DEPRECATED FEATURES (PROMO TEXT), CLEANING VARIABLES (MARGIN, PMARGIN, PAGE, IDS, POS, LOOP)
// WORKING: PARTIAL - ALL INTENDED FEATURES WORKING. SCROLLTYPE 1 SUBTYPES AND SCROLLTYPE 2 NOT YET IMPLEMENTED

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
Now:
- Find a way to give btn scroll an ease (apply ease to first and last affected slides)
Later:
- Reconstruct type 1
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

"scrollType": 1,                // 0 > static scroll | 1 > overlapping scroll | 2 > fade
"subtype": 0,                   // selects a sub-type for some scroll types. | 0: No subtypes; 1: 0-right overlap 1-left overlap 2-both sides; 2: No subtypes
"promoText": false,             // enables promotional overlay text (soon to be deprecated)
"radioBubbles": true,           // enables radio bubbles
"autoScroll": false,            // scroll slider automatically
"autoScrollSpeed": 5000,        // time in miliseconds between scrolling between pages when autoScroll is true
"autoScrollTimeout": 15000,     // time in miliseconds to resume autoscroll after user interaction with navigation
"btnScrollTrans": 0.2,          // time in seconds to change the transition to when a radio button is clicked for faster scrolling
"transition": 0.6,              // time in seconds for transitions
"throttle": true,               // enables user interaction throttling
"throttleTimeout": 300,         // interval to throttle clicks in ms
"throttleMatchTrans": false,     // sets throttleTimeout to cover the transition time. Overrides explicit throttleTimeout value
"useKeys": true,                // enables using l/r arrow keys to navigate
"infinite": true,               // enables infinite scrolling
// in progress

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
"scrollTrans": 0,
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

    // create a style "".carousel-transition" for use in movements (does not need to be edited by the user)
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = ".carousel-transition { transition: left "+carousel.transition+"s; }";
    document.getElementsByTagName("head")[0].appendChild(style);

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
        pg.classList.add("carousel-transition");
        document.querySelector(".carousel-page-wrap").appendChild(pg);
        pg.style.backgroundImage = "url('"+carousel.pages[a]+"')";
        // pg.style.transition = carousel.transition+"s";

        switch (carousel.scrollType) {
            case 0: // static
                pg.style.left = "0%";
                pg.style.opacity = "0";
                // carousel.margin.push((100 * a));
                break;
            case 1: // overlap
                if (a > 0) {
                    pg.style.left = "0%";
                    pg.style.opacity = "0";
                    // carousel.margin.push(100);
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


// advance the slider as if the right button were clicked
function btnR() { 
    switch (carousel.scrollType) {
        case 0: // static
            if (!carousel.infinite && carousel.order[1] === carousel.last) {            
            } else {
                carouselOrderShift("r");
                document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                document.querySelector(".carousel-image-"+carousel.static[0]).style.opacity="0";
                document.querySelector(".carousel-image-"+carousel.static[0]).style.left="0%";

                document.querySelector(".carousel-image-"+carousel.order[0]).style.left="-100%";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.left="0%";
                document.querySelector(".carousel-image-"+carousel.order[2]).style.left="100%";
            }
            break;
        case 1: // overlap
            if (!carousel.infinite && carousel.order[1] === carousel.last) {            
            } else {
                carouselOrderShift("r");
                document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                document.querySelector(".carousel-image-"+carousel.static[0]).style.opacity="0";
                document.querySelector(".carousel-image-"+carousel.static[0]).style.left="0%";

                document.querySelector(".carousel-image-"+carousel.order[0]).style.zIndex="1";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.zIndex="2";

                document.querySelector(".carousel-image-"+carousel.order[0]).style.left="0%";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.left="0%";
                document.querySelector(".carousel-image-"+carousel.order[2]).style.left="100%";
            }
            break;
        case 2: // fade
            
            break;
    }// end of scrolltype switch

    if (carousel.radioBubbles && carousel.falsePages === null) {
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.remove("carousel-inactive-bubble");

        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.remove("carousel-active-bubble");
    } else if (carousel.radioBubbles) {
        fakeBubbles();
    }
}

// advance the slider as if the left button were clicked
function btnL() { 
    switch (carousel.scrollType) {
        case 0: // static
            if (!carousel.infinite && carousel.order[1] === carousel.last) {            
            } else {
                carouselOrderShift("l");
                document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                document.querySelector(".carousel-image-"+last(carousel.static)).style.opacity="0";
                document.querySelector(".carousel-image-"+last(carousel.static)).style.left="0%";

                document.querySelector(".carousel-image-"+carousel.order[0]).style.left="-100%";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.left="0%";
                document.querySelector(".carousel-image-"+carousel.order[2]).style.left="100%";
            }
            break;
        case 1: // overlap
            if (!carousel.infinite && carousel.order[1] === carousel.last) {            
            } else {
                carouselOrderShift("l");
                document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                document.querySelector(".carousel-image-"+last(carousel.static)).style.opacity="0";
                document.querySelector(".carousel-image-"+last(carousel.static)).style.left="0%";

                document.querySelector(".carousel-image-"+carousel.order[1]).style.zIndex="1";
                document.querySelector(".carousel-image-"+carousel.order[2]).style.zIndex="2";

                document.querySelector(".carousel-image-"+carousel.order[0]).style.left="0%";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.left="0%";
                document.querySelector(".carousel-image-"+carousel.order[2]).style.left="100%";
            }      
            break;
        case 2: // fade
            break;
    }// end of scrolltype switch

    if (carousel.radioBubbles && carousel.falsePages === null) {
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.remove("carousel-inactive-bubble");

        document.querySelector(".carousel-bubble-"+carousel.order[2]).classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[2]).classList.remove("carousel-active-bubble");
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

    // if (carousel.infinite) {
    //     cls += carousel.loop*4;
    // }

    goToPage(cls);
}

// used by bubble nav functions to go to a specific page, given a parameter from 0 to carousel.last
function goToPage(place) { 

    // Get the distance to move
    var dist = (place - carousel.order[1]);
    var posDist = Math.abs(dist);

    // Quit if no distance to move
    if (posDist === 0) {
        console.log("Displacement of 0. Quitting.");
        return;
    }

    // Reduce transition time, move first, set movement interval
    for (var a = 0; a < document.querySelectorAll(".carousel-image").length; a++) {
        document.querySelectorAll(".carousel-transition")[a].style.transition = "left "+carousel.btnScrollTrans+"s linear";
    }

    if (dist > 0) {
        btnR();
    }
    if (dist < 0) {
        btnL();
    }

    var count = 1;
    var moveInt = setInterval(function() {
        if (count >= posDist) {
            clearInterval(moveInt);
            for (var a = 0; a < document.querySelectorAll(".carousel-image").length; a++) {
                document.querySelectorAll(".carousel-transition")[a].style.transition = "left "+carousel.transition+"s";
            }
        } else {
            if (dist > 0) {
                btnR();
            }
            if (dist < 0) {
             btnL();
            }
            count++;
        }
    }, carousel.scrollTrans);

    // for (var a = 0; a < posDist; a++) {
    //     if (dist > 0) {
    //         btnR();
    //     }
    //     if (dist < 0) {
    //         btnL();
    //     }
    // }
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

    carousel.scrollTrans = (carousel.btnScrollTrans * 1000);

    // based on scroll type, edit variables and styles
    switch (carousel.scrollType) {
        case 0: // static
            document.querySelector(".carousel-image-1").style.left = "100%";
            document.querySelector(".carousel-image-"+carousel.last).style.left = "-100%";
            
            document.querySelector(".carousel-image-1").style.opacity = "1";
            document.querySelector(".carousel-image-0").style.opacity = "1";
            document.querySelector(".carousel-image-"+carousel.last).style.opacity = "1";
            break;
        case 1: // overlap
            document.querySelector(".carousel-image-1").style.left = "100%";
            document.querySelector(".carousel-image-"+carousel.last).style.left = "0%";
            
            document.querySelector(".carousel-image-1").style.opacity = "1";
            document.querySelector(".carousel-image-0").style.opacity = "1";
            document.querySelector(".carousel-image-"+carousel.last).style.opacity = "1";

            document.querySelector(".carousel-image-0").style.zIndex = "2";
            document.querySelector(".carousel-image-"+carousel.last).style.zIndex = "1";
            break;
        case 2: // fade
            break;
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