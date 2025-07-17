const Koa = require('koa')
const KoaRouter = require('@koa/router')

const app = new Koa()

const UserRouter = new KoaRouter({ prefix: '/users' })

UserRouter.get('/', (ctx, next) => {
    ctx.body = 'user list data~'
})
UserRouter.get('/:id', (ctx, next) => {
    ctx.body = `获取${ctx.params.id}`
})


//让路由生效
app.use(UserRouter.routes())
app.use(UserRouter.allowedMethods())

app.listen(9000, () => {
    console.log('Koa服务器启动~')
})