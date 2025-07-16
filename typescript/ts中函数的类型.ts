//函数类型表达式
type barType = (num1: number) => number
//函数类型： (形参名:类型) => 返回值类型
//函数类型： (只写一个 表  形参名:any) => 返回值类型
const bar: barType = (arg: number): number => {
    return 123
}
//ts对传入的函数参数多余个数不校验，因为有些默认参数不会用到，如foreach



//函数的调用签名（call signatures）
//从对象的角度看待函数，描述函数属性
interface IBar {
    name: string,
    age: number,
    //签名
    // (参数列表):返回值
    (num1: number): number
}


//只描述函数本身使用函数类型表达式
//可以作为对象被调用且描述其属性就用函数调用签名


//构造签名（函数运用new运算符时）
class Person {

}
interface ICTORPerson {
    new(): Person
}
function factory(fn: ICTORPerson) {
    const f = new fn()
    return f
}

factory(Person)

//可选参数
function foo(x: number, y?: number) {
    //y为undefined,使用时要用类型缩小

}
foo(10)
function goo(x: number, y = 100) {
    //y类型注解可以省略，可以传入undefined
}

//剩余参数
function bars(...args: any[]) {
    console.log(args)
}
bars(123, 321, 1234)



//函数的重载
//我们可以编写不同的重载签名表示函数可以以不同的方式进行调用
//一般是编写两个及以上的重载签名，在编写一个通用的函数实现

//先编写重载签名，不需要实现体
function add(arg1: number, arg2: number): number
function add(arg1: string, arg2: string): string

//通用函数：
function add(arg1: any, arg2: any) {
    return arg1 + arg2
}

console.log(add(10, 29))
console.log(add('aaa', 'sss'))
//通用函数不能被调用
// add(13, 'sss')

//函数的重载和联合类型的区别
//当只有参数不同时既可以使用函数重载也可以使用联合类型实现
//能用联合类型尽量使用联合类型





export { }