const { createElement } = require("./createElement")
const { getAssets, getViews } = require("./getAssets")
const _page = require('../page/_page')

const createDocument = (page) => {
    var innerHTML = '', STATE = {}, VALUE = {}
    
    // get assets
    STATE.asset = getAssets()

    // get views
    STATE.view = getViews()

    // body
    var id = 'body'
    VALUE[id] = {}
    VALUE[id].id = id

    // root
    var id = 'root'
    VALUE[id] = {}
    VALUE[id].id = id
    VALUE[id].type = 'View'
    VALUE[id].children = []
    VALUE[id].parent = 'body'
    
    // push page views to root
    page.views.map(view => STATE.view[view] && VALUE[id].children.push(STATE.view[view]))

    // push public views to root
    _page.public.views.map(view => STATE.view[view] && VALUE[id].children.push(STATE.view[view]))
    
    // create html
    innerHTML = createElement({ STATE, VALUE, id })
    
    return `<!DOCTYPE html>
    <html lang="en" class="html">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>digiTrip</title>
        <link rel="stylesheet" href="index.css" />
        <link href="https://css.gg/trash.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        
    </head>
    <body>
        ${innerHTML}
        <script id="STATE" type="application/json">${JSON.stringify(STATE)}</script>
        <script id="VALUE" type="application/json">${JSON.stringify(VALUE)}</script>
        <script src="browser.js"></script>
    </body>
    </html>`
}

module.exports = {createDocument}