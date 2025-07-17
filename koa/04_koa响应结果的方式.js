const koa = require('koa')
const KoaRouter = require('@koa/router')
const fs = require('fs')
//创建服务器
const app = new koa()


const UserRouter = new KoaRouter({ prefix: '/users' })

//参数解析

UserRouter.get('/', (ctx, next) => {
    //body类型是string
    // ctx.body = 'user list data~'


    //buffer
    // ctx.body = Buffer.from('你好~')

    //stream
    // const readStream = fs.createReadStream('./uploads/_头像.jpg')
    // ctx.type = 'image/jpeg'
    // ctx.body = readStream


    //array/object
    // ctx.body = {
    //     code: 0,
    //     data: [
    //         { id: 1, name: 'cj' },
    //         { id: 1, name: 'cj' }
    //     ]
    // }

    // ctx.status = 201设置状态码
    //body的值为null,自动设置状态码204
    ctx.body = null
})

//让路由生效
app.use(UserRouter.routes())
app.use(UserRouter.allowedMethods())




//启动服务器
app.listen(8000, () => {
    console.log('koa服务器启动成功~')
})