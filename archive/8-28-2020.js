// DATE ARCHIVED: 08/28/2020 10:20 AM
// REASON: SAFETY BACKUP
// WORKING: PARTIAL - RADIO BUTTON ON RIGHT CLICK HAS ISSUES

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
- Find a way to use order instead of ids. Need to get min method-0 down to 3 pages for sure, 2 if possible

- Add different type of sliders
- Add drag support
*/


var carousel = {

// ELEMENTS

"pages": ["images/carousel/slide-outdated-1-1.jpg","images/carousel/slide-outdated-1-2.jpg","images/carousel/slide-outdated-1-3.jpg"], //,"images/carousel/slide-outdated-1-4.jpg"
"text": [],
"textStyle": [ // top, left, font, color, width
    []
],

// BEHAVIORS

// done
"promoText": false,          // enables promotional text
"radioBubbles": true,        // enables radio bubbles
"autoScroll": false,         // scroll slider automatically
"autoScrollSpeed": 5000,     // time in miliseconds between scrolling between pages when autoScroll is true
"autoScrollTimeout": 15000,  // time in miliseconds to resume autoscroll after user interaction with navigation
"transition": 0.6,           // time in seconds for transitions
"scrollType": 0,             // 0 > static scroll | 1 > overlapping scroll | 2 > fade | x 3 > fade+movement
"throttle": true,            // enables user interaction throttling
"throttleTimeout": 300,      // interval to throttle clicks in ms
"throttleMatchTrans": true,  // sets throttleTimeout to cover the transition time. Overrides explicit throttleTimeout value
// in progress
"infinite": true,            // enables infinite or limited scrolling
"useKeys": true,             // enables using l/r arrow keys to navigate
// todo
"fadeOffset": 20,            // movement of the new slide when scrollType is 2
"enableDrag": false,         // enables touch or click-drag scrolling

// NOT EDITABLE

"margin": [],
"ids": [],
"order": [],
"pmargin": 0,
"page": 0,
"pos": 0,
"loop": 0,
"scrollTimeout": null,
"scrollInt": null,
"allowed": true

};


// LEFT & RIGHT BUTTON CLICK EVENTS

document.querySelector(".carousel-btnR").addEventListener("click", btnRClicked);
document.querySelector(".carousel-btnL").addEventListener("click", btnLClicked);
// Bubble event listener is inside "createPages()" in the "if (carousel.radioBubbles)" statement, currently line 124.

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


// FUNCTIONS


