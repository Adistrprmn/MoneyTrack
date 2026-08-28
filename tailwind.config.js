/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          soft: "rgb(var(--color-ink-soft) / <alpha-value>)",
        },

        paper: {
          DEFAULT: "rgb(var(--color-paper) / <alpha-value>)",
          card: "rgb(var(--color-paper-card) / <alpha-value>)",
          line: "rgb(var(--color-paper-line) / <alpha-value>)",
        },

        forest: {
          50: "rgb(var(--color-forest-50) / <alpha-value>)",
          100: "rgb(var(--color-forest-100) / <alpha-value>)",
          300: "rgb(var(--color-forest-300) / <alpha-value>)",
          500: "rgb(var(--color-forest-500) / <alpha-value>)",
          600: "rgb(var(--color-forest-600) / <alpha-value>)",
          700: "rgb(var(--color-forest-700) / <alpha-value>)",
        },

        gain: {
          DEFAULT: "rgb(var(--color-gain) / <alpha-value>)",
          soft: "rgb(var(--color-gain-soft) / <alpha-value>)",
        },

        loss: {
          DEFAULT: "rgb(var(--color-loss) / <alpha-value>)",
          soft: "rgb(var(--color-loss-soft) / <alpha-value>)",
        },

        gold: {
          DEFAULT: "rgb(var(--color-gold) / <alpha-value>)",
        },
      },

      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },

      borderRadius: {
        xl2: "1.25rem",
      },

      boxShadow: {
        card:
          "0 1px 2px rgba(22,33,29,0.04), 0 8px 24px -12px rgba(22,33,29,0.12)",
      },
    },
  },

  plugins: [],
}