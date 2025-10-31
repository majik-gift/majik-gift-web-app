/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#F0DDE6',
          100: '#E6D1DC',
          200: '#D3AFC9',
          300: '#C098B8',
          400: '#B288A4',
          500: '#9C90C2',
          600: '#8A7AB8',
          700: '#7866AE',
          800: '#6652A4',
          900: '#543E9A',
        },
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Libre Bodoni', 'serif'],
        script: ['Dancing Script', 'cursive'],
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'lg': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(156, 144, 194, 0.3)',
        'glow-lg': '0 0 40px rgba(156, 144, 194, 0.4)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #D3AFC9 0%, #9C90C2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #CAC4E0 0%, #F0DDE6 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse': 'pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