function createPages() { // create each slider page, corresponding text, and a corresponding radio bubble
    for (var a = 0; a < carousel.pages.length; a++) {
        var pg = document.createElement("DIV");
        pg.classList.add("carousel-image");
        pg.classList.add("carousel-image-"+a);
        document.querySelector(".carousel-page-wrap").appendChild(pg);
        pg.style.backgroundImage = "url('"+carousel.pages[a]+"')";
        pg.style.transition = carousel.transition+"s";

        switch (carousel.scrollType) {
            case 0: // static
                // pg.style.left = ((100 * a) + "%");
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

        if (carousel.radioBubbles) {
            var bub = document.createElement("DIV");
            bub.classList.add("carousel-bubble");
            bub.classList.add("carousel-bubble-"+a);
            document.querySelector(".carousel-bubbles").appendChild(bub);
            document.querySelector(".carousel-bubble-"+a).addEventListener("click", bubbleNav);
            document.querySelector(".carousel-bubble-0").classList.add("carousel-active-bubble");
        }
    }
    switch (carousel.scrollType) {
        case 0: // static
            document.querySelector(".carousel-image-0").style.left = "0%";
            document.querySelector(".carousel-image-0").style.zIndex = "5";
            document.querySelector(".carousel-image-"+(carousel.pages.length-1)).style.left = "-100%";
            break;
        case 1: // overlap
            break;
        case 2: // fade
            break;
    }
}


function btnRClicked() { // specific event for when the navigate right button is physically clicked
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
 
function btnLClicked() { // specific event for when the navigate left button is physically clicked
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


function btnR() { // advance the slider as if the right button were clicked
    switch (carousel.scrollType) {
        case 0: // static
            if (carousel.page < (carousel.pages.length-1)) {
                document.querySelector(".carousel-image-"+(carousel.page+1)).style.zIndex = "5";
                document.querySelector(".carousel-image-"+(carousel.page+1)).style.visibility = "visible";
                // document.querySelector(".carousel-image-"+(carousel.page+1)).style.transition = carousel.transition+"s";
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
                // carousel.ids.shift();
                // carousel.ids.push(carousel.order[1]);
                // document.querySelector(".carousel-image-"+last(carousel.order)).style.zIndex = "3";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.zIndex = "3";
                document.querySelector(".carousel-image-"+carousel.order[1]).style.left = "100%";
            }
            break;
        case 1: // overlap
            break;
        case 2: // fade
            break;
    }// end of scrolltype switch

    if (carousel.radioBubbles) {
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.remove("carousel-active-bubble");
        
        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.remove("carousel-inactive-bubble");
        // console.log(carousel.order);
    }
    console.log("order: "+carousel.order);
    console.log("ids: "+carousel.ids);
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
                // carousel.ids.unshift(carousel.order[carousel.pages.length-2]);
                // carousel.ids.pop();
                document.querySelector(".carousel-image-"+last(carousel.order)).style.zIndex = "3";
                // document.querySelector(".carousel-image-"+last(carousel.order)).style.visibility = "hidden";
                document.querySelector(".carousel-image-"+last(carousel.order)).style.left = "-100%";
                // document.querySelector(".carousel-image-"+carousel.order[(carousel.order.length-2)]).style.visibility = "hidden";
                // document.querySelector(".carousel-image-"+carousel.ids[1]).style.left = "-100%";
            }
            
            break;
        case 1: // overlap
            break;
        case 2: // fade
            break;
    }// end of scrolltype switch

    if (carousel.radioBubbles) {
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.add("carousel-inactive-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[1]).classList.remove("carousel-active-bubble");

        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.add("carousel-active-bubble");
        document.querySelector(".carousel-bubble-"+carousel.order[0]).classList.remove("carousel-inactive-bubble");
    }
    // console.log("order: "+carousel.order);
    // console.log("ids: "+carousel.ids);
}


function bubbleNav() { // specific event for when a radio button is physically clicked
    var cls = this.classList.item(1);
    cls = cls.slice(16, 17);
    
    resetScrollTimeout();

    cls = parseInt(cls);

    if (carousel.infinite) {
        cls += carousel.loop*4;
    }

    goToPage(cls);
}

function goToPage(place) { // used by several functions to go to a specific page, given a parameter from 0 to pages.length-1

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


// AUTOSCROLL FUNCTIONS


function resetScrollTimeout() { // stop the scrolling when a user interacts for a while, then resume autoscroll
    clearTimeout(carousel.scrollTimeout);
    clearInterval(carousel.scrollInt);
    carousel.scrollTimeout = setTimeout(setAutoScroll, carousel.autoScrollTimeout);
}

function scrollAuto() { // scroll the page
    if (carousel.page < carousel.pages.length) {        
        btnR();
    } else {
        goToPage(0);
    }
}

function setAutoScroll() {  // start autoscrolling
    if (carousel.autoScroll) {
        carousel.scrollInt = setInterval(scrollAuto, carousel.autoScrollSpeed);
    }
}

function setupVariables() {
    // carousel.ids = [(carousel.pages.length-2),(carousel.pages.length-1),0];
    for (var a = 0; a < carousel.pages.length; a++) {
        carousel.ids.push(a);
        carousel.order.push(a);
    }
    carousel.ids.unshift(carousel.ids.pop());
    carousel.ids.unshift(carousel.ids.pop());
    if (carousel.throttleMatchTrans) {
        carousel.throttleTimeout = (carousel.transition * 1000);
    }
}

function last(arr) {
    return arr[arr.length-1];
}

createPages();
setAutoScroll();
setupVariables();