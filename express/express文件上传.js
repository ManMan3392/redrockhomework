const express = require('express')
const multer = require('multer')

//1.创造服务器
const app = express()

const upload = multer({
    // dest: './uploads',
    //定义后缀名
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './uploads')
        },
        filename(req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname)
        }
    })
})


//form-data里的普通数据解析(不推荐)
// const formdata = multer()
// app.post('/avatar', upload.any(), (req, res) => {
//     console.log(req.body)
//     res.end('上传图片成功！!')
// })

//上传单文件
app.post('/avatar', upload.single('avatar'), (req, res) => {
    console.log(req.file)
    res.end('上传图片成功！!')
})

app.post('/photos', upload.array('photos'), (req, res) => {//文件名
    console.log(req.files)
    res.end('上传多张图片成功！!')
})



//解析queryString
app.get('/home/list', (req, res, next) => {
    const queryInfo = req.query
    //express自动解析，返回的值都是字符串形式
    console.log(queryInfo)
    console.log(queryInfo.name, queryInfo.age)
    res.end('data list数据')
})



//解析paramas参数
app.get('/users/:id', (req, res, next) => {
    const id = req.params.id
    //express自动解析，返回的值都是字符串形式
    console.log(id)
    res.end(`获取到${id}数据~`)
})


app.listen(8000, () => {
    console.log('express服务器启动成功！')
})