const path = require('path')
const fs = require('fs')

const getJsonFiles = (folder, fileName, params = {}) => {

    var data = {}
    var folderPath = path.join(process.cwd(), folder)
    
    if (fileName) data = JSON.parse(fs.readFileSync(path.join(folderPath, fileName)))
    else fs.readdirSync(folderPath).forEach(fileName => {
    
        var file = fs.readFileSync(path.join(folderPath, fileName))
        fileName = fileName.split('.json')[0]
        data[fileName] = JSON.parse(file)
    })
    
    if (params.id) data = data.filter(data => params.id.find(id => id === data.id ))
    
    return data
}

module.exports = { getJsonFiles }