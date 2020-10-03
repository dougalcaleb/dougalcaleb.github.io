// VERSION 1.1.3
console.log("Using Javascript Instant Carousel v1.1.3");

/*
- Link this script to an HTML file
- Do NOT add transitions to slides via CSS
- To have 2+ in a single page, replace all instances if 'carousel' with 'carousel1' (or similar) to differentiate variables
- This program makes use of functions.js v1.0.2

AUTO-GENERATING REQUIREMENTS:
    - HTML element ".carousel-wrap"
    - carousel.js

CUSTOM STYLE REQUIREMENTS:
(see reference archive for examples)
HTML: 
    - div.carousel-wrap
    - div.carousel-page-wrap
    - div.carousel-nav
    - div.carousel-bubbles
    - left/right buttons
        - .carousel-btnR
        - .carousel-btnL
CSS:
    - .carousel-wrap
    - .carousel-page-wrap
    - .carousel-btnL & .carousel-btnR
    - .carousel-image

    - .carousel-bubbles
    - .carousel-bubble
    - .carousel-active-bubble
    - .carousel-inactive-bubble

EDITING PAGES:
- To add images, paste the URLs into the 'pages' array in the order you want them to appear
- To remove an image page, delete its URL
- Make sure all settings are accurate and compatible with each other
- No editing of external files is required to add or remove slides or their corresponding elements
- All types of nav indicators are supported, not only the bubbles in the reference
*/

var carousel = {

// ELEMENTS

"pages": ["images/carousel/numbers/1.png","images/carousel/numbers/2.png","images/carousel/numbers/3.png","images/carousel/numbers/4.png","images/carousel/numbers/5.png","images/carousel/numbers/6.png"],
"navBtns": ["<svg viewBox='0 0 24 24' class='carousel-svg-l'><path fill='currentColor' d='M19,3H5A2,2 0 0,0 3,5V19C3,20.11 3.9,21 5,21H19C20.11,21 21,20.11 21,19V5A2,2 0 0,0 19,3M15.71,16.59L14.29,18L8.29,12L14.29,6L15.71,7.41L11.12,12L15.71,16.59Z'/></svg>", "<svg viewBox='0 0 24 24' class='carousel-svg-r'><path fill='currentColor' d='M19,3H5A2,2 0 0,0 3,5V19C3,20.11 3.9,21 5,21H19C20.11,21 21,20.11 21,19V5A2,2 0 0,0 19,3M9.71,18L8.29,16.59L12.88,12L8.29,7.41L9.71,6L15.71,12L9.71,18Z'/></svg>"],
"mainId": ".carousel-wrap",     // class of the main slider body. autoGenHtml generates inside of this element
"bottomSafeZone": 50,           // distance from the bottom to not have the swipe overlay (safe zone for nav)
"safeUnits": "px",              // units for bottomSafeZone
"defaultStyle": false,          // automatically includes elements styles from the reference file. Overrides autoGenHtml (sets to true)
"autoGenHtml": false,            // generates a basic HTML structure, identical to the reference. Includes no styles

// BEHAVIORS

"scrollType": 0,                // 0: static scroll | 1: overlapping scroll | 2: fade
"subtype": 0,                   // 0: No subtypes | 1: 0-right overlap 1-left overlap 2-both top | 2: No subtypes
"radioBubbles": true,           // enables generating of radio bubbles
"autoScroll": false,            // scroll slider automatically
"autoScrollSpeed": 5000,        // time in miliseconds between scrolling between pages when autoScroll is true
"autoScrollTimeout": 15000,     // time in miliseconds to resume autoscroll after user interaction with navigation
"autoScrollDir": "r",           // determines the direction the autoscroll scrolls (r or l)
"btnScrollTrans": 0.2,          // time in seconds to change the transition to when a radio button is clicked. Not used on scrollType 2
"transition": 0.3,              // time in seconds for transitions between slides
"throttle": true,               // enables user interaction throttling
"throttleTimeout": 300,         // interval to throttle navigation by the user in ms
"throttleMatchTrans": false,    // sets throttleTimeout to cover the transition time. Overrides explicit throttleTimeout value
"useKeys": true,                // enables using l/r arrow keys to navigate
"infinite": true,               // enables infinite scrolling
"swipe": true,                  // enables touch or click-drag scrolling. Only available with type 0
"swipeDist": 300,               // distance swiped required to advance the slider instead of snapping back
"swipeScale": 1.0,              // multiplier for movement when swiping
"resist": 0.95,                 // resistance multiplier after dragging past the end when enableSwipe is true (0=none 1=stop)
"rtl": false,                   // flips direction of slides
"fadeInOffset": 20,             // movement of the slide from the right when scrollType is 2
"fadeOutOffset": -20,           // movement of the slide from the left when scrollType is 2
"fadeOffsetUnits": "px",        // units for fadeOffset

// NO EDITING RECOMMENDED

"allowOtherSwipe": false,       // allows swiping on all types (NOT STABLE)
"createInternalStyles": true,   // creates some styles automatically that will not change based on appearance

//  |                  |
//  |   NOT EDITABLE   |
//  V                  V

"order": [],
"static": [],
"scrollTimeout": null,
"scrollTrans": 0,
"scrollInt": null,
"allowed": true,
"falsePages": null,
"last": 0,
"style1": null,
"style2": null,
"style3": null,

// FOR SWIPE/DRAG

"sx": 0, "sy": 0,
"ex": 0, "ey": 0,
"x": 0, "y": 0,
"dx": 0, "dy": 0,
"lastMove": null,
"t": false,
"dragging": false,
"canSnap": false

};

