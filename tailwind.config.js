/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0d9488",       // Verde esmeralda principal 🌿
        secondary: "#10b981",     // Verde brillante
        accent: "#fbbf24",        // Amarillo cálido
        neutralLight: "#f8fafc",  // Fondo claro
        neutralDark: "#1e293b",   // Gris oscuro
      },
      fontFamily: {
        sans: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
