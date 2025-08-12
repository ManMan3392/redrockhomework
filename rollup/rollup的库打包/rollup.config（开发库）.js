const { default: commonjs } = require("@rollup/plugin-commonjs");
const { default: nodeResolve } = require("@rollup/plugin-node-resolve");
const { default: babel } = require("@rollup/plugin-babel");
const { default: terser } = require("@rollup/plugin-terser");


module.exports = {
  input: "lib/index.js",
  output: [
    {
      format: "umd",
      name: "myutils",
      file: "./build/bundle.umd.js",
      globals: {
        lodash: '_',
      },
    },
    // {
    //   format: "cjs",
    //   file: "./build/bundle.cjs.js",
    // },
    // {
    //   format: "es",
    //   file: "./build/bundle.es.js",
    // },
    // {
    //   format: "iife",
    //   name: "myutils",
    //   file: "./build/bundle.iife.js",

    // },只有一个对象时可以只写一个对象
    ],
  //不打包的模块
    external: ['lodash'],

    plugins: [
        //解决commonjs模块无法打包的问题
        commonjs(),
        //解决node_modules中的模块无法打包的问题
        nodeResolve({
            // 告诉rollup不要打包node_modules中的模块（开发库时常用）
            preferBuiltins: true,
        }),
        //解决babel模块无法打包的问题
        babel({
            // 告诉babel不要打包node_modules中的模块
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',

        }),
        terser()

    ],

};