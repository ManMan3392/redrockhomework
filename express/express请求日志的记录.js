const express = require('express')
const morgan = require('morgan')
const fs = require('fs')

//1.创造服务器
const app = express()

const writeStream = fs.createWriteStream('./access.log')
app.use(morgan('combined', { stream: writeStream }))


//客户端访问login页面，发送post请求
app.post('/login', (req, res) => {
    //处理login请求
    res.end('登陆成功，欢迎回来!')
})


app.get('/home', (req, res) => {
    res.end('轮播图数据~')
})


//2. 启动服务器并监听端口
app.listen(8000, () => {
    console.log('express服务器启动成功！')
})