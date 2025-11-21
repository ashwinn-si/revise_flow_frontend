/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Neutral background colors
        background: {
          DEFAULT: '#FFFFFF',        // Light theme main bg
          secondary: '#F8FAFC',      // Light theme secondary bg
          tertiary: '#F1F5F9',       // Light theme tertiary bg
          dark: '#0F172A',           // Dark theme main bg
          'dark-secondary': '#1E293B', // Dark theme secondary bg
          'dark-tertiary': '#334155',  // Dark theme tertiary bg
        },

        // Primary color palette (Purple)
        primary: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',            // Main primary (Purple)
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
          DEFAULT: '#8B5CF6',
        },

        // Secondary color palette (Complementary Teal/Emerald)
        secondary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',            // Main secondary (Emerald)
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
          DEFAULT: '#10B981',
        },

        // Accent colors
        accent: {
          success: '#10B981',        // Green for success states
          warning: '#F59E0B',        // Amber for warnings
          error: '#EF4444',          // Red for errors
          info: '#06B6D4',           // Cyan for info
        },

        // Text colors for light theme
        text: {
          primary: '#0F172A',        // Main text (dark slate)
          secondary: '#475569',      // Secondary text (slate)
          tertiary: '#64748B',       // Tertiary text (lighter slate)
          disabled: '#94A3B8',       // Disabled text
          inverse: '#FFFFFF',        // White text for dark backgrounds
        },

        // Text colors for dark theme
        'text-dark': {
          primary: '#F8FAFC',        // Main text (light)
          secondary: '#E2E8F0',      // Secondary text
          tertiary: '#CBD5E1',       // Tertiary text
          disabled: '#64748B',       // Disabled text
          inverse: '#0F172A',        // Dark text for light backgrounds
        },

        // Border colors
        border: {
          DEFAULT: '#E2E8F0',        // Light theme default border
          secondary: '#CBD5E1',      // Light theme secondary border
          dark: '#334155',           // Dark theme default border
          'dark-secondary': '#475569', // Dark theme secondary border
        },

        // Surface colors (for cards, modals, etc.)
        surface: {
          DEFAULT: '#FFFFFF',        // Light theme surface
          secondary: '#F8FAFC',      // Light theme secondary surface
          dark: '#1E293B',           // Dark theme surface
          'dark-secondary': '#334155', // Dark theme secondary surface
        },

        // Legacy colors (keeping for backward compatibility)
        'soft-border': '#E6E9EE',
      },
      spacing: {
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
      },
      borderRadius: {
        'xl': '12px',
      },
    },
  },
  plugins: [],
}