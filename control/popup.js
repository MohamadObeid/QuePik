const { generate } = require("../method/generate")

module.exports = ({ STATE, params, id }) => {
    var controls = params.controls
    var state = generate()
    STATE[state] = controls.style
    
    return [{
        event: `click?state.popup=${controls.id || id}`,
        actions: [
            `resetStyles::popup?break?value.element.style.opacity::popup=1;positioner::popup=${id}`,
            `resetStyles::popup;popup::${controls.id || id}?path=${controls.path || ''}`,
            `setPosition::${controls.positioner || id};mountAfterStyles::popup?position.id=popup;position.placement=${controls.placement || 'left'};position.distance=${controls.distance}`,
            `setStyle::popup?style=state.${state}?${controls.style}`,
        ]
    }]
}