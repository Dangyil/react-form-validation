/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          500: '#ff7a7e',
          600: '#ff5a5f',
          700: '#d9534f',
        },
        secondary: {
          500: '#38cc8c',
          600: '#28a745',
          700: '#1e8449',
        },
        slate: {
          200: '#d4d4d8',
          400: '#a1a1aa',
          600: '#52525b',
          900: '#18181b',
        },
        purple: {
          600: '#5E548E',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'intro-desktop': "url('./src/assets/bg-intro-desktop.png')",
        'intro-mobile': "url('./src/assets/bg-intro-mobile.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