function carousel_setListeners() {
    document.querySelector(".carousel-btnR").addEventListener("click", carousel_btnRClicked);
    document.querySelector(".carousel-btnL").addEventListener("click", carousel_btnLClicked);

    if (carousel.useKeys) {
       document.addEventListener("keydown", carousel_keydn);
    }
}


function carousel_keydn(event) {
	switch(event.keyCode) {
		case 37: // Left
			carousel_btnLClicked();
			break;
		case 39: // Right
			carousel_btnRClicked();
			break;
	}
}



// create each slider page and respective elements, and edit variables appropriately
function carousel_createPages() {
    if (carousel.rtl) {
        carousel.pages.reverse();
    }

    if ((carousel.swipe && carousel.scrollType === 0) || (carousel.swipe && carousel.allowOtherSwipe)) {
        var overlay = document.createElement("DIV");
        overlay.style.height = "calc(100% - "+carousel.bottomSafeZone+""+carousel.safeUnits+")"; //document.querySelector("."+carousel.mainId).style.height
        overlay.style.width = "inherit";
        overlay.style.zIndex = "99";
        overlay.style.position = "absolute";
        document.querySelector(carousel.mainId).appendChild(overlay);
        overlay.classList.add("carousel-swipe-overlay");

        document.querySelector(".carousel-swipe-overlay").addEventListener("mousedown", carousel_tStart, false);
        document.querySelector(".carousel-swipe-overlay").addEventListener("touchstart", carousel_setTouch, false);
        // document.querySelector(".carousel-swipe-overlay").addEventListener("touchstart", carousel_tStart);
    }

    // create a style ".carousel-transition" for use in movements (does not need to be edited by the user)
    carousel.style1 = document.createElement("style");
    carousel.style1.setAttribute("type", "text/css");
    if (carousel.scrollType === 2) {
        carousel.style1.innerHTML = ".carousel-transition { transition: left "+carousel.transition+"s, opacity "+carousel.transition+"s, background-position "+carousel.transition+"s; }";
    } else {
        carousel.style1.innerHTML = ".carousel-transition { transition: left "+carousel.transition+"s; }";
    }
    document.getElementsByTagName("head")[0].appendChild(carousel.style1);

    // Create internal styles to cut down on copy-pasta
    if (carousel.createInternalStyles) {
        carousel.style2 = document.createElement("style");
        carousel.style2.setAttribute("type", "text/css");
        carousel.style2.innerHTML = ".carousel-image {height: 100%; width: 100%; background-position: calc(center + 300px) center; background-size: cover; top: 0; position: absolute;} .carousel-page-wrap {height: 100%; width: 100%; top: 0; left: 0; position: absolute;} .carousel-wrap {overflow: hidden;}";
        document.getElementsByTagName("head")[0].appendChild(carousel.style2);
    }

    // if user did not supply enough slides, double them for compatibility
    if (carousel.pages.length === 2) {
        carousel.pages.push(carousel.pages[0]);
        carousel.pages.push(carousel.pages[1]);
        carousel.falsePages = 2;
    } else if (carousel.pages.length === 3) {
        carousel.pages.push(carousel.pages[0]);
        carousel.pages.push(carousel.pages[1]);
        carousel.pages.push(carousel.pages[2]);
        carousel.falsePages = 3;
    }

    // create each page
    for (var a = 0; a < carousel.pages.length; a++) {
        var pg = document.createElement("DIV");
        pg.classList.add("carousel-image");
        pg.classList.add("carousel-image-"+a);
        pg.classList.add("carousel-transition");
        document.querySelector(".carousel-page-wrap").appendChild(pg);
        pg.style.backgroundImage = "url('"+carousel.pages[a]+"')";

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
                    pg.style.backgroundPosition = carousel.fadeInOffset+carousel.fadeOffsetUnits+" center";
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
                document.querySelector(".carousel-bubble-"+a).addEventListener("click", carousel_bubbleNav);
                document.querySelector(".carousel-bubble-0").classList.add("carousel-active-bubble");
            }
        }
    }
}

