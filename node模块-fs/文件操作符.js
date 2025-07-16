const fs = require('fs')

fs.open('./abc.txt', (err, fd) => {
    if (err) {
        console.log('打开错误！', err)
        return
    }
    console.log(fd)

    fs.fstat(fd, (err, stats) => {
        if (err) return
        console.log(stats)

        fs.close(fd)
    })
})