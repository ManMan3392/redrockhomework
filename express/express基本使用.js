const express = require('express')

//1.创造服务器
const app = express()



//给express创建的app传入一个回调函数
//这个函数称为中间件(middleware)
//1. 中间件中可以执行任意代码
//打印，查询数据，判断逻辑
//2. 在中间件中可以修改req,res对象
//res.age = 99
//3. 可以在中间件中结束相应周期
// res.json({ message: "登陆成功", code: 0 })
//4. 执行下一个中间件
// next()


//客户端访问login页面，发送post请求
app.post('/login', (req, res) => {
    //处理login请求
    res.end('登陆成功，欢迎回来')
})


app.get('/home', (req, res) => {
    res.end('轮播图数据~')
})


//2. 启动服务器并监听端口
app.listen(9000, () => {
    console.log('express服务器启动成功！')
})
