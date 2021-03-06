let settings = {
   scrollCD: 1000,
};

let managers = {
   lastScrollSnap: 0,
   atTop: true,
}



setTimeout(() => {
   document.querySelector(".continue").style.animation = "2s float ease infinite";
}, 1000);

document.querySelector(".continue").addEventListener("click", () => {
   if (managers.atTop && Date.now() - managers.lastScrollSnap > settings.scrollCD) {
      scrollDown();
      managers.atTop = false;
   }
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

window.addEventListener("wheel", (event) => {
   if (event.deltaY > 0 &&
      managers.atTop &&
      Date.now() - managers.lastScrollSnap > settings.scrollCD
   ) {
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