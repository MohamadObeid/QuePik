// browserify browser.js > index.js
const {starter} = require("../function/starter")
const {setElement} = require("../function/setElement")

const VALUE = JSON.parse(document.getElementById("VALUE").textContent)
const STATE = JSON.parse(document.getElementById("STATE").textContent)
const _firebase = firebase.initializeApp(STATE.config)

VALUE.body.element = document.body
VALUE.window = {element: window}
VALUE.root.element = root

STATE.db = _firebase.firestore()
STATE.storage = _firebase.storage().ref()
var cookies = document.cookie.split("authentication=")
if (cookies[1]) STATE.admin = JSON.parse(cookies[1].split(";")[0])

if (!window.location.href.includes("localhost") && `/app${STATE.pathname}` !== window.location.pathname)
history.pushState(null, STATE.page[STATE.host].title, `/app${STATE.pathname}`)

setElement({ VALUE, STATE, id: "public" })
starter({ VALUE, STATE, id: "public" })

setElement({ VALUE, STATE, id: "root" })
starter({ VALUE, STATE, id: "root" })