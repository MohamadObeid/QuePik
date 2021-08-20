const { toArray } = require("../method/toArray");

module.exports = ({ VALUE, id, params = {} }) => {
    id = toArray(params.id || id)
    
    return [{
        event: 'mouseenter',
        actions: `mountAfterStyles???${id.join(';')}`
    }, {
        event: 'mouseleave',
        actions: `resetStyles???${id.join(';')}`
    }]
}