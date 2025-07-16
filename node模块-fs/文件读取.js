const fs = require('fs')

// 1.同步读取
const res1 = fs.readFileSync('./abc.txt', {
    encoding: 'utf-8'
})
console.log(res1)

//2.异步读取，调用回调函数
fs.readFile('./abc.txt', {
    encoding: 'utf-8'
}, (err, data) => {
    if (err) {
        console.log('读取错误！', err)
        return
    }
    console.log('读取成功！', data)
})

//3.异步读取，promise
fs.promises.readFile('./abc.txt', {
    encoding: 'utf-8'
}).then(res => console.log('读取成功！', res)).catch(err => console.log('读取失败！', err))