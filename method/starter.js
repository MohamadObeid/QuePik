const autoControls = ['auto-style', 'toggle-style', 'droplist', 'actionlist']

const starter = ({ STATE, VALUE, id }) => {
    
    const { setEvents } = require("./event")
    const { setStyle } = require("./style")
    const { controls } = require('./controls')
    const { createControls } = require("./createControls")
    const { defaultInputHandler } = require("./defaultInputHandler")
    const { isArabic } = require("./isArabic")

    var local = VALUE[id]
    var element = document.getElementById(id)
    
    if (!element) return
    
    local.element = element

    // arabic text
    isArabic({ VALUE, id })

    if (local.link) local.element.addEventListener('click', (e) => e.preventDefault())

    // setStyles
    if (local.style) setStyle({ VALUE, STATE, id, params: {style: local.style} })

    // execute controls
    if (local.controls) controls({ VALUE, STATE, id })

    // lunch auto controls
    autoControls.map(type => local[type] && createControls({ VALUE, STATE, id, params: { type } }) )

    // input handlers
    defaultInputHandler({ VALUE, STATE, id })

    // mouseenter, click, mouseover...
    setEvents({VALUE, id})
    
    if (local.childrenSiblings) local.childrenSiblings.map(id => starter({STATE, VALUE, id}))
}

module.exports = {starter}