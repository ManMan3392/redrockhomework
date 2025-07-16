//大概流程如下，但实际并不能直接写入，需要对字节流进行截取



// const http = require('http')
// const fs = require('fs')
// const server = http.createServer((req, res) => {
//     req.setEncoding('binary')



//     //创建可写流
//     const writeStream = fs.createWriteStream('./upload.png', {
//         flags: 'a+'
//     })

//     // req.pipe(writeStream)
//     req.on('data', data => {
//         console.log(data)
//         writeStream.write(data)
//     })

//     req.on('end', () => {
//         console.log('数据传输完成')
//         writeStream.close()
//         res.end('文件上传成功')
//     })
// })

// server.listen(8080, () => {
//     console.log('服务器已经开启成功啦！')
// })



