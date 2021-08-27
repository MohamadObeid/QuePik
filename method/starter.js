const autoControls = ['auto-style', 'toggle-style', 'droplist', 'actionlist']

const starter = ({ STATE, VALUE, id }) => {
    
    const { defaultEventHandler } = require("./event")
    const { setStyle } = require("./style")
    const { controls } = require('./controls')
    const { createControls } = require("./createControls")
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

    // execute controls
    if (local.controls) controls({ VALUE, STATE, id })

    // lunch auto controls
    autoControls.map(type => {
        if (!local[type]) return
        var params = { controls: { type, ...local[type] } }
        createControls({ VALUE, STATE, id, params }) 
    })
    
    // run starter for children
    var children = [...local.element.children]
    
    children.map(child => {
        var id = child.id
        if (!id) return
        starter({ STATE, VALUE, id })
        
    })
}

module.exports = {starter}