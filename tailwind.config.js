module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',  // already default
        '3xl': '1920px',  // ✅ custom breakpoint
        '4k': '2560px',   // ✅ custom breakpoint
      },
    },
  },
  plugins: [],
}
