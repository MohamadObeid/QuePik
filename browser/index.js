// browserify index.js > browser.js
const { starter } = require("../method/starter")

var root = document.querySelector('#root')

var VALUE = JSON.parse(document.body.getAttribute('VALUE'))
var STATE = JSON.parse(document.body.getAttribute('STATE'))

VALUE.body = document.body
VALUE.window = window
VALUE.root.element = root

starter({ VALUE, STATE, id: 'root' })