const { controls } = require("./controls")
const control = require('../control/control')

const toControls = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    Object.entries(params).map(([type, param]) => {

        if (!control[type]) return
        controls({ VALUE, STATE, id, controls: control[type]({ VALUE, STATE, params: { controls: param }, id }) })
    })
}

module.exports = {toControls}