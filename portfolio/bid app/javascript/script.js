let price = 1;
let autobidStep = 0.50;

let user1 = [1.00];
let user2 = [1.00];

let maxBidLength = 5;
let responseTime = 5*60*1000;

let user1Response = Date.now(), user2Response = Date.now();
let waitingOn = null;

document.querySelector(".user1-autobid").addEventListener("click", function() {
    autobid(1);
});
document.querySelector(".user2-autobid").addEventListener("click", function() {
    autobid(2);
});

document.querySelector(".user1-bid-submit").addEventListener("click", function() {
    bid(1);
});
document.querySelector(".user2-bid-submit").addEventListener("click", function() {
    bid(2);
});
document.querySelector(".clear").addEventListener("click", clearStorage);

function autobid(user) {
    if (user === 1) {
        price += autobidStep;
        user1.unshift(price);
        user1Response = Date.now();
        waitingOn = 2;
    } else {
        price += autobidStep;
        user2.unshift(price);
        user2Response = Date.now();
        waitingOn = 1;
    }
    if ((price / 20) > 0.5) {
        autobidStep = parseFloat((price / 20).toFixed(2));
        document.querySelector(".user1-autobid").innerHTML = "AUTOBID (+$"+autobidStep+")";
        document.querySelector(".user2-autobid").innerHTML = "AUTOBID (+$"+autobidStep+")";
    }
    trimArrays();
    updateReadouts();
}

function bid(user) {
    let offer = 0;
    if (user === 1) {
        offer = parseFloat(document.querySelector(".user1-input").value);
        if (offer.isNaN || offer <= price) {
            autobid(1);
        } else {
            price = offer;
            user1Response = Date.now();
            user1.unshift(offer);
        }
        document.querySelector(".user1-input").value = "";
        waitingOn = 2;
    } else {
        offer = parseFloat(document.querySelector(".user2-input").value);
        if (offer.isNaN || offer <= price) {
            autobid(2);
        } else {
            price = offer;
            user2Response = Date.now();
            user2.unshift(offer);
        }
        document.querySelector(".user2-input").value = "";
        waitingOn = 1;
    }
    trimArrays();
    updateReadouts();
}

function trimArrays() {
    if (user1.length > maxBidLength) {
        user1.pop();
    }
    if (user2.length > maxBidLength) {
        user2.pop();
    }
}

function updateReadouts(store = true) {
    document.querySelector(".current").innerHTML = "$"+Number.parseFloat(price).toFixed(2);
    document.querySelector(".user1-current").innerHTML = "$"+Number.parseFloat(user1[0]).toFixed(2);
    document.querySelector(".user2-current").innerHTML = "$"+Number.parseFloat(user2[0]).toFixed(2);
    let user1hist = "";
    let user2hist = "";
    for (let a = 0; a < maxBidLength; a++) {
        if (user1[a] != undefined) {
            user1hist += Number.parseFloat(user1[a]).toFixed(2)+"<br/>";
        }
        if (user2[a] != undefined) {
            user2hist += Number.parseFloat(user2[a]).toFixed(2)+"<br/>";
        }
    }
    document.querySelector(".user1-history").innerHTML = user1hist;
    document.querySelector(".user2-history").innerHTML = user2hist;
    if (store) {
        storeData();
    }
}

function updateTimes() {
    let now = Date.now();
    if (waitingOn === 1) {
        now -= user1Response;
        now = responseTime - now;
        document.querySelector(".user1-time").innerHTML = convertMsToMinSec(now);
        document.querySelector(".user2-time").innerHTML = convertMsToMinSec(responseTime);
    } else if (waitingOn === 2) {
        now -= user2Response;
        now = responseTime - now;
        document.querySelector(".user2-time").innerHTML = convertMsToMinSec(now);
        document.querySelector(".user1-time").innerHTML = convertMsToMinSec(responseTime);
    }
}

function storeData() {
    localStorage.setItem("user1bids", "["+user1+"]");
    localStorage.setItem("user2bids", "["+user2+"]");
    localStorage.setItem("price", price);
    localStorage.setItem("user1response", user1Response);
    localStorage.setItem("user2response", user2Response);
}

function getData() {
    user1 = JSON.parse(localStorage.getItem("user1bids"));
    user2 = JSON.parse(localStorage.getItem("user2bids"));

    price = parseFloat(localStorage.getItem("price"));
    user1Response = parseFloat(localStorage.getItem("user1response"));
    user2Response = parseFloat(localStorage.getItem("user2response"));
    updateReadouts();
}

function clearStorage() {
    localStorage.clear();
    updateReadouts(false);
    window.location.reload(false);
}

function convertMsToMinSec(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;
    if (seconds < 10) {
        seconds = ("0"+seconds);
    }
    return minutes+":"+seconds;
}

if (localStorage.getItem("price") != null) {
    getData();
} else {
    updateReadouts();
}

const timeInt = setInterval(updateTimes, 100);