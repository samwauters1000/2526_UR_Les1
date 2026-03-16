/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1E202C",
        foreground: "#E8ECED",
        accent: "#7217E8",
        "primary-foreground": "#E8ECED",
        sidebar: "#2A2D3A",
        "sidebar-foreground": "#E8ECED",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}