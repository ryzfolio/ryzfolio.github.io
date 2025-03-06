
    let jamBuka = 8; // Jam 5 sore
    let jamTutup = 5;  // Jam 5 pagi
    let redirectURL = "https://www.google.com"; // Ganti ke halaman yang diinginkan

    function cekWaktuAkses() {
        let sekarang = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
        let jam = new Date(sekarang).getHours();

        console.log("Jam sekarang (WIB):", jam); // DEBUG

        // Jika di luar jam akses, blokir halaman
        if (!(jam >= jamBuka || jam < jamTutup)) {
            document.body.innerHTML = ""; // Kosongkan halaman
            setTimeout(() => { window.location.href = redirectURL; }, 1000); // Redirect setelah 3 detik
        }
    }

    // Cek saat halaman dimuat
    cekWaktuAkses();

    setTimeout(() => {
        location.reload();
    }, 1800000);