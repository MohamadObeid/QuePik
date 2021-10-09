const {setControls} = require("./controls");
const {setStyle} = require("./style");

module.exports = {
  flicker: ({VALUE, id}) => {

    let transition = VALUE[id].style.transition;
    if (transition) transition += "opacity .3s";
    transition = "opacity .3s";

    setStyle({
      VALUE,
      STATE,
      id,
      params: {style: {transition, opacity: "0"}},
    });

    const controls = {actions: "setStyle?style.opacity=1"};

    setControls({VALUE, STATE, id, params: {controls}});
  },
};
