// editable vs non-editable values seperated by a line break, editable on top

let bubbles = {
    x: 40,              // bubble count on x axis
    y: 40,              // bubble count on y axis
    size: 6,            // size of bubbles in px
    space: 6,           // space between bubbles in px
    color: "orange",    // normal color of bubbles
    active: "purple",   // debug color
    radius: "100%",     // bubble corner rounding
    vshutoff: 2,        // at less than this velocity, it is set to 0 to avoid vibrating bubbles
    pshutoff: 0.8,      // at less displacement than this, the bubble stops and returns to its normal position
    decel: 0.5,         // effect of gravity from a bubble's origin to the bubble
    vdecel: 0.15,       // natural deceleration loss, simulates friction
    stopcount: 10,      // after this many iterations of no velocity, the bubbles's object is deleted from the iterator,
    xgrav: true,        // toggles x-axis point gravity
    ygrav: true         // toggles y-axis point gravity
};

let mousescan = {
    color: "green",     // color of the scan visual
    span: 5,            // number of bubbles the scan spans. must be odd

    size: 0,            // set later, depending on bubble size
    half: 0,            // set later, used for mouse follow
    hyp: 0,             // set later, stores radius of the forcefield circle
    mx: 0,              // mouse x for transfer between functions
    my: 0               // mouse y for transfer between functions
};

let forcefield = {
    vmult: 2,           // multiplier for mouse velocity
    vmin: 8,            // minimum read mouse velocity
    boostmult: 2,       // multiplier for vmin and vmult when click is held down
    visible: true,     // toggles forcefield visibility border

    size: 0,            // set later, based on mousescan size
    velocity: 0,        // constantly set to mouse velocity
    x1: 0,              // x1, x2, y1, y2 used to calculate velocity
    y1: 0,
    x2: 0,
    y2: 0
};

document.addEventListener("mousedown", function() {
    forcefield.vmult *= forcefield.boostmult;
    forcefield.vmin *= forcefield.boostmult;
});
document.addEventListener("mouseup", function() {
    forcefield.vmult /= forcefield.boostmult;
    forcefield.vmin /= forcefield.boostmult;
});

let movingBubbles = {};
let movingNum = 0;

let wrapSizeX, wrapSizeY;
let stepx, stepy, offset;

let wrap = document.querySelector(".wrap");
let readout = document.querySelector(".readout");
let mouse = document.querySelector(".forcefield");



document.addEventListener("mousemove", function(event) {
    pointFollow(event);
}, false);
document.addEventListener("touchmove", function(event) {
    touchFollow(event);
}, false);


function pointFollow(event) {
    // get the nearest bubble
    stepx = Math.round((event.clientX - wrapSizeX)/(bubbles.size+bubbles.space));
    stepy = Math.round((event.clientY - wrapSizeY)/(bubbles.size+bubbles.space));

    // position forcefield visual to follow mouse
    mouse.style.left = (event.clientX - (forcefield.size/2))+"px";
    mouse.style.top = (event.clientY - (forcefield.size/2))+"px";

    // set vars for mouse velocity calculations, calculate velocity
    forcefield.x2 = JSON.parse(JSON.stringify(forcefield.x1));
    forcefield.y2 = JSON.parse(JSON.stringify(forcefield.y1));

    forcefield.x1 = {pos: event.clientX, time: Date.now()};
    forcefield.y1 = {pos: event.clientY, time: Date.now()};

    forcefield.velocity = Math.sqrt(Math.pow((forcefield.x1.pos-forcefield.x2.pos), 2) + Math.pow((forcefield.y1.pos-forcefield.y2.pos), 2)) / (forcefield.x1.time - forcefield.x2.time);
    if (forcefield.velocity < forcefield.vmin) {
        forcefield.velocity = (forcefield.vmin/1);
    }
    
    mousescan.mx = event.clientX;
    mousescan.my = event.clientY;

    // readout.innerHTML = `x: ${stepx} | y: ${stepy} <br/> mox: ${(mousescan.mx - wrapSizeX)} | moy: ${(mousescan.my - wrapSizeY)} <br/>v: ${forcefield.velocity.toFixed(5)}`;

    // determine how many bubbles in each direction from the center bubble to check
    offset = ((mousescan.span-1)/2);
}

