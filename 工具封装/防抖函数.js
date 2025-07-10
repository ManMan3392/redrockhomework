function myzdebounce(fn, delay, immediate = false, ...args) {
    let timer = null
    let isInvoke = false
    const _debounce = function (...arg) {
        arg = [...arg, ...args]
        if (timer) clearTimeout(timer)
        if (immediate && !isInvoke) {
            fn.apply(this, arg)
            isInvoke = true
            console.log('立即调用')
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, arg)
            timer = null
            isInvoke = false
        }, delay)
    }
    _debounce.cancel = () => {
        clearTimeout(timer)
        timer = null
        console.log('取消发送')
    }
    return _debounce
}
//测试代码
// const inputss = document.querySelector('.input')
// const cancel = document.querySelector('.cancel')
// let count = 1
// const clg = function (event, myParameter) {
//     console.log(`防抖函数第${count++}次调用,自定义参数${myParameter}`, event, this.value)
// }
// const my_debounce = myzdebounce(clg, 500, false, 1)
// inputss.addEventListener('input', my_debounce)
// cancel.addEventListener('click', my_debounce.cancel)

//被打断就重新开始计时，只发送最后一次请求
//myzdebounce()这种传参方式会让函数立即执行(相当于直接传my_debounce)，所以input绑定的是myzdebounce的返回值
//即_debounce，当出发输入事件时，_debounce会执行，当运行到第六行时遇到timer，先在自己的环境记录中查找，未找到，于是顺着作用域链往上找，在myzdebounce函数的作用域内找到并使用，
//正是因为myzdebounce被_debounce的外部词法环境指向，才不会被清除，同时能在不同次调用_debounce函数时保留timer值
//这正是闭包的魅力所在