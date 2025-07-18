const path = require('path')
const CracoLess = require('craco-less')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  plugins: [
    {
      plugin: CracoLess,
    },
  ],
  webpack: {
    alias: {
      '@': resolve('src'),
    },
  },
}