// specific event for when the navigate right button is physically clicked, right arrow pressed, or swiped; throttling handled
function carousel_btnRClicked() { 
    carousel_resetScrollTimeout();
    if (carousel.allowed) {
        carousel_btnR();
        if (carousel.throttle) {
            carousel.allowed = false;
            setTimeout(function() {
                carousel.allowed = true;
            }, carousel.throttleTimeout);
        }
    }
}

// specific event for when the navigate left button is physically clicked, right arrow pressed, or swiped; throttling handled
function carousel_btnLClicked() { 
    carousel_resetScrollTimeout();
    if (carousel.allowed) {
        carousel_btnL();
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
function carousel_btnR() { 
    switch (carousel.scrollType) {
        case 0: // static
            if (!carousel.infinite && carousel.order[1] === carousel.last) {            
            } else {
                carousel_orderShift("r");
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
                        carousel_orderShift("r");
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
                        carousel_orderShift("r");
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
                        carousel_orderShift("r");
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
            if (!carousel.infinite && carousel.order[1] === carousel.last) {            
            } else {
                carousel_orderShift("r");
                document.querySelector(".carousel-image-"+carousel.order[0]).style.opacity = "0";
                document.querySelector(".carousel-image-"+carousel.order[0]).style.backgroundPosition = carousel.fadeOutOffset+carousel.fadeOffsetUnits+" center";

                document.querySelector(".carousel-image-"+carousel.order[2]).style.backgroundPosition = carousel.fadeInOffset+carousel.fadeOffsetUnits+" center";

                document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity = "1";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.backgroundPosition = "center center";
            }
            break;
    }// end of scrolltype switch

    if (carousel.radioBubbles && carousel.falsePages === null) {
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.remove("carousel-inactive-bubble");

        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.remove("carousel-active-bubble");
    } else if (carousel.radioBubbles) {
        carousel_fakeBubbles();
    }
}

// advance the slider as if the left button were clicked
function carousel_btnL() { 
    switch (carousel.scrollType) {
        case 0: // static
            if (!carousel.infinite && carousel.order[1] === 0) {
            } else {
                carousel_orderShift("l");
                document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                document.querySelector(".carousel-image-"+arr_last(carousel.static)).style.opacity="0";
                document.querySelector(".carousel-image-"+arr_last(carousel.static)).style.left="0%";

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
                        carousel_orderShift("l");
                        document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity="1";
                        document.querySelector(".carousel-image-"+arr_last(carousel.static)).style.opacity="0";
                        document.querySelector(".carousel-image-"+arr_last(carousel.static)).style.left="0%";
    
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
                        carousel_orderShift("l");
                        document.querySelector(".carousel-image-"+arr_last(carousel.static)).style.opacity="0";
                        document.querySelector(".carousel-image-"+arr_last(carousel.static)).style.left="0%";
                        
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
                        carousel_orderShift("l");
                        document.querySelector(".carousel-image-"+arr_last(carousel.static)).style.opacity="0";
                        document.querySelector(".carousel-image-"+arr_last(carousel.static)).style.left="0%";
                        
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
            if (!carousel.infinite && carousel.order[1] === carousel.last) {            
            } else {
                carousel_orderShift("l");
                document.querySelector(".carousel-image-"+carousel.order[2]).style.opacity = "0";
                document.querySelector(".carousel-image-"+carousel.order[2]).style.backgroundPosition = carousel.fadeInOffset+carousel.fadeOffsetUnits+" center";

                document.querySelector(".carousel-image-"+carousel.order[0]).style.backgroundPosition = carousel.fadeOutOffset+carousel.fadeOffsetUnits+" center";

                document.querySelector(".carousel-image-"+carousel.order[1]).style.opacity = "1";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.backgroundPosition = "center center";
            }
            break;
    }// end of scrolltype switch

    if (carousel.radioBubbles && carousel.falsePages === null) {
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.remove("carousel-inactive-bubble");

        document.querySelector(".carousel-bubble-"+carousel.order[2]).classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[2]).classList.remove("carousel-active-bubble");
    } else if (carousel.radioBubbles) {
        carousel_fakeBubbles();
    }
}


//======================================================================

// ADDITIONAL NAVIGATION FUNCTIONS

//======================================================================


// display bubbles correctly when not enough pages have been supplied, so more were generated
function carousel_fakeBubbles() {
    if ((carousel.order[1] === 0 || carousel.order[1] === 2) && carousel.falsePages === 2) {
        document.querySelector(".carousel-bubble-0").classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-0").classList.remove("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-1").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-1").classList.remove("carousel-active-bubble");
    } else if (carousel.falsePages === 2) {
        document.querySelector(".carousel-bubble-0").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-0").classList.remove("carousel-active-bubble");
        document.querySelector(".carousel-bubble-1").classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-1").classList.remove("carousel-inactive-bubble");

    } else if ((carousel.order[1] === 0 || carousel.order[1] === 3) && carousel.falsePages === 3) {
        document.querySelector(".carousel-bubble-0").classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-0").classList.remove("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-1").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-1").classList.remove("carousel-active-bubble");
        document.querySelector(".carousel-bubble-2").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-2").classList.remove("carousel-active-bubble");
    } else if (carousel.order[1] === 1 || carousel.order[1] === 4) {
        document.querySelector(".carousel-bubble-0").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-0").classList.remove("carousel-active-bubble");
        document.querySelector(".carousel-bubble-1").classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-1").classList.remove("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-2").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-2").classList.remove("carousel-active-bubble");
    } else if (carousel.order[1] === 2 || carousel.order[1] === 5) {
        document.querySelector(".carousel-bubble-0").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-0").classList.remove("carousel-active-bubble");
        document.querySelector(".carousel-bubble-1").classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-1").classList.remove("carousel-active-bubble");
        document.querySelector(".carousel-bubble-2").classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-2").classList.remove("carousel-inactive-bubble");
    }
}

