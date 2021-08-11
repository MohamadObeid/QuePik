// browserify index.js > browser.js
const { starter } = require("../method/starter")

var root = document.querySelector('#root')

var VALUE = JSON.parse(root.getAttribute('VALUE'))
var STATE = JSON.parse(root.getAttribute('STATE'))

VALUE.body = document.body
VALUE.window = window

starter({VALUE, STATE, id: 'root'})