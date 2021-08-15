const { createElement } = require("./createElement")
const _view = require('../view/trip/_view')
const _page = require('../page/_page')

const createDocument = (page) => {
    var innerHTML = '', STATE = {}, VALUE = {}, id = 'root'

    // set root values
    VALUE[id] = {}
    VALUE[id].children = []
    VALUE[id].derivations = []
    VALUE[id].childrenSiblings = []
    
    // push page views to root
    page.views.map(view => _view[view] && VALUE[id].children.push(_view[view]))

    // push public views to root
    _page.public.views.map(view => _view[view] && VALUE[id].children.push(_view[view]))
    
    // create html
    innerHTML = createElement({STATE, VALUE, id})
    
    return `<!DOCTYPE html>
    <html lang="en" class="html">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DigiMatjar</title>
        <link rel="stylesheet" href="index.css"/>
    </head>
    <body>
        <div id="root" VALUE='${JSON.stringify(VALUE)}' STATE='${JSON.stringify(STATE)}'>${innerHTML}</div>
        <script src="browser.js"></script>
    </body>
    </html>`
}

module.exports = {createDocument}