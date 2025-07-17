const fs = require('fs')

fs.mkdir('./mkdir', (err) => {
    if (err) {
        console.log('文件夹创建错误！', err)
        return
    }
})