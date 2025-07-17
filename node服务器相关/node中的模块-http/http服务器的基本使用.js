const http = require('http')

//创建一个http对应服务器
const server = http.createServer((request, response) => {
    //request对象包含本次用户请求的所有信息
    //url,
    console.log(request.url)
    // method,
    console.log(request.method)
    // headers
    console.log(request.headers)
    //response对象用于给客户端返回结果
    response.end('hello world!!!')
})


//开启服务器，并告知需要监听的端口
//监听端口时，1025以上，65535（两个字节 255 * 255）以下
server.listen(8000, () => {
    console.log('服务器已经开启成功啦！')
})

//listen函数可以传入三个参数
//端口port,可以不传，系统会默认分配端
//主机host,通常可以传入localhost、127.0.0.1、ip地址0.0.0.0(默认)
//  localhost:本质上是一个域名，通常情况下会被解析成127.0.0.1
//  127.0.0.1回环地址，主机自己发出去的包被自己接受，同一个网段下的主机通过ip地址无法访问
//  0.0.0.0监听IPV4上所有地址，同一个网段下的主机通过ip地址可以访问
//回调函数，服务器成功启动时调用