// specific event for when a radio button is physically clicked
function carousel_bubbleNav() { 
    var cls = this.classList.item(1);
    cls = cls.slice(16, 17);
    
    carousel_resetScrollTimeout();

    cls = parseInt(cls);

    carousel_goToPage(cls);
}

// used by bubble nav functions to go to a specific page, given a parameter from 0 to carousel.last
function carousel_goToPage(place) { 

    // get the distance to move
    var dist = (place - carousel.order[1]);
    var posDist = Math.abs(dist);

    // scroll correctly when fake pages exist
    if (carousel.falsePages != null && posDist >= carousel.falsePages) {
        posDist -= carousel.falsePages;
    }
    if (posDist === 0) {
        console.log("Displacement of 0. Quitting.");
        return;
    }

    // reduce transition time, move first, set movement interval
    if (carousel.scrollType !== 2) {
        carousel.style1.innerHTML = ".carousel-transition { transition: left "+carousel.btnScrollTrans+"s ease-in-out; }";
    }

    if (dist > 0) {
        carousel_btnR();
    }
    if (dist < 0) {
        carousel_btnL();
    }

    var count = 1;
    var moveInt = setInterval(function() {
        if (count >= posDist) {
            clearInterval(moveInt);
            if (carousel.scrollType !== 2) {
                carousel.style1.innerHTML = ".carousel-transition { transition: left "+carousel.transition+"s; }";
            }
        } else {
            if (dist > 0) {
                carousel_btnR();
            }
            if (dist < 0) {
             carousel_btnL();
            }
            count++;
        }
    }, carousel.scrollTrans);
}


