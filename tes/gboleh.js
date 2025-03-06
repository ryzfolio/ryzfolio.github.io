const preventScreenshot = () => {
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "black";
    overlay.style.zIndex = "99999";
    overlay.style.opacity = "0";
    overlay.setAttribute("id", "screenshotBlocker");
    document.body.appendChild(overlay);

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            document.getElementById("screenshotBlocker").style.opacity = "1";
        } else {
            document.getElementById("screenshotBlocker").style.opacity = "0";
        }
    });

    setInterval(() => {
        if (screen.width !== window.innerWidth || screen.height !== window.innerHeight) {
            document.getElementById("screenshotBlocker").style.opacity = "1";
        } else {
            document.getElementById("screenshotBlocker").style.opacity = "0";
        }
    }, 500);
};

preventScreenshot();
