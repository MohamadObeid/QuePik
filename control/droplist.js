const { generate } = require("../method/generate")

module.exports = ({ STATE, params, id }) => {
    var controls = params.controls
    var state = generate()
    STATE[state] = controls.style
    
    return [{
        event: `click?state.droplist=${controls.id || id}`,
        actions: [
            `resetStyles?break?value.element.style.opacity::droplist=1;global.droplist.positioner=${id}?droplist`,
            `resetStyles::droplist;droplist::${controls.id || id}?${controls.path ? `;path=${controls.path}` : ''}`,
            `setPosition;mountAfterStyles::droplist?position.id=droplist;position.positioner=${controls.positioner || `${id}`};position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `setStyle?style=state.${state}?${params.style}?droplist`,
        ]
    }]
}