function touchFollow(event) {
    // get the nearest bubble
    stepx = Math.round((event.touches[0].clientX - wrapSizeX)/(bubbles.size+bubbles.space));
    stepy = Math.round((event.touches[0].clientY - wrapSizeY)/(bubbles.size+bubbles.space));

    // position forcefield visual to follow mouse
    mouse.style.left = (event.touches[0].clientX - (forcefield.size/2))+"px";
    mouse.style.top = (event.touches[0].clientY - (forcefield.size/2))+"px";

    // set vars for mouse velocity calculations, calculate velocity
    forcefield.x2 = JSON.parse(JSON.stringify(forcefield.x1));
    forcefield.y2 = JSON.parse(JSON.stringify(forcefield.y1));

    forcefield.x1 = {pos: event.touches[0].clientX, time: Date.now()};
    forcefield.y1 = {pos: event.touches[0].clientY, time: Date.now()};

    forcefield.velocity = Math.sqrt(Math.pow((forcefield.x1.pos-forcefield.x2.pos), 2) + Math.pow((forcefield.y1.pos-forcefield.y2.pos), 2)) / (forcefield.x1.time - forcefield.x2.time);
    if (forcefield.velocity < forcefield.vmin) {
        forcefield.velocity = (forcefield.vmin/1);
    }
    
    mousescan.mx = event.touches[0].clientX;
    mousescan.my = event.touches[0].clientY;

    // readout.innerHTML = `x: ${stepx} | y: ${stepy} <br/> mox: ${(mousescan.mx - wrapSizeX)} | moy: ${(mousescan.my - wrapSizeY)} <br/>v: ${forcefield.velocity.toFixed(5)}`;

    // determine how many bubbles in each direction from the center bubble to check
    offset = ((mousescan.span-1)/2);
}

function addMovingBubble(v, ax, ay,  id, x, y, dx, dy) {
    if (v && ax && ay && id && !movingBubbles[id]) {
        movingBubbles[id] = {
            xvel: (Math.cos(ax)*-v),
            yvel: (Math.sin(ay)*-v),
            angle: ax,
            id: id,
            x: x,
            y: y,
            sx: x,
            sy: y,
            stopped: 0
        };
    }
}

function animateBubble() {
    
    // loop through the square of bubbles immediately around the mouse. avoids having to loop through all bubbles. more efficient
    for (let a = 0; a < mousescan.span; a++) {
        for (let b = 0; b < mousescan.span; b++) {

            // get currrent bubble in the square and check to see if it exists (bubbles outside of wrap do not exist)
            let curX = stepx-offset+a;
            let curY = stepy-offset+b;

            if (document.querySelector(".bubble-"+curX+"-"+curY) != undefined) {
                
                // calculate x and y displacement from mouse to bubble. also find straight line distance
                let dX = (mousescan.mx - wrapSizeX) - ((curX*bubbles.size)+(curX*bubbles.space));
                let dY = (mousescan.my - wrapSizeY) - ((curY*bubbles.size)+(curY*bubbles.space));

                // readout.innerHTML = `x: ${stepx} | y: ${stepy} <br/> mox: ${(mousescan.mx - wrapSizeX)} | moy: ${(mousescan.my - wrapSizeY)} <br/> curX: ${curX} | curY: ${curY} | dX: ${dX} | dY: ${dY} <br/> v: ${forcefield.velocity.toFixed(5)}`;


                let dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

                // if within or touching the circle
                if (dist <= mousescan.hyp) {
                    // calculate angle of impact (tangent of the forcefield) and add to active bubble list to be externally animated
                    let xangle = Math.acos(dX/mousescan.hyp);
                    let yangle = Math.asin(dY/mousescan.hyp);
                    let id = curX+"-"+curY;
                    
                    let sX = parseInt(document.querySelector(".bubble-"+id).style.left.slice(0, -2));
                    let sY = parseInt(document.querySelector(".bubble-"+id).style.top.slice(0, -2));
                    addMovingBubble(forcefield.velocity*forcefield.vmult, xangle, yangle, id, sX, sY, dX, dY);
                }

            }
        }
    }
    
    for (let property in movingBubbles) {

        // constantly reduce velocity, simulates energy loss

        if (movingBubbles[property].xvel > 0) {
            movingBubbles[property].xvel -= bubbles.vdecel;
        } else if (movingBubbles[property].xvel < 0) {
            movingBubbles[property].xvel += bubbles.vdecel;
        }

        if (movingBubbles[property].yvel > 0) {
            movingBubbles[property].yvel -= bubbles.vdecel;
        } else if (movingBubbles[property].yvel < 0) {
            movingBubbles[property].yvel += bubbles.vdecel;
        }

        // simulate gravity to points

        if (bubbles.xgrav) {
            if (movingBubbles[property].x < movingBubbles[property].sx && Math.abs(movingBubbles[property].x - movingBubbles[property].sx) > bubbles.pshutoff) {
               movingBubbles[property].xvel += bubbles.decel;
            } else if (movingBubbles[property].x > movingBubbles[property].sx && Math.abs(movingBubbles[property].x - movingBubbles[property].sx) > bubbles.pshutoff) {
                movingBubbles[property].xvel -= bubbles.decel;
            } else if (Math.abs(movingBubbles[property].xvel) <= bubbles.vshutoff && Math.abs(movingBubbles[property].x - movingBubbles[property].sx) < bubbles.pshutoff) {
                movingBubbles[property].xvel = 0;
            }
        }

        if (bubbles.ygrav) {
             if (movingBubbles[property].y < movingBubbles[property].sy && Math.abs(movingBubbles[property].y - movingBubbles[property].sy) > bubbles.pshutoff) {
                movingBubbles[property].yvel += bubbles.decel;
            } else if (movingBubbles[property].y > movingBubbles[property].sy && Math.abs(movingBubbles[property].y - movingBubbles[property].sy) > bubbles.pshutoff) {
                movingBubbles[property].yvel -= bubbles.decel;
            } else if (Math.abs(movingBubbles[property].yvel) <= bubbles.vshutoff && Math.abs(movingBubbles[property].y - movingBubbles[property].sy) < bubbles.pshutoff) {
                movingBubbles[property].yvel = 0;
            }
        }

        // make sure bubble does not re-enter the forcefield area

        let dX = (mousescan.mx - wrapSizeX) - (movingBubbles[property].x);
        let dY = (mousescan.my - wrapSizeY) - (movingBubbles[property].y);
        let d = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
        let xangle = Math.acos(dX/mousescan.hyp);
        let yangle = Math.asin(dY/mousescan.hyp);


        if (d < mousescan.hyp) {
            movingBubbles[property].xvel = (Math.cos(xangle)*-forcefield.vmin);
            movingBubbles[property].yvel = (Math.sin(yangle)*-forcefield.vmin);
        }

        // position bubble

        let addX = (movingBubbles[property].x + movingBubbles[property].xvel);
        let addY = (movingBubbles[property].y + movingBubbles[property].yvel);

        document.querySelector(".bubble-"+movingBubbles[property].id).style.left = addX+"px";
        document.querySelector(".bubble-"+movingBubbles[property].id).style.top = addY+"px";

        movingBubbles[property].x += movingBubbles[property].xvel;
        movingBubbles[property].y += movingBubbles[property].yvel;

        // once a bubble has stopped moving, make sure it is done changing, then delete its object

        if (movingBubbles[property].yvel === 0 && movingBubbles[property].xvel === 0) {
            movingBubbles[property].stopped++;
        }
        if (movingBubbles[property].stopped > bubbles.stopcount) {
            document.querySelector(".bubble-"+movingBubbles[property].id).style.left = movingBubbles[property].sx+"px";
            document.querySelector(".bubble-"+movingBubbles[property].id).style.top = movingBubbles[property].sy+"px";
            delete movingBubbles[property];
        }
    }
    window.requestAnimationFrame(animateBubble);
}

