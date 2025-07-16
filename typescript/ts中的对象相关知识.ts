type obj = {
    name?: string,
    readonly age: number
}


//索引签名
interface ICollection {
    [index: number]: string
    [index1: string]: any
    //如果索引签名里面还有其他属性，把也必须符合索引签名
    // [index1: string]: string
    //既可以通过数字索引访问，也可以通过字符串访问，返回字符串类型
}

//使用场景
function iteratorCollection(collection: ICollection) {
    console.log(collection[0])
    //数字类型访问最后都转换成字符串类型
    //所以数字类型返回值必须是字符串返回值的子类型
}

//索引签名必须完全符合
// const arr:ICollection = ['a','s','s']
//数组里还有很多其他属性和方法，例如foreach,map




//接口可以被类实现
interface person {
    name: string
}

class Person implements person {
    constructor(public name: string) {

    }
}

const p1 = new Person('1')
const p2 = new Person('2')
//创建出的所有对象都具备接口特性
