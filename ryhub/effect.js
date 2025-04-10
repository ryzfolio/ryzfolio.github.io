  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#2F80ED" },
      shape: { type: "circle" },
      opacity: { value: 0.3 },
      size: { value: 5 },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#2F80ED",
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 2
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        repulse: { distance: 100 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
