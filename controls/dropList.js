module.exports = ({ params, id }) => {
    var controls = params.controls

    return [{
        event: `click`,
        actions: [
            `setPosition?state.droplist-mouseenter;state.droplist=${controls.id || id};position.id=droplist;position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `mountAfterStyles::::droplist`,
            `droplist::::${controls.id || id}?${controls.path ? `;path=${controls.path}` : ''}`,
        ]
    }, {
        event: 'Input',
        actions: 'setState?state.droplist-filter=value.input;state.droplist-element=value.element'
    }, {
        event: 'mouseleave',
        actions: `setState?state.droplist-mouseenter=false`
    }]
}