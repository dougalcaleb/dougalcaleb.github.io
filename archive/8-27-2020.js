// DATE ARCHIVED: 08/27/2020 9:04 PM
// REASON: EXTRANEOUS CODE CLEANUP
// WORKING: YES


// SETUP

/*
FORKING:

- Copy all code in this page
- Copy ".carousel-bubble", ".carousel-bubbles" and ".carousel-promotion-text" css at minimum (for default look)
- Have a ".carousel-btnL" and ".carousel-btnR" button accessible by the user
- Does not require radio bubbles, but set radioBubbles to false if not including them to avoid errors
- Slider must have: 
    a) A master wrap that defines the size of the slider with hidden overflow, everything is put inside this wrap including static navigation
    b) A page wrap inside (".carousel-page-wrap") to place the image pages in that scrolls freely inside the master wrap and which the pages are appended to
    c) A navigation with left and right buttons (".carousel-btnL" and ".carousel-btnR")
- Optional but recommended:
    a) A wrap for the radio buttons (".carousel-bubbles" and/or ".carousel-nav")

EDITING PAGES:

- To add an image, paste the URL into the 'pages' array in the order you want them to appear and add promotion text and styling
- To remove an image page, delete its URL and corresponding text and text styling
- The radio buttons are generated here, no HTML editing required
- The CSS of the buttons and bubbles can be edited safely
*/

// To do:
/*
- Add different type of sliders
- Add drag support
*/


var carousel = {

// RAW PROPERTIES

"pages": ["images/carousel/slide-outdated-1-1.jpg","images/carousel/slide-outdated-1-2.jpg","images/carousel/slide-outdated-1-3.jpg","images/carousel/slide-outdated-1-4.jpg"],
"text": [],
"textStyle": [ // top, left, font, color, width
    []
],

// FINER PROPERTIES

"promoText": false,          // enables promotional text
"radioBubbles": true,        // enables radio bubbles
"autoScroll": false,         // scroll slider automatically
"autoScrollSpeed": 5000,     // time in miliseconds between scrolling between pages when autoScroll is true
"autoScrollTimeout": 15000,  // time in miliseconds to resume autoscroll after user interaction with navigation
"transition": 0.5,           // time in seconds for transitions
"scrollType": 0,             // 0 > static scroll | 1 > overlapping scroll | 2 > fade | x 3 > fade+movement

"fadeOffset": 20,            // movement of the new slide when scrollType is 2
"useExtraCss": false,        // enables using different classes for elements for a wider range of visuals. radio buttons: carousel-active-bubble, carousel-inactive-bubble
"enableDrag": false,         // enables touch or click-drag scrolling
"infinite": true,            // enables infinite or limited scrolling
"throttle": true,            // enables user interaction throttling
"throttleTimeout": 300,      // interval to throttle clicks in ms
"throttleMatchTrans": true,  // sets throttleTimeout to cover the transition time. Overrides explicit throttleTimeout value

// NOT EDITABLE

"margin": [],
"ids": [],
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
            if (carousel.useExtraCss) {
                document.querySelector(".carousel-bubble-0").classList.add("carousel-active-bubble");
            } else {
                document.querySelector(".carousel-bubble-0").style.background = "white";
            }
        }
    }
    switch (carousel.scrollType) {
        case 0: // static
            // document.querySelector(".carousel-image-0").classList.add("carousel-active");
            document.querySelector(".carousel-image-0").style.left = "0%";
            // document.querySelector(".carousel-image-1").classList.add("carousel-right");
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
    } else {

    }
}
 
function btnLClicked() { // specific event for when the navigate left button is physically clicked
    resetScrollTimeout();
    btnL();
}


