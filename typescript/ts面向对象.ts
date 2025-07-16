class Person {
    //先声明成员属性
    public _name!: string
    //加叹号表示不必检测未初始化（开启某个配置后）
    private age: number
    //readonly表只读属性
    readonly address: string
    //初始化可以类型推导
    constructor(name: string, age: number, address: string) {
        this._name = name
        this.age = age
        this.address = address
    }

    eating() {
        //类型推导出this
        console.log(this._name + '333')
    }


    //setter何getter可以使外部访问内部属性
    //可以进行拦截操作
    set name(newValue: string) {
        this._name = newValue
    }
    get name(): string {
        return this._name
    }

}
//语法糖
class People {
    constructor(public name: string) {
        //参数属性，可以通过在构造参数前添加一个可见的修饰符（public,private,prtected,readonly）
        //就可以不在上面特殊注明
    }
}
const p1 = new Person('ad', 12, 'tdgk')
// p1.age


//类的成员修饰符
//public表示在任何地方可见的属性和方法，默认
//private变成私有方法，只有类内部才能访问
//protected仅在本身或子类中可访问



export { }