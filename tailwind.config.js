/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#001946",
        secudaryColor: "#DFEBFF", 
        hoverColor: "#00419D",
        tdColor: "#848484",
      },
      opacity: {
        15: ".15",
      },
    },
  },
  plugins: [],
}

