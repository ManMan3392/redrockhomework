const { merge } = require("webpack-merge")
const webpackCommonConfig = require("./webpack.comm.config")

module.exports = merge(webpackCommonConfig, {
  mode: "development",
  devServer: {
    // hot: true
  }
})