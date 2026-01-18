/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "accent-grey": "#F5F5F5",
        "border-soft": "#E5E5E5",
      },
      fontFamily: {
        "serif": ["Playfair Display", "serif"],
        "sans": ["Inter", "sans-serif"]
      },
      letterSpacing: {
        "editorial": "0.05em",
        "widest-editorial": "0.2em",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
