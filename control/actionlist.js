const { generate } = require("../method/generate")

module.exports = ({ params = {}, id }) => {
    var controls = params.controls
    var state = generate()

    return [{
        event: `click`,
        actions: [
            `setState?state.actionlist-mouseenter;state.${state}=value.data();value.Data::actionlist=${state};value.data::actionlist=value.data()`,
            `setPosition?position.id=actionlist;position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `mountAfterStyles;update???actionlist`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `setState?state.actionlist-mouseenter=false`,
            `resetStyles>>200::actionlist??!mouseenter;!mouseenter::actionlist;!state.actionlist-mouseenter`
        ]
    }]
}