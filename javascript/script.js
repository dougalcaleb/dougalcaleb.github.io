let settings = {
	scrollCD: 1000,
};

let managers = {
	lastScrollSnap: 0,
   atTop: true,
   menuOpen: false,
};

let AS = {
	firstOne: "laguod",
	firstTwo: "belac",
	domain: "liamg",
};

let p = true;

setTimeout(() => {
	document.querySelector(".continue").style.animation = "2s float ease infinite";
}, 1000);

document.querySelector(".continue").addEventListener("click", () => {
	if (managers.atTop && Date.now() - managers.lastScrollSnap > settings.scrollCD) {
		scrollDown();
		managers.atTop = false;
	}
});

document.querySelector(".nav-btn-0").addEventListener("click", () => {
	scrollUp();
	managers.atTop = true;
});

document.querySelector(".nav-btn-1").addEventListener("click", () => {
	if (managers.atTop) {
		scrollDown();
		managers.atTop = false;
		setTimeout(() => {
			document.getElementById("nav-1-link").click();
		}, 850);
	} else {
		document.getElementById("nav-1-link").click();
	}
});

document.querySelector(".nav-btn-2").addEventListener("click", () => {
	if (managers.atTop) {
		scrollDown();
		managers.atTop = false;
		managers.atTop = false;
		setTimeout(() => {
			document.getElementById("nav-2-link").click();
		}, 850);
	} else {
		document.getElementById("nav-2-link").click();
	}
});

document.querySelector(".nav-btn-3").addEventListener("click", () => {
	if (managers.atTop) {
		scrollDown();
		managers.atTop = false;
		managers.atTop = false;
		setTimeout(() => {
			document.getElementById("nav-3-link").click();
		}, 850);
	} else {
		document.getElementById("nav-3-link").click();
	}
});

document.querySelector(".btn-contact").addEventListener("click", () => {
	if (managers.atTop) {
		scrollDown();
		managers.atTop = false;
		managers.atTop = false;
		setTimeout(() => {
			document.getElementById("nav-3-link").click();
		}, 850);
	} else {
		document.getElementById("nav-3-link").click();
	}
});

window.addEventListener("wheel", (event) => {
	if (event.deltaY > 0 && managers.atTop && Date.now() - managers.lastScrollSnap > settings.scrollCD) {
		scrollDown();
		managers.atTop = false;
	} else if (
		event.deltaY < 0 &&
		!managers.atTop &&
		Date.now() - managers.lastScrollSnap > settings.scrollCD &&
		document.querySelector(".main").scrollTop == 0
	) {
		scrollUp();
		managers.atTop = true;
	}
});

function scrollDown() {
	managers.lastScrollSnap = Date.now();
	document.querySelector(".body-wrap").style.animation = "0.8s moveUp forwards cubic-bezier(.21,.04,.25,1)";
}

function scrollUp() {
	managers.lastScrollSnap = Date.now();
	document.querySelector(".body-wrap").style.animation = "0.8s moveDown forwards cubic-bezier(.21,.04,.25,1)";
}

document.querySelector(".copy-button").addEventListener("click", () => {
	let txt = document.querySelector(".address-bubble");
	if (document.selection) {
		let range = document.body.createTextRange();
		range.moveToElementText(txt);
		range.select().createTextRange();
		document.execCommand("copy");
	} else if (window.getSelection) {
		let range = document.createRange();
		range.selectNode(txt);
		window.getSelection().addRange(range);
		document.execCommand("copy");
		// alert("Text has been copied, now paste in the text-area");
	}
	window.getSelection().empty();
	document.querySelector(".copy-button").innerText = "Copied!";
	setTimeout(() => {
		document.querySelector(".copy-button").innerText = "Copy address";
	}, 2000);
	// document.execCommand("copy");
});

