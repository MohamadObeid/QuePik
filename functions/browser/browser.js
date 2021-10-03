// browserify browser.js > index.js
const {starter} = require("../method/starter");

const VALUE = JSON.parse(document.getElementById("VALUE").textContent);
const STATE = JSON.parse(document.getElementById("STATE").textContent);

VALUE.body.element = document.body;
VALUE.window = {element: window};
VALUE.root.element = root;

starter({VALUE, STATE, id: "root"});
