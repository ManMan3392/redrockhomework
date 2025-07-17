const fs = require('fs')
// fs.readFile('./ccc.txt', (err, data) => {
//     console.log(data)
//     fs.writeFile('./ccc_copy01.txt', data, err => {
//         console.log('写入文件完成', err)
//     })
// })

//创建可读流和可写流
const readStream = fs.ReadStream('./ccc.txt')
const writeStream = fs.WriteStream('./ccc_copy02.txt')
// readStream.on('data',(data) => {
//     writeStream.write(data)
// })
// readStream.on('end',()=>{
// })

//在可读流和可写流间建立管道
readStream.pipe(writeStream)