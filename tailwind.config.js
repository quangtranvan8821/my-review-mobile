const nativewind = require('nativewind/tailwind/native')
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': '#644AB5',
      },
    },
  },
  plugins: [nativewind()],
}
