const {controls} = require("./controls")
const _controls = require('../controls/_controls')

const createControls = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    var type = params.type
    var exists = Object.entries(_controls).find(([key]) => key === type)
    if (!exists) return
    
    if (local[type]) params = local[type] || {}
    
    controls({ VALUE, STATE, id, controls: _controls[type]({ VALUE, STATE, params, id }) })
}

module.exports = {createControls}