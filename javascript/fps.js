var fps = 0;
var fpsArray = [];
var lastCalledTime = null;
var avg = 0;
var delta = null;
var minFps = 9999999;
var maxFps = 0;

var countOverlay = document.createElement("DIV");
countOverlay.style = "position: fixed; left: 0; top: 0; background: white; color: black; width: 100px; text-align: center; z-index: 999";
document.body.appendChild(countOverlay);
countOverlay.classList.add("fps");

function calcFps() {
    // fps = 0;
    if (!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        // return;
    }
    delta = (Date.now() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = 1 / delta;
    if (fps != Infinity) {
        fps = fps.toFixed(0);
        fpsArray.push(parseInt(fps));
        if (fpsArray.length > 100) {
            fpsArray.shift();
        }
    }
    
    if ((fps > maxFps) && (fps != Infinity)) {
        maxFps = fps / 1;
    }
    if (fps < minFps) {
        minFps = fps / 1;
    }
    window.requestAnimationFrame(calcFps);
}

function avgFps() {
    for (var a = 0; a < fpsArray.length; a++) {
        avg += fpsArray[a];
    }
    avg /= fpsArray.length;
    avg = Math.floor(avg);

    document.querySelector(".fps").innerHTML = "FPS: "+fps+"<br/> Max: "+maxFps+" <br/> Min: "+minFps+" <br/> Avg: "+avg;
}

window.requestAnimationFrame(calcFps);

setInterval(avgFps, 50);
setInterval(function() {
    maxFps = 0;
    minFps = 99999999;
},2000);