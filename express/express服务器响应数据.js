const express = require('express')

//1.创造服务器
const app = express()


app.get('/home', (req, res) => {
    res.json({
        code: 0,
        //没有错误时一般是0，有错误可能是其他自定义的码
        //在此处注明而不在status里报错
        message: '欢迎回来！',
        list: [
            { name: 'dch', price: 213 },
            { name: 'sfc', price: 3543 },
            { name: 'fbs', price: 234 },
            { name: 'grrg', price: 21314 },

        ]
    })
    // res.status(201)设置状态码
})


//2. 启动服务器并监听端口
app.listen(9000, () => {
    console.log('express服务器启动成功！')
})