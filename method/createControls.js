const _controls = require("../controls/_controls")
const {controls} = require("./controls")

const createControls = ({ VALUE, STATE, params, id }) => {
    var local = VALUE[id]
    if (!local) return
    
    var type = params.type
    if (!_controls[type]) return
    
    if (local[type]) params = local[type] || {}
    
    controls({VALUE, STATE, id, controls: _controls[type](params)})
}

module.exports = {createControls}