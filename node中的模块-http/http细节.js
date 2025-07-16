const http = require('http')
const url = require('url')
const qs = require('querystring')

//创建一个http对应服务器
const server = http.createServer((request, response) => {
    const urlString = request.url
    const method = request.method
    //解析url
    const urlInfo = url.parse(urlString)
    // console.log(urlInfo.query, urlInfo.pathname)



    //解析query
    const queryString = urlInfo.query
    const queryInfo = qs.parse(queryString)
    console.log(queryInfo)
    // response.end('请求成功')



    //区分不同的url的路径和method
    // if (urlInfo.pathname === '/login') {
    //     if (method === 'POST') {
    //         response.end('登陆成功')
    //     } else {
    //         response.end('不支持的请求方式，请检测你的请求方式~')
    //     }
    // } else if (urlInfo.pathname === '/products') {
    //     response.end('商品列表~')
    // } else if (urlInfo.pathname === '/lyrics') {
    //     response.end('歌词列表')
    // }
    // console.log('请求一次')


    //获取body参数(post请求里)
    // request.setEncoding('utf-8')
    // //注明解析方式，否则data是字节流(二进制形式)
    // let islogin = false
    // request.on('data', (data) => {
    //     const dataString = data
    //     const loginInfo = JSON.parse(dataString)
    //     console.log(loginInfo)
    //     if (loginInfo.name === 'zmy' && loginInfo.password === '123456') {
    //         islogin = true
    //         console.log('right')
    //     }
    // })
    // request.on('end', () => {
    //     if (islogin) {
    //         response.end('登陆成功，欢迎回来！')
    //     } else {
    //         response.end('密码或用户名错误！')
    //     }
    // })

    //响应状态码
    // response.statusCode = 403
    //方式二：setHeader响应头
    response.writeHead(200, {
        'Content-Type': 'application/json;charset=utf8'
        //可以补充content-type等内容
        //已经发送给客户，后续不可以再更改
    })

    const list = [
        { name: "why", age: 18 },
        { name: "zmy", age: 18 }
    ]

    //设置Header信息：数据的类型及数据的编码格式
    // response.setHeader('Content-Type', 'text/plain;charset=utf8')





    //response返回响应结果
    // response.write('hello world')
    //这种只是写出，不会结束
    // response.end('本次写出结束')
    response.end(JSON.stringify(list))
    //必须放在最后

})




server.listen(8000, () => {
    console.log('服务器已经开启成功啦！')
})
