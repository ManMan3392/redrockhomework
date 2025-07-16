//在无法确定一个变量的类型时，
// 且他可能会发生变化，可以使用any(相当于回到js)
//我们可以对any类型的变量进行任何操作
//赋任意值，获取任意方法，无论存不存在
//处理过于复杂的数据时（网络请求复杂数据）
// 或者引入第三方库时缺失类型注解，可以使用



//unkown类型用于未知类型的变量
//再他上做任何操作（获取属性或使用方法）都是不合法的
//类型缩小（其实就是类型校验）后可以使用
let foo: unknown = 'aaa'
foo = 123
if (typeof foo === 'string') {
    //类型缩小
    console.log(foo.length)
}


//函数没有返回值时默认返回值类型为void,
//指明函数返回值为void时，函数可以返回undefined
//应用场景：
//指定函数类型的返回值
type GooType = () => void
const goo: GooType = (...args: any) => {

}
//根据上下文推导的void不强制函数一定不能返回内容


//never表示永远不可达
//一般是类型推导出或框架或通用性工具
// （一些未处理的case会到达never的default,会报错）


//元组类型可以存放不同数据结构，
// 取出来也是不同的值
const info: [string, number, number] = ['why', 1.88, 18]
const value2 = info[1]
//函数中使用元组最多 

function useState(initialState: number): [number, (newValue: number) => void] {
    let stateValue = initialState
    function setStateValue(newValue: number) {
        stateValue = newValue
    }
    return [stateValue, setStateValue]
}

export { }