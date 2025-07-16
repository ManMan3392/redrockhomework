//获取DOM元素时使用类选择器无法判断元素类型，
//这时可以使用类型断言
// const img = document.querySelector('img')
//此时img的类型是明确的HTMLImageElement|null(可能无法获取)
// if(img !== null) {
//     //类型缩小
//     img.src = 'ufgcds'
// }

//但我们大部分时间使用的类选择器
// const img = document.querySelector('.img')
// 是无法直接确定是哪种元素的
//此时我们可以使用类型断言减小类型缩小代码
//只可以转换为更具体的类型或不太具体的类型
//（就是不可以同级转，number不能转成string但可以转any,any可以转string）
const img = document.querySelector('.img') as HTMLImageElement
img.src = 'ufcbds'



//非空类型断言（强制告诉ts此处不为空）
interface IPerson {
    name: string,
    age?: number,
    friend?: {
        age: number,
        name: string
    }
}
const info: IPerson = {
    name: 'cghs',
}
// info.friend?.age = 12会报错
info.friend!.age = 12
//强制避免ts类型检查(有点危险，确保有值时使用)


export { }