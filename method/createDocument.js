const { createElement } = require("./createElement")
const _page = require('../page/_page')
const path = require('path')
const fs = require('fs')

const createDocument = (page) => {
    var innerHTML = '', STATE = {}, VALUE = {}, id = 'root'
    
    // get assets
    STATE.asset = getAssets()

    // get views
    STATE.view = getViews()

    // set root values
    VALUE[id] = {}
    VALUE[id].children = []
    VALUE[id].derivations = []
    
    // push page views to root
    page.views.map(view => STATE.view[view] && VALUE[id].children.push(STATE.view[view]))

    // push public views to root
    _page.public.views.map(view => STATE.view[view] && VALUE[id].children.push(STATE.view[view]))
    
    // create html
    innerHTML = createElement({STATE, VALUE, id})

    
    return `<!DOCTYPE html>
    <html lang="en" class="html">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>digiTrip</title>
        <link rel="stylesheet" href="index.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </head>
    <body>
        <div id="root" VALUE='${JSON.stringify(VALUE)}' STATE='${JSON.stringify(STATE)}'>${innerHTML}</div>
        <script src="browser.js"></script>
    </body>
    </html>`
}


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

module.exports = {createDocument}