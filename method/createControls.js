const {controls} = require("./controls")
const _control = require('../control/_control')

const createControls = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    var exists = Object.entries(_control).find(([key]) => key === params.controls.type)
    if (!exists) return
    
    controls({ VALUE, STATE, id, controls: _control[params.controls.type]({ VALUE, STATE, params, id }) })
}

module.exports = {createControls}