if (screen.width > screen.height) {
   document.querySelector(".background").style.background = `url("../images/backgrounds/LPG Blue.png")`;
   document.querySelector(".background").style.backgroundPosition = "center center";
   document.querySelector(".background").style.backgroundSize = "cover";
} else {
   document.querySelector(".background").style.background = `url("../images/backgrounds/LPG Blue Mobile.png")`;
   document.querySelector(".background").style.backgroundPosition = "center center";
   document.querySelector(".background").style.backgroundSize = "cover";
}