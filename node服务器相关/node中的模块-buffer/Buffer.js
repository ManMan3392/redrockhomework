const fs = require('fs')
// 创建Buffer
//8个二进制bit等于一个字节bite,1024个字节等于1kb,1024kb等于1M
//一个英文字母占一个字节
const buf = Buffer.from('hello world')
console.log(buf)

//中文占三个字节
const buf1 = Buffer.from('哈哈哈hhh')
console.log(buf1)
console.log(buf1.toString())

//编码和解码对应规则要一致
const buf2 = Buffer.from('你好世界', 'utf-16le')
console.log(buf2.toString('utf-8'))
console.log(buf2.toString())
//不写默认utf-8,可能是乱码
console.log(buf2.toString('utf-16le'))