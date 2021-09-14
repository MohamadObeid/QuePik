const { getJsonFiles } = require('./getJsonFiles')
const { capitalize } = require('./capitalize')
const fs = require('fs')

const getApi = (req, res) => {

    var path = req.url.split('/')
    var folder = path[2]
    var fileName = path[3]

    if (folder === 'image')
    return res.sendFile(require('path').join(process.cwd(), folder, fileName))

    var files = getJsonFiles(folder, fileName)
    return res.send({ data: files, success: true, message: `${capitalize(folder)} mounted successfuly!` })
}

const postApi = (req, res) => {

    var path = req.url.split('/')
    var folder = path[2]
    var file = req.body
    var fileName = file['file-name']
    var fileType = 'json'

    // create folder if it doesnot exist
    if(!fs.existsSync(folder)) fs.mkdirSync(folder)

    if (folder === 'image') {
        file = file.file

        // data type
        var dataType = file.substring('data:'.length, file.indexOf('/'))
        // file type
        var fileType = file.substring(file.indexOf('/')+1, file.indexOf(';base64'))
        // Forming regex to extract base64 data of file.
        var regex = new RegExp(`^data:${dataType}\/${fileType};base64,`, 'gi')
        // Extract base64 data.
        var base64Data = file.replace(regex, '')

        // file path
        var filePath = `./${folder}/${fileName}.${fileType}`
        var data = { "file-name": `${fileName}.${fileType}` }
        
        fs.writeFileSync(filePath, base64Data, 'base64')
        return res.send({ data, success: true, message: `${capitalize(dataType)} saved successfuly!` })
    }

    // file path
    var filePath = `./${folder}/${fileName}.${fileType}`
    
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