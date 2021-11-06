const {generate} = require("../function/generate");

module.exports = ({ STATE, params }) => {

  var controls = params.controls
  var state = generate()

  return [{
    event: "click??!state.mini-window-close",
    actions: [
      `createView::mini-window-view?state.${state}=${controls.Data ? STATE[controls.Data] : 'value.data()'};value.Data.delete()::mini-window-view;value.Data::mini-window-view=${state}<<value.data();view=${controls.view}`,
      "setStyle::mini-window?style.display=flex;style.opacity=1>>25",
    ]
  }]
}
