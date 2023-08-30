import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.js', './Core/*.js', './Core/**/*.js', './Core/**/**/*.js', './Data/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
} satisfies Config

