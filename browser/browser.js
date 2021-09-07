// browserify browser.js > index.js
const { starter } = require("../method/starter")

var VALUE = JSON.parse(document.getElementById('VALUE').textContent)
var STATE = JSON.parse(document.getElementById('STATE').textContent)

VALUE.body.element = document.body
VALUE.window = { element: window }
VALUE.root.element = root

starter({ VALUE, STATE, id: 'root' })
