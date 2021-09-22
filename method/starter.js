const { toArray } = require("./toArray")
const control = require('../control/control')
const autoActions = ['fill']

const starter = ({ STATE, VALUE, id }) => {
    
    const { defaultEventHandler } = require("./event")
    const { setStyle } = require("./style")
    const { controls } = require('./controls')
    const { defaultInputHandler } = require("./defaultInputHandler")
    const { isArabic } = require("./isArabic")

    var local = VALUE[id]
    if (!local) return
    
    local.element = document.getElementById(id)
    if (!local.element) return delete VALUE[id]
    
    /* Defaults must start before controls */
    
    // arabic text
    isArabic({ VALUE, id })

    // input handlers
    defaultInputHandler({ VALUE, STATE, id })

    // mouseenter, click, mouseover...
    defaultEventHandler({ VALUE, id })

    // prevent a tag from refreshing browser
    if (local.link) local.element.addEventListener('click', (e) => e.preventDefault())

    /* End of default handlers */

    // setStyles
    if (local.style) setStyle({ VALUE, STATE, id, params: {style: local.style} })

    // lunch auto controls
    Object.entries(control).map(([type, control]) => {

        if (!local[type]) return
        local.controls = toArray(local.controls)
        local.controls.push(...control({ VALUE, STATE, id, params: { controls: local[type] } }))
    })

    // auto actions
    autoActions.map(action => local[action] && require("./_method")[action]({ VALUE, STATE, id }))
    
    // execute controls
    if (local.controls) controls({ VALUE, STATE, id })
    
    // run starter for children
    var children = [...local.element.children]
    
    children.map(child => {

        var id = child.id
        if (!id) return
        starter({ STATE, VALUE, id })
        
    })
}

module.exports = {starter}