const { validate } = require("schema-utils")
const loader01_schema = require('./schema/loader01_schema.json')


module.exports = function (source, map, meta) {
  // source:源文件的内容
  // map:source map 相关的数据
  // meta:一些元数据
    console.log(source)
    const options = this.getOptions()
    console.log(options)

    validate(loader01_schema,options)
    // 同步数据处理
    // 1. 直接返回数据，交给下一个loader处理
    return source
    // 2. 通过callback返回数据
    // const callback = this.callback
    // // 第一个参数：错误信息
    // // 第二个参数：处理后的内容
    // // 第三个参数：source map 相关的数据
    // callback(null,source,map,meta)
    // 没有return相当于return undefined
    // 异步数据处理
    // 无论是return还是运用callback都会跳过异步，相当于返回undefined
    // const callback = this.async()
    // setTimeout(() => {
    //     callback(null,source,map,meta)
    // }, 2000);
    //会等到异步操作有结果后返回数据

}