//======================================================================

// AUTOSCROLL FUNCTIONS

//======================================================================


// stop the scrolling when a user interacts for a while, then resume autoscroll
function carousel_resetScrollTimeout() { 
    clearTimeout(carousel.scrollTimeout);
    clearInterval(carousel.scrollInt);
    carousel.scrollTimeout = setTimeout(carousel_setAutoScroll, carousel.autoScrollTimeout);
}

// scroll the page
function carousel_scrollAuto() {       
    if (carousel.autoScrollDir === "l") {
        carousel_btnL();
    } else if (carousel.autoScrollDir === "r") {
        carousel_btnR();
    }
}

// start autoscrolling
function carousel_setAutoScroll() {  
    if (carousel.autoScroll) {
        carousel.scrollInt = setInterval(carousel_scrollAuto, carousel.autoScrollSpeed);
    }
}


//======================================================================

// SWIPING

//======================================================================


// if touchscreen is used, a better method is used to track touches
function carousel_setTouch(event) {
    event.preventDefault();
    carousel.t = true;
    carousel_tStart(event);
}

// called once when touch or click starts
function carousel_tStart(event) {
    event.preventDefault();
    carousel.dragging = true;

    // remove transitions to eliminate delayed movement
    document.querySelector(".carousel-image-"+carousel.order[0]).classList.remove("carousel-transition");
    document.querySelector(".carousel-image-"+carousel.order[1]).classList.remove("carousel-transition");
    document.querySelector(".carousel-image-"+carousel.order[2]).classList.remove("carousel-transition");

    document.querySelector(".carousel-image-"+carousel.order[0]).style.opacity = "1";
    document.querySelector(".carousel-image-"+carousel.order[2]).style.opacity = "1";

    // log the first touch position
    carousel.lastMove = event.touches;
    if (carousel.t) {
        carousel.x = event.touches[0].clientX;
        carousel.y = event.touches[0].clientY;
        carousel.sx = event.touches[0].clientX;
        carousel.sy = event.touches[0].clientY;
    } else {
        carousel.x = event.clientX;
        carousel.y = event.clientY;
    
        carousel.sx = event.clientX;
        carousel.sy = event.clientY;
    }

    document.addEventListener("mousemove", carousel_follow, false);
    document.addEventListener("touchmove", carousel_follow, false);
}

