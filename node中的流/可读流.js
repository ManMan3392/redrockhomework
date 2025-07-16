const fs = require('fs')
//较大的文件不能一次性读完，就用流的方式
const readStream = fs.createReadStream('./aaa.txt', {
    start: 4,
    end: 20,
    highWaterMark: 3
    //默认64kb
})
readStream.on('data', (data) => {
    console.log(data.toString())
    readStream.pause()
    setTimeout(() => {
        readStream.resume()
    }, 1000)
})

readStream.on('open', (fd) => {
    console.log('打开文件', fd)
})

readStream.on('end', () => {
    console.log('文件读完了')
})
//文件读完会自动关闭的

readStream.on('close', () => {
    console.log('文件关闭')
})