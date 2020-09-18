// DATE ARCHIVED: 09/14/2020 10:05 AM
// REASON: IMPLEMENTING SWIPE
// WORKING: YES

// SETUP

/*
FORKING:

- Link this script to the desired HTML file
- Do NOT add transitions to slides via CSS
- To have 2+ in a single page, replace all instances if 'carousel' with 'carousel1' (or similar) to differentiate

REQUIRED CSS:
    - .carousel-page-wrap
    - .carousel-btnL & .carousel-btnR
    - .carousel-image
REQUIRED CSS FOR BUBBLES:
    - .carousel-bubbles
    - .carousel-active-bubble
    - .carousel-inactive-bubble
    - .carousel-bubble
ADDITIONALLY REQUIRED:
    - A master wrap that defines the size of the slider with hidden overflow; everything is put inside this wrap including static navigation 
    - (for the reference file, it is .slider)
    - Left and right nav buttons that are accessible by the user

EDITING PAGES:

- To add images, paste the URLs into the 'pages' array in the order you want them to appear
- To remove an image page, delete its URL
- Make sure all settings are accurate and compatible with each other
- No editing of external files is required to add or remove slides or their corresponding elements
- All types of nav indicators are supported, not only the bubbles in the reference
*/

// To do:
/*
Now:
- Add support for less than 4 slides
- Add subtypes for overlapping scroll
Later:
- Find a way to give bubble scroll an ease (apply ease to first and last affected slides)
- Add drag support
- Remove necessity for nav buttons
*/


var carousel = {

// ELEMENTS

"pages": ["images/carousel/numbers/1.png","images/carousel/numbers/2.png","images/carousel/numbers/3.png","images/carousel/numbers/4.png","images/carousel/numbers/5.png","images/carousel/numbers/6.png"],

// BEHAVIORS

"scrollType": 0,                // 0 > static scroll | 1 > overlapping scroll | 2 > fade
"subtype": 0,                   // selects a sub-type for supported scroll types. | 0: No subtypes; 1: 0-right overlap 1-left overlap 2-both top; 2: No subtypes
"radioBubbles": true,           // enables radio bubbles
"autoScroll": false,            // scroll slider automatically
"autoScrollSpeed": 5000,        // time in miliseconds between scrolling between pages when autoScroll is true
"autoScrollTimeout": 15000,     // time in miliseconds to resume autoscroll after user interaction with navigation
"autoScrollDir": "l",           // determines the direction the autoscroll scrolls
"btnScrollTrans": 0.2,          // time in seconds to change the transition to when a radio button is clicked (for faster scrolling. Deprecated when ease is implemented)
"transition": 0.6,              // time in seconds for transitions between slides
"throttle": true,               // enables user interaction throttling
"throttleTimeout": 300,         // interval to throttle navigation by the user in ms
"throttleMatchTrans": false,    // sets throttleTimeout to cover the transition time. Overrides explicit throttleTimeout value
"useKeys": true,                // enables using l/r arrow keys to navigate
"infinite": true,               // enables infinite scrolling
// in progress

// todo
"fadeOffset": 20,               // movement of the new slide when scrollType is 2
"enableSwipe": false,           // enables touch or click-drag scrolling. Only available with type 0
"resist": 0,                    // Resistance after dragging past the end when enableSwipe is true

// NOT EDITABLE

"order": [],
"static": [],
"scrollTimeout": null,
"scrollTrans": 0,
"scrollInt": null,
"allowed": true,
"falsePages": null,
"last": 0,

// FOR SWIPE/DRAG



};

/*
Todo:
- Implement swipe
- Add support for less slides
- Add a "multiple" type, like slick.


*/


document.querySelector(".carousel-btnR").addEventListener("click", btnRClicked);
document.querySelector(".carousel-btnL").addEventListener("click", btnLClicked);
// Bubble event listener is inside "createPages()" in the "if (carousel.radioBubbles)" statement, currently line 169.

if (carousel.useKeys) {
    document.addEventListener("keydown", keydn);
}

