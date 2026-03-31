import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brew: {
          bg:       '#000000',
          bg2:      '#0a0a0a',
          bg3:      '#141414',
          surface:  '#111111',
          surface2: '#1a1a1a',
          border:   '#333333',
          amber:    '#ffffff',
          gold:     '#f2f2f2',
          'gold-lt': '#ffffff',
          cream:    '#ffffff',
          'cream-dim': '#e6e6e6',
          text:     '#ffffff',
          'text-dim': '#a3a3a3',
          red:      '#cf6679',
        },
      },
      fontFamily: {
        serif: ['Oswald', 'sans-serif'],
        sans:  ['Lora', 'serif'],
        script: ['var(--font-satisfy)', 'cursive'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #111111, #333333)',
        'dark-gradient': 'linear-gradient(135deg, #000000, #111111)',
      },
      boxShadow: {
        'glow-amber': '0 0 30px rgba(255, 255, 255, 0.1)',
        'glow-gold':  '0 0 20px rgba(255, 255, 255, 0.2)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow':  'pulse 3s infinite',
      },
    },
  },
  plugins: [],
}

export default config
