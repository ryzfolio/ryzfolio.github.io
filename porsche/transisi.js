document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 1000);

});
