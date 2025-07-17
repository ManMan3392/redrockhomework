//联合类型，只需要保证是其中一种就可以
function printId(id: string | number) {
    if (typeof id === 'string') {
        //使用时要缩小联合
        console.log(id.length)
        return
    }
    console.log(id)
}

printId('ehsjchkxc')
printId(374329)


//使用联合类型时一般使用类型别名
type id = string | number

//接口(interface)声明只可以声明对象
//interface可以多次声明,
// type不允许两个相同名称的别名同时存在

interface objType {
    num: number,
    name: string
}
interface objType {
    age?: number
}

//需要满足两个条件
const person: objType = {
    num: 73429,
    name: 'dhdjc',
    age: 12
}

//interface（接口）支持继承
interface IPerson extends objType {
    kouhao: string
}
const idol: IPerson = {
    num: 342,
    name: '2dsc',
    kouhao: 'dfcdsv'
}

//非对象类型一般使用type,
//对象使用interface扩展性更强，
//希望自定义接口拥有一些第三方某一个类型的所有属性
//可以对其进行一些扩展
export { }