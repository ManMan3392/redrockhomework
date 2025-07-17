
//泛型约束：

//获取传入的内容，此内容必须有length属性，不改变类型
function getInfo<Type extends { length: number }>(args: Type): Type {
    return args
}
//Type相当于是一个变量，用于记录本次调用的类型
//所以在整个函数的执行周期中，一直保留着参数的类型
getInfo("aaaa")
getInfo(["aaaa", "aaa", "eee", "rvgd"])
getInfo({ length: 100 })



//传入的key类型是obj的key其中之一
interface Idiol {
    name: string,
    age: number
}

type IdiolKeys = keyof Idiol  //相当于string|number

function getObjectProperty<O, K extends keyof O>(obj: O, key: K) {
    return obj[key]
}
const info = {
    name: "why",
    age: 132,
    address: "jcdk"
}

//这样传入一个对象之后可以知道他具有哪些属性
const name = getObjectProperty(info, "name")







//映射类型(复制一个类型，且可以对其进行修改)
type MapPerson<Type> = {
    //索引类型依次进行使用
    [key in keyof Type]: Type[key]
}
interface Iperson {
    name: string,
    age: number
}
type NewPerson = MapPerson<Iperson>

//修改：
type MapPersonOptionalRead<Type> = {
    //索引类型依次进行使用
    readonly [key in keyof Type]?: Type[key]
}
type NewOptionalPersonOptional = MapPersonOptionalRead<Iperson>

//删除属性修饰符
type MapPersonOptional<Type> = {
    //索引类型依次进行使用
    -readonly [key in keyof Type]?: Type[key]
}
type NewPersonOptional = MapPersonOptional<NewOptionalPersonOptional>

export { }