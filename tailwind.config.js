/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        card: {
          DEFAULT: 'rgb(17, 24, 39)',
          foreground: 'rgb(255, 255, 255)',
        },
      },
    },
  },
  plugins: [],
}