// create bubbles and setup variables

function createBubbles() {
    wrap.style.height = (bubbles.y*bubbles.size)+(bubbles.space*(bubbles.y-1))+"px";
    wrap.style.width = (bubbles.x*bubbles.size)+(bubbles.space*(bubbles.x-1))+"px";
    forcefield.size = (mousescan.span*(bubbles.size+bubbles.space));
    mouse.style.height = forcefield.size+"px";
    mouse.style.width = forcefield.size+"px";
    wrapSizeX = wrap.getBoundingClientRect().x;
    wrapSizeY = wrap.getBoundingClientRect().y;
    mousescan.hyp = ((forcefield.size/2)+bubbles.size);
    if (forcefield.visible) {
        mouse.style.border = "1px solid gray";
    }
    let x = 0, y = 0;
    for (let a = 0; a < bubbles.x; a++) {
        for (let b = 0; b < bubbles.y; b++) {
            let newb = document.createElement("DIV");
            newb.classList.add("bubble");
            newb.classList.add("bubble-"+a+"-"+b);
            newb.style.left = ((x*bubbles.size)+(x*bubbles.space)-(bubbles.size/2))+"px";
            newb.style.top = ((y*bubbles.size)+(y*bubbles.space)-(bubbles.size/2))+"px";
            newb.style.background = bubbles.color;
            newb.style.borderRadius = bubbles.radius;
            newb.style.height = bubbles.size+"px";
            newb.style.width = bubbles.size+"px";
            wrap.appendChild(newb);
            y++;
        }
        y = 0;
        x++;
    }
}

function setup() {
    if (!JSON.parse(sessionStorage.getItem("hasreloaded"))) {
        location.reload();
        sessionStorage.setItem("hasreloaded", true);
    }
}

createBubbles();
setup();
window.requestAnimationFrame(animateBubble);