window.addEventListener("load", () => {
	setTimeout(() => {
		let data = `?body=${document.querySelector(".mail-message").value}&subject=${document.querySelector(".mail-subject").value}`;
		document
			.querySelector(".external-mail-link")
			.setAttribute(
				"href",
				"mail" +
					"to:" +
					AS.firstOne.split("").reverse().join("") +
					AS.firstTwo.split("").reverse().join("") +
					"@" +
					AS.domain.split("").reverse().join("") +
					".com" +
					data
			);

		document.querySelector(".address-bubble").innerText =
			AS.firstOne.split("").reverse().join("") + AS.firstTwo.split("").reverse().join("") + "@" + AS.domain.split("").reverse().join("") + ".com";
	}, 100);
});

document.querySelector(".external-mail-link").addEventListener("click", (e) => {
	if (p) {
		e.preventDefault();
		p = false;
		setTimeout(() => {
			p = true;
		}, 25);
	}
	let data = `?body=${document.querySelector(".mail-message").value}&subject=${document.querySelector(".mail-subject").value}`;
	document
		.querySelector(".external-mail-link")
		.setAttribute(
			"href",
			"mail" +
				"to:" +
				AS.firstOne.split("").reverse().join("") +
				AS.firstTwo.split("").reverse().join("") +
				"@" +
				AS.domain.split("").reverse().join("") +
				".com" +
				data
		);
	document.querySelector(".external-mail-link").click();
});

if (window.innerWidth <= 500) {
	let ts;
	document.querySelector(".land-page").addEventListener(
		"touchstart",
		(event) => {
			ts = event.touches[0].screenY;
		},
		false
	);
	document.querySelector(".land-page").addEventListener(
		"touchmove",
		(event) => {
			if (ts - event.touches[0].screenY > 100 && managers.atTop) {
				scrollDown();
				managers.atTop = false;
			}
		},
		false
	);
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	let ts2;
	let lockedX = false;
	document.querySelector(".main").addEventListener(
		"touchstart",
		(event) => {
			ts2 = event.touches[0];
		},
		false
	);
	document.querySelector(".main").addEventListener(
		"touchmove",
		(event) => {
			if (ts2.screenY - event.touches[0].screenY < -100 && !managers.atTop && document.querySelector(".main").scrollTop == 0 && !lockedX) {
				scrollUp();
				managers.atTop = true;
         }
         if (Math.abs(ts2.screenX - event.touches[0].screenX) > 50 && Math.abs(ts2.screenX - event.touches[0].screenX) > Math.abs(ts2.screenY - event.touches[0].screenY)) {
            lockedX = true;
         }
		},
		false
	);
	document.querySelector(".main").addEventListener(
		"touchend",
		() => {
			lockedX = false;
		},
		false
	);
}

document.querySelector(".burger").addEventListener("click", () => {
   if (!managers.menuOpen) {
      document.querySelectorAll(".burger-layer")[0].classList.add("b-layer-top-active");
      document.querySelectorAll(".burger-layer")[0].classList.remove("b-layer-top-inactive");
      document.querySelectorAll(".burger-layer")[1].classList.add("b-layer-middle-active");
      document.querySelectorAll(".burger-layer")[1].classList.remove("b-layer-middle-inactive");
      document.querySelectorAll(".burger-layer")[2].classList.add("b-layer-bottom-active");
      document.querySelectorAll(".burger-layer")[2].classList.remove("b-layer-bottom-inactive");
      managers.menuOpen = true;
   } else {
      document.querySelectorAll(".burger-layer")[0].classList.remove("b-layer-top-active");
      document.querySelectorAll(".burger-layer")[0].classList.add("b-layer-top-inactive");
      document.querySelectorAll(".burger-layer")[1].classList.remove("b-layer-middle-active");
      document.querySelectorAll(".burger-layer")[1].classList.add("b-layer-middle-inactive");
      document.querySelectorAll(".burger-layer")[2].classList.remove("b-layer-bottom-active");
      document.querySelectorAll(".burger-layer")[2].classList.add("b-layer-bottom-inactive");
      managers.menuOpen = false;
   }
});