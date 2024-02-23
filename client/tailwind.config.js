/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sofia-Pro", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      ...colors,
      ...{
        blue: {
          50: "#ecf4ff",
          100: "#ddebff",
          200: "#c2daff",
          300: "#9cbfff",
          400: "#759aff",
          500: "#5375ff",
          600: "#364df5",
          700: "#2a3cd8",
          800: "#2535ae",
          900: "#263489",
          950: "#161c50",
        },
        slate: {
          50: "#f4f6f9",
          100: "#eceff3",
          200: "#dce1e9",
          300: "#c5cfdc",
          400: "#adb8cc",
          500: "#98a2bc",
          600: "#767fa2",
          700: "#6e7594",
          800: "#5b6178",
          900: "#4d5162",
          950: "#2d2f39",
        },
      },
    },
  },
  plugins: [],
};
