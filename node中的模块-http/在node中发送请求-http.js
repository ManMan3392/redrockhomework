const http = require('http')

// http.get('http://localhost:8000', (res) => {
//     res.setEncoding('utf-8')
//     res.on('data', (data) => {
//         console.log(JSON.parse(data))
//     })
// })



//发送其他请求
const req = http.request({
    method: 'POST',
    hostname: 'localhost',
    port: 8000,
    encoding: 'utf8'
}, (res) => {
    res.on('data', (data) => {
        console.log(JSON.parse(data))
    })
})
//可写流要调end表示写入完成
req.end()