const {createElement} = require("./createElement")
const {getJsonFiles} = require("./getJsonFiles")
//
require('dotenv').config()

const createDocument = (req, res) => {
    
    var host = req.url.split("/")[1]
    var config = JSON.parse(process.env.FIREBASE_CONFIG)
    var root = "", public = ""
    var STATE = {}
    var VALUE = {}
    
    // get assets & views
    STATE = {
        view: getJsonFiles("view"),
        page: getJsonFiles("page"),
        pathname: req.url,
        device: req.device,
        host,
        codes: {},
        config
    }

    // body
    var id = "body"
    VALUE[id] = {}
    VALUE[id].id = id

    // root
    var id = "root"
    VALUE[id] = {}
    VALUE[id].id = id
    VALUE[id].type = "View"
    VALUE[id].children = []
    VALUE[id].parent = "body"

    // public
    var id = "public"
    VALUE[id] = {}
    VALUE[id].id = id
    VALUE[id].type = "View"
    VALUE[id].children = []
    VALUE[id].parent = "body"

    //
    if (!STATE.page[host]) return res.send("Hello")

    // get root children
    STATE.page[host].views.map(view => STATE.view[view] && VALUE["root"].children.push(STATE.view[view]))

    // get public children
    STATE.page.public.views.map(view => STATE.view[view] && VALUE["public"].children.push(STATE.view[view]))

    // create root html
    root = createElement({ STATE, VALUE, id: "root" })
    delete VALUE["root"].children

    // create public html
    public = createElement({ STATE, VALUE, id: "public" })
    delete VALUE["public"].children

    res.send(`<!DOCTYPE html>
        <html lang="en" class="html">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${STATE.page[host].title}</title>
            <link rel="stylesheet" href="index.css"/>
            <script src="firebase/firebase-app.js"></script>
            <script src="firebase/firebase-firestore.js"></script>
            <script src="firebase/firebase-storage.js"></script>
        </head>
        <body>
            ${public}${root}
            <script id="VALUE" type="application/json">${JSON.stringify(VALUE)}</script>
            <script id="STATE" type="application/json">${JSON.stringify(STATE)}</script>
            <script src="index.js"></script>
        </body>
        </html>`)
}

module.exports = {createDocument}
