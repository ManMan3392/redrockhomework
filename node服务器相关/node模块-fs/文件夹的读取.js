const fs = require('fs')

// fs.readdir('./mkdir', (err, files) => {
//     console.log(files)
// })


function readDirector(path) {
    fs.readdir(path, { withFileTypes: true }, (err, files) => {
        files.forEach(item => {
            if (item.isDirectory()) {
                readDirector(`${path}/${item.name}`)
            }
            else {
                console.log(item.name)
            }
        })
    })
}

readDirector('./mkdir')