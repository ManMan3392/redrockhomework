const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { type } = require('os')

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".js", ".cjs", ".json"]
    },
    devServer: {},
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ]

}