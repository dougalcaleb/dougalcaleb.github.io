// Changeable attributes

var gravity = 0.5;
var movementSpeed = 5;
var jumpSpeed = 10;
var moveInAirMult = 0.9;
var movementAccel = true;
var moveAccel = 1;
var jumps = 2;
var canMove = true;
var worldH = 2000;
var worldW = 3000;
var charFollowOffset = 200;

// Platforms

// height, width, left, bottom, color
var platforms = [
    [20, 300, 500, 40, "black"]
];

var visPlats = [];

// Unchangeable variables

var yVel = 0;
var xVel = 0;
var pX = 0;
var pY = 0;
var wX = 0;
var wY = 0;
var floorLevel = 0;
var jumpsLeft = (jumps / 1);
var moveSpeed = (movementSpeed / 1);
var winW = window.innerWidth;
var winH = window.innerHeight;
var halfWinH = (winH / 2);
var halfWinW = (winW / 2);
var landed = true;
var jumping = false;
var keys = {
	"lt": false,
	"rt": false,
	"up": false,
	"dn": false
};

const char = document.querySelector(".player");
const arena = document.querySelector(".world");

document.addEventListener("keydown", keydn);
document.addEventListener("keyup", keyup);

function keydn(event) {
	switch(event.keyCode) {
        // ARROWS
        case 37: // Left
			keys.lt = true;
			break;
		case 38: // Up
            keys.up = true;
            if (jumpsLeft > 0) {
                yVel = (jumpSpeed / 1);
                jumpsLeft--;
                jumping = true;
                landed = false;
            }
			break;
        case 39: // Right
			keys.rt = true;
			break;
        case 40: // Down
            keys.dn = true;
            break;

        // WASD

        case 65: // A
			keys.lt = true;
			break;
		case 87: // W
            keys.up = true;
            if (jumpsLeft > 0) {
                yVel = (jumpSpeed / 1);
                jumpsLeft--;
                jumping = true;
                landed = false;
            }
			break;
        case 68: // D
			keys.rt = true;
			break;
        case 83: // S
            keys.dn = true;
            break;
        case 32: // Space
            keys.up = true;
            if (jumpsLeft > 0) {
                yVel = (jumpSpeed / 1);
                jumpsLeft--;
                jumping = true;
                landed = false;
            }
            break;
	}
}

function keyup(event) {
	switch (event.keyCode) {
        // ARROWS
		case 37: // Left
            keys.lt = false;
            if (movementAccel) {
                xVel = 0;
            }
			break;
		case 38: // Up
			keys.up = false;
			break;
		case 39: // Right
            keys.rt = false;
            if (movementAccel) {
                xVel = 0;
            }
			break;
		case 40: // Down
			keys.dn = false;
            break;
            
        // WASD

        case 65: // A
            keys.lt = false;
            if (movementAccel) {
                xVel = 0;
            }
			break;
		case 87: // W
            keys.up = false;
			break;
        case 68: // D
            keys.rt = false;
            if (movementAccel) {
                xVel = 0;
            }
			break;
        case 83: // S
            keys.dn = false;
            break;
        case 32: // Space
            keys.up = false;
            break;
	}
}

function move() {
    // Left and right movement, including checking for enabled acceleration.
    if (keys.lt) {
        if (movementAccel && xVel < moveSpeed) {
            xVel += moveAccel;
        } else if (!movementAccel) {
            xVel = moveSpeed;
        }
        x -= xVel;
    }
    if (keys.rt) {
        if (movementAccel && xVel < moveSpeed) {
            xVel += moveAccel;
        } else if (!movementAccel) {
            xVel = moveSpeed;
        }
        x += xVel;
    }

    // If the player is not landed, check to see if they will land in the current frame.
    // If they will land in the current frame, make the last frame movement the remaining distance so as not to clip through the floor.
    if (!landed) {
        var nextDist = (yVel - gravity);
        moveSpeed = (movementSpeed * moveInAirMult);
        if (y + nextDist < floorLevel) {
            yVel = (floorLevel - y);
            landed = true;
            jumping = false;
            jumpsLeft = (jumps / 1);
        } else {
            yVel -= gravity;
        }
        y += yVel;
    } else {
        moveSpeed = (movementSpeed / 1);
        // pVel = 0;
    }

    if (canMove) {
        char.style.left = x + "px";
        char.style.bottom = y + "px";

        // Movement of the camera, allowing for a small range of movement around the center

        if ( (x + x) > (halfWinW + charFollowOffset) ) {
            x = (halfWinW + charFollowOffset - x);
        }

        if ( (x + x) < (halfWinW - charFollowOffset) ) {
            x = (halfWinW - charFollowOffset - x);
        }

        if (x >= 0) {
            x = 0;
        }
        if (x <= (-1*(w - winW))) {
            x = (-1*(w - winW));
        }

        arena.style.left = x + "px";
        arena.style.bottom = y + "px";
    }
    window.requestAnimationFrame(move);
}

function createPlatforms() {
    arena.style.height = (h + "px");
    arena.style.width = (w + "px");
    for (var a = 0; a < platforms.length; a++) {
        var newPlat = document.createElement("DIV");
        newPlat.classList.add("platform");
        newPlat.style.height = platforms[a][0] + "px";
        newPlat.style.width = platforms[a][1] + "px";
        newPlat.style.left = platforms[a][2] + "px";
        newPlat.style.bottom = platforms[a][3] + "px";
        newPlat.style.background = platforms[a][4];
        arena.appendChild(newPlat);
    }
}

createPlatforms();

window.requestAnimationFrame(move);