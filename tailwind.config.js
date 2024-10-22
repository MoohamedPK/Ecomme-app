/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%": "scale(1)",
          "20%": "scale(0.8)",
          "30%": "scale(1.1)",
          "50%": "scale(1.7)",
          "100%": "scale(1)",
        },
      },
      animation: {
        bounce: "bounce 300ms ease-out",
      }
    },
  },
  plugins: [],
};

