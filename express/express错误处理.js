const express = require('express')

//1.创造服务器
const app = express()


app.use(express.json())

//客户端访问login页面，发送post请求
app.post('/login', (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) next(-1001)
    else if (username !== 'zmy' || password !== 123) next(-1002)
    else {
        res.json({
            code: 0,
            message: '欢迎回来',
            token: 123456
        })
    }
})


app.use((err, req, res, next) => {
    let message = '位置的错误信息'
    switch (err) {
        case -1001:
            message = '没有输入用户名或密码'
            break
        case -1002:
            message = '用户名或密码错误'
            break
    }
    res.json({
        code: err,
        message
    })
})


//2. 启动服务器并监听端口
app.listen(9000, () => {
    console.log('express服务器启动成功！')
})
