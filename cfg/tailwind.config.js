const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./panels/**/*.{tsx,html}"],
  darkMode: "media",
  plugins: [
    addDynamicIconSelectors()
  ]
}
