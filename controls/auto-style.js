const { toArray } = require("../method/toArray");

module.exports = ({ VALUE, id, params = {} }) => {
    
    var controls = params.controls
    controls.id = toArray(controls.id || id)
    
    return [{
        event: 'mouseenter',
        actions: `mountAfterStyles???${controls.id.join(';')}`
    }, {
        event: 'mouseleave',
        actions: `resetStyles???${controls.id.join(';')}`
    }]
}