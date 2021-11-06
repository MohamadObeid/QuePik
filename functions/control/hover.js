const { toArray } = require("../function/toArray")

module.exports = ({ VALUE, params, id }) => {

    var controls = params.controls
    id = toArray(controls.id || id)
    
    id.map(id => { 
        var local = VALUE[id]
        local.hover = local.hover || {}
        local.hover.before = local.hover.before || {}
        local.hover.style &&
        Object.keys(local.hover.style).map(key => 
            local.hover.before[key] = local.style[key] !== undefined ? local.style[key] : null 
        )
    })

    return [{
        "event": `loaded?state.[value.state]<<value.state=value.hover.id?value.hover.mount`,
        "actions": id.map(id => `setStyle::${id}?style=value.hover.style::${id}`)
    }, {
        "event": `mouseenter??!value.click.freeze;!value.hover.disable`,
        "actions": id.map(id => `setStyle::${id}?style=value.hover.style::${id}`)
    }, {
        "event": `mouseleave??!value.click.freeze;!value.hover.disable`,
        "actions": id.map(id => `setStyle::${id}?style=value.hover.before::${id}?value.hover.freeze.not()`)
    }]
}