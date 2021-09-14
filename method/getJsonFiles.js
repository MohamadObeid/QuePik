const path = require('path')
const fs = require('fs')

const getJsonFiles = (folder, fileName) => {

    var files = {}
    var folderPath = path.join(process.cwd(), folder)

    if (fileName) return fs.readFileSync(path.join(folderPath, fileName))
    
    fs.readdirSync(folderPath).forEach(fileName => {
    
        var file = fs.readFileSync(path.join(folderPath, fileName))
        fileName = fileName.split('.json')[0]
        files[fileName] = JSON.parse(file)
    })
    
    return files
}

module.exports = { getJsonFiles }