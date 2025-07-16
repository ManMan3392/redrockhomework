//多态：父类引用指向子类方法
//继承是多态的前提，很多通用的调用接口我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式。
//但是，父类本身可能并不需要对某些方法进行具体的实现，所以父类中定义的方法,，我们可以定义为抽象方法



//抽象类有如下的特点：
// 抽象类是不能被实例的话（也就是不能通过new创建）
// 抽象类可以包含抽象方法，也可以包含有实现体的方法
// 有抽象方法的类，必须是一个抽象类
// 抽象方法必须被子类实现，否则该类必须是一个抽象类


abstract class Shape {
    abstract getArea(): number
}

class Retangle extends Shape {
    constructor(public width: number, public height: number) {
        super()
    }
    getArea() {
        return this.width + this.height
    }
}

class Triangle extends Shape {
    getArea(): number {
        return 100
    }
}

function calcArea(shape: Shape) {
    return shape.getArea()
}

calcArea(new Retangle(10, 20))
calcArea(new Triangle())
const a = { getArea: () => 1, height: 12 }
calcArea(a)
//ts类型检查时使用鸭子类型，只关心对象的属性和方法
// calcArea({ getArea: () => 1 ,height:12})会报错
//第一次创建的字面量是新鲜的，这种必须满足严格字面量检测，不能有多余属性



//抽象类通常用于一系列紧密关系的类(is)
// 接口通常是一些行为的描述（has）
// class Dog implement Run
//抽象类是对事物的抽象，表达的是 is a 的关系。猫是一种动物（动物就可以定义成一个抽象类）
//接口是对行为的抽象，表达的是 has a 的关系。猫拥有跑（可以定义一个单独的接口）、爬树（可以定义一个单独的接口）
//的行为。


//接口可以被多层实现，而抽象类只能单一继承；

//抽象类中可以有实现体，接口中只能有函数的声明
