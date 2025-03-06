document.addEventListener("keydown", function (e){
    if(e.key==="PrintScreen"){
        alert("Screenshot dilarang! - Akses diblokir!");
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "s"){
        e.preventDefault();
        alert("Aksi dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "p"){
        e.preventDefault();
        alert("Printing dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "u"){
        e.preventDefault();
        alert("Aksi dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "d"){
        e.preventDefault();
        alert("Bookmark dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "S"){
        e.preventDefault();
        alert("Aksi dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "P"){
        e.preventDefault();
        alert("Printing dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "U"){
        e.preventDefault();
        alert("Aksi dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "D"){
        e.preventDefault();
        alert("Bookmark dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.ctrlKey && e.key === "o"){
        e.preventDefault();
        alert("Buka File dilarang! - Akses diblokir!")
        document.body.innerHTML = "";
    }
    if(e.key==="F12"){
        alert("DevTool dilarang! - Akses diblokir!");
        document.body.innerHTML = "";
        console.log("Changing URL ...")
        window.location.href = "https://google.com";
    }
})

document.addEventListener("dragstart", function (e) {
    e.preventDefault();
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("Akses Diblokir!");
});

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        document.body.style.display = "none"; // Layar jadi hitam pas user ambil SS
        setTimeout(() => document.body.style.display = "block", 3000);
    }
});
