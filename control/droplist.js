module.exports = ({ params, id }) => {
    var controls = params.controls
    
    return [{
        event: `click?state.droplist=${controls.id || id}`,
        actions: [
            `resetStyles?break?value.element.style.opacity::droplist=1;global.droplist.positioner=${id}?droplist`,
            `mountAfterStyles::droplist`,
            `droplist::${controls.id || id}?${controls.path ? `;path=${controls.path}` : ''}`,
            `setPosition?position.id=droplist;position.positioner=${controls.positioner || `${id}`};position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `setStyle?style=JSON.parse(${JSON.stringify(params.style)})?${params.style}?droplist`,
        ]
    }, {
        event: 'Input',
        actions: 'setState?state.droplist-filter=value.input;state.droplist-element=value.element'
    }]
}