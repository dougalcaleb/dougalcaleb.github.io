var mobileMenu = false;

alert(screen.width);

document.querySelector(".burger").addEventListener("click", function() {
    if (mobileMenu) {
        document.querySelector(".mobile-nav").classList.remove("mobile-nav-active");
        document.querySelector(".burg1").classList.remove("burg1-active");
        document.querySelector(".burg2").classList.remove("burg2-active");
        document.querySelector(".burg3").classList.remove("burg3-active");
        mobileMenu = false;
    } else {
        document.querySelector(".mobile-nav").classList.add("mobile-nav-active");
        document.querySelector(".burg1").classList.add("burg1-active");
        document.querySelector(".burg2").classList.add("burg2-active");
        document.querySelector(".burg3").classList.add("burg3-active");
        mobileMenu = true;
    }
});