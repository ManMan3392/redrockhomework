const path = require('path')
const CracoLess = require('craco-less')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  plugins: [
    {
      plugin: CracoLess,
      options: {
        lessLoadrOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1677ff', // 自定义主题
              '@border-radius-base': '4px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': resolve('src'),
    },
  },
}
