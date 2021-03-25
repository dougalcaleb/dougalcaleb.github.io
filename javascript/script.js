let settings = {
	scrollCD: 1000,
};

let managers = {
	lastScrollSnap: 0,
	atTop: true,
	menuOpen: false,
	isMobile: false,
	linksOpen: false,
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

function nav0() {
	if (managers.isMobile) {
		closeMobile();
	}
	scrollUp();
	managers.atTop = true;
}
function nav1() {
	if (managers.isMobile) {
		closeMobile();
	}
	if (managers.atTop) {
		scrollDown();
		managers.atTop = false;
		setTimeout(() => {
			document.getElementById("nav-1-link").click();
		}, 850);
	} else {
		document.getElementById("nav-1-link").click();
	}
}
function nav2() {
	if (managers.isMobile) {
		closeMobile();
	}
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
}
function nav3() {
	if (managers.isMobile) {
		closeMobile();
	}
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
}
document.querySelector(".nav-btn-0").addEventListener("click", nav0);
document.querySelector(".nav-btn-1").addEventListener("click", nav1);
document.querySelector(".nav-btn-2").addEventListener("click", nav2);
document.querySelector(".nav-btn-3").addEventListener("click", nav3);
document.querySelector(".m-nav-btn-0").addEventListener("click", nav0);
document.querySelector(".m-nav-btn-1").addEventListener("click", nav1);
document.querySelector(".m-nav-btn-2").addEventListener("click", nav2);
document.querySelector(".m-nav-btn-3").addEventListener("click", nav3);

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
	document.querySelector(".body-wrap").style.left = "0";
	managers.isMobile = true;

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
			if (
				Math.abs(ts2.screenX - event.touches[0].screenX) > 50 &&
				Math.abs(ts2.screenX - event.touches[0].screenX) > Math.abs(ts2.screenY - event.touches[0].screenY)
			) {
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
		openMobile();
	} else {
		closeMobile();
	}
});

function openMobile() {
	document.querySelectorAll(".burger-layer")[0].classList.add("b-layer-top-active");
	document.querySelectorAll(".burger-layer")[0].classList.remove("b-layer-top-inactive");
	document.querySelectorAll(".burger-layer")[1].classList.add("b-layer-middle-active");
	document.querySelectorAll(".burger-layer")[1].classList.remove("b-layer-middle-inactive");
	document.querySelectorAll(".burger-layer")[2].classList.add("b-layer-bottom-active");
	document.querySelectorAll(".burger-layer")[2].classList.remove("b-layer-bottom-inactive");

	document.querySelector(".body-wrap").style.left = "50vw";
	document.querySelector(".mobile-nav-return").style.display = "inline";
	managers.menuOpen = true;
}

function closeMobile() {
	document.querySelectorAll(".burger-layer")[0].classList.remove("b-layer-top-active");
	document.querySelectorAll(".burger-layer")[0].classList.add("b-layer-top-inactive");
	document.querySelectorAll(".burger-layer")[1].classList.remove("b-layer-middle-active");
	document.querySelectorAll(".burger-layer")[1].classList.add("b-layer-middle-inactive");
	document.querySelectorAll(".burger-layer")[2].classList.remove("b-layer-bottom-active");
	document.querySelectorAll(".burger-layer")[2].classList.add("b-layer-bottom-inactive");

	document.querySelector(".body-wrap").style.left = "0";
	document.querySelector(".mobile-nav-return").style.display = "none";
	managers.menuOpen = false;
}

document.querySelector(".mobile-nav-return").addEventListener("touchstart", () => {
	closeMobile();
});

document.querySelector(".quicklinks").style.height = "0px";
document.querySelector(".links-open").addEventListener("click", () => {
	document.querySelector(".links-modal").style.visibility = "visible";
	document.querySelector(".links-modal").style.opacity = "1";
	document.querySelector(".modal-overlay").style.visibility = "visible";
	document.querySelector(".modal-overlay").style.opacity = "1";
	managers.linksOpen = true;
});

document.querySelector(".close-modal").addEventListener("click", () => {
	document.querySelector(".links-modal").style.visibility = "hidden";
	document.querySelector(".links-modal").style.opacity = "0";
	document.querySelector(".modal-overlay").style.visibility = "hidden";
	document.querySelector(".modal-overlay").style.opacity = "0";
	managers.linksOpen = false;
});


document.querySelector(".modal-overlay").addEventListener("click", () => {
	document.querySelector(".links-modal").style.visibility = "hidden";
	document.querySelector(".links-modal").style.opacity = "0";
	document.querySelector(".modal-overlay").style.visibility = "hidden";
	document.querySelector(".modal-overlay").style.opacity = "0";
	managers.linksOpen = false;
});
