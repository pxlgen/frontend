module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {},
    cursor: {
      auto: "auto",
      default: "default",
      pointer: "pointer",
      crosshair: "crosshair",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
