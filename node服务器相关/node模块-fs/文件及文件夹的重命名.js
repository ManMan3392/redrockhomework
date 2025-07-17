const fs = require('fs')

//文件
fs.rename('./abc.txt', './zmy.txt', (err) => {
    if (err) console.log(err)
})


//文件夹
fs.rename('./mkdir', './zmymkdir', (err) => {
    if (err) console.log(err)
})