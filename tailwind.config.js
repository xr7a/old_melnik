/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}", "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8053FF',
        'body': '#23155B',
        'green': '#00D386',
        'main-gray': '#928CAB',
        'white-gray': '#FBFAFF'
      },
      fontFamily: {
        popBold: ["Poppins Bold", "sans-serif"],
        popRegular: ["Poppins Regular", "sans-serif"],
        popMedium: ["Poppins Medium", "sans-serif"]
      }
    },
  },
  plugins: [],
}

