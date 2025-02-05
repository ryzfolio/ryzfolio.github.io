const container = document.querySelectorAll(".container");

const muncul = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.4 });

container.forEach(el => muncul.observe(el));
