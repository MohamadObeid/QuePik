const { toArray } = require("../function/toArray")

module.exports = ({ VALUE, params, id }) => {

    var controls = params.controls
    id = toArray(controls.id || id)
    
    id.map(id => { 
        var local = VALUE[id]
        local.touch = local.touch || {}
        local.touch.before = local.touch.before || {}
        local.touch.style &&
        Object.keys(local.touch.style).map(key => 
            local.touch.before[key] = local.style[key] !== undefined ? local.style[key] : null 
        )
    })

    return [{
        "event": `loaded?state.[value.state]<<value.state=value.touch.id?value.touch.mount`,
        "actions": id.map(id => `setStyle::${id}?style=value.touch.style::${id}`)
    }, {
        "event": `touchstart??!value.click.freeze;!value.touch.disable`,
        "actions": id.map(id => `setStyle::${id}?style=value.touch.style::${id}`)
    }, {
        "event": `touchend??!value.click.freeze;!value.touch.disable`,
        "actions": id.map(id => `setStyle::${id}?style=value.touch.before::${id}?value.touch.freeze.not()`)
    }]
}