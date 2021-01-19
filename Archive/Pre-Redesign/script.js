var mobileMenu = false;

document.querySelector(".burger").addEventListener("click", function() {
    if (mobileMenu) {
        document.querySelector(".mobile-nav").classList.remove("mobile-nav-active");
        document.querySelector(".burg0").classList.remove("burg0-active");
        document.querySelector(".burg1").classList.remove("burg1-active");
        document.querySelector(".burg2").classList.remove("burg2-active");
        document.querySelector(".name").style.opacity="1";
        mobileMenu = false;
    } else {
        document.querySelector(".mobile-nav").classList.add("mobile-nav-active");
        document.querySelector(".burg0").classList.add("burg0-active");
        document.querySelector(".burg1").classList.add("burg1-active");
        document.querySelector(".burg2").classList.add("burg2-active");
        document.querySelector(".name").style.opacity="0";
        mobileMenu = true;
    }
});