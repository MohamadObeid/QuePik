const {toString} = require("../function/toString")

module.exports = ({params, id}) => {
  var controls = params.controls
  var styles = toString({ style: controls.style })
  
  return [{
    event: `click?state.droplist=${controls.id || id}`,
    actions: [
      `resetStyles::droplist?break?value.element.style.opacity::droplist=1;positioner::droplist=${id}`,
      `resetStyles::droplist;droplist::${controls.id || id}?path=${controls.path || ""}`,
      `setStyle::droplist?${styles}`,
      `setPosition::droplist;mountAfterStyles::droplist?position.positioner=${controls.positioner || id};position.placement=${controls.placement || "bottom"};position.distance=${controls.distance}`
    ]
  }]
}
