const fs = require('fs')
const { start } = require('repl')

const writeStream = fs.createWriteStream('./bbb.txt', {
    flags: 'a+',
})
writeStream.on('open', () => {
    console.log('文件打开')
})
writeStream.write('coder', err => {
    console.log('写入完成')
})
//写入完成后，需要手动关闭文件

// writeStream.close()
//end将最后的内容写入到文件并关闭文件
writeStream.end('zzz')
//监听文件写入完成
writeStream.on('finish', () => {
    console.log('文件写入完成并关闭')
})
