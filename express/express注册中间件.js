const express = require('express')

const app = express()

//当express接受到客户端发送的网络请求时，在所有中间件中开始匹配
//当匹配到第一个符合要求的中间件时，就会执行。
//后续的是否执行取决于上一个是否执行next
// app.use((req, res, next) => {
//     console.log('use中间件1')
//     next()
// })

// app.use((req, res, next) => {
//     console.log('use中间件2')
//     res.end('中间件2')
// })

//路径匹配中间件,不限制请求方式
// app.use('/login', (req, res, next) => {
//     res.end('中间件login')

// })

// app.use('/home', (req, res, next) => {
//     console.log('use中间件home')
//     res.end('中间件home')
// })

//既校验路径也校验方法
// app.post('/login', (req, res, next) => {
//     res.end('中间件login')

// })

// app.get('/home', (req, res, next) => {
//     console.log('use中间件home')
//     res.end('中间件home')
// })


//一次注册多个中间件(处理逻辑比较复杂时，调next函数接着调用第二个中间件)

app.get('/home', (req, res, next) => {
    console.log('use中间件home')
    next()
}, (req, res, next) => {
    next()
}, (req, res, next) => {
    res.end('中间件home')

})



app.listen(9000, () => {
    console.log('express服务器开启~')
})