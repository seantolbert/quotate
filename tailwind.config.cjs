/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        slate800Shadow: "-20px 20px 60px #0c1118, 20px -20px 60px #30415e",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
