/** @type {import('tailwindcss').Config} */

const themeConstants = {
  paper: "#FFFFFF",
  primary: "#F29727",
  primaryDark: "#c47a20",
  secondary: "#9E9E9E",
  black: "#000000",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satochi: ["Satochi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        paper: themeConstants.paper,
        primary: themeConstants.primary,
        primaryDark: themeConstants.primaryDark,
        secondary: themeConstants.secondary,
        black: themeConstants.black,
      },
    },
  },
  plugins: [],
};
