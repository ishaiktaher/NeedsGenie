/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        softPulse: {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(37, 99, 235, 0.4)",
          },
          "50%": {
            transform: "scale(1.03)",
            boxShadow: "0 0 0 10px rgba(37, 99, 235, 0)",
          },
        },
      },
      animation: {
        softPulse: "softPulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
