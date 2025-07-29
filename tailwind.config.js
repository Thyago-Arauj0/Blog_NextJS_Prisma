/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // pasta app (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}",  // pasta pages (Next.js 12 ou anterior)
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    // outros plugins que você tiver...
  ],
}
