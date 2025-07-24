const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({ prefix: '/users' })
userRouter.get('/list', (ctx, next) => {
  ctx.body = 'users list'
})
module.exports = userRouter
