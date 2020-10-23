var player = {
    // Editable
    // FEATURES
    "canMove": true,
    "sprintToggle": true,
    "sprintNerfsAccel": false,
    "deceleration": true,
    "airDeceleration": true,
    "movementAccel": true,
    "jetpack": true,
    "jetTrail": true,
    "fallDamage": true,
    "shieldAbsorbsHit": true,
    "airJumpNegatesDecel": false,
    // GROUND MOVEMENT VALUES
    "movementSpeed": 5,
    "sprintSpeed": 8,
    "decel": 0.4,
    "sprintAccel": 0.8,
    "moveAccel": 1,
    // AIR MOVEMENT VALUES
    "inAirMovement": 0.8,
    "inAirDecel": 0.1,
    "maxSpeedDecel": 0.1,
    // JETPACK VALUES
    "packFuel": 500,
    "packPower": 0.6,
    "packMax": 5,
    "packRecharge": 20,
    "packRechargeDelay": 5000,
    "packDecelTime": 10,
    // HEALTH
    "maxHP": 100,
    "hp": 100,
    "maxShield": 50,
    "shield": 20,
    "shieldRecharge": 300,
    "shieldRechargeDelay": 10000,
    "damageMult": 1,
    "fallDamageMult": 1,
    "fallDamageThresh": 20,
    // GENERAL VALUES
    "gravity": 0.35,
    "maxFall": 40,
    "jumps": 3,
    "jumpSpeed": 10,
    "trailSpeed": 0.2,
    "trailLength": 2,
    "h": 208,
    "w": 80,
    "startX": 0,
    "startY": 208,
    // Non - editable
    "xVel": 0,
    "yVel": 0,
    "x": 0,
    "y": 0,
    "jumpsLeft": null,
    "moveSpeed": null,
    "landed": true,
    "jumping": false,
    "jetting": false,
    "fuelLeft": null,
    "packCharge1": null,
    "packCharge2": null,
    "shieldCharge1": null,
    "shieldCharge2": null,
    "packSoftMax": null,
    "canJump": true,
    "isOnPlat": 1,
    "floorLevel": 0
};

var item = {
    // Editable
    "gravity": 0.5
};

var items = {
    item1: {
        "val1":1, 
        "val2":3
    },
    item2: {
        "val5":2,
        "val7":5
    }
};

var world = {
    // Editable
    "h": 2000,
    "w": 3000,
    "charFollowOffsetX": 200,
    "charFollowOffsetY": 100,
    // Non - editable
    "sX": 0,
    "sY": 0,
    "x": 0,
    "y": 0
};

var platform = {
    "w": 100,
    "h": 25,
    "topAccept": 20,
    "floorPlats": true,
    "startFrom": 0,
    "stopAt": 0
}

var fireTrail = ["#d90000", "#f56c1d", "#f5971d", "#bd0808"];
var fireSide = true;

// Platforms

// height, width, left, bottom, sprite
var platforms = [
    [5, 5, 500, 100, "plat-left"],
    [5, 5, 600, 100, "plat-cent"],
    [5, 5, 700, 100, "plat-cent"],
    [5, 5, 800, 100, "plat-cent"],
    [5, 5, 900, 100, "plat-right"]
];

var visPlats = [];

// Non - editable misc values

var winW = window.innerWidth;
var winH = window.innerHeight;
var halfWinH = (winH / 2);
var halfWinW = (winW / 2);
var gaugeHeight = 59;
var isZero = 0.02;
var pixelSize = 5;
var platWidth = 100;
var keys = {
	"lt": false,
	"rt": false,
	"up": false,
    "dn": false,
    "sprint": false,
    "pack": false
};

const char = document.querySelector(".player");
const arena = document.querySelector(".world");

document.addEventListener("keydown", keydn);
document.addEventListener("keyup", keyup);

/*
==================================================================================================================
    TO DO:
        - Optimize platforms to only load and check for those that are visible
        - Collection of items without collision boxes
        - Better art
        - Add weapons / powers
        - Create a real level
        - Add enemies
==================================================================================================================
*/

