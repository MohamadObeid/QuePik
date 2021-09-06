const { getJsonFiles } = require('./getJsonFiles')
const fs = require('fs')

const getApi = (req, res) => {

    var path = req.url.split('/')
    var folder = path[2]
    var files = getJsonFiles(folder)
    
    // to uppercase first letter
    folder = folder.charAt(0).toUpperCase() + folder.slice(1)

    return res.send({ data: files, success: true, message: `${folder} mounted successfuly!` })
}

const postApi = (req, res) => {

    var path = req.url.split('/')
    var folder = path[2]
    var file = req.body
    var fileName = file['file-name']
    var filePath = `./${folder}/${fileName}.json`
    
    fs.writeFileSync(filePath, JSON.stringify(file, null, 2))
    
    fileName = file.name.en
    res.send({ data: file, success: true, message: `${fileName} edited successfuly!` })
}

const deleteApi = (req, res) => {

    var path = req.url.split('/')
    var folder = path[2]
    var file = req.body
    var fileName = file['file-name']
    var filePath = `./${folder}/${fileName}.json`

    fs.unlinkSync(filePath)
    
    fileName = file.name.en
    res.send({ data: file, success: true, message: `${fileName} deleted successfuly!` })
}

module.exports = {getApi, postApi, deleteApi}