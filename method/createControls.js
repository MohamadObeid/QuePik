const {controls} = require("./controls")
const _controls = require('../controls/_controls')

const createControls = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    var exists = Object.entries(_controls).find(([key]) => key === params.controls.type)
    if (!exists) return
    
    // if (local[controls]) params = local[controls] || {}
    
    controls({ VALUE, STATE, id, controls: _controls[params.controls.type]({ VALUE, STATE, params, id }) })
}

module.exports = {createControls}