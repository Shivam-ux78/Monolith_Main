/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        "midnight-blue": "#0A192F",
        cyan: {
          accent: "#00FFFF"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 255, 255, 0.4)',
      }
    },
  },
  plugins: [],
}
