const express = require('express')

//1.创造服务器
const app = express()

//将接口定义在单独的路由中




const userRouter = express.Router()
userRouter.get('/', (req, res, next) => {
    res.json('用户数据列表')
})
userRouter.get('/:id', (req, res, next) => {
    const id = req.params.id
    res.json(id)
})

// module.exports = userRouter
//以上部分抽取文件


app.use('/users', userRouter)


//2. 启动服务器并监听端口
app.listen(9000, () => {
    console.log('express服务器启动成功！')
})