function btnR() { // advance the slider as if the right button were clicked

    carousel.pMargin -= 100;

    switch (carousel.scrollType) {
        case 0: // static

            console.log("start: "+carousel.page);
            if (carousel.page < (carousel.pages.length-1)) {
                document.querySelector(".carousel-image-"+(carousel.page+1)).style.zIndex = "5";
                document.querySelector(".carousel-image-"+(carousel.page+1)).style.transition = carousel.transition+"s";
            } else {
                document.querySelector(".carousel-image-0").style.zIndex = "5";
            }
            if ((!carousel.infinite && carousel.page < carousel.pages.length-1) || (carousel.infinite && carousel.page !== carousel.pages.length-1)) {
                document.querySelector(".carousel-image-"+carousel.page).style.left = "-100%";
                document.querySelector(".carousel-image-"+(carousel.page+1)).style.left = "0%";
            }
            if ((carousel.infinite) && (carousel.page === carousel.pages.length-1)) {
                document.querySelector(".carousel-image-"+(carousel.pages.length-1)).style.left = "-100%";
                document.querySelector(".carousel-image-0").style.left = "0%";
            }
            if (carousel.page === (carousel.pages.length-1)) {
                carousel.page = 0;
            } else {
                carousel.page++;
                carousel.pos++;
            }

            carousel.ids.push(carousel.page);
            carousel.ids.shift();
            console.log("moving page "+carousel.ids[0]+" to right side. full: "+carousel.ids);
            document.querySelector(".carousel-image-"+carousel.ids[1]).style.zIndex = "1";
            document.querySelector(".carousel-image-"+carousel.ids[1]).style.transition = "0";
            document.querySelector(".carousel-image-"+carousel.ids[0]).style.left = "100%";

            // move the two pages seen
            // document.querySelector(".carousel-active").style.left = "-100%";
            // document.querySelector(".carousel-right").style.left = "0%";

            // alter classes
            // document.querySelector(".carousel-active").classList.add("carousel-left");
            // document.querySelector(".carousel-left").classList.remove("carousel-active");

            // document.querySelector(".carousel-right").classList.add("carousel-active");
            // document.querySelector(".carousel-active").classList.remove("carousel-right");

            // // document.querySelector(".carousel-left").style.left = "-100%";            

            // // add+remove right and left class
            // if (document.querySelector(".carousel-image-"+(carousel.page-1)) != null) {
            //     document.querySelector(".carousel-image-"+(carousel.page-1)).classList.remove("carousel-left");
            // }
            // if (document.querySelector(".carousel-image-"+(carousel.page+2)) != null) {
            //     document.querySelector(".carousel-image-"+(carousel.page+2)).classList.add("carousel-right");
            // }
            


            // if (carousel.infinite) {
            //     document.querySelector(".carousel-image-"+carousel.page).style.left = (carousel.pages.length * 100) + "%";
            //     document.querySelector(".carousel-page-wrap").style.left = carousel.pmargin + "%";
            // }

            break;
        case 1: // overlap
            break;
        case 2: // fade
            break;
    }































/*
    if (carousel.page < carousel.pages.length && !carousel.infinite) {

        switch (carousel.scrollType) {
            case 0: // static scroll
                carousel.pmargin -= 100;
                document.querySelector(".carousel-page-wrap").style.left = carousel.pmargin + "%";
                break;
            case 1: // overlap scroll
                document.querySelector(".carousel-image-"+carousel.page).style.left = "0%";
                break;
            case 2: // fade
                document.querySelector(".carousel-image-"+(carousel.page-1)).style.opacity = 0;
                document.querySelector(".carousel-image-"+carousel.page).style.opacity = 1;
                break;
        }
        
        if (carousel.radioBubbles) {
            if (carousel.useExtraCss) {
                document.querySelector(".carousel-bubble-"+carousel.page).classList.add("carousel-active-bubble");
                document.querySelector(".carousel-bubble-"+(carousel.page-1)).classList.add("carousel-inactive-bubble");
            } else {
                document.querySelector(".carousel-bubble-"+carousel.page).style.background = "white";
                document.querySelector(".carousel-bubble-"+(carousel.page-1)).style.background = "transparent";
            }
        }

        

    } else if (carousel.infinite) {

        var backToStart = false;
        if (carousel.page % carousel.pages.length === 0) {
            backToStart = true;
        }

        // console.log(carousel.page);

        switch (carousel.scrollType) {
            case 0: // static scroll
                carousel.pmargin -= 100;
                document.querySelector(".carousel-page-wrap").style.left = carousel.pmargin + "%";
                break;
            case 1: // overlap scroll
                // new page movement
                document.querySelector(".carousel-image-"+(carousel.page - carousel.loop * 4)).style.left = "0%";
                document.querySelector(".carousel-image-"+(carousel.page - carousel.loop * 4)).style.zIndex = 2;

                // old page movement
                if (backToStart) {// when going to start
                    document.querySelector(".carousel-image-0").style.zIndex = 1;
                    document.querySelector(".carousel-image-0").style.left = "100%";
                    document.querySelector(".carousel-image-"+(carousel.pages.length-1)).style.zIndex = 1;
                } else { // normal
                    document.querySelector(".carousel-image-"+((carousel.page - carousel.loop * 4) - 1)).style.zIndex = 1;
                    var transTimeToMs = (carousel.transition * 1000);
                    // console.log(transTimeToMs);
                    var tempPage = (carousel.page / 1);
                    var tempLoop = (carousel.loop / 1);
                    setTimeout(function() {
                        // document.querySelector(".carousel-image-"+((tempPage - tempLoop * 4) - 1)).style.transition = "0s";
                        document.querySelector(".carousel-image-"+((tempPage - tempLoop * 4) - 1)).style.left = "100%";
                    //     setTimeout(function() {
                    //         document.querySelector(".carousel-image-"+((tempPage - tempLoop * 4) - 1)).style.transition = carousel.transition+"s";
                    //     }, transTimeToMs);
                    }, transTimeToMs);
                }
                
                // 
                // if (document.querySelector(".carousel-image-"+((carousel.page - carousel.loop * 4) - 2)) != undefined) {
                //     console.log("Can move image "+((carousel.page - carousel.loop * 4) - 2)+" to left");
                //     document.querySelector(".carousel-image-"+((carousel.page - carousel.loop * 4) - 2)).style.left = "100%";
                // }
                break;
            case 2: // fade
                if (backToStart) {
                    document.querySelector(".carousel-image-"+(carousel.pages.length-1)).style.opacity = 0;
                    document.querySelector(".carousel-image-0").style.opacity = 1;
                } else {
                    document.querySelector(".carousel-image-"+((carousel.page - carousel.loop * 4) - 1)).style.opacity = 0;
                    document.querySelector(".carousel-image-"+(carousel.page - carousel.loop * 4)).style.opacity = 1;
                }
                
                break;
        }*/
        
        if (carousel.radioBubbles) {
            if (carousel.useExtraCss) {
                if (backToStart) {
                    document.querySelector(".carousel-bubble-"+((carousel.page - carousel.loop * 4) +1)).classList.add("carousel-active-bubble");
                    document.querySelector(".carousel-bubble-"+(carousel.page - carousel.loop * 4)).classList.add("carousel-inactive-bubble");
                } else {
                    document.querySelector(".carousel-bubble-"+(carousel.page+1)).classList.add("carousel-active-bubble");
                    document.querySelector(".carousel-bubble-"+carousel.page).classList.add("carousel-inactive-bubble");
                }
            } else {
                // if (backToStart) {
                    document.querySelector(".carousel-bubble-0").style.background = "white";
                    document.querySelector(".carousel-bubble-"+(carousel.pages.length - 1)).style.background = "transparent";
                // } else {
                //     document.querySelector(".carousel-bubble-"+(carousel.page - carousel.loop * 4)).style.background = "white";
                //     document.querySelector(".carousel-bubble-"+((carousel.page - carousel.loop * 4) - 1)).style.background = "transparent";
                // }
            }
        }
    // }
    // carousel.page++;
    if (carousel.page % carousel.pages.length === 0) {
        carousel.loop++;
        // carousel.page = 0;
    }
    console.log("end: "+carousel.page);
}

