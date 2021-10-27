const {toArray} = require("../method/toArray")

module.exports = ({VALUE, id, params = {}}) => {
  const controls = typeof params.controls === "object" ? params.controls : {}
  controls.id = toArray(controls.id || id)

  return [{
      event: "mouseenter",
      actions: `mountAfterStyles::[${controls.id}]`,
    }, {
      event: "mouseleave",
      actions: `resetStyles::[${controls.id}]??${
        controls.mountonload ? "!mountonload" : true
      }`,
    }]
}
