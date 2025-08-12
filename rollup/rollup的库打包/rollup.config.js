const { default: commonjs } = require("@rollup/plugin-commonjs");
const { default: nodeResolve } = require("@rollup/plugin-node-resolve");
const { default: babel } = require("@rollup/plugin-babel");
const { default: terser } = require("@rollup/plugin-terser");
const postcss = require("rollup-plugin-postcss");
const vue = require("rollup-plugin-vue");
const replace = require("@rollup/plugin-replace");
const isProduction = process.env.NODE_ENV === "production";
const plugin = [
  //解决commonjs模块无法打包的问题
  commonjs(),
  //解决node_modules中的模块无法打包的问题
  nodeResolve(),
  //解决babel模块无法打包的问题
  babel({
    // 告诉babel不要打包node_modules中的模块
    exclude: "node_modules/**",
    babelHelpers: "bundled",
  }),
  postcss(),
  vue(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true, // 防止替换时出现警告
  }),
];

if (isProduction) {
  plugin.push(terser());
}

module.exports = {
  input: "src/index.js",
  output: {
    format: "umd",
    name: "myutils",
    file: "./dist/bundle.umd.js",
  },
  //不打包的模块
  // external: ['lodash'],

  plugins: plugin,
};