// called repeatedly while dragging
function carousel_follow(event) {
    if (carousel.dragging) {

        document.addEventListener("mouseup", carousel_tEnd, false);
        document.addEventListener("touchend", carousel_tEnd, false);
        document.addEventListener("touchcancel", carousel_tCancel, false);

        // capture movements
        if (carousel.t) {
            carousel.x = event.changedTouches[0].clientX;
            carousel.y = event.changedTouches[0].clientY;
        } else {
            carousel.x = event.clientX;
            carousel.y = event.clientY;
        }

        // resistant scrolling
        if (Math.abs(carousel.dx) < document.querySelector(carousel.mainId).offsetWidth && carousel.infinite) {
            carousel.dx = (carousel.x-carousel.sx)*carousel.swipeScale;
            carousel.dy = (carousel.y-carousel.sy)*carousel.swipeScale;
        } else if (carousel.dx < 0) {
            carousel.dx = (carousel.x-carousel.sx)*carousel.swipeScale;
            if (carousel.infinite) {
                carousel.dx -= (carousel.dx + document.querySelector(carousel.mainId).offsetWidth)*carousel.resist;
            } else if (carousel.order[1] === carousel.last) {
                carousel.dx -= (carousel.dx)*carousel.resist;
            }
            carousel.dy = (carousel.y-carousel.sy)*carousel.swipeScale;
        } else if (carousel.dx >= 0) {
            carousel.dx = (carousel.x-carousel.sx)*carousel.swipeScale;
            if (carousel.infinite) {
                carousel.dx -= (carousel.dx - document.querySelector(carousel.mainId).offsetWidth)*carousel.resist;
            } else if (carousel.order[1] === 0) {
                carousel.dx -= (carousel.dx*carousel.resist);
            }
            carousel.dy = (carousel.y-carousel.sy)*carousel.swipeScale;
        }

        // get distance values
        var rawDist = (Math.pow(carousel.dx, 2) + Math.pow(carousel.dy, 2));
        var dist = Math.sqrt(rawDist);

        // if user has swiped far enough, allow movement to next slide
        if (dist >= carousel.swipeDist) {
            carousel.canSnap = true;
        } else {
            carousel.canSnap = false;
        }

        // move slides to the correct position while being dragged
        document.querySelector(".carousel-image-"+carousel.order[0]).style.left = "calc(-100% + "+carousel.dx+"px)";
        document.querySelector(".carousel-image-"+carousel.order[1]).style.left = carousel.dx+"px";
        document.querySelector(".carousel-image-"+carousel.order[2]).style.left = "calc(100% + "+carousel.dx+"px)";
    } else {
        // if not dragging, restore correct values
        document.querySelector(".carousel-image-"+carousel.order[0]).classList.add("carousel-transition");
        document.querySelector(".carousel-image-"+carousel.order[1]).classList.add("carousel-transition");
        document.querySelector(".carousel-image-"+carousel.order[2]).classList.add("carousel-transition");
        document.querySelector(".carousel-image-"+carousel.order[0]).style.left = "-100%";
        document.querySelector(".carousel-image-"+carousel.order[1]).style.left = "0";
        document.querySelector(".carousel-image-"+carousel.order[2]).style.left = "100%";
    }
}

// called once when the touch or click ends
function carousel_tEnd(event) {
    event.preventDefault();
    carousel.dragging = false;

    // log the end of touch position
    if (carousel.t) {
        carousel.ex = event.changedTouches[0].clientX;
        carousel.ey = event.changedTouches[0].clientY;
    } else {
        carousel.ex = event.clientX;
        carousel.ey = event.clientY;
    }

    carousel_snap(carousel.canSnap, carousel.dx);

    carousel_resetSwipeVars();

    document.removeEventListener("mousemove", carousel_follow);
    document.removeEventListener("touchmove", carousel_follow);
}

// when touch is canceled, handle it
function carousel_tCancel(event) {
    event.preventDefault();
    document.querySelector("body").removeEventListener("mouseup", carousel_tEnd, false);
    document.querySelector("body").removeEventListener("touchend", carousel_tEnd, false);
    document.querySelector("body").removeEventListener("touchcancel", carousel_tCancel, false);
}

// snap to a new slide once touch or click ends
function carousel_snap(al, dir) {
    document.querySelector(".carousel-swipe-overlay").removeEventListener("mousedown", carousel_tStart, false);
    document.querySelector(".carousel-swipe-overlay").removeEventListener("touchstart", carousel_setTouch, false);

    document.querySelector(".carousel-image-"+carousel.order[0]).classList.add("carousel-transition");
    document.querySelector(".carousel-image-"+carousel.order[1]).classList.add("carousel-transition");
    document.querySelector(".carousel-image-"+carousel.order[2]).classList.add("carousel-transition");
    if (al) {
        if (dir > 0) {
            carousel_btnLClicked();
        } else if (dir < 0) {
            carousel_btnRClicked();
        }
        setTimeout(function() {
            document.querySelector(".carousel-swipe-overlay").addEventListener("mousedown", carousel_tStart, false);
            document.querySelector(".carousel-swipe-overlay").addEventListener("touchstart", carousel_setTouch, false);
        }, (carousel.scrollTrans - 10));
    } else {
        document.querySelector(".carousel-image-"+carousel.order[0]).style.left = "-100%";
        document.querySelector(".carousel-image-"+carousel.order[1]).style.left = "0";
        document.querySelector(".carousel-image-"+carousel.order[2]).style.left = "100%";
        setTimeout(function() {
            document.querySelector(".carousel-swipe-overlay").addEventListener("mousedown", carousel_tStart, false);
            document.querySelector(".carousel-swipe-overlay").addEventListener("touchstart", carousel_setTouch, false);
        }, 0);
    }
}