function btnL() { // advance the slider as if the left button were clicked
    if (carousel.page > 0) {

        switch (carousel.scrollType) {
            case 0: // static scroll
                carousel.pmargin += 100;
                document.querySelector(".carousel-page-wrap").style.left = carousel.pmargin + "%";
                break;
            case 1: // overlap scroll
                document.querySelector(".carousel-image-"+(carousel.page-1)).style.left = "100%";
                break;
            case 2: // fade
                document.querySelector(".carousel-image-"+(carousel.page-2)).style.opacity = 1;
                // console.log("Set page "+(carousel.page-1)+" to be visible, setting page "+(carousel.page)+" to be transparent. Maximum distance traveled is "+(carousel.pages.length));
                
                if (carousel.page < (carousel.pages.length+1)) {
                    document.querySelector(".carousel-image-"+(carousel.page-1)).style.opacity = 0;
                }
                break;
        }

        carousel.page--;
        if (carousel.radioBubbles) {
            if (carousel.useExtraCss) {
                document.querySelector(".carousel-bubble-"+(carousel.page-1)).classList.add("carousel-active-bubble");
                document.querySelector(".carousel-bubble-"+carousel.page).classList.add("carousel-inactive-bubble");
            } else {
                document.querySelector(".carousel-bubble-"+(carousel.page-1)).style.background = "white";
                document.querySelector(".carousel-bubble-"+carousel.page).style.background = "transparent";
            }
        }
    }



















    






























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
    carousel.ids = [(carousel.pages.length-2),(carousel.pages.length-1),0];
    if (carousel.throttleMatchTrans) {
        carousel.throttleTimeout = (carousel.transition * 1000);
    }
}

createPages();
setAutoScroll();
setupVariables();