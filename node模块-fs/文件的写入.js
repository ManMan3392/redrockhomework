const fs = require('fs')

const content = "hello world,my name is zmy"

fs.writeFile('./abc.txt', content,
    {
        encoding: 'utf-8',
        flag: 'a+'
        //w打开文件写入，默认值
        //w+可读可写，不存在就创建
        //r打开文件读取，默认值
        //r+打开文件读取，不存在报错
        //a追加写入文件，不存在创建
        //a+可读可写追加，不存在创建
    }, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('写入成功')
    })