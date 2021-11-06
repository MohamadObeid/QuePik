const {generate} = require("../function/generate");

module.exports = ({ params = {}, id }) => {
  const controls = params.controls
  const state = generate()

  return [{
    event: "click",
    actions: [
      `setState?state.actionlist-mouseenter;state.${state}=value.data();value.Data::actionlist=${state};value.data::actionlist=value.data()`,
      `setPosition::actionlist?position.positioner=${id};position.placement=${controls.placement || "bottom"};position.distance=${controls.distance}`,
      "mountAfterStyles;update???actionlist",
    ]
  }, {
    event: "mouseleave",
    actions: [
      "setState?state.actionlist-mouseenter=false",
      "resetStyles>>200::actionlist??!mouseenter;!mouseenter::actionlist;!state.actionlist-mouseenter",
    ]
  }]
}