function keydn(event) {
	switch(event.keyCode) {
        case 65: // A
			keys.lt = true;
			break;
        case 87: // W
            if (player.jetpack) {
                keys.pack = true;
            }
            if (!player.landed) {
                clearInterval(player.packCharge1);
                clearTimeout(player.packCharge2);
                player.packCharge = null;
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
            if (player.jumpsLeft > 0 && player.canJump && !player.jetting) {
                player.canJump = false;
                player.yVel = player.jumpSpeed;
                player.jumpsLeft--;
                player.jumping = true;
                player.landed = false;
                document.querySelector(".jumps").style.height = ((player.jumpsLeft / player.jumps) * gaugeHeight) + "px";
                if (keys.lt && player.airJumpNegatesDecel) {
                    player.xVel = (-1*player.moveSpeed*player.inAirMovement);
                } 
                if (keys.rt && player.airJumpNegatesDecel) {
                    player.xVel = (player.moveSpeed*player.inAirMovement);
                }
            }
            break;

        // SPECIAL KEYS
        
        case 16: // LSHIFT
            if (player.sprintToggle && keys.sprint) {
                keys.sprint = false;
                if (player.sprintNerfsAccel) {
                    player.moveAccel *= (1 / player.sprintAccel);
                }
            } else {
                keys.sprint = true;
                if (player.sprintNerfsAccel) {
                    player.moveAccel *= player.sprintAccel;
                }
            }
            break;
	}
}

function keyup(event) {
	switch (event.keyCode) {
        case 65: // A
            keys.lt = false;
            // if (player.movementAccel) {
            //     player.xVel = 0;
            // }
			break;
		case 87: // W
            keys.pack = false;
            player.packCharge2 = setTimeout(function() {
                recharge(0);
            }, player.packRechargeDelay);
			break;
        case 68: // D
            keys.rt = false;
            // if (player.movementAccel) {
            //     player.xVel = 0;
            // }
			break;
        case 83: // S
            keys.dn = false;
            break;
        case 32: // Space
            keys.up = false;
            player.canJump = true;
            break;

        // SPECIAL KEYS

        case 16: // LSHIFT
            if (!player.sprintToggle) {
                keys.sprint = false;
            }
            break;
	}
}

function move() {

    // if (!player.landed) {
        checkPlatforms();
    // }

    // Sprinting
    if (player.landed && keys.sprint) {
        player.moveSpeed = player.sprintSpeed;
    } else if (player.landed && !keys.sprint) {
        player.moveSpeed = player.movementSpeed;
    }

    // Left and right movement, including acceleration.
    if (keys.lt) {
        if (player.xVel > (-1*player.moveSpeed)) {
            if (player.movementAccel && player.landed) {
                player.xVel -= player.moveAccel;
            } else if (!player.landed && player.airDeceleration) {
                player.xVel -= player.inAirDecel;
            } else if (!player.movementAccel || !player.airDeceleration) {
                player.xVel = (-1*player.moveSpeed);
            }
        } else {
            player.xVel = (-1*player.moveSpeed);
        }
    }

    if (keys.rt) {
        if (player.xVel < player.moveSpeed) {
            if (player.movementAccel && player.landed) {
                player.xVel += player.moveAccel;
            } else if (!player.landed && player.airDeceleration) {
                player.xVel += player.inAirDecel;
            } else if (!player.movementAccel || !player.airDeceleration) {
                player.xVel = player.moveSpeed;
            }
        } else {
            player.xVel = player.moveSpeed;
        }
    }

    // If no keys are pressed, allow for deceleration
    if (!keys.lt && !keys.rt) {
        if (!player.deceleration) {
            player.xVel = 0;
        } else if (player.xVel < 0) {
            if (!player.landed && player.airDeceleration) {
                player.xVel += player.inAirDecel;
            } else {
                player.xVel += player.decel;
            }
        } else if (player.xVel > 0) {
            if (!player.landed && player.airDeceleration) {
                player.xVel -= player.inAirDecel;
            } else {
                player.xVel -= player.decel;
            }
        }
    }

    // Prevents extremely small numbers from occurring, affecting movement
    if (Math.abs(player.xVel) <= player.decel && player.landed) {
        player.xVel = 0;
    }
    if (Math.abs(player.xVel) <= isZero && !player.landed) {
        player.xVel = 0;
    }

    // Move the character based on x velocity. Character only doesn't move when velocity is 0 or canMove is false
    player.x += player.xVel;


    // Jetpack
    if (keys.pack && player.fuelLeft > 0 && !player.landed) {
        if (player.yVel >= player.packSoftMax) {
            player.yVel += (player.packPower - player.maxSpeedDecel);
            if (player.yVel >= player.packMax) {
                player.yVel = player.packMax;
            }
        } else {
            player.yVel += player.packPower;
        }
        player.fuelLeft--;
        player.jetting = true;
        document.querySelector(".jetFuel").style.height = ((player.fuelLeft / player.packFuel) * gaugeHeight) + "px";
    } else {
        player.jetting = false;
    }

    // Create jetpack particle trail
    if (player.jetTrail && player.jetting) {
        createJetTrail();
    }

    if (player.isOnPlat === 0) {
        player.landed = false;
        player.floorLevel = 0;
    }

    // If the player is not landed, check to see if they will land in the current frame
    // If they will land in the current frame, make the last frame movement the remaining distance so as not to clip through the floor
    if (!player.landed) {
        var nextDist = (player.yVel - player.gravity);
        if (keys.sprint) {
            player.moveSpeed = (player.sprintSpeed * player.inAirMovement);
        } else {
            player.moveSpeed = (player.movementSpeed * player.inAirMovement);
        }
        if (player.y + nextDist - player.h < player.floorLevel) {
            if (player.fallDamage && Math.abs(player.yVel) >= player.fallDamageThresh) {
                var fallDamage = Math.abs(player.yVel) * player.fallDamageMult;
                updateHealth(fallDamage);
            }
            player.yVel = (player.floorLevel - player.y + player.h);
            player.landed = true;
            player.jumping = false;
            player.jetting = false;
            player.jumpsLeft = player.jumps;
            document.querySelector(".jumps").style.height = ((player.jumpsLeft / player.jumps) * gaugeHeight) + "px";
        } else {
            if (Math.abs(player.yVel) >= player.maxFall) {
                player.yVel = (-1*player.maxFall);
            } else {
                player.yVel -= player.gravity;
            }
        }
        player.y += player.yVel;
    } else {
        if (keys.sprint) {
            player.moveSpeed = (player.sprintSpeed * (1/player.inAirMovement));
        } else {
            player.moveSpeed = (player.movementSpeed * (1/player.inAirMovement));
        }
    }

    if (player.canMove) {
        char.style.left = player.x + "px";
        char.style.bottom = player.y + "px";

        // Movement of the camera, allowing for a small range of movement around the center

        if ( (player.x + world.x) > (halfWinW + world.charFollowOffsetX) ) {
            world.x = (halfWinW + world.charFollowOffsetX - player.x);
        }

        if ( (player.x + world.x) < (halfWinW - world.charFollowOffsetX) ) {
            world.x = (halfWinW - world.charFollowOffsetX - player.x);
        }

        if (world.x >= 0) {
            world.x = 0;
        }
        if (world.x <= (-1*(world.w - winW))) {
            world.x = (-1*(world.w - winW));
        }

        // y-axis

        if ( (player.y + world.y) > (halfWinH + world.charFollowOffsetY) ) {
            world.y = (halfWinH + world.charFollowOffsetY - player.y);
        }

        if ( (player.y + world.y) < (halfWinH - world.charFollowOffsetY) ) {
            world.y = (halfWinH - world.charFollowOffsetY - player.y);
        }

        if (world.y >= 0) {
            world.y = 0;
        }
        if (world.y <= (-1*(world.h - winH))) {
            world.y = (-1*(world.h - winH));
        }

        arena.style.left = world.x + "px";
        arena.style.bottom = world.y + "px";
    }
    // document.querySelector(".readout").innerHTML = "xVel: "+player.xVel.toFixed(2)+" | yVel: "+player.yVel.toFixed(2)+" | fuel: "+player.fuelLeft+ " | moveSpeed: "+player.moveSpeed.toFixed(2)+ " | ";
    window.requestAnimationFrame(move);
}

function recharge(item) {
    switch (item) {
        case 0: // jetpack
            player.packCharge1 = setInterval(function() {
                if (player.fuelLeft < player.packFuel) {
                    player.fuelLeft++
                    document.querySelector(".jetFuel").style.height = ((player.fuelLeft / player.packFuel) * gaugeHeight) + "px";
                } else {
                    clearInterval(player.packCharge1);
                    player.packCharge = null;
                }
            }, player.packRecharge);
            break;
        case 1:
            player.shieldCharge1 = setInterval(function() {
                if (player.shield < player.maxShield) {
                    player.shield++;
                    document.querySelector(".shield").style.height = ((player.shield / player.maxHP) * gaugeHeight) + "px";
                } else {
                    clearInterval(player.shieldCharge1);
                    player.shieldCharge1 = null;
                    // document.querySelector(".shield").style.height = (gaugeHeight + "px");
                }
            }, player.shieldRecharge);
            break;
    }
}

function createJetTrail() {
    var trail = document.createElement("DIV");
    var rand = (Math.floor(Math.random() * fireTrail.length));
    if (fireSide) {
        trail.style.left = "75px";
        fireSide = false;
    } else {
        trail.style.left = "10px";
        fireSide = true;
    }
    trail.style.borderTop = "10px solid "+fireTrail[rand];
    trail.classList.add("fireTrail");
    char.appendChild(trail);
    trail.style.animation = (player.trailSpeed+"s fireTrail linear");
    var time = (player.trailSpeed * player.trailLength * 100);
    setTimeout(function() {
        trail.parentElement.removeChild(trail);
    }, time);
}

// Updates health and shield bar and/or updates damage taken
function updateHealth(damage) {
    if (damage != undefined && damage != 0) {
        damage *= player.damageMult;
        clearInterval(player.shieldCharge1);
        clearTimeout(player.shieldCharge2);
        player.shieldCharge2 = setTimeout(function() {
            recharge(1);
        }, player.shieldRechargeDelay);
        var taken = damage;
        if (player.shieldAbsorbsHit) {
            if (taken < player.shield && player.shield > 0) {
                player.shield -= taken;
            } else if (player.shield > 0) {
                player.shield = 0;
                taken = 0;
            } else {
                player.hp -= damage;
                if (player.hp < 0) {
                    player.hp = 0;
                }
            }
        } else {
            if (damage <= player.shield && player.shield > 0) {
                player.shield -= taken;
            } else {
                taken = (damage - player.shield);
                player.hp -= taken;
                if (player.hp < 0) {
                    player.hp = 0;
                }
                player.shield = 0;
            }
        }
    }
    document.querySelector(".health").style.height = ((player.hp / player.maxHP) * gaugeHeight) + "px";
    document.querySelector(".shield").style.height = ((player.shield / player.maxShield) * gaugeHeight) + "px";
}

function createPlatforms() {
    arena.style.height = (world.h + "px");
    arena.style.width = (world.w + "px");
    platform.stopAt = platforms.length;
    for (var a = 0; a < platforms.length; a++) {
        var newPlat = document.createElement("DIV");
        newPlat.classList.add("platform");
        newPlat.classList.add(platforms[a][4]);
        newPlat.style.height = platforms[a][0] + "px";
        newPlat.style.width = platforms[a][1] + "px";
        newPlat.style.left = platforms[a][2] + "px";
        newPlat.style.bottom = platforms[a][3] + "px";
        // newPlat.style.background = platforms[a][4];
        arena.appendChild(newPlat);
        // newPlat.innerHTML = a;
    }
}

function setupWorld() {
    player.jumpsLeft = player.jumps;
    player.moveSpeed = player.movementSpeed;
    player.fuelLeft = player.packFuel;
    player.packSoftMax = (player.packMax - (player.maxSpeedDecel * player.packDecelTime));
    player.x = player.startX;
    player.y = player.startY;
    world.x = player.startX;
    world.x = player.startY;
}

// Creates a bunch of single-width platforms, mostly useful for working on collisions
function randomPlatforms() {
    platforms = [];
    // if (platform.floorPlats) {}
    for (var a = 0; a < 50; a++) {
        var randLeft = Math.floor(Math.random() * (world.w - 100));
        var randBot = Math.floor(Math.random() * (world.h - 200));
        var newp = [];
        newp.push(5);
        newp.push(5);
        newp.push(randLeft);
        newp.push(randBot);
        newp.push("plat-cent");
        platforms.push(newp);
    }
    createPlatforms();
}

// Checks each platform to see if the player will land on it
function checkPlatforms() {
    for (var a = platform.startFrom; a < platform.stopAt; a++) {
        if (player.x + player.w > platforms[a][2]                                           //left
            && player.x < platforms[a][2] + platform.w                                      //right
            && player.y - player.h > platforms[a][3] - 1                                    //above
            && player.y - player.h < platforms[a][3] + platforms[a][0] + platform.topAccept // grace area
            ) {  

            player.floorLevel = (platforms[a][3] + platforms[a][0] - pixelSize);
            player.isOnPlat = 1;
            if (player.landed) {
                player.yVel = 0;
            }
            // console.log("Player is over platform "+a+" at X: "+platforms[a][2]+" Y: "+platforms[a][3]+". Floor level is "+player.floorLevel+". isOnPlat is "+player.isOnPlat+". Player is landed: "+player.landed);
            platform.startFrom = (a);
            platform.stopAt = (a+1);
        } else {
            player.isOnPlat = 0;
            platform.startFrom = 0;
            platform.stopAt = platforms.length;
        }
    }
}

// createPlatforms();
randomPlatforms();
setupWorld();
updateHealth();
window.requestAnimationFrame(move);