const Koa = require('koa')
const static = require("koa-static")

const app = new Koa()

app.use(static("./uploads"))

app.listen(9000, () => {
    console.log('koa服务器启动成功~')
})