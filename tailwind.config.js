/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#7C3AED',
        accent: '#F59E0B',
        'accent-dark': '#D97706',
        success: '#10B981',
        error: '#EF4444',
        'error-light': '#FEE2E2',
        text: {
          DEFAULT: '#1F2937',
          light: '#6B7280',
          dark: '#111827'
        },
        neutral: {
          lightest: '#F9FAFB',
          light: '#E5E7EB',
          DEFAULT: '#9CA3AF',
          dark: '#4B5563',
          darkest: '#1F2937'
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}; 