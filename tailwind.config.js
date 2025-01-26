/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', //app路由
    './pages/**/*.{js,ts,jsx,tsx,mdx}', //page路由
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/preline/preline.js', // preline
  ],
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin')],
}
