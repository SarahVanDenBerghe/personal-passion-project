// Generate a config at https://vincentgarreau.com/particles.js/

export default {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 500,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
    },
    opacity: {
      value: 0.2,
      random: false,
      anim: {
        enable: false,
      },
    },
    size: {
      value: 2.5,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'bottom',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
      },
    },
  },

  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: false,
      },
      resize: true,
    },
  },
};
