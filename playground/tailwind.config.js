import { addDynamicIconSelectors } from '@iconify/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  darkMode: "class",
  content: ['./**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    addDynamicIconSelectors()
  ]
}