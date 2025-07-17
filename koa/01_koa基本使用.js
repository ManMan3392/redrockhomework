const koa = require('koa')
const KoaRouter = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const multer = require('@koa/multer')

//创建服务器
const app = new koa()

//什么形式的数据都可以解析
app.use(bodyParser())

const formParser = multer()

const upload = multer(
    // {
    //     dest: './uploads'
    // }
    {
        storage: multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './uploads')
            },
            filename(req, file, cb) {
                cb(null, "_" + file.originalname)
            }
        })
    }
)

//Koa只能用use创建中间件，没有method，也没有路径来匹配，手动区分路径  ctx.path或ctx.request.path
//路径或方法匹配使用路由
// app.use((ctx, next) => {
//     // 1. 请求对象
//     // ctx.request  koa封装的请求对象
//     // ctx.req  Node封装的请求对象

//     // 2. 响应对象
//     // ctx.respond Koa封装的响应对象
//     // ctx.res  Node封装的响应对象

//     // 3. 其他对象
//     // ctx.query 
//     // ctx.params 
// })



const UserRouter = new KoaRouter({ prefix: '/users' })

//参数解析

//get
//1. params
UserRouter.get('/:id', (ctx, next) => {
    ctx.body = `获取${ctx.params.id}`
})

//2. query
UserRouter.get('/', (ctx, next) => {
    ctx.body = `获取${JSON.stringify(ctx.query)}`
})


//post
// 1. json
UserRouter.post('/json', (ctx, next) => {
    console.log(ctx.request.body)
    //ctx.body是给用户返回数据
    ctx.body = 'json成功！'
})


// 2. urlencoded
UserRouter.post('/urlencoded', (ctx, next) => {
    console.log(ctx.request.body)
    //ctx.body是给用户返回数据
    ctx.body = 'urlencoded成功！'
})


// 3. formdata
UserRouter.post('/formdata', formParser.any(), (ctx, next) => {
    console.log(ctx.request.body)
    //ctx.body是给用户返回数据
    ctx.body = 'urlencoded成功！'
})


// 文件上传
UserRouter.post('/avatar', upload.single('avatar'), (ctx, next) => {
    //ctx.body是给用户返回数据
    console.log(ctx.request.file)
    ctx.body = '文件上传成功！'
})

//多文件上传(修改名字，不然会匹配前一个)
UserRouter.post('/avatars', upload.array('pictures'), (ctx, next) => {
    //ctx.body是给用户返回数据
    console.log(ctx.request.files)
    ctx.body = '文件上传成功！'
})


//让路由生效
app.use(UserRouter.routes())
app.use(UserRouter.allowedMethods())




//启动服务器
app.listen(8000, () => {
    console.log('koa服务器启动成功~')
})