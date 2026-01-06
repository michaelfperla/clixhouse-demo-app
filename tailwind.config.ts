import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Spacing scale - 4px base, intentional values
    spacing: {
      '0': '0px',
      'px': '1px',
      '0.5': '2px',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '20px',
      '6': '24px',
      '8': '32px',
      '10': '40px',
      '12': '48px',
      '14': '56px',
      '16': '64px',
      '20': '80px',
      '24': '96px',
    },
    // Typography scale with proper line-heights
    fontSize: {
      'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.02em' }],
      'sm': ['14px', { lineHeight: '20px' }],
      'base': ['16px', { lineHeight: '24px' }],
      'lg': ['18px', { lineHeight: '28px' }],
      'xl': ['20px', { lineHeight: '28px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '3xl': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em' }],
      '4xl': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
      '5xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em' }],
    },
    // Consistent border radius
    borderRadius: {
      'none': '0',
      'sm': '4px',
      'DEFAULT': '8px',
      'md': '12px',
      'lg': '16px',
      'xl': '24px',
      '2xl': '32px',
      'full': '9999px',
    },
    extend: {
      colors: {
        primary: {
          50: '#fef7f5',
          100: '#feeae6',
          200: '#fcd2ca',
          300: '#f9b0a3',
          400: '#f4806e',
          500: '#ea5a45',
          600: '#d63f2a',
          700: '#b33220',
          800: '#942c1e',
          900: '#7a2a1f',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      // Elevation-based shadow system
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.04)',
        'DEFAULT': '0 2px 4px rgba(0,0,0,0.06)',
        'md': '0 4px 8px rgba(0,0,0,0.08)',
        'lg': '0 8px 16px rgba(0,0,0,0.10)',
        'xl': '0 16px 32px rgba(0,0,0,0.12)',
        'inner': 'inset 0 1px 2px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
export default config
