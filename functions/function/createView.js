const {update} = require("./update");
const {generate} = require("./generate");
const {toArray} = require("./toArray");
const {removeIds} = require("./update");
const {clone} = require("./clone");

const createView = ({ STATE, VALUE, params = {}, id }) => {
  let local;

  // append view to root
  if (id === "root") {
    id = generate();
    var element = document.createElement("div");
    element.id = id;

    element.style.height = "100%";
    element.style.width = "100%";

    VALUE[id] = {element, id, derivations: []};
    local = VALUE[id];

    VALUE.root.element.appendChild(element);
  } else local = VALUE[id];

  if (!local) return;

  // delete prev elements and ids
  var children = [...local.element.children];

  children.map((child) => {
    var id = child.id

    removeIds({ VALUE, id })

    VALUE[id].element && VALUE[id].element.remove()
    delete VALUE[id]
  });

  var view = params.view;

  if (!view) return;

  // local.view = view
  if (!STATE.view[view]) return;

  local.children = toArray(clone(STATE.view[view]));

  // update
  update({VALUE, STATE, id});
};

module.exports = {createView};
