const { controls } = require("./controls")
const control = require('../control/control')

const createControls = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    var exists = Object.entries(control).find(([key]) => key === params.controls.type)
    if (!exists) return
    
    controls({ VALUE, STATE, id, controls: control[params.controls.type]({ VALUE, STATE, params, id }) })
}

module.exports = {createControls}