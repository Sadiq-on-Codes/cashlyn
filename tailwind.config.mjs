/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#171C23',
          lime: '#D6FF4B',
        },
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6',   // blue-500
          dark: '#1e40af',    // blue-800
        },
        secondary: {
          DEFAULT: '#f59e42', // orange-400
          light: '#fbbf24',   // orange-300
          dark: '#b45309',    // orange-800
        },
        accent: {
          DEFAULT: '#a21caf', // purple-700
          light: '#d946ef',   // fuchsia-400
          dark: '#701a75',    // fuchsia-900
        },
        success: {
          DEFAULT: '#22c55e', // green-500
          light: '#4ade80',   // green-400
          dark: '#15803d',    // green-800
        },
        warning: {
          DEFAULT: '#eab308', // yellow-400
          light: '#fde047',   // yellow-200
          dark: '#a16207',    // yellow-800
        },
        error: {
          DEFAULT: '#ef4444', // red-500
          light: '#f87171',   // red-400
          dark: '#991b1b',    // red-900
        },
        info: {
          DEFAULT: '#0ea5e9', // sky-500
          light: '#38bdf8',   // sky-400
          dark: '#0369a1',    // sky-900
        },
        neutral: {
          DEFAULT: '#64748b', // slate-500
          light: '#cbd5e1',   // slate-200
          dark: '#334155',    // slate-800
        },
        lime: {
          300: '#D6FF4B',
        },
        gray: {
          50: '#F8F9FA',
          100: '#f3f4f6',
          200: '#E2E8F0',
          300: '#d1d5db',
          400: '#A0AEC0',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0,0,0,0.05)',
        'md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        'lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        'xl': '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '68': '17rem',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '100': '100',
        '999': '999',
        '9999': '9999',
      },
    },
  },
  plugins: [],
};

export default config; 