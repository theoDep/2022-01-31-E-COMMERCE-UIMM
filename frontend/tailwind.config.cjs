/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      tablet: "768px",
      desktop: "1024px",
    },
  },
  plugins: [require("daisyui")],
};
