// browserify index.js > browser.js
const { starter } = require("../method/starter")

var root = document.querySelector('#root')

var VALUE = JSON.parse(root.getAttribute('VALUE'))
var STATE = JSON.parse(root.getAttribute('STATE'))

VALUE.body = document.body
VALUE.window = window
VALUE.root.element = root

starter({VALUE, STATE, id: 'root'})