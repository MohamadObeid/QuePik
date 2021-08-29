module.exports = ({ params = {}, id }) => {
    var controls = params.controls

    return [{
        event: `click`,
        actions: [
            `setState?state.actionlist-mouseenter;state.actionlist=${controls.id || id}`,
            `setPosition?position.id=actionlist;position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `actionlist::${controls.id || id}?${controls.path ? `;path=${controls.path}` : ''}`,
            `mountAfterStyles::actionlist`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `setState?state.actionlist-mouseenter=false`,
            `resetStyles>>200::actionlist??!mouseenter;!mouseenter::actionlist;!state.actionlist-mouseenter`
        ]
    }]
}