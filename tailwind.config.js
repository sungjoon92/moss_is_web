/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // tailwind.config.js
    extend: {
      keyframes: {
        "zoom-in": {
          "0%": { transform: "scale(1) translateX(0)" },
          "25%": { transform: "scale(1.5) translateX(-5%)" },
          "75%": { transform: "scale(1.7) translateX(5%)" },
          "100%": { transform: "scale(1) translateX(0)" },
        },
      },
      animation: {
        "zoom-in": "zoom-in 60s ease-in-out forwards infinite alternate",
      },
    },
  },
  plugins: [],
};
