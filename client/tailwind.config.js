/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode based on the 'class' strategy
  content: [
    "./index.html", // Important for Vite's index.html
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Default font
        mono: ['"Roboto Mono"', 'monospace'], // For code-like text
      },
      colors: {
        // Dark Mode Colors (Deep Cyberpunk / Hacker)
        'dark-bg-primary': '#0A0A0A', // Near black background
        'dark-bg-secondary': '#1A1A1A', // Slightly lighter for sections/cards
        'dark-border-primary': '#0F0', // Bright Green (for borders, accents)
        'dark-border-secondary': '#8A2BE2', // Blue Violet (secondary accent border)
        'dark-text-light': '#F0F0F0', // Light gray for primary text
        'dark-text-medium': '#B0B0B0', // Medium gray for secondary text
        'dark-text-dark': '#707070', // Darker gray for subtle text

        // Light Mode Colors (Clean & Professional)
        'light-bg-primary': '#F8F8F8', // Very light gray background
        'light-bg-secondary': '#FFFFFF', // White for sections/cards
        'light-border-primary': '#32CD32', // Lime Green (for borders, accents)
        'light-border-secondary': '#6A5ACD', // Slate Blue (secondary accent border)
        'light-text-light': '#212121', // Dark text for primary
        'light-text-medium': '#424242', // Medium text for secondary
        'light-text-dark': '#757575', // Light gray for subtle text

        // Accent Colors (can be used in both themes, or define light/dark specific accents)
        'accent-primary': '#9333ea', // Deep Purple (for main accents, buttons)
        'accent-secondary': '#32CD32', // Neon Green (for secondary accents, highlights)
        'error-red': '#DC2626', // Standard Red for errors
      }
    },
  },
  plugins: [],
}
