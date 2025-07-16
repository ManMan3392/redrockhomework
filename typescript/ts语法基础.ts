let message: string = 'hello world'
//String 是js中的字符串包装类
// //string 是ts字符串类型 
// console.log(message)




//数组的类型注解
let names: string[] = ['a', 's', '2']
let numbers: Array<number> = [1, 2, 3]
//在真实的开发中，数组一般存放相同的类型，
// // 不存放不同类型
// let name:[] = ['1','2',3]
let name: any[] = ['1', '2', 3]
names.push('1')
name.push(1)




//对象的类型注解
let info: {
    name: string,
    age: number,
    address: string
} = {
    name: 'wer',
    age: 18,
    address: 'beijing'
}
//不可以直接写object,这样会是空对象
// let infos: object = {
//     name: 'wer',
//     age: 18,
//     address: 'beijing'
// }
// console.log(infos.name)这一行会报错



//函数参数及返回值类型注解
function sum(num1: number, num2: number, ...args: any): number {
    return num1 + num2
}
// sum('1','2')
// console.log(sum(1, 2))


//如果不指明类型注解，会根据赋的值进行类型推导。



//匿名函数参数和返回值不用添加类型注解，
//会自动根据上下文确定类型，这个过程称为上下文类型
// const alphs = ['adc', 'dfg', 'qwe']
// alphs.forEach((item, index, arr) => {
//     console.log(item, index, arr)
// })


//函数里传对象
type pointType = { x: number, y: number, z?: number }//加问号表可选
function position(point: pointType) {
    console.log(point.x)
    console.log(point.y)
}
position({
    x: 22,
    y: 33
})





export { }