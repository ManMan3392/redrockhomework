function myzthrottle(fn, interval, ...args) {
    let startTime = 0
    const _throttle = function (...arg) {
        arg = [...arg, ...args]
        const nowTime = new Date().getTime()
        let waitTime = interval - (nowTime - startTime)
        if (waitTime <= 0) {
            fn.apply(this, arg)
            startTime = nowTime
        }
    }
    return _throttle
}
const inputss = document.querySelector('.input')
let count = 1
const clg = function (event, myParameter) {
    console.log(`节流函数第${count++}次调用,自定义参数${myParameter}`, event, this.value)
}
inputss.addEventListener('input', myzthrottle(clg, 2000, 1))