/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f5f3f0',
          100: '#ece8e1',
          200: '#d5cfc4',
          300: '#b8afa0',
          400: '#9a8e7d',
          500: '#7e7063',
          600: '#655a4f',
          700: '#524842',
          800: '#453d38',
          900: '#3c3531',
          950: '#201d1a',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        sage: {
          400: '#86a89a',
          500: '#6b9283',
          600: '#527a6c',
        },
        rust: {
          400: '#e07c5a',
          500: '#d05f3a',
          600: '#b84d2c',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'slide-in': 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'progress-fill': 'progressFill 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        progressFill: {
          from: { width: '0%' },
          to: { width: 'var(--progress-width)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
