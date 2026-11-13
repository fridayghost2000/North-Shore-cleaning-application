/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors from the cleaning app design
        primary: {
          50:  '#e8f4fd',
          100: '#c5e3fa',
          200: '#9fd0f7',
          300: '#72bcf3',
          400: '#4dace1',
          500: '#2196C9',  // main brand blue
          600: '#1a7fb0',
          700: '#136694',
          800: '#0d4e75',
          900: '#073857',
        },
        accent: {
          500: '#00C2CB',  // teal accent
          600: '#00a8b0',
        },
        surface: '#F7F9FC',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(33, 150, 201, 0.08)',
        'card-hover': '0 8px 32px rgba(33, 150, 201, 0.16)',
        'btn': '0 4px 14px rgba(33, 150, 201, 0.35)',
      },
    },
  },
  plugins: [],
}
