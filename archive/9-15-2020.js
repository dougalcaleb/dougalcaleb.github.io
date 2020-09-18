// DATE ARCHIVED: 09/15/2020 8:55 AM
// REASON: SAFETY BACKUP
// WORKING: PARTIAL - ALL WORKING EXCEPT LOW PAGE COUNTS AND FADE TYPE

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

// Todo:
/*
Now:
- Add support for fewer slides
Later:
- Add a "multiple" type (like slick)
- Add linking
- Remove necessity for nav buttons
*/

var carousel = {

// ELEMENTS

"pages": ["images/carousel/numbers/1.png","images/carousel/numbers/2.png","images/carousel/numbers/3.png","images/carousel/numbers/4.png","images/carousel/numbers/5.png","images/carousel/numbers/6.png"],
"mainId": "slider",             // class of the main slider body
"bottomSafeZone": 50,           // distance from the bottom to not have the swipe overlay (safe zone for nav)
"safeUnits": "px",              // units for bottomSafeZone

// BEHAVIORS

"scrollType": 0,                // 0-static scroll | 1-overlapping scroll | 2-fade
"subtype": 0,                   // 0: No subtypes | 1: 0-right overlap 1-left overlap 2-both top | 2: No subtypes
"radioBubbles": true,           // enables radio bubbles
"autoScroll": false,            // scroll slider automatically
"autoScrollSpeed": 5000,        // time in miliseconds between scrolling between pages when autoScroll is true
"autoScrollTimeout": 15000,     // time in miliseconds to resume autoscroll after user interaction with navigation
"autoScrollDir": "r",           // determines the direction the autoscroll scrolls (r or l)
"btnScrollTrans": 0.2,          // time in seconds to change the transition to when a radio button is clicked (for faster scrolling. Deprecated when ease is implemented)
"transition": 0.6,              // time in seconds for transitions between slides
"throttle": true,               // enables user interaction throttling
"throttleTimeout": 300,         // interval to throttle navigation by the user in ms
"throttleMatchTrans": false,    // sets throttleTimeout to cover the transition time. Overrides explicit throttleTimeout value
"useKeys": true,                // enables using l/r arrow keys to navigate
"infinite": true,               // enables infinite scrolling
"swipe": true,                  // enables touch or click-drag scrolling. Only available with type 0
"swipeDist": 300,               // distance swiped required to advance the slider instead of snapping back
"swipeScale": 1.5,              // multiplier for movement when swiping
"resist": 0.95,                 // resistance multiplier after dragging past the end when enableSwipe is true (0=none 1=stop)
"rtl": false,                   // flips direction of slides

// todo
"fadeOffset": 20,               // movement of the new slide when scrollType is 2

// NOT EDITABLE

"order": [],
"static": [],
"scrollTimeout": null,
"scrollTrans": 0,
"scrollInt": null,
"allowed": true,
"falsePages": null,
"last": 0,
"style": null,

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

document.querySelector(".carousel-btnR").addEventListener("click", btnRClicked);
document.querySelector(".carousel-btnL").addEventListener("click", btnLClicked);

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

    if (carousel.rtl) {
        carousel.pages.reverse();
    }

    if (carousel.swipe && carousel.scrollType === 0) {
        var overlay = document.createElement("DIV");
        overlay.style.height = "calc(100% - "+carousel.bottomSafeZone+""+carousel.safeUnits+")"; //document.querySelector("."+carousel.mainId).style.height
        overlay.style.width = "inherit";
        overlay.style.zIndex = "99";
        overlay.style.position = "absolute";
        document.querySelector("."+carousel.mainId).appendChild(overlay);
        overlay.classList.add("carousel-swipe-overlay");

        document.querySelector(".carousel-swipe-overlay").addEventListener("mousedown", carousel_tStart);
        document.querySelector(".carousel-swipe-overlay").addEventListener("touchstart", carousel_setTouch);
    }

    // create a style "".carousel-transition" for use in movements (does not need to be edited by the user)
    carousel.style = document.createElement("style");
    carousel.style.setAttribute("type", "text/css");
    carousel.style.innerHTML = ".carousel-transition { transition: left "+carousel.transition+"s; }";
    document.getElementsByTagName("head")[0].appendChild(carousel.style);

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

// specific event for when the navigate right button is physically clicked, right arrow pressed, or swiped; throttling handled
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

// specific event for when the navigate left button is physically clicked, right arrow pressed, or swiped; throttling handled
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

    // Reduce transition time, move first, set movement interval
    carousel.style.innerHTML = ".carousel-transition { transition: left "+carousel.btnScrollTrans+"s ease-in-out; }";


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
            carousel.style.innerHTML = ".carousel-transition { transition: left "+carousel.transition+"s; }";
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

// SWIPING

//======================================================================


// if touchscreen is used, a better method is used to track touches
function carousel_setTouch(event) {
    carousel.t = true;
    carousel_tStart(event);
}

// called once when touch or click starts
function carousel_tStart(event) {
    carousel.dragging = true;

    // remove transitions to eliminate delayed movement
    document.querySelector(".carousel-image-"+carousel.order[0]).classList.remove("carousel-transition");
    document.querySelector(".carousel-image-"+carousel.order[1]).classList.remove("carousel-transition");
    document.querySelector(".carousel-image-"+carousel.order[2]).classList.remove("carousel-transition");

    document.querySelector(".carousel-image-"+carousel.order[0]).style.opacity = "1";
    document.querySelector(".carousel-image-"+carousel.order[2]).style.opacity = "1";
    
    // console.log("Start touch:");
    // console.log(event.touches);

    carousel.lastMove = event.touches;

    // log the first touch position
    if (carousel.t) {
        carousel.x = carousel.lastMove[0].clientX;
        carousel.y = carousel.lastMove[0].clientY;
        carousel.sx = carousel.lastMove[0].clientX;
        carousel.sy = carousel.lastMove[0].clientY;
    } else {
        carousel.x = event.clientX;
        carousel.y = event.clientY;
    
        carousel.sx = event.clientX;
        carousel.sy = event.clientY;
    }

    document.addEventListener("mousemove", carousel_follow);
    document.addEventListener("touchmove", carousel_follow);
}

// called repeatedly while dragging
function carousel_follow(event) {
    if (carousel.dragging) {

        document.addEventListener("mouseup", carousel_tEnd);
        document.addEventListener("touchend", carousel_tEnd);

        // capture touches, cannot capture once touch has already ended
        lastMove = event.touches;

        if (carousel.t) {
            carousel.x = event.touches[0].clientX;
            carousel.y = event.touches[0].clientY;
        } else {
            carousel.x = event.clientX;
            carousel.y = event.clientY;
        }

        // resistant scrolling
        if (Math.abs(carousel.dx) < document.querySelector("."+carousel.mainId).offsetWidth && carousel.infinite) {
            carousel.dx = (carousel.x-carousel.sx)*carousel.swipeScale;
            carousel.dy = (carousel.y-carousel.sy)*carousel.swipeScale;
        } else if (carousel.dx < 0) {
            carousel.dx = (carousel.x-carousel.sx)*carousel.swipeScale;
            if (carousel.infinite) {
                carousel.dx -= (carousel.dx + document.querySelector("."+carousel.mainId).offsetWidth)*carousel.resist;
            } else if (carousel.order[1] === carousel.last) {
                carousel.dx -= (carousel.dx)*carousel.resist;
            }
            carousel.dy = (carousel.y-carousel.sy)*carousel.swipeScale;
        } else if (carousel.dx >= 0) {
            carousel.dx = (carousel.x-carousel.sx)*carousel.swipeScale;
            if (carousel.infinite) {
                carousel.dx -= (carousel.dx - document.querySelector("."+carousel.mainId).offsetWidth)*carousel.resist;
            } else if (carousel.order[1] === 0) {
                carousel.dx -= (carousel.dx*carousel.resist);
            }
            carousel.dy = (carousel.y-carousel.sy)*carousel.swipeScale;
        }

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
    document.querySelector("body").removeEventListener("mouseup", carousel_tEnd);
    document.querySelector("body").removeEventListener("touchend", carousel_tEnd);
    carousel.dragging = false;

    // log the end of touch position
    if (carousel.t) {
        carousel.ex = lastMove[0].clientX;
        carousel.ey = lastMove[0].clientY;
    } else {
        carousel.ex = event.clientX;
        carousel.ey = event.clientY;
    }

    carousel_snap(carousel.canSnap, carousel.dx);

    resetSwipeVars();

    document.removeEventListener("mousemove", carousel_follow);
    document.removeEventListener("touchmove", carousel_follow);
}

// snap to a new slide once touch or click ends
function carousel_snap(al, dir) {
    document.querySelector(".carousel-image-"+carousel.order[0]).classList.add("carousel-transition");
    document.querySelector(".carousel-image-"+carousel.order[1]).classList.add("carousel-transition");
    document.querySelector(".carousel-image-"+carousel.order[2]).classList.add("carousel-transition");
    if (al) {
        if (dir > 0) {
            btnLClicked();
        } else if (dir < 0) {
            btnRClicked();
        }
    } else {
        document.querySelector(".carousel-image-"+carousel.order[0]).style.left = "-100%";
        document.querySelector(".carousel-image-"+carousel.order[1]).style.left = "0";
        document.querySelector(".carousel-image-"+carousel.order[2]).style.left = "100%";
    }
}

function resetSwipeVars() {
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

// console.log("Order (initial):");
// console.log(carousel.order);

// console.log("Static (initial):");
// console.log(carousel.static);