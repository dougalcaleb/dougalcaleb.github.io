window.addEventListener("scroll", function() {
    var top = window.scrollY;
    document.querySelector(".resume").style.top = (100+(top/2))+"px";
});