const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@rssmarkable/config/ui/tailwind")],
  content: [
    "src/app/**/*.{ts,tsx}",
    "src/components/**/*.{ts,tsx}",
    "src/config/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
    },
  },
};
