module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1920px'
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: '#e91e63',
        secondary: '#7b809a',
        info: '#1A73E8',
        success: '#4CAF50',
        warning: '#fb8c00',
        error: '#f44335',
        light: '#f0f2f5',
        dark: '#344767',
        'light-100': '#f8f9fa',
        'light-200': '#f0f2f5',
        'light-300': '#dee2e6',
        'light-400': '#ced4da',
        'light-500': '#adb5bd',
        'light-600': '#6c757d',
        'light-700': '#495057',
        'light-800': '#343a40',
        'light-900': '#212529'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
