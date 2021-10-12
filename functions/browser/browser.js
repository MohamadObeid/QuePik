// browserify browser.js > index.js
const {starter} = require("../method/starter")

const VALUE = JSON.parse(document.getElementById("VALUE").textContent);
const STATE = JSON.parse(document.getElementById("STATE").textContent);
const db = firebase.initializeApp(STATE.config).firestore()

VALUE.body.element = document.body;
VALUE.window = {element: window};
VALUE.root.element = root;

STATE.db = db

starter({VALUE, STATE, id: "root"});