import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark: {
          bg: '#0a0f1a',
          card: '#111827',
          'card-hover': '#1a2332',
          border: 'rgba(245, 240, 232, 0.08)',
          'border-hover': 'rgba(45, 212, 191, 0.25)',
          text: '#f5f0e8',
          muted: '#a8a29e',
          'muted-dim': '#78716c',
          accent: '#2dd4bf',
          'accent-hover': '#5eead4',
          secondary: '#d4a574',
          tertiary: '#c9787c',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'scan': 'scan 12s linear infinite',
        'gradient-x': 'gradient-x 25s ease infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