// reset all variables to defaults to avoid strange movements when a new touch starts
function carousel_resetSwipeVars() {
    carousel.sx = 0;
    carousel.sy = 0;
    carousel.ex = 0;
    carousel.ey = 0;
    carousel.x = 0;
    carousel.y = 0;
    carousel.dx = 0;
    carousel.dy = 0;
    carousel.lastMove = [];
    carousel.t = false;
    carousel.canSnap = false;
}



//======================================================================

// VARIABLE AND SLIDE SETUP

//======================================================================

function carousel_setupVariables() {
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
            document.querySelector(".carousel-image-"+carousel.order[0]).style.backgroundPosition = carousel.fadeOutOffset+carousel.fadeOffsetUnits+" center";
            break;
    }
}

function carousel_setupStructure() {
    var newStructure = "<div class='carousel-page-wrap'></div> <div class='carousel-nav'> <div class='carousel-bubbles'></div> <div class='carousel-btnR carousel-btn'> "+carousel.navBtns[1]+" </div> <div class='carousel-btnL carousel-btn'> "+carousel.navBtns[0]+" </div> </div>";
    document.querySelector(carousel.mainId).innerHTML = newStructure;

    if (carousel.defaultStyle) {
        carousel.style3 = document.createElement("style");
        carousel.style3.setAttribute("type", "text/css");
        carousel.style3.innerHTML = ".carousel-wrap {height: 700px; width: 1250px; position: absolute; margin: auto; right: 0; left: 0; top: 20px;} .carousel-nav {height: 50px; width: 400px; position: absolute; bottom: 0; margin: auto; left: 0; right: 0; z-index: 10;} .carousel-btnL {height: 50px; width: 50px; left: 0; position: absolute;} .carousel-btnR {height: 50px; width: 50px; right: 0; position: absolute;} .carousel-bubbles {position: absolute; margin: auto; left: 0; right: 0; bottom: 0; top: 0; width: 300px; padding-top: 19px; display: flex; justify-content: space-around;} .carousel-btn svg {filter: invert(100%); cursor: pointer; height: 30px; width: 30px; margin: auto; top: 0; bottom: 0; position: absolute;} .carousel-bubble {height: 8px; width: 8px;	border-radius: 100%; border: 2px solid white; display: inline-block; transition: 0.2s; cursor: pointer;} .carousel-active-bubble {background: white;} .carousel-inactive-bubble {background: transparent;} .carousel-svg-l {right: 0;} .carousel-svg-r {left: 0;}";
        document.getElementsByTagName("head")[0].appendChild(carousel.style3);
        
    }
}

//======================================================================

// FUNCTIONS FOR READABILITY

//======================================================================


function carousel_orderShift(dir) {
    if (dir === "r") {
        carousel.static.unshift(carousel.order[0]);
        carousel.order.push(arr_last(carousel.static));
        carousel.order.shift();
        carousel.static.pop();
    } else if (dir === "l"){
        carousel.static.push(arr_last(carousel.order));
        carousel.order.unshift(carousel.static[0]);
        carousel.order.pop();
        carousel.static.shift();
    }
}


//======================================================================

// INITIAL FUNCTION CALLS

//======================================================================

if (carousel.defaultStyle) {
    carousel.autoGenHtml = true;
}
if (carousel.autoGenHtml) {
    carousel_setupStructure();
}
carousel_setListeners();
carousel_createPages();
carousel_setAutoScroll();
carousel_setupVariables();