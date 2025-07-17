//可以通过判断语句改变ts执行路径，
// 在给定的执行路径中，
// 我们为你可以缩小比变量更小的类型，
// 我们趁这个过程为缩小
//而我们编写的判断语句可以称之为类型保护
//常见的类型保护语句有
//typeof
//平等缩小：=== !==，一般判断字面量类型 
//instanceof
// in

interface ISwim {
    swim: () => void
}
interface IRun {
    run: () => void
}
const fish:ISwim = {
    swim: function(){}
}
const dog:IRun = {
    run: function(){}
}
function move(animal: IRun | ISwim) {
    if('swim' in animal) {
        //if(animal.swim)是错误的，会报错，
        //因为不一定存在此属性，不能直接访问
        animal.swim()
    }
    else {
        animal.run()
    }
}