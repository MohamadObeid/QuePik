const {toArray} = require("../method/toArray");

module.exports = ({VALUE, id, params = {}}) => {
  var controls = typeof params.controls === "object" ? params.controls : {};
  controls.id = toArray(controls.id || id);

  return [
    {
      event: "click",
      actions: `await.update::${controls.id};async.sort?sort.path=${controls.path};sort.Data=${controls.Data}?state.${controls.Data}`
    },
  ];
};
