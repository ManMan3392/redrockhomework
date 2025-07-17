const express = require('express')

//1.创造服务器
const app = express()



app.use('/login', express.static('./uploads'))
//localhost:9000/login/1752674908581_屏幕截图 2025-07-16 175944.png
// 可以访问

//2. 启动服务器并监听端口
app.listen(9000, () => {
    console.log('express服务器启动成功！')
})