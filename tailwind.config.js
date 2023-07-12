const themeColors = require("./theme/color");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        "in-shake": "cubic-bezier(.26,2,.46,.71)",
      },
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      current: "currentColor",
      ...themeColors,
    },
    boxShadow: {
      1: "2px 4px 8px 0 rgb(0 0 0 / 10%)",
      2: "2px 4px 8px 0 rgb(0 0 0 / 25%)",
    },
  },
  darkMode: "class",
  plugins: [],
};
