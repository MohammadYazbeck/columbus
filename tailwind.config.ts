import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#120E0F',
          foreground: '#F2F2F2'
        },
        secondary: {
          DEFAULT: '#EFEFEA',
          foreground: '#1A1A1A'
        },
        accent: {
          DEFAULT: '#FF0000',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#DAD7D2',
          foreground: '#4A4742'
        },
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#F2F2F2'
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A'
        }
      },
      borderRadius: {
        lg: '0.625rem',
        md: 'calc(0.625rem - 2px)',
        sm: 'calc(0.625rem - 4px)'
      },
      fontFamily: {
        sans: ['var(--font-urbanist)', ...fontFamily.sans],
        arabic: ['var(--font-cairo)', ...fontFamily.sans]
      },
      keyframes: {
        'steam-rise': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.95)' },
          '50%': { opacity: '0.75', transform: 'translateY(-10px) scale(1.05)' },
          '100%': { opacity: '0', transform: 'translateY(-30px) scale(1.08)' }
        }
      },
      animation: {
        'steam-rise': 'steam-rise 6s ease-in-out infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
