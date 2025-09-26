export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],   // 👈 new
      },
      colors: {
        brandPink: "#FCEEEF", // matches Figma pink
        brandBlue: "#007ACC"  // matches Figma blue
      }
    },
  },
  plugins: [],
}