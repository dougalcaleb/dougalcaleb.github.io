// PORT OF ROCKET v6



/* 
To do:
- Make shadow correlate to ship correctly
- Add booster fire
- Create game functionality
*/



// Changeable Variables
// Defaults: starNum - 500, rotateScalar - 3, accel - 0.05, rAccel - 0.04, decel - 0.02, gravity - 0.03, threshold- 100, stopThresh - 0.03 boost - 0.2

var starNum = 500;          // Number of stars generated
var rotateScalar = 3;       // Number of degrees to rotate in one Animation Frame
var acceleration = 0.05;    // Speed of acceleration
var rAccel = 0.04;          // Speed of rotational acceleration
var deceleration = 0.02;    // Speed of negative acceleration
var gravity = 0.03;         // Strength of downwards gravity (must be greater than or equal to stopThresh and deceleration for nonzero values to have an effect)
var threshold = 100;        // Distance off the screen the rocket moves before switching sides (px)
var stopThresh = 0.03;      // Sets velocities to 0 when they fall below this value (avoids super low velocities that can't be manually corrected against)
var boost = 0.2;            // Acceleration value of thrusters when boosting

// Unchangeable Variables

var width = window.innerWidth;
var height = window.innerHeight;
var body = document.querySelector("body");
var rocket = document.querySelector(".ship");
var shadow = document.querySelector(".shadow");
var bL = document.querySelector(".f-l");
var bR = document.querySelector(".f-r");
var rotation = 90;
var radRot = (Math.PI / 2);
var vVel = 0;
var hVel = 0;
var rVel = 0;
var rh = ((width / 2) - 14.5);
var rv = ((height / 2) - 27.5);
var velocity = 0;
var vDir = 0;
var hDir = 0;
var impactVel = 0;
var prevAccel = 0;
var ship = {
	"lt": false,
	"rt": false,
	"up": false,
	"dn": false
};

// Event listeners and their functions

document.addEventListener("keydown", keydn);
document.addEventListener("keyup", keyup);

function keydn(event) {
	switch(event.keyCode) {
		case 37: // Left
			ship.lt = true;
			break;
		case 38: // Up
			ship.up = true;
			break;
		case 39: // Right
			ship.rt = true;
			break;
        case 40: // Boost
            prevAccel = (acceleration / 1);
			acceleration = (boost / 1);
			break;
	}
}

function keyup(event) {
	switch (event.keyCode) {
		case 37: // left
			ship.lt = false;
			break;
		case 38: // up
			ship.up = false;
			break;
		case 39: // right
			ship.rt = false;
			break;
		case 40:
			acceleration = (prevAccel / 1);
			break;
	}
}

// Movement

function move() {
    if (ship.lt) {
        rVel += (rAccel * rotateScalar);

        bR.style.border = "8px solid transparent";
        bR.style.right = "77px";
        bR.style.opacity = "1";
    } else {
        bR.style.border = "5px solid transparent";
        bR.style.right = "79px";
        bR.style.opacity = "0";
    }
    if (ship.rt) {
        rVel -= (rAccel * rotateScalar);
        
        bL.style.border = "8px solid transparent";
        bL.style.left = "77px";
        bL.style.opacity = "1";
    } else {
        bL.style.border = "5px solid transparent";
        bL.style.left = "79px";
        bL.style.opacity = "0";
    }

    rotation += rVel;

    if (ship.lt === false && ship.rt === false) {
        if (rVel > -stopThresh && rVel < stopThresh) {
            rVel = 0;
        } else if (rVel > 0) {
            rVel -= deceleration;
        } else if (rVel < 0) {
            rVel += deceleration;
        }
    }

    radRot = ((rotation * Math.PI) / 180);

    if (ship.up) {

        bL.style.opacity = "1";
        bR.style.opacity = "1";

        vDir = Math.sin(radRot);
        hDir = Math.cos(radRot);

        hVel += (acceleration * hDir);
        vVel += (acceleration * vDir);

    } else {

        if (hVel > -stopThresh && hVel < stopThresh) {
            hVel = 0;
        } else if (hVel > 0) {
            hVel -= deceleration;
        } else if (hVel < 0) {
            hVel += deceleration;
        }
        if (vVel > -stopThresh && vVel < stopThresh) {
            vVel = 0;
        } else if (vVel > 0) {
            vVel -= deceleration;
        } else if (vVel < 0) {
            vVel += deceleration;
        }
    }

    rh += hVel;
    rv += vVel;

    if (rv > -30) {
        vVel -= gravity;
    } else {
        var temp = Math.sqrt((Math.pow(vVel, 2) + Math.pow(hVel, 2)));

        if (temp != 0) {
            impactVel = temp;
        }

        vVel += (vVel * -1);
        hVel += (hVel * -1);
    }

    rocket.style.left = rh+"px";
    rocket.style.bottom = rv+"px";

    rocket.style.transform = "rotate("+(90 - rotation)+"deg)";

    if (rh < -threshold) {
        rh = window.innerWidth;
    }
    if (rh > window.innerWidth + threshold) {
        rh = -threshold;
    }

    document.querySelector(".readout").innerHTML = "Rotation: "+rotation.toFixed(3)+" | RadRot: "+radRot.toFixed(3)+" | vVel: "+vVel.toFixed(3)+" | hVel: "+hVel.toFixed(3)+" | vDir: "+vDir.toFixed(3)+" | hDir: "+hDir.toFixed(3)+" | rv: "+rv.toFixed(3)+" | rh: "+rh.toFixed(3)+" | rVel: "+rVel.toFixed(3)+" | impactVel: "+impactVel.toFixed(3)+" |";
    
    window.requestAnimationFrame(move);
}



// Starting functions

function spawn() {
    rocket.style.left = ((width / 2) - 14.5) + "px";
    rocket.style.bottom = ((height / 2) - 27.5) + "px";
}

function stars() {
    for (var a = 0; a < starNum; a++) {
        var star = document.createElement("DIV");
        star.classList.add("star");
        body.appendChild(star);
        var leftMar = Math.floor(Math.random() * width) + "px";
        var topMar = Math.floor(Math.random() * height) + "px";
        star.style.left = leftMar;
        star.style.top = topMar;
    }
}

stars();
spawn();

window.requestAnimationFrame(move);