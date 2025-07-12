/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        weather: {
          sunny: '#fbbf24',
          cloudy: '#94a3b8',
          rainy: '#64748b',
          stormy: '#475569',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'weather-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'sunny-bg': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'cloudy-bg': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'rainy-bg': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      }
    },
  },
  plugins: [],
} 