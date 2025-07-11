class Depend {
    constructor() {
        //防止函数被多次放入
        this.reactiveFns = new Set()
    }
    addDepend() {
        if (reactiveFn) {
            this.reactiveFns.add(reactiveFn)
        }
    }
    notify() {
        this.reactiveFns.forEach(fn => fn())
    }
}

let reactiveFn = null
function watchFn(fn) {
    reactiveFn = fn
    fn()
    reactiveFn = null
}

const objMap = new WeakMap()
function getDepend(obj, key) {
    let map = objMap.get(obj)
    if (!map) {
        map = new Map()
        objMap.set(obj, map)
    }
    let dep = map.get(key)
    if (!dep) {
        dep = new Depend
        map.set(key, dep)
    }
    return dep
}


//vue2实现：Object.defineProperty()
// function reactive(obj) {
//     Object.keys(obj).forEach(key => {
//         let value = obj[key]
//         const dep = getDepend(obj, key)
//         Object.defineProperty(obj, key, {
//             set: function (newValue) {
//                 value = newValue
//                 dep.notify()
//             },
//             get: function () {
//                 dep.addDepend()
//                 return value
//             }
//         })
//     })
//     return obj
// }

//vue3实现,proxy
function reactive(obj) {
    const objProxy = new Proxy(obj, {
        set: function (target, key, newvalue, receiver) {
            Reflect.set(target, key, newvalue, receiver)
            const dep = getDepend(target, key)
            dep.notify()
        },
        get: function (target, key, receiver) {
            const dep = getDepend(target, key)
            dep.addDepend()
            return Reflect.get(target, key, receiver)
        }
    })
    return objProxy
}



//测试代码
const obj = reactive({
    name: "why",
    age: 18,
    address: "广州市"
})

watchFn(function () {
    console.log(obj.name)
    console.log(obj.age)
    console.log(obj.age)
})

watchFn(function () {
    console.log(obj.age)
})
// 修改name
console.log("--------------")
obj.name = "kobe"
// obj.age = 20
// obj.address = "上海市"


console.log("=============== user =================")
const user = reactive({
    nickname: "abc",
    level: 100
})

watchFn(function () {
    console.log("nickname:", user.nickname)
    console.log("level:", user.level)
})

user.nickname = "cba"



//首先，定义一个对象时调用reactive函数包裹，创建代理（拦截器）


//调用需要响应式的函数时，用watchFn包裹
//此时该函数会被赋值给reactiveFn并调用
//当函数中用到某个对象的某个属性值时，会被get拦截
//首先寻找到该属性对应的dep，再将这个函数放进dep.reactiveFns里。
//此时函数被watchFn包裹着，所以reactiveFn对应当前函数。

//当修改被监听的对象的值时，会被set拦截，调用dep.notify()
//即依次调用该属性对应的函数，就实现自动响应式了

//vue2,3的基本逻辑没变，只是内部拦截器有所区别，vue2使用Object.defineProperty(),
//而vue3使用es6新特性Proxy，Reflect。