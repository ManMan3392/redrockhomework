//默认情况下，this是any类型
//特殊编译配置时，不允许有模糊的this
//无法根据上下文正确推导出this就会报错
//函数的第一个参数可以根据该函数之后被调用的情况，用于声明this的类型，名称必须叫this
//在后续函数传入参数时，从第二个参数开始传递，this会在编译后被抹除
function foo(this: { name: string }, info: { name: string }) {
    console.log(this, info)
}
foo.call({ name: 'sdf' }, { name: "kobe" })//必须明确指定this
