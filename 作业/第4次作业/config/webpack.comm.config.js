const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
  entry: {
    index: './js/index.js',
    list: './js/list.js',
    playlist: './js/playlist.js',
    search: './js/search.js',
    singer: './js/singer.js'
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    // 使用 [name] 占位符，让每个入口文件生成不同的输出文件名
    filename: "[name].js"
  },
  devServer: {
    hot: true,
    open: true
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", "css-loader",
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
          "postcss-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name]_[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "网易云音乐",
      template: "./html/index.html",
      filename: "index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      title: "歌单广场",
      template: "./html/list.html",
      filename: "list.html",
      chunks: ["list"]
    }),
    new HtmlWebpackPlugin({
      title: "歌单详情",
      template: "./html/playlist.html",
      filename: "playlist.html",
      chunks: ["playlist"]
    }),
    new HtmlWebpackPlugin({
      title: "搜索",
      template: "./html/search.html",
      filename: "search.html",
      chunks: ["search"]
    }),
    new HtmlWebpackPlugin({
      title: "歌手页",
      template: "./html/singer.html",
      filename: "singer.html",
      chunks: ["singer"]
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      VERSION: "1+1",
      MY_NAME: "'coderwhy'",
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false"
    })
  ]
};