function keydn(event) {
	switch(event.keyCode) {
		case 37: // Left
			btnLClicked();
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
    style.setAttribute("type", "text/css");
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
                break;
            case 1: // overlap
                if (a > 0) {
                    pg.style.left = "0%";
                    pg.style.opacity = "0";
                } else {
                    pg.style.left = "0%";
                }
                break;
            case 2: // fade
                pg.style.left = "0";
                if (a > 0) {
                    pg.style.opacity = "0";
                }
                break;
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

// specific event for when the navigate right button is physically clicked or right arrow pressed, throttling handled
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

// specific event for when the navigate left button is physically clicked or right arrow pressed, throttling handled
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
            switch (carousel.subtype) {
                case 0: // slide from right
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
                case 1: // slide from left
                    if (!carousel.infinite && carousel.order[1] === carousel.last) {            
                    } else {
                        carouselOrderShift("r");
                        document.querySelector(".carousel-image-"+carousel.static[0]).style.opacity="0";
                        document.querySelector(".carousel-image-"+carousel.static[0]).style.left="0%";
                        
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.zIndex="1";
                        document.querySelector(".carousel-image-"+carousel.order[0]).style.zIndex="2";
    
                        document.querySelector(".carousel-image-"+carousel.order[0]).style.left="-100%";
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.left="0%";
                        document.querySelector(".carousel-image-"+carousel.order[2]).style.left="0%";
                    }
                    break;
                case 2: // both, new page is always top
                    if (!carousel.infinite && carousel.order[1] === carousel.last) {            
                    } else {
                        carouselOrderShift("r");
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";

                        document.querySelector(".carousel-image-"+carousel.static[0]).style.opacity="0";
                        document.querySelector(".carousel-image-"+carousel.static[0]).style.left="0%";
    
                        document.querySelector(".carousel-image-"+carousel.order[0]).style.zIndex="1";
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.zIndex="2";
    
                        document.querySelector(".carousel-image-"+carousel.order[1]).classList.remove("carousel-transition");
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.left="100%";

                        document.querySelector(".carousel-image-"+carousel.order[0]).style.left="0%";
                        setTimeout(function() {
                            document.querySelector(".carousel-image-"+carousel.order[1]).classList.add("carousel-transition");
                            document.querySelector(".carousel-image-"+carousel.order[1]).style.left="0%";
                        }, 0);
                        document.querySelector(".carousel-image-"+carousel.order[2]).style.left="100%";
                    }
                    break;
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
            if (!carousel.infinite && carousel.order[1] === 0) {
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
            switch (carousel.subtype) {
                case 0: // slide from right
                    if (!carousel.infinite && carousel.order[1] === 0) {
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
                case 1: // slide from left
                    if (!carousel.infinite && carousel.order[1] === 0) {            
                    } else {
                        carouselOrderShift("l");
                        document.querySelector(".carousel-image-"+last(carousel.static)).style.opacity="0";
                        document.querySelector(".carousel-image-"+last(carousel.static)).style.left="0%";
                        
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                        document.querySelector(".carousel-image-"+carousel.order[2]).style.zIndex="1";
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.zIndex="2";

                        
    
                        document.querySelector(".carousel-image-"+carousel.order[0]).style.left="-100%";
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.left="0%";
                        document.querySelector(".carousel-image-"+carousel.order[2]).style.left="0%";
                    }
                    break;
                case 2: // both, new page is always top
                    if (!carousel.infinite && carousel.order[1] === 0) {            
                    } else {
                        carouselOrderShift("l");
                        document.querySelector(".carousel-image-"+last(carousel.static)).style.opacity="0";
                        document.querySelector(".carousel-image-"+last(carousel.static)).style.left="0%";
                        
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                        document.querySelector(".carousel-image-"+carousel.order[2]).style.zIndex="1";
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.zIndex="2";

                        document.querySelector(".carousel-image-"+carousel.order[1]).classList.toggle("carousel-transition");
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.left="-100%";

        
                        document.querySelector(".carousel-image-"+carousel.order[0]).style.left="-100%";
                        setTimeout(function() {
                            document.querySelector(".carousel-image-"+carousel.order[1]).classList.add("carousel-transition");
                            document.querySelector(".carousel-image-"+carousel.order[1]).style.left="0%";
                        }, 0);
                        document.querySelector(".carousel-image-"+carousel.order[2]).style.left="0%";
                    }
                    break;
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

    // if ((dist < (carousel.last/-2)) && carousel.infinite) {
    //     dist = Math.abs(dist);
    // }

    // Reduce transition time, move first, set movement interval
    for (var a = 0; a < document.querySelectorAll(".carousel-image").length; a++) {
        document.querySelectorAll(".carousel-transition")[a].style.transition = "left "+carousel.btnScrollTrans+"s ease-in-out";
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
    if (carousel.autoScrollDir === "l") {
        btnL();
    } else if (carousel.autoScrollDir === "r") {
        btnR();
    }
}

// start autoscrolling
function setAutoScroll() {  
    if (carousel.autoScroll) {
        carousel.scrollInt = setInterval(scrollAuto, carousel.autoScrollSpeed);
    }
}

//======================================================================

// VARIABLE AND SLIDE SETUP

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
            switch (carousel.subtype) {
                case 0:
                    document.querySelector(".carousel-image-1").style.left = "100%";
                    document.querySelector(".carousel-image-"+carousel.last).style.left = "0%";
            
                    document.querySelector(".carousel-image-1").style.opacity = "1";
                    document.querySelector(".carousel-image-0").style.opacity = "1";
                    document.querySelector(".carousel-image-"+carousel.last).style.opacity = "1";

                    document.querySelector(".carousel-image-0").style.zIndex = "2";
                    document.querySelector(".carousel-image-"+carousel.last).style.zIndex = "1";
                    break;
                case 1:
                    document.querySelector(".carousel-image-"+carousel.last).style.left = "-100%";

                    document.querySelector(".carousel-image-1").style.opacity = "1";
                    document.querySelector(".carousel-image-0").style.opacity = "1";
                    document.querySelector(".carousel-image-"+carousel.last).style.opacity = "1";

                    document.querySelector(".carousel-image-0").style.zIndex = "2";
                    document.querySelector(".carousel-image-"+carousel.last).style.zIndex = "1";
                    break;
                case 2:
                    document.querySelector(".carousel-image-1").style.left = "100%";
                    document.querySelector(".carousel-image-"+carousel.last).style.left = "-100%";


                    break;
            }
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