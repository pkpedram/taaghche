/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Core/*.{js,ts,jsx,tsx,mdx}",
    "./Core/**/*.{js,ts,jsx,tsx,mdx}",
    "./Core/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./Data/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          blue: "#00a2a4"
        },

        light: {
          gray: '#f5f5f5'
        }
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
