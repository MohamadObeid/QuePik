const path = require('path')
const fs = require('fs')

// assets
const getAssets = () => {

    var assets = {}
    var assetsFolderPath = path.join(process.cwd(), 'asset')
    
    fs.readdirSync(assetsFolderPath).forEach(fileName => {
    
        var file = fs.readFileSync(path.join(assetsFolderPath, fileName))
        fileName = fileName.split('.json')[0]
        assets[fileName] = JSON.parse(file)
    })
    
    return assets
}

// views
const getViews = () => {

    var views = {}
    var viewsFolderPath = path.join(process.cwd(), 'view')
    
    fs.readdirSync(viewsFolderPath).forEach(fileName => {
    
        var file = fs.readFileSync(path.join(viewsFolderPath, fileName))
        fileName = fileName.split('.json')[0]
        views[fileName] = JSON.parse(file)
    })

    return views
}

module.exports = { getViews, getAssets }