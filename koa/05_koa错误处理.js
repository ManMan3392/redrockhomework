const koa = require('koa')
const KoaRouter = require('@koa/router')
const fs = require('fs')
//创建服务器
const app = new koa()


const UserRouter = new KoaRouter({ prefix: '/users' })

//参数解析

UserRouter.get('/', (ctx, next) => {
    const isAuth = true
    if (!isAuth) {
        ctx.body = 'user list data~'
    } else {
        ctx.app.emit('error', -1002, ctx)
    }
})
//可以换文件，且koa的next不接受参数
app.on('error', (code, ctx) => {
    let message = '未知错误'
    switch (code) {
        case -1001:
            message = '1'
            break
        case -1002:
            message = '2'
            break
    }
    ctx.body = {
        code,
        message
    }
})

//让路由生效
app.use(UserRouter.routes())
app.use(UserRouter.allowedMethods())




//启动服务器
app.listen(8000, () => {
    console.log('koa服务器启动成功~')
})