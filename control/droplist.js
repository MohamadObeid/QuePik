module.exports = ({ params, id }) => {
    var controls = params.controls
    
    return [{
        event: `click`,
        actions: [
            `mountAfterStyles::droplist`,
            `droplist::${controls.id || id}?${controls.path ? `;path=${controls.path}` : ''}`,
            `setPosition?state.droplist-mouseenter;state.droplist=${controls.id || id};position.id=droplist;position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `setStyle?style=JSON.parse(${JSON.stringify(params.style)})?${params.style}?droplist`
        ]
    }, {
        event: 'Input',
        actions: 'setState?state.droplist-filter=value.input;state.droplist-element=value.element'
    }, {
        event: 'mouseleave',
        actions: `setState?state.droplist-mouseenter=false`
    }]
}