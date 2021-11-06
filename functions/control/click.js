const { toArray } = require("../function/toArray")

module.exports = ({ VALUE, params, id }) => {

    var controls = params.controls
    id = toArray(controls.id || id)

    id.map(id => { 
        var local = VALUE[id]
        local.click = local.click || {}
        local.click.before = local.click.before || {}
        local.click.style &&
        Object.keys(local.click.style).map(key => 
            local.click.before[key] = local.style[key] !== undefined ? local.style[key] : null 
        )
    })

    return [{
        "event": `loaded??value.click.mount`,
        "actions": id.map(id => `setStyle::${id}?style=value.click.style::${id};value.click.mount::${id}=true`)
    }, {
        "event": `click??!value.click.disable`,
        "actions": id.map(id => `setStyle::${id}?style=value.click.before.if().[value.click.mount.and().[value.click.freeze.not()]].else().[value.click.style]::${id};value.click.mount::${id}=false.if().[value.click.mount].else().true::${id}`)
    }]
}