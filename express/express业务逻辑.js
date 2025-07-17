const express = require('express')

//1.创造服务器
const app = express()
// app.use((req, res, next) => {
//     if (req.headers['content-type'] === 'application/json') {
//         req.on('data', (data) => {
//             const jsonInfo = JSON.parse(data.toString())
//             req.body = jsonInfo
//         })
//         req.on('end', () => {
//             next()
//         })
//     } else {
//         next()
//     }
// })


//express提供封装好的
app.use(express.json())
//解析urlencoded格式数据,extended:使用第三方库
// app.use(express.urlencoded(extended:true))


//客户端访问login页面，发送post请求
app.post('/login', (req, res) => {
    //处理login请求
    let islogin = false
    if (req.body.name === 'zmy' && req.body.password === '123456') {
        islogin = true
    }
    if (islogin) res.end('登陆成功，欢迎回来')
    else {
        res.end('登陆失败，检查用户名或者密码')
    }
})

//2. 启动服务器并监听端口
app.listen(9000, () => {
    console.log('express服务器启动成功！')
})