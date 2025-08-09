const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: "development",
  devServer: {
    open: true,
    hot: true,
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
    clean: true,
  },
  resolveLoader: {
    modules: ["node_modules", "./my_loaders"],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "my_loader01.js",
            options: {
              name: "zmy",
              age: 18,
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: ["my_mdloader.js"],
          },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};