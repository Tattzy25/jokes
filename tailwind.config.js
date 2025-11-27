/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e11d48',
        secondary: '#be185d',
        accent: '#f43f5e',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        'bg-dark': '#0f0a14',
        'bg-darker': '#050208',
        'bg-panel': 'rgba(30, 20, 35, 0.95)',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'glass-bg': 'rgba(255, 255, 255, 0.03)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, #e11d48 0%, #be185d 50%, #f43f5e 100%)',
        'gradient-2': 'linear-gradient(135deg, #be185d 0%, #e11d48 100%)',
        'gradient-3': 'linear-gradient(135deg, #f43f5e 0%, #be185d 100%)',
      },
      animation: {
        'float': 'float 25s infinite ease-in-out',
        'pulse-slow': 'pulse 2s infinite',
        'blink': 'blink 2s infinite',
        'typing': 'typingDot 1.4s infinite ease-in-out',
        'recording': 'recording 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(150px, -100px) scale(1.1)' },
          '50%': { transform: 'translate(-100px, 150px) scale(0.9)' },
          '75%': { transform: 'translate(100px, 100px) scale(1.05)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        typingDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.7' },
          '30%': { transform: 'translateY(-12px)', opacity: '1' },
        },
        recording: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
          '50%': { boxShadow: '0 0 0 15px rgba(239, 68, 68, 0)' },
        },
      },
    },
  },
  plugins: [],
}
