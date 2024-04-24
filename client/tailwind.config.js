/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6666bc",
        "primary-dark": "#4646a0",
        "primary-light": "#ededf7",
        accent: "#ff8c80",
      },
      borderColor: (theme) => ({
        ...theme("colors"),
      }),
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#6666bc", // Required
          "primary-dark": "#4646a0",
          "primary-light": "#ededf7",
          //"primary-content": "",
          secondary: "#e0e7ff", // Required
          //"secondary-content": "",
          accent: "#ff8c80", // Required
          //"accent-content": "",
          neutral: "#2b3440", // Required
          "neutral-content": "#d7dde4",
          "base-100": "#fff", // Required
          "base-200": "#f2f2f2",
          "base-300": "#e5e6e6",
          //"base-content": "",
          //"info": "",
          //"info-content": "",
          //"success": "",
          //"success-content": "",
          //"warning": "",
          //"warning-content": "",
          //"error": "",
          //"error-content": ""
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#4646a0", // Required
          "primary-dark": "#4646a0",
          "primary-light": "#2b3440",
          "base-100": "#292524",
          secondary: "#a6